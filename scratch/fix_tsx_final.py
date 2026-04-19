import sys

path = '/Users/chandan/Desktop/AuthPrivacyChain_V2/src/App.tsx'
with open(path, 'r') as f:
    content = f.read()

# Reconstruct the login/signup block perfectly
start_marker = "if (view === 'login' || view === 'signup') {"
idx_start = content.find(start_marker)

if idx_start != -1:
    # Find the end of this block (the next if or the return null)
    end_marker = "if (view === 'home')"
    idx_end = content.find(end_marker, idx_start)
    
    if idx_end != -1:
        new_block = """if (view === 'login' || view === 'signup') {
    return (
      <>
        {fullScreenAlert && (
          <div className=\"geofence-shield-overlay\">
            <div className=\"cyber-grid-red\"></div>
            <div className=\"cyber-grid-blue\"></div>
            <div className=\"laser-scanner-red\"></div>
            <div className=\"laser-scanner-blue\"></div>
            <div className=\"shield-container\">
              <div className=\"shield-glow-ring\"></div>
              <div className=\"shield-icon-wrap\">
                <span className=\"shield-main-icon\">🛡️</span>
                <div className=\"shield-scanner-line\"></div>
              </div>
              <div className=\"shield-content\">
                <h1 className=\"shield-title\">PERIMETER BREACH</h1>
                <div className=\"shield-separator\">
                  <div className=\"sep-red\"></div>
                  <div className=\"sep-blue\"></div>
                </div>
                <p className=\"shield-msg\">
                  <span className=\"glitch-text\" data-text=\"ACCESS DENIED\">ACCESS DENIED</span>
                  <br />
                  NODE LOCATION: <span style={{color: '#ef4444'}}>FOREIGN_ZONE</span>
                  <br />
                  Your connection was intercepted by the Indian Geographic Firewall.
                </p>
                <div className=\"forensic-meta\">
                  <div className=\"meta-item\"><span className=\"m-label\">PROTOCOL</span><span className=\"m-val\">GEO-BLOCK</span></div>
                  <div className=\"meta-item\"><span className=\"m-label\">ORIGIN</span><span className=\"m-val red\">BLOCKED</span></div>
                </div>
                <button className=\"shield-dismiss-btn\" onClick={() => setFullScreenAlert(false)}>
                  ACKNOWLEDGE SECURITY PROTOCOL
                </button>
              </div>
            </div>
          </div>
        )}

        <div className=\"main-portal\">
          <div className=\"cyber-grid-bg\"></div>
          <button type=\"button\" className=\"top-right-ledger-btn\" onClick={() => setShowLedger(true)}>
            <span className=\"pulse-dot\"></span> LIVE NETWORK LEDGER
          </button>
          <div className=\"cloud-container\">
            <div className=\"asset-cloud c1\">☁️</div>
            <div className=\"asset-cloud c2\">☁️</div>
            <div className=\"asset-cloud c3\">☁️</div>
          </div>

          <div className=\"auth-card\">
            <div className=\"logo-center-box\"><img src={LOGO_PATH} alt=\"Brand Logo\" className=\"brand-logo-main\" /></div>
            <h1>AuthPrivacyChain <span>V2</span></h1>
            <p className=\"status-label\">QUANTUM GATEWAY ACTIVE</p>

            <div className=\"toggle-switcher\">
              <div className={`switch-pill ${role === 'admin' ? 'pos-admin' : 'pos-user'}`}></div>
              <button type=\"button\" className={role === 'user' ? 'active' : ''} onClick={() => { setRole('user'); setIdentity(''); setPassword(''); }}>USER GATEWAY</button>
              <button type=\"button\" className={role === 'admin' ? 'active' : ''} onClick={() => { setRole('admin'); setIdentity(''); setPassword(''); }}>ADMIN MODE</button>
            </div>

            <form onSubmit={handleAction}>
              {view === 'signup' && (
                <div className=\"cyber-field\">
                  <label>FULL LEGAL IDENTITY</label>
                  <input type=\"text\" placeholder=\"Enter Name...\" required value={legalName} onChange={(e) => setLegalName(e.target.value)} autoComplete=\"off\" />
                </div>
              )}
              <div className=\"cyber-field\">
                <label>{role === 'admin' ? 'ADMINISTRATOR TOKEN' : (view === 'signup' ? 'PHONE NUMBER' : 'UNIQUE ID')}</label>
                <input type=\"text\" placeholder={role === 'admin' ? \"ADM-777\" : \"Enter ID...\"} required value={identity} onChange={(e) => setIdentity(e.target.value)} autoComplete=\"off\" />
              </div>
              <div className=\"cyber-field\">
                <label>ENCRYPTION PASSPHRASE</label>
                <input type=\"password\" placeholder=\"••••••••\" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete=\"off\" />
              </div>
              <button type=\"submit\" className=\"cyber-btn\">{view === 'login' ? 'ESTABLISH LINK' : 'CREATE ACCOUNT'}</button>
              <div className=\"auth-footer-links\">
                <button type=\"button\" className=\"signup-link\" onClick={() => { setView(view === 'login' ? 'signup' : 'login'); setIdentity(''); setPassword(''); }}>
                  {view === 'login' ? '// New here? Join the family.' : '// Back to Login'}
                </button>
                <button type=\"button\" className=\"v1-shortcut\" onClick={() => setShowRecoveryModal(true)}>[ MASTER KEY ] QUICK ACCESS</button>
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
          `}</style>
        </div>
      </>
    );
  }\n\n  """
        new_content = content[:idx_start] + new_block + content[idx_end:]
        with open(path, 'w') as f:
            f.write(new_content)
        print("SUCCESS")
    else:
        print("FAILED: End marker not found")
else:
    print("FAILED: Start marker not found")
"
