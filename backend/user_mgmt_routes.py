import sqlite3
import uuid
import random
import string
from werkzeug.security import generate_password_hash
from flask import Blueprint, jsonify
from admin_routes import db_path, admin_required

user_mgmt_bp = Blueprint('user_mgmt', __name__)

@user_mgmt_bp.route('/admin/users', methods=['GET'])
@admin_required
def list_users():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        SELECT u.id, u.phone_number, u.numeric_id, u.legal_name,
               COUNT(DISTINCT f.id) as file_count,
               COUNT(DISTINCT a.id) as alert_count
        FROM users u
        LEFT JOIN files f ON u.id = f.user_id
        LEFT JOIN alerts a ON u.id = a.owner_id
        GROUP BY u.id
    ''')
    users = [
        {"id": r[0], "phone": r[1], "numeric_id": r[2], "name": r[3] or "—", "files": r[4], "alerts": r[5]}
        for r in cursor.fetchall()
    ]
    conn.close()
    return jsonify(users)

@user_mgmt_bp.route('/admin/suspend-user/<user_id>', methods=['POST'])
@admin_required
def suspend_user(user_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute("DELETE FROM users WHERE id=?", (user_id,))
    cursor.execute("DELETE FROM files WHERE user_id=?", (user_id,))
    cursor.execute("DELETE FROM permissions WHERE owner_id=? OR shared_with_username=?", (user_id, user_id))
    cursor.execute("DELETE FROM recovery_requests WHERE user_id=?", (user_id,))
    cursor.execute("DELETE FROM clickstream_logs WHERE user_id=?", (user_id,))
    
    log_id = str(uuid.uuid4())
    cursor.execute(
        "INSERT INTO activity_logs (id, owner_id, actor_identity, action, target_name) VALUES (?, ?, ?, ?, ?)",
        (log_id, 'ADM-777', 'ADM-777', 'SUSPEND_USER_DELETED', user_id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": f"User {user_id} suspended and permanently deleted."}), 200

@user_mgmt_bp.route('/admin/reset-token/<user_id>', methods=['POST'])
@admin_required
def reset_token(user_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    chars = string.ascii_uppercase + string.digits
    parts = [''.join(random.choices(chars, k=4)) for _ in range(4)]
    new_master_key = "-".join(parts)
    
    new_password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
    hashed_pw = generate_password_hash(new_password, method='pbkdf2:sha256')
    
    cursor.execute("UPDATE users SET master_key=?, password=? WHERE id=?", (new_master_key, hashed_pw, user_id))
    
    log_id = str(uuid.uuid4())
    cursor.execute(
        "INSERT INTO activity_logs (id, owner_id, actor_identity, action, target_name) VALUES (?, ?, ?, ?, ?)",
        (log_id, 'ADM-777', 'ADM-777', 'RESET_TOKEN', user_id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": f"Credentials and Master Key for user {user_id} have been force-reset."}), 200
