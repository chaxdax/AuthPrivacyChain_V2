import subprocess

phone_number = "+916363354081"
message = "Testing SMS popup override"

apple_script = f'''
tell application "Messages"
    activate
    delay 1
    send "{message}" to buddy "{phone_number}"
end tell
'''

try:
    result = subprocess.run(['osascript', '-e', apple_script], capture_output=True, text=True, check=True)
    print("SUCCESS!")
except Exception as e:
    print("FAILED:", e)
