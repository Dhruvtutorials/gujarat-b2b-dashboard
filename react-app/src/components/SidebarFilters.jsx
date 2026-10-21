import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Flame, 
  Globe2, 
  RotateCcw, 
  Clock, 
  Building2, 
  Milestone, 
  CheckCircle2, 
  Compass,
  Search,
  Check
} from 'lucide-react';
import { CORRIDOR_CITIES, GUJARAT_CITIES, RAJASTHAN_CITIES } from '../data/leadsData';

export default function SidebarFilters({
  allLeads = [],
  selectedState = 'all',
  setSelectedState,
  selectedCity,
  setSelectedCity,
  onSelectCity,
  selectedType,
  setSelectedType,
  selectedPriority,
  setSelectedPriority,
  selectedWebStatus,
  setSelectedWebStatus,
  activeBatch,
  setActiveBatch,
  leads = [],
  onResetFilters,
  theme = 'dark'
}) {
  const isDark = theme === 'dark';
  const [citySearch, setCitySearch] = useState('');

  // Master counts: Actual total leads available in each city across the whole corridor
  const masterCounts = (allLeads.length > 0 ? allLeads : leads).reduce((acc, lead) => {
    acc[lead.city] = (acc[lead.city] || 0) + 1;
    return acc;
  }, {});

  // Active counts matching current filter
  const activeCounts = leads.reduce((acc, lead) => {
    acc[lead.city] = (acc[lead.city] || 0) + 1;
    return acc;
  }, {});

  const baseCities = selectedState === 'Gujarat' 
    ? GUJARAT_CITIES 
    : selectedState === 'Rajasthan' 
      ? RAJASTHAN_CITIES 
      : CORRIDOR_CITIES;

  const displayedCities = baseCities.filter((city) =>
    city.toLowerCase().includes(citySearch.trim().toLowerCase())
  );

  const totalHubsCount = baseCities.reduce((sum, c) => sum + (masterCounts[c] || 0), 0);

  return (
    <aside className={`w-full lg:w-72 rounded-3xl p-4 lg:p-5 flex flex-col gap-5 shrink-0 shadow-2xl border transition-colors ${
      isDark 
        ? 'bg-[#0c1222]/95 backdrop-blur-xl border-slate-800/90 text-slate-100' 
        : 'bg-white border-slate-200 text-slate-800 shadow-xl'
    }`}>
      
      {/* Header */}
      <div className={`flex items-center justify-between pb-3 border-b ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-500" />
          <h3 className={`text-xs font-black tracking-wider uppercase ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Corridor Filters
          </h3>
        </div>
        <button
          onClick={() => {
            setSelectedState('all');
            onResetFilters();
          }}
          className={`flex items-center gap-1 text-[11px] font-medium transition-colors ${
            isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'
          }`}
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* State / Region Selector */}
      <div>
        <span className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${
          isDark ? 'text-slate-200' : 'text-slate-700'
        }`}>
          <Compass className="w-3.5 h-3.5 text-blue-500" />
          <span>State / Region</span>
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'all', label: 'All (59)' },
            { id: 'Gujarat', label: 'Gujarat' },
            { id: 'Rajasthan', label: 'Rajasthan' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => {
                setSelectedState(st.id);
                setSelectedCity('all');
              }}
              className={`py-1.5 text-center rounded-xl text-xs font-bold transition-all border ${
                selectedState === st.id
                  ? st.id === 'Rajasthan'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30 border-amber-400'
                    : 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border-blue-500'
                  : isDark
                    ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border-slate-800'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* 08:30 AM Daily Inflow Filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-bold flex items-center gap-1.5 ${
            isDark ? 'text-slate-200' : 'text-slate-700'
          }`}>
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>08:30 AM Inflows</span>
          </span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-600 font-mono font-bold">
            Daily Auto
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'All Inflows' },
            { id: 'today', label: '🌅 Today (8:30 AM)' },
            { id: '2026-09-28', label: '28 Sep Batch' },
            { id: '2026-09-27', label: '27 Sep Batch' },
          ].map((batch) => (
            <button
              key={batch.id}
              onClick={() => setActiveBatch(batch.id)}
              className={`text-left px-2.5 py-2 rounded-xl text-xs transition-all border ${
                activeBatch === batch.id
                  ? 'bg-amber-500/20 text-amber-600 border-amber-500 font-bold shadow-md shadow-amber-500/10'
                  : isDark
                    ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border-slate-800'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {batch.label}
            </button>
          ))}
        </div>
      </div>

      {/* Corridor Cities (Gujarat & Rajasthan) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-bold flex items-center gap-1.5 ${
            isDark ? 'text-slate-200' : 'text-slate-700'
          }`}>
            <Milestone className="w-3.5 h-3.5 text-blue-500" />
            <span>
              {selectedState === 'Gujarat' ? '13 Gujarat Hubs' : selectedState === 'Rajasthan' ? '8 Rajasthan Hubs' : '21 Industrial Hubs'}
            </span>
          </span>
          <span className={`text-[10px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>NH-48/58</span>
        </div>

        {/* Quick Search for Hubs */}
        <div className="relative mb-2">
          <Search className={`w-3.5 h-3.5 absolute left-2.5 top-2.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
          <input
            type="text"
            placeholder="Search city / hub..."
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            className={`w-full text-xs pl-8 pr-2.5 py-1.5 rounded-xl border transition-all ${
              isDark 
                ? 'bg-slate-900/90 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-blue-500' 
                : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500'
            }`}
          />
        </div>

        <div className="max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
          <button
            onClick={() => {
              if (onSelectCity) onSelectCity('all');
              else setSelectedCity('all');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
              selectedCity === 'all'
                ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30 ring-1 ring-blue-400'
                : isDark
                  ? 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800/80'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span>All Hubs in View</span>
              {selectedCity === 'all' && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
              selectedCity === 'all' 
                ? 'bg-blue-800 text-white' 
                : isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
            }`}>
              {totalHubsCount}
            </span>
          </button>

          {displayedCities.map((city, idx) => {
            const count = masterCounts[city] || 0;
            const isSelected = selectedCity === city;
            const isRaj = RAJASTHAN_CITIES.includes(city);

            return (
              <button
                key={city}
                onClick={() => {
                  if (isSelected) {
                    if (onSelectCity) onSelectCity('all');
                    else setSelectedCity('all');
                  } else {
                    if (onSelectCity) onSelectCity(city);
                    else setSelectedCity(city);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all group ${
                  isSelected
                    ? isRaj
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-lg shadow-amber-500/25 ring-2 ring-amber-400 scale-[1.01]'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black shadow-lg shadow-blue-600/25 ring-2 ring-blue-400 scale-[1.01]'
                    : isDark
                      ? 'bg-slate-900/40 hover:bg-slate-800 text-slate-300 border border-slate-800/60 hover:border-slate-700'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={`text-[10px] font-mono ${
                    isSelected 
                      ? isRaj ? 'text-slate-950 font-bold' : 'text-blue-100 font-bold' 
                      : isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    {(idx + 1).toString().padStart(2, '0')}.
                  </span>
                  <span className="truncate">{city}</span>
                  {isRaj && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-mono font-bold ${
                      isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-amber-500/20 text-amber-500'
                    }`}>
                      RJ
                    </span>
                  )}
                  {isSelected && <Check className="w-3 h-3 shrink-0 ml-0.5" />}
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  isSelected 
                    ? isRaj ? 'bg-slate-950 text-amber-300' : 'bg-blue-900 text-blue-100' 
                    : isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}

          {displayedCities.length === 0 && (
            <div className="py-4 text-center text-xs text-slate-400">
              No hubs match "{citySearch}"
            </div>
          )}
        </div>
      </div>

      {/* Business Model Type */}
      <div>
        <span className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${
          isDark ? 'text-slate-200' : 'text-slate-700'
        }`}>
          <Building2 className="w-3.5 h-3.5 text-indigo-500" />
          <span>Business Model</span>
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {['all', 'B2B', 'D2C'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`py-1.5 text-center rounded-xl text-xs font-bold transition-all border ${
                selectedType === type
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border-indigo-500'
                  : isDark
                    ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border-slate-800'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {type === 'all' ? 'All' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Digital Footprint */}
      <div>
        <span className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${
          isDark ? 'text-slate-200' : 'text-slate-700'
        }`}>
          <Globe2 className="w-3.5 h-3.5 text-cyan-500" />
          <span>Digital Status</span>
        </span>
        <div className="space-y-1.5">
          {[
            { id: 'all', label: 'All Statuses' },
            { id: 'No Website', label: '❌ Zero Website (Prime)' },
            { id: 'Outdated', label: '⚠️ Outdated (Revamp)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedWebStatus(item.id)}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all border ${
                selectedWebStatus === item.id
                  ? 'bg-cyan-600/20 text-cyan-600 border-cyan-500 font-bold'
                  : isDark
                    ? 'bg-slate-900/50 hover:bg-slate-800 text-slate-400 border-slate-800/80'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Priority */}
      <div>
        <span className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${
          isDark ? 'text-slate-200' : 'text-slate-700'
        }`}>
          <Flame className="w-3.5 h-3.5 text-rose-500" />
          <span>Lead Priority</span>
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {['all', 'Hot', 'Warm'].map((pri) => (
            <button
              key={pri}
              onClick={() => setSelectedPriority(pri)}
              className={`py-1.5 text-center rounded-xl text-xs font-bold transition-all border ${
                selectedPriority === pri
                  ? pri === 'Hot' 
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 border-rose-500'
                    : 'bg-amber-600 text-white shadow-md shadow-amber-600/30 border-amber-500'
                  : isDark
                    ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border-slate-800'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {pri === 'all' ? 'All' : pri === 'Hot' ? '🔥 Hot' : '⚡ Warm'}
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
}
