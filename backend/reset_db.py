import sqlite3
import os
import shutil

def full_reset():
    db_path = 'auth_chain.db'
    if os.path.exists(db_path):
        os.remove(db_path)
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE users 
                      (id TEXT PRIMARY KEY, numeric_id TEXT UNIQUE, phone_number TEXT UNIQUE, password TEXT, master_key TEXT, legal_name TEXT)''')
    cursor.execute('''CREATE TABLE files 
                      (id TEXT PRIMARY KEY, user_id TEXT, filename TEXT, is_encrypted INTEGER, path TEXT)''')
    cursor.execute('''CREATE TABLE permissions 
                      (id TEXT PRIMARY KEY, file_id TEXT, owner_id TEXT, shared_with_username TEXT, status TEXT)''')
    cursor.execute('''CREATE TABLE activity_logs 
                      (id TEXT PRIMARY KEY, owner_id TEXT, actor_identity TEXT, action TEXT, target_name TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    cursor.execute('''CREATE TABLE alerts
                      (id TEXT PRIMARY KEY, owner_id TEXT, actor_ip TEXT, file_id TEXT, severity TEXT, alert_message TEXT, resolved INTEGER DEFAULT 0, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, country TEXT)''')
    cursor.execute('''CREATE TABLE recovery_requests
                      (id TEXT PRIMARY KEY, user_id TEXT, name_entered TEXT, status TEXT DEFAULT 'PENDING', timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    cursor.execute('''CREATE TABLE clickstream_logs
                      (id TEXT PRIMARY KEY, user_id TEXT, session_token TEXT, event_type TEXT, element_id TEXT, url_route TEXT, ip_address TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    cursor.execute('''CREATE TABLE system_config
                      (key TEXT PRIMARY KEY, value TEXT)''')
    cursor.execute("INSERT OR IGNORE INTO system_config (key, value) VALUES ('LOCKDOWN', '0')")
    conn.commit()
    conn.close()
    
    if os.path.exists('storage'):
        shutil.rmtree('storage')
    os.makedirs('storage', exist_ok=True)
    
    print(">>> DATABASE & STORAGE FULLY WIPED. READY FOR NEW USERS.")

if __name__ == "__main__":
    full_reset()