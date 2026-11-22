import re

with open(r"C:\Users\Dhruv_Rana\.gemini\antigravity\scratch\client_prospecting_powerbi\react-app\src\data\leadsData.js", "r", encoding="utf-8") as f:
    content = f.read()

rajasthan_leads = """
  // ==========================================
  // RAJASTHAN STATE INDUSTRIAL LEADS (23)
  // ==========================================

  // 14. Jodhpur (4)
  {
    id: "RAJ-201",
    name: "Marwar Royal Teak & Sheesham Handicrafts",
    type: "B2B",
    category: "Solid Wood Furniture & Metal Handicrafts Export",
    city: "Jodhpur",
    state: "Rajasthan",
    zone: "Boranada SEZ",
    address: "Plot No. G-124 to 126, RIICO Industrial Area, Boranada Phase IV, Jodhpur, Rajasthan - 342012",
    rating: 4.8, reviews: 310, website: "No Website",
    dm: "Mahendra Singh Rathore", phone: "9829012450",
    stage: "Pitch Scheduled", priority: "Hot",
    webCost: 85000, mrr: 45000,
    dateAdded: "2026-09-29 08:30 AM", batchDate: "2026-09-29", isNewToday: true
  },
  {
    id: "RAJ-202",
    name: "SunCity Guar Gum Industries & Hydrocolloids",
    type: "B2B",
    category: "Fast Hydration Guar Gum & Derivatives",
    city: "Jodhpur",
    state: "Rajasthan",
    zone: "Basni Industrial Area",
    address: "F-218, Basni Industrial Area Phase II, Jodhpur, Rajasthan - 342005",
    rating: 4.7, reviews: 195, website: "No Website",
    dm: "Kailashchand Agarwal", phone: "9829145612",
    stage: "Audit Sent", priority: "Hot",
    webCost: 75000, mrr: 38000,
    dateAdded: "2026-09-28 08:30 AM", batchDate: "2026-09-28", isNewToday: false
  },
  {
    id: "RAJ-203",
    name: "Thar Blue Pottery & Ceramic Decoratives",
    type: "D2C",
    category: "Heritage Blue Pottery & Vitrified Decor",
    city: "Jodhpur",
    state: "Rajasthan",
    zone: "Mandore Road",
    address: "45-B, Handicraft Nagar, Near Mandore Garden Road, Jodhpur, Rajasthan - 342007",
    rating: 4.6, reviews: 140, website: "Outdated",
    dm: "Surendra Gehlot", phone: "9828067891",
    stage: "Proposal Sent", priority: "Warm",
    webCost: 50000, mrr: 28000,
    dateAdded: "2026-09-27 08:30 AM", batchDate: "2026-09-27", isNewToday: false
  },
  {
    id: "RAJ-204",
    name: "Jodhpur Spice Mills & Mathania Mirch Processing",
    type: "B2B",
    category: "Mathania Red Chilli Powder & Whole Spices",
    city: "Jodhpur",
    state: "Rajasthan",
    zone: "Mandore Mandi Yard",
    address: "Shop No. 12-14, Krishi Upaj Mandi Yard, Mandore, Jodhpur, Rajasthan - 342004",
    rating: 4.9, reviews: 420, website: "No Website",
    dm: "Bhanwarlal Choudhary", phone: "9414123890",
    stage: "Closed-Won", priority: "Hot",
    webCost: 60000, mrr: 32000,
    dateAdded: "2026-09-26 08:30 AM", batchDate: "2026-09-26", isNewToday: false
  },

  // 15. Jaipur (5)
  {
    id: "RAJ-205",
    name: "PinkCity Kundan & Polki Fine Jewels",
    type: "B2B",
    category: "Jadau Jewellery & Certified Gemstones Wholesale",
    city: "Jaipur",
    state: "Rajasthan",
    zone: "Sitapura SEZ",
    address: "Plot No. E-45, Gem & Jewellery SEZ, Sitapura Industrial Area Phase II, Jaipur, Rajasthan - 302022",
    rating: 4.9, reviews: 560, website: "No Website",
    dm: "Sanjay Kothari", phone: "9829056722",
    stage: "Pitch Scheduled", priority: "Hot",
    webCost: 110000, mrr: 55000,
    dateAdded: "2026-09-29 08:30 AM", batchDate: "2026-09-29", isNewToday: true
  },
  {
    id: "RAJ-206",
    name: "Sanganer Bagru Natural Block Prints",
    type: "B2B",
    category: "Hand Block Printed Fabrics, Bed linen & Kurtis",
    city: "Jaipur",
    state: "Rajasthan",
    zone: "Sanganer RIICO",
    address: "Shed No. 34-36, Sanganer RIICO Industrial Area, Tonk Road, Jaipur, Rajasthan - 302029",
    rating: 4.7, reviews: 280, website: "Outdated",
    dm: "Radheshyam Chhipa", phone: "9829189033",
    stage: "Audit Sent", priority: "Hot",
    webCost: 65000, mrr: 35000,
    dateAdded: "2026-09-28 08:30 AM", batchDate: "2026-09-28", isNewToday: false
  },
  {
    id: "RAJ-207",
    name: "Jaipur Auto Gear Precision Fasteners",
    type: "B2B",
    category: "Automotive Gears, Pinions & Transmission Parts",
    city: "Jaipur",
    state: "Rajasthan",
    zone: "VKIA Road 9F",
    address: "Road No. 9F, Plot No. 248, Vishwakarma Industrial Area (VKIA), Jaipur, Rajasthan - 302013",
    rating: 4.8, reviews: 215, website: "No Website",
    dm: "Vikramaditya Singh Shekhawat", phone: "9828134567",
    stage: "Pitch Scheduled", priority: "Hot",
    webCost: 80000, mrr: 40000,
    dateAdded: "2026-09-27 08:30 AM", batchDate: "2026-09-27", isNewToday: false
  },
  {
    id: "RAJ-208",
    name: "Rajputana Marble Carving & Mandir Architecture",
    type: "B2B",
    category: "White Makrana Marble Temples & Sculpture",
    city: "Jaipur",
    state: "Rajasthan",
    zone: "Mansarovar RIICO",
    address: "18/A, Mansarovar RIICO Industrial Area, Near Metro Depot, Jaipur, Rajasthan - 302020",
    rating: 4.6, reviews: 160, website: "No Website",
    dm: "Naresh Sharma", phone: "9414078901",
    stage: "Contacted", priority: "Warm",
    webCost: 70000, mrr: 35000,
    dateAdded: "2026-09-26 08:30 AM", batchDate: "2026-09-26", isNewToday: false
  },
  {
    id: "RAJ-209",
    name: "Rawat Traditional Ghewar & Peda Bhavan",
    type: "D2C",
    category: "Heritage Mawa Ghewar, Pyaaz Kachori & Mithai",
    city: "Jaipur",
    state: "Rajasthan",
    zone: "Station Road",
    address: "110 Station Road, Opp. Polo Victory Cinema, Sindhi Camp, Jaipur, Rajasthan - 302001",
    rating: 4.9, reviews: 1850, website: "Outdated",
    dm: "Deendayal Deora", phone: "9829244550",
    stage: "Closed-Won", priority: "Hot",
    webCost: 75000, mrr: 40000,
    dateAdded: "2026-09-25 08:30 AM", batchDate: "2026-09-25", isNewToday: false
  },

  // 16. Udaipur (4)
  {
    id: "RAJ-210",
    name: "Mewar Green Marble & Granites International",
    type: "B2B",
    category: "Verde Guatemala & Forest Green Marble Slabs",
    city: "Udaipur",
    state: "Rajasthan",
    zone: "Sukher Marble Hub",
    address: "Plot No. 89-92, Sukher Marble Industrial Area, NH-8, Udaipur, Rajasthan - 313004",
    rating: 4.9, reviews: 340, website: "No Website",
    dm: "Himmat Singh Jhala", phone: "9829077881",
    stage: "Pitch Scheduled", priority: "Hot",
    webCost: 90000, mrr: 45000,
    dateAdded: "2026-09-29 08:30 AM", batchDate: "2026-09-29", isNewToday: true
  },
  {
    id: "RAJ-211",
    name: "Udaipur Micro Mineral Powders & Calcite",
    type: "B2B",
    category: "Micronized Calcite, Talc, Soapstone & Dolomite",
    city: "Udaipur",
    state: "Rajasthan",
    zone: "Gudli Industrial Area",
    address: "Survey No. 412, RIICO Industrial Area, Gudli, Debari, Udaipur, Rajasthan - 313024",
    rating: 4.7, reviews: 175, website: "No Website",
    dm: "Ashok Surana", phone: "9828233445",
    stage: "Audit Sent", priority: "Hot",
    webCost: 70000, mrr: 35000,
    dateAdded: "2026-09-28 08:30 AM", batchDate: "2026-09-28", isNewToday: false
  },
  {
    id: "RAJ-212",
    name: "Lake City Agro Chemical & Zinc Formulations",
    type: "B2B",
    category: "Zinc Sulphate, Micronutrients & Soil Conditioners",
    city: "Udaipur",
    state: "Rajasthan",
    zone: "Madri Industrial Area",
    address: "Road No. 4, Plot No. 115, Mewar Industrial Area, Madri, Udaipur, Rajasthan - 313003",
    rating: 4.6, reviews: 110, website: "No Website",
    dm: "Arvind Mehta", phone: "9414167822",
    stage: "Proposal Sent", priority: "Warm",
    webCost: 65000, mrr: 30000,
    dateAdded: "2026-09-27 08:30 AM", batchDate: "2026-09-27", isNewToday: false
  },
  {
    id: "RAJ-213",
    name: "Royal Mewar Heritage Silver Craft",
    type: "D2C",
    category: "Handcrafted Antique Silverware & Royal Artifacts",
    city: "Udaipur",
    state: "Rajasthan",
    zone: "City Palace Marg",
    address: "24 Jagdish Temple Road, Near City Palace Main Gate, Udaipur, Rajasthan - 313001",
    rating: 4.8, reviews: 290, website: "Outdated",
    dm: "Bhagwat Soni", phone: "9829355660",
    stage: "Closed-Won", priority: "Hot",
    webCost: 60000, mrr: 30000,
    dateAdded: "2026-09-26 08:30 AM", batchDate: "2026-09-26", isNewToday: false
  },

  // 17. Kota (2)
  {
    id: "RAJ-214",
    name: "Hadoti Kota Stone Polishing & Tiles",
    type: "B2B",
    category: "Natural Blue/Brown Kota Stone Slabs & Cobbles",
    city: "Kota",
    state: "Rajasthan",
    zone: "Indraprastha Industrial Area (IPIA)",
    address: "Plot No. F-12, Indraprastha Industrial Area, Road No. 3, Kota, Rajasthan - 324005",
    rating: 4.7, reviews: 220, website: "No Website",
    dm: "Omprakash Mundra", phone: "9829099882",
    stage: "Pitch Scheduled", priority: "Hot",
    webCost: 65000, mrr: 32000,
    dateAdded: "2026-09-28 08:30 AM", batchDate: "2026-09-28", isNewToday: false
  },
  {
    id: "RAJ-215",
    name: "Chambal Heavy Agro Fertilisers & Chemicals",
    type: "B2B",
    category: "Crop Nutrients & Industrial Inorganic Chemicals",
    city: "Kota",
    state: "Rajasthan",
    zone: "Ranpur Growth Centre",
    address: "Plot No. 56-58, RIICO Growth Centre, Ranpur, Kota, Rajasthan - 325003",
    rating: 4.5, reviews: 140, website: "Outdated",
    dm: "Rajendra Heda", phone: "9414234511",
    stage: "Contacted", priority: "Warm",
    webCost: 75000, mrr: 38000,
    dateAdded: "2026-09-27 08:30 AM", batchDate: "2026-09-27", isNewToday: false
  },

  // 18. Bhilwara (2)
  {
    id: "RAJ-216",
    name: "Mewar Synthetic Suiting & Spinning Mills",
    type: "B2B",
    category: "Polyester Viscose Suiting & Blended Yarns",
    city: "Bhilwara",
    state: "Rajasthan",
    zone: "Mandpam Industrial Area",
    address: "NH-79, Chittor Road, Mandpam Industrial Area, Bhilwara, Rajasthan - 311001",
    rating: 4.9, reviews: 380, website: "No Website",
    dm: "Ramavtar Toshniwal", phone: "9829155440",
    stage: "Pitch Scheduled", priority: "Hot",
    webCost: 95000, mrr: 48000,
    dateAdded: "2026-09-29 08:30 AM", batchDate: "2026-09-29", isNewToday: true
  },
  {
    id: "RAJ-217",
    name: "Textile City Denim Fabric & Processors",
    type: "B2B",
    category: "Heavy Indigo Denim Fabrics & Shirting",
    city: "Bhilwara",
    state: "Rajasthan",
    zone: "Hamirgarh RIICO Area",
    address: "Plot No. 102-105, Growth Centre, Hamirgarh, Bhilwara, Rajasthan - 311025",
    rating: 4.8, reviews: 245, website: "No Website",
    dm: "Govind Somani", phone: "9828088991",
    stage: "Audit Sent", priority: "Hot",
    webCost: 85000, mrr: 42000,
    dateAdded: "2026-09-28 08:30 AM", batchDate: "2026-09-28", isNewToday: false
  },

  // 19. Alwar & Bhiwadi (2)
  {
    id: "RAJ-218",
    name: "Matsya Auto Engineering & Die Casting",
    type: "B2B",
    category: "Aluminium Die Casted Engine Components",
    city: "Alwar & Bhiwadi",
    state: "Rajasthan",
    zone: "Khushkhera RIICO Area",
    address: "Plot No. SP-289, Khushkhera RIICO Industrial Area, Bhiwadi, Dist. Alwar, Rajasthan - 301019",
    rating: 4.8, reviews: 270, website: "No Website",
    dm: "Digvijay Yadav", phone: "9811234560",
    stage: "Pitch Scheduled", priority: "Hot",
    webCost: 90000, mrr: 45000,
    dateAdded: "2026-09-27 08:30 AM", batchDate: "2026-09-27", isNewToday: false
  },
  {
    id: "RAJ-219",
    name: "NCR Pharma Formulations & Injections",
    type: "B2B",
    category: "Generic Antibiotics & Nutraceutical Capsules",
    city: "Alwar & Bhiwadi",
    state: "Rajasthan",
    zone: "Matsya Industrial Area (MIA)",
    address: "Plot No. 142-144, Matsya Industrial Area, Alwar, Rajasthan - 301030",
    rating: 4.6, reviews: 155, website: "Outdated",
    dm: "Dr. R.K. Singhal", phone: "9829411223",
    stage: "Audit Sent", priority: "Warm",
    webCost: 80000, mrr: 40000,
    dateAdded: "2026-09-26 08:30 AM", batchDate: "2026-09-26", isNewToday: false
  },

  // 20. Bikaner (2)
  {
    id: "RAJ-220",
    name: "Desert Gold Bikaneri Bhujia & Rasgulla Mills",
    type: "D2C",
    category: "Authentic Bikaneri Bhujia, Papads & Canned Rasgulla",
    city: "Bikaner",
    state: "Rajasthan",
    zone: "Karni Industrial Area",
    address: "Road No. 5, Plot No. 78, Karni Industrial Area Phase II, Bikaner, Rajasthan - 334004",
    rating: 4.9, reviews: 890, website: "No Website",
    dm: "Shyamlal Baid", phone: "9829033441",
    stage: "Closed-Won", priority: "Hot",
    webCost: 75000, mrr: 38000,
    dateAdded: "2026-09-28 08:30 AM", batchDate: "2026-09-28", isNewToday: false
  },
  {
    id: "RAJ-221",
    name: "Bikaner Camel Wool Carpets & Ceramics",
    type: "B2B",
    category: "Handknotted Woolen Rugs & Vitrified Minerals",
    city: "Bikaner",
    state: "Rajasthan",
    zone: "Bichhwal RIICO",
    address: "F-44, Bichhwal Industrial Area, Bikaner, Rajasthan - 334006",
    rating: 4.5, reviews: 95, website: "No Website",
    dm: "Prem Rathi", phone: "9414088990",
    stage: "Contacted", priority: "Warm",
    webCost: 60000, mrr: 30000,
    dateAdded: "2026-09-27 08:30 AM", batchDate: "2026-09-27", isNewToday: false
  },

  // 21. Kishangarh & Ajmer (2)
  {
    id: "RAJ-222",
    name: "Kishangarh Imported Marble & Italian Granites",
    type: "B2B",
    category: "Imported Italian Marble, Onyx & Engineered Quartz",
    city: "Kishangarh & Ajmer",
    state: "Rajasthan",
    zone: "Silora RIICO Marble Market",
    address: "Marble City Hub, NH-8 Expressway, Silora Industrial Area, Kishangarh, Rajasthan - 305801",
    rating: 4.9, reviews: 620, website: "No Website",
    dm: "Mahaveer Prasad Jain", phone: "9829011995",
    stage: "Pitch Scheduled", priority: "Hot",
    webCost: 100000, mrr: 50000,
    dateAdded: "2026-09-29 08:30 AM", batchDate: "2026-09-29", isNewToday: true
  },
  {
    id: "RAJ-223",
    name: "Ajmer Dargah Heritage Attar & Fragrance Distillers",
    type: "D2C",
    category: "Pure Sandalwood, Rose Water & Herbal Fragrances",
    city: "Kishangarh & Ajmer",
    state: "Rajasthan",
    zone: "Naya Bazar & Dargah Marg",
    address: "14 Attar Market, Near Delhi Gate, Naya Bazar, Ajmer, Rajasthan - 305001",
    rating: 4.8, reviews: 410, website: "No Website",
    dm: "Firoz Chishty", phone: "9829277884",
    stage: "Closed-Won", priority: "Hot",
    webCost: 55000, mrr: 28000,
    dateAdded: "2026-09-27 08:30 AM", batchDate: "2026-09-27", isNewToday: false
  }
"""

