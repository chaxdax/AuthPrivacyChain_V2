import { useState, useEffect } from 'react';
import axios from 'axios';
import PermissionManager from './PermissionManager';
import { API_BASE } from './config';

import AlertCenter from './alert'; 
import EmergencyRoom from './Emergency'; 
import SecurityFeed from './SecurityActivityFeed';

interface UserDashboardProps {
  activeTab: string;
  [key: string]: any;
}

const UserDashboard = ({ activeTab }: UserDashboardProps) => {
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const current = activeTab.toLowerCase().trim();

  useEffect(() => {
    if (current.includes('vault')) fetchFiles();
  }, [current]);

  const fetchFiles = async () => {
    const token = localStorage.getItem('apc_token');
    const myUsername = localStorage.getItem('apc_user'); 
    try {
      const [resMy, resShared] = await Promise.all([
        axios.get(`${API_BASE}/my-files`, { headers: { 'x-access-token': token } }),
        axios.get(`${API_BASE}/shared-with-me`, { headers: { 'x-user-identity': myUsername } }).catch(() => ({ data: [] }))
      ]);

      const myFiles = resMy.data.map((f: any) => ({ ...f, is_shared: false }));
      const sharedFiles = resShared.data.map((f: any) => ({ ...f, is_shared: true }));
      
      setFiles([...myFiles, ...sharedFiles]);
    } catch (err) { 
      console.error("Vault offline"); 
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Select file first.");
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    const token = localStorage.getItem('apc_token');
    try {
      await axios.post(`${API_BASE}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', 'x-access-token': token }
      });
      setSelectedFile(null);
      
      // Auto-trigger encryption immediately after upload for super-fast securing of files
      try {
        await axios.post(`${API_BASE}/encrypt-pending`, {}, { 
          headers: { 'x-access-token': token } 
        });
      } catch (encErr) {
        console.warn("Auto-encryption pending manual trigger.");
      }
      
      fetchFiles();
    } catch (err) { alert("Upload failed."); } finally { setIsProcessing(false); }
  };

  const handleEncryptAll = async () => {
    const token = localStorage.getItem('apc_token');
    setIsProcessing(true);
    try {
      await axios.post(`${API_BASE}/encrypt-pending`, {}, { 
        headers: { 'x-access-token': token } 
      });
      fetchFiles();
    } catch (err) { alert("Encryption failed."); } finally { setIsProcessing(false); }
  };

  const handleDecrypt = async (file: any) => {
    try {
      const res = await axios.get(`${API_BASE}/download/${file.id}`, {
        headers: { 'x-access-token': localStorage.getItem('apc_token') },
        responseType: 'blob' 
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      try {
        const myUsername = localStorage.getItem('apc_user') || "User_2";
        await axios.post(`${API_BASE}/api/log-decrypt`, {
          user: myUsername,
          owner: file.owner || "User_1", 
          file: file.filename
        });
      } catch (logErr) {
        console.warn("SOC activity recording failed.");
      }

    } catch (err) { alert("Decryption failed."); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete file permanently?")) return;
    const token = localStorage.getItem('apc_token');
    try {
      await axios.delete(`${API_BASE}/delete-file/${id}`, { 
        headers: { 'x-access-token': token } 
      });
      fetchFiles();
    } catch (err) { alert("Delete failed."); }
  };

  let content;
  
  if (current.includes('vault')) {
    content = (
      <div className="vault-enlarged-root">
        <div className="vault-header-control">
          <input type="file" id="v-file" onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])} hidden />
          <label htmlFor="v-file" className="v-picker-long">
            {selectedFile ? selectedFile.name : "// SELECT_DATA_STREAM"}
          </label>
          <div className="btn-group">
            <button onClick={handleUpload} className="v-upload-btn" disabled={isProcessing}>
              {isProcessing ? "PROCESSING..." : "UPLOAD"}
            </button>
            <button onClick={handleEncryptAll} className="v-encrypt-btn" disabled={isProcessing}>
              ENCRYPT
            </button>
          </div>
        </div>

        <div className="vault-table-container">
          <div className="v-table-head">
            <span>FILE_NO</span>
            <span>FILE_IDENTIFIER</span>
            <span>SECURITY_LAYER</span>
            <span style={{ textAlign: 'right' }}>COMMANDS</span>
          </div>
          
          <div className="v-table-body">
            {files.map((file) => (
              <div key={file.id} className="v-table-row">
                <div className="v-col-id" style={{ color: '#2563eb', fontWeight: 'bold', fontFamily: 'monospace' }}>
                  #{file.id.slice(0, 8)}
                </div>
                <div className="v-col-name">
                  📄 {file.filename}
                  {file.is_shared && <span style={{ color: '#3b82f6', fontSize: '9px', marginLeft: '10px', fontWeight: 'bold' }}>[SHARED]</span>}
                </div>
                <div className={`v-col-status ${file.is_encrypted ? 'active' : ''}`}>
                  {file.is_encrypted ? "AES_256_SECURED" : "RAW_UNSECURED"}
                </div>
                <div className="v-col-cmds">
                  <button onClick={() => handleDecrypt(file)} className="v-btn dec">DECRYPT</button>
                  {!file.is_shared && <button onClick={() => handleDelete(file.id)} className="v-btn del">DEL</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (current === 'permission manager' || current.includes('alert') || current.includes('emergency') || current.includes('recovery') || current.includes('security')) {
    content = (
      <div className="vault-enlarged-root">
        <div className="vault-table-container">
            {current === 'permission manager' && <PermissionManager />}
            {current.includes('alert') && <AlertCenter />}
            {(current.includes('emergency') || current.includes('recovery')) && <EmergencyRoom />}
            {current.includes('security') && <SecurityFeed />}
        </div>
      </div>
    );
  } else {
    content = (
      <div style={{ color: '#444', textAlign: 'center', marginTop: '50px', fontFamily: 'monospace' }}>
        [ SYSTEM_IDLE ] <br />
        Active Tab: "{activeTab}"
      </div>
    );
  }

  return (
    <div className="dashboard-outer-wrapper">
      <div className="module-content-shaper">
        {content}
      </div>
      <style>{`
        .dashboard-outer-wrapper { 
          width: 100%; 
          height: 100%; 
          display: flex; 
          flex-direction: column; 
          overflow: hidden; 
        }

        .module-content-shaper {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .vault-enlarged-root { 
          width: 100%; 
          height: 100%; 
          display: flex; 
          flex-direction: column; 
          padding: 20px; 
          box-sizing: border-box; 
        }
        
        .vault-header-control { 
          display: flex; 
          width: 100%;
          gap: 15px; 
          margin-bottom: 20px; 
          background: rgba(255,255,255,0.02); 
          padding: 25px; 
          border-radius: 20px; 
          border: 1px solid rgba(255,255,255,0.05); 
          box-sizing: border-box;
        }

        .v-picker-long { 
          flex: 2; 
          background: #000; 
          border: 1px solid #222; 
          padding: 18px; 
          border-radius: 12px; 
          color: #666; 
          font-family: monospace; 
          font-size: 11px; 
          cursor: pointer; 
          display: flex; 
          align-items: center; 
        }

        .btn-group { 
          flex: 1; 
          display: flex; 
          gap: 10px; 
        }

        .v-upload-btn, .v-encrypt-btn { 
          flex: 1; 
          height: 55px; 
          border-radius: 12px; 
          font-weight: 900; 
          font-size: 11px; 
          cursor: pointer; 
          border: none; 
          letter-spacing: 1px; 
        }

        .v-upload-btn { background: #fff; color: #000; }
        .v-encrypt-btn { background: #2563eb; color: #fff; }

        .vault-table-container { 
          flex: 1; 
          width: 100%;
          background: rgba(10, 10, 10, 0.4); 
          border-radius: 20px; 
          border: 1px solid rgba(255,255,255,0.03); 
          overflow: hidden; 
          display: flex; 
          flex-direction: column; 
        }

        .v-table-head { 
          display: grid; 
          grid-template-columns: 120px 2fr 1fr 200px; 
          padding: 20px 30px; 
          font-size: 10px; 
          color: #2563eb; 
          font-weight: 900; 
          border-bottom: 1px solid #111; 
          letter-spacing: 2px; 
        }

        .v-table-body { flex: 1; overflow-y: auto; padding: 15px; }

        .v-table-row { 
          display: grid; 
          grid-template-columns: 120px 2fr 1fr 200px; 
          align-items: center; 
          padding: 22px 25px; 
          background: rgba(255,255,255,0.01); 
          border: 1px solid #0a0a0a; 
          margin-bottom: 10px; 
          border-radius: 18px; 
        }

        .v-col-name { color: #fff; font-size: 14px; font-family: monospace; }
        .v-col-status { font-size: 11px; font-weight: 800; color: #333; }
        .v-col-status.active { color: #10b981; }
        .v-col-cmds { display: flex; gap: 10px; justify-content: flex-end; }
        .v-btn { background: #000; border: 1px solid #222; color: #fff; padding: 10px 18px; border-radius: 10px; font-size: 10px; cursor: pointer; font-weight: 800; }
        .v-btn.dec { border-color: #10b981; color: #10b981; }
        .v-btn.del:hover { color: #ef4444; border-color: #ef4444; }
      `}</style>
    </div>
  );
};

export default UserDashboard;