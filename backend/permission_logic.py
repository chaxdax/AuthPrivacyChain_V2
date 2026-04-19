import uuid
import sqlite3
import os
import base64
import hashlib
import io
from flask import Blueprint, request, jsonify, send_file
from cryptography.fernet import Fernet


perm_bp = Blueprint('permissions', __name__)

basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'auth_chain.db')

def get_db():
    conn = sqlite3.connect(db_path, timeout=10)
    conn.row_factory = sqlite3.Row
    return conn

def get_fernet_key(custom_key_str):
    """Derives a safe Fernet key from the user's master_key string."""
    key_hash = hashlib.sha256(custom_key_str.encode()).digest()
    return base64.urlsafe_b64encode(key_hash)

@perm_bp.route('/view-decrypted', methods=['POST'])
def view_decrypted():
    data = request.get_json()
    conn = get_db()
    try:
        f_id = str(data.get('fileId') or data.get('id', '')).replace('#', '').strip()
        username = str(data.get('username', '')).strip()

        if not username or not f_id:
            return jsonify({"message": "Missing credentials"}), 400


        user_row = conn.execute("SELECT phone_number, numeric_id FROM users WHERE phone_number = ? OR numeric_id = ?", (username, username)).fetchone()
        if not user_row:
            return jsonify({"message": "User not found"}), 404

        query = '''
            SELECT f.filename, f.path, u.master_key, u.id as owner_id
            FROM permissions p
            JOIN files f ON p.file_id = f.id
            JOIN users u ON f.user_id = u.id
            WHERE (p.file_id = ? OR p.file_id LIKE ?)
            AND (p.shared_with_username = ? OR p.shared_with_username = ?)
            AND p.status = 'ACTIVE'
        '''
        row = conn.execute(query, (f_id, f_id + "%", user_row['phone_number'], user_row['numeric_id'])).fetchone()

        if not row:
            return jsonify({"message": "Access Denied"}), 403


        cipher = Fernet(get_fernet_key(row['master_key']))
        
        if not os.path.exists(row['path']):
            return jsonify({"message": "Source file missing"}), 404

        with open(row['path'], 'rb') as f:
            enc_data = f.read()
        
        dec_data = cipher.decrypt(enc_data)

        log_id = str(uuid.uuid4())
        conn.execute("INSERT INTO activity_logs (id, owner_id, actor_identity, action, target_name) VALUES (?, ?, ?, ?, ?)",
                     (log_id, row['owner_id'], user_row['numeric_id'], 'PEER_DECRYPT', row['filename']))
        conn.commit()

        return send_file(
            io.BytesIO(dec_data),
            mimetype='application/octet-stream',
            as_attachment=True,
            download_name=row['filename']
        )
    except Exception as e:
        return jsonify({"message": f"Decryption Error: {str(e)}"}), 500
    finally:
        conn.close()

@perm_bp.route('/grant', methods=['POST'])
def grant_access():
    data = request.get_json()
    f_id = str(data.get('fileId', '')).replace('#', '').strip()
    target = str(data.get('targetUser', '')).strip()
    owner = str(data.get('owner', '')).strip()
    conn = get_db()
    try:
        user = conn.execute("SELECT id, phone_number, numeric_id FROM users WHERE phone_number = ? OR numeric_id = ?", (target, target)).fetchone()
        if not user: return jsonify({"message": "Recipient ID not found"}), 404
        
        target_phone = user['phone_number']
        target_numeric = user['numeric_id']
        
        file_row = conn.execute("SELECT id FROM files WHERE id LIKE ?", (f"{f_id}%",)).fetchone()
        if not file_row: return jsonify({"message": "File ID not found"}), 404
        
        p_id = str(uuid.uuid4())[:8]
        conn.execute(
            "INSERT INTO permissions (id, file_id, owner_id, shared_with_username, status) VALUES (?, ?, ?, ?, 'ACTIVE')", 
            (p_id, file_row['id'], owner, target_phone)
        )
        
        owner_row = conn.execute("SELECT id, numeric_id FROM users WHERE phone_number = ? OR numeric_id = ?", (owner, owner)).fetchone()
        if owner_row:
            log_id = str(uuid.uuid4())
            conn.execute("INSERT INTO activity_logs (id, owner_id, actor_identity, action, target_name) VALUES (?, ?, ?, ?, ?)",
                         (log_id, owner_row['id'], owner_row['numeric_id'], 'GRANT_ACCESS', target_numeric))
                         
        conn.commit()
        return jsonify({"message": "Access Granted", "tx": p_id})
    except Exception as e: 
        return jsonify({"message": str(e)}), 500
    finally: 
        conn.close()

