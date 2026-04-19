import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ADMIN_TOKEN = 'admin-bypass';
const API = 'http://127.0.0.1:5000';
const headers = { 'x-admin-token': ADMIN_TOKEN };

interface IPThreat {
  ip: string;
  attempts: number;
  severity: string;
  last_seen: string;
  user_id: string;
  country?: string;
}

interface LocationData {
  text: string;
  isIndia: boolean;
}

const formatDelhiTime = (utcDateStr: any) => {
  if (!utcDateStr) return '';
  let dateStr = String(utcDateStr);
  if (!dateStr.includes('T') && !dateStr.includes('Z')) {
    dateStr = dateStr.replace(' ', 'T') + 'Z';
  }
  return new Date(dateStr).toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata', 
    day: '2-digit', month: '2-digit', year: 'numeric', 
    hour: 'numeric', minute: '2-digit', hour12: true 
  }).toUpperCase();
};

export default function IPGeofencingMonitor() {
  const [ipLocations, setIpLocations] = useState<Record<string, LocationData>>({});

  const resolveLocationForIP = async (ip: string): Promise<LocationData> => {
    if (ip === '127.0.0.1' || ip === 'localhost') return { text: 'Mumbai, India (Localhost)', isIndia: true };
    try {
      const res = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await res.json();
      if (data.status === 'success') {
        return { 
          text: `${data.city || 'Unknown'}, ${data.country || 'Unknown'} (${data.isp || 'Unknown ISP'})`,
          isIndia: data.countryCode === 'IN'
        };
      }
    } catch (e) {
      return { text: 'Tracking...', isIndia: true };
    }
    return { text: 'Unknown Location', isIndia: false };
  };

  const [threats, setThreats] = useState<IPThreat[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchThreats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/ip-threats`, { headers });
      setThreats(res.data);
    } catch (e) {
      console.error('Failed to fetch IP threats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreats();
    const interval = setInterval(fetchThreats, 3000); // 3s High-frequency radar
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const resolveAll = async () => {
      const newLocs = { ...ipLocations };
      let changed = false;
      for (const t of threats) {
        if (!newLocs[t.ip]) {
          // If backend already gave us a country code, use it!
          if (t.country && t.country !== 'Unknown') {
            newLocs[t.ip] = { 
              text: `${t.country} (Verified Breach)`, 
              isIndia: t.country === 'IN' 
            };
          } else {
            newLocs[t.ip] = await resolveLocationForIP(t.ip);
          }
          changed = true;
        }
      }
      if (changed) setIpLocations(newLocs);
    };
    if (threats.length > 0) resolveAll();
  }, [threats]);

  const filteredThreats = threats.filter(t => {
    return t.ip.toLowerCase().includes(search.toLowerCase()) || 
           t.user_id.toLowerCase().includes(search.toLowerCase());
  });

  const totalBlocked = threats.length;
  const criticalThreats = threats.filter(t => {
    const loc = ipLocations[t.ip];
    return loc && !loc.isIndia;
  }).length;
  const highThreats = threats.filter(t => t.severity === 'HIGH' || t.severity === 'CRITICAL').length;

  const getSeverityColor = (ip: string) => {
    const loc = ipLocations[ip];
    if (!loc) return '#6b7280';
    return loc.isIndia ? '#10b981' : '#ef4444';
  };

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'badge-critical';
      case 'HIGH': return 'badge-high';
      case 'MEDIUM': return 'badge-medium';
      case 'LOW': return 'badge-low';
      default: return 'badge-default';
    }
  };

  return (
    <div className="ip-container">
      <div className="ip-header">
        <div className="ip-header-left">
           <h2 className="ip-title">IP-Geofencing Monitor</h2>
           <p className="ip-subtitle">A security map that flags login attempts from suspicious or unauthorized geographic locations</p>
        </div>
        <div className="ip-header-right">
           <div className="ip-search-box">
             <span className="search-icon">🔍</span>
             <input 
               type="text" 
               placeholder="Filter IP or Severity..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
           <button onClick={fetchThreats} className="ip-refresh-btn">
             <span className={`refresh-icon ${loading ? 'spinning' : ''}`}>↻</span> REFRESH
           </button>
        </div>
      </div>

      <div className="ip-stats-row">
        <div className="ip-stat-box">
          <div className="ip-stat-val" style={{color: '#fff'}}>{totalBlocked}</div>
          <div className="ip-stat-label">Monitored IPs</div>
        </div>
        <div className="ip-stat-box" style={{ borderColor: criticalThreats > 0 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255,255,255,0.05)' }}>
          <div className="ip-stat-val" style={{color: criticalThreats > 0 ? '#ef4444' : '#6b7280'}}>{criticalThreats}</div>
          <div className="ip-stat-label">Critical Threats</div>
        </div>
        <div className="ip-stat-box" style={{ borderColor: highThreats > 0 ? 'rgba(249, 115, 22, 0.3)' : 'rgba(255,255,255,0.05)' }}>
          <div className="ip-stat-val" style={{color: highThreats > 0 ? '#f97316' : '#6b7280'}}>{highThreats}</div>
          <div className="ip-stat-label">High Alerts</div>
        </div>
        <div className="ip-stat-box">
           <div className="ip-live-indicator">
              <span className="pulse-dot"></span> RADAR ACTIVE
           </div>
        </div>
      </div>

      <div className="ip-table-container">
        <table className="ip-table">
          <thead>
            <tr>
              <th>Origin IP Address</th>
              <th>Geographic Location</th>
              <th>Associated User</th>
              <th>Total Attempts</th>
              <th>Geofence Risk</th>
              <th>Last Seen</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && threats.length === 0 ? (
              <tr><td colSpan={7} className="ip-empty">Initializing Geofencing Radar...</td></tr>
            ) : filteredThreats.length === 0 ? (
              <tr><td colSpan={7} className="ip-empty">No external threats detected on perimeter.</td></tr>
            ) : (
              filteredThreats.map((threat, index) => {
                const loc = ipLocations[threat.ip];
                const isIndia = loc?.isIndia;
                return (
                  <tr key={index} className="ip-row">
                    <td className="ip-address-cell">
                      <span className="radar-ping" style={{background: getSeverityColor(threat.ip)}}></span>
                      {threat.ip}
                    </td>
                    <td className="ip-location-cell">
                      <span className="geo-icon">🌍</span> {loc?.text || 'Resolving...'}
                    </td>
                    <td style={{fontFamily: 'monospace', color: '#818cf8', fontWeight: 'bold'}}>
                      {threat.user_id}
                    </td>
                    <td className="ip-attempts-cell">
                      <div className="attempt-bar-bg">
                        <div 
                          className="attempt-bar-fill" 
                          style={{
                            width: `${Math.min(100, threat.attempts * 5)}%`,
                            background: getSeverityColor(threat.ip)
                          }}
                        ></div>
                      </div>
                      <span>{threat.attempts} pings</span>
                    </td>
                    <td>
                      <span className={`ip-badge ${isIndia ? 'badge-low' : 'badge-critical'}`}>
                        {isIndia ? 'DOMESTIC_PASS' : 'FOREIGN_VPN_ALERT'}
                      </span>
                    </td>
                    <td className="ip-time-cell">{formatDelhiTime(threat.last_seen)}</td>
                    <td>
                      <span className={isIndia ? 'ip-status-pass' : 'ip-status-blocked'}>
                        {isIndia ? '✅ ALLOWED' : '🛡️ BLOCKED'}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .ip-container {
          background: #0d0d12;
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 20px;
          padding: 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: fadeIn 0.5s ease-out;
        }
        
        .ip-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        
        .ip-title {
          color: #fff;
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 5px 0;
          letter-spacing: -0.5px;
        }
        
        .ip-subtitle {
          color: #ef4444;
          font-size: 13px;
          margin: 0;
          font-weight: 600;
        }
        
        .ip-header-right {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        
        .ip-search-box {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          font-size: 14px;
          color: #6b7280;
        }
        
        .ip-search-box input {
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 10px 10px 10px 35px;
          color: #fff;
          font-size: 13px;
          width: 250px;
          outline: none;
          transition: 0.3s;
        }
        
        .ip-search-box input:focus {
          border-color: #ef4444;
          box-shadow: 0 0 10px rgba(239,68,68,0.2);
        }
        
        .ip-refresh-btn {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: 0.2s;
        }
        
        .ip-refresh-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #fff;
        }
        
        .spinning {
          display: inline-block;
          animation: spin 1s linear infinite;
        }
        
        .ip-stats-row {
          display: flex;
          gap: 15px;
          margin-bottom: 24px;
        }
        
        .ip-stat-box {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 15px 20px;
          border-radius: 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: 0.3s;
        }
        
        .ip-stat-val {
          font-size: 24px;
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
        }
        
        .ip-stat-label {
          font-size: 11px;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        
        .ip-live-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #ef4444;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 1px;
          height: 100%;
        }
        
        .pulse-dot {
          width: 10px;
          height: 10px;
          background: #ef4444;
          border-radius: 50%;
          box-shadow: 0 0 10px #ef4444;
          animation: pulse 1.5s infinite;
        }
        
        .ip-table-container {
          flex: 1;
          overflow: auto;
          background: #0a0a0f;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.03);
        }
        
        .ip-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        
        .ip-table th {
          background: rgba(255,255,255,0.02);
          padding: 15px 20px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #fca5a5;
          font-weight: 800;
          position: sticky;
          top: 0;
          z-index: 10;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .ip-row {
          border-bottom: 1px dashed rgba(255,255,255,0.05);
          transition: 0.2s;
        }
        
        .ip-row:hover {
          background: rgba(239, 68, 68, 0.05);
        }
        
        .ip-row td {
          padding: 15px 20px;
          font-size: 13px;
          color: #d1d5db;
        }
        
        .ip-address-cell {
          font-family: monospace;
          color: #fff !important;
          font-size: 14px !important;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .ip-location-cell {
          font-size: 12px;
          color: #d1d5db;
          font-weight: 600;
        }
        
        .geo-icon {
          margin-right: 5px;
          font-size: 14px;
        }
        
        .radar-ping {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px currentColor;
        }
        
        .ip-attempts-cell {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .attempt-bar-bg {
          width: 100px;
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .attempt-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.5s ease-out;
        }
        
        .ip-attempts-cell span {
          font-size: 10px;
          color: #9ca3af;
          font-weight: bold;
        }
        
        .ip-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.5px;
          border: 1px solid;
        }
        
        .badge-critical { border-color: #ef4444; color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        .badge-high { border-color: #f97316; color: #f97316; background: rgba(249, 115, 22, 0.1); }
        .badge-medium { border-color: #f59e0b; color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
        .badge-low { border-color: #3b82f6; color: #3b82f6; background: rgba(59, 130, 246, 0.1); }
        .badge-default { border-color: #6b7280; color: #6b7280; background: rgba(107, 114, 128, 0.1); }
        
        .ip-time-cell {
          color: #9ca3af !important;
          font-size: 12px !important;
        }
        
        .ip-status-blocked {
          font-size: 11px;
          font-weight: 800;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        
        .ip-status-pass {
          font-size: 11px;
          font-weight: 800;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        
        .ip-empty {
          text-align: center;
          padding: 50px !important;
          color: #6b7280 !important;
          font-style: italic;
        }
        
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .ip-table-container::-webkit-scrollbar { width: 6px; }
        .ip-table-container::-webkit-scrollbar-track { background: transparent; }
        .ip-table-container::-webkit-scrollbar-thumb { background: rgba(239, 68, 68, 0.3); border-radius: 10px; }
      `}</style>
    </div>
  );
}
