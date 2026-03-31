import { useState, useEffect } from 'react';
import axios from 'axios';
import PermissionManager from './PermissionManager';

interface UserDashboardProps {
  activeTab: string;
}

const UserDashboard = ({ activeTab }: UserDashboardProps) => {
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Automatically fetch when switching to the Vault tab
  useEffect(() => {
    if (activeTab === 'Encrypted File Vault') fetchFiles();
  }, [activeTab]);

  const fetchFiles = async () => {
    const token = localStorage.getItem('apc_token');
    const myUsername = localStorage.getItem('apc_user'); // Needed for shared files
    try {
      // Fetch My Files
      const resMy = await axios.get('https://authprivacychain-v2.onrender.com/my-files', { 
        headers: { 'x-access-token': token } 
      });
      const myFiles = resMy.data.map((f: any) => ({ ...f, is_shared: false }));

      // Fetch Shared Files
      let sharedFiles: any[] = [];
      try {
        const resShared = await axios.get('https://authprivacychain-v2.onrender.com/shared-with-me', { 
          headers: { 'x-user-identity': myUsername } 
        });
        sharedFiles = resShared.data.map((f: any) => ({ ...f, is_shared: true }));
      } catch (e) {
        console.warn("Shared files route not reachable.");
      }

      setFiles([...myFiles, ...sharedFiles]);
    } catch (err) { 
      console.error("Vault offline or session expired"); 
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Select file first.");
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    const token = localStorage.getItem('apc_token');
    try {
      await axios.post('https://authprivacychain-v2.onrender.com/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data', 
          'x-access-token': token 
        }
      });
      setSelectedFile(null);
      fetchFiles();
      alert("Upload successful. Ready for encryption.");
    } catch (err) { 
      alert("Upload failed. Check connection."); 
    } finally { 
      setIsProcessing(false); 
    }
  };

  const handleEncryptAll = async () => {
    const token = localStorage.getItem('apc_token');
    setIsProcessing(true);
    try {
      await axios.post(`https://authprivacychain-v2.onrender.com/encrypt-pending`, {}, { 
        headers: { 'x-access-token': token } 
      });
      alert("AES-256 Protocol Executed. Files Secured.");
      fetchFiles();
    } catch (err) { 
      alert("Encryption failed."); 
    } finally { 
      setIsProcessing(false); 
    }
  };

  // --- FIXED DECRYPT LOGIC ---
  const handleDecrypt = async (file: any) => {
    try {
      const res = await axios.get(`https://authprivacychain-v2.onrender.com/download/${file.id}`, {
        headers: { 'x-access-token': localStorage.getItem('apc_token') },
        responseType: 'blob' 
      });
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      // Fixed: used file.filename instead of name
      link.setAttribute('download', file.filename);
      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Decryption/Download failed. Check Authorization.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete file permanently?")) return;
    const token = localStorage.getItem('apc_token');
    try {
      await axios.delete(`https://authprivacychain-v2.onrender.com/delete-file/${id}`, { 
        headers: { 'x-access-token': token } 
      });
      fetchFiles();
    } catch (err) { 
      alert("Delete failed."); 
    }
  };

  if (activeTab === 'Permission Manager') {
    return <PermissionManager />;
  }

  if (activeTab !== 'Encrypted File Vault') {
    return <div className="placeholder">SYSTEM_READY</div>;
  }

  return (
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
          <span style={{textAlign: 'right'}}>COMMANDS</span>
        </div>
        
        <div className="v-table-body">
          {files.map((file) => (
            <div key={file.id} className="v-table-row">
              <div className="v-col-id" style={{color: '#2563eb', fontWeight: 'bold', fontFamily: 'monospace'}}>
                #{file.id.toString().substring(0, 4)}
              </div>
              
              <div className="v-col-name">
                📄 {file.filename}
                {file.is_shared && <span style={{color: '#3b82f6', fontSize: '9px', marginLeft: '10px', fontWeight: 'bold'}}>[SHARED]</span>}
              </div>
              <div className={`v-col-status ${file.is_encrypted ? 'active' : ''}`}>
                {file.is_encrypted ? "AES_256_SECURED" : "RAW_UNSECURED"}
              </div>
              <div className="v-col-cmds">
                {/* FIXED: Passing the entire file object to match function signature */}
                <button onClick={() => handleDecrypt(file)} className="v-btn dec">DECRYPT</button>
                {!file.is_shared && (
                  <button onClick={() => handleDelete(file.id)} className="v-btn del">DEL</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .vault-enlarged-root { width: 100%; height: 100%; display: flex; flex-direction: column; padding: 0; }
        .vault-header-control { display: flex; gap: 15px; margin-bottom: 20px; background: rgba(255,255,255,0.02); padding: 20px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); }
        .v-picker-long { flex: 1; background: #000; border: 1px solid #222; padding: 15px; border-radius: 12px; color: #666; font-family: monospace; font-size: 11px; cursor: pointer; overflow: hidden; }
        .btn-group { display: flex; gap: 10px; }
        .v-upload-btn { background: #fff; color: #000; padding: 0 25px; border-radius: 12px; font-weight: 900; font-size: 10px; cursor: pointer; border: none; }
        .v-encrypt-btn { background: #2563eb; color: #fff; padding: 0 25px; border-radius: 12px; font-weight: 900; font-size: 11px; cursor: pointer; border: none; }
        .vault-table-container { flex: 1; display: flex; flex-direction: column; background: rgba(10, 10, 10, 0.4); border-radius: 20px; border: 1px solid rgba(255,255,255,0.03); overflow: hidden; }
        .v-table-head { display: grid; grid-template-columns: 80px 2fr 1fr 180px; padding: 15px 25px; font-size: 9px; color: #2563eb; font-weight: 900; letter-spacing: 2px; border-bottom: 1px solid #111; }
        .v-table-body { flex: 1; overflow-y: auto; padding: 10px; }
        .v-table-row { display: grid; grid-template-columns: 80px 2fr 1fr 180px; align-items: center; padding: 18px 20px; background: rgba(255,255,255,0.01); border: 1px solid #0a0a0a; margin-bottom: 8px; border-radius: 15px; }
        .v-col-name { color: #fff; font-size: 13px; font-family: monospace; }
        .v-col-status { font-size: 10px; font-weight: 800; color: #333; }
        .v-col-status.active { color: #10b981; }
        .v-col-cmds { display: flex; gap: 8px; justify-content: flex-end; }
        .v-btn { background: #000; border: 1px solid #222; color: #fff; padding: 7px 12px; border-radius: 8px; font-size: 10px; cursor: pointer; }
        .v-btn.dec { border-color: #10b981; color: #10b981; }
        .v-btn.del:hover { color: #ef4444; border-color: #ef4444; }
        .placeholder { height: 100%; display: flex; align-items: center; justify-content: center; color: #222; font-weight: 900; }
      `}</style>
    </div>
  );
};

export default UserDashboard;