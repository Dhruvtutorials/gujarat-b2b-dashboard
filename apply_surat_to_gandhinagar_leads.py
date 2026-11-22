import json
import re
import os
import pandas as pd
from test_leads_dataset import surat_to_gandhinagar_leads

BASE_DIR = r"C:\Users\Dhruv_Rana\.gemini\antigravity\scratch\client_prospecting_powerbi"
DASHBOARD_FILE = os.path.join(BASE_DIR, "dashboard.html")
INDEX_FILE = os.path.join(BASE_DIR, "index.html")
ARTIFACT_FILE = r"C:\Users\Dhruv_Rana\.gemini\antigravity\brain\012456e5-38a8-4b44-819d-04b9eb1e74f8\powerbi_dashboard.html"
CSV_FILE = os.path.join(BASE_DIR, "gandhinagar_to_valsad_corridor_leads.csv")
JSON_FILE = os.path.join(BASE_DIR, "live_leads_feed.json")

# New City Select HTML
new_city_options = """          <label class="block text-[11px] mb-1 font-medium" style="color: var(--text-dim);">Highway City (Surat ➔ Gandhinagar)</label>
          <select id="cityFilter" onchange="applyFilters()" class="filter-input w-full px-2.5 py-1.5 text-xs font-semibold">
            <option value="ALL">All 13 Corridor Cities</option>
            <option value="Surat">1. Surat (Textiles & Diamonds)</option>
            <option value="Kim & Kosamba">2. Kim & Kosamba (Sizing & Agro)</option>
            <option value="Ankleshwar">3. Ankleshwar (Dyes & Pharma)</option>
            <option value="Bharuch">4. Bharuch (Valves & Heavy Piping)</option>
            <option value="Dahej">5. Dahej (PCPIR SEZ & Boilers)</option>
            <option value="Karjan">6. Karjan (Cotton Ginning & Agro)</option>
            <option value="Vadodara">7. Vadodara (Electrical & Chemicals)</option>
            <option value="Anand">8. Anand (Dairy Equip & Food)</option>
            <option value="Nadiad">9. Nadiad (Agro Seeds & Teak)</option>
            <option value="Kheda & Bareja">10. Kheda & Bareja (Grain Machines)</option>
            <option value="Ahmedabad">11. Ahmedabad (Hydraulic Presses & Boxes)</option>
            <option value="Kalol & Chhatral">12. Kalol & Chhatral (Pumps & Moulds)</option>
            <option value="Gandhinagar">13. Gandhinagar (Electronics & Automation)</option>
          </select>"""

# New Scanner City Select HTML
new_scanner_options = """          <label class="block text-[#8B98BD] mb-1 font-semibold">Select Highway Zone</label>
          <select id="scanZone" class="filter-input w-full px-3 py-2 text-xs">
            <option value="ALL">Full Corridor (Surat all the way to Gandhinagar)</option>
            <option value="Surat">Surat (Sachin, Pandesara, Katargam)</option>
            <option value="Kim & Kosamba">Kim & Kosamba (GIDC Textile Clusters)</option>
            <option value="Ankleshwar">Ankleshwar (Chemical & API Mega GIDC)</option>
            <option value="Bharuch">Bharuch (Narmadanagar Engineering & Valves)</option>
            <option value="Dahej">Dahej (PCPIR Petrochemical SEZ)</option>
            <option value="Karjan">Karjan (Cotton Ginning & Agro Warehousing)</option>
            <option value="Vadodara">Vadodara (Makarpura, Nandesari, Savli)</option>
            <option value="Anand">Anand (Vitthal Udyognagar Dairy Machinery)</option>
            <option value="Nadiad">Nadiad (Kamla GIDC Agro Seeds & Teak)</option>
            <option value="Kheda & Bareja">Kheda & Bareja (Grain Milling Machinery)</option>
            <option value="Ahmedabad">Ahmedabad (Kathwada, Changodar, Vatva, Naroda)</option>
            <option value="Kalol & Chhatral">Kalol & Chhatral (Submersible Pumps & Moulds)</option>
            <option value="Gandhinagar">Gandhinagar (Sector 25 Electronic Estate)</option>
          </select>"""

