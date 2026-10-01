import React from 'react';
import { Navigation2, Milestone, ChevronRight } from 'lucide-react';
import { CORRIDOR_CITIES } from '../data/leadsData';

export default function CorridorHighwayBar({ selectedCity, setSelectedCity, leads, theme = 'dark' }) {
  const isDark = theme === 'dark';

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
    <div className={`w-full border-y px-3 lg:px-6 py-2.5 backdrop-blur-xl relative z-20 transition-colors shadow-sm ${
      isDark 
        ? 'bg-[#090d18]/95 border-slate-800/80 text-slate-100' 
        : 'bg-white/95 border-slate-200 text-slate-800'
    }`}>
      <div className="w-full flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        
        {/* Left Badge: Highway Corridor Route Indicator */}
        <div className={`flex items-center gap-2.5 shrink-0 pr-3.5 border-r ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="w-8 h-8 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500 shadow-sm">
            <Navigation2 className="w-4 h-4 rotate-45" />
          </div>
          <div className="leading-tight">
            <span className={`text-[10px] font-mono uppercase tracking-wider block font-bold ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              NH-48 ➔ NE-1 Highway
            </span>
            <span className={`text-xs font-black tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              320 KM Corridor
            </span>
          </div>
          <button
            onClick={() => setSelectedCity('all')}
            className={`ml-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCity === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : isDark
                  ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/50'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            All 13 Hubs (36)
          </button>
        </div>

        {/* 13 Milestone Stations Ribbon */}
        <div className="flex items-center gap-1.5 shrink-0 py-0.5">
          {stops.map((stop, idx) => {
            const count = cityLeadCount[stop.name] || 0;
            const isSelected = selectedCity === stop.name;

            return (
              <React.Fragment key={stop.name}>
                <button
                  onClick={() => setSelectedCity(stop.name)}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all whitespace-nowrap shadow-sm ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-md shadow-blue-500/30 font-bold scale-[1.03]'
                      : isDark
                        ? 'bg-slate-900/70 hover:bg-slate-800 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                  title={`${stop.name} (${stop.km}) - ${stop.tag}`}
                >
                  {/* Status dot */}
                  <span className={`w-2 h-2 rounded-full transition-transform ${
                    isSelected ? 'bg-white animate-pulse scale-125' : 'bg-blue-500/70 group-hover:scale-125'
                  }`} />

                  <span className="font-semibold">{stop.name}</span>

                  {/* Lead Count Badge */}
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected 
                      ? 'bg-blue-900/90 text-blue-100' 
                      : isDark 
                        ? 'bg-slate-800 text-slate-400 group-hover:text-slate-200' 
                        : 'bg-slate-200 text-slate-700'
                  }`}>
                    {count}
                  </span>
                </button>

                {/* Connector Arrow */}
                {idx < stops.length - 1 && (
                  <span className={`text-xs font-mono select-none px-0.5 ${
                    isDark ? 'text-slate-700' : 'text-slate-300'
                  }`}>
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
