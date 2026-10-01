import React from 'react';
import { 
  MapPin, 
  Layers, 
  Flame, 
  Globe2, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Sparkles,
  Milestone
} from 'lucide-react';
import { CORRIDOR_CITIES } from '../data/leadsData';

export default function SidebarFilters({
  selectedCity,
  setSelectedCity,
  selectedType,
  setSelectedType,
  selectedPriority,
  setSelectedPriority,
  selectedWebStatus,
  setSelectedWebStatus,
  selectedStage,
  setSelectedStage,
  activeBatch,
  setActiveBatch,
  leads,
  onResetFilters
}) {
  // Count leads per city
  const cityCounts = leads.reduce((acc, lead) => {
    acc[lead.city] = (acc[lead.city] || 0) + 1;
    return acc;
  }, {});

  const totalFiltered = leads.length;

  return (
    <aside className="w-full lg:w-72 bg-[#0c1222]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 lg:p-5 flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">Corridor Filters</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-blue-400 transition-colors"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 8:30 AM Daily Inflow Filter */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>08:30 AM Daily Inflow</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
            Automated
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'All Inflows' },
            { id: 'today', label: '🌅 Today (08:30 AM)' },
            { id: '2026-09-28', label: '28 Sep Batch' },
            { id: '2026-09-27', label: '27 Sep Batch' },
          ].map((batch) => (
            <button
              key={batch.id}
              onClick={() => setActiveBatch(batch.id)}
              className={`text-left px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                activeBatch === batch.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {batch.label}
            </button>
          ))}
        </div>
      </div>

      {/* Corridor Highway Cities (Surat ➔ Gandhinagar) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Milestone className="w-3.5 h-3.5 text-blue-400" />
            <span>Highway Corridor Hubs</span>
          </span>
          <span className="text-[11px] text-slate-500 font-mono">13 Cities</span>
        </div>

        <div className="max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
          <button
            onClick={() => setSelectedCity('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
              selectedCity === 'all'
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-semibold'
                : 'bg-slate-900/40 hover:bg-slate-800/80 text-slate-400 border border-slate-800/50'
            }`}
          >
            <span>All Corridor Cities</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              36
            </span>
          </button>

          {CORRIDOR_CITIES.map((city, idx) => {
            const count = cityCounts[city] || 0;
            const isSelected = selectedCity === city;
            return (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                    : 'bg-slate-900/30 hover:bg-slate-800/70 text-slate-300 border border-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                    {(idx + 1).toString().padStart(2, '0')}.
                  </span>
                  <span className="truncate">{city}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-blue-800 text-white' : 'bg-slate-800/80 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Business Model Type */}
      <div>
        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2.5">
          <Building2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Business Model</span>
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {['all', 'B2B', 'D2C'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`py-1.5 text-center rounded-xl text-xs font-medium transition-all ${
                selectedType === type
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {type === 'all' ? 'All Types' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Website Presence Status */}
      <div>
        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2.5">
          <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Digital Footprint</span>
        </span>
        <div className="space-y-1.5">
          {[
            { id: 'all', label: 'All Footprints' },
            { id: 'No Website', label: '❌ Zero Website (Prime Pitch)', badge: '25' },
            { id: 'Outdated', label: '⚠️ Outdated Website (Revamp)', badge: '11' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedWebStatus(item.id)}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all ${
                selectedWebStatus === item.id
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 font-medium'
                  : 'bg-slate-900/40 hover:bg-slate-800 text-slate-400 border border-slate-800/60'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lead Priority */}
      <div>
        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2.5">
          <Flame className="w-3.5 h-3.5 text-rose-400" />
          <span>Lead Priority</span>
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {['all', 'Hot', 'Warm'].map((pri) => (
            <button
              key={pri}
              onClick={() => setSelectedPriority(pri)}
              className={`py-1.5 text-center rounded-xl text-xs font-medium transition-all ${
                selectedPriority === pri
                  ? pri === 'Hot' 
                    ? 'bg-rose-600 text-white font-semibold shadow-md shadow-rose-600/30'
                    : 'bg-amber-600 text-white font-semibold shadow-md shadow-amber-600/30'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
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
