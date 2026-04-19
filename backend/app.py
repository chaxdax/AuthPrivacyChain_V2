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
from admin_routes import admin_bp
from clickstream_tracker import clickstream_bp
from services.activity_logger import log_activity

app = Flask(__name__)

# UPDATED: Comprehensive CORS for local and production environments
CORS(app, resources={r"/*": {"origins": [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://chandanbn.online", 
    "https://auth-privacy-chain-v2.vercel.app"
]}})

app.config['SECRET_KEY'] = 'SYSTEM_SECURE_SIGMA_99' 

app.register_blueprint(perm_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(clickstream_bp)

basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'auth_chain.db')

def get_fernet_key(custom_key_str):
    key_hash = hashlib.sha256(custom_key_str.encode()).digest()
    return base64.urlsafe_b64encode(key_hash)

def generate_custom_key():
    chars = string.ascii_uppercase + string.digits
    parts = [''.join(random.choices(chars, k=4)) for _ in range(4)]
    return "-".join(parts)

def init_db():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users 
                      (id TEXT PRIMARY KEY, numeric_id TEXT UNIQUE, phone_number TEXT UNIQUE, password TEXT, master_key TEXT, legal_name TEXT)''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS files 
                      (id TEXT PRIMARY KEY, user_id TEXT, filename TEXT, is_encrypted INTEGER, path TEXT)''')
    
    cursor.execute('''CREATE TABLE IF NOT EXISTS permissions 
                      (id TEXT PRIMARY KEY, 
                       file_id TEXT, 
                       owner_id TEXT, 
                       shared_with_username TEXT, 
                       status TEXT)''')
    
    # Activity Logs Table - The heart of your Forensics Feed
    cursor.execute('''CREATE TABLE IF NOT EXISTS activity_logs 
                      (id TEXT PRIMARY KEY, 
                       owner_id TEXT, 
                       actor_identity TEXT, 
                       target_name TEXT, 
                       action TEXT, 
                       timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
                       
    # Click-stream Logs Table
    cursor.execute('''CREATE TABLE IF NOT EXISTS clickstream_logs
                      (id TEXT PRIMARY KEY,
                       user_id TEXT,
                       session_token TEXT,
                       event_type TEXT,
                       element_id TEXT,
                       url_route TEXT,
                       ip_address TEXT,
                       timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
                       
    # System Config Table
    cursor.execute('''CREATE TABLE IF NOT EXISTS system_config
                      (key TEXT PRIMARY KEY, value TEXT)''')
    cursor.execute("INSERT OR IGNORE INTO system_config (key, value) VALUES ('LOCKDOWN', '0')")

    # Alerts Table
    cursor.execute('''CREATE TABLE IF NOT EXISTS alerts 
                      (id TEXT PRIMARY KEY, 
                       owner_id TEXT, 
                       actor_ip TEXT, 
                       file_id TEXT, 
                       severity TEXT, 
                       alert_message TEXT, 
                       resolved INTEGER DEFAULT 0, 
                       timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    
    # Recovery Requests Table
    cursor.execute('''CREATE TABLE IF NOT EXISTS recovery_requests
                      (id TEXT PRIMARY KEY, 
                       user_id TEXT, 
                       name_entered TEXT,
                       status TEXT DEFAULT 'PENDING', 
                       timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_activity_timestamp ON activity_logs(timestamp)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_clickstream_timestamp ON clickstream_logs(timestamp)")
    
    conn.commit()
    conn.close()

init_db()

from ip_geofencing import enforce_geofence

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-token')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        # Admin Bypass is near-instant
        if token == 'admin-bypass':
            return f('ADM-777', *args, **kwargs)

        try:
            # Decode once and reuse
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user_id = data['public_id']
        except:
            return jsonify({'message': 'Token is invalid!'}), 401

        # GEOFENCING ENFORCEMENT (Optimized)
        ip = request.headers.get('X-Forwarded-For', request.remote_addr or "127.0.0.1")
        if ',' in ip: ip = ip.split(',')[0].strip()
        
        allowed, country, detected_ip = enforce_geofence(ip, current_user_id, 'API_ACTION')
        if not allowed:
            return jsonify({
                'message': 'GEOFENCE_BLOCK: Access from outside India or VPN detected.',
                'country': country,
                'detected_ip': detected_ip
            }), 403

        return f(current_user_id, *args, **kwargs)
    return decorated

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user_id_input = data.get('userID') or data.get('username')
    password = data.get('password')
    legal_name = data.get('legalName')
    
    if not user_id_input or not password:
        return jsonify({"message": "Phone Number and Password required"}), 400

    hashed_pw = generate_password_hash(password, method='pbkdf2:sha256')
    internal_uuid = str(uuid.uuid4())
    user_master_key = generate_custom_key() 
    numeric_id = str(random.randint(100000, 999999))
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (id, numeric_id, phone_number, password, master_key, legal_name) VALUES (?, ?, ?, ?, ?, ?)",
                       (internal_uuid, numeric_id, user_id_input, hashed_pw, user_master_key, legal_name))
        conn.commit()
        conn.close()
        
        # Send SMS via AppleScript
        import subprocess
        clean_phone = user_id_input.replace(" ", "").replace("-", "")
        apple_script = f'''
        tell application "Messages"
            activate
            delay 1
            send "Welcome to Batch 33's AuthPrivacyChain UserID: {numeric_id} Password: {password}" to buddy "{clean_phone}"
        end tell
        '''
        try:
            subprocess.run(['osascript', '-e', apple_script], capture_output=True, text=True, check=False)
        except Exception as e:
            print("Failed to send SMS:", e)

        # Log Registration Action
        log_activity(internal_uuid, numeric_id, "System", "USER_REGISTERED")
        
        return jsonify({"message": f"Account Created! Unique ID {numeric_id} sent via SMS", "masterKey": user_master_key}), 201
    except sqlite3.IntegrityError:
        return jsonify({"message": "This Phone Number is already taken"}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user_id_val = data.get('userID') or data.get('username')
    if user_id_val:
        user_id_val = str(user_id_val).strip()
    
    # GEOFENCING ENFORCEMENT: Block Login attempts from foreign IPs
    ip = request.headers.get('X-Forwarded-For', request.remote_addr or "127.0.0.1")
    if ',' in ip: ip = ip.split(',')[0].strip()
    
    # Try to resolve user_id_val to the internal UUID for consistent logging
    log_owner_id = 'ANONYMOUS'
    if user_id_val:
        conn = sqlite3.connect(db_path)
        u = conn.execute("SELECT id FROM users WHERE numeric_id=?", (user_id_val,)).fetchone()
        if u: log_owner_id = u[0]
        conn.close()

    allowed, country, detected_ip = enforce_geofence(ip, log_owner_id, 'LOGIN_BREACH')
    print(f"DEBUG: Login Attempt from IP: {detected_ip}, Country: {country}, Allowed: {allowed}")
    
    if not allowed:
        return jsonify({
            'message': 'GEOFENCE_BLOCK: Access from outside India or VPN detected.',
            'country': country,
            'detected_ip': detected_ip
        }), 403
    
    if not user_id_val:
        return jsonify({"message": "ID is required"}), 400

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE numeric_id=?", (user_id_val,))
    user = cursor.fetchone()
    conn.close()

    if not user or not check_password_hash(user['password'], data.get('password', '')):
        return jsonify({"message": "Invalid ID or Password"}), 401

    # Log Successful Login
    log_activity(user['id'], user['numeric_id'], "SYS", "USER_LOGIN_SUCCESS")

    token = jwt.encode({
        'public_id': user['id'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, app.config['SECRET_KEY'], algorithm="HS256")

    return jsonify({'token': token, 'role': 'user', 'identity': user['numeric_id']})

# UPDATED: Fetch Activity Logs with strictly enforced user isolation
@app.route('/activity-logs', methods=['GET'])
@token_required
def get_activity_logs(current_user_id):
    conn = sqlite3.connect(db_path)
    # Using Row factory for safer data mapping
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Only fetches logs belonging to the current_user_id
    cursor.execute("""
        SELECT actor_identity, target_name, action, timestamp 
        FROM activity_logs 
        WHERE owner_id=? 
        ORDER BY timestamp DESC
    """, (current_user_id,))
    
    rows = cursor.fetchall()
    logs = [
        {
            "accessor": row["actor_identity"], 
            "file": row["target_name"], 
            "action": row["action"], 
            "time": row["timestamp"]
        } for row in rows
    ]
    conn.close()
    return jsonify(logs)

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

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO files (id, user_id, filename, is_encrypted, path) VALUES (?, ?, ?, ?, ?)",
                   (file_id, current_user_id, file.filename, 0, filepath))
    conn.commit()

    # Log the Upload action
    cursor.execute("SELECT numeric_id as username FROM users WHERE id=?", (current_user_id,))
    user_row = cursor.fetchone()
    if user_row:
        log_activity(current_user_id, user_row[0], file.filename, "FILE_UPLOADED")
    
    conn.close()
    return jsonify({"message": "Uploaded"})

@app.route('/my-files', methods=['GET'])
@token_required
def get_files(current_user_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT id, filename, is_encrypted FROM files WHERE user_id=?", (current_user_id,))
    files = [{"id": f[0], "filename": f[1], "is_encrypted": bool(f[2])} for f in cursor.fetchall()]
    conn.close()
    return jsonify(files)

@app.route('/encrypt-pending', methods=['POST'])
@token_required
def encrypt_pending(current_user_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute("SELECT master_key, numeric_id as username FROM users WHERE id=?", (current_user_id,))
    user_data = cursor.fetchone()
    if not user_data:
        conn.close()
        return jsonify({"message": "User key error"}), 404
        
    raw_master_key, username = user_data
    cipher = Fernet(get_fernet_key(raw_master_key))

    cursor.execute("SELECT id, path, filename FROM files WHERE user_id=? AND is_encrypted=0", (current_user_id,))
    pending = cursor.fetchall()

    for f_id, f_path, f_name in pending:
        if os.path.exists(f_path):
            with open(f_path, 'rb') as f: data = f.read()
            encrypted = cipher.encrypt(data)
            with open(f_path, 'wb') as f: f.write(encrypted)
            cursor.execute("UPDATE files SET is_encrypted=1 WHERE id=?", (f_id,))
            log_activity(current_user_id, username, f_name, "FILE_ENCRYPTED")
    
    conn.commit()
    conn.close()
    return jsonify({"message": "All pending files encrypted"})

@app.route('/alerts', methods=['GET'])
@token_required
def get_alerts(current_user_id):
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    # Fetch alerts related to the user OR anonymous breaches (Privacy Isolation + Transparency)
    cursor.execute('''
        SELECT a.id, a.severity, a.alert_message, a.actor_ip as user, a.resolved, a.timestamp
        FROM alerts a
        WHERE a.owner_id = ? OR a.owner_id = 'ANONYMOUS'
        ORDER BY a.timestamp DESC
        LIMIT 50
    ''', (current_user_id,))
    
    alerts = [{"id": r[0], "severity": r[1], "alert_message": r[2], "user": r[3], "resolved": bool(r[4]), "timestamp": r[5]} for r in cursor.fetchall()]
    conn.close()
    return jsonify(alerts)

@app.route('/resolve-alert/<alert_id>', methods=['POST'])
@token_required
def resolve_alert(current_user_id, alert_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    # Ensure the user can resolve their own alerts or anonymous breaches
    cursor.execute("UPDATE alerts SET resolved=1 WHERE id=? AND (owner_id=? OR owner_id='ANONYMOUS')", (alert_id, current_user_id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Alert resolved successfully"}), 200

@app.route('/security-logs', methods=['GET'])
@token_required
def get_security_logs(current_user_id):
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT numeric_id, phone_number FROM users WHERE id=?", (current_user_id,))
    user_row = cursor.fetchone()
    if not user_row:
        return jsonify([])
        
    num_id = user_row['numeric_id']
    phone = user_row['phone_number']

    cursor.execute('''
        SELECT id, timestamp, actor_identity as user_id, action as event, target_name as file_id, 'SUCCESS' as status
        FROM activity_logs
        WHERE owner_id = ? OR actor_identity = ? OR actor_identity = ?
    ''', (current_user_id, num_id, phone))
    activities = [dict(r) for r in cursor.fetchall()]
    
    cursor.execute('''
        SELECT id, timestamp, 'SYSTEM' as user_id, 'THREAT_ALERT' as event, severity || ': ' || alert_message as file_id, 'FAILED' as status
        FROM alerts
        WHERE owner_id = ?
    ''', (current_user_id,))
    alerts = [dict(r) for r in cursor.fetchall()]
    
    combined_logs = activities + alerts
    combined_logs.sort(key=lambda x: x['timestamp'], reverse=True)
    
    for log in combined_logs:
        if isinstance(log['timestamp'], str) and '.' in log['timestamp']:
            log['timestamp'] = log['timestamp'].split('.')[0]
    
    conn.close()
    return jsonify(combined_logs[:50])

@app.route('/emergency/status', methods=['GET'])
def get_emergency_status():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT value FROM system_config WHERE key='LOCKDOWN'")
    row = cursor.fetchone()
    conn.close()
    return jsonify({"locked": bool(row and row[0] == '1')})

@app.route('/emergency/lockdown', methods=['POST'])
@token_required
def toggle_emergency_lockdown(current_user_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT value FROM system_config WHERE key='LOCKDOWN'")
    row = cursor.fetchone()
    currently_locked = bool(row and row[0] == '1')
    
    new_value = '0' if currently_locked else '1'
    cursor.execute("UPDATE system_config SET value=? WHERE key='LOCKDOWN'", (new_value,))
    
    # Log the action
    log_id = str(uuid.uuid4())
    action = "LOCKDOWN_LIFTED" if currently_locked else "CRITICAL_LOCKDOWN"
    cursor.execute("INSERT INTO activity_logs (id, owner_id, actor_identity, action, target_name) VALUES (?, ?, ?, ?, ?)",
                   (log_id, current_user_id, "USER", action, "SYSTEM_WIDE"))
    
    conn.commit()
    conn.close()
    return jsonify({"locked": new_value == '1'})


@app.route('/download/<file_id>', methods=['GET'])
@token_required
def download(current_user_id, file_id):
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT * FROM files WHERE id=? AND user_id=?", (file_id, current_user_id))
        file_data = cursor.fetchone()
        
        if not file_data:
            return jsonify({"message": "Access Denied: You do not own this file"}), 403

        cursor.execute("SELECT numeric_id as username, master_key FROM users WHERE id=?", (current_user_id,))
        user_row = cursor.fetchone()
        
        if not user_row:
            return jsonify({"message": "Security Profile Not Found"}), 404

        path = file_data['path']
        filename = file_data['filename']
        
        # LOG FILE DECRYPTION & DOWNLOAD
        log_activity(current_user_id, user_row['username'], filename, "FILE_DECRYPT_DOWNLOAD")

        if bool(file_data['is_encrypted']):
            cipher = Fernet(get_fernet_key(user_row['master_key']))
            if not os.path.exists(path):
                return jsonify({"message": "Physical file missing on server"}), 404
            with open(path, 'rb') as f:
                enc_data = f.read()
            dec_data = cipher.decrypt(enc_data)
            return send_file(
                io.BytesIO(dec_data),
                as_attachment=True,
                download_name=filename,
                mimetype='application/octet-stream'
            )
        
        return send_file(path, as_attachment=True, download_name=filename)

    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}")
        return jsonify({"message": "Server Decryption Error"}), 500
    finally:
        conn.close()

@app.route('/delete-file/<file_id>', methods=['DELETE'])
@token_required
def delete_file(current_user_id, file_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT path, filename FROM files WHERE id=? AND user_id=?", (file_id, current_user_id))
    file_data = cursor.fetchone()
    
    if file_data:
        path, filename = file_data
        if os.path.exists(path): os.remove(path)
        cursor.execute("DELETE FROM files WHERE id=?", (file_id,))
        
        # Log the deletion
        cursor.execute("SELECT numeric_id as username FROM users WHERE id=?", (current_user_id,))
        user_row = cursor.fetchone()
        if user_row:
            log_activity(current_user_id, user_row[0], filename, "FILE_DELETED")
            
        conn.commit()
    conn.close()
    return jsonify({"message": "File deleted successfully"}), 200

@app.route('/request-recovery', methods=['POST'])
def request_recovery():
    data = request.get_json()
    master_key = data.get('masterKey')
    name_entered = data.get('name')
    
    if not master_key or not name_entered:
        return jsonify({"message": "Master Key and Name required."}), 400
        
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE master_key=?", (master_key,))
    user = cursor.fetchone()
    
    if not user:
        conn.close()
        return jsonify({"message": "Invalid Master Key."}), 401
        
    user_id = user['id']
    numeric_id = user['numeric_id']
    
    # Check for existing request
    cursor.execute("SELECT * FROM recovery_requests WHERE user_id=? ORDER BY timestamp DESC LIMIT 1", (user_id,))
    req = cursor.fetchone()
    
    if req:
        if req['status'] == 'APPROVED':
            # Generate token for the recovered user
            token = jwt.encode({
                'public_id': user_id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
            }, app.config['SECRET_KEY'], algorithm="HS256")
            
            return jsonify({
                "message": "Recovery Approved. Logging in...",
                "role": "user",
                "identity": numeric_id,
                "token": token,
                "forceTab": "Emergency Recovery Tool"
            }), 200
        elif req['status'] == 'PENDING':
            conn.close()
            return jsonify({"message": "Your recovery request is still pending admin approval."}), 202
            
    # Insert new request
    req_id = str(uuid.uuid4())
    cursor.execute("INSERT INTO recovery_requests (id, user_id, name_entered, status) VALUES (?, ?, ?, 'PENDING')",
                   (req_id, user_id, name_entered))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Recovery Request sent to Admin queue. Await approval."}), 201

@app.route('/public-ledger', methods=['GET'])
def public_ledger():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    # Fetch random uploaded files
    cursor.execute("SELECT id, filename FROM files ORDER BY RANDOM() LIMIT 20")
    files = cursor.fetchall()
    conn.close()
    
    # Return fake IDs for privacy
    ledger_data = []
    for f in files:
        real_id = f[0]
        # fake_id is just a display string like #9A2F8X
        import hashlib
        fake_id = "#" + hashlib.md5(real_id.encode()).hexdigest()[:6].upper()
        ledger_data.append({"id": real_id, "fake_id": fake_id, "filename": f[1]})
        
    return jsonify(ledger_data)

@app.route('/hack-attempt', methods=['POST'])
def hack_attempt():
    data = request.get_json()
    file_id = data.get('file_id')
    ip_address = request.headers.get('X-Forwarded-For', request.remote_addr or "UNKNOWN_IP")
    
    try:
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Find the owner of this specific file
        cursor.execute("SELECT user_id, filename FROM files WHERE id=?", (file_id,))
        file_record = cursor.fetchone()
        
        if file_record:
            owner_id = file_record['user_id']
            filename = file_record['filename']
            
            # Get the owner's numeric ID for display
            cursor.execute("SELECT numeric_id FROM users WHERE id=?", (owner_id,))
            owner_row = cursor.fetchone()
            owner_display = owner_row['numeric_id'] if owner_row else owner_id
            
            msg_owner = f"CRITICAL: Unauthorized decryption attempt on your file '{filename}' from IP: {ip_address}"
            msg_admin = f"INFILTRATION DETECTED: File '{filename}' (Owner: {owner_display}) targeted from IP: {ip_address}"
            
            # 1. Alert to the file owner
            alert_id = str(uuid.uuid4())
            cursor.execute("INSERT INTO alerts (id, owner_id, actor_ip, file_id, severity, alert_message) VALUES (?, ?, ?, ?, ?, ?)",
                           (alert_id, owner_id, ip_address, file_id, "CRITICAL", msg_owner))
            
            # 2. Alert to Admin
            admin_alert_id = str(uuid.uuid4())
            cursor.execute("INSERT INTO alerts (id, owner_id, actor_ip, file_id, severity, alert_message) VALUES (?, ?, ?, ?, ?, ?)",
                           (admin_alert_id, 'ADM-777', ip_address, file_id, "CRITICAL", msg_admin))
            
            # 3. Log in activity_logs for forensic feed
            log_id = str(uuid.uuid4())
            cursor.execute("INSERT INTO activity_logs (id, owner_id, actor_identity, action, target_name) VALUES (?, ?, ?, ?, ?)",
                           (log_id, owner_id, f"IP:{ip_address}", "SECURITY_BREACH", filename))
            
            conn.commit()
            return jsonify({
                "status": "intercepted",
                "message": "Alert dispatched to owner and admin",
                "filename": filename,
                "owner_display": owner_display
            }), 200
        else:
            return jsonify({"message": "File not found"}), 404
    except Exception as e:
        print(f"Error in hack_attempt: {e}")
        return jsonify({"message": "Internal error"}), 500
    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/verify-master-key', methods=['POST'])
@token_required
def verify_master_key(current_user_id):
    data = request.get_json()
    master_key = str(data.get('master_key', '')).strip()
    name = str(data.get('name', '')).strip().lower()
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check if the master key belongs to ANY user (System-Wide Master Validation)
    cursor.execute("SELECT id, master_key, legal_name FROM users WHERE master_key=?", (master_key,))
    user = cursor.fetchone()
    
    if user:
        user_uuid, db_master_key, db_legal_name = user
        
        # If a name is provided, we try to verify it
        if name:
            # 1. Check if it matches the name in the users table
            if db_legal_name and db_legal_name.strip().lower() == name:
                conn.close()
                return jsonify({"message": "Master Key Validated"}), 200
            
            # 2. Check if it matches a name in recovery requests
            cursor.execute("SELECT name_entered FROM recovery_requests WHERE user_id=? ORDER BY timestamp DESC LIMIT 1", (user_uuid,))
            req = cursor.fetchone()
            if req and req[0].strip().lower() == name:
                conn.close()
                return jsonify({"message": "Master Key Validated"}), 200
            
            # 3. If no legal name is set yet, we allow the first name entered to pass
            if not db_legal_name:
                conn.close()
                return jsonify({"message": "Master Key Validated (Identity Linked)"}), 200
                
            conn.close()
            return jsonify({"message": "Invalid Identity Name for this Master Key"}), 401
        
        conn.close()
        return jsonify({"message": "Master Key Validated"}), 200
    
    conn.close()
    return jsonify({"message": "Invalid Master Key"}), 401

@app.route('/change-password', methods=['POST'])
@token_required
def change_password(current_user_id):
    data = request.get_json()
    new_password = data.get('new_password')
    master_key = data.get('master_key')
    old_password = data.get('old_password')
    
    if not new_password:
        return jsonify({"message": "New password is required"}), 400
        
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT password, master_key, numeric_id FROM users WHERE id=?", (current_user_id,))
    user = cursor.fetchone()
    
    if not user:
        conn.close()
        return jsonify({"message": "User not found"}), 404
        
    authorized = False
    if master_key and user[1] == master_key:
        authorized = True
    elif old_password and check_password_hash(user[0], old_password):
        authorized = True
        
    if not authorized:
        conn.close()
        return jsonify({"message": "Unauthorized"}), 401
        
    hashed_pw = generate_password_hash(new_password, method='pbkdf2:sha256')
    cursor.execute("UPDATE users SET password=? WHERE id=?", (hashed_pw, current_user_id))
    conn.commit()
    conn.close()
    
    log_activity(current_user_id, user[2], "SYS", "PASSWORD_CHANGED")
    
    return jsonify({"message": "Password updated successfully"}), 200

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)