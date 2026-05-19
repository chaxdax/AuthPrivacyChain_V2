import subprocess
import time
import sys
import os

def run_backend():
    print("🚀 Starting Backend (Flask)...")
    backend_dir = os.path.join(os.getcwd(), "backend")
    venv_python = os.path.join(backend_dir, "venv", "bin", "python3")
    python_cmd = venv_python if os.path.exists(venv_python) else "python3"
    
    return subprocess.Popen([python_cmd, "app.py"], cwd=backend_dir)

def run_frontend():
    print("🌐 Starting Frontend (Vite)...")
    return subprocess.Popen(["npm", "run", "dev"], cwd=os.getcwd())

if __name__ == "__main__":
    try:
        backend_proc = run_backend()
        time.sleep(2) # Give backend a moment to start
        frontend_proc = run_frontend()
        
        print("\n✅ System is running!")
        print("Backend: http://127.0.0.1:5000")
        print("Frontend: Check the Vite output above for the local URL (usually http://localhost:5173)")
        print("\nPress Ctrl+C to stop both services.\n")
        
        while True:
            time.sleep(1)
            if backend_proc.poll() is not None:
                print("❌ Backend stopped unexpectedly.")
                break
            if frontend_proc.poll() is not None:
                print("❌ Frontend stopped unexpectedly.")
                break
                
    except KeyboardInterrupt:
        print("\n🛑 Stopping system...")
    finally:
        if 'backend_proc' in locals():
            backend_proc.terminate()
        if 'frontend_proc' in locals():
            frontend_proc.terminate()
        print("👋 Goodbye!")