# Add state: "Gujarat" to all Gujarat leads that don't have it
content_with_state = re.sub(r'city:\s*"([^"]+)",\s*zone:', r'city: "\1",\n    state: "Gujarat",\n    zone:', content)

# Find the end of CORRIDOR_LEADS array: "  }\n];"
match = re.search(r'(\s*\}\s*\n\];)', content_with_state)
if match:
    insert_pos = match.start()
    new_content = content_with_state[:insert_pos] + "  }," + rajasthan_leads + "\n];\n"
    
    # Now replace export const CORRIDOR_CITIES
    cities_export = """
export const GUJARAT_CITIES = [
  "Surat",
  "Kim & Kosamba",
  "Ankleshwar",
  "Bharuch",
  "Dahej",
  "Karjan",
  "Vadodara",
  "Anand",
  "Nadiad",
  "Kheda & Bareja",
  "Ahmedabad",
  "Kalol & Chhatral",
  "Gandhinagar"
];

export const RAJASTHAN_CITIES = [
  "Jodhpur",
  "Jaipur",
  "Udaipur",
  "Kota",
  "Bhilwara",
  "Alwar & Bhiwadi",
  "Bikaner",
  "Kishangarh & Ajmer"
];

export const CORRIDOR_CITIES = [
  ...GUJARAT_CITIES,
  ...RAJASTHAN_CITIES
];
"""
    # Replace existing CORRIDOR_CITIES definition
    new_content = re.sub(r'export const CORRIDOR_CITIES = \[[\s\S]*?\];', cities_export.strip(), new_content)
    
    with open(r"C:\Users\Dhruv_Rana\.gemini\antigravity\scratch\client_prospecting_powerbi\react-app\src\data\leadsData.js", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("SUCCESS: leadsData.js updated successfully with 23 Rajasthan leads and city exports!")
else:
    print("ERROR: could not find end of array")
