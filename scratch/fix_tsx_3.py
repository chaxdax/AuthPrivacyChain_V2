import sys

path = '/Users/chandan/Desktop/AuthPrivacyChain_V2/src/App.tsx'
with open(path, 'r') as f:
    content = f.read()

# Remove the stray </> from the home block (around line 582)
target_pattern = '`}</style>\n      </div>\n      </>\n    );'
replacement = '`}</style>\n      </div>\n    );'

if target_pattern in content:
    new_content = content.replace(target_pattern, replacement)
    with open(path, 'w') as f:
        f.write(new_content)
    print("SUCCESS")
else:
    print("FAILED: Pattern not found")
