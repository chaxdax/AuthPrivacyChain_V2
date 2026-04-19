import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ClickStreamTracker from './ClickStreamTracker';
import BlockchainLedger from './BlockchainLedger';
import IPGeofencingMonitor from './IPGeofencingMonitor';

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

const ADMIN_TOKEN = 'admin-bypass';
const API = (import.meta.env.VITE_API_URL || '${import.meta.env.VITE_API_URL || }');
const headers = { 'x-admin-token': ADMIN_TOKEN };

// --- INTERFACES ---
interface ForensicStats {
  security_score: number; score_deductions: string[]; blockchain_integrity: string;
  total_users: number; total_files: number; encrypted_files: number;
  total_logins: number; active_alerts: number; high_severity_alerts: number; pending_recovery_requests: number;
  recent_activity: { actor: string; action: string; target: string; timestamp: string }[];
  live_threats: { alert_id: string; ip: string; file_id: string; severity: string; message: string; timestamp: string; user_id: string }[];
  scan_timestamp: string; system_lockdown: boolean;
  users_list?: any[]; files_list?: any[];
}

interface RecoveryRequest { request_id: string; user_id: string; phone: string; name_entered: string; name_in_db: string; name_match: boolean; status: string; timestamp: string; }
  // Unused interfaces removed to fix TS errors

type AdminModule = 'mfd' | 'clickstream' | 'blockchain' | 'ip' | 'alerts' | 'users' | 'recovery';

