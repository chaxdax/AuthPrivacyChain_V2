import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ADMIN_TOKEN = 'admin-bypass';
const API = 'http://127.0.0.1:5000';
const headers = { 'x-admin-token': ADMIN_TOKEN };

interface ClickStreamLog {
  id: string;
  user_id: string;
  session_token: string;
  event_type: string;
  element_id: string;
  url_route: string;
  ip_address: string;
  timestamp: string;
  numeric_id?: string;
  phone_number?: string;
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

export default function ClickStreamTracker() {
  const [logs, setLogs] = useState<ClickStreamLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/clickstream-tracker-logs`, { headers });
      setLogs(res.data);
    } catch (e) {
      console.error('Failed to fetch clickstream logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 3000); // Stable 3s pulse
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => 
    (log.user_id || '').toLowerCase().includes(filter.toLowerCase()) || 
    (log.event_type || '').toLowerCase().includes(filter.toLowerCase()) ||
    (log.url_route || '').toLowerCase().includes(filter.toLowerCase()) ||
    (log.ip_address || '').toLowerCase().includes(filter.toLowerCase())
  );

  const getEventColor = (type: string) => {
    if (!type) return '#6b7280';
    switch (type.toUpperCase()) {
      case 'CLICK': return '#3b82f6';
      case 'INPUT': return '#f59e0b';
      case 'NAVIGATION': return '#10b981';
      case 'API_REQUEST': return '#8b5cf6';
      case 'LOGIN': return '#06b6d4';
      case 'ERROR': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="cs-tracker-container">
      <div className="cs-header">
        <div className="cs-header-left">
           <h2 className="cs-title">Global Click-Stream Matrix</h2>
           <p className="cs-subtitle">Deep Forensic Analysis of User Interactions & Requests</p>
        </div>
        <div className="cs-header-right">
           <div className="cs-search-box">
             <span className="search-icon">🔍</span>
             <input 
               type="text" 
               placeholder="Filter by User ID, IP, Event..." 
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
             />
           </div>
           <button onClick={fetchLogs} className="cs-refresh-btn">
             <span className={`refresh-icon ${loading ? 'spinning' : ''}`}>↻</span> REFRESH
           </button>
        </div>
      </div>

      <div className="cs-stats-row">
        <div className="cs-stat-box">
          <div className="cs-stat-val">{logs.length}</div>
          <div className="cs-stat-label">Total Recorded Events</div>
        </div>
        <div className="cs-stat-box">
          <div className="cs-stat-val" style={{color: '#3b82f6'}}>{logs.filter(l => l.event_type === 'CLICK').length}</div>
          <div className="cs-stat-label">UI Clicks</div>
        </div>
        <div className="cs-stat-box">
          <div className="cs-stat-val" style={{color: '#8b5cf6'}}>{logs.filter(l => l.event_type === 'API_REQUEST').length}</div>
          <div className="cs-stat-label">API Requests</div>
        </div>
        <div className="cs-stat-box">
           <div className="cs-live-indicator">
              <span className="pulse-dot"></span> LIVE RECORDING ACTIVE
           </div>
        </div>
      </div>

      <div className="cs-table-container">
        <table className="cs-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Timestamp</th>
              <th>User / Actor</th>
              <th>Event Type</th>
              <th>Target Element</th>
              <th>URL Route</th>
              <th>Origin IP</th>
            </tr>
          </thead>
          <tbody>
            {(loading && logs.length === 0) ? (
              <tr>
                <td colSpan={7} className="cs-empty">
                  <div className="sync-loader">
                    <span className="sync-icon">⚡</span>
                    <span className="sync-text">INSTANT SYNC ACTIVE...</span>
                  </div>
                </td>
              </tr>
            ) : filteredLogs.length === 0 ? (
              <tr><td colSpan={7} className="cs-empty">No clickstream records found in this vector.</td></tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="cs-row">
                  <td className="cs-id-cell">{log.id.substring(0, 8)}...</td>
                  <td className="cs-time-cell">{formatDelhiTime(log.timestamp)}</td>
                  <td className="cs-user-cell">
                    <div style={{ fontWeight: 'bold', color: log.user_id === 'ADM-777' ? '#fff' : '#8b5cf6' }}>
                      {log.numeric_id || log.user_id}
                    </div>
                    {log.phone_number && (
                      <div style={{color: '#9ca3af', fontSize: '10px', marginTop: '2px'}}>
                        📞 {log.phone_number}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="cs-badge" style={{ background: getEventColor(log.event_type) + '22', color: getEventColor(log.event_type), borderColor: getEventColor(log.event_type) }}>
                      {log.event_type}
                    </span>
                  </td>
                  <td className="cs-target-cell">{log.element_id}</td>
                  <td className="cs-route-cell">{log.url_route}</td>
                  <td className="cs-ip-cell">{log.ip_address}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .cs-tracker-container {
          background: #0d0d12;
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 20px;
          padding: 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: fadeIn 0.5s ease-out;
        }
        
        .cs-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        
        .cs-title {
          color: #fff;
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 5px 0;
          letter-spacing: -0.5px;
        }
        
        .cs-subtitle {
          color: #818cf8;
          font-size: 13px;
          margin: 0;
          font-weight: 600;
        }
        
        .cs-header-right {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        
        .cs-search-box {
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
        
        .cs-search-box input {
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
        
        .cs-search-box input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 10px rgba(99,102,241,0.2);
        }
        
        .cs-refresh-btn {
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #818cf8;
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
        
        .cs-refresh-btn:hover {
          background: rgba(99, 102, 241, 0.2);
          color: #fff;
        }
        
        .spinning {
          display: inline-block;
          animation: spin 1s linear infinite;
        }
        
        .cs-stats-row {
          display: flex;
          gap: 15px;
          margin-bottom: 24px;
        }
        
        .cs-stat-box {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 15px 20px;
          border-radius: 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .cs-stat-val {
          font-size: 24px;
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
        }
        
        .cs-stat-label {
          font-size: 11px;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        
        .cs-live-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #10b981;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 1px;
          height: 100%;
        }
        
        .pulse-dot {
          width: 10px;
          height: 10px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
          animation: pulse 1.5s infinite;
        }
        
        .cs-table-container {
          flex: 1;
          overflow: auto;
          background: #0a0a0f;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.03);
        }
        
        .cs-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        
        .cs-table th {
          background: rgba(255,255,255,0.02);
          padding: 15px 20px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #8b5cf6;
          font-weight: 800;
          position: sticky;
          top: 0;
          z-index: 10;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .cs-row {
          border-bottom: 1px dashed rgba(255,255,255,0.05);
          transition: 0.2s;
        }
        
        .cs-row:hover {
          background: rgba(255,255,255,0.02);
        }
        
        .cs-row td {
          padding: 15px 20px;
          font-size: 13px;
          color: #d1d5db;
        }
        
        .cs-id-cell {
          font-family: monospace;
          color: #6b7280 !important;
          font-size: 12px !important;
        }
        
        .cs-time-cell {
          color: #9ca3af !important;
          font-size: 12px !important;
        }
        
        .cs-user-cell {
          font-weight: 700;
          color: #fff !important;
        }
        
        .cs-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.5px;
          background: rgba(255,255,255,0.02);
        }
        
        .cs-target-cell {
          font-family: monospace;
          color: #a78bfa !important;
        }
        
        .cs-route-cell {
          font-family: monospace;
          color: #34d399 !important;
        }
        
        .cs-ip-cell {
          font-family: monospace;
          color: #fca5a5 !important;
        }
        
        .cs-empty {
          text-align: center;
          padding: 50px !important;
          color: #6b7280 !important;
          font-style: italic;
        }
        .sync-loader { display: flex; flex-direction: column; align-items: center; gap: 15px; }
        .sync-icon { font-size: 32px; animation: spin 2s linear infinite; display: inline-block; }
        .sync-text { font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #6366f1; }
        
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
        
        .cs-table-container::-webkit-scrollbar { width: 6px; }
        .cs-table-container::-webkit-scrollbar-track { background: transparent; }
        .cs-table-container::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.3); border-radius: 10px; }
      `}</style>
    </div>
  );
}
