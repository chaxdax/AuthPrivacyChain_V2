import sqlite3
import uuid
import datetime
import os

def log_activity(owner_id, accessor_username, file_name, action_type):
    try:
        basedir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        db_path = os.path.join(basedir, 'auth_chain.db')
        
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        log_id = str(uuid.uuid4())
        timestamp = datetime.datetime.utcnow()
        
        cursor.execute("""
            INSERT INTO activity_logs 
            (id, owner_id, actor_identity, target_name, action, timestamp) 
            VALUES (?, ?, ?, ?, ?, ?)
        """, (log_id, owner_id, accessor_username, file_name, action_type, timestamp))
        
        conn.commit()
    except Exception as e:
        print(f"Error logging activity: {e}")
    finally:
        if 'conn' in locals():
            conn.close()
