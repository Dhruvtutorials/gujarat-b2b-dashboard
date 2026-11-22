import os

BASE_DIR = r"C:\Users\Dhruv_Rana\.gemini\antigravity\scratch\client_prospecting_powerbi"
INDEX_FILE = os.path.join(BASE_DIR, "index.html")
DASHBOARD_FILE = os.path.join(BASE_DIR, "dashboard.html")
ARTIFACT_FILE = r"C:\Users\Dhruv_Rana\.gemini\antigravity\brain\012456e5-38a8-4b44-819d-04b9eb1e74f8\powerbi_dashboard.html"

files = [INDEX_FILE, DASHBOARD_FILE, ARTIFACT_FILE]

for fp in files:
    if not os.path.exists(fp):
        print(f"Skipping missing file: {fp}")
        continue
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()

    updated = content.replace('SECRET_PIN = "1935"', 'SECRET_PIN = "2002"')
    updated = updated.replace('"verified_1935"', '"verified_2002"')
    updated = updated.replace("(PIN: 1935)", "(PIN: 2002)")

    with open(fp, "w", encoding="utf-8") as f:
        f.write(updated)

    print(f"[OK] Successfully changed password to 2002 in {os.path.basename(fp)}")

print("Password change completed!")
