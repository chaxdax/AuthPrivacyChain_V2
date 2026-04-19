import os
import re

HELPER = """
const formatDelhiTime = (utcDateStr: string | undefined | null) => {
  if (!utcDateStr) return '';
  return new Date(utcDateStr).toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata', 
    day: '2-digit', month: '2-digit', year: 'numeric', 
    hour: 'numeric', minute: '2-digit', hour12: true 
  }).toUpperCase();
};
"""

files_to_fix = [
    'src/admin/MasterForensicDashboard.tsx',
    'src/alert.tsx',
    'src/SecurityActivityFeed.tsx'
]

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r') as f:
        content = f.read()

    # Add helper function if not exists
    if 'formatDelhiTime' not in content and filepath != 'src/admin/ClickStreamTracker.tsx':
        # insert right after imports
        content = re.sub(r'(import .*;\n)+', lambda m: m.group(0) + HELPER, content, count=1)

    # Fix the sed mistake in MasterForensicDashboard
    content = content.replace('formatDelhiTime(new Date(log.timestamp).toLocaleString())', 'formatDelhiTime(log.timestamp)')
    content = content.replace('formatDelhiTime(new Date(t.timestamp).toLocaleString())', 'formatDelhiTime(t.timestamp)')
    content = content.replace('formatDelhiTime(new Date(t.last_seen).toLocaleString())', 'formatDelhiTime(t.last_seen)')
    content = content.replace('formatDelhiTime(new Date(a.timestamp).toLocaleString())', 'formatDelhiTime(a.timestamp)')
    content = content.replace('formatDelhiTime(new Date(r.timestamp).toLocaleString())', 'formatDelhiTime(r.timestamp)')

    # For untouched ones if any
    content = re.sub(r'new Date\((.*?)\)\.toLocaleString\(\)', r'formatDelhiTime(\1)', content)

    # For raw timestamps like {alert.timestamp} -> {formatDelhiTime(alert.timestamp)}
    if filepath == 'src/alert.tsx':
        content = content.replace('{alert.timestamp}', '{formatDelhiTime(alert.timestamp)}')
    elif filepath == 'src/SecurityActivityFeed.tsx':
        content = content.replace('{log.timestamp}', '{formatDelhiTime(log.timestamp)}')

    with open(filepath, 'w') as f:
        f.write(content)

print("Date format replaced.")
