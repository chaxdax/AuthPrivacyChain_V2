import uuid
import sqlite3
import os
import base64
import hashlib
import io
from flask import Blueprint, request, jsonify, send_file
from cryptography.fernet import Fernet

# Define the Blueprint once at the top
perm_bp = Blueprint('permissions', __name__)

def get_db():
    conn = sqlite3.connect('auth_chain.db', timeout=10)
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

        # Join permissions with files and users to get the OWNER'S master_key
        query = '''
            SELECT f.filename, f.path, u.master_key 
            FROM permissions p
            JOIN files f ON p.file_id = f.id
            JOIN users u ON f.user_id = u.id
            WHERE (p.file_id = ? OR p.file_id LIKE ?)
            AND p.shared_with_username = ? 
            AND p.status = 'ACTIVE'
        '''
        row = conn.execute(query, (f_id, f_id + "%", username)).fetchone()

        if not row:
            return jsonify({"message": "Access Denied"}), 403

        # Decrypt using the owner's key
        cipher = Fernet(get_fernet_key(row['master_key']))
        
        if not os.path.exists(row['path']):
            return jsonify({"message": "Source file missing"}), 404

        with open(row['path'], 'rb') as f:
            enc_data = f.read()
        
        dec_data = cipher.decrypt(enc_data)

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
        user = conn.execute("SELECT username FROM users WHERE username = ?", (target,)).fetchone()
        if not user: return jsonify({"message": "Recipient ID not found"}), 404
        
        file_row = conn.execute("SELECT id FROM files WHERE id LIKE ?", (f"{f_id}%",)).fetchone()
        if not file_row: return jsonify({"message": "File ID not found"}), 404
        
        p_id = str(uuid.uuid4())[:8]
        conn.execute(
            "INSERT INTO permissions (id, file_id, owner_id, shared_with_username, status) VALUES (?, ?, ?, ?, 'ACTIVE')", 
            (p_id, file_row['id'], owner, target)
        )
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
        query = '''
            SELECT f.id, f.filename, f.is_encrypted, p.owner_id AS owner 
            FROM permissions p 
            JOIN files f ON p.file_id = f.id 
            WHERE p.shared_with_username = ? AND p.status = 'ACTIVE'
        '''
        rows = conn.execute(query, (user_identity,)).fetchall()
        return jsonify([dict(r) for r in rows])
    finally: 
        conn.close()

@perm_bp.route('/my-shares', methods=['GET'])
def get_my_shares():
    owner_identity = request.headers.get('x-user-identity')
    conn = get_db()
    try:
        query = '''
            SELECT p.file_id AS fileId, p.shared_with_username AS targetUser, f.filename 
            FROM permissions p 
            JOIN files f ON p.file_id = f.id 
            WHERE p.owner_id = ? AND p.status = 'ACTIVE'
        '''
        rows = conn.execute(query, (owner_identity,)).fetchall()
        return jsonify([dict(r) for r in rows])
    finally: 
        conn.close()

@perm_bp.route('/revoke', methods=['POST'])
def revoke_access():
    data = request.get_json()
    conn = get_db()
    try:
        conn.execute(
            "UPDATE permissions SET status='REVOKED' WHERE file_id=? AND shared_with_username=? AND owner_id=?", 
            (data.get('fileId'), data.get('targetUser'), data.get('owner'))
        )
        conn.commit()
        return jsonify({"message": "Access Revoked"})
    except Exception as e: 
        return jsonify({"message": str(e)}), 500
    finally: 
        conn.close()