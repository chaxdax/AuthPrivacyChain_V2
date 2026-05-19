import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { API_BASE } from '../config';

const ADMIN_TOKEN = 'admin-bypass';
const API = API_BASE;
const headers = { 'x-admin-token': ADMIN_TOKEN };

interface Block {
  block_hash: string;
  record_type: string;
  owner_numeric_id: string;
  target_user_id: string;
  file_id: string;
  filename: string;
  encrypted: boolean;
  prev_hash: string;
}

interface BlockchainData {
  integrity: string;
  blocks: Block[];
}

export default function BlockchainLedger() {
  const [data, setData] = useState<BlockchainData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [simulatedBreach, setSimulatedBreach] = useState(false);

  const fetchLedger = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin/blockchain-ledger`, { headers });
      setData(res.data);
    } catch (e) {
      console.error('Failed to fetch blockchain ledger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLedger();
    const interval = setInterval(fetchLedger, 5000); // High-frequency forensic sync
    return () => clearInterval(interval);
  }, []);

  const filteredBlocks = data?.blocks.filter(b => 
    b.block_hash.toLowerCase().includes(search.toLowerCase()) || 
    b.owner_numeric_id.toLowerCase().includes(search.toLowerCase()) ||
    b.file_id.toLowerCase().includes(search.toLowerCase()) ||
    b.prev_hash.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const currentIntegrity = simulatedBreach ? 'CORRUPTED' : (data?.integrity || 'VERIFYING');
  const isIntact = currentIntegrity === 'INTACT' || currentIntegrity === 'VERIFIED';

  let displayBlocks = filteredBlocks;
  if (simulatedBreach && displayBlocks.length > 1) {
      displayBlocks = [...displayBlocks];
      displayBlocks[1] = {
          ...displayBlocks[1],
          block_hash: 'c89a7f6e5d4b3a2109f8e7d6c5b4a392...' // Fake corrupted hash
      };
  }

  return (
    <div className={`bl-container ${!isIntact ? 'alarm-mode' : ''}`}>
      <div className="bl-header">
        <div className="bl-header-left">
           <h2 className="bl-title">Blockchain Ledger Viewer</h2>
           <p className="bl-subtitle">Verify the immutable records of all file shares and access rights stored on the chain</p>
        </div>
        <div className="bl-header-right">
           <div className="bl-search-box">
             <span className="search-icon">🔍</span>
             <input 
               type="text" 
               placeholder="Search Hash, User ID, File ID..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
           <button 
             onClick={() => setSimulatedBreach(!simulatedBreach)} 
             className="bl-hack-btn"
           >
             {simulatedBreach ? 'RESTORE CHAIN' : 'SIMULATE BREACH'}
           </button>
           <button onClick={fetchLedger} className="bl-refresh-btn">
             <span className={`refresh-icon ${loading ? 'spinning' : ''}`}>↻</span> REFRESH
           </button>
        </div>
      </div>

      {!isIntact && (
        <div className="bl-alarm-banner">
          <span className="alarm-icon">🚨</span>
          <div className="alarm-text">
            <strong>CRITICAL ALARM: BLOCKCHAIN INTEGRITY COMPROMISED</strong>
            <span>Cryptographic hash mismatch detected! A record has been secretly tampered with!</span>
          </div>
        </div>
      )}

      <div className="bl-stats-row">
        <div className="bl-stat-box" style={{ borderColor: isIntact ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)' }}>
          <div className="bl-stat-val" style={{ color: isIntact ? '#10b981' : '#ef4444' }}>
            {currentIntegrity}
          </div>
          <div className="bl-stat-label">Chain Integrity Status</div>
        </div>
        <div className="bl-stat-box">
          <div className="bl-stat-val" style={{color: '#6366f1'}}>{data?.blocks.length || 0}</div>
          <div className="bl-stat-label">Total Validated Blocks</div>
        </div>
        <div className="bl-stat-box">
          <div className="bl-stat-val" style={{color: '#8b5cf6'}}>{data?.blocks.filter(b => b.encrypted).length || 0}</div>
          <div className="bl-stat-label">AES-256 Encrypted Nodes</div>
        </div>
        <div className="bl-stat-box">
           <div className="bl-live-indicator">
              <span className="pulse-dot"></span> LIVE NETWORK SYNC
           </div>
        </div>
      </div>

      <div className="bl-table-container">
        <table className="bl-table">
          <thead>
            <tr>
              <th>Block #</th>
              <th>Event</th>
              <th>Granted By</th>
              <th>Granted To</th>
              <th>File Name</th>
              <th>Hash Verification</th>
            </tr>
          </thead>
          <tbody>
            {loading && !data ? (
              <tr><td colSpan={7} className="bl-empty">Synchronizing Ledger...</td></tr>
            ) : displayBlocks.length === 0 ? (
              <tr><td colSpan={7} className="bl-empty">No cryptographic blocks found.</td></tr>
            ) : (
              displayBlocks.map((block, index) => {
                const isGenesis = index === 0;
                const isCorruptedRow = simulatedBreach && index === 1;
                const isNextRow = simulatedBreach && index === 2;
                const actionColor = block.record_type === 'GRANT_ACCESS' ? '#10b981' : '#ef4444';
                const actionLabel = block.record_type === 'GRANT_ACCESS' ? '✅ GRANTED' : '🚫 REVOKED';
                const fileDisplay = block.filename || (block.file_id ? `#${block.file_id.substring(0, 8)}` : 'UNKNOWN');

                return (
                  <tr key={index} className={`bl-row ${isCorruptedRow ? 'corrupted-row' : ''}`}>
                    <td className="bl-index-cell">#{index.toString().padStart(4, '0')}</td>
                    <td className="bl-record-cell">
                      <span className="record-tag" style={{color: actionColor, borderColor: actionColor, background: `${actionColor}15`}}>
                        {isGenesis ? 'SYSTEM_INIT' : actionLabel}
                      </span>
                    </td>
                    <td className="bl-user-cell" style={{color: '#6366f1', fontWeight: 700}}>{block.owner_numeric_id || '—'}</td>
                    <td className="bl-target-user-cell" style={{color: '#3b82f6', fontWeight: 700}}>{block.target_user_id || '—'}</td>
                    <td className="bl-file-cell" style={{color: fileDisplay === '[DELETED]' ? '#ef444490' : '#aaa', fontStyle: fileDisplay === '[DELETED]' ? 'italic' : 'normal'}}>
                      {fileDisplay}
                    </td>
                    <td className="bl-hash-cell">
                      <div className="hash-line" style={{color: isCorruptedRow ? '#ef4444' : ''}}>
                        CUR: <span className={isCorruptedRow ? '' : 'hash-prefix'}>{(block.block_hash || '').substring(0, 16)}</span>
                        <span className={isCorruptedRow ? '' : 'hash-suffix'}>{(block.block_hash || '').substring(16, 24)}...</span>
                      </div>
                      <div className="hash-line" style={{color: isNextRow ? '#ef4444' : ''}}>
                        PRV: {isGenesis ? <span className="genesis-tag">0000000000000000...</span> : 
                        <><span className={isNextRow ? '' : 'hash-prefix prev'}>{(block.prev_hash || '').substring(0, 16)}</span>
                        <span className={isNextRow ? '' : 'hash-suffix'}>{(block.prev_hash || '').substring(16, 24)}...</span></>
                        }
                        {isNextRow && <span style={{marginLeft: '5px', fontSize:'12px'}}>⚠️ MISMATCH</span>}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .bl-container {
          background: #0d0d12;
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 20px;
          padding: 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: fadeIn 0.5s ease-out;
        }
        
        .bl-container.alarm-mode {
          border-color: #ef4444;
          box-shadow: 0 0 30px rgba(239,68,68,0.2);
        }
        
        .bl-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        
        .bl-title {
          color: #fff;
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 5px 0;
          letter-spacing: -0.5px;
        }
        
        .bl-subtitle {
          color: #10b981;
          font-size: 13px;
          margin: 0;
          font-weight: 600;
        }
        
        .bl-header-right {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        
        .bl-search-box {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          font-size: 14px;
          color: #6b7280;
        }
        
        .bl-search-box input {
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 10px 10px 10px 35px;
          color: #fff;
          font-size: 13px;
          width: 250px;
          outline: none;
          transition: 0.3s;
        }
        
        .bl-search-box input:focus {
          border-color: #10b981;
          box-shadow: 0 0 10px rgba(16,185,129,0.2);
        }
        
        .bl-refresh-btn {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #34d399;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: 0.2s;
        }
        
        .bl-refresh-btn:hover {
          background: rgba(16, 185, 129, 0.2);
          color: #fff;
        }
        
        .bl-hack-btn {
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #f59e0b;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: 0.2s;
        }
        
        .bl-hack-btn:hover {
          background: rgba(245, 158, 11, 0.2);
          color: #fff;
        }
        
        .bl-alarm-banner {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid #ef4444;
          border-radius: 12px;
          padding: 15px 20px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 15px;
          animation: flashBg 1s infinite alternate;
        }
        
        .alarm-icon {
          font-size: 30px;
          animation: pulseIcon 0.5s infinite alternate;
        }
        
        .alarm-text {
          display: flex;
          flex-direction: column;
        }
        
        .alarm-text strong {
          color: #ef4444;
          font-size: 16px;
          letter-spacing: 1px;
        }
        
        .alarm-text span {
          color: #fca5a5;
          font-size: 13px;
        }
        
        @keyframes flashBg {
          from { background: rgba(239, 68, 68, 0.1); box-shadow: 0 0 10px rgba(239,68,68,0); }
          to { background: rgba(239, 68, 68, 0.3); box-shadow: 0 0 20px rgba(239,68,68,0.5); }
        }
        
        @keyframes pulseIcon {
          from { transform: scale(1); }
          to { transform: scale(1.2); }
        }
        
        .spinning {
          display: inline-block;
          animation: spin 1s linear infinite;
        }
        
        .bl-stats-row {
          display: flex;
          gap: 15px;
          margin-bottom: 24px;
        }
        
        .bl-stat-box {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 15px 20px;
          border-radius: 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: 0.3s;
        }
        
        .bl-stat-val {
          font-size: 24px;
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
        }
        
        .bl-stat-label {
          font-size: 11px;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        
        .bl-live-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #10b981;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 1px;
          height: 100%;
        }
        
        .pulse-dot {
          width: 10px;
          height: 10px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
          animation: pulse 1.5s infinite;
        }
        
        .bl-table-container {
          flex: 1;
          overflow: auto;
          background: #0a0a0f;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.03);
        }
        
        .bl-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        
        .bl-table th {
          background: rgba(255,255,255,0.02);
          padding: 15px 20px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #10b981;
          font-weight: 800;
          position: sticky;
          top: 0;
          z-index: 10;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .bl-row {
          border-bottom: 1px dashed rgba(255,255,255,0.05);
          transition: 0.2s;
        }
        
        .corrupted-row {
          background: rgba(239, 68, 68, 0.1) !important;
          border: 1px solid #ef4444 !important;
        }
        
        .bl-row:hover {
          background: rgba(16, 185, 129, 0.05);
        }
        
        .bl-row td {
          padding: 15px 20px;
          font-size: 13px;
          color: #d1d5db;
        }
        
        .bl-index-cell {
          font-family: monospace;
          color: #6366f1 !important;
          font-weight: bold;
        }
        
        .bl-hash-cell {
          font-family: monospace;
          font-size: 10px !important;
          letter-spacing: 0.5px;
        }
        
        .hash-line {
          color: #6b7280;
          margin-bottom: 2px;
        }
        
        .hash-prefix {
          color: #10b981;
          font-weight: bold;
        }
        
        .hash-prefix.prev {
          color: #8b5cf6;
        }
        
        .hash-suffix {
          color: #4b5563;
        }
        
        .genesis-tag {
          color: #f59e0b;
          font-weight: bold;
        }
        
        .record-tag {
          font-size: 9px;
          font-weight: 900;
          padding: 4px 8px;
          border-radius: 4px;
          letter-spacing: 1px;
        }
        .rt-SYSTEM_INIT { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; border: 1px solid rgba(139, 92, 246, 0.3); }
        .rt-GRANT_ACCESS { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
        .rt-REVOKE_ACCESS { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
        
        .bl-user-cell {
          font-weight: 700;
          color: #fff !important;
        }
        
        .bl-target-user-cell {
          color: #3b82f6 !important;
          font-weight: 600;
        }
        
        .bl-file-cell {
          font-family: monospace;
          color: #a78bfa !important;
        }
        
        .bl-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }
        
        .bl-badge.success {
          border: 1px solid #10b981;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }
        
        .bl-badge.warning {
          border: 1px solid #f59e0b;
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.1);
        }
        
        .bl-empty {
          text-align: center;
          padding: 50px !important;
          color: #6b7280 !important;
          font-style: italic;
        }
        
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .bl-table-container::-webkit-scrollbar { width: 6px; }
        .bl-table-container::-webkit-scrollbar-track { background: transparent; }
        .bl-table-container::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.3); border-radius: 10px; }
      `}</style>
    </div>
  );
}
