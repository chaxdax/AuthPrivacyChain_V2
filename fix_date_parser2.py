import os
import re

files = [
    'src/admin/ClickStreamTracker.tsx',
    'src/admin/MasterForensicDashboard.tsx',
    'src/alert.tsx',
    'src/SecurityActivityFeed.tsx'
]

NEW_HELPER = """const formatDelhiTime = (utcDateStr: any) => {
  if (!utcDateStr) return '';
  let dateStr = String(utcDateStr);
  if (!dateStr.includes('T') && !dateStr.includes('Z')) {
    dateStr = dateStr.replace(' ', 'T') + 'Z';
  }
  return new Date(dateStr).toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata', 
    day: '2-digit', month: '2-digit', year: 'numeric', 
    hour: 'numeric', minute: '2-digit', hour12: true 
  }).toUpperCase();
};"""

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Replace existing formatDelhiTime function entirely
        # It matches from 'const formatDelhiTime' to the next '};'
        content = re.sub(r'const formatDelhiTime =.*?};\n', NEW_HELPER + '\n', content, flags=re.DOTALL)
        
        with open(filepath, 'w') as f:
            f.write(content)

print("Dates fully fixed")
