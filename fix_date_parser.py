import os

OLD_HELPER = """const formatDelhiTime = (utcDateStr: string | undefined | null) => {
  if (!utcDateStr) return '';
  return new Date(utcDateStr).toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata', 
    day: '2-digit', month: '2-digit', year: 'numeric', 
    hour: 'numeric', minute: '2-digit', hour12: true 
  }).toUpperCase();
};"""

NEW_HELPER = """const formatDelhiTime = (utcDateStr: string | undefined | null) => {
  if (!utcDateStr) return '';
  let dateStr = utcDateStr;
  if (!dateStr.includes('T') && !dateStr.includes('Z')) {
    dateStr = dateStr.replace(' ', 'T') + 'Z';
  }
  return new Date(dateStr).toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata', 
    day: '2-digit', month: '2-digit', year: 'numeric', 
    hour: 'numeric', minute: '2-digit', hour12: true 
  }).toUpperCase();
};"""

files = [
    'src/admin/ClickStreamTracker.tsx',
    'src/admin/MasterForensicDashboard.tsx',
    'src/alert.tsx',
    'src/SecurityActivityFeed.tsx'
]

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        content = content.replace(OLD_HELPER, NEW_HELPER)
        with open(filepath, 'w') as f:
            f.write(content)

print("Time parser fixed.")
