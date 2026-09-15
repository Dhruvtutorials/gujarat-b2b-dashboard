# Power BI Client Prospecting & Sales Pipeline Guide
# (ગુજરાતી માર્ગદર્શિકા - ક્લાયન્ટ શોધવાથી લઈ Power BI ડેશબોર્ડ સુધી)

આ ફોલ્ડરમાં તમારા માટે 3 મુખ્ય ટૂલ્સ તૈયાર કરવામાં આવ્યા છે:
1. **`leads_master_tracker.xlsx`** & **`leads_database.csv`**: સંપૂર્ણ ડેટાસેટ (50+ રિયાલિસ્ટિક ગુજરાત B2B & D2C લીડ્સ).
2. **`google_maps_lead_finder.py`**: ઓટોમેટેડ લીડ ડિસ્કવરી સ્ક્રિપ્ટ.
3. **Power BI DAX Measures & Dashboard Setup**: તમારા ડેશબોર્ડને પ્રોફેશનલ લૂક આપવા માટે.

---

## ૧. Power BI માં ડેટા કેવી રીતે લોડ કરવો (Step-by-Step)

1. તમારા કમ્પ્યુટરમાં **Power BI Desktop** ખોલો.
2. ઉપરના મેનૂમાં **Get Data** પર ક્લિક કરો અને **Excel Workbook** પસંદ કરો.
3. નીચે આપેલી ફાઇલ સિલેક્ટ કરો:
   `C:\Users\Dhruv_Rana\.gemini\antigravity\scratch\client_prospecting_powerbi\leads_master_tracker.xlsx`
4. **`Leads_Master`** શીટ સિલેક્ટ કરીને **Load** પર ક્લિક કરો.

---

## ૨. Power BI માં વાપરવા માટેના ટોપ DAX Measures (Copy & Paste)

Power BI માં `Leads_Master` ટેબલ પર રાઇટ ક્લિક કરીને **New Measure** પસંદ કરો અને નીચેના DAX કોડ પેસ્ટ કરો:

### ૧. કુલ લીડ્સ (Total Leads)
```dax
Total Leads = COUNTROWS('Leads_Master')
```

### ૨. વેબસાઇટ વગરના બિઝનેસિસ (No Website Leads)
```dax
No Website Count = 
CALCULATE(
    COUNTROWS('Leads_Master'),
    'Leads_Master'[Has_Website] = "No Website"
)
```

### ૩. હોટ ઓપોર્ચ્યુનિટીઝ (Hot Priority Leads)
```dax
Hot Opportunities = 
CALCULATE(
    COUNTROWS('Leads_Master'),
    'Leads_Master'[Lead_Priority] = "Hot"
)
```

### ૪. અપેક્ષિત કુલ વાર્ષિક રેવન્યુ પાઇપલાઇન (Total Pipeline Value)
```dax
Total Pipeline LTV = SUM('Leads_Master'[Est_Annual_Digital_LTV])
```

### ૫. વેઇટેડ પાઇપલાઇન વેલ્યુ (Probability Adjusted Value)
```dax
Weighted Pipeline Value = SUM('Leads_Master'[Weighted_Pipeline_Value])
```

### ૬. અપેક્ષિત માસિક રિટાઇનર આવક (Monthly Recurring Revenue - MRR)
```dax
Projected Monthly MRR = SUM('Leads_Master'[Est_Monthly_Retainer])
```

### ૭. ક્લોઝ થયેલા પ્રોજેક્ટ્સની આવક (Closed-Won Revenue)
```dax
Won Revenue = 
CALCULATE(
    SUM('Leads_Master'[Est_Annual_Digital_LTV]),
    'Leads_Master'[Pipeline_Stage] = "Closed-Won"
)
```

### ૮. સરેરાશ વેબસાઇટ ફી (Avg Website Project Fee)
```dax
Avg Website Ticket = AVERAGE('Leads_Master'[Est_Website_Cost])
```

---

## ૩. Power BI ડેશબોર્ડ પેજ ડિઝાઇન (Visual Layouts)

### Page 1: "Executive Opportunity Radar" (માર્કેટ તકનો ચિતાર)
- **Top Row (KPI Cards):**
  - Card 1: `Total Leads`
  - Card 2: `No Website Count` (સૌથી મોટી તક)
  - Card 3: `Hot Opportunities`
  - Card 4: `Total Pipeline LTV` (દા.ત. ₹55,00,000+)
