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
  Check,
  X
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
  onClose,
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
    : CORRIDOR_CITIES;

  const displayedCities = baseCities.filter((city) =>
    city.toLowerCase().includes(citySearch.trim().toLowerCase())
  );

  const totalHubsCount = baseCities.reduce((sum, c) => sum + (masterCounts[c] || 0), 0);

  return (
    <>
      {/* Slide-over Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <aside className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm h-full overflow-y-auto rounded-r-3xl p-4 sm:p-5 flex flex-col gap-5 shadow-2xl border transition-all ${
        isDark 
          ? 'bg-[#0c1222] border-slate-800 text-slate-100 shadow-2xl' 
          : 'bg-white border-slate-200 text-slate-800 shadow-2xl'
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
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (setSelectedState) setSelectedState('all');
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

            {/* Close Button on Mobile */}
            {onClose && (
              <button
                onClick={onClose}
                className={`lg:hidden p-1 rounded-lg ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* State / Region Selector */}
        <div>
          <span className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${
            isDark ? 'text-slate-200' : 'text-slate-700'
          }`}>
            <Compass className="w-3.5 h-3.5 text-blue-500" />
            <span>State / Region</span>
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'all', label: `All (${(allLeads.length > 0 ? allLeads : leads).length})` },
              { id: 'Gujarat', label: `Gujarat (${(allLeads.length > 0 ? allLeads : leads).filter(l => l.state === 'Gujarat').length})` },
              
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  setSelectedState(st.id);
                  setSelectedCity('all');
                }}
                className={`py-1.5 px-1 text-center rounded-xl text-xs font-bold transition-all border ${
                  selectedState === st.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border-blue-500'
                    : isDark
                      ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Corridor Hubs Navigation list */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold flex items-center gap-1.5 ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}>
              <Milestone className="w-3.5 h-3.5 text-indigo-400" />
              <span>Corridor Hubs ({baseCities.length})</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-500 font-bold">
              {totalHubsCount} Leads
            </span>
          </div>

          {/* Quick city search */}
          <div className="relative mb-2">
            <Search className={`w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`} />
            <input
              type="text"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              placeholder="Filter cities..."
              className={`w-full pl-8 pr-6 py-1 rounded-xl text-xs transition-all border focus:outline-none ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-blue-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-600'
              }`}
            />
            {citySearch && (
              <button
                onClick={() => setCitySearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400"
              >
                ✕
              </button>
            )}
          </div>

          {/* City selection pills */}
          <div className="max-h-56 overflow-y-auto space-y-1 custom-scrollbar pr-1">
            <button
              onClick={() => {
                if (onSelectCity) onSelectCity('all');
                else setSelectedCity('all');
              }}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                selectedCity === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border-blue-500 font-bold'
                  : isDark
                    ? 'bg-slate-900/40 hover:bg-slate-800/80 text-slate-300 border-slate-800/80'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <span>All 21 Hubs</span>
              <span className={`text-[10px] px-2 py-0.2 rounded-full font-mono font-bold ${
                selectedCity === 'all'
                  ? 'bg-white text-blue-700'
                  : isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
              }`}>
                {(allLeads.length > 0 ? allLeads : leads).length}
              </span>
            </button>

            {displayedCities.map((city) => {
              const totalCount = masterCounts[city] || 0;
              const isSelected = selectedCity.toLowerCase() === city.toLowerCase();
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
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all border ${
                    isSelected
                      ? isRaj
                        ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 border-amber-500 font-bold'
                        : 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border-blue-500 font-bold'
                      : isDark
                        ? 'bg-slate-900/40 hover:bg-slate-800/80 text-slate-300 border-slate-800/80'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      isSelected 
                        ? 'bg-white' 
                        : isRaj ? 'bg-amber-500' : 'bg-blue-500'
                    }`} />
                    <span className="truncate">{city}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold shrink-0 ${
                    isSelected
                      ? 'bg-white text-slate-900'
                      : totalCount > 0 
                        ? isDark ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-800'
                        : isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {totalCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Batch / Inflow Filter */}
        <div>
          <span className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${
            isDark ? 'text-slate-200' : 'text-slate-700'
          }`}>
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Harvester Timestamp</span>
          </span>
          <div className="flex flex-col gap-1.5">
            {[
              { id: 'all', label: 'All Historic Leads' },
              { id: 'today', label: "🌅 Today's 08:30 AM Fresh" },
              { id: '2026-09-28', label: '28 Sep 2026 Batch' },
              { id: '2026-09-27', label: '27 Sep 2026 Batch' },
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveBatch(b.id)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  activeBatch === b.id
                    ? b.id === 'today'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30 border-amber-400'
                      : 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border-blue-500'
                    : isDark
                      ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border-slate-800'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                <span>{b.label}</span>
                {activeBatch === b.id && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Business Type */}
        <div>
          <span className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${
            isDark ? 'text-slate-200' : 'text-slate-700'
          }`}>
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Industrial Type</span>
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {['all', 'B2B', 'D2C'].map((tp) => (
              <button
                key={tp}
                onClick={() => setSelectedType(tp)}
                className={`py-1.5 text-center rounded-xl text-xs font-bold transition-all border ${
                  selectedType === tp
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border-indigo-500'
                    : isDark
                      ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border-slate-800'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                {tp === 'all' ? 'All' : tp}
              </button>
            ))}
          </div>
        </div>

        {/* Website Presence */}
        <div>
          <span className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${
            isDark ? 'text-slate-200' : 'text-slate-700'
          }`}>
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Web Presence Status</span>
          </span>
          <div className="flex flex-col gap-1.5">
            {[
              { 
                id: 'all', 
                label: 'All Digital Footprints',
                count: (allLeads.length > 0 ? allLeads : leads).length
              },
              { 
                id: 'Needs Redesign', 
                label: '🔄 Needs Redesign (Has Old Site)',
                count: (allLeads.length > 0 ? allLeads : leads).filter(l => Boolean(l.websiteUrl && l.websiteUrl.trim()) || (l.website || '').toLowerCase().includes('redesign') || (l.website || '').toLowerCase().includes('outdated')).length
              },
              { 
                id: 'No Website', 
                label: '❌ Zero Website (Build New)',
                count: (allLeads.length > 0 ? allLeads : leads).filter(l => !l.websiteUrl && (l.website || '').toLowerCase().includes('no')).length
              },
            ].map((ws) => (
              <button
                key={ws.id}
                onClick={() => setSelectedWebStatus(ws.id)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  selectedWebStatus === ws.id
                    ? ws.id === 'No Website'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 border-rose-500'
                      : ws.id === 'Needs Redesign'
                        ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 border-amber-500'
                        : 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border-blue-500'
                    : isDark
                      ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border-slate-800'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="truncate">{ws.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                    selectedWebStatus === ws.id
                      ? 'bg-white/20 text-white'
                      : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {ws.count}
                  </span>
                  {selectedWebStatus === ws.id && <Check className="w-3.5 h-3.5 shrink-0" />}
                </div>
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
          <div className="grid grid-cols-2 gap-1.5">
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

        {/* Mobile Sticky Bottom Action Button */}
        {onClose && (
          <div className="lg:hidden mt-2 pt-3 border-t border-slate-800 sticky bottom-0 bg-inherit pb-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/40 flex items-center justify-center gap-2"
            >
              <span>Apply & View {leads.length} Leads</span>
            </button>
          </div>
        )}

      </aside>
    </>
  );
}
