import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from './config';

const SecurityFeed = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('apc_token');
      
      const res = await axios.get(`${API_BASE}/security-logs`, {
        headers: { 'x-access-token': token }
      });
      
      setLogs(res.data);
    } catch (err) {
      console.error('Failed to fetch security logs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="module-inner-content">
      <div className="vault-header-control" style={{marginBottom: '20px'}}>
        <div className="header-status-block">
          <div className="pulse-indicator"></div>
          <h3 className="module-title">SECURITY_ACTIVITY_FEED</h3>
        </div>
        <span className="event-count">{logs.length} SECURITY_ACTIVITY_LOGS</span>
      </div>

      <div style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
        <div className="v-table-head security-grid">
          <span className="col-label">TIME</span>
          <span className="col-label">ACTOR</span>
          <span className="col-label">ACTION</span>
          <span className="col-label">RESOURCE</span>
          <span className="col-label" style={{ textAlign: 'right' }}>STATUS</span>
        </div>
        
        <div className="v-table-body">
          {loading ? (
            <div className="system-loader">// RECONSTRUCTING_STREAM...</div>
          ) : logs.length === 0 ? (
            <div className="system-loader">NO_RECORDS_IN_LEDGER</div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="v-table-row security-grid">
                <span className="ts">{log.timestamp}</span>
                <span className="actor">{log.user_id}</span>
                <span className="event">{log.event}</span>
                <span className="res">{log.file_id?.slice(0, 8) || "SYS"}</span>
                <span className={`stat ${log.status === 'SUCCESS' ? 'pass' : 'fail'}`}>
                  {log.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .module-inner-content { 
          flex: 1;
          width: 100%;
          height: 100%; 
          display: flex; 
          flex-direction: column; 
          padding: 25px;
          box-sizing: border-box;
        }

        .vault-header-control { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          background: rgba(255,255,255,0.02); 
          padding: 15px 25px; 
          border-radius: 15px; 
          border: 1px solid rgba(255,255,255,0.05); 
          margin-bottom: 15px;
        }

        .header-status-block { 
          display: flex; 
          align-items: center; 
          gap: 12px;
          height: 20px;
        }

        .module-title { 
          font-size: 13px; 
          font-weight: 900; 
          color: #2563eb; 
          letter-spacing: 2px; 
          font-family: monospace; 
          margin: 0;
          line-height: 1;
          margin-bottom: 4px;
        }

        .module-subtitle {
          font-size: 10px;
          color: #888;
          font-family: monospace;
          margin: 0;
          letter-spacing: 0.5px;
        }

        .pulse-indicator { 
          width: 8px; 
          height: 8px; 
          background: #2563eb; 
          border-radius: 50%; 
          box-shadow: 0 0 10px #2563eb;
          flex-shrink: 0;
        }

        .event-count { 
          font-size: 10px; 
          color: #666; 
          font-weight: 900; 
          font-family: monospace; 
        }

        .event-count { 
          font-size: 10px; 
          color: #666; 
          font-weight: 900; 
          font-family: monospace; 
        }

        .security-grid {
          display: grid !important; 
          grid-template-columns: 180px 140px 1fr 140px 100px !important; 
          align-items: center !important; 
          gap: 20px;
          white-space: nowrap;
        }

        .v-table-head { 
          padding: 20px 40px; 
          background: #000; 
          border-bottom: 1px solid #111;
          height: 50px; /* Fixed height for header */
          box-sizing: border-box;
        }

        .col-label {
          font-size: 10px; 
          color: #2563eb; 
          font-weight: 900; 
          letter-spacing: 2px;
          font-family: monospace;
          line-height: 1; /* Eliminates extra vertical space */
          display: inline-block;
        }

        .v-table-body { flex: 1; overflow-y: auto; padding: 15px; }
        
        .v-table-row { 
          padding: 18px 40px; 
          background: rgba(255,255,255,0.01); 
          border: 1px solid #0a0a0a; 
          margin-bottom: 8px; 
          border-radius: 12px; 
          font-family: monospace; 
          font-size: 11px;
          box-sizing: border-box;
        }

        .ts { color: #555; }
        .actor { color: #888; font-weight: 900; }
        .event { color: #aaa; font-weight: 900; } 
        .res { color: #2563eb; font-weight: 900; }
        
        .stat { 
          text-align: right; 
          font-weight: 900; 
          font-size: 10px; 
          line-height: 1; 
        }
        
        .pass { color: #10b981; }
        .fail { color: #ef4444; }

        .system-loader { padding: 50px; text-align: center; color: #222; font-weight: 900; font-family: monospace; }
      `}</style>
    </div>
  );
};

export default SecurityFeed;