- **Middle Visuals:**
  - **Donut Chart**: `Business_Type` (B2B vs D2C) મુજબ કાઉન્ટ.
  - **Clustered Bar Chart**: `City` મુજબ કુલ લીડ્સ (Rajkot, Morbi, Surat, Ahmedabad, Vadodara).
  - **Treemap / Bar Chart**: `Niche_Category` (Ceramics, Engineering, Sweets & Farsan, Textiles).
- **Bottom Table:**
  - `Business_Name`, `City`, `Google_Rating`, `Review_Count`, `Has_Website`, `Est_Turnover_Bracket`.

### Page 2: "Sales Pipeline & Outreach Funnel" (સેલ્સ ટ્રેકિંગ)
- **Funnel Chart**:
  - Category: `Pipeline_Stage`
  - Values: `Total Leads`
  - સ્ટેજ ક્રમ: *New Lead ➔ Contacted ➔ Audit Sent ➔ Pitch Scheduled ➔ Proposal Sent ➔ Closed-Won*
- **Matrix / Detailed Table**:
  - Columns: `Business_Name`, `Decision_Maker`, `Contact_Number`, `Next_Followup_Date`, `Next_Action`, `Pipeline_Stage`.
  - Conditional Formatting: `Lead_Priority` = "Hot" હોય તો લાલ/ઓરેન્જ હાઇલાઇટ.

### Page 3: "Revenue & Retainer Forecast" (આવકનું પ્લાનિંગ)
- **Gauge Chart**: `Won Revenue` vs ટાર્ગેટ (દા.ત. ₹5,00,000).
- **Stacked Column Chart**: `Est_Website_Cost` (One-time) vs `Est_Monthly_Retainer * 12` (Recurring) બાય કેટેગરી.

---

## ૪. ક્લાયન્ટને મોકલવા માટેના રેડી-ટુ-યુઝ WhatsApp & Call Scripts

### A. B2B મેન્યુફેક્ચરર્સ માટે (સિરામિક, એન્જિનિયરિંગ, કેમિકલ, મશીનરી):
> "પ્રણામ [સર/ઓનરનું નામ],  
> મેં તમારી કંપની [કંપનીનું નામ] ના Google પર 4.7 રેટિંગ અને ઉત્કૃષ્ટ ગ્રાહક રિવ્યુ જોયા.  
> હાલમાં જ્યારે કોઈ મોટો એક્સપોર્ટર કે બાયર ગૂગલ પર [પ્રોડક્ટ નામ] સર્ચ કરે છે, ત્યારે તમારી પાસે પોતાની પ્રોફેશનલ કેટલોગ વેબસાઇટ ન હોવાને કારણે એ ઇન્ક્વાયરી બીજા સપ્લાયર પાસે જતી રહે છે.  
> અમે ખાસ B2B મેન્યુફેક્ચરર્સ માટે ડિજિટલ કેટલોગ અને ડાયરેક્ટ બાયર લીડ જનરેશન સિસ્ટમ સેટઅપ કરીએ છીએ.  
> તમારી કંપની માટે મેં એક ૧ મિનિટનો ફ્રી વેબસાઇટ ઓડિટ રિપોર્ટ બનાવ્યો છે, શું હું તમને અહીં WhatsApp પર મોકલી શકું?"

### B. D2C બ્રાન્ડ્સ માટે (સ્વીટ્સ, ફરસાણ, સાડી, કપડાં, હેન્ડીક્રાફ્ટ):
> "નમસ્તે [ઓનરનું નામ],  
> [બ્રાન્ડનું નામ] નું નામ અને ક્વોલિટી ખૂબ ફેમસ છે અને લોકો ખૂબ વખાણે છે.  
> હાલમાં તમારા કસ્ટમર્સ ઇન્સ્ટાગ્રામ ડીએમ કે વોટ્સએપ પર ભાવ પૂછીને ઓર્ડર આપે છે, જેમાં પેમેન્ટ અને એડ્રેસ લેવામાં ઘણો સમય બગડે છે. ઉપરાંત ઝોમેટો/સ્વિગી 20-25% કમિશન કાપી લે છે.  
> અમે તમારી પોતાની બ્રાન્ડેડ ઓનલાઇન સ્ટોર (Direct Website) બનાવી આપીએ છીએ જેમાં:  
> 1. કસ્ટમર સીધો ઓનલાઇન ઓર્ડર અને પેમેન્ટ કરે.  
> 2. આખા ભારતમાં કુરિયર ટ્રેકિંગ ઓટોમેટિક થાય.  
> 3. ઝીરો કમિશન – ૧૦૦% પ્રોફિટ તમારો!  
> શું આપણે આ અઠવાડિયે ૧૦ મિનિટનો ડેમો કોલ રાખી શકીએ?"