# New Top Hubs Bar Chart HTML
new_top_hubs_html = """          <!-- Visual 4: Top Industrial Hubs / Cities (Surat to Gandhinagar) -->
          <div class="dashboard-card p-4 flex flex-col justify-between">
            <h3 class="text-xs font-bold mb-2" style="color: var(--text-bright);">Top Industrial Hubs (Surat ➔ Gandhinagar)</h3>
            <div class="space-y-2.5 py-1">
              <div>
                <div class="flex justify-between text-[11px] font-medium mb-1" style="color: var(--text-bright);">
                  <span>Surat (Textile & Diamond)</span>
                  <span class="text-sky-400 font-bold">4 Leads</span>
                </div>
                <div class="w-full rounded-full h-2" style="background-color: var(--chart-track);">
                  <div class="bg-[#00D5FF] h-2 rounded-full glow-cyan" style="width: 95%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] font-medium mb-1" style="color: var(--text-bright);">
                  <span>Ahmedabad (Kathwada & Naroda)</span>
                  <span class="text-sky-400 font-bold">4 Leads</span>
                </div>
                <div class="w-full rounded-full h-2" style="background-color: var(--chart-track);">
                  <div class="bg-[#00D5FF] h-2 rounded-full glow-cyan" style="width: 95%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] font-medium mb-1" style="color: var(--text-bright);">
                  <span>Vadodara (Makarpura & Savli)</span>
                  <span class="text-sky-400 font-bold">4 Leads</span>
                </div>
                <div class="w-full rounded-full h-2" style="background-color: var(--chart-track);">
                  <div class="bg-[#00D5FF] h-2 rounded-full glow-cyan" style="width: 95%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] font-medium mb-1" style="color: var(--text-bright);">
                  <span>Ankleshwar, Bharuch & Dahej</span>
                  <span class="text-sky-400 font-bold">7 Leads</span>
                </div>
                <div class="w-full rounded-full h-2" style="background-color: var(--chart-track);">
                  <div class="bg-[#00D5FF] h-2 rounded-full glow-cyan" style="width: 85%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] font-medium mb-1" style="color: var(--text-bright);">
                  <span>Anand, Nadiad, Kheda & Kalol</span>
                  <span class="text-sky-400 font-bold">10 Leads</span>
                </div>
                <div class="w-full rounded-full h-2" style="background-color: var(--chart-track);">
                  <div class="bg-[#00D5FF] h-2 rounded-full glow-cyan" style="width: 75%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-[11px] font-medium mb-1" style="color: var(--text-bright);">
                  <span>Gandhinagar (Electronics Estate)</span>
                  <span class="text-sky-400 font-bold">3 Leads</span>
                </div>
                <div class="w-full rounded-full h-2" style="background-color: var(--chart-track);">
                  <div class="bg-[#00D5FF] h-2 rounded-full glow-cyan" style="width: 60%"></div>
                </div>
              </div>
            </div>
          </div>"""

# Build JS array string
leads_js_str = "    const leadsMaster = [\n"
for l in surat_to_gandhinagar_leads:
    leads_js_str += f'      {{ id: "{l["id"]}", name: "{l["name"]}", type: "{l["type"]}", category: "{l["category"]}", city: "{l["city"]}", zone: "{l["zone"]}", rating: {l["rating"]}, reviews: {l["reviews"]}, website: "{l["website"]}", dm: "{l["dm"]}", phone: "{l["phone"]}", stage: "{l["stage"]}", priority: "{l["priority"]}", webCost: {l["webCost"]}, mrr: {l["mrr"]} }},\n'
leads_js_str += "    ];"

def update_html_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update City Filter dropdown
    city_filter_pattern = r'<label class="block text-\[11px\] mb-1 font-medium" style="color: var\(--text-dim\);">Highway City[^<]*<\/label>\s*<select id="cityFilter"[^>]*>[\s\S]*?<\/select>'
    content = re.sub(city_filter_pattern, new_city_options, content)

    # 2. Update Scanner Zone dropdown
    scan_zone_pattern = r'<label class="block text-\[#8B98BD\] mb-1 font-semibold">Select Highway Zone<\/label>\s*<select id="scanZone"[^>]*>[\s\S]*?<\/select>'
    content = re.sub(scan_zone_pattern, new_scanner_options, content)

    # 3. Update Top Hubs bar chart
    top_hubs_pattern = r'<!-- Visual 4: Top Industrial Hubs \/ Agents[\s\S]*?<\/div>\s*<\/div>'
    content = re.sub(top_hubs_pattern, new_top_hubs_html, content)

    # 4. Update leadsMaster array
    leads_master_pattern = r'const leadsMaster = \[\s*[\s\S]*?\];'
    content = re.sub(leads_master_pattern, leads_js_str.strip(), content)

    # 5. Update header subtitle
    content = content.replace("Gandhinagar ➔ Valsad (NH-48)", "Surat ➔ Gandhinagar (NH-48)")
    content = content.replace("Gandhinagar ➔ Valsad", "Surat ➔ Gandhinagar")
    content = content.replace("Gandhinagar-Valsad", "Surat-Gandhinagar")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"[OK] Updated {os.path.basename(file_path)}")

# Update files
update_html_file(DASHBOARD_FILE)
update_html_file(INDEX_FILE)
update_html_file(ARTIFACT_FILE)

# Update CSV & JSON
df = pd.DataFrame(surat_to_gandhinagar_leads)
df["Est_Annual_Digital_LTV"] = df["webCost"] + (df["mrr"] * 12)
df.rename(columns={
    "id": "Lead_ID", "name": "Business_Name", "type": "Business_Type",
    "category": "Niche_Category", "city": "City", "zone": "Industrial_Zone",
    "rating": "Google_Rating", "reviews": "Review_Count", "website": "Has_Website",
    "dm": "Decision_Maker", "phone": "Contact_Number", "stage": "Pipeline_Stage",
    "priority": "Lead_Priority", "webCost": "Est_Website_Cost", "mrr": "Est_Monthly_Retainer"
}, inplace=True)
df.to_csv(CSV_FILE, index=False, encoding="utf-8-sig")
print(f"[OK] Updated {CSV_FILE} with {len(df)} leads.")

with open(JSON_FILE, "w", encoding="utf-8") as f:
    json.dump(df.to_dict(orient="records"), f, indent=2, ensure_ascii=False)
print(f"[OK] Updated {JSON_FILE}")
