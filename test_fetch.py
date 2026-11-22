import requests
import json

overpass_url = "https://overpass-api.de/api/interpreter"
query = """
[out:json][timeout:30];
area["name"="Surat"]->.searchArea;
(
  node["shop"](area.searchArea);
  node["industrial"](area.searchArea);
  node["craft"](area.searchArea);
);
out 15;
"""
headers = {"User-Agent": "LeadProspectorBot/1.0 (Windows NT 10.0; Win64; x64)"}

try:
    r = requests.post(overpass_url, data={"data": query}, headers=headers, timeout=25)
    print("Status:", r.status_code)
    if r.status_code == 200:
        data = r.json()
        elements = data.get("elements", [])
        print(f"Total elements retrieved: {len(elements)}")
        for el in elements[:8]:
            tags = el.get("tags", {})
            name = tags.get("name")
            if name:
                web = tags.get("website", "NO WEBSITE")
                shop = tags.get("shop") or tags.get("industrial") or tags.get("craft")
                print(f"- {name} | Type: {shop} | Website: {web}")
except Exception as e:
    print("Error:", e)
