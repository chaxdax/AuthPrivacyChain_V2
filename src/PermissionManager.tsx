import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from './config';

const PermissionManager = () => {
  const [targetUser, setTargetUser] = useState('');
  const [fileId, setFileId] = useState('');
  const [status, setStatus] = useState('');
  const [activeShares, setActiveShares] = useState<any[]>([]); 
  const [receivedFiles, setReceivedFiles] = useState<any[]>([]);

  const myIdentity = localStorage.getItem('apc_user');

  const fetchData = async () => {
    try {
      const headers = { 'x-user-identity': myIdentity };
     
      const resOutbound = await axios.get(`${API_BASE}/my-shares`, { headers });
      setActiveShares(resOutbound.data || []);

      
      const resInbound = await axios.get(`${API_BASE}/shared-with-me`, { headers });
      setReceivedFiles(resInbound.data || []);
    } catch (err) { 
      console.error("Sync failed - Backend might be unreachable."); 
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const handleGrant = async () => {
    try {
      const res = await axios.post(`${API_BASE}/grant`, {
        fileId: fileId.replace('#', '').trim(),
        targetUser: targetUser.trim(),
        owner: myIdentity
      });
      setStatus(`SUCCESS: TX ${res.data.tx}`);
      setFileId(''); setTargetUser('');
      fetchData();
    } catch (err: any) { 
      setStatus(`ERROR: ${err.response?.data?.message || 'Failed'}`); 
    }
  };

  const handleDecrypt = async (file: any) => {
    try {
      const res = await axios.post(`${API_BASE}/view-decrypted`, 
        { fileId: file.id, username: myIdentity }, 
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) { 
      alert("Access Denied: Protocol rejected the decryption key."); 
    }
  };

  const handleRevoke = async (fId: string, tUser: string) => {
    try {
      await axios.post(`${API_BASE}/revoke`, {
        fileId: fId, targetUser: tUser, owner: myIdentity
      });
      fetchData();
    } catch (err) { 
      alert("Revoke command failed."); 
    }
  };

  return (
    <div className="module-inner-content">
      <div className="perm-grid">
        
        <div className="perm-box">
          <label>AUTHORIZE NEW ACCESS</label>
          <div className="input-group">
             <small className="input-hint">Recipient Unique ID</small>
             <input 
               type="text" 
               placeholder="e.g. CHANDAN_01" 
               className="file-input-custom" 
               value={targetUser} 
               onChange={(e) => setTargetUser(e.target.value)} 
             />
          </div>
          <div className="input-group" style={{marginTop: '15px'}}>
             <small className="input-hint">File Reference ID</small>
             <input 
               type="text" 
               placeholder="e.g. 8f2a" 
               className="file-input-custom" 
               value={fileId} 
               onChange={(e) => setFileId(e.target.value)} 
             />
          </div>
          <button onClick={handleGrant} className="cyber-action-btn">
            Grant Access by ID
          </button>
          {status && <p className="status-msg">{status}</p>}
        </div>

        <div className="perm-box" style={{display: 'flex', flexDirection: 'column'}}>
          <label>OUTBOUND_ACCESS (MY SHARED FILES)</label>
          <div className="shares-list scrollable" style={{flex: 1}}>
            {activeShares.length > 0 ? activeShares.map((share, i) => (
              <div key={i} className="share-item">
                <span className="user-tag">
                    <span style={{color: '#2563eb'}}>@</span>{share.targetUser} 
                    <br/> 
                    <small style={{color: '#444'}}>FILE: {share.filename}</small>
                </span>
                <button onClick={() => handleRevoke(share.fileId, share.targetUser)} className="revoke-btn">REVOKE</button>
              </div>
            )) : <p className="empty-text">NO_ACTIVE_SHARES</p>}
          </div>
        </div>
      </div>

      <div className="perm-box" style={{marginTop: '25px', flex: 1, display: 'flex', flexDirection: 'column'}}>
        <label>INBOUND_ACCESS_NODES (SHARED WITH YOU)</label>
        <div className="shares-list horizontal" style={{flex: 1, alignContent: 'flex-start'}}>
          {receivedFiles.length > 0 ? receivedFiles.map((file, i) => (
            <div key={i} className="share-item received">
              <div className="security-tag">● AES-256 SECURED</div>
              <span className="file-tag">📄 {file.filename}</span>
              <span className="owner-tag">SOURCE_ID: <span>@{file.owner}</span></span>
              <button onClick={() => handleDecrypt(file)} className="dec-btn-small">DECRYPT & VIEW</button>
            </div>
          )) : <p className="empty-text">NO_FILES_SHARED_WITH_YOU</p>}
        </div>
      </div>

      <style>{`
        .module-inner-content { flex: 1; width: 100%; height: 100%; display: flex; flex-direction: column; padding: 25px; box-sizing: border-box; }
        .perm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
        .perm-box { background: rgba(255,255,255,0.02); padding: 25px; border-radius: 20px; border: 1px solid #111; }
        .input-hint { color: #444; font-size: 9px; text-transform: uppercase; display: block; margin-bottom: 5px; font-weight: 800; }
        .file-input-custom { width: 100%; background: #000; border: 1px solid #222; padding: 12px; border-radius: 10px; color: #fff; font-size: 11px; outline: none; transition: 0.3s; }
        .file-input-custom:focus { border-color: #2563eb; }
        .cyber-action-btn { background: #2563eb; color: #fff; border: none; padding: 14px; border-radius: 10px; font-weight: 900; cursor: pointer; font-size: 10px; text-transform: uppercase; width: 100%; margin-top: 20px; }
        label { font-size: 9px; color: #2563eb; font-weight: 800; display: block; margin-bottom: 20px; letter-spacing: 1.5px; }
        
        .shares-list.scrollable { max-height: 220px; overflow-y: auto; }
        .shares-list.horizontal { display: flex; gap: 12px; flex-wrap: wrap; }
        
        .share-item { display: flex; justify-content: space-between; align-items: center; background: #000; padding: 15px; border-radius: 15px; border: 1px solid #111; margin-bottom: 10px; }
        .share-item.received { flex-direction: column; align-items: flex-start; min-width: 220px; width: auto; }
        
        .user-tag { color: #fff; font-size: 11px; font-family: monospace; }
        .security-tag { font-size: 9px; fontWeight: bold; color: #10b981; margin-bottom: 10px; letter-spacing: 1px; }
        .owner-tag { color: #3b82f6; font-size: 9px; margin: 8px 0; }
        .owner-tag span { color: #fff; }
        .file-tag { color: #fff; font-size: 11px; font-weight: bold; }
        
        .dec-btn-small { background: #10b981; color: #fff; border: none; padding: 10px; border-radius: 8px; font-size: 9px; width: 100%; cursor: pointer; margin-top: 10px; font-weight: 800; }
        .revoke-btn { background: transparent; border: 1px solid #ef4444; color: #ef4444; font-size: 8px; padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: 0.3s; }
        .revoke-btn:hover { background: #ef4444; color: #fff; }
        
        .empty-text { color: #333; font-size: 10px; text-align: center; padding: 20px 0; font-family: monospace; }
        .status-msg { font-size: 10px; color: #3b82f6; margin-top: 15px; font-family: monospace; border-left: 2px solid #3b82f6; padding-left: 10px; }
      `}</style>
    </div>
  );
};

export default PermissionManager;