@perm_bp.route('/shared-with-me', methods=['GET'])
def shared_with_me():
    user_identity = request.headers.get('x-user-identity')
    conn = get_db()
    try:
        # Resolve the provided identity to a phone number
        user = conn.execute("SELECT phone_number FROM users WHERE phone_number = ? OR numeric_id = ?", (user_identity, user_identity)).fetchone()
        if not user:
            return jsonify([])
        target_phone = user['phone_number']

        query = '''
            SELECT f.id, f.filename, f.is_encrypted, u.numeric_id AS owner 
            FROM permissions p 
            JOIN files f ON p.file_id = f.id 
            JOIN users u ON (p.owner_id = u.phone_number OR p.owner_id = u.numeric_id)
            WHERE (p.shared_with_username = ? OR p.shared_with_username = ?) AND p.status = 'ACTIVE'
        '''
        rows = conn.execute(query, (target_phone, user_identity)).fetchall()
        return jsonify([dict(r) for r in rows])
    finally: 
        conn.close()

@perm_bp.route('/my-shares', methods=['GET'])
def get_my_shares():
    owner_identity = request.headers.get('x-user-identity')
    conn = get_db()
    try:
        user = conn.execute("SELECT phone_number, numeric_id FROM users WHERE phone_number = ? OR numeric_id = ?", (owner_identity, owner_identity)).fetchone()
        if not user:
            return jsonify([])
        
        query = '''
            SELECT p.file_id AS fileId, p.shared_with_username AS targetUser, f.filename 
            FROM permissions p 
            JOIN files f ON p.file_id = f.id 
            WHERE (p.owner_id = ? OR p.owner_id = ?) AND p.status = 'ACTIVE'
        '''
        rows = conn.execute(query, (user['phone_number'], user['numeric_id'])).fetchall()
        return jsonify([dict(r) for r in rows])
    finally: 
        conn.close()

@perm_bp.route('/revoke', methods=['POST'])
def revoke_access():
    data = request.get_json()
    conn = get_db()
    try:
        target_user = data.get('targetUser')
        owner_identity = data.get('owner')
        
        owner_row = conn.execute("SELECT id, phone_number, numeric_id FROM users WHERE phone_number = ? OR numeric_id = ?", (owner_identity, owner_identity)).fetchone()
        if not owner_row:
            return jsonify({"message": "Owner not found"}), 404
            
        conn.execute(
            "UPDATE permissions SET status='REVOKED' WHERE file_id=? AND shared_with_username=? AND (owner_id=? OR owner_id=?)", 
            (data.get('fileId'), target_user, owner_row['phone_number'], owner_row['numeric_id'])
        )
        
        target_row = conn.execute("SELECT numeric_id FROM users WHERE phone_number = ? OR numeric_id = ?", (target_user, target_user)).fetchone()
        target_display = target_row['numeric_id'] if target_row else target_user
        
        log_id = str(uuid.uuid4())
        conn.execute("INSERT INTO activity_logs (id, owner_id, actor_identity, action, target_name) VALUES (?, ?, ?, ?, ?)",
                        (log_id, owner_row['id'], owner_row['numeric_id'], 'REVOKE_ACCESS', target_display))
                         
        conn.commit()
        return jsonify({"message": "Access Revoked"})
    except Exception as e: 
        return jsonify({"message": str(e)}), 500
    finally: 
        conn.close()