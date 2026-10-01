import React from 'react';
import { Milestone, Navigation2, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { CORRIDOR_CITIES } from '../data/leadsData';

export default function CorridorHighwayBar({ selectedCity, setSelectedCity, leads }) {
  const cityLeadCount = leads.reduce((acc, lead) => {
    acc[lead.city] = (acc[lead.city] || 0) + 1;
    return acc;
  }, {});

  const stops = [
    { name: 'Surat', km: '0 KM', tag: 'Textile & Diamond' },
    { name: 'Kim & Kosamba', km: '38 KM', tag: 'Packaging' },
    { name: 'Ankleshwar', km: '62 KM', tag: 'Chemical Hub' },
    { name: 'Bharuch', km: '75 KM', tag: 'Fertilizer & Eng' },
    { name: 'Dahej', km: '115 KM', tag: 'PCPIR Port SEZ' },
    { name: 'Karjan', km: '135 KM', tag: 'Agro & Cotton' },
    { name: 'Vadodara', km: '150 KM', tag: 'Power & Heavy Eng' },
    { name: 'Anand', km: '195 KM', tag: 'Dairy & Food Tech' },
    { name: 'Nadiad', km: '215 KM', tag: 'Tobacco & Pharma' },
    { name: 'Kheda & Bareja', km: '245 KM', tag: 'Logistics Corridor' },
    { name: 'Ahmedabad', km: '275 KM', tag: 'Industrial Capital' },
    { name: 'Kalol & Chhatral', km: '298 KM', tag: 'Machinery GIDC' },
    { name: 'Gandhinagar', km: '320 KM', tag: 'GIFT City & Capital' },
  ];

  return (
    <div className="w-full bg-[#0b101d]/95 border-y border-slate-800/80 px-3 lg:px-6 py-2.5 backdrop-blur-xl relative z-20">
      <div className="w-full flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        
        {/* Left Badge: Corridor Route */}
        <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Navigation2 className="w-3.5 h-3.5 rotate-45" />
          </div>
          <div className="leading-tight">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
              NH-48 ➔ NE-1 Expressway
            </span>
            <span className="text-xs font-bold text-white tracking-tight">
              320 KM Corridor
            </span>
          </div>
          <button
            onClick={() => setSelectedCity('all')}
            className={`ml-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedCity === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All 13 Hubs (36)
          </button>
        </div>

        {/* Horizontal Highway Stations */}
        <div className="flex items-center gap-1.5 shrink-0 py-1">
          {stops.map((stop, idx) => {
            const count = cityLeadCount[stop.name] || 0;
            const isSelected = selectedCity === stop.name;

            return (
              <React.Fragment key={stop.name}>
                <button
                  onClick={() => setSelectedCity(stop.name)}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-lg shadow-blue-500/30 font-bold scale-[1.03]'
                      : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                  title={`${stop.name} (${stop.km}) - ${stop.tag}`}
                >
                  {/* Status dot */}
                  <span className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-white animate-pulse' : 'bg-blue-500/60 group-hover:bg-blue-400'
                  }`} />

                  <span className="tracking-tight">{stop.name}</span>

                  {/* Lead Count Badge */}
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-blue-900/80 text-blue-200' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {count}
                  </span>
                </button>

                {/* Connector Arrow */}
                {idx < stops.length - 1 && (
                  <span className="text-slate-700 text-xs font-mono select-none">
                    ➔
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </div>
  );
}
