import os
import sqlite3
import uuid
import datetime
from flask import Blueprint, jsonify, request
from functools import wraps

clickstream_bp = Blueprint('clickstream', __name__)

basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'auth_chain.db')
ADMIN_TOKEN = 'admin-bypass'

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-admin-token')
        if token != ADMIN_TOKEN:
            return jsonify({'message': 'Admin access denied'}), 403
        return f(*args, **kwargs)
    return decorated

@clickstream_bp.route('/track-click', methods=['POST'])
def track_click():
    data = request.json
    if not data:
        return jsonify({"message": "No data provided"}), 400
        
    user_id = data.get('user_id', 'ANONYMOUS')
    session_token = data.get('session_token', 'NONE')
    event_type = data.get('event_type', 'CLICK')
    element_id = data.get('element_id', 'UNKNOWN')
    url_route = data.get('url_route', '/')
    ip_address = request.headers.get('X-Forwarded-For', request.remote_addr or "127.0.0.1")
    if ',' in ip_address: ip_address = ip_address.split(',')[0].strip()
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    log_id = str(uuid.uuid4())
    
    cursor.execute('''
        INSERT INTO clickstream_logs 
        (id, user_id, session_token, event_type, element_id, url_route, ip_address) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (log_id, user_id, session_token, event_type, element_id, url_route, ip_address))
    
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Click recorded successfully", "id": log_id}), 201

@clickstream_bp.route('/admin/clickstream-tracker-logs', methods=['GET'])
@admin_required
def get_clickstream_logs():
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT c.id, c.user_id, c.session_token, c.event_type, c.element_id, c.url_route, c.ip_address, c.timestamp, u.numeric_id, u.phone_number
        FROM clickstream_logs c
        LEFT JOIN users u ON (c.user_id = u.phone_number OR c.user_id = u.numeric_id OR c.user_id = u.id)
        
        UNION ALL
        
        SELECT a.id, a.actor_identity as user_id, 'NONE' as session_token, a.action as event_type, a.action as element_id, '/login' as url_route, 'UNKNOWN' as ip_address, a.timestamp, u.numeric_id, u.phone_number
        FROM activity_logs a
        LEFT JOIN users u ON (a.actor_identity = u.phone_number OR a.actor_identity = u.numeric_id OR a.actor_identity = u.id)
        WHERE a.action IN ('LOGIN', 'USER_LOGIN_SUCCESS')
        
        ORDER BY timestamp DESC
    ''')
    
    logs = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    return jsonify(logs)
