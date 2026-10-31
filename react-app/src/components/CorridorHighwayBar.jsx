import React, { useState } from 'react';
import { Navigation2, Milestone, ChevronRight, MapPin, Building2, Flame } from 'lucide-react';
import { CORRIDOR_CITIES, GUJARAT_CITIES } from '../data/leadsData';

export default function CorridorHighwayBar({ 
  selectedCity, 
  setSelectedCity, 
  onSelectCity,
  leads, 
  theme = 'dark' 
}) {
  const isDark = theme === 'dark';

  const cityLeadCount = leads.reduce((acc, lead) => {
    acc[lead.city] = (acc[lead.city] || 0) + 1;
    return acc;
  }, {});

  const stops = [
    { name: 'Surat', km: '105 KM', tag: 'Textiles & Diamonds (HQ)', top: true },
    { name: 'Ahmedabad', km: '380 KM', tag: 'Pharma & Mega Engineering (HQ)', top: true },
    { name: 'Vadodara', km: '255 KM', tag: 'Heavy Eng, Power & Switchgears' },
    { name: 'Rajkot', km: '560 KM', tag: 'CNC Machine Tools & Castings', top: true },
    { name: 'Morbi', km: '625 KM', tag: 'Ceramic Tiles & Sanitaryware', top: true },
    { name: 'Jamnagar', km: '650 KM', tag: 'Brass Parts & Components' },
    { name: 'Gandhinagar', km: '425 KM', tag: 'GIFT City & Electronic Hardware' },
    { name: 'Ankleshwar', km: '168 KM', tag: 'Bulk Drugs & Chemical Hub' },
    { name: 'Bharuch', km: '180 KM', tag: 'Chemicals & Synthetic Dyes' },
    { name: 'Dahej', km: '220 KM', tag: 'PCPIR Port & Petrochem SEZ' },
    { name: 'Anand', km: '300 KM', tag: 'Dairy Tech & Vitthal Udyognagar' },
    { name: 'Nadiad', km: '320 KM', tag: 'Tobacco & Pharma Machinery' },
    { name: 'Vapi', km: '0 KM', tag: 'Chemicals & Paper GIDC' },
    { name: 'Valsad', km: '30 KM', tag: 'Agro & Horticulture' },
    { name: 'Navsari', km: '70 KM', tag: 'Diamonds & Floriculture' },
    { name: 'Kim & Kosamba', km: '142 KM', tag: 'Corrugated Packaging' },
    { name: 'Karjan', km: '240 KM', tag: 'Cotton & Agro Ginning' },
    { name: 'Kalol & Chhatral', km: '405 KM', tag: 'Machinery & Tooling GIDC' },
    { name: 'Kheda & Bareja', km: '350 KM', tag: 'Logistics & Warehousing Park' },
  ];

  return (
    <div className={`w-full border-y px-2 sm:px-4 lg:px-6 py-1.5 sm:py-2.5 backdrop-blur-xl relative z-20 transition-colors shadow-sm ${
      isDark 
        ? 'bg-[#090d18]/95 border-slate-800/80 text-slate-100' 
        : 'bg-white/95 border-slate-200 text-slate-800'
    }`}>
      <div className="w-full flex items-center justify-between gap-1.5 sm:gap-3 overflow-x-auto no-scrollbar touch-pan-x scroll-smooth pb-0.5">
        
        {/* Left Badge: Corridor Route Indicator */}
        <div className={`flex items-center gap-1.5 sm:gap-2 shrink-0 pr-2 sm:pr-3 border-r ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-md flex items-center justify-center text-white shrink-0">
            <Navigation2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-45" />
          </div>
          <div className="leading-tight mr-1 hidden sm:block">
            <span className={`text-[10px] font-mono uppercase tracking-wider block font-bold ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>
              Gujarat Golden Corridor
            </span>
            <span className={`text-xs font-black tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Vapi ➔ Ahmedabad ➔ Morbi
            </span>
          </div>

          {/* Quick All Button */}
          <button
            onClick={() => { setSelectedCity('all'); }}
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all border shrink-0 ${
              selectedCity === 'all'
                ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                : isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            All ({leads.length})
          </button>
        </div>

        {/* Highway Milestones Chain */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {stops.map((stop, index) => {
            const count = cityLeadCount[stop.name] || 0;
            const isSelected = selectedCity.toLowerCase() === stop.name.toLowerCase();

            return (
              <React.Fragment key={stop.name}>
                <button
                  onClick={() => onSelectCity(stop.name)}
                  className={`group relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border text-left transition-all duration-150 shrink-0 ${
                    isSelected
                      ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/25 scale-[1.02] ring-2 ring-blue-500/40'
                      : isDark
                        ? 'bg-slate-900/80 hover:bg-slate-800/90 border-slate-800/90 text-slate-200 hover:border-slate-700'
                        : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-sm'
                  }`}
                  title={`${stop.name} (${stop.tag}) - ${count} Verified Leads`}
                >
                  {/* Kilometers Marker Tag */}
                  <span className={`font-mono text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.2 rounded font-extrabold uppercase shrink-0 ${
                    isSelected 
                      ? 'bg-blue-800/60 text-blue-100' 
                      : stop.top
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {stop.km}
                  </span>

                  {/* Stop Name & Tag */}
                  <div className="flex flex-col leading-none">
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] sm:text-xs font-black tracking-tight">{stop.name}</span>
                      {stop.top && (
                        <Flame className={`w-3 h-3 ${isSelected ? 'text-amber-300' : 'text-rose-500'}`} />
                      )}
                    </div>
                    <span className={`text-[8px] sm:text-[9px] truncate max-w-[100px] sm:max-w-[130px] mt-0.5 font-medium hidden xs:inline ${
                      isSelected ? 'text-blue-100' : isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {stop.tag}
                    </span>
                  </div>

                  {/* Lead Count Badge */}
                  <span className={`text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full shrink-0 ml-0.5 ${
                    isSelected
                      ? 'bg-white text-blue-700'
                      : count > 0 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                        : isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>

                {/* Road Connector Arrow */}
                {index < stops.length - 1 && (
                  <ChevronRight className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 transition-opacity ${
                    isDark ? 'text-slate-700' : 'text-slate-300'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </div>
  );
}
