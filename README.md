# AuthPrivacyChain V2 🛡️🔗

AuthPrivacyChain V2 is a secure, decentralized file vault and access control system. It integrates client-side cryptography, a simulated immutable blockchain ledger, real-time geofencing, and forensic audit logging to provide enterprise-grade protection for sensitive files.

---

## 🚀 Key Features

*   **🔐 Encrypted File Vault**: End-to-end file security. Files are encrypted using AES-256 locally on the user's side before being processed by the server, ensuring privacy at rest.
*   **⛓️ Blockchain Activity Ledger**: A simulated cryptographic blockchain that records all permission grants, access revocations, and decryption requests to ensure audit logs are tamper-proof.
*   **🌍 IP-Geofencing & Firewall**: Multi-tier geofencing APIs check user IPs in real-time. Unauthorized attempts from outside designated regions (e.g., outside India) or anonymous VPNs are immediately intercepted and blocked.
*   **🚨 Live Threat & Alert Monitor**: Triggers critical alerts for geofence breaches or unauthorized decryption attempts. Dispatches real-time security events to user and admin dashboards.
*   **🖱️ Clickstream Forensics**: Tracks user interaction footprints (clicks, page transitions, and API requests) in real-time to monitor behavior and detect bot anomalies.
*   **🛠️ Emergency Recovery**: Allows users to recover their secure profiles using a pre-generated Master Key, which requires administrator confirmation in the recovery queue.

---

## 🛠️ Technology Stack

*   **Frontend**: React, TypeScript, Vite, Vanilla CSS
*   **Backend**: Python, Flask, SQLite3, PyJWT
*   **Cryptography**: Cryptography (Fernet / AES-256)
*   **Styling**: Premium cyber-grid design, custom micro-animations, glassmorphism UI, and dark mode interface.

---

## 📁 Project Structure

```text
├── backend/
│   ├── app.py                  # Core Flask backend server
│   ├── admin_routes.py         # Routes for Forensic & Lockdown control
│   ├── clickstream_tracker.py  # User click & activity trackers
│   ├── ip_geofencing.py        # IP-geofencing and fallback GeoIP rules
│   ├── permission_logic.py     # File sharing permissions and peer decryption
│   ├── reset_db.py             # Script to wipe database and start clean
│   └── requirements.txt        # Backend dependencies
├── src/
│   ├── App.tsx                 # Main React portal gateway & dashboard router
│   ├── UserDashboard.tsx       # User vault UI and file tables
│   ├── Emergency.tsx           # Password recovery and master-key validation
│   ├── PermissionManager.tsx   # Grant/revoke permissions
│   ├── alert.tsx               # Threat alerts center
│   ├── config.ts               # Dynamic API endpoint router
│   └── admin/                  # Admin forensics sub-modules
│       ├── MasterForensicDashboard.tsx
│       ├── BlockchainLedger.tsx
│       ├── ClickStreamTracker.tsx
│       ├── IPGeofencingMonitor.tsx
│       └── UserManagement.tsx
└── run_system.py               # Combined startup script for frontend & backend
```

---

## ⚙️ Setup and Installation

### Prerequisites
- Node.js (v18+)
- Python 3.8+

### 1. Backend Setup
Navigate to the `backend` folder, create a virtual environment, and install dependencies:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Frontend Setup
Navigate to the root directory and install node modules:
```bash
npm install
```

### 3. Run the Application
You can run both the Flask backend and Vite dev server simultaneously using the root startup script:
```bash
python3 run_system.py
```
-   **Frontend**: `http://localhost:5173`
-   **Backend**: `http://127.0.0.1:5000`

---

## ⚖️ License

This project is licensed under the **GNU General Public License v3 (GPLv3)**. See the [LICENSE](LICENSE) file for details.
