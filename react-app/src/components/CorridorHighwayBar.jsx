import React, { useState } from 'react';
import { Navigation2, Milestone, ChevronRight, MapPin } from 'lucide-react';
import { CORRIDOR_CITIES, GUJARAT_CITIES, RAJASTHAN_CITIES } from '../data/leadsData';

export default function CorridorHighwayBar({ 
  selectedState = 'all',
  setSelectedState,
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
    // Gujarat
    { name: 'Surat', state: 'Gujarat', km: '0 KM', tag: 'Textile & Diamond' },
    { name: 'Kim & Kosamba', state: 'Gujarat', km: '38 KM', tag: 'Packaging' },
    { name: 'Ankleshwar', state: 'Gujarat', km: '62 KM', tag: 'Chemical Hub' },
    { name: 'Bharuch', state: 'Gujarat', km: '75 KM', tag: 'Fertilizer & Eng' },
    { name: 'Dahej', state: 'Gujarat', km: '115 KM', tag: 'PCPIR Port SEZ' },
    { name: 'Karjan', state: 'Gujarat', km: '135 KM', tag: 'Agro & Cotton' },
    { name: 'Vadodara', state: 'Gujarat', km: '150 KM', tag: 'Power & Heavy Eng' },
    { name: 'Anand', state: 'Gujarat', km: '195 KM', tag: 'Dairy & Food Tech' },
    { name: 'Nadiad', state: 'Gujarat', km: '215 KM', tag: 'Tobacco & Pharma' },
    { name: 'Kheda & Bareja', state: 'Gujarat', km: '245 KM', tag: 'Logistics Corridor' },
    { name: 'Ahmedabad', state: 'Gujarat', km: '275 KM', tag: 'Industrial Capital' },
    { name: 'Kalol & Chhatral', state: 'Gujarat', km: '298 KM', tag: 'Machinery GIDC' },
    { name: 'Gandhinagar', state: 'Gujarat', km: '320 KM', tag: 'GIFT City & Capital' },
    // Rajasthan
    { name: 'Udaipur', state: 'Rajasthan', km: '445 KM', tag: 'Marble & Minerals' },
    { name: 'Bhilwara', state: 'Rajasthan', km: '585 KM', tag: 'Textile City & Suiting' },
    { name: 'Kota', state: 'Rajasthan', km: '670 KM', tag: 'Kota Stone & Chemical' },
    { name: 'Kishangarh & Ajmer', state: 'Rajasthan', km: '710 KM', tag: 'Asia Marble Market' },
    { name: 'Jodhpur', state: 'Rajasthan', km: '725 KM', tag: 'Handicrafts & Furniture' },
    { name: 'Jaipur', state: 'Rajasthan', km: '815 KM', tag: 'Gems, Jewellery & VKIA' },
    { name: 'Bikaner', state: 'Rajasthan', km: '930 KM', tag: 'Bhujia, Wool & Ceramic' },
    { name: 'Alwar & Bhiwadi', state: 'Rajasthan', km: '950 KM', tag: 'Auto & NCR SEZ' },
  ];

  const visibleStops = stops.filter(stop => {
    if (selectedState === 'Gujarat') return stop.state === 'Gujarat';
    if (selectedState === 'Rajasthan') return stop.state === 'Rajasthan';
    return true;
  });

  return (
    <div className={`w-full border-y px-3 lg:px-6 py-2.5 backdrop-blur-xl relative z-20 transition-colors shadow-sm ${
      isDark 
        ? 'bg-[#090d18]/95 border-slate-800/80 text-slate-100' 
        : 'bg-white/95 border-slate-200 text-slate-800'
    }`}>
      <div className="w-full flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        
        {/* Left Badge: Corridor Route Indicator & Region Switcher */}
        <div className={`flex items-center gap-2 shrink-0 pr-3 border-r ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="w-8 h-8 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-500 shadow-sm">
            <Navigation2 className="w-4 h-4 rotate-45" />
          </div>
          <div className="leading-tight mr-1">
            <span className={`text-[10px] font-mono uppercase tracking-wider block font-bold ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Gujarat ➔ Rajasthan Belt
            </span>
            <span className={`text-xs font-black tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              21 Industrial Hubs
            </span>
          </div>

          {/* Region Tabs */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border text-[11px] font-bold ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => { if (setSelectedState) setSelectedState('all'); setSelectedCity('all'); }}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                selectedState === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All (59)
            </button>
            <button
              onClick={() => { if (setSelectedState) setSelectedState('Gujarat'); setSelectedCity('all'); }}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                selectedState === 'Gujarat'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gujarat (36)
            </button>
            <button
              onClick={() => { if (setSelectedState) setSelectedState('Rajasthan'); setSelectedCity('all'); }}
              className={`px-2 py-0.5 rounded-lg transition-all flex items-center gap-1 ${
                selectedState === 'Rajasthan'
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                  : isDark ? 'text-amber-400 hover:text-white' : 'text-amber-700 hover:text-slate-900'
              }`}
            >
              <span>Rajasthan (23)</span>
            </button>
          </div>
        </div>

        {/* Milestone Stations Ribbon */}
        <div className="flex items-center gap-1.5 shrink-0 py-0.5">
          {visibleStops.map((stop, idx) => {
            const count = cityLeadCount[stop.name] || 0;
            const isSelected = selectedCity === stop.name;
            const isRaj = stop.state === 'Rajasthan';

            return (
              <React.Fragment key={stop.name}>
                <button
                  onClick={() => {
                    if (isSelected) {
                      if (onSelectCity) onSelectCity('all');
                      else setSelectedCity('all');
                    } else {
                      if (onSelectCity) onSelectCity(stop.name);
                      else setSelectedCity(stop.name);
                    }
                  }}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all whitespace-nowrap shadow-sm ${
                    isSelected
                      ? isRaj
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 font-bold scale-[1.03]'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-md shadow-blue-500/30 font-bold scale-[1.03]'
                      : isDark
                        ? 'bg-slate-900/70 hover:bg-slate-800 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                  title={`${stop.name}, ${stop.state} (${stop.km}) - ${stop.tag}`}
                >
                  {/* Status dot */}
                  <span className={`w-2 h-2 rounded-full transition-transform ${
                    isSelected 
                      ? 'bg-white animate-pulse scale-125' 
                      : isRaj 
                        ? 'bg-amber-400 group-hover:scale-125' 
                        : 'bg-blue-500/70 group-hover:scale-125'
                  }`} />

                  <span className="font-semibold">{stop.name}</span>

                  {/* Lead Count Badge */}
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected 
                      ? isRaj ? 'bg-slate-950 text-amber-300' : 'bg-blue-900/90 text-blue-100'
                      : isDark 
                        ? isRaj ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200' 
                        : isRaj ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {count}
                  </span>
                </button>

                {/* Connector Arrow */}
                {idx < visibleStops.length - 1 && (
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
