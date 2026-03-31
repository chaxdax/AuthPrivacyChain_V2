import io
import os
import uuid
import sqlite3
import datetime
import jwt
import random
import string
import base64
import hashlib
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from cryptography.fernet import Fernet
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from permission_logic import perm_bp 

app = Flask(__name__)

# --- 1. ENABLE CORS ---
CORS(app)

app.config['SECRET_KEY'] = 'SYSTEM_SECURE_SIGMA_99' 

# --- 2. REGISTER THE BLUEPRINT ---
app.register_blueprint(perm_bp)

# --- HELPER: CONVERT CUSTOM KEY TO FERNET-COMPLIANT KEY ---
def get_fernet_key(custom_key_str):
    key_hash = hashlib.sha256(custom_key_str.encode()).digest()
    return base64.urlsafe_b64encode(key_hash)

# --- HELPER: GENERATE CAPS+DASH KEY (XXXX-XXXX-XXXX-XXXX) ---
def generate_custom_key():
    chars = string.ascii_uppercase + string.digits
    parts = [''.join(random.choices(chars, k=4)) for _ in range(4)]
    return "-".join(parts)

# --- DATABASE INITIALIZATION ---
def init_db():
    conn = sqlite3.connect('auth_chain.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users 
                      (id TEXT PRIMARY KEY, username TEXT UNIQUE, password TEXT, master_key TEXT)''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS files 
                      (id TEXT PRIMARY KEY, user_id TEXT, filename TEXT, is_encrypted INTEGER, path TEXT)''')
    
    cursor.execute('''CREATE TABLE IF NOT EXISTS permissions 
                      (id TEXT PRIMARY KEY, 
                       file_id TEXT, 
                       owner_id TEXT, 
                       shared_with_username TEXT, 
                       status TEXT)''')
    conn.commit()
    conn.close()

init_db()

# --- AUTH MIDDLEWARE ---
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-token')
        if not token:
            return jsonify({'message': 'Token missing'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user_id = data['public_id']
        except:
            return jsonify({'message': 'Token invalid'}), 401
        return f(current_user_id, *args, **kwargs)
    return decorated

# --- AUTH ROUTES ---
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user_id_input = data.get('userID') or data.get('username')
    password = data.get('password')
    
    if not user_id_input or not password:
        return jsonify({"message": "ID and Password required"}), 400

    hashed_pw = generate_password_hash(password, method='pbkdf2:sha256')
    internal_uuid = str(uuid.uuid4())
    user_master_key = generate_custom_key() 
    
    try:
        conn = sqlite3.connect('auth_chain.db')
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (id, username, password, master_key) VALUES (?, ?, ?, ?)",
                       (internal_uuid, user_id_input, hashed_pw, user_master_key))
        conn.commit()
        conn.close()
        return jsonify({"message": "ID Registered Successfully", "masterKey": user_master_key}), 201
    except sqlite3.IntegrityError:
        return jsonify({"message": "This ID is already taken"}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user_id_val = data.get('userID') or data.get('username')
    
    if not user_id_val:
        return jsonify({"message": "ID is required"}), 400

    conn = sqlite3.connect('auth_chain.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=?", (user_id_val,))
    user = cursor.fetchone()
    conn.close()

    if not user or not check_password_hash(user[2], data.get('password', '')):
        return jsonify({"message": "Invalid ID or Password"}), 401

    token = jwt.encode({
        'public_id': user[0],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, app.config['SECRET_KEY'], algorithm="HS256")

    return jsonify({'token': token, 'role': 'user', 'identity': user[1]})

# --- VAULT ROUTES ---
@app.route('/upload', methods=['POST'])
@token_required
def upload(current_user_id):
    if 'file' not in request.files:
        return jsonify({"message": "No file part"}), 400
    file = request.files['file']
    file_id = str(uuid.uuid4())
    user_dir = f'storage/{current_user_id}'
    os.makedirs(user_dir, exist_ok=True)
    
    filepath = os.path.join(user_dir, f"{file_id}_{file.filename}")
    file.save(filepath)

    conn = sqlite3.connect('auth_chain.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO files (id, user_id, filename, is_encrypted, path) VALUES (?, ?, ?, ?, ?)",
                   (file_id, current_user_id, file.filename, 0, filepath))
    conn.commit()
    conn.close()
    return jsonify({"message": "Uploaded"})

@app.route('/my-files', methods=['GET'])
@token_required
def get_files(current_user_id):
    conn = sqlite3.connect('auth_chain.db')
    cursor = conn.cursor()
    cursor.execute("SELECT id, filename, is_encrypted FROM files WHERE user_id=?", (current_user_id,))
    files = [{"id": f[0], "filename": f[1], "is_encrypted": bool(f[2])} for f in cursor.fetchall()]
    conn.close()
    return jsonify(files)

@app.route('/encrypt-pending', methods=['POST'])
@token_required
def encrypt_pending(current_user_id):
    conn = sqlite3.connect('auth_chain.db')
    cursor = conn.cursor()
    
    # Get specific user's key
    cursor.execute("SELECT master_key FROM users WHERE id=?", (current_user_id,))
    user_data = cursor.fetchone()
    if not user_data:
        conn.close()
        return jsonify({"message": "User key error"}), 404
        
    raw_master_key = user_data[0]
    cipher = Fernet(get_fernet_key(raw_master_key))

    # Only encrypt files belonging to this specific user
    cursor.execute("SELECT id, path FROM files WHERE user_id=? AND is_encrypted=0", (current_user_id,))
    pending = cursor.fetchall()

    for f_id, f_path in pending:
        if os.path.exists(f_path):
            with open(f_path, 'rb') as f: data = f.read()
            encrypted = cipher.encrypt(data)
            with open(f_path, 'wb') as f: f.write(encrypted)
            cursor.execute("UPDATE files SET is_encrypted=1 WHERE id=?", (f_id,))
    
    conn.commit()
    conn.close()
    return jsonify({"message": "All pending files encrypted"})

import io # Ensure this is at the very top of app.py

import io # MAKE SURE THIS IS AT THE TOP OF APP.PY

@app.route('/download/<file_id>', methods=['GET'])
@token_required
def download(current_user_id, file_id):
    conn = sqlite3.connect('auth_chain.db')
    conn.row_factory = sqlite3.Row # Allows us to use file_data['filename'] instead of indexes
    cursor = conn.cursor()
    
    try:
        # 1. VERIFY OWNERSHIP: Does this file_id belong to this current_user_id?
        cursor.execute("SELECT * FROM files WHERE id=? AND user_id=?", (file_id, current_user_id))
        file_data = cursor.fetchone()
        
        if not file_data:
            # If the user doesn't own the file, we block them here (403)
            return jsonify({"message": "Access Denied: You do not own this file"}), 403

        # 2. GET THE KEY: Fetch the master_key for the person currently logged in
        cursor.execute("SELECT master_key FROM users WHERE id=?", (current_user_id,))
        user_row = cursor.fetchone()
        
        if not user_row:
            return jsonify({"message": "Security Profile Not Found"}), 404

        path = file_data['path']
        filename = file_data['filename']
        
        # 3. DECRYPT LOGIC
        if bool(file_data['is_encrypted']):
            # Dynamically derive the Fernet key from the logged-in user's master_key
            cipher = Fernet(get_fernet_key(user_row['master_key']))
            
            if not os.path.exists(path):
                return jsonify({"message": "Physical file missing on server"}), 404

            with open(path, 'rb') as f:
                enc_data = f.read()
            
            # Decrypt the data in memory
            dec_data = cipher.decrypt(enc_data)
            
            # 4. SEND FILE: Stream the decrypted bytes directly to the browser
            return send_file(
                io.BytesIO(dec_data),
                as_attachment=True,
                download_name=filename,
                mimetype='application/octet-stream'
            )
        
        # 5. RAW DOWNLOAD: If file isn't encrypted, just send it
        return send_file(path, as_attachment=True, download_name=filename)

    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}")
        return jsonify({"message": "Server Decryption Error"}), 500
    finally:
        conn.close()

@app.route('/delete-file/<file_id>', methods=['DELETE'])
@token_required
def delete_file(current_user_id, file_id):
    conn = sqlite3.connect('auth_chain.db')
    cursor = conn.cursor()
    cursor.execute("SELECT path FROM files WHERE id=? AND user_id=?", (file_id, current_user_id))
    file_data = cursor.fetchone()
    
    if file_data:
        if os.path.exists(file_data[0]): os.remove(file_data[0])
        cursor.execute("DELETE FROM files WHERE id=?", (file_id,))
        conn.commit()
    conn.close()
    return jsonify({"message": "Deleted"})

if __name__ == '__main__':
    app.run(port=5000, debug=True)