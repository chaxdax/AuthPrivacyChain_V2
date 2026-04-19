import sys

path = '/Users/chandan/Desktop/AuthPrivacyChain_V2/src/App.tsx'
with open(path, 'r') as f:
    content = f.read()

# Look for the stray </> at line 343
target_pattern = '`}</style>\n      </div>\n      </>\n    );\n  }'
replacement = '`}</style>\n      </div>\n    );\n  }'

if target_pattern in content:
    new_content = content.replace(target_pattern, replacement, 1) # Only replace the first occurrence (at line 343)
    with open(path, 'w') as f:
        f.write(new_content)
    print("SUCCESS")
else:
    print("FAILED: Pattern not found")
