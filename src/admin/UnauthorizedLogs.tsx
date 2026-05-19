import React from 'react';

interface UnauthorizedLogsProps {
  unauthLogs: any[];
  moduleLoading: boolean;
  formatDelhiTime: (utcDateStr: any) => string;
  fetchModuleData: () => void;
  handleAdminResolve: (alert_id: string) => void;
}

export default function UnauthorizedLogs({ unauthLogs, moduleLoading, formatDelhiTime, fetchModuleData, handleAdminResolve }: UnauthorizedLogsProps) {
  return (
    <div className="soc-full-card">
      <div className="card-header">
        <h3>Unauthorized Access Logs <span className="count-badge">{unauthLogs.length} total</span></h3>
        <button onClick={() => fetchModuleData()} className="soc-pill-btn">↻</button>
      </div>
      <div className="soc-list">
        <div className="list-head" style={{gridTemplateColumns: '1fr 1.5fr 1.5fr 0.5fr 1fr'}}>
          <span>IP</span><span>Message</span><span>Time</span><span>Status</span><span>Action</span>
        </div>
        {moduleLoading ? (
          <p className="empty-state">Loading alerts...</p>
        ) : unauthLogs.length === 0 ? (
          <p className="empty-state">No logs.</p>
        ) : (
          unauthLogs.map((a, i) => (
            <div key={i} className="list-row" style={{gridTemplateColumns: '1fr 1.5fr 1.5fr 0.5fr 1fr'}}>
              <span className="l-id">{a.ip}</span>
              <span className="l-target" style={{fontSize: '10px'}}>{a.message}</span>
              <span className="l-time">{formatDelhiTime(a.timestamp)}</span>
              <span className={a.resolved ? 'c-green' : 'c-red'}>{a.resolved ? 'Resolved' : 'Active'}</span>
              <span>
                {!a.resolved && (
                  <button onClick={() => handleAdminResolve(a.id)} className="t-resolve" style={{margin:0}}>✓ Resolve</button>
                )}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