export default function MasterForensicDashboard() {
  const [stats, setStats] = useState<ForensicStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [activeModule, setActiveModule] = useState<AdminModule>('mfd');
  const [mfdSubView, setMfdSubView] = useState<'activity' | 'score' | 'users' | 'files' | 'alerts' | 'recovery' | 'logins'>('activity');

  // Module States
  const [recoveryQueue, setRecoveryQueue] = useState<RecoveryRequest[]>([]);
  const [clickstreamLogs, setClickstreamLogs] = useState<any[]>([]);
  const [blockchainData, setBlockchainData] = useState<any>(null);
  const [ipThreats, setIpThreats] = useState<any[]>([]);
  const [unauthLogs, setUnauthLogs] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [moduleLoading, setModuleLoading] = useState(false);
  const [telemetryHistory, setTelemetryHistory] = useState<number[]>(Array(100).fill(10));

  // --- FETCHERS ---
  const fetchStats = useCallback(async () => {
    try { const res = await axios.get(`${API}/admin/forensic-stats`, { headers }); setStats(res.data); } 
    catch { console.error('Failed to fetch forensic stats'); } 
    finally { setLoading(false); }
  }, []);

  const fetchModuleData = useCallback(async () => {
    setModuleLoading(true);
    try {
      if (activeModule === 'recovery') {
        const res = await axios.get(`${API}/admin/recovery-queue`, { headers }); setRecoveryQueue(res.data);
      } else if (activeModule === 'clickstream') {
        const res = await axios.get(`${API}/admin/clickstream-tracker-logs`, { headers }); setClickstreamLogs(res.data);
      } else if (activeModule === 'blockchain') {
        const res = await axios.get(`${API}/admin/blockchain-ledger`, { headers }); setBlockchainData(res.data);
      } else if (activeModule === 'ip') {
        const res = await axios.get(`${API}/admin/ip-threats`, { headers }); setIpThreats(res.data);
      } else if (activeModule === 'alerts') {
        const res = await axios.get(`${API}/admin/unauthorized-logs`, { headers }); setUnauthLogs(res.data);
      } else if (activeModule === 'users') {
        const res = await axios.get(`${API}/admin/users`, { headers }); setUsersList(res.data);
      }
    } catch { console.error(`Failed to fetch ${activeModule} data`); }
    finally { setModuleLoading(false); }
  }, [activeModule]);

  const fetchRecoveryDirect = async () => {
    try { const res = await axios.get(`${API}/admin/recovery-queue`, { headers }); setRecoveryQueue(res.data); } catch {}
  };

  const fetchClickstreamDirect = async () => {
    try { const res = await axios.get(`${API}/admin/clickstream-tracker-logs`, { headers }); setClickstreamLogs(res.data); } catch {}
  };

  useEffect(() => {
    if (mfdSubView === 'recovery') fetchRecoveryDirect();
    if (mfdSubView === 'logins') fetchClickstreamDirect();
  }, [mfdSubView]);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  useEffect(() => {
    if (activeModule !== 'mfd') fetchModuleData();
  }, [activeModule, fetchModuleData]);

  // LIVE TELEMETRY GENERATOR
  useEffect(() => {
    const t = setInterval(() => {
      setTelemetryHistory(prev => {
        const users = stats?.total_users ?? 0;
        const logins = stats?.total_logins ?? 0;
        const files = stats?.encrypted_files ?? 0;
        const alerts = stats?.active_alerts ?? 0;
        
        // Base load calculated from real data
        const baseLoad = (users * 2) + logins + (files * 3);
        const noise = Math.random() * 15 - 7.5;
        
        let newPoint = Math.max(5, Math.min(100, (baseLoad % 80) + 10 + noise));
        
        // Threat spike
        if (alerts > 0 || stats?.blockchain_integrity !== 'INTACT') {
          newPoint = 80 + Math.random() * 20;
        }

        return [...prev.slice(1), newPoint];
      });
    }, 500); // 500ms for fast live ECG feel
    return () => clearInterval(t);
  }, [stats]);

  // --- ACTIONS ---
  const handleScan = async () => {
    setScanning(true); setScanResult(null);
    try { const res = await axios.post(`${API}/admin/system-scan`, {}, { headers }); setScanResult(res.data); fetchStats(); } 
    catch { setScanResult({ message: 'Scan failed.', status: 'ERROR' }); } 
    finally { setScanning(false); }
  };

  const handleLockdown = async () => {
    if (!window.confirm('⚠️ CONFIRM EMERGENCY LOCKDOWN? This blocks all user activity.')) return;
    try { await axios.post(`${API}/admin/emergency-lockdown`, {}, { headers }); fetchStats(); } catch { alert('Command failed.'); }
  };

  const handleLiftLockdown = async () => {
    if (!window.confirm('✅ LIFT LOCKDOWN? Restores regular user access.')) return;
    try { await axios.post(`${API}/admin/lift-lockdown`, {}, { headers }); fetchStats(); } catch { alert('Command failed.'); }
  };

  const handleRecoveryAction = async (req_id: string, action: 'approve' | 'reject') => {
    try { await axios.post(`${API}/admin/${action}-recovery/${req_id}`, {}, { headers }); fetchModuleData(); fetchStats(); } catch { console.error('Recovery action failed'); }
  };

  const handleAdminResolve = async (alert_id: string) => {
    const code = window.prompt("ENTER ADMIN SECURITY CODE TO RESOLVE ALERT:");
    if (code !== "admin123") { alert("INVALID CODE. ACCESS DENIED."); return; }
    try { await axios.post(`${API}/admin/resolve-alert/${alert_id}`, {}, { headers }); fetchStats(); if (activeModule === 'alerts') fetchModuleData(); } catch { alert("Failed to resolve."); }
  };

  const handleUserAction = async (user_id: string, action: 'suspend' | 'reset') => {
    const endpoint = action === 'suspend' ? 'suspend-user' : 'reset-token';
    const msg = action === 'suspend' ? 'SUSPEND this user?' : 'FORCE RESET this users token?';
    if (!window.confirm(`⚠️ ${msg}`)) return;
    try { await axios.post(`${API}/admin/${endpoint}/${user_id}`, {}, { headers }); alert('Success'); fetchModuleData(); } catch { alert('Action failed.'); }
  };

  if (loading) {
    return (
      <div className="soc-loading">
        <div className="soc-spinner"></div><p>Initializing SOC Terminal...</p>
        <style>{`.soc-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#05050a;color:#8b5cf6;} .soc-spinner{width:50px;height:50px;border:3px solid rgba(139,92,246,0.2);border-top:3px solid #8b5cf6;border-radius:50%;animation:spin 1s linear infinite;} @keyframes spin{to{transform:rotate(360deg);}}`}</style>
      </div>
    );
  }

  const actionColor = (action: string) => {
    const map: Record<string, string> = { LOGIN: '#3b82f6', UPLOAD: '#10b981', DELETE: '#ef4444', DECRYPT_OWN: '#8b5cf6', DOWNLOAD_RAW: '#f59e0b', EMERGENCY_LOCKDOWN: '#ff0000', GLOBAL_SCAN: '#22d3ee', APPROVE_RECOVERY: '#10b981', REJECT_RECOVERY: '#ef4444', SUSPEND_USER: '#ef4444', RESET_TOKEN: '#a78bfa' };
    return map[action] || '#666';
  };

  return (
    <div className="soc-app">
      {/* HEADER */}
      <header className="soc-header">
        <div className="soc-header-left">
          <img src="/logo.png" alt="Logo" className="soc-logo-img" onError={(e) => { e.currentTarget.src = ''; e.currentTarget.className = 'soc-logo fallback-logo'; }} />
          <div className="soc-title-area">
            <h1>AuthPrivacyChain V2</h1>
            <p>System Command Center</p>
          </div>
        </div>
        <div className="soc-header-right">
          <div className="admin-profile">
            <div className="admin-avatar">777</div>
            <div className="admin-info">
              <span className="admin-name">ADM-777</span>
              <span className="admin-role">System Admin Node</span>
            </div>
          </div>
          <button className="soc-logout-btn" onClick={() => window.location.reload()}>Logout <span>→</span></button>
        </div>
      </header>

      {/* MODULES ROW (UPSIDE BOXES - TABS) */}
      <div className="soc-modules-grid">
        <div className={`soc-tab ${activeModule === 'mfd' ? 'active' : ''}`} onClick={() => setActiveModule('mfd')}>
          <span className="box-icon">🛡️</span> <span className="box-name">Master Forensic Dashboard</span>
        </div>
        <div className={`soc-tab ${activeModule === 'clickstream' ? 'active' : ''}`} onClick={() => setActiveModule('clickstream')}>
          <span className="box-icon">🖱️</span> <span className="box-name">Click-Stream Tracker</span>
        </div>
        <div className={`soc-tab ${activeModule === 'blockchain' ? 'active' : ''}`} onClick={() => setActiveModule('blockchain')}>
          <span className="box-icon">⛓️</span> <span className="box-name">Blockchain Ledger</span>
        </div>
        <div className={`soc-tab ${activeModule === 'ip' ? 'active' : ''}`} onClick={() => setActiveModule('ip')}>
          <span className="box-icon">🌍</span> <span className="box-name">IP-Geofencing Monitor</span>
        </div>
        <div className={`soc-tab ${activeModule === 'alerts' ? 'active' : ''}`} onClick={() => setActiveModule('alerts')}>
          <span className="box-icon">🚨</span> <span className="box-name">Unauthorized Access Logs</span>
        </div>
        <div className={`soc-tab ${activeModule === 'users' ? 'active' : ''}`} onClick={() => setActiveModule('users')}>
          <span className="box-icon">👥</span> <span className="box-name">User Management</span>
        </div>
      </div>

      {/* GLOBAL ACTIONS BAR (Between Modules and Main Content) */}
      <div className="soc-global-actions">
        <button className="soc-pill-btn" onClick={handleScan} disabled={scanning}>{scanning ? '⟳ Scanning Network...' : '⚡ Global Scan'}</button>
        {stats?.system_lockdown ? (
          <button className="soc-pill-btn danger active" onClick={handleLiftLockdown}>✅ Lift Lockdown</button>
        ) : (
          <button className="soc-pill-btn danger" onClick={handleLockdown}>🔒 Emergency Lockdown</button>
        )}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="soc-main-body">
        {scanResult && (
          <div className={`soc-scan-banner ${scanResult.status === 'ERROR' ? 'err' : ''}`}>
            <span>⌁ SCAN COMPLETE</span>
            <span>Nodes: <b>{scanResult.nodes_scanned}</b></span>
            <span>Threats: <b>{scanResult.threats_found}</b></span>
            <span>Unencrypted: <b>{scanResult.unencrypted_files}</b></span>
            <button onClick={() => setScanResult(null)} className="banner-close">✕</button>
          </div>
        )}

        {/* 1. MASTER FORENSIC DASHBOARD */}
        {activeModule === 'mfd' && (
          <div className="mfd-classic">
            {/* 7 Big Stat Cards (Classic MFD) */}
            <div className="classic-stats-grid">
              <div className={`stat-card ${mfdSubView === 'score' ? 'active-stat' : ''}`} onClick={() => setMfdSubView('score')}>
                <div className="sc-icon-row"><span className="sc-icon" style={{background: 'rgba(16,185,129,0.1)', color: '#10b981'}}>🎯</span><span className="sc-title">SECURITY SCORE</span></div>
                <div className="sc-body" style={{alignItems: 'center', marginTop: '10px'}}>
                  <div className="sc-val" style={{marginBottom: '0'}}>
                    <div className="score-circle" style={{width: '70px', height: '70px'}}>
                       <svg viewBox="0 0 36 36" className="circular-chart green">
                         <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                         <path className="circle" strokeDasharray={`${stats?.security_score ?? 0}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                         <text x="18" y="20.35" className="percentage" style={{fontSize: '11px'}}>{stats?.security_score ?? 0}</text>
                       </svg>
                    </div>
                  </div>
                  <span className="sc-subtext" style={{color: '#10b981', marginTop: '6px'}}>● SECURE</span>
                </div>
              </div>
              <div className={`stat-card ${mfdSubView === 'activity' ? 'active-stat' : ''}`} onClick={() => setMfdSubView('activity')}>
                <div className="sc-icon-row"><span className="sc-icon">⛓️</span><span className="sc-title">Blockchain</span></div>
                <div className="sc-body">
                  <span className="sc-val" style={{color: stats?.blockchain_integrity === 'INTACT' ? '#10b981' : '#f59e0b'}}>{stats?.blockchain_integrity ?? 'VERIFYING'}</span>
                  <span className="sc-subtext" style={{color: '#818cf8'}}>All files encrypted</span>
                </div>
              </div>
              <div className={`stat-card ${mfdSubView === 'users' ? 'active-stat' : ''}`} onClick={() => setMfdSubView('users')}>
                <div className="sc-icon-row"><span className="sc-icon">👥</span><span className="sc-title">Registered Users</span></div>
                <div className="sc-body">
                  <span className="sc-val">{stats?.total_users ?? 0}</span>
                  <span className="sc-subtext">Users</span>
                </div>
              </div>
              <div className={`stat-card ${mfdSubView === 'files' ? 'active-stat' : ''}`} onClick={() => setMfdSubView('files')}>
                <div className="sc-icon-row"><span className="sc-icon">🔐</span><span className="sc-title">Encrypted Files</span></div>
                <div className="sc-body">
                  <span className="sc-val">{stats?.encrypted_files ?? 0}<small style={{fontSize:'16px', color:'#6b7280'}}>/{stats?.total_files ?? 0}</small></span>
                  <span className="sc-subtext">Files</span>
                </div>
              </div>
              <div className={`stat-card ${mfdSubView === 'alerts' ? 'active-stat' : ''}`} onClick={() => setMfdSubView('alerts')}>
                <div className="sc-icon-row"><span className="sc-icon">🚨</span><span className="sc-title">Active Alerts</span></div>
                <div className="sc-body">
                  <span className="sc-val" style={{color: stats?.active_alerts && stats.active_alerts > 0 ? '#ef4444' : '#10b981'}}>{stats?.active_alerts ?? 0}</span>
                  <span className="sc-subtext">Threats</span>
                </div>
              </div>
              <div className={`stat-card ${mfdSubView === 'recovery' ? 'active-stat' : ''}`} onClick={() => setMfdSubView('recovery')}>
                <div className="sc-icon-row"><span className="sc-icon">🛠️</span><span className="sc-title">Recovery Queue</span></div>
                <div className="sc-body">
                  <span className="sc-val" style={{color: stats?.pending_recovery_requests && stats.pending_recovery_requests > 0 ? '#f59e0b' : '#fff'}}>{stats?.pending_recovery_requests ?? 0}</span>
                  <span className="sc-subtext">Pending</span>
                </div>
              </div>
              <div className={`stat-card ${mfdSubView === 'logins' ? 'active-stat' : ''}`} onClick={() => setMfdSubView('logins')}>
                <div className="sc-icon-row"><span className="sc-icon">🖱️</span><span className="sc-title">Total Logins</span></div>
                <div className="sc-body">
                  <span className="sc-val">{stats?.total_logins ?? 0}</span>
                  <span className="sc-subtext">History</span>
                </div>
              </div>
            </div>

            {/* Bottom 2 Panels */}
            <div className="classic-panels-grid">
              <div className="soc-full-card" style={{minHeight: '400px'}}>
                <div className="card-header" style={{paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                   <h3>
                     {mfdSubView === 'activity' && 'Recent System Activity'}
                     {mfdSubView === 'score' && 'Security Score Details'}
                     {mfdSubView === 'users' && 'Recently Registered Users'}
                     {mfdSubView === 'files' && 'Encrypted File Vaults'}
                     {mfdSubView === 'alerts' && 'Active Threats & Alerts'}
                     {mfdSubView === 'recovery' && 'Pending Recovery Requests'}
                     {mfdSubView === 'logins' && 'Recent Login Activity'}
                   </h3> 
                   <button onClick={() => { fetchStats(); if (mfdSubView === 'recovery') fetchRecoveryDirect(); }} className="soc-pill-btn">↻ Refresh</button>
                </div>
                <div className="soc-list" style={{paddingTop: '16px'}}>
                  {/* ACTIVITY VIEW */}
                  {mfdSubView === 'activity' && (
                    <>
                      <div className="list-head" style={{display:'flex', gap:'10px', padding:'0 12px 10px'}}>
                        <span style={{width:'130px', textAlign:'center'}}>Action</span>
                        <span style={{width:'120px'}}>User ID</span>
                        <span style={{flex:1}}>Target</span>
                        <span style={{width:'150px', textAlign:'right'}}>Date & Time</span>
                      </div>
                      {(stats?.recent_activity?.length ?? 0) === 0 ? <p className="empty-state">No recent activity.</p> : stats?.recent_activity.map((log, i) => (
                        <div key={i} className="soc-list-row" style={{display:'flex', gap:'10px', background: 'transparent', borderBottom: '1px dashed rgba(255,255,255,0.05)', borderRadius: 0}}>
                          <span className="l-tag" style={{ color: actionColor(log.action), borderColor: actionColor(log.action), width: '130px', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>{log.action}</span>
                          <span className="l-user" style={{width: '120px'}}>{log.actor}</span>
                          <span className="l-target" style={{flex: 1, color: '#6b7280', fontSize: '11px'}}>{log.target !== 'N/A' ? `— TARGET NODE: ${log.target}` : '—'}</span>
                          <span className="l-time" style={{width:'150px', textAlign:'right'}}>{formatDelhiTime(log.timestamp)}</span>
                        </div>
                      ))}
                    </>
                  )}

                  {/* SCORE DEDUCTIONS VIEW */}
                  {mfdSubView === 'score' && (
                    (stats?.score_deductions?.length ?? 0) === 0 ? <div className="empty-state"><div style={{fontSize:'32px', marginBottom:'10px'}}>✅</div><p>Score is perfect 100/100. No deductions!</p></div> : stats?.score_deductions.map((ded, i) => (
                      <div key={i} className="threat-card" style={{borderColor:'#ef4444'}}>
                         <p style={{margin:0, color:'#ef4444', fontWeight:700}}>{ded}</p>
                      </div>
                    ))
                  )}

                  {/* USERS VIEW */}
                  {mfdSubView === 'users' && (
                    <>
                      <div className="list-head" style={{display:'flex', gap:'10px', padding:'0 12px 10px'}}>
                        <span style={{width:'150px'}}>User ID</span>
                        <span style={{flex:1}}>Name</span>
                        <span style={{width:'150px', textAlign:'right'}}>Contact</span>
                      </div>
                      {(stats?.users_list?.length ?? 0) === 0 ? <p className="empty-state">No users registered.</p> : stats?.users_list?.map((u: any, i: number) => (
                        <div key={i} className="soc-list-row" style={{display:'flex', gap:'10px', background: 'transparent', borderBottom: '1px dashed rgba(255,255,255,0.05)', borderRadius: 0}}>
                          <span className="l-id" style={{width: '150px'}}>{u.numeric_id}</span>
                          <span className="l-user" style={{flex: 1}}>{u.name}</span>
                          <span className="l-target" style={{width:'150px', textAlign:'right'}}>{u.phone}</span>
                        </div>
                      ))}
                    </>
                  )}

                  {/* FILES VIEW */}
                  {mfdSubView === 'files' && (
                    <>
                      <div className="list-head" style={{display:'flex', gap:'10px', padding:'0 12px 10px'}}>
                        <span style={{width:'200px'}}>File ID</span>
                        <span style={{flex:1, textAlign:'right'}}>Encryption Status</span>
                      </div>
                      {(stats?.files_list?.length ?? 0) === 0 ? <p className="empty-state">No files uploaded.</p> : stats?.files_list?.map((f: any, i: number) => (
                        <div key={i} className="soc-list-row" style={{display:'flex', gap:'10px', background: 'transparent', borderBottom: '1px dashed rgba(255,255,255,0.05)', borderRadius: 0}}>
                          <span className="l-id" style={{width: '200px'}}>#{(f.file_id || '').substring(0, 4)}</span>
                          <span className={f.encrypted ? 'c-green' : 'c-yellow'} style={{flex: 1, textAlign:'right'}}>{f.encrypted ? '🔐 AES-256 Encrypted' : '⚠️ Plain Text'}</span>
                        </div>
                      ))}
                    </>
                  )}

                  {/* ALERTS VIEW */}
                  {mfdSubView === 'alerts' && (
                    (stats?.live_threats?.length ?? 0) === 0 ? <p className="empty-state">No active alerts.</p> : stats?.live_threats.map((t, i) => (
                      <div key={i} className="threat-card">
                        <div className="t-head">
                           <span>ID: {t.user_id}</span>
                           <div>
                             <span className={`t-sev ${(t.severity || '').toLowerCase()}`}>{t.severity}</span>
                             <button onClick={() => handleAdminResolve(t.alert_id)} className="t-resolve">✓ Resolve</button>
                           </div>
                        </div>
                        <p className="t-msg">{t.message}</p>
                        <p className="t-time">{formatDelhiTime(t.timestamp)}</p>
                      </div>
                    ))
                  )}

                  {/* RECOVERY VIEW */}
                  {mfdSubView === 'recovery' && (
                    recoveryQueue.length === 0 ? <p className="empty-state">No pending recovery requests.</p> : recoveryQueue.map(r => (
                      <div key={r.request_id} className="threat-card">
                       <div className="t-head"><span>ID: {r.user_id}</span> <span className={`t-sev ${(r.status || '').toLowerCase()}`}>{r.status}</span></div>
                         <p className="t-msg">Phone: {r.phone} | Match: <span style={{color: r.name_match ? '#10b981' : '#ef4444'}}>{r.name_match ? 'YES' : 'NO'}</span></p>
                         {r.status === 'PENDING' && (
                            <div style={{marginTop: '10px', display: 'flex', gap: '10px'}}>
                               <button onClick={() => { handleRecoveryAction(r.request_id, 'approve'); fetchRecoveryDirect(); }} className="t-resolve" style={{borderColor:'#10b981', color:'#10b981', margin:0}}>✓ Approve</button>
                               <button onClick={() => { handleRecoveryAction(r.request_id, 'reject'); fetchRecoveryDirect(); }} className="t-resolve" style={{borderColor:'#ef4444', color:'#ef4444', margin:0}}>✕ Reject</button>
                            </div>
                         )}
                      </div>
                    ))
                  )}

                  {/* LOGINS VIEW */}
                  {mfdSubView === 'logins' && (
                    <>
                      <div className="list-head" style={{display:'flex', gap:'10px', padding:'0 12px 10px'}}>
                        <span style={{width:'130px', textAlign:'center'}}>Action</span>
                        <span style={{flex:1}}>User ID</span>
                        <span style={{width:'150px', textAlign:'right'}}>Date & Time</span>
                      </div>
                      {clickstreamLogs.filter(l => (l.event_type || l.action) === 'USER_LOGIN_SUCCESS').length === 0 ? <p className="empty-state">No recent logins.</p> : clickstreamLogs.filter(l => (l.event_type || l.action) === 'USER_LOGIN_SUCCESS').map((log, i) => (
                        <div key={i} className="soc-list-row" style={{display:'flex', gap:'10px', background: 'transparent', borderBottom: '1px dashed rgba(255,255,255,0.05)', borderRadius: 0}}>
                          <span className="l-tag" style={{ color: actionColor(log.event_type || log.action), borderColor: actionColor(log.event_type || log.action), width: '130px', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>{log.event_type || log.action}</span>
                          <span className="l-user" style={{flex: 1}}>{log.user_id || log.actor_identity}</span>
                          <span className="l-time" style={{width:'150px', textAlign:'right'}}>{formatDelhiTime(log.timestamp)}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div className="soc-full-card" style={{minHeight: '400px'}}>
                <div className="card-header" style={{paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                   <h3 style={{color: '#f59e0b'}}>⚠️ Live Threat Feed</h3> 
                   <span className="count-badge" style={{background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', padding: '4px 12px'}}>Active</span>
                </div>
                <div className="soc-list" style={{paddingTop: '16px'}}>
                  {(stats?.live_threats?.length ?? 0) === 0 ? (
                    <div className="empty-state" style={{marginTop: '40px'}}>
                       <div style={{fontSize: '32px', marginBottom: '16px', background: '#10b981', width: '48px', height: '48px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff'}}>✓</div>
                       <p>No active threats. System is secure.</p>
                    </div>
                  ) : stats?.live_threats.map((t, i) => (
                    <div key={i} className="threat-card">
                      <div className="t-head">
                         <span>📡 IP: {t.ip}</span>
                         <div>
                           <span className={`t-sev ${(t.severity || '').toLowerCase()}`}>{t.severity}</span>
                           <button onClick={() => handleAdminResolve(t.alert_id)} className="t-resolve">✓ Resolve</button>
                         </div>
                      </div>
                      <p className="t-msg">{t.message}</p>
                      <p className="t-time">{formatDelhiTime(t.timestamp)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CYBERSECURITY TOPOLOGY VISUALIZATION (RADAR GLOBE) */}
            <div className="soc-full-card" style={{marginTop: '24px', padding: '0', minHeight: '220px', flex: 'none', position: 'relative', overflow: 'hidden'}}>
              <div className="card-header" style={{padding: '20px 24px 16px', position: 'relative', zIndex: 10}}>
                 <h3 style={{color: (stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8', textShadow: `0 0 5px ${(stats?.active_alerts ?? 0) > 0 ? 'rgba(239,68,68,0.5)' : 'rgba(129,140,248,0.5)'}`}}>Global Threat Matrix & Cloud Security</h3> 
                 <span className="count-badge" style={{background: (stats?.active_alerts ?? 0) > 0 ? 'rgba(239,68,68,0.1)' : 'rgba(99, 102, 241, 0.1)', color: (stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8', border: `1px solid ${(stats?.active_alerts ?? 0) > 0 ? 'rgba(239,68,68,0.3)' : 'rgba(99, 102, 241, 0.3)'}`}}>Live Sync</span>
              </div>
              
              <div className="cyber-vis-container" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#131220', opacity: 1}}>
                 {/* Binary Background */}
                 <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, color: (stats?.active_alerts ?? 0) > 0 ? 'rgba(239,68,68,0.08)' : 'rgba(99,102,241,0.08)', fontSize: '12px', fontFamily: 'monospace', overflow: 'hidden', whiteSpace: 'pre', lineHeight: '12px', zIndex: 0}}>
                   {Array.from({length: 20}).map((_, i) => (
                     <div key={i} style={{opacity: Math.random() * 0.5 + 0.1}}>{Array.from({length: 200}).map(() => Math.random() > 0.5 ? '1' : '0').join(' ')}</div>
                   ))}
                 </div>

                 {/* Foreground SVG Map */}
                 <svg viewBox="0 0 1000 220" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={{position: 'relative', zIndex: 1}}>
                    <defs>
                      <filter id="neon-glow-intense">
                        <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      <filter id="neon-glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Data Overlays */}
                    <text x="150" y="40" fill="#6366f1" fontSize="10" fontWeight="bold">USERS: {stats?.total_users ?? 0}</text>
                    <text x="850" y="40" fill="#6366f1" fontSize="10" fontWeight="bold">LOGINS: {stats?.total_logins ?? 0}</text>
                    <text x="500" y="25" fill="#818cf8" fontSize="10" fontWeight="bold" textAnchor="middle">FILES SECURED: {stats?.encrypted_files ?? 0}</text>

                    {/* PCB TRACES (Left Side) */}
                    <g className="pcb-traces" stroke={(stats?.active_alerts ?? 0) > 0 ? 'rgba(239,68,68,0.3)' : 'rgba(99,102,241,0.3)'} strokeWidth="3" fill="none" strokeLinecap="square">
                       <path d="M -50,50 L 200,50 L 250,110 L 410,110" />
                       <path d="M -50,150 L 150,150 L 200,110" />
                       <path d="M -50,180 L 250,180 L 300,130 L 410,130" />
                       <path d="M -50,20 L 300,20 L 350,90 L 410,90" />
                       <circle cx="200" cy="50" r="4" fill={(stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8'} filter="url(#neon-glow)" />
                       <circle cx="150" cy="150" r="4" fill={(stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8'} filter="url(#neon-glow)" />
                       <circle cx="250" cy="180" r="4" fill={(stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8'} filter="url(#neon-glow)" />
                       <circle cx="300" cy="20" r="4" fill={(stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8'} filter="url(#neon-glow)" />
                    </g>
                    
                    {/* Glowing Packets (Left Side - Speed depends on Total Users) */}
                    <g stroke={(stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8'} strokeWidth="3" fill="none" filter="url(#neon-glow-intense)">
                       <path d="M -50,50 L 200,50 L 250,110 L 410,110" strokeDasharray="20 600" style={{animation: `flow-dash ${Math.max(0.5, 3 - ((stats?.total_users ?? 0) * 0.1))}s linear infinite`}} />
                       <path d="M -50,150 L 150,150 L 200,110" strokeDasharray="20 500" style={{animation: `flow-dash ${Math.max(0.6, 4 - ((stats?.total_users ?? 0) * 0.1))}s linear infinite 0.5s`}} />
                       <path d="M -50,180 L 250,180 L 300,130 L 410,130" strokeDasharray="20 700" style={{animation: `flow-dash ${Math.max(0.7, 2.5 - ((stats?.total_users ?? 0) * 0.1))}s linear infinite 0.2s`}} />
                       <path d="M -50,20 L 300,20 L 350,90 L 410,90" strokeDasharray="20 500" style={{animation: `flow-dash ${Math.max(0.8, 3.5 - ((stats?.total_users ?? 0) * 0.1))}s linear infinite 1s`}} />
                    </g>

                    {/* PCB TRACES (Right Side) */}
                    <g className="pcb-traces" stroke={(stats?.active_alerts ?? 0) > 0 ? 'rgba(239,68,68,0.3)' : 'rgba(99,102,241,0.3)'} strokeWidth="3" fill="none" strokeLinecap="square">
                       <path d="M 1050,50 L 800,50 L 750,110 L 590,110" />
                       <path d="M 1050,150 L 850,150 L 800,110" />
                       <path d="M 1050,180 L 750,180 L 700,130 L 590,130" />
                       <path d="M 1050,20 L 700,20 L 650,90 L 590,90" />
                       <circle cx="800" cy="50" r="4" fill={(stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8'} filter="url(#neon-glow)" />
                       <circle cx="850" cy="150" r="4" fill={(stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8'} filter="url(#neon-glow)" />
                       <circle cx="750" cy="180" r="4" fill={(stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8'} filter="url(#neon-glow)" />
                       <circle cx="700" cy="20" r="4" fill={(stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8'} filter="url(#neon-glow)" />
                    </g>

                    {/* Glowing Packets (Right Side - Speed depends on Total Logins) */}
                    <g stroke={(stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8'} strokeWidth="3" fill="none" filter="url(#neon-glow-intense)">
                       <path d="M 1050,50 L 800,50 L 750,110 L 590,110" strokeDasharray="20 600" style={{animation: `flow-dash ${Math.max(0.5, 3 - ((stats?.total_logins ?? 0) * 0.05))}s linear infinite`}} />
                       <path d="M 1050,150 L 850,150 L 800,110" strokeDasharray="20 500" style={{animation: `flow-dash ${Math.max(0.6, 4 - ((stats?.total_logins ?? 0) * 0.05))}s linear infinite 0.5s`}} />
                       <path d="M 1050,180 L 750,180 L 700,130 L 590,130" strokeDasharray="20 700" style={{animation: `flow-dash ${Math.max(0.7, 2.5 - ((stats?.total_logins ?? 0) * 0.05))}s linear infinite 0.2s`}} />
                       <path d="M 1050,20 L 700,20 L 650,90 L 590,90" strokeDasharray="20 500" style={{animation: `flow-dash ${Math.max(0.8, 3.5 - ((stats?.total_logins ?? 0) * 0.05))}s linear infinite 1s`}} />
                    </g>

                    {/* THE CENTER GLOBE / RADAR */}
                    <g transform="translate(500, 110)">
                       {/* Speed depends on files and recovery queue */}
                       <circle cx="0" cy="0" r="95" fill="none" stroke={(stats?.active_alerts ?? 0) > 0 ? 'rgba(239,68,68,0.3)' : 'rgba(99,102,241,0.3)'} strokeWidth="6" strokeDasharray="20 10" style={{transformOrigin: '0px 0px', animation: `spin ${Math.max(2, 20 - ((stats?.encrypted_files ?? 0) * 0.5))}s linear infinite`}} />
                       <circle cx="0" cy="0" r="85" fill="none" stroke={(stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8'} strokeWidth="4" filter="url(#neon-glow-intense)" style={{transformOrigin: '0px 0px', animation: `spin-rev ${Math.max(3, 25 - ((stats?.encrypted_files ?? 0) * 0.5))}s linear infinite`}} />
                       
                       {/* Solid Globe Base */}
                       <circle cx="0" cy="0" r="75" fill={(stats?.active_alerts ?? 0) > 0 ? 'rgba(239,68,68,0.15)' : 'rgba(99,102,241,0.15)'} stroke={(stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8'} strokeWidth="3" filter="url(#neon-glow)" />
                       
                       {/* Globe Grid Lines */}
                       <g stroke={(stats?.active_alerts ?? 0) > 0 ? 'rgba(239,68,68,0.6)' : 'rgba(99,102,241,0.6)'} strokeWidth="2" fill="none">
                         <ellipse cx="0" cy="0" rx="35" ry="75" />
                         <ellipse cx="0" cy="0" rx="15" ry="75" />
                         <ellipse cx="0" cy="0" rx="75" ry="25" />
                         <ellipse cx="0" cy="0" rx="75" ry="45" />
                       </g>
                       
                       {/* Radar Sweep element - Speed depends on recovery requests / alerts */}
                       <path d="M 0,0 L 0,-75 A 75,75 0 0,1 75,0 Z" fill={(stats?.active_alerts ?? 0) > 0 ? 'rgba(239,68,68,0.4)' : 'rgba(99,102,241,0.4)'} style={{transformOrigin: '0px 0px', animation: `spin ${((stats?.active_alerts ?? 0) > 0) ? 1 : Math.max(1.5, 4 - ((stats?.pending_recovery_requests ?? 0) * 0.5))}s linear infinite`}} />
                       
                       {/* Status Overlay */}
                       <circle cx="0" cy="0" r="15" fill="#131220" stroke={(stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8'} strokeWidth="2" filter="url(#neon-glow)" />
                       <text x="0" y="4" fill={(stats?.active_alerts ?? 0) > 0 ? '#ef4444' : '#818cf8'} fontSize="12" textAnchor="middle" fontWeight="800">{(stats?.active_alerts ?? 0) > 0 ? '⚠️' : 'SYS'}</text>
                    </g>

                    {/* LIVE TELEMETRY WAVEFORM */}
                    <polyline 
                       points={telemetryHistory.map((val, i) => `${i * 10},${220 - (val * 1.5)}`).join(' ')} 
                       fill="none" 
                       stroke={(stats?.active_alerts ?? 0) > 0 ? 'rgba(239,68,68,0.6)' : 'rgba(129,140,248,0.6)'} 
                       strokeWidth="2" 
                       filter="url(#neon-glow)" 
                       strokeLinejoin="round"
                    />
                 </svg>
              </div>
            </div>
          </div>
        )}

        {/* 2. CLICK-STREAM */}
        {activeModule === 'clickstream' && (
          <ClickStreamTracker />
        )}

        {/* 3. BLOCKCHAIN */}
        {activeModule === 'blockchain' && (
          <BlockchainLedger />
        )}

        {/* 4. IP GEOFENCING */}
        {activeModule === 'ip' && (
          <IPGeofencingMonitor />
        )}

        {/* 5. ALERTS */}
        {activeModule === 'alerts' && (
          <div className="soc-full-card">
            <div className="card-header"><h3>Unauthorized Access Logs <span className="count-badge">{unauthLogs.length} total</span></h3> <button onClick={fetchModuleData} className="soc-pill-btn">↻</button></div>
            <div className="soc-list">
              <div className="list-head" style={{gridTemplateColumns: '1fr 1.5fr 1.5fr 0.5fr 1fr'}}><span>IP</span><span>Message</span><span>Time</span><span>Status</span><span>Action</span></div>
              {moduleLoading ? <p className="empty-state">Loading alerts...</p> : unauthLogs.length === 0 ? <p className="empty-state">No logs.</p> : unauthLogs.map((a, i) => (
                <div key={i} className="list-row" style={{gridTemplateColumns: '1fr 1.5fr 1.5fr 0.5fr 1fr'}}>
                  <span className="l-id">{a.ip}</span>
                  <span className="l-target" style={{fontSize: '10px'}}>{a.message}</span>
                  <span className="l-time">{formatDelhiTime(a.timestamp)}</span>
                  <span className={a.resolved ? 'c-green' : 'c-red'}>{a.resolved ? 'Resolved' : 'Active'}</span>
                  <span>
                    {!a.resolved && <button onClick={() => handleAdminResolve(a.id)} className="t-resolve" style={{margin:0}}>✓ Resolve</button>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. USERS */}
        {activeModule === 'users' && (
          <div className="soc-full-card">
            <div className="card-header"><h3>User Management <span className="count-badge">{usersList.length} users</span></h3> <button onClick={fetchModuleData} className="soc-pill-btn">↻</button></div>
            <div className="soc-list">
              <div className="list-head" style={{gridTemplateColumns: '1fr 1fr 1fr 0.5fr 0.5fr 1fr'}}><span>ID</span><span>Name</span><span>Phone</span><span>Files</span><span>Alerts</span><span>Actions</span></div>
              {moduleLoading ? <p className="empty-state">Loading users...</p> : usersList.length === 0 ? <p className="empty-state">No users.</p> : usersList.map((u, i) => (
                <div key={i} className="list-row" style={{gridTemplateColumns: '1fr 1fr 1fr 0.5fr 0.5fr 1fr'}}>
                  <span className="l-id">{u.numeric_id}</span>
                  <span>{u.name}</span>
                  <span className="l-target">{u.phone}</span>
                  <span className="l-user">{u.files}</span>
                  <span className={u.alerts > 0 ? 'c-red' : 'c-green'}>{u.alerts}</span>
                  <div style={{display:'flex', gap:'6px'}}>
                    <button onClick={() => handleUserAction(u.id, 'suspend')} className="t-resolve" style={{borderColor:'#ef4444', color:'#ef4444', margin:0}}>Suspend</button>
                    <button onClick={() => handleUserAction(u.id, 'reset')} className="t-resolve" style={{borderColor:'#a78bfa', color:'#a78bfa', margin:0}}>Reset Token</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. RECOVERY */}
        {activeModule === 'recovery' && (
          <div className="soc-full-card">
            <div className="card-header"><h3>Emergency Recovery Control <span className="count-badge">{recoveryQueue.length} requests</span></h3> <button onClick={fetchModuleData} className="soc-pill-btn">↻</button></div>
            <div className="soc-list">
              {moduleLoading ? <p className="empty-state">Loading...</p> : recoveryQueue.length === 0 ? <p className="empty-state">No pending requests.</p> : recoveryQueue.map(r => (
                <div key={r.request_id} className="threat-card">
                   <div className="t-head"><span>ID: {r.user_id}</span> <span className={`t-sev ${(r.status || '').toLowerCase()}`}>{r.status}</span></div>
                   <p className="t-msg">Phone: {r.phone} | Entered Name: {r.name_entered} <span style={{color: r.name_match ? '#10b981' : '#ef4444'}}>({r.name_match ? 'Match' : 'Mismatch'})</span> | DB Name: {r.name_in_db}</p>
                   <p className="l-time">{formatDelhiTime(r.timestamp)}</p>
                   {r.status === 'PENDING' && (
                      <div style={{marginTop: '10px', display: 'flex', gap: '10px'}}>
                         <button onClick={() => handleRecoveryAction(r.request_id, 'approve')} className="t-resolve" style={{borderColor:'#10b981', color:'#10b981', margin:0}}>✓ Approve</button>
                         <button onClick={() => handleRecoveryAction(r.request_id, 'reject')} className="t-resolve" style={{borderColor:'#ef4444', color:'#ef4444', margin:0}}>✕ Reject</button>
                      </div>
                   )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        /* GLOBAL SOC APP STYLES */
        .soc-app { background: #0b0a15; min-height: 100vh; width: 100%; color: #fff; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; padding: 24px; box-sizing: border-box; overflow-y: auto; }
        
        /* HEADER */
        .soc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .soc-header-left { display: flex; align-items: center; gap: 16px; }
        .soc-logo { font-size: 32px; background: rgba(99, 102, 241, 0.2); width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
        .soc-logo-img { width: 48px; height: 48px; object-fit: contain; }
        .fallback-logo::before { content: '🛡️'; }
        .soc-title-area h1 { font-size: 20px; font-weight: 800; margin: 0; letter-spacing: 0.5px; }
        .soc-title-area p { font-size: 11px; color: #8b5cf6; margin: 2px 0 0; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        
        .soc-header-right { display: flex; align-items: center; gap: 20px; }
        .admin-profile { display: flex; align-items: center; gap: 10px; }
        .admin-avatar { width: 36px; height: 36px; background: #6366f1; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px; color: #fff; box-shadow: 0 0 10px rgba(99,102,241,0.5); }
        .admin-info { display: flex; flex-direction: column; }
        .admin-name { font-size: 13px; font-weight: 700; color: #fff; line-height: 1.2; }
        .admin-role { font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; }
        
        .soc-global-actions { display: flex; gap: 12px; justify-content: flex-end; margin-bottom: 24px; }
        .soc-pill-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #ccc; padding: 10px 20px; border-radius: 20px; font-size: 13px; font-weight: 600; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .soc-pill-btn:hover { background: rgba(255,255,255,0.1); color: #fff; transform: translateY(-1px); }
        .soc-pill-btn.danger { color: #ef4444; border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.1); }
        .soc-pill-btn.danger.active { color: #10b981; border-color: rgba(16,185,129,0.3); background: rgba(16,185,129,0.1); }
        
        .soc-logout-btn { display: flex; align-items: center; gap: 8px; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); color: #818cf8; padding: 8px 20px; border-radius: 20px; font-size: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; }
        .soc-logout-btn:hover { background: #6366f1; color: #fff; }
        
        /* UPSIDE BOXES (MODULES) - TABS */
        .soc-modules-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 30px; }
        .soc-tab { display: flex; align-items: center; justify-content: center; gap: 10px; background: #131220; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 14px 20px; cursor: pointer; transition: 0.3s; flex: 1; text-align: center; min-width: max-content; box-shadow: 0 4px 6px rgba(0,0,0,0.2); }
        .soc-tab:hover { background: rgba(255,255,255,0.05); border-color: rgba(99,102,241,0.3); transform: translateY(-2px); }
        .soc-tab.active { background: rgba(99,102,241,0.1); border-color: #6366f1; box-shadow: 0 4px 15px rgba(99,102,241,0.2); }
        .box-icon { font-size: 16px; display: flex; align-items: center; }
        .box-name { font-size: 13px; font-weight: 700; color: #9ca3af; transition: 0.3s; }
        .soc-tab.active .box-name { color: #fff; }

        /* MAIN BODY */
        .soc-main-body { display: flex; flex-direction: column; gap: 24px; flex: 1; }
        .count-badge { font-size: 10px; padding: 3px 8px; border-radius: 8px; background: rgba(255,255,255,0.1); color: #ccc; margin-left: 10px; vertical-align: middle; }
        
        /* CLASSIC MFD STYLES */
        .classic-stats-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 16px; margin-bottom: 24px; }
        .stat-card { background: #131220; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.2); cursor: pointer; transition: 0.2s; }
        .stat-card:hover { border-color: rgba(99,102,241,0.3); transform: translateY(-2px); }
        .stat-card.active-stat { border-color: #6366f1; background: #161528; box-shadow: 0 8px 20px rgba(99,102,241,0.15); }
        .sc-icon-row { display: flex; align-items: center; gap: 8px; }
        .sc-icon { font-size: 16px; background: rgba(255,255,255,0.05); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; }
        .sc-body { display: flex; flex-direction: column; width: 100%; }
        .sc-val { font-size: 28px; font-weight: 800; color: #fff; line-height: 1; margin-bottom: 6px; }
        .sc-title { font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; }
        .sc-subtext { font-size: 10px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

        /* LIST HEADERS */
        .list-head { font-size: 10px; font-weight: 700; color: #8b5cf6; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 8px; }
        .list-head span { opacity: 0.8; }
        
        .classic-panels-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; }

        /* CIRCULAR SCORE CSS */
        .score-circle { width: 50px; height: 50px; }
        .circular-chart { display: block; margin: 0 auto; max-width: 100%; max-height: 250px; }
        .circle-bg { fill: none; stroke: rgba(255,255,255,0.05); stroke-width: 3.8; }
        .circle { fill: none; stroke-width: 2.8; stroke-linecap: round; animation: progress 1s ease-out forwards; }
        @keyframes progress { 0% { stroke-dasharray: 0 100; } }
        .circular-chart.green .circle { stroke: #10b981; }
        .percentage { fill: #fff; font-family: sans-serif; font-size: 10px; font-weight: 800; text-anchor: middle; }

        /* CYBERSECURITY TOPOLOGY CSS */
        .cyber-flow-left path { animation: flow-dash 3s linear infinite; }
        .cyber-flow-left.fast path { animation-duration: 1.5s; }
        .cyber-flow-left path:nth-child(2) { animation-duration: 4s; animation-delay: 1s; }
        .cyber-flow-left path:nth-child(3) { animation-duration: 2.5s; animation-delay: 0.5s; }
        .cyber-flow-left path:nth-child(4) { animation-duration: 3.5s; animation-delay: 1.5s; }
        
        @keyframes flow-dash { 0% { stroke-dashoffset: 700; } 100% { stroke-dashoffset: 0; } }
        
        .spin-slow { transform-origin: 0px 0px; animation: spin 15s linear infinite; }
        .spin-slow-rev { transform-origin: 0px 0px; animation: spin-rev 20s linear infinite; }
        .spin-radar { transform-origin: 0px 0px; animation: spin 4s linear infinite; }
        .spin-slow.fast { animation-duration: 5s; }
        .spin-slow-rev.fast { animation-duration: 7s; }
        .spin-radar.fast { animation-duration: 1.5s; }
        
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes spin-rev { 100% { transform: rotate(-360deg); } }
        
        /* MFD SPECIFIC */
        .mfd-grid { display: grid; grid-template-columns: 1fr 400px; gap: 24px; }
        .mfd-radar-card { background: #131220; border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 24px; display: flex; flex-direction: column; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .card-header h3 { font-size: 14px; font-weight: 600; color: #fff; margin: 0; display: flex; align-items: center; }
        .legend { display: flex; gap: 16px; font-size: 11px; color: #9ca3af; }
        .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .dot.uncov { background: #374151; }
        .dot.cov { background: #6366f1; box-shadow: 0 0 10px #6366f1; }
        
        /* RADAR CSS (FROM IMAGE) */
        .radar-visual { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px; }
        .radar-circle-bg { width: 300px; height: 300px; position: relative; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .r-ring { position: absolute; border: 1px dashed rgba(99,102,241,0.2); border-radius: 50%; }
        .r-ring.r1 { width: 100px; height: 100px; }
        .r-ring.r2 { width: 200px; height: 200px; }
        .r-ring.r3 { width: 300px; height: 300px; border-style: solid; border-color: rgba(99,102,241,0.1); background: radial-gradient(circle, transparent 40%, rgba(99,102,241,0.05) 100%); }
        .r-line { position: absolute; background: rgba(99,102,241,0.15); }
        .r-line.vert { width: 1px; height: 100%; }
        .r-line.horz { height: 1px; width: 100%; }
        .r-line.diag1 { width: 1px; height: 100%; transform: rotate(45deg); }
        .r-line.diag2 { width: 1px; height: 100%; transform: rotate(-45deg); }
        
        .radar-sweep { position: absolute; width: 150px; height: 150px; top: 0; left: 150px; background: conic-gradient(from 0deg, transparent 70%, rgba(99,102,241,0.4) 100%); transform-origin: 0% 100%; animation: radarSpin 4s linear infinite; border-right: 2px solid #818cf8; }
        @keyframes radarSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .blip { position: absolute; width: 6px; height: 6px; background: #818cf8; border-radius: 50%; box-shadow: 0 0 10px #818cf8; animation: blipFade 4s infinite; }
        .blip.b1 { top: 60px; left: 200px; animation-delay: 0.5s; }
        .blip.b2 { top: 220px; left: 80px; animation-delay: 2s; }
        .blip.b3 { top: 150px; left: 250px; animation-delay: 1s; }
        @keyframes blipFade { 0%, 10% { opacity: 1; transform: scale(1.5); } 20%, 100% { opacity: 0; transform: scale(1); } }
        
        .r-label { position: absolute; font-size: 10px; color: #9ca3af; font-weight: 500; text-align: center; width: 100px; }
        .r-label.l-top { top: -30px; left: 100px; }
        .r-label.l-right { right: -110px; top: 140px; text-align: left; }
        .r-label.l-bottom { bottom: -30px; left: 100px; }
        .r-label.l-left { left: -110px; top: 140px; text-align: right; }

        /* SIDE COLUMN */
        .mfd-side-column { display: flex; flex-direction: column; gap: 24px; }
        .risk-card, .customers-card { background: #131220; border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 24px; }
        .risk-total { font-size: 18px; font-weight: 700; color: #fff; }
        
        .progress-row { margin-bottom: 20px; }
        .pr-info { display: flex; justify-content: space-between; font-size: 12px; font-weight: 500; color: #d1d5db; margin-bottom: 8px; }
        .pr-bar { height: 6px; background: #1f2937; border-radius: 4px; overflow: hidden; }
        .pr-fill { height: 100%; border-radius: 4px; }
        .pr-fill.crit { background: linear-gradient(90deg, #991b1b, #ef4444); box-shadow: 0 0 10px rgba(239,68,68,0.5); }
        .pr-fill.high { background: linear-gradient(90deg, #b45309, #f59e0b); box-shadow: 0 0 10px rgba(245,158,11,0.5); }
        .pr-fill.med { background: linear-gradient(90deg, #854d0e, #eab308); }

        /* LISTS */
        .soc-full-card { background: #131220; border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 24px; flex: 1; }
        .soc-list { display: flex; flex-direction: column; gap: 8px; max-height: 500px; overflow-y: auto; padding-right: 10px; }
        .soc-list::-webkit-scrollbar { width: 4px; }
        .soc-list::-webkit-scrollbar-thumb { background: #374151; border-radius: 4px; }
        .list-head { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; padding: 10px 16px; font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 8px; }
        .list-row { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; padding: 12px 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.02); border-radius: 12px; align-items: center; font-size: 12px; color: #d1d5db; transition: 0.2s; }
        .list-row:hover { background: rgba(255,255,255,0.05); }
        
        .soc-list-row { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(255,255,255,0.02); border-radius: 12px; margin-bottom: 8px; font-size: 12px; }
        .l-tag { padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 700; border: 1px solid; }
        .l-user { color: #f3f4f6; font-weight: 500; }
        .l-target { color: #9ca3af; }
        .l-time { color: #6b7280; font-family: monospace; }
        .l-id { color: #818cf8; font-family: monospace; }
        .l-hash { color: #555; font-family: monospace; font-size: 10px; }
        .c-green { color: #10b981; font-weight: 600; }
        .c-yellow { color: #f59e0b; font-weight: 600; }
        .c-red { color: #ef4444; font-weight: 600; }

        .threat-card { padding: 16px; background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.1); border-radius: 12px; margin-bottom: 10px; }
        .t-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 12px; font-weight: 700; color: #f3f4f6; }
        .t-sev { padding: 4px 10px; border-radius: 6px; font-size: 10px; text-transform: uppercase; }
        .t-sev.high { background: rgba(239,68,68,0.2); color: #ef4444; }
        .t-sev.medium { background: rgba(245,158,11,0.2); color: #f59e0b; }
        .t-sev.pending { background: rgba(245,158,11,0.2); color: #f59e0b; }
        .t-sev.approved { background: rgba(16,185,129,0.2); color: #10b981; }
        .t-sev.rejected { background: rgba(239,68,68,0.2); color: #ef4444; }
        .t-resolve { background: transparent; border: 1px solid #4b5563; color: #9ca3af; padding: 4px 12px; border-radius: 6px; font-size: 10px; font-weight: 600; cursor: pointer; margin-left: 10px; transition: 0.2s; }
        .t-resolve:hover { color: #fff; border-color: #fff; }
        .t-msg { font-size: 12px; color: #9ca3af; margin: 0 0 8px 0; }

        .empty-state { text-align: center; color: #6b7280; font-size: 12px; padding: 40px; }
        
        .soc-scan-banner { background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); padding: 12px 24px; border-radius: 12px; display: flex; align-items: center; gap: 24px; font-size: 12px; color: #10b981; }
        .soc-scan-banner.err { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.3); color: #ef4444; }
        .banner-close { margin-left: auto; background: none; border: none; color: inherit; cursor: pointer; opacity: 0.7; }
        .banner-close:hover { opacity: 1; }
      `}</style>
    </div>
  );
}
