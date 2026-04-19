import UserDashboard from './UserDashboard';
import MasterForensicDashboard from './admin/MasterForensicDashboard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LOGO_PATH = "/logo.png";

function App() {
  const [view, setView] = useState<'login' | 'signup' | 'home' | 'admin_dash'>('login'); 
  const [role, setRole] = useState<'admin' | 'user'>('user'); 
  const [activeTab, setActiveTab] = useState('');
  const [showDeniedOverlay, setShowDeniedOverlay] = useState(false);
  
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [legalName, setLegalName] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const [showMasterModal, setShowMasterModal] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');
  const [showLedger, setShowLedger] = useState(false);
  const [fullScreenAlert, setFullScreenAlert] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [recoveryName, setRecoveryName] = useState('');
  const [recoveryKey, setRecoveryKey] = useState('');
  const [ledgerFiles, setLedgerFiles] = useState<any[]>([]);
  const [ledgerAlert, setLedgerAlert] = useState<{filename: string, owner: string} | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // UPDATED: Added file_id to the type definition here
  const [fileEncryptionResult, setFileEncryptionResult] = useState<{iv: string, encrypted_data: string, filename: string, file_id: string} | null>(null);

  const adminModules = [
    { name: 'Master Forensic Dashboard', icon: '🖥️', def: 'A high-level view that allows the Admin to monitor the overall health and security of the entire system.', actions: ['Global System Scan', 'Emergency Lockdown'] },
    { name: 'Click-Stream Tracker', icon: '🖱️', def: 'A detailed table that records every single "Click" and "Request" made by any user on the platform.', actions: ['Start Recording', 'Analyze Behavior'] },
    { name: 'Blockchain Ledger Viewer', icon: '⛓️', def: 'A tool for the Admin to verify the immutable records of all file shares and access rights.', actions: ['Verify Hash', 'Trace Transaction'] },
    { name: 'IP-Geofencing Monitor', icon: '🌍', def: 'A security map or list that flags login attempts from suspicious or unauthorized locations.', actions: ['Add Blacklist IP', 'Update Firewall'] },
    { name: 'Unauthorized Access Logs', icon: '⚠️', def: 'A specialized report page that lists all failed attempts by "anonymous" users to access files.', actions: ['Trace Origin', 'Export Evidence'] },
    { name: 'User Management', icon: '👥', def: 'An interface to manage user accounts and oversee system-wide security policies.', actions: ['Suspend Account', 'Reset Token'] }
  ];

  const userModules = [
    { name: 'Encrypted File Vault', icon: '🔐', def: 'Upload files where the system performs AES-256 encryption before data leaves the device.', actions: ['Choose File', 'Encrypt & Upload'] },
    { name: 'Permission Manager', icon: '🔑', def: 'Grant or revoke access to files for specific users. Recorded permanently on the Blockchain.', actions: ['Grant Access', 'Revoke Permission'] },
    { name: 'Security Activity Feed', icon: '📜', def: 'A Dashboard page where the user can see history of his own activity and who accessed their files.', actions: ['Export Forensic Report', 'Clear History'] },
    { name: 'Real-Time Alert Center', icon: '🚨', def: 'A notification area that pops up alerts if an unauthorized user tries to click on private data.', actions: ['Dismiss Alert', 'Block Source Device'] },
    { name: 'Emergency Recovery Tool', icon: '🛠️', def: 'Use your Master Key to recover data if you lose your account password.', actions: ['Validate Master Key', 'Initiate Recovery'] }
  ];

  useEffect(() => {
    const savedToken = localStorage.getItem('apc_token');
    const savedUser = localStorage.getItem('apc_user');
    const savedRole = localStorage.getItem('apc_role');

    if (savedToken && savedUser) {
      setIdentity(savedUser);
      setRole(savedRole as 'admin' | 'user');
      setToken(savedToken);
      setView('home');
      setActiveTab(userModules[0].name);
    }
  }, []);

  // Use refs to avoid re-binding listeners on every state change
  const stateRef = React.useRef({ identity, token, role, view, activeTab });
  useEffect(() => {
    stateRef.current = { identity, token, role, view, activeTab };
  }, [identity, token, role, view, activeTab]);

  // GLOBAL API TRACKER: Records only MAJOR User API requests
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      const { role: r, identity: id, token: t, view: v, activeTab: at } = stateRef.current;
      if (r === 'admin') return config;
      if (config.url?.includes('track-click')) return config;

      const majorUserEndPoints = ['upload', 'encrypt', 'grant', 'revoke', 'resolve', 'recovery', 'decrypt', 'establish-link'];
      const isMajor = majorUserEndPoints.some(ep => config.url?.toLowerCase().includes(ep));
      if (!isMajor) return config;

      const payload = {
        user_id: id || 'ANONYMOUS',
        session_token: t || 'NONE',
        event_type: 'API_REQUEST',
        element_id: `${config.method?.toUpperCase()} ${config.url?.split('/').pop()}`,
        url_route: `/${v}/${at || ''}`.replace(/\/+/g, '/')
      };
      
      axios.post('http://127.0.0.1:5000/track-click', payload).catch(() => {});
      return config;
    });

    return () => axios.interceptors.request.eject(requestInterceptor);
  }, []);

  // GLOBAL CLICK-STREAM TRACKER: Stable listener that never misses a click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const { role: r, identity: id, token: t, view: v, activeTab: at } = stateRef.current;
      let target = e.target as HTMLElement;
      
      let depth = 0;
      while (target && target.tagName !== 'BUTTON' && target.tagName !== 'DIV' && depth < 3) {
        if (target.parentElement) target = target.parentElement;
        depth++;
      }

      const label = (target.innerText?.trim() || target.getAttribute('aria-label') || target.id || target.tagName).substring(0, 40);
      
      if (r === 'admin') {
        const majorAdminActions = [
          'BLOCKCHAIN', 'LEDGER', 'CLICK-STREAM', 'TRACKER', 'GEOFENCING',
          'UNAUTHORIZED', 'LOGS', 'MANAGEMENT', 'MASTER', 'DASHBOARD', 'LOGIN'
        ];
        const isMajor = majorAdminActions.some(action => label.toUpperCase().includes(action));
        if (!isMajor) return; 
      }

      const payload = {
        user_id: id || (r === 'admin' ? 'ADM-777' : 'ANONYMOUS'),
        session_token: t || 'NONE',
        event_type: 'CLICK',
        element_id: label,
        url_route: `/${v}/${at || ''}`.replace(/\/+/g, '/')
      };

      axios.post('http://127.0.0.1:5000/track-click', payload).catch(() => {});
    };

    window.addEventListener('click', handleClick);

    // RESPONSE INTERCEPTOR FOR GEOFENCING & LOCKDOWN
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 403 && error.response?.data?.message?.includes('GEOFENCE_BLOCK')) {
          setFullScreenAlert(true); // Reuse the existing alert system
        }
        return Promise.reject(error);
      }
    );

    return () => {
      window.removeEventListener('click', handleClick);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const fetchLedgerFiles = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/public-ledger');
      setLedgerFiles(res.data);
    } catch (err) {
      console.error("Failed to fetch ledger files", err);
    }
  };

  const handleHackAttempt = async (real_id: string) => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/hack-attempt', { file_id: real_id });
      // Show red alert INSIDE the ledger window, NOT the VPN geofence alert
      setLedgerAlert({ filename: res.data.filename || 'UNKNOWN_FILE', owner: res.data.owner_display || 'UNKNOWN' });
    } catch (error) {
      console.error("Hack attempt log failed", error);
      setLedgerAlert({ filename: 'UNKNOWN_FILE', owner: 'UNKNOWN' });
    }
  };

  useEffect(() => {
    if (showLedger) fetchLedgerFiles();
  }, [showLedger]);

  const loginSuccess = (data: any) => {
    localStorage.setItem('apc_token', data.token);
    localStorage.setItem('apc_role', data.role || 'user'); 
    localStorage.setItem('apc_user', data.identity);
    
    setToken(data.token);
    setIdentity(data.identity);
    setRole(data.role || 'user');
    setView('home');
    if (data.forceTab) {
      setActiveTab(data.forceTab);
    } else {
      setActiveTab(userModules[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setSelectedFile(e.target.files[0]);
  };

  const runFileEncryption = async () => {
    if(!selectedFile) return alert("Please select a file first!");
    const formData = new FormData();
    formData.append('file', selectedFile);
    const token = localStorage.getItem('apc_token');
    try {
      const response = await axios.post('http://127.0.0.1:5000/encrypt', formData, {
        headers: { 'Content-Type': 'multipart/form-data', 'x-access-token': token }
      });
      // UPDATED: Now saving the entire response which includes file_id/unique hash
      setFileEncryptionResult(response.data);
      alert(`File AES-256 Encryption Complete. ID: ${response.data.file_id}`);
    } catch (error) { alert("Encryption Failed. Ensure you are logged in."); }
  };

  const downloadEncryptedFile = () => {
    if (!fileEncryptionResult) return;
    const blob = new Blob([fileEncryptionResult.encrypted_data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ENC_${selectedFile?.name || 'vault_data'}.enc`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const runDecryption = async () => {
    if(!fileEncryptionResult) return;
    try {
        const response = await axios.post('http://127.0.0.1:5000/decrypt', {
            encrypted_data: fileEncryptionResult.encrypted_data,
            iv: fileEncryptionResult.iv
        });
        const byteCharacters = atob(response.data.decrypted_data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray]);
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
    } catch (error) { alert("Decryption failed!"); }
  };

  const handleMasterRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryName || !recoveryKey) return;
    try {
      const response = await axios.post('http://127.0.0.1:5000/request-recovery', { 
        name: recoveryName, 
        masterKey: recoveryKey 
      });
      if (response.status === 200) {
         loginSuccess(response.data);
         setShowRecoveryModal(false);
      } else {
         alert(response.data.message);
         if (response.status === 201) setShowRecoveryModal(false);
      }
    } catch (error: any) { alert(error.response?.data?.message || "Invalid Master Key!"); }
  };

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'admin' && (view === 'login' || view === 'signup')) {
      if (identity === 'ADM-777' && password === 'admin123') {
        loginSuccess({ role: 'admin', identity: 'ADM-777', token: 'admin-bypass' });
        return;
      } else {
        setShowDeniedOverlay(true); 
        return;
      }
    }

    if (view === 'signup') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;
      if (!passwordRegex.test(password)) {
        alert("SECURITY RISK: Password must contain at least one uppercase letter, one lowercase letter, and one special character.");
        return;
      }
    }

    const endpoint = view === 'signup' ? '/register' : '/login';
    
    try {
      const response = await axios.post(`http://127.0.0.1:5000${endpoint}`, { 
        userID: identity, 
        password: password,
        legalName: legalName
      });

      if (view === 'signup') {
        setGeneratedKey(response.data.masterKey);
        setShowMasterModal(true);
      } else { 
        loginSuccess(response.data); 
      }
    } catch (error: any) { 
      console.error("Auth Error:", error);
      if (error.response?.status === 403) {
        setFullScreenAlert(true);
      } else {
        alert(error.response?.data?.message || "Connection Failed! Is Flask running on port 5000?"); 
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('apc_token');
    localStorage.removeItem('apc_role');
    localStorage.removeItem('apc_user');
    setView('login');
    setIdentity('');
    setPassword('');
    setToken(null);
  };

  const currentModules = role === 'admin' ? adminModules : userModules;
  const activeModule = currentModules.find(m => m.name === activeTab) || currentModules[0];

  if (showDeniedOverlay) {
    return (
      <div className="denied-overlay">
        <div className="cyber-grid-bg-red"></div>
        <div className="denied-card">
          <div className="denied-icon">🛑</div>
          <h1 className="denied-title">CRITICAL ACCESS VIOLATION</h1>
          <div className="denied-divider"></div>
          <p className="denied-text">
            Unauthorized identity detected. This terminal is reserved for <span className="highlight">ADMINISTRATOR LEVEL 7</span> clearance only.
          </p>
          <div className="denied-meta">
            <p>TRACE ID: {Math.random().toString(16).slice(2, 10).toUpperCase()}</p>
            <p>STATUS: ATTEMPT LOGGED & ENCRYPTED</p>
          </div>
          <button onClick={() => {setShowDeniedOverlay(false); setRole('user');}} className="denied-btn">RETURN TO USER GATEWAY</button>
        </div>
        <style>{`
          .denied-overlay { height: 100vh; background: #080000; display: flex; align-items: center; justify-content: center; font-family: sans-serif; position: relative; overflow: hidden; z-index: 9999; }
          .cyber-grid-bg-red { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px); background-size: 40px 40px; }
          .denied-card { z-index: 100; background: rgba(15, 0, 0, 0.95); border: 2px solid #ff0000; padding: 60px; border-radius: 40px; text-align: center; max-width: 480px; box-shadow: 0 0 50px rgba(255,0,0,0.2); border-bottom: 8px solid #ff0000; }
          .denied-icon { font-size: 60px; margin-bottom: 20px; animation: pulse 1.5s infinite; }
          .denied-title { color: #ff3333; font-weight: 900; letter-spacing: 2px; font-size: 24px; margin-bottom: 10px; }
          .denied-divider { height: 1px; background: #ff0000; width: 50px; margin: 20px auto; opacity: 0.5; }
          .denied-text { color: #888; line-height: 1.6; font-size: 14px; margin-bottom: 30px; }
          .highlight { color: #fff; font-weight: bold; }
          .denied-meta { background: #000; padding: 15px; border-radius: 12px; font-family: monospace; font-size: 10px; color: #555; text-align: left; margin-bottom: 30px; border: 1px solid #222; }
          .denied-btn { width: 100%; padding: 18px; border-radius: 20px; border: 2px solid #ff3333; background: transparent; color: #ff3333; font-weight: 900; cursor: pointer; transition: 0.3s; }
          .denied-btn:hover { background: #ff3333; color: #fff; }
          @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        `}</style>
      </div>
    );
  }

  if (view === 'login' || view === 'signup') {
    return (
      <>
        {fullScreenAlert && (
          <div className="geofence-shield-overlay">
            <div className="cyber-grid-red"></div>
            <div className="cyber-grid-blue"></div>
            <div className="laser-scanner-red"></div>
            <div className="laser-scanner-blue"></div>
            <div className="shield-container">
              <div className="shield-glow-ring"></div>
              <div className="shield-icon-wrap">
                <img src={LOGO_PATH} alt="Security Logo" className="shield-main-icon-img" />
                <div className="shield-scanner-line"></div>
              </div>
              <div className="shield-content">
                <h1 className="shield-title">PERIMETER BREACH</h1>
                <div className="shield-separator">
                  <div className="sep-red"></div>
                  <div className="sep-blue"></div>
                </div>
                <p className="shield-msg">
                  <span className="glitch-text" data-text="ACCESS DENIED">ACCESS DENIED</span>
                  <br />
                  NODE LOCATION: <span style={{color: '#ef4444'}}>FOREIGN_ZONE</span>
                  <br />
                  Your connection was intercepted by the Indian Geographic Firewall.
                </p>
                <div className="forensic-meta">
                  <div className="meta-item"><span className="m-label">PROTOCOL</span><span className="m-val">GEO-BLOCK</span></div>
                  <div className="meta-item"><span className="m-label">ORIGIN</span><span className="m-val red">BLOCKED</span></div>
                </div>
                <button className="shield-dismiss-btn" onClick={() => setFullScreenAlert(false)}>
                  ACKNOWLEDGE SECURITY PROTOCOL
                </button>
              </div>
            </div>
          </div>
        )}
        {showLedger && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#080808',
            display: 'flex', flexDirection: 'column',
            fontFamily: 'sans-serif'
          }}>
            {/* INFILTRATION ALERT POPUP */}
            {ledgerAlert && (
              <div style={{
                position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)',
                zIndex: 100001, background: '#0a0000', border: '2px solid #ef4444',
                borderRadius: '20px', padding: '30px 40px', minWidth: '480px',
                boxShadow: '0 0 80px rgba(239,68,68,0.4)', textAlign: 'center',
                animation: 'shake 0.3s ease'
              }}>
                <div style={{fontSize: '40px', marginBottom: '10px'}}>🚨</div>
                <div style={{color: '#ef4444', fontSize: '16px', fontWeight: 900, letterSpacing: '3px', marginBottom: '12px'}}>INFILTRATION INTERCEPTED</div>
                <div style={{color: '#666', fontSize: '12px', lineHeight: 2, fontWeight: 600}}>
                  File <span style={{color: '#fff', fontWeight: 800}}>'{ledgerAlert.filename}'</span> targeted<br/>
                  Owner <span style={{color: '#ef4444', fontWeight: 800}}>#{ledgerAlert.owner}</span> has been alerted<br/>
                  <span style={{color: '#333', fontSize: '11px'}}>Admin has been notified. Attempt logged.</span>
                </div>
                <button onClick={() => setLedgerAlert(null)} style={{
                  marginTop: '20px', background: '#ef4444', color: '#fff', border: 'none',
                  padding: '12px 32px', borderRadius: '14px', fontWeight: 800, cursor: 'pointer',
                  fontSize: '11px', letterSpacing: '2px'
                }}>ACKNOWLEDGE</button>
              </div>
            )}

            {/* HEADER */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '28px 48px', borderBottom: '1px solid #1a1a1a'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <span style={{fontSize: '22px'}}>🌐</span>
                <div>
                  <div style={{color: '#2563eb', fontSize: '11px', fontWeight: 900, letterSpacing: '3px'}}>// LIVE NETWORK LEDGER</div>
                  <div style={{color: '#fff', fontSize: '22px', fontWeight: 900, letterSpacing: '-0.5px'}}>PUBLIC NODE DIRECTORY</div>
                </div>
                <div style={{marginLeft: '24px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <span style={{width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb', display: 'inline-block', animation: 'pulse 1.5s infinite'}}></span>
                  <span style={{color: '#2563eb', fontSize: '10px', fontWeight: 900, letterSpacing: '1px'}}>{ledgerFiles.length} NODES ONLINE</span>
                </div>
              </div>
              <button onClick={() => { setShowLedger(false); setLedgerAlert(null); }} style={{
                background: '#111', border: '1px solid #222',
                color: '#666', cursor: 'pointer', fontSize: '18px', borderRadius: '14px',
                width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800
              }}>✖</button>
            </div>

            {/* TABLE HEADER */}
            <div style={{
              display: 'grid', gridTemplateColumns: '150px 1fr 200px 160px',
              padding: '14px 48px', borderBottom: '1px solid #111',
              fontSize: '9px', color: '#2563eb', fontWeight: 900, letterSpacing: '2px'
            }}>
              <span>NODE_ID</span>
              <span>ENCRYPTED_FILENAME</span>
              <span>STATUS</span>
              <span style={{textAlign: 'right'}}>ACTION</span>
            </div>

            {/* FILE ROWS */}
            <div style={{flex: 1, overflowY: 'auto', padding: '12px 36px'}}>
              {(!ledgerFiles || ledgerFiles.length === 0) ? (
                <div style={{textAlign: 'center', color: '#333', marginTop: '80px', fontSize: '12px', fontWeight: 700, letterSpacing: '2px'}}>
                  // NO_PUBLIC_NODES_DETECTED_IN_SECTOR
                </div>
              ) : (
                ledgerFiles.map((file, i) => (
                  <div key={file.id || i} style={{
                    display: 'grid', gridTemplateColumns: '150px 1fr 200px 160px',
                    alignItems: 'center', padding: '20px 12px',
                    borderRadius: '18px', marginBottom: '8px',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid #111',
                  }}>
                    <span style={{color: '#2563eb', fontSize: '11px', fontFamily: 'monospace', fontWeight: 900}}>{file.fake_id || '#UNKNOWN'}</span>
                    <div>
                      <div style={{color: '#fff', fontSize: '13px', fontWeight: 700}}>{'■'.repeat(Math.min(file.filename?.length || 8, 12))} [ENCRYPTED]</div>
                      <div style={{color: '#333', fontSize: '10px', marginTop: '4px', fontWeight: 700, letterSpacing: '1px'}}>AES-256 • {file.filename?.split('.').pop()?.toUpperCase() || 'BIN'}</div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <span style={{width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb', display: 'inline-block'}}></span>
                      <span style={{color: '#2563eb', fontSize: '10px', fontWeight: 900, letterSpacing: '1px'}}>SECURED_NODE</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                      <button onClick={() => handleHackAttempt(file.id)} style={{
                        background: 'none', border: '1px solid #ef4444',
                        color: '#ef4444', padding: '10px 20px', borderRadius: '14px',
                        fontSize: '10px', fontWeight: 800, cursor: 'pointer',
                        letterSpacing: '1px'
                      }}>INFILTRATE</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            <div style={{
              padding: '18px 48px', borderTop: '1px solid #111',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span style={{color: '#1f1f1f', fontSize: '10px', fontWeight: 700, letterSpacing: '1px'}}>AuthPrivacyChain V2 • Quantum-Secured Network</span>
              <span style={{color: '#1f1f1f', fontSize: '10px', fontWeight: 700, letterSpacing: '1px'}}>All infiltration attempts are logged and reported</span>
            </div>

            <style>{`
              @keyframes shake { 0%,100%{transform:translateX(-50%)} 20%{transform:translateX(calc(-50% - 8px))} 40%{transform:translateX(calc(-50% + 8px))} 60%{transform:translateX(calc(-50% - 4px))} 80%{transform:translateX(calc(-50% + 4px))} }
              @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
            `}</style>
          </div>
        )}

        <div className="main-portal">
          <div className="cyber-grid-bg"></div>
          <button type="button" className="top-right-ledger-btn" onClick={() => setShowLedger(true)}>
            <span className="pulse-dot"></span> LIVE NETWORK LEDGER
          </button>
          <div className="cloud-container">
            <div className="asset-cloud c1">☁️</div>
            <div className="asset-cloud c2">☁️</div>
            <div className="asset-cloud c3">☁️</div>
          </div>

          <div className="auth-card">
            <div className="logo-center-box"><img src={LOGO_PATH} alt="Brand Logo" className="brand-logo-main" /></div>
            <h1>AuthPrivacyChain <span>V2</span></h1>
            <p className="status-label">QUANTUM GATEWAY ACTIVE</p>

            <div className="toggle-switcher">
              <div className={`switch-pill ${role === 'admin' ? 'pos-admin' : 'pos-user'}`}></div>
              <button type="button" className={role === 'user' ? 'active' : ''} onClick={() => { setRole('user'); setIdentity(''); setPassword(''); }}>USER GATEWAY</button>
              <button type="button" className={role === 'admin' ? 'active' : ''} onClick={() => { setRole('admin'); setIdentity(''); setPassword(''); }}>ADMIN MODE</button>
            </div>

            <form onSubmit={handleAction}>
              {view === 'signup' && (
                <div className="cyber-field">
                  <label>FULL LEGAL IDENTITY</label>
                  <input type="text" placeholder="Enter Name..." required value={legalName} onChange={(e) => setLegalName(e.target.value)} autoComplete="off" />
                </div>
              )}
              <div className="cyber-field">
                <label>{role === 'admin' ? 'ADMINISTRATOR TOKEN' : (view === 'signup' ? 'PHONE NUMBER' : 'UNIQUE ID')}</label>
                <input type="text" placeholder={role === 'admin' ? "ADM-777" : "Enter ID..."} required value={identity} onChange={(e) => setIdentity(e.target.value)} autoComplete="off" />
              </div>
              <div className="cyber-field">
                <label>ENCRYPTION PASSPHRASE</label>
                <input type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
              </div>
              <button type="submit" className="cyber-btn">{view === 'login' ? 'ESTABLISH LINK' : 'CREATE ACCOUNT'}</button>
              <div className="auth-footer-links">
                <button type="button" className="signup-link" onClick={() => { setView(view === 'login' ? 'signup' : 'login'); setIdentity(''); setPassword(''); }}>
                  {view === 'login' ? '// New here? Join the family.' : '// Back to Login'}
                </button>
                <button type="button" className="v1-shortcut" onClick={() => setShowRecoveryModal(true)}>[ MASTER KEY ] QUICK ACCESS</button>
              </div>
            </form>
          </div>

          <style>{`
            .main-portal { min-height: 100vh; background: #02040a; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; font-family: sans-serif; }
            .cyber-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(37,99,235,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.12) 1px, transparent 1px); background-size: 50px 50px; z-index: 1; }
            .cloud-container { position: fixed; inset: 0; z-index: 5; pointer-events: none; }
            .asset-cloud { position: absolute; display: flex; align-items: center; justify-content: center; font-size: 280px; opacity: 0.8; user-select: none; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5)); z-index: 5; }
            .c1 { top: 5%; left: 5%; transform: rotate(-15deg); animation: float 12s infinite alternate ease-in-out; }
            .c2 { bottom: 10%; right: 8%; font-size: 350px; transform: rotate(10deg); animation: float 18s infinite alternate-reverse ease-in-out; }
            .c3 { top: 20%; right: 20%; font-size: 150px; opacity: 0.5; transform: rotate(5deg); animation: float 25s infinite alternate ease-in-out; }
            @keyframes float { from { transform: translate(0, 0) rotate(-5deg); } to { transform: translate(30px, -20px) rotate(5deg); } }
            .auth-card { width: 100%; max-width: 440px; background: rgba(10, 10, 10, 0.85); backdrop-filter: blur(25px); border: 1px solid rgba(255,255,255,0.1); border-radius: 44px; padding: 55px; z-index: 10; text-align: center; color: white; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
            .logo-center-box { display: flex; justify-content: center; margin-bottom: 20px; }
            .brand-logo-main { width: 90px; height: 90px; object-fit: contain; }
            h1 { font-size: 26px; font-weight: 900; margin: 0; } h1 span { color: #3b82f6; }
            .status-label { font-size: 9px; letter-spacing: 5px; color: #3b82f6; margin-bottom: 40px; font-weight: 900; }
            .toggle-switcher { display: flex; background: #000; padding: 5px; border-radius: 18px; margin-bottom: 35px; border: 1px solid rgba(255,255,255,0.04); position: relative; }
            .toggle-switcher button { flex: 1; padding: 12px; background: transparent; border: none; font-size: 10px; font-weight: 900; color: #4b5563; z-index: 2; cursor: pointer; }
            .toggle-switcher button.active { color: #fff; }
            .switch-pill { position: absolute; top: 5px; bottom: 5px; width: calc(50% - 5px); background: #2563eb; border-radius: 14px; transition: 0.5s; }
            .pos-admin { left: 50%; } .pos-user { left: 5px; }
            .cyber-field { text-align: left; margin-bottom: 22px; }
            .cyber-field label { display: block; font-size: 9px; font-weight: 800; color: #64748b; margin-bottom: 10px; margin-left: 15px; }
            .cyber-field input { width: 100%; padding: 18px 24px; border-radius: 20px; background: #000; border: 1px solid rgba(255,255,255,0.08); color: #fff; outline: none; box-sizing: border-box; }
            .cyber-btn { width: 100%; padding: 18px; border-radius: 20px; border: none; background: #fff; color: #000; font-weight: 900; cursor: pointer; font-size: 11px; }
            .auth-footer-links { margin-top: 25px; display: flex; flex-direction: column; gap: 12px; }
            .signup-link, .v1-shortcut { background: none; border: none; font-size: 10px; font-weight: 900; cursor: pointer; }
            .signup-link { color: #4b5563; } .v1-shortcut { color: #3b82f6; }
            .master-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 1000; }
            .master-modal-card { background: #0a0a0a; border: 2px solid #2563eb; padding: 40px; border-radius: 30px; text-align: center; max-width: 400px; color: white; }
            .key-display { background: #000; color: #3b82f6; padding: 20px; font-family: monospace; border-radius: 10px; margin: 20px 0; border: 1px dashed #333; font-size: 18px; font-weight: bold; word-break: break-all; }
            .top-right-ledger-btn { position: absolute; top: 30px; right: 40px; background: transparent; border: none; color: #22c55e; padding: 12px 24px; font-weight: 900; cursor: pointer; z-index: 100; font-size: 15px; letter-spacing: 1px; display: flex; align-items: center; }
            .pulse-dot { display: inline-block; width: 12px; height: 12px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 10px #22c55e, 0 0 20px #22c55e; margin-right: 12px; animation: pulse-dot-anim 1.5s infinite; }
            @keyframes pulse-dot-anim { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
            
            .geofence-shield-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 10000000 !important; background: #000 !important; display: flex; align-items: center; justify-content: center; overflow: hidden; font-family: 'Inter', sans-serif; }
            .cyber-grid-red { position: absolute; inset: 0; background-image: linear-gradient(rgba(239, 68, 68, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.2) 1px, transparent 1px); background-size: 40px 40px; animation: grid-pulse-red 3s infinite alternate; z-index: 1; }
            .cyber-grid-blue { position: absolute; inset: 0; background-image: linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px); background-size: 45px 45px; animation: grid-pulse-blue 4s infinite alternate-reverse; z-index: 2; }
            @keyframes grid-pulse-red { from { opacity: 0.2; transform: scale(1); } to { opacity: 0.6; transform: scale(1.05); } }
            @keyframes grid-pulse-blue { from { opacity: 0.2; transform: scale(1); } to { opacity: 0.6; transform: scale(1.1); } }
            .laser-scanner-red { position: absolute; width: 200%; height: 2px; background: rgba(239, 68, 68, 0.8); box-shadow: 0 0 20px #ef4444; top: 30%; left: -50%; transform: rotate(-5deg); animation: laser-scan-v 4s infinite linear; z-index: 5; }
            .laser-scanner-blue { position: absolute; width: 200%; height: 2px; background: rgba(59, 130, 246, 0.8); box-shadow: 0 0 20px #3b82f6; top: 60%; left: -50%; transform: rotate(5deg); animation: laser-scan-v 5s infinite linear reverse; }
            @keyframes laser-scan-v { 0% { top: -10%; } 100% { top: 110%; } }
            .shield-container { position: relative; z-index: 30000000 !important; display: flex; flex-direction: column; align-items: center; gap: 30px; }
            .shield-glow-ring { position: absolute; width: 400px; height: 400px; border: 2px solid rgba(59, 130, 246, 0.1); border-radius: 50%; animation: ring-pulse 2s infinite; }
            @keyframes ring-pulse { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }
            .shield-icon-wrap { position: relative; width: 120px; height: 120px; background: rgba(255,255,255,0.03); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 0 30px rgba(59,130,246,0.2); }
            .shield-main-icon-img { width: 80px; height: 80px; object-fit: contain; filter: drop-shadow(0 0 20px rgba(59,130,246,0.8)); }
            .shield-scanner-line { position: absolute; width: 100%; height: 2px; background: #3b82f6; box-shadow: 0 0 10px #3b82f6; top: 0; animation: scan-shield 2s infinite ease-in-out; }
            @keyframes scan-shield { 0%, 100% { top: 10%; } 50% { top: 90%; } }
            .shield-content { text-align: center; }
            .shield-title { font-size: 42px; font-weight: 900; letter-spacing: 4px; margin: 0; color: #fff; text-shadow: 0 0 10px rgba(255,255,255,0.3); }
            .shield-separator { display: flex; height: 4px; width: 100%; max-width: 300px; margin: 15px auto; }
            .sep-red { flex: 1; background: #ef4444; box-shadow: 0 0 10px #ef4444; }
            .sep-blue { flex: 1; background: #3b82f6; box-shadow: 0 0 10px #3b82f6; }
            .shield-msg { color: #888; font-size: 14px; line-height: 1.8; letter-spacing: 1px; }
            .glitch-text { font-size: 24px; font-weight: 900; color: #ef4444; position: relative; display: inline-block; }
            .glitch-text::before, .glitch-text::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; }
            .glitch-text::before { left: 2px; text-shadow: -2px 0 #3b82f6; animation: glitch 2s infinite linear alternate-reverse; }
            .glitch-text::after { left: -2px; text-shadow: 2px 0 #ef4444; animation: glitch 3s infinite linear alternate-reverse; }
            @keyframes glitch { 0% { clip: rect(44px, 450px, 56px, 0); } 20% { clip: rect(12px, 450px, 89px, 0); } 40% { clip: rect(67px, 450px, 34px, 0); } 60% { clip: rect(89px, 450px, 12px, 0); } 80% { clip: rect(34px, 450px, 67px, 0); } 100% { clip: rect(56px, 450px, 44px, 0); } }
            .forensic-meta { display: flex; gap: 20px; justify-content: center; margin: 20px 0; }
            .meta-item { display: flex; flex-direction: column; background: rgba(255,255,255,0.02); padding: 10px 20px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
            .m-label { font-size: 9px; color: #555; font-weight: 800; letter-spacing: 1px; }
            .m-val { font-size: 12px; color: #fff; font-weight: 700; margin-top: 4px; }
            .m-val.red { color: #ef4444; }
            .shield-dismiss-btn { background: none; border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 12px 30px; border-radius: 4px; font-size: 11px; font-weight: 800; letter-spacing: 2px; cursor: pointer; transition: 0.3s; }
            .shield-dismiss-btn:hover { background: #fff; color: #000; box-shadow: 0 0 20px rgba(255,255,255,0.3); }
          `}</style>
        </div>
      </>
    );
  }

  if (view === 'home') {
    return (
      <div className="home-original">
        <div className="home-glow"></div>
        <div className="home-content-centered">
          <div className="logo-center-box"><img src={LOGO_PATH} alt="Brand Logo" className="home-logo-img" /></div>
          <h1>{role === 'user' ? 'Initiating AuthPrivacyChain' : 'AuthPrivacyChain V2'}</h1>
          <p className="encryption-text">Advanced Cloud Security powered by Blockchain <br /> & AES-256 Encryption.</p>
          <div className="home-btns-centered">
            <button onClick={() => { setView('admin_dash'); setActiveTab(currentModules[0].name); }} className="btn-dash">{role === 'user' ? 'Enter Cloud Vault' : 'Launch Dashboard'}</button>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
        <style>{`
          .home-original { height: 100vh; background: #000; display: flex; align-items: center; justify-content: center; text-align: center; color: white; font-family: sans-serif; position: relative; overflow: hidden; }
          .home-glow { position: absolute; top: 0; width: 100%; height: 50%; background: radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%); filter: blur(100px); }
          .home-content-centered { z-index: 10; display: flex; flex-direction: column; align-items: center; }
          .home-logo-img { width: 140px; margin-bottom: 20px; }
          h1 { font-size: 52px; font-weight: 800; letter-spacing: -2px; margin-bottom: 10px; }
          .encryption-text { font-size: 18px; color: #888; margin-bottom: 40px; }
          .home-btns-centered { display: flex; gap: 20px; justify-content: center; }
          .btn-dash { padding: 16px 40px; background: white; color: black; border-radius: 50px; font-weight: 700; border: none; cursor: pointer; }
          .btn-logout { padding: 16px 40px; border: 1px solid #333; color: #666; border-radius: 50px; background: none; cursor: pointer; }
        `}</style>
      </div>
    );
  }

  if (view === 'admin_dash') {
    const isAdminTab = adminModules.some(m => m.name === activeTab);
    if (role === 'user' && isAdminTab) {
        return (
            <div className="main-portal">
                <div className="cyber-grid-bg"></div>
                <div className="auth-card access-denied-card">
                    <div className="denied-icon">🚫</div>
                    <h1 style={{color: '#ef4444'}}>ACCESS DENIED</h1>
                    <p className="status-label" style={{color: '#ef4444'}}>INSUFFICIENT CLEARANCE LEVEL</p>
                    <button onClick={() => setActiveTab(userModules[0].name)} className="cyber-btn" style={{background: '#ef4444', color: '#fff'}}>
                        RETURN TO USER VAULT
                    </button>
                </div>
            </div>
        );
    }

    if (role === 'admin') {
       return <MasterForensicDashboard />;
    }

    return (
      <div className={`dash-container ${role === 'user' ? 'user-mode' : 'admin-mode'}`}>
        {role === 'admin' && (
          <aside className="sidebar-cyber">
            <div className="sidebar-header">
              <img src={LOGO_PATH} alt="Logo" className="sidebar-logo" />
              <div className="sidebar-text">
                <h2>AuthPrivacyChain</h2>
                <p>SECURE NODE ACTIVE</p>
              </div>
            </div>
            <nav className="sidebar-nav">
              {adminModules.map(m => (
                <button key={m.name} onClick={() => setActiveTab(m.name)} className={activeTab === m.name ? 'nav-item active' : 'nav-item'}>
                  <span className="icon">{m.icon}</span> {m.name}
                </button>
              ))}
            </nav>
            <button onClick={() => setView('home')} className="btn-exit">RETURN TO TERMINAL</button>
          </aside>
        )}

        <main className="main-content">
          <div className="module-header-left">
            <p className="module-status-big">// STATUS: LIVE MONITORING</p>
            <h1 className="module-title-big">{activeTab}</h1>
            <p className="module-definition-big">{activeModule.def}</p>
          </div>
          
          <div className="forensic-grid">
             <div className="visualizer-box">
                <div className="action-interface">
                   {role === 'user' ? (
                     <UserDashboard 
                        activeTab={activeTab} 
                        setActiveTab={setActiveTab} 
                        userModules={userModules} 
                        setView={setView}
                        handleFileChange={handleFileChange}
                        runFileEncryption={runFileEncryption}
                        runDecryption={runDecryption}
                        selectedFile={selectedFile}
                        fileEncryptionResult={fileEncryptionResult} // Pass this so it can show the unique file ID
                        downloadEncryptedFile={downloadEncryptedFile}
                      />
                   ) : (
                     <div className="action-btn-group">
                        <p style={{fontSize: '10px', color: '#444', marginBottom: '10px'}}>Module Operations</p>
                        {activeModule.actions.map(action => <button key={action} className="cyber-action-btn">{action}</button>)}
                     </div>
                   )}
                </div>
                <div className="radar-circle"></div>
             </div>

             <div className="telemetry-card">
                <p className="telemetry-label">System Telemetry</p>
                <div className="telemetry-row"><span>LATENCY</span><span className="val">12ms</span></div>
                <div className="telemetry-row"><span>PORT</span><span className="val blue">8080 (SSL)</span></div>
                <div className="telemetry-row"><span>UPTIME</span><span className="val">99.9%</span></div>
                <div className="telemetry-row"><span>SECURITY</span><span className="val green">REMOTE</span></div>
             </div>
          </div>

          {role === 'user' && (
            <div className="floating-dock-sleek">
                <div className="dock-items-wrapper">
                  {userModules.map(m => (
                    <button key={m.name} onClick={() => setActiveTab(m.name)} className={activeTab === m.name ? 'dock-item-sleek active' : 'dock-item-sleek'} aria-label={m.name}>
                      <span className="dock-icon-sleek">{m.icon}</span>
                    </button>
                  ))}
                  <div className="dock-divider"></div>
                  <button onClick={() => setView('home')} className="dock-item-sleek exit-red">
                    <span className="dock-icon-sleek">✖</span>
                  </button>
                </div>
            </div>
          )}
        </main>

        <style>{`
          .dash-container { display: flex; height: 100vh; background: #080808; color: white; font-family: sans-serif; overflow: hidden; }
          .sidebar-cyber { width: 300px; background: #0c0c0c; border-right: 1px solid #1a1a1a; padding: 40px 20px; display: flex; flex-direction: column; }
          .sidebar-header { display: flex; align-items: center; gap: 15px; margin-bottom: 50px; }
          .sidebar-logo { width: 40px; }
          .sidebar-text h2 { font-size: 14px; margin: 0; }
          .sidebar-text p { font-size: 8px; color: #2563eb; margin: 0; font-weight: 900; }
          .nav-item { width: 100%; text-align: left; padding: 14px 20px; background: none; border: none; color: #666; font-size: 13px; font-weight: 600; cursor: pointer; border-radius: 12px; margin-bottom: 5px; display: flex; gap: 12px; align-items: center; }
          .nav-item.active { background: #2563eb; color: white; }
          .main-content { flex: 1; padding: 60px 80px; position: relative; display: flex; flex-direction: column; align-items: flex-start; }
          .module-header-left { text-align: left; margin-bottom: 40px; width: 100%; }
          .module-status-big { font-size: 14px; color: #2563eb; font-weight: 900; margin-bottom: 12px; letter-spacing: 2px; }
          .module-title-big { font-size: 48px; font-weight: 900; margin: 0 0 15px 0; letter-spacing: -1px; }
          .module-definition-big { color: #888; font-size: 18px; max-width: 600px; line-height: 1.5; }
          .forensic-grid { display: flex; gap: 30px; height: 70vh; width: 100%; max-width: 1600px; margin: 0 auto; align-items: stretch; }
          .visualizer-box { flex: 2.5; background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 40px; display: flex; align-items: flex-start; justify-content: flex-start; position: relative; overflow-y: auto; padding: 30px; }
          .telemetry-card { flex: 1; background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 40px; padding: 35px; height: 100%; box-sizing: border-box;}
          .floating-dock-sleek { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); width: 70%; max-width: 800px; background: rgba(10,10,10,0.85); backdrop-filter: blur(25px); border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); padding: 6px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
          .dock-items-wrapper { display: flex; justify-content: space-around; align-items: center; padding: 2px 10px; }
          .dock-item-sleek { background: none; border: none; font-size: 22px; cursor: pointer; opacity: 0.3; transition: 0.3s ease; padding: 10px; border-radius: 14px; }
          .dock-item-sleek:hover { opacity: 0.8; background: rgba(255,255,255,0.03); transform: translateY(-3px); }
          .dock-item-sleek.active { opacity: 1; transform: scale(1.1); filter: drop-shadow(0 0 10px #2563eb); background: rgba(37,99,235,0.1); }
          .dock-divider { width: 1px; height: 30px; background: rgba(255,255,255,0.1); margin: 0 5px; }
          .exit-red { color: #ef4444; opacity: 0.6; }
          .telemetry-label { font-size: 14px; font-weight: 800; margin-bottom: 25px; color: #2563eb; }
          .telemetry-row { display: flex; justify-content: space-between; font-size: 12px; padding: 15px 0; border-bottom: 1px solid #151515; color: #555; }
          .telemetry-row .val { color: #fff; font-weight: 900; }
          .cyber-action-btn { background: white; color: black; border: none; padding: 14px 28px; border-radius: 15px; font-weight: 800; cursor: pointer; margin: 8px; font-size: 13px; }
          .radar-circle { position: absolute; width: 300px; height: 300px; border: 1px solid rgba(37,99,235,0.1); border-radius: 50%; animation: radar 4s infinite linear; pointer-events: none; }
          @keyframes radar { 0% { transform: scale(0.6); opacity: 0; } 50% { opacity: 0.4; } 100% { transform: scale(1.8); opacity: 0; } }
          .btn-exit { margin-top: auto; padding: 15px; background: #111; color: #444; border: 1px solid #222; border-radius: 14px; font-size: 11px; font-weight: 800; cursor: pointer; }
          .geofence-shield-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100vw; height: 100vh; z-index: 2000000 !important; background: #000; display: flex; align-items: center; justify-content: center; overflow: hidden; font-family: 'Inter', sans-serif; }
          
          .cyber-grid-red { position: absolute; inset: 0; background-image: linear-gradient(rgba(239, 68, 68, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.2) 1px, transparent 1px); background-size: 40px 40px; animation: grid-pulse-red 3s infinite alternate; z-index: 1; }
          .cyber-grid-blue { position: absolute; inset: 0; background-image: linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px); background-size: 45px 45px; animation: grid-pulse-blue 4s infinite alternate-reverse; z-index: 2; }
          
          @keyframes grid-pulse-red { from { opacity: 0.2; transform: scale(1); } to { opacity: 0.6; transform: scale(1.05); } }
          @keyframes grid-pulse-blue { from { opacity: 0.2; transform: scale(1); } to { opacity: 0.6; transform: scale(1.1); } }

          .laser-scanner-red { position: absolute; width: 200%; height: 2px; background: rgba(239, 68, 68, 0.8); box-shadow: 0 0 20px #ef4444; top: 30%; left: -50%; transform: rotate(-5deg); animation: laser-scan-v 4s infinite linear; z-index: 5; }
          .laser-scanner-blue { position: absolute; width: 200%; height: 2px; background: rgba(59, 130, 246, 0.8); box-shadow: 0 0 20px #3b82f6; top: 60%; left: -50%; transform: rotate(5deg); animation: laser-scan-v 5s infinite linear reverse; }
          
          @keyframes laser-scan-v { 0% { top: -10%; } 100% { top: 110%; } }
          
          .shield-container { position: relative; z-index: 3000000 !important; display: flex; flex-direction: column; align-items: center; gap: 30px; }
          .shield-glow-ring { position: absolute; width: 400px; height: 400px; border: 2px solid rgba(59, 130, 246, 0.1); border-radius: 50%; animation: ring-pulse 2s infinite; }
          @keyframes ring-pulse { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }
          
          .shield-icon-wrap { position: relative; width: 120px; height: 120px; background: rgba(255,255,255,0.03); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 0 30px rgba(59,130,246,0.2); }
          .shield-main-icon { font-size: 60px; filter: drop-shadow(0 0 10px rgba(59,130,246,0.5)); }
          .shield-scanner-line { position: absolute; width: 100%; height: 2px; background: #3b82f6; box-shadow: 0 0 10px #3b82f6; top: 0; animation: scan-shield 2s infinite ease-in-out; }
          @keyframes scan-shield { 0%, 100% { top: 10%; } 50% { top: 90%; } }
          
          .shield-content { text-align: center; }
          .shield-title { font-size: 42px; font-weight: 900; letter-spacing: 4px; margin: 0; color: #fff; text-shadow: 0 0 10px rgba(255,255,255,0.3); }
          .shield-separator { display: flex; height: 4px; width: 100%; max-width: 300px; margin: 15px auto; }
          .sep-red { flex: 1; background: #ef4444; box-shadow: 0 0 10px #ef4444; }
          .sep-blue { flex: 1; background: #3b82f6; box-shadow: 0 0 10px #3b82f6; }
          
          .shield-msg { color: #888; font-size: 14px; line-height: 1.8; letter-spacing: 1px; }
          .glitch-text { font-size: 24px; font-weight: 900; color: #ef4444; position: relative; display: inline-block; }
          .glitch-text::before, .glitch-text::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; }
          .glitch-text::before { left: 2px; text-shadow: -2px 0 #3b82f6; animation: glitch 2s infinite linear alternate-reverse; }
          .glitch-text::after { left: -2px; text-shadow: 2px 0 #ef4444; animation: glitch 3s infinite linear alternate-reverse; }
          @keyframes glitch { 0% { clip: rect(44px, 450px, 56px, 0); } 20% { clip: rect(12px, 450px, 89px, 0); } 40% { clip: rect(67px, 450px, 34px, 0); } 60% { clip: rect(89px, 450px, 12px, 0); } 80% { clip: rect(34px, 450px, 67px, 0); } 100% { clip: rect(56px, 450px, 44px, 0); } }
          
          .forensic-meta { display: flex; gap: 20px; justify-content: center; margin: 20px 0; }
          .meta-item { display: flex; flex-direction: column; background: rgba(255,255,255,0.02); padding: 10px 20px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
          .m-label { font-size: 9px; color: #555; font-weight: 800; letter-spacing: 1px; }
          .m-val { font-size: 12px; color: #fff; font-weight: 700; margin-top: 4px; }
          .m-val.red { color: #ef4444; }
          
          .shield-dismiss-btn { background: none; border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 12px 30px; border-radius: 4px; font-size: 11px; font-weight: 800; letter-spacing: 2px; cursor: pointer; transition: 0.3s; }
          .shield-dismiss-btn:hover { background: #fff; color: #000; box-shadow: 0 0 20px rgba(255,255,255,0.3); }
        `}</style>
      </div>
    );
  }
  return null;
}
export default App;