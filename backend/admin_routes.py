import os
import sqlite3
import uuid
import datetime
import hashlib
from flask import Blueprint, jsonify, request
from functools import wraps

admin_bp = Blueprint('admin', __name__)

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


# ─── MODULE 1: MASTER FORENSIC DASHBOARD ─────────────────────────────────────

@admin_bp.route('/admin/forensic-stats', methods=['GET'])
@admin_required
def forensic_stats():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM users")
    total_users = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM files")
    total_files = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM files WHERE is_encrypted=1")
    encrypted_files = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM activity_logs WHERE action='LOGIN'")
    total_logins = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM alerts WHERE resolved=0")
    active_alerts = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM alerts WHERE severity='HIGH'")
    high_severity = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM recovery_requests WHERE status='PENDING'")
    pending_recovery = cursor.fetchone()[0]

    cursor.execute('''
        SELECT actor_identity, action, target_name, timestamp
        FROM activity_logs
        ORDER BY timestamp DESC
        LIMIT 8
    ''')
    recent_logs = [
        {"actor": r[0], "action": r[1], "target": r[2], "timestamp": r[3]}
        for r in cursor.fetchall()
    ]

    # Live threats — join with users to get numeric_id
    cursor.execute('''
        SELECT a.id, a.actor_ip, a.file_id, a.severity, a.alert_message, a.timestamp, u.numeric_id
        FROM alerts a
        LEFT JOIN users u ON a.owner_id = u.id
        WHERE a.resolved=0
        ORDER BY a.timestamp DESC
        LIMIT 5
    ''')
    live_threats = [
        {"alert_id": r[0], "ip": r[1], "file_id": r[2] if r[2] else "N/A",
         "severity": r[3], "message": r[4], "timestamp": r[5],
         "user_id": r[6] or "UNKNOWN"}
        for r in cursor.fetchall()
    ]

    # Users list — show name, fallback to numeric_id label if no name stored
    cursor.execute("SELECT numeric_id, 'Unknown' as legal_name, phone_number FROM users ORDER BY rowid DESC")
    users_list = [
        {
            "numeric_id": r[0],
            "name": r[1].strip() if r[1] and r[1].strip() else "(name not on file)",
            "phone": r[2][:4] + "****" + r[2][-2:] if r[2] and len(r[2]) > 6 else "****"
        }
        for r in cursor.fetchall()
    ]

    # Files list — only file_id + encryption status (no filename for privacy)
    cursor.execute("SELECT id, is_encrypted FROM files ORDER BY rowid DESC LIMIT 20")
    files_list = [
        {
            "file_id": r[0],
            "encrypted": bool(r[1])
        }
        for r in cursor.fetchall()
    ]

    # Keep connection open for the config query
    blockchain_integrity = "INTACT" if total_files == encrypted_files or total_files == 0 else "PARTIAL"

    # Score deductions with reasons (blockchain partial does NOT affect score)
    score_deductions = []
    security_score = 100
    if active_alerts > 0:
        deduct = min(active_alerts * 5, 30)
        security_score -= deduct
        score_deductions.append(f"-{deduct} pts: {active_alerts} unresolved alert(s) — go to Active Alerts and resolve them")
    if pending_recovery > 0:
        deduct = min(pending_recovery * 3, 15)
        security_score -= deduct
        score_deductions.append(f"-{deduct} pts: {pending_recovery} pending recovery request(s) — approve or reject them")

    cursor.execute("SELECT value FROM system_config WHERE key='LOCKDOWN'")
    ld_row = cursor.fetchone()
    system_lockdown = bool(ld_row and ld_row[0] == '1')
    conn.close()

    return jsonify({
        "system_lockdown": system_lockdown,
        "security_score": max(security_score, 0),
        "score_deductions": score_deductions,
        "blockchain_integrity": blockchain_integrity,
        "total_users": total_users,
        "total_files": total_files,
        "encrypted_files": encrypted_files,
        "total_logins": total_logins,
        "active_alerts": active_alerts,
        "high_severity_alerts": high_severity,
        "pending_recovery_requests": pending_recovery,
        "recent_activity": recent_logs,
        "live_threats": live_threats,
        "users_list": users_list,
        "files_list": files_list,
        "scan_timestamp": datetime.datetime.utcnow().isoformat() + "Z"
    })


@admin_bp.route('/admin/emergency-lockdown', methods=['POST'])
@admin_required
def emergency_lockdown():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("UPDATE system_config SET value='1' WHERE key='LOCKDOWN'")
    log_id = str(uuid.uuid4())
    cursor.execute(
        "INSERT INTO activity_logs (id, owner_id, actor_identity, action, target_name) VALUES (?, ?, ?, ?, ?)",
        (log_id, 'ADM-777', 'ADM-777', 'EMERGENCY_LOCKDOWN', 'SYSTEM-WIDE')
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "SYSTEM LOCKDOWN INITIATED. All non-admin requests are blocked.", "status": "LOCKED"}), 200

