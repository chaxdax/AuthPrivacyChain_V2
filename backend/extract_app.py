import re
import os
import glob

brain_dir = "/Users/chandan/.gemini/antigravity/brain"
log_files = glob.glob(f"{brain_dir}/**/overview.txt", recursive=True)

for log_path in log_files:
    with open(log_path, 'r') as f:
        logs = f.read()
    
    occurrences = [m.start() for m in re.finditer(r"File Path: `file:///Users/chandan/Desktop/AuthPrivacyChain_V2/backend/app.py`", logs)]
    if occurrences:
        print(f"Found {len(occurrences)} occurrences in {log_path}")
        start_idx = occurrences[-1]
        content_start = logs.find("1: import", start_idx)
        content_end = logs.find("The above content shows the entire, complete file contents", content_start)
        
        if content_start != -1 and content_end != -1:
            content = logs[content_start:content_end]
            restored_lines = []
            for line in content.split('\n'):
                match = re.match(r'^(\d+):\s(.*)$', line)
                if match:
                    restored_lines.append(match.group(2))
                else:
                    if line.strip(): 
                        restored_lines.append(line)
            
            out_file = f'/Users/chandan/Desktop/AuthPrivacyChain_V2/backend/app_{os.path.basename(os.path.dirname(os.path.dirname(log_path)))}.py'
            with open(out_file, 'w') as f:
                f.write('\n'.join(restored_lines).strip() + '\n')
            print(f"RESTORED to {out_file}")
