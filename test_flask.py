import requests

try:
    resp = requests.post("http://127.0.0.1:5000/register", json={"phoneNumber": "7619519132", "password": "123"})
    print(resp.status_code, resp.text)
except Exception as e:
    print(e)
