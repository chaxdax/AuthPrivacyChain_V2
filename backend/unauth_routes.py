import sqlite3
import uuid
from flask import Blueprint, jsonify
from admin_routes import db_path, admin_required

unauth_bp = Blueprint('unauth', __name__)

@unauth_bp.route('/admin/unauthorized-logs', methods=['GET'])
@admin_required
def unauthorized_logs():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        SELECT id, actor_ip, file_id, severity, alert_message, resolved, timestamp
        FROM alerts
        ORDER BY timestamp DESC
    ''')
    logs = [
        {"id": r[0], "ip": r[1], "file_id": r[2], "severity": r[3],
         "message": r[4], "resolved": bool(r[5]), "timestamp": r[6]}
        for r in cursor.fetchall()
    ]
    conn.close()
    return jsonify(logs)

@unauth_bp.route('/admin/resolve-alert/<alert_id>', methods=['POST'])
@admin_required
def admin_resolve_alert(alert_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute("SELECT id FROM alerts WHERE id=? AND resolved=0", (alert_id,))
    if not cursor.fetchone():
        conn.close()
        return jsonify({"message": "Alert not found or already resolved."}), 404
        
    cursor.execute("UPDATE alerts SET resolved=1 WHERE id=?", (alert_id,))
    log_id = str(uuid.uuid4())
    cursor.execute(
        "INSERT INTO activity_logs (id, owner_id, actor_identity, action, target_name) VALUES (?, ?, ?, ?, ?)",
        (log_id, 'ADM-777', 'ADM-777', 'RESOLVE_ALERT', alert_id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Alert resolved successfully."}), 200
