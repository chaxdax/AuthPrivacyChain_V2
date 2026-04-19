from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'auth_chain.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class SecurityLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    event_type = db.Column(db.String(100))
    actor_id = db.Column(db.String(100))
    owner_id = db.Column(db.String(100))
    file_id = db.Column(db.String(255))
    status = db.Column(db.String(20))

class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    severity = db.Column(db.String(20))
    alert_message = db.Column(db.String(255))
    user = db.Column(db.String(100))
    resolved = db.Column(db.Boolean, default=False)

system_is_locked = False

def record_activity(event, actor, owner=None, file=None, status="SUCCESS"):
    target_owner = owner if owner else actor
    log = SecurityLog(
        event_type=event, 
        actor_id=actor, 
        owner_id=target_owner, 
        file_id=file, 
        status=status
    )
    db.session.add(log)
    db.session.commit()
    print(f" LOGGED TO AUTH_CHAIN: {event} | Actor: {actor} | Owner: {target_owner} | File: {file}")

with app.app_context():
    db.create_all() 
    if SecurityLog.query.count() == 0:
        record_activity("SOC_INTEGRATION", "SYSTEM", status="CONNECTED")


@app.route('/api/security-logs', methods=['GET'])
def get_logs():
    viewer = request.args.get('user')
    
    if not viewer:
        return jsonify([])

    logs = SecurityLog.query.filter(
        (SecurityLog.actor_id == viewer) | (SecurityLog.owner_id == viewer)
    ).order_by(SecurityLog.timestamp.desc()).limit(30).all()

    return jsonify([{
        "id": l.id,
        "timestamp": l.timestamp.strftime("%H:%M:%S"),
        "event": l.event_type,
        "user_id": l.actor_id,
        "file_id": l.file_id if l.file_id else "---",
        "status": l.status
    } for l in logs])

@app.route('/api/log-activity', methods=['POST'])
def log_activity():
    data = request.json
    record_activity(
        event=data.get('action'),
        actor=data.get('user'),
        owner=data.get('owner'),
        file=data.get('file', '---'),
        status="SUCCESS"
    )
    return jsonify({"status": "SUCCESS"})

@app.route('/api/log-decrypt', methods=['POST'])
def log_decrypt():
    data = request.json
    record_activity(
        event="FILE_DECRYPT", 
        actor=data.get('user'), 
        owner=data.get('owner'),
        file=data.get('file')
    )
    return jsonify({"status": "SUCCESS"})


@app.route('/alerts', methods=['GET'])
def get_alerts():
    active_alerts = Alert.query.order_by(Alert.timestamp.desc()).all()
    return jsonify([{ "id": a.id, "severity": a.severity, "alert_message": a.alert_message, "user": a.user } for a in active_alerts])

@app.route('/emergency/status', methods=['GET'])
def get_emergency_status():
    global system_is_locked
    return jsonify({"locked": system_is_locked})

@app.route('/emergency/lockdown', methods=['POST'])
def toggle_lockdown():
    global system_is_locked
    system_is_locked = not system_is_locked
    record_activity("CRITICAL_LOCKDOWN" if system_is_locked else "LOCKDOWN_LIFTED", "ADMIN", status="SYSTEM_WIDE")
    return jsonify({"locked": system_is_locked})

if __name__ == '__main__':
    app.run(port=5001, debug=True)