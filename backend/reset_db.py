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
                      (id TEXT PRIMARY KEY, username TEXT UNIQUE, password TEXT, master_key TEXT)''')
    cursor.execute('''CREATE TABLE files 
                      (id TEXT PRIMARY KEY, user_id TEXT, filename TEXT, is_encrypted INTEGER, path TEXT)''')
    cursor.execute('''CREATE TABLE permissions 
                      (id TEXT PRIMARY KEY, file_id TEXT, owner_id TEXT, shared_with_username TEXT, status TEXT)''')
    
    conn.commit()
    conn.close()
    
    if os.path.exists('storage'):
        shutil.rmtree('storage')
    os.makedirs('storage', exist_ok=True)
    
    print(">>> DATABASE & STORAGE FULLY WIPED. READY FOR NEW USERS.")

if __name__ == "__main__":
    full_reset()