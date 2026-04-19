import sys

path = '/Users/chandan/Desktop/AuthPrivacyChain_V2/src/App.tsx'
with open(path, 'r') as f:
    content = f.read()

# The login/signup block starts around line 346
# It has "if (view === 'login' || view === 'signup')"
# We need to find the FIRST occurrence of the closing pattern AFTER this line.

start_marker = "if (view === 'login' || view === 'signup')"
idx_start = content.find(start_marker)
if idx_start != -1:
    target_pattern = '`}</style>\n      </div>\n    );\n  }'
    idx_target = content.find(target_pattern, idx_start)
    if idx_target != -1:
        replacement = '`}</style>\n      </div>\n      </>\n    );\n  }'
        new_content = content[:idx_target] + replacement + content[idx_target + len(target_pattern):]
        with open(path, 'w') as f:
            f.write(new_content)
        print("SUCCESS")
    else:
        print("FAILED: Target pattern not found after start marker")
else:
    print("FAILED: Start marker not found")