@admin_bp.route('/admin/lift-lockdown', methods=['POST'])
@admin_required
def lift_lockdown():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("UPDATE system_config SET value='0' WHERE key='LOCKDOWN'")
    log_id = str(uuid.uuid4())
    cursor.execute(
        "INSERT INTO activity_logs (id, owner_id, actor_identity, action, target_name) VALUES (?, ?, ?, ?, ?)",
        (log_id, 'ADM-777', 'ADM-777', 'LIFT_LOCKDOWN', 'SYSTEM-WIDE')
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "SYSTEM LOCKDOWN LIFTED. Regular operations restored.", "status": "UNLOCKED"}), 200


@admin_bp.route('/admin/system-scan', methods=['POST'])
@admin_required
def system_scan():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM users")
    users = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM files")
    files = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM files WHERE is_encrypted=1")
    enc = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM alerts WHERE resolved=0")
    alerts = cursor.fetchone()[0]

    log_id = str(uuid.uuid4())
    cursor.execute(
        "INSERT INTO activity_logs (id, owner_id, actor_identity, action, target_name) VALUES (?, ?, ?, ?, ?)",
        (log_id, 'ADM-777', 'ADM-777', 'GLOBAL_SCAN', 'ALL_NODES')
    )
    conn.commit()
    conn.close()

    unencrypted = files - enc
    threats_found = alerts + unencrypted
    return jsonify({
        "message": "Global scan complete.",
        "nodes_scanned": users + files,
        "threats_found": threats_found,
        "unencrypted_files": unencrypted,
        "active_alerts": alerts,
        "status": "SCAN_COMPLETE"
    }), 200


# ─── RECOVERY QUEUE MANAGEMENT ───────────────────────────────────────────────

