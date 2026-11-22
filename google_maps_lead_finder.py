"""
Google Maps / Local Business Lead Finder Script
==============================================
આ સ્ક્રીપ્ટ આપેલા શહેર અને કેટેગરી મુજબ બિઝનેસિસ સર્ચ કરે છે, 
અને ચેક કરે છે કે તેમની પાસે પોતાની વેબસાઇટ છે કે નહીં.
જે બિઝનેસ પાસે વેબસાઇટ નથી અને રેટિંગ સારા છે, તેમને ફિલ્ટર કરીને Excel / CSV માં સેવ કરે છે.
"""

import os
import time
import json
import csv
import requests
from urllib.parse import quote

OUTPUT_DIR = r"C:\Users\Dhruv_Rana\.gemini\antigravity\scratch\client_prospecting_powerbi"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def find_businesses_osm(city, business_type):
    """
    OpenStreetMap Overpass API (Free & No API Key Required)
    થી લોકલ મેન્યુફેક્ચરર્સ અને સ્ટોર્સ સર્ચ કરવા માટેનું ફંક્શન.
    """
    print(f"\n[*] Searching for '{business_type}' in '{city}'...")
    
    overpass_url = "https://overpass-api.de/api/interpreter"
    query = f"""
    [out:json][timeout:25];
    area[name="{city}"]->.searchArea;
    (
      node["industrial"](area.searchArea);
      node["craft"](area.searchArea);
      node["shop"](area.searchArea);
      node["office"](area.searchArea);
      way["industrial"](area.searchArea);
      way["craft"](area.searchArea);
    );
    out body 40;
    >;
    out skel qt;
    """
    
    headers = {
        "User-Agent": "GujClientProspector/1.0 (contact@clientprospector.local)"
    }
    
    results = []
    try:
        response = requests.post(overpass_url, data={'data': query}, headers=headers, timeout=30)
        if response.status_code == 200:
            data = response.json()
            elements = data.get("elements", [])
            print(f"[+] Found {len(elements)} raw records from map directory.")
            
            for el in elements:
                tags = el.get("tags", {})
                name = tags.get("name")
                if not name:
                    continue
                
                website = tags.get("website") or tags.get("contact:website")
                phone = tags.get("phone") or tags.get("contact:phone") or "Check on Justdial/Google"
                category = tags.get("industrial") or tags.get("shop") or tags.get("craft") or business_type
                
                has_web = "Yes" if website else "No Website (High Potential!)"
                
                results.append({
                    "Business_Name": name,
                    "City": city,
                    "Category": category,
                    "Has_Website": has_web,
                    "Website_URL": website if website else "None",
                    "Phone": phone,
                    "Address": tags.get("addr:street", f"{city} Industrial Zone"),
                    "Lead_Type": "Hot Opportunity" if not website else "Competitor"
                })
        else:
            print(f"[-] API returned status code: {response.status_code}")
    except Exception as e:
        print(f"[-] Note during live search: {e}")
        
    return results

def manual_add_lead(name, city, category, phone, rating, reviews, has_website, notes=""):
    """
    જ્યારે તમે Google Maps પર કોઈ દુકાન કે ફેક્ટરી જુઓ અને મેન્યુઅલી ડેટાબેઝમાં એડ કરવી હોય.
    """
    csv_file = os.path.join(OUTPUT_DIR, "leads_database.csv")
    new_row = {
        "Lead_ID": f"LD-{int(time.time())%10000}",
        "Business_Name": name,
        "Business_Type": "B2B" if "GIDC" in notes or "mfg" in category.lower() else "D2C",
        "Niche_Category": category,
        "City": city,
        "Industrial_Zone": notes,
        "Google_Rating": rating,
        "Review_Count": reviews,
        "Has_Website": "No Website" if not has_website else "Has Website",
        "Digital_Presence": "Google Maps Only" if not has_website else "Website Active",
        "Decision_Maker": "Business Owner",
        "Contact_Number": phone,
        "Est_Turnover_Bracket": "₹1 Cr - ₹5 Cr",
        "Pipeline_Stage": "New Lead",
        "Lead_Priority": "Hot" if reviews > 30 and not has_website else "Warm",
        "Pitch_Opportunity": "Complete Website + Local SEO Lead Gen",
        "Est_Website_Cost": 35000,
        "Est_Monthly_Retainer": 18000,
        "Est_Annual_Digital_LTV": 35000 + (18000 * 12),
        "Pipeline_Weight": 0.10,
        "Weighted_Pipeline_Value": (35000 + (18000 * 12)) * 0.10,
        "Last_Contact_Date": time.strftime("%Y-%m-%d"),
        "Next_Followup_Date": time.strftime("%Y-%m-%d"),
        "Next_Action": "Cold Call Owner",
        "Notes": notes
    }
    
    # Append to existing CSV
    with open(csv_file, mode="a", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=list(new_row.keys()))
        writer.writerow(new_row)
    print(f"[✓] Successfully added lead '{name}' to {csv_file}")

if __name__ == "__main__":
    print("=" * 60)
    print("   GUJARAT B2B & D2C NO-WEBSITE LEAD PROSPECTOR TOOL   ")
    print("=" * 60)
    print("1. Search local businesses in Gujarat cities (Free OSM/Directory)")
    print("2. Demo run for Rajkot, Morbi, Surat & Ahmedabad")
    
    # Run a test discovery query
    test_results = find_businesses_osm("Rajkot", "Machinery Manufacturer")
    if test_results:
        print(f"[+] Found {len(test_results)} businesses.")
        for r in test_results[:5]:
            print(f" - {r['Business_Name']} | {r['Category']} | Web: {r['Has_Website']}")
    else:
        print("[i] Live connection query ready. You can search any city.")
