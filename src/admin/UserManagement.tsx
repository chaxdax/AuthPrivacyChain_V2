import React, { useState } from 'react';
import axios from 'axios';

interface UserManagementProps {
  usersList: any[];
  moduleLoading: boolean;
  fetchModuleData: () => void;
  API: string;
  headers: any;
}

export default function UserManagement({ usersList, moduleLoading, fetchModuleData, API, headers }: UserManagementProps) {
  const [resolvingAction, setResolvingAction] = useState<{userId: string, action: 'suspend' | 'reset'} | null>(null);
  const [adminCodeInput, setAdminCodeInput] = useState('');
  const [showAdminCode, setShowAdminCode] = useState(false);

  const initiateAction = (userId: string, action: 'suspend' | 'reset') => {
    setResolvingAction({ userId, action });
    setAdminCodeInput('');
    setShowAdminCode(false);
  };

  const submitAction = async () => {
    if (!resolvingAction) return;
    
    if (adminCodeInput !== "admin123") { 
      alert("INVALID CODE. ACCESS DENIED."); 
      setResolvingAction(null); 
      return; 
    }

    const { userId, action } = resolvingAction;
    const endpoint = action === 'suspend' ? 'suspend-user' : 'reset-token';
    
    try { 
      await axios.post(`${API}/admin/${endpoint}/${userId}`, {}, { headers }); 
      alert('Success'); 
      fetchModuleData(); 
    } catch { 
      alert('Action failed.'); 
    }
    
    setResolvingAction(null);
  };

  return (
    <div className="soc-full-card">
      <div className="card-header">
        <h3>User Management <span className="count-badge">{usersList.length} users</span></h3>
        <button onClick={() => fetchModuleData()} className="soc-pill-btn">↻</button>
      </div>
      <div className="soc-list">
        <div className="list-head" style={{gridTemplateColumns: '0.8fr 1.5fr 1fr 1fr 2fr'}}>
          <span>ID</span><span>Phone</span><span>Name</span><span>Files/Alerts</span><span>Actions</span>
        </div>
        {moduleLoading ? (
          <p className="empty-state">Loading users...</p>
        ) : usersList.length === 0 ? (
          <p className="empty-state">No users.</p>
        ) : (
          usersList.map((u, i) => (
            <div key={i} className="list-row" style={{gridTemplateColumns: '0.8fr 1.5fr 1fr 1fr 2fr'}}>
              <span className="l-id" style={{fontSize: '11px'}}>{u.numeric_id}</span>
              <span>{u.phone}</span>
              <span>{u.name}</span>
              <span className="l-target">{u.files} files / <span className={u.alerts > 0 ? 'c-red' : ''}>{u.alerts} alerts</span></span>
              <span style={{display: 'flex', gap: '8px'}}>
                <button onClick={() => initiateAction(u.id, 'reset')} className="soc-pill-btn" style={{margin:0, fontSize: '10px'}}>Reset Token</button>
                <button onClick={() => initiateAction(u.id, 'suspend')} className="soc-pill-btn danger" style={{margin:0, fontSize: '10px'}}>Suspend</button>
              </span>
            </div>
          ))
        )}
      </div>

      {resolvingAction && (
        <div className="soc-modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999}}>
          <div className="soc-modal-content" style={{background: '#131220', border: '1px solid rgba(99,102,241,0.3)', padding: '24px', borderRadius: '16px', width: '350px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)'}}>
            <h3 style={{marginTop: 0, marginBottom: '16px', color: '#fff', fontSize: '14px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px'}}>
              ENTER ADMIN CODE TO {resolvingAction.action.toUpperCase()} USER:
            </h3>
            <div style={{position: 'relative', marginBottom: '20px'}}>
              <input 
                type={showAdminCode ? "text" : "password"} 
                value={adminCodeInput} 
                onChange={(e) => setAdminCodeInput(e.target.value)}
                placeholder="Security Code..."
                style={{width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', boxSizing: 'border-box', outline: 'none', fontFamily: showAdminCode ? 'inherit' : 'caption'}}
                autoFocus
                onKeyDown={(e) => { if (e.key === 'Enter') submitAction(); }}
              />
              <button 
                onClick={() => setShowAdminCode(!showAdminCode)}
                style={{position: 'absolute', right: '12px', top: '12px', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: 0, fontSize: '16px'}}
                title={showAdminCode ? "Hide Password" : "Show Password"}
              >
                {showAdminCode ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
              <button onClick={() => setResolvingAction(null)} className="soc-pill-btn danger" style={{margin: 0}}>Cancel</button>
              <button onClick={submitAction} className="soc-pill-btn" style={{margin: 0, background: 'rgba(99,102,241,0.2)', borderColor: '#6366f1', color: '#fff'}}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
