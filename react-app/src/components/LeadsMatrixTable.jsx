import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Navigation, 
  MessageCircle, 
  PhoneCall, 
  Flame, 
  ArrowUpDown, 
  LayoutGrid, 
  Table as TableIcon, 
  Sparkles, 
  Clock, 
  Copy, 
  Check, 
  Search, 
  ExternalLink, 
  RotateCcw, 
  Zap, 
  Trash2,
  Phone
} from 'lucide-react';

export default function LeadsMatrixTable({ 
  leads, 
  selectedCity = 'all',
  onSelectCity,
  onResetFilters,
  onTriggerCityScan,
  onDeleteLead,
  onOpenPitch, 
  onNavigateMap,
  theme = 'dark'
}) {
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'grid';
    }
    return 'table';
  });

  const [sortField, setSortField] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const isDark = theme === 'dark';

  // Sorting
  const sortedLeads = [...leads].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === 'string') {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortAsc ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const copyAddress = (lead) => {
    navigator.clipboard.writeText(`${lead.name}, ${lead.address}`);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalPipeline = leads.reduce((sum, l) => sum + (l.webCost || 0), 0);
  const totalMrr = leads.reduce((sum, l) => sum + (l.mrr || 0), 0);

  return (
    <div 
      id="leads-table-section" 
      className={`w-full rounded-2xl sm:rounded-3xl p-3 sm:p-5 lg:p-6 transition-colors border shadow-2xl backdrop-blur-xl mb-6 ${
        isDark 
          ? 'bg-[#0c1222]/95 border-slate-800/90 text-slate-100' 
          : 'bg-white border-slate-200 text-slate-900 shadow-xl'
      }`}
    >
      
      {/* Active City Filter Highlight Ribbon */}
      {selectedCity !== 'all' && (
        <div className={`mb-4 sm:mb-5 p-3 sm:p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 border shadow-xl transition-all ${
          isDark 
            ? 'bg-gradient-to-r from-blue-950/80 via-slate-900/95 to-indigo-950/80 border-blue-500/40 text-slate-100' 
            : 'bg-gradient-to-r from-blue-50 via-white to-indigo-50 border-blue-300 text-slate-900'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0 shadow-lg shadow-blue-500/20">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-blue-400">
                  Active Hub:
                </span>
                <span className="text-sm sm:text-base font-black px-2.5 py-0.5 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-600/30">
                  {selectedCity}
                </span>
                <span className={`text-[11px] sm:text-xs px-2 py-0.5 rounded-full font-mono font-bold ${
                  isDark ? 'bg-slate-800 text-slate-200 border border-slate-700' : 'bg-white text-slate-800 border border-slate-300'
                }`}>
                  {leads.length} {leads.length === 1 ? 'Lead' : 'Leads'}
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-extrabold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  ₹{(totalPipeline / 1000).toFixed(0)}k (+₹{(totalMrr / 1000).toFixed(0)}k/mo)
                </span>
              </div>
              <p className={`text-[11px] sm:text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Verified factory and office locations in <strong className={isDark ? 'text-white' : 'text-slate-900'}>{selectedCity}</strong> with direct GPS routes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 flex-wrap">
            {onTriggerCityScan && (
              <button
                onClick={() => onTriggerCityScan(selectedCity)}
                className="text-xs px-3 py-1.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md shadow-emerald-600/30 flex items-center gap-1.5"
                title={`Run live Overpass API harvester for ${selectedCity}`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Harvest API</span>
              </button>
            )}

            <button
              onClick={() => onSelectCity ? onSelectCity('all') : null}
              className="text-xs px-3 py-1.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold transition-all border border-slate-700 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>All 21 Hubs</span>
            </button>
          </div>
        </div>
      )}

      {/* Table Header & View Controls */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b ${
        isDark ? 'border-slate-800/80' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shadow-md shadow-blue-500/10 shrink-0">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className={`text-sm sm:text-base lg:text-lg font-black tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Corridor Leads Intelligence
              </h2>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-500 font-mono font-bold border border-blue-500/30">
                {leads.length} Leads
              </span>
            </div>
            <p className={`text-[10px] sm:text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Physical factories & meeting routes across Gujarat & Rajasthan
            </p>
          </div>
        </div>

        {/* View Switcher: Table vs Cards */}
        <div className={`flex items-center gap-1 p-1 rounded-xl border self-start sm:self-auto shadow-inner ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cards</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table</span>
          </button>
        </div>
      </div>

      {/* Swipe hint on mobile when table view is active */}
      {viewMode === 'table' && (
        <div className="md:hidden mb-2 px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-500 font-medium flex items-center justify-between">
          <span>👉 Swipe sideways to view address & contact</span>
          <button 
            onClick={() => setViewMode('grid')} 
            className="underline font-bold text-amber-400"
          >
            Switch to Cards
          </button>
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' ? (
        <div className={`overflow-x-auto w-full custom-scrollbar rounded-2xl border touch-pan-x ${
          isDark ? 'border-slate-800/80 bg-slate-950/40' : 'border-slate-200 bg-white'
        }`}>
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className={`border-b text-[11px] font-bold uppercase tracking-wider sticky top-0 z-10 backdrop-blur-md ${
                isDark 
                  ? 'border-slate-800 text-slate-300 bg-slate-950/90' 
                  : 'border-slate-200 text-slate-700 bg-slate-100'
              }`}>
                <th 
                  onClick={() => handleSort('id')} 
                  className="py-3 px-3 cursor-pointer hover:text-blue-500"
                >
                  <div className="flex items-center gap-1">
                    <span>ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('name')} 
                  className="py-3 px-3.5 cursor-pointer hover:text-blue-500"
                >
                  <div className="flex items-center gap-1">
                    <span>Company & Owner</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('city')} 
                  className="py-3 px-3 cursor-pointer hover:text-blue-500"
                >
                  <div className="flex items-center gap-1">
                    <span>City & Hub</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3.5 min-w-[260px]">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Physical Meeting Address</span>
                  </div>
                </th>
                <th className="py-3 px-3">Opportunity</th>
                <th 
                  onClick={() => handleSort('webCost')} 
                  className="py-3 px-3 cursor-pointer hover:text-blue-500"
                >
                  <div className="flex items-center gap-1">
                    <span>Pipeline</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y text-xs ${
              isDark ? 'divide-slate-800/60' : 'divide-slate-200'
            }`}>
              {sortedLeads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className={`transition-colors ${
                    isDark ? 'hover:bg-slate-800/50' : 'hover:bg-blue-50/60'
                  }`}
                >
                  {/* ID + Inflow Badge */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-blue-500 font-bold">{lead.id}</span>
                        {lead.apiSynced && (
                          <span className="inline-flex items-center gap-0.5 text-[8px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold font-mono">
                            <Zap className="w-2 h-2" />
                            <span>API</span>
                          </span>
                        )}
                      </div>
                      {lead.isNewToday ? (
                        <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500 border border-amber-500/40 font-bold uppercase w-fit">
                          <Clock className="w-2.5 h-2.5 animate-pulse" />
                          <span>08:30 Fresh</span>
                        </span>
                      ) : (
                        <span className={`text-[10px] font-mono ${
                          isDark ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                          {lead.batchDate}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Company Name & Decision Maker */}
                  <td className="py-3 px-3.5">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-bold transition-colors ${
                          isDark ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'
                        }`}>
                          {lead.name}
                        </span>
                        {lead.priority === 'Hot' && (
                          <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-500 border border-rose-500/30 text-[9px] font-bold flex items-center gap-0.5">
                            <Flame className="w-3 h-3 text-rose-500" />
                            HOT
                          </span>
                        )}
                      </div>
                      <div className={`flex items-center gap-2 mt-1 text-[11px] ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        <span className="font-medium">{lead.dm}</span>
                        <span>•</span>
                        <a href={`tel:${lead.phone}`} className="font-mono text-blue-500 hover:underline">
                          {lead.phone}
                        </a>
                      </div>
                    </div>
                  </td>

                  {/* City & Zone */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                          {lead.city}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold border ${
                          lead.state === 'Rajasthan'
                            ? 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                            : 'bg-blue-500/15 text-blue-500 border-blue-500/30'
                        }`}>
                          {lead.state === 'Rajasthan' ? 'RJ' : 'GJ'}
                        </span>
                      </div>
                      <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {lead.zone}
                      </span>
                    </div>
                  </td>

                  {/* Physical Address + Direct Google Map Link */}
                  <td className="py-3 px-3.5">
                    <div className={`border rounded-xl p-2.5 max-w-md ${
                      isDark ? 'bg-[#080d1a] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <p className={`text-[11px] line-clamp-2 leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {lead.address}
                      </p>
                      <div className="mt-1.5 flex items-center gap-3">
                        <button
                          onClick={() => onNavigateMap(lead)}
                          className="inline-flex items-center gap-1 text-[11px] text-rose-500 hover:text-rose-600 font-bold"
                          title="Open Google Maps Route"
                        >
                          <Navigation className="w-3 h-3" />
                          <span>Navigate Map</span>
                        </button>
                        <button
                          onClick={() => copyAddress(lead)}
                          className={`inline-flex items-center gap-1 text-[10px] ${
                            isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          {copiedId === lead.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === lead.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Web Opportunity */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold w-fit ${
                        lead.website === 'No Website'
                          ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-600 border border-amber-500/30'
                      }`}>
                        {lead.website}
                      </span>
                      <span className={`text-[10px] truncate max-w-[140px] ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {lead.category}
                      </span>
                    </div>
                  </td>

                  {/* Pipeline Fee */}
                  <td className="py-3 px-3 whitespace-nowrap font-mono">
                    <div className="flex flex-col">
                      <span className={`font-extrabold text-sm ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        ₹{(lead.webCost / 1000).toFixed(0)}k
                      </span>
                      <span className="text-[10px] text-emerald-500 font-bold">
                        +₹{(lead.mrr / 1000).toFixed(0)}k/mo
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onNavigateMap(lead)}
                        className={`p-2 rounded-xl transition-all border shadow-sm ${
                          isDark 
                            ? 'bg-slate-800 hover:bg-slate-700 text-rose-400 border-slate-700' 
                            : 'bg-slate-100 hover:bg-slate-200 text-rose-600 border-slate-200'
                        }`}
                        title="Open Map Route"
                      >
                        <MapPin className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onOpenPitch(lead)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/30"
                        title="Send WhatsApp Pitch"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Pitch</span>
                      </button>

                      {onDeleteLead && (
                        <button
                          onClick={() => onDeleteLead(lead.id)}
                          className={`p-1.5 rounded-xl transition-all border ${
                            isDark 
                              ? 'bg-slate-900 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 border-slate-800' 
                              : 'bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 border-slate-200'
                          }`}
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* CARD GRID VIEW (Optimized for Mobile & Tablet Touch Screens) */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {sortedLeads.map((lead) => (
            <div
              key={lead.id}
              className={`rounded-2xl p-3.5 sm:p-4 transition-all duration-200 flex flex-col justify-between border shadow-lg ${
                isDark 
                  ? 'bg-slate-900/80 border-slate-800/90 hover:border-blue-500/50' 
                  : 'bg-slate-50 border-slate-200 hover:border-blue-500'
              }`}
            >
              <div>
                {/* Card Top Pill */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-blue-500 text-xs font-bold">{lead.id}</span>
                    {lead.isNewToday && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-500 text-[9px] font-bold">
                        08:30
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {lead.city}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold border ${
                      lead.state === 'Rajasthan'
                        ? 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                        : 'bg-blue-500/15 text-blue-500 border-blue-500/30'
                    }`}>
                      {lead.state === 'Rajasthan' ? 'RJ' : 'GJ'}
                    </span>
                    {lead.priority === 'Hot' && (
                      <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-500 text-[9px] font-bold flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5" />
                        HOT
                      </span>
                    )}
                  </div>
                </div>

                {/* Company Name */}
                <h3 className={`text-sm sm:text-base font-bold transition-colors leading-snug ${
                  isDark ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'
                }`}>
                  {lead.name}
                </h3>
                <p className={`text-xs mt-0.5 mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {lead.category} • <span className="font-mono text-[11px] text-blue-400">{lead.zone}</span>
                </p>

                {/* Address Box with Direct Navigation Button */}
                <div className={`border rounded-xl p-2.5 mb-2.5 text-xs ${
                  isDark ? 'bg-[#080d1a] border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className={`line-clamp-2 text-[11px] leading-relaxed font-sans ${
                        isDark ? 'text-slate-200' : 'text-slate-700'
                      }`}>
                        {lead.address}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <button
                          onClick={() => copyAddress(lead)}
                          className={`inline-flex items-center gap-1 text-[10px] ${
                            isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          {copiedId === lead.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === lead.id ? 'Address Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact & Value */}
                <div className={`grid grid-cols-2 gap-2 text-xs mb-3 p-2 rounded-xl ${
                  isDark ? 'bg-slate-950/60 text-slate-400' : 'bg-white text-slate-600 border border-slate-200'
                }`}>
                  <div>
                    <span className="text-[10px] block font-semibold">Decision Maker</span>
                    <span className={`font-bold truncate block ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      {lead.dm}
                    </span>
                    <a href={`tel:${lead.phone}`} className="text-[11px] font-mono text-blue-500 hover:underline flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" />
                      <span>{lead.phone}</span>
                    </a>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] block font-semibold">Pipeline Potential</span>
                    <span className="font-mono text-emerald-500 font-bold text-sm">
                      ₹{(lead.webCost / 1000).toFixed(0)}k
                    </span>
                    <span className="text-[10px] text-emerald-600 font-mono block">
                      +₹{(lead.mrr / 1000).toFixed(0)}k/mo
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: 3 Touch-Friendly Targets for Phones */}
              <div className={`pt-2.5 border-t grid grid-cols-3 gap-1.5 sm:gap-2 ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                {/* 1. Map Route */}
                <button
                  onClick={() => onNavigateMap(lead)}
                  className={`flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                    isDark 
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700' 
                      : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                  title="Open GPS Route in Google Maps"
                >
                  <Navigation className="w-3.5 h-3.5 text-rose-500" />
                  <span>Map</span>
                </button>

                {/* 2. Direct Phone Call */}
                <a
                  href={`tel:${lead.phone}`}
                  className={`flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                    isDark
                      ? 'bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 border-blue-500/30'
                      : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                  }`}
                  title={`Call ${lead.dm}`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>

                {/* 3. WhatsApp Pitch */}
                <button
                  onClick={() => onOpenPitch(lead)}
                  className="flex items-center justify-center gap-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/30"
                  title="Personalized WhatsApp Pitch"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Pitch</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fallback if 0 results */}
      {sortedLeads.length === 0 && (
        <div className={`py-10 px-4 text-center rounded-2xl border ${
          isDark ? 'border-slate-800 bg-slate-900/40 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
        }`}>
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mx-auto mb-2">
            <Building2 className="w-5 h-5" />
          </div>
          <p className="text-sm sm:text-base font-bold">
            {selectedCity !== 'all' 
              ? `No leads found in "${selectedCity}" matching current additional filters.` 
              : 'No leads match the current filters.'}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
            {selectedCity !== 'all' && (
              <button
                onClick={() => onSelectCity ? onSelectCity('all') : null}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30"
              >
                View All 21 Hubs
              </button>
            )}
            {onResetFilters && (
              <button
                onClick={onResetFilters}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border ${
                  isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-white text-slate-800 border-slate-300'
                }`}
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