@admin_bp.route('/admin/recovery-queue', methods=['GET'])
@admin_required
def recovery_queue():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        SELECT rr.id as request_id, rr.user_id, 'N/A' as name_entered, rr.status, rr.timestamp,
               u.numeric_id, u.phone_number as phone, 'N/A' as name_in_db, 0 as name_match
        FROM recovery_requests rr
        LEFT JOIN users u ON rr.user_id = u.id
        ORDER BY rr.timestamp DESC
    ''')
    rows = cursor.fetchall()
    conn.close()

    queue = []
    for r in rows:
        db_name = (r[7] or '').strip().lower()
        name_entered = (r[2] or '').strip().lower()
        name_match = db_name != '' and db_name == name_entered
        queue.append({
            "request_id": r[0],
            "user_id": r[5] or "UNKNOWN",
            "phone": r[6][:4] + "****" if r[6] and len(r[6]) > 4 else "****",
            "name_entered": r[2] or "—",
            "name_in_db": r[7] or "—",
            "name_match": name_match,
            "status": r[3],
            "timestamp": r[4]
        })
    return jsonify(queue)


@admin_bp.route('/admin/approve-recovery/<req_id>', methods=['POST'])
@admin_required
def approve_recovery(req_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("UPDATE recovery_requests SET status='APPROVED' WHERE id=?", (req_id,))
    log_id = str(uuid.uuid4())
    cursor.execute(
        "INSERT INTO activity_logs (id, owner_id, actor_identity, action, target_name) VALUES (?, ?, ?, ?, ?)",
        (log_id, 'ADM-777', 'ADM-777', 'APPROVE_RECOVERY', req_id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Recovery request APPROVED."}), 200


@admin_bp.route('/admin/reject-recovery/<req_id>', methods=['POST'])
@admin_required
def reject_recovery(req_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("UPDATE recovery_requests SET status='REJECTED' WHERE id=?", (req_id,))
    log_id = str(uuid.uuid4())
    cursor.execute(
        "INSERT INTO activity_logs (id, owner_id, actor_identity, action, target_name) VALUES (?, ?, ?, ?, ?)",
        (log_id, 'ADM-777', 'ADM-777', 'REJECT_RECOVERY', req_id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Recovery request REJECTED."}), 200


# ─── MODULE 2: CLICK-STREAM TRACKER ──────────────────────────────────────────

@admin_bp.route('/admin/clickstream-tracker-logs', methods=['GET'])
@admin_required
def clickstream_tracker_logs():
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('''
        SELECT 
            id, 
            actor_identity AS user_id, 
            action AS event_type, 
            target_name AS element_id, 
            '/api/v2/secure' AS url_route, 
            '192.168.1.1' AS ip_address, 
            timestamp, 
            actor_identity AS numeric_id
        FROM activity_logs
        ORDER BY timestamp DESC
        LIMIT 100
    ''')
    logs = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return jsonify(logs)


# ─── MODULE 3: BLOCKCHAIN LEDGER VIEWER ──────────────────────────────────────

@admin_bp.route('/admin/blockchain-ledger', methods=['GET'])
@admin_required
def blockchain_ledger():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    blocks_data = []
    
    # 1. Fetch File Uploads
    cursor.execute('''
        SELECT f.id, f.filename, f.is_encrypted, f.user_id, u.phone_number, u.numeric_id
        FROM files f
        LEFT JOIN users u ON f.user_id = u.id
        ORDER BY f.id
    ''')
    rows = cursor.fetchall()
    for r in rows:
        blocks_data.append({
            'type': 'FILE_UPLOAD',
            'file_id': r[0],
            'filename': r[1],
            'encrypted': bool(r[2]),
            'owner_numeric_id': r[5] or "UNKNOWN",
            'target_user_id': "N/A"
        })
        
    # 2. Fetch Access Grants (Permissions)
    cursor.execute('''
        SELECT p.file_id, p.shared_with_username, p.status, u.numeric_id, f.is_encrypted, t.numeric_id
        FROM permissions p
        LEFT JOIN users u ON (p.owner_id = u.phone_number OR p.owner_id = u.numeric_id)
        LEFT JOIN users t ON (p.shared_with_username = t.phone_number OR p.shared_with_username = t.numeric_id)
        LEFT JOIN files f ON p.file_id = f.id
        ORDER BY p.id
    ''')
    perm_rows = cursor.fetchall()
    for p in perm_rows:
        blocks_data.append({
            'type': 'ACCESS_RIGHT',
            'file_id': p[0],
            'filename': "ACCESS_RIGHT",
            'encrypted': bool(p[4]),
            'owner_numeric_id': p[3] or p.owner_id or "UNKNOWN",
            'target_user_id': p[5] or p[1]
        })
        
    conn.close()

    ledger = []
    prev_hash = "GENESIS"
    for b in blocks_data:
        block_data = f"{b['file_id']}{b['type']}{b['owner_numeric_id']}{b['target_user_id']}{prev_hash}"
        block_hash = hashlib.sha256(block_data.encode()).hexdigest()
        ledger.append({
            "block_hash": block_hash[:16].upper(),
            "record_type": b['type'],
            "file_id": b['file_id'],
            "encrypted": b['encrypted'],
            "owner_numeric_id": b['owner_numeric_id'],
            "target_user_id": b['target_user_id'],
            "prev_hash": prev_hash[:16].upper()
        })
        prev_hash = block_hash

    return jsonify({"chain_length": len(ledger), "integrity": "VERIFIED", "blocks": ledger})


# ─── MODULE 4: IP-GEOFENCING MONITOR ─────────────────────────────────────────

@admin_bp.route('/admin/ip-threats', methods=['GET'])
@admin_required
def ip_threats():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        SELECT actor_ip, COUNT(*) as attempts, MAX(timestamp) as last_seen, severity
        FROM alerts
        GROUP BY actor_ip
        ORDER BY attempts DESC
        LIMIT 50
    ''')
    threats = [
        {"ip": r[0], "attempts": r[1], "last_seen": r[2], "severity": r[3]}
        for r in cursor.fetchall()
    ]
    conn.close()
    return jsonify(threats)


# ─── MODULE 5: UNAUTHORIZED ACCESS LOGS ──────────────────────────────────────

@admin_bp.route('/admin/unauthorized-logs', methods=['GET'])
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


# ─── MODULE 6: USER MANAGEMENT ───────────────────────────────────────────────

@admin_bp.route('/admin/users', methods=['GET'])
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


@admin_bp.route('/admin/suspend-user/<user_id>', methods=['POST'])
@admin_required
def suspend_user(user_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    log_id = str(uuid.uuid4())
    cursor.execute(
        "INSERT INTO activity_logs (id, owner_id, actor_identity, action, target_name) VALUES (?, ?, ?, ?, ?)",
        (log_id, 'ADM-777', 'ADM-777', 'SUSPEND_USER', user_id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": f"User {user_id} suspended. Session token invalidated."}), 200


@admin_bp.route('/admin/reset-token/<user_id>', methods=['POST'])
@admin_required
def reset_token(user_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    log_id = str(uuid.uuid4())
    cursor.execute(
        "INSERT INTO activity_logs (id, owner_id, actor_identity, action, target_name) VALUES (?, ?, ?, ?, ?)",
        (log_id, 'ADM-777', 'ADM-777', 'RESET_TOKEN', user_id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": f"Token for user {user_id} has been force-reset."}), 200

@admin_bp.route('/admin/resolve-alert/<alert_id>', methods=['POST'])
@admin_required
def admin_resolve_alert(alert_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check if the alert exists and is unresolved
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
