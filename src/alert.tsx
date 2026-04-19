import { useState, useEffect } from 'react';
import axios from 'axios';

const AlertCenter = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem('apc_token');
      const res = await axios.get('http://127.0.0.1:5000/alerts', {
        headers: { 'x-access-token': token }
      });
      setAlerts(res.data);
    } catch (err) {
      console.error('Failed to fetch alerts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleResolve = async (alertId: string) => {
    try {
      const token = localStorage.getItem('apc_token');
      await axios.post(`http://127.0.0.1:5000/resolve-alert/${alertId}`, {}, {
        headers: { 'x-access-token': token }
      });
      fetchAlerts();
    } catch (err) {
      console.error('Failed to resolve alert', err);
    }
  };

  return (
    <div className="module-inner-content">
      {/* HEADER SECTION - FIXED ALIGNMENT */}
      <div className="vault-header-control" style={{marginBottom: '20px'}}>
        <div className="header-status-block">
          <div className="pulse-indicator"></div>
          <h3 className="module-title">REAL_TIME_ALERT_CENTER</h3>
        </div>
        <span className="event-count">{alerts.length} ALERT_DATA_STREAM</span>
      </div>

      <div style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
        {/* HEADER LABELS - ALIGNED TO ROWS */}
        <div className="v-table-head alert-grid">
          <span className="col-label">SEVERITY</span>
          <span className="col-label">TIMESTAMP</span>
          <span className="col-label">EVENT_MESSAGE</span>
          <span className="col-label">NODE_ID</span>
          <span className="col-label" style={{ textAlign: 'right' }}>STATUS</span>
        </div>

        <div className="v-table-body">
          {loading ? (
            <div className="system-loader">// SCANNING_NETWORK...</div>
          ) : alerts.length === 0 ? (
            <div className="system-loader">NO_ALERTS_IN_QUEUE</div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className="v-table-row alert-grid">
                <span className={`severity-tag ${alert.severity.toLowerCase()}`}>
                  {alert.severity}
                </span>
                <span className="ts">{alert.timestamp}</span>
                <span className="msg">{alert.alert_message}</span>
                <span className="node">{alert.user}</span>
                <span className="stat" style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px'}}>
                  {alert.resolved ? (
                    <span style={{color: '#10b981'}}>RESOLVED</span>
                  ) : (
                    <>
                      <span style={{color: '#ef4444'}}>ACTIVE_EVENT</span>
                      <button onClick={() => handleResolve(alert.id)} className="resolve-btn">✓ RESOLVE</button>
                    </>
                  )}
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
          padding: 18px 25px; 
          border-radius: 18px; 
          border: 1px solid rgba(255,255,255,0.05); 
          margin-bottom: 20px;
        }

        .header-status-block { 
          display: flex; 
          align-items: center; 
          gap: 12px;
          height: 20px;
        }

        .module-title { 
          font-size: 14px; 
          font-weight: 900; 
          color: #2563eb; 
          letter-spacing: 2px; 
          margin: 0; 
          font-family: monospace;
          line-height: 1;
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

        /* ONE-LINE GRID SYSTEM */
        .alert-grid {
          display: grid !important;
          grid-template-columns: 120px 180px 1fr 150px 120px !important;
          align-items: center !important;
          gap: 20px;
          white-space: nowrap;
        }

        .v-table-head { 
          padding: 20px 40px; 
          background: #000; 
          border-bottom: 1px solid #111;
        }

        .col-label {
          font-size: 10px; 
          color: #2563eb; 
          font-weight: 900; 
          letter-spacing: 2px;
          font-family: monospace;
          line-height: 1;
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
        }

        /* TEXT COLORS & FORMAL STYLING */
        .severity-tag { font-size: 9px; font-weight: 900; padding: 2px 8px; border-radius: 4px; border: 1px solid; width: fit-content; }
        .high { border-color: #ef4444; color: #ef4444; }
        .medium { border-color: #f59e0b; color: #f59e0b; }
        .low { border-color: #10b981; color: #10b981; }

        .ts { color: #555; }
        .msg { color: #aaa; font-weight: 900; overflow: hidden; text-overflow: ellipsis; }
        .node { color: #2563eb; font-weight: 900; }
        
        .stat { 
          text-align: right; 
          font-weight: 900; 
          font-size: 10px; 
          color: #444; 
          line-height: 1;
        }

        .resolve-btn {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 9px;
          font-weight: 900;
          cursor: pointer;
          font-family: monospace;
          transition: 0.2s;
        }

        .resolve-btn:hover {
          background: rgba(16, 185, 129, 0.2);
          transform: translateY(-1px);
        }

        .system-loader { padding: 50px; text-align: center; color: #222; font-weight: 900; font-family: monospace; }
      `}</style>
    </div>
  );
};

export default AlertCenter;