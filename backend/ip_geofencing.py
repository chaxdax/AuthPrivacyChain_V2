import requests
import sqlite3
import uuid
import os
import time
from functools import lru_cache

# Database Path
DB_PATH = os.path.join(os.path.dirname(__file__), 'auth_chain.db')

# In-memory cache for resolved IPs (IP -> {country, allowed, timestamp})
GEO_CACHE = {}
CACHE_TTL = 300 # Cache results for 5 minutes

def get_public_ip():
    """Fetches the actual public IP of the requester for geofencing."""
    services = [
        'https://api.ipify.org',
        'https://icanhazip.com',
        'https://ident.me',
        'https://ifconfig.me/ip'
    ]
    for url in services:
        try:
            ip = requests.get(url, timeout=2).text.strip()
            if ip and len(ip.split('.')) == 4:
                return ip
        except:
            continue
    print(">> GEOFENCE CRITICAL: Failed to resolve public IP!")
    return "127.0.0.1"

def get_geo_data(ip_address):
    """Hits the GeoIP API with localized caching."""
    now = time.time()
    
    # Skip cache for localhost to allow for VPN testing/switching
    if ip_address not in ['127.0.0.1', 'localhost', '::1']:
        if ip_address in GEO_CACHE:
            cache_entry = GEO_CACHE[ip_address]
            if now - cache_entry['timestamp'] < CACHE_TTL:
                return cache_entry['allowed'], cache_entry['country'], ip_address

    target_ip = ip_address
    if ip_address in ['127.0.0.1', 'localhost', '::1']:
        target_ip = get_public_ip()
        print(f">> GEOFENCE: Resolved Localhost to Public IP: {target_ip}")
    
    try:
        res = requests.get(f'http://ip-api.com/json/{target_ip}', timeout=2)
        data = res.json()
        if data.get('status') == 'success':
            country_code = data.get('countryCode')
            allowed = (country_code == 'IN')
            print(f">> GEOFENCE: API Result for {target_ip}: {country_code} (Allowed: {allowed})")
            
            # Update Cache
            GEO_CACHE[ip_address] = {
                'country': country_code,
                'allowed': allowed,
                'timestamp': now
            }
            return allowed, country_code, target_ip
    except Exception as e:
        print(f">> GEOFENCE API ERROR: {e}")
    
    return True, 'IN', target_ip

def enforce_geofence(ip_address, user_id='ANONYMOUS', action_type='ACCESS'):
    is_allowed, country, detected_ip = get_geo_data(ip_address)
    print(f">> GEOFENCE: {detected_ip} ({country}) -> {'ALLOWED' if is_allowed else 'BLOCKED'}")
    
    if not is_allowed:
        try:
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            alert_id = str(uuid.uuid4())
            print(f">> GEOFENCE: Logging Breach for {detected_ip} to Database...")
            cursor.execute('''
                INSERT INTO alerts (id, owner_id, file_id, actor_ip, severity, alert_message, country)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (alert_id, user_id, action_type, detected_ip, 'CRITICAL', f'GEOFENCE_BLOCK: Unauthorized {action_type} from {country} (VPN)', country))
            conn.commit()
            conn.close()
            print(f">> GEOFENCE: Breach Logged Successfully.")
        except Exception as e:
            print(f">> GEOFENCE DB ERROR: {e}")
            
        return False, country, detected_ip
    
    return True, country, detected_ip
