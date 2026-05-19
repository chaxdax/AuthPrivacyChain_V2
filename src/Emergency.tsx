import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from './config';

const EmergencyRecovery = () => {
  const [masterKeyInput, setMasterKeyInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isMasterKeyValid, setIsMasterKeyValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('apc_user');
    if (user && localStorage.getItem(`apc_master_validated_${user}`) === 'true') {
      setIsMasterKeyValid(true);
    }
  }, []);

  const [passwordChangeMode, setPasswordChangeMode] = useState<'master' | 'old'>('master');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleValidateMasterKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('apc_token');
      await axios.post(`${API_BASE}/verify-master-key`, { 
        master_key: masterKeyInput,
        name: nameInput
      }, {
        headers: { 'x-access-token': token }
      });
      setIsMasterKeyValid(true);
      const user = localStorage.getItem('apc_user');
      if (user) localStorage.setItem(`apc_master_validated_${user}`, 'true');
      alert("Master Key Validated Successfully.");
    } catch (err: any) {
      alert(err.response?.data?.message || "Invalid Master Key.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;
    if (!passwordRegex.test(newPassword)) {
      alert("SECURITY RISK: Password must contain at least one uppercase letter, one lowercase letter, and one special character.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('apc_token');
      const payload: any = { new_password: newPassword };
      
      if (passwordChangeMode === 'master') {
        payload.master_key = masterKeyInput;
      } else {
        payload.old_password = oldPassword;
      }

      await axios.post(`${API_BASE}/change-password`, payload, {
        headers: { 'x-access-token': token }
      });
      
      alert("Password updated successfully. Please log in with your new password.");
      window.location.reload(); // Force re-login
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="module-inner-content">
      <div className="vault-header-control" style={{marginBottom: '20px'}}>
        <div className="header-status-block">
          <div className="pulse-indicator"></div>
          <h3 className="module-title">EMERGENCY_RECOVERY_TOOL</h3>
        </div>
        <span className="event-count">SYSTEM_RECOVERY_PROTOCOL</span>
      </div>

      <div className="recovery-container">
        
        <div className="recovery-card">
          <h2 className="card-heading">1. VALIDATE MASTER KEY</h2>
          <p className="card-subtext">Paste the Master Recovery Key you received during registration to unlock password recovery.</p>
          
          <form onSubmit={handleValidateMasterKey} className="recovery-form">
            <div className="cyber-field">
              <label>LEGAL NAME</label>
              <input 
                type="text" 
                placeholder="Enter registered legal name..." 
                value={nameInput} 
                onChange={(e) => setNameInput(e.target.value)} 
                disabled={isMasterKeyValid}
                required 
              />
            </div>
            <div className="cyber-field">
              <label>MASTER RECOVERY KEY</label>
              <input 
                type="text" 
                placeholder="XXXX-XXXX-XXXX-XXXX" 
                value={masterKeyInput} 
                onChange={(e) => setMasterKeyInput(e.target.value)} 
                disabled={isMasterKeyValid}
                required 
              />
            </div>
            {!isMasterKeyValid && (
              <button type="submit" className="cyber-btn" disabled={loading}>
                {loading ? "VALIDATING..." : "VALIDATE KEY"}
              </button>
            )}
            {isMasterKeyValid && (
              <div className="success-banner">✓ MASTER KEY VERIFIED</div>
            )}
          </form>
        </div>

        <div className="recovery-card">
          <h2 className="card-heading">2. UPDATE PASSWORD FOR USER: <span style={{color: '#2563eb'}}>{localStorage.getItem('apc_user')}</span></h2>
          <p className="card-subtext">Ensure your new password meets the strict platform requirements.</p>

          <div className="mode-tabs">
            <button 
              className={`mode-tab ${passwordChangeMode === 'master' ? 'active' : ''}`}
              onClick={() => setPasswordChangeMode('master')}
            >
              USE MASTER KEY
            </button>
            <button 
              className={`mode-tab ${passwordChangeMode === 'old' ? 'active' : ''}`}
              onClick={() => setPasswordChangeMode('old')}
            >
              USE OLD PASSWORD
            </button>
          </div>

          <form onSubmit={handleUpdatePassword} className={`recovery-form ${!isMasterKeyValid && passwordChangeMode === 'master' ? 'locked' : ''}`}>
            {passwordChangeMode === 'old' && (
              <div className="cyber-field">
                <label>CURRENT PASSWORD</label>
                <input 
                  type="password" 
                  placeholder="Enter current password..." 
                  value={oldPassword} 
                  onChange={(e) => setOldPassword(e.target.value)} 
                  required 
                />
              </div>
            )}
            
            <div className="cyber-field">
              <label>NEW PASSWORD</label>
              <input 
                type="password" 
                placeholder="Enter new strong password..." 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
                disabled={passwordChangeMode === 'master' && !isMasterKeyValid}
              />
              <span className="password-hint">Requires: 1 Uppercase, 1 Lowercase, 1 Special Character</span>
            </div>

            <button 
              type="submit" 
              className="cyber-btn" 
              disabled={loading || (passwordChangeMode === 'master' && !isMasterKeyValid)}
            >
              {loading ? "UPDATING..." : "UPDATE SYSTEM PASSWORD"}
            </button>
          </form>
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
          overflow-y: auto;
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

        .recovery-container {
          display: flex;
          flex-direction: column;
          gap: 25px;
          width: 100%;
        }

        .recovery-card {
          background: rgba(10, 10, 10, 0.4);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 30px;
          transition: opacity 0.3s;
        }

        .recovery-form.locked {
          opacity: 0.5;
          pointer-events: none;
        }

        .card-heading {
          font-size: 16px;
          color: #fff;
          font-family: 'Inter', sans-serif;
          margin: 0 0 10px 0;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .card-subtext {
          font-size: 12px;
          color: #888;
          margin: 0 0 25px 0;
        }

        .recovery-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cyber-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cyber-field label {
          font-size: 10px;
          font-weight: 900;
          color: #2563eb;
          letter-spacing: 1.5px;
          font-family: monospace;
        }

        .cyber-field input {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 15px;
          border-radius: 12px;
          color: #fff;
          font-family: monospace;
          font-size: 14px;
        }

        .cyber-field input:focus {
          outline: none;
          border-color: #2563eb;
          background: rgba(37, 99, 235, 0.05);
        }

        .cyber-field input:disabled {
          background: rgba(0,0,0,0.5);
          color: #555;
          cursor: not-allowed;
        }

        .password-hint {
          font-size: 10px;
          color: #f59e0b;
          font-family: monospace;
        }

        .cyber-btn {
          background: #2563eb;
          color: #fff;
          border: none;
          padding: 16px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
          cursor: pointer;
          transition: 0.3s;
          font-family: monospace;
        }

        .cyber-btn:hover:not(:disabled) {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(37,99,235,0.4);
        }

        .cyber-btn:disabled {
          background: #333;
          color: #666;
          cursor: not-allowed;
        }

        .success-banner {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 16px;
          border-radius: 12px;
          text-align: center;
          font-weight: 900;
          font-family: monospace;
          font-size: 12px;
        }

        .mode-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 15px;
        }

        .mode-tab {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: #888;
          padding: 10px 15px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
          transition: 0.2s;
        }

        .mode-tab:hover {
          background: rgba(255,255,255,0.05);
          color: #fff;
        }

        .mode-tab.active {
          background: rgba(37, 99, 235, 0.1);
          border-color: #2563eb;
          color: #2563eb;
        }

        @media (max-width: 768px) {
          .module-inner-content { padding: 10px !important; }
          .vault-header-control { flex-direction: column !important; padding: 15px !important; align-items: flex-start !important; }
          .recovery-card { padding: 15px !important; border-radius: 12px !important; }
          .card-heading { font-size: 13px !important; }
          .mode-tabs { flex-direction: column !important; gap: 8px !important; }
          .mode-tab { width: 100% !important; text-align: center !important; }
        }
      `}</style>
    </div>
  );
};

export default EmergencyRecovery;