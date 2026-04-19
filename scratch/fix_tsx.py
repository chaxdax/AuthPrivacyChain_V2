import sys

path = '/Users/chandan/Desktop/AuthPrivacyChain_V2/src/App.tsx'
with open(path, 'r') as f:
    content = f.read()

# Look for the return block for login/signup
# It starts with if (view === 'login' || view === 'signup') { return ( <>
# We need to find where it should end.
# It ends with </div> followed by ); and }

# Let's find the closing style tag and then the div
target_pattern = '`}</style>\n      </div>\n    );\n  }'
replacement = '`}</style>\n      </div>\n      </>\n    );\n  }'

if target_pattern in content:
    new_content = content.replace(target_pattern, replacement)
    with open(path, 'w') as f:
        f.write(new_content)
    print("SUCCESS")
else:
    # Try with different line endings or spaces
    print("FAILED: Pattern not found")
    # Output a snippet to debug
    idx = content.find('`}</style>')
    if idx != -1:
        print(f"DEBUG: Found style tag at {idx}. Snippet: {repr(content[idx:idx+100])}")
