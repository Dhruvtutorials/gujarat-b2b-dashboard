import React from 'react';
import { Milestone, MapPin, Navigation, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { CORRIDOR_CITIES, CORRIDOR_LEADS } from '../data/leadsData';

export default function CorridorRouteView({ onSelectCity, theme = 'dark' }) {
  const isDark = theme === 'dark';

  const hubs = [
    { city: 'Surat', km: '0 KM', highway: 'NH-48 Start', desc: 'Silk, Jacquard, Diamond Polishing Blades & Heritage Food', count: 4 },
    { city: 'Kim & Kosamba', km: '38 KM', highway: 'NH-48', desc: 'Corrugated Packaging, Paper Rolls & Agro Processing', count: 2 },
    { city: 'Ankleshwar', km: '62 KM', highway: 'NH-48 GIDC', desc: 'Dyes, Bulk Drugs, Specialty Chemicals & Valves', count: 3 },
    { city: 'Bharuch', km: '75 KM', highway: 'Narmada NH-48', desc: 'Fertilizers, Industrial Heavy Fabrication & Petrochem', count: 3 },
    { city: 'Dahej', km: '115 KM', highway: 'PCPIR Port SEZ', desc: 'Deep Water Marine Port, Cryogenic & Heavy Chemical SEZ', count: 2 },
    { city: 'Karjan', km: '135 KM', highway: 'NH-48', desc: 'Cotton Ginning, Oil Mills & Agro Machinery Spares', count: 2 },
    { city: 'Vadodara', km: '150 KM', highway: 'NE-1 Junction', desc: 'High Voltage Switchgear, Transformers, Pharma & CNC Machine Tools', count: 5 },
    { city: 'Anand', km: '195 KM', highway: 'NE-1 Milk Hub', desc: 'Stainless Food Processing, Cold Storage & Packaging Equipment', count: 3 },
    { city: 'Nadiad', km: '215 KM', highway: 'NE-1 Tobacco/Pharma', desc: 'Herbal Extracts, Printing Cylinders & Ayurvedic Machinery', count: 2 },
    { city: 'Kheda & Bareja', km: '245 KM', highway: 'Expressway Gateway', desc: 'Cold Logistics Warehousing, PEB Sheds & Precast Infrastructure', count: 2 },
    { city: 'Ahmedabad', km: '275 KM', highway: 'Vatva / Changodar', desc: 'Pharma Injectables, Plastic Extrusion & High-Ticket B2B Engineering', count: 6 },
    { city: 'Kalol & Chhatral', km: '298 KM', highway: 'Highway GIDC', desc: 'Precision Brass Extrusions, Fasteners & Industrial Casting', count: 2 },
    { city: 'Gandhinagar', km: '320 KM', highway: 'Capital & GIFT City', desc: 'Electronics Hardware, SCADA Automation & IT Infrastructure', count: 3 },
  ];

  return (
    <div className={`w-full rounded-2xl border p-5 lg:p-6 transition-colors shadow-sm ${
      isDark ? 'bg-[#111726] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-700/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500">
            <Milestone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight">
              Highway Corridor Map (Surat ➔ Gandhinagar)
            </h2>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              320 KM continuous manufacturing belt along NH-48 and NE-1 Expressway covering 13 industrial hubs.
            </p>
          </div>
        </div>

        <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>36 Leads with GPS Factory Coordinates</span>
        </div>
      </div>

      {/* Corridor Hubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hubs.map((hub, idx) => (
          <div
            key={hub.city}
            className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
              isDark 
                ? 'bg-slate-900/60 border-slate-800 hover:border-blue-500/50' 
                : 'bg-slate-50 border-slate-200 hover:border-blue-400 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-blue-500">
                  Station {(idx + 1).toString().padStart(2, '0')} • {hub.km}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-800'
                }`}>
                  {hub.count} Leads
                </span>
              </div>

              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {hub.city}
              </h3>
              <span className="text-[11px] font-mono text-slate-500 block mb-1.5">
                {hub.highway}
              </span>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {hub.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/30 flex items-center justify-between">
              <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified GIDC</span>
              </span>
              <button
                onClick={() => onSelectCity(hub.city)}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-blue-600"
              >
                <span>View Leads</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
