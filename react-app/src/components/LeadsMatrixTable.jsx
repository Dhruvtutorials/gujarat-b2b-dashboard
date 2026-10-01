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
  Clock, 
  Copy, 
  Check, 
  Search, 
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { CORRIDOR_CITIES } from '../data/leadsData';

export default function LeadsMatrixTable({ 
  leads, 
  onOpenPitch, 
  onNavigateMap,
  theme = 'dark',
  selectedCity,
  setSelectedCity,
  selectedType,
  setSelectedType,
  selectedPriority,
  setSelectedPriority,
  selectedWebStatus,
  setSelectedWebStatus,
  searchQuery,
  setSearchQuery,
  onResetFilters
}) {
  const [viewMode, setViewMode] = useState('table');
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

  return (
    <div className={`w-full rounded-2xl border transition-colors shadow-sm overflow-hidden ${
      isDark ? 'bg-[#111726] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      
      {/* 1. Clean Integrated Filter Bar */}
      <div className={`p-4 lg:p-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-3 ${
        isDark ? 'border-slate-800 bg-[#0d1322]' : 'border-slate-200 bg-slate-50/70'
      }`}>
        
        {/* Left: Search Box */}
        <div className="relative flex-1 max-w-sm">
          <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
            isDark ? 'text-slate-400' : 'text-slate-400'
          }`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, GIDC hub, owner, address..."
            className={`w-full pl-10 pr-8 py-2 rounded-xl text-xs transition-all border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              isDark 
                ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500' 
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Center: Dropdown Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* City Dropdown */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none ${
              isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
            }`}
          >
            <option value="all">All 13 Cities ({CORRIDOR_CITIES.length})</option>
            {CORRIDOR_CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          {/* Model Type */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none ${
              isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
            }`}
          >
            <option value="all">All Types</option>
            <option value="B2B">B2B Wholesale</option>
            <option value="D2C">D2C Brand</option>
          </select>

          {/* Digital Status */}
          <select
            value={selectedWebStatus}
            onChange={(e) => setSelectedWebStatus(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none ${
              isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
            }`}
          >
            <option value="all">All Web Status</option>
            <option value="No Website">❌ Zero Website (Prime)</option>
            <option value="Outdated">⚠️ Outdated Web (Revamp)</option>
          </select>

          {/* Priority */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none ${
              isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
            }`}
          >
            <option value="all">All Priority</option>
            <option value="Hot">🔥 Hot Priority</option>
            <option value="Warm">⚡ Warm Priority</option>
          </select>

          {/* Reset Filters */}
          <button
            onClick={onResetFilters}
            className={`p-2 rounded-xl border transition-all ${
              isDark ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white' : 'bg-white border-slate-300 text-slate-600 hover:text-slate-900'
            }`}
            title="Reset All Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Table / Cards Switcher */}
        <div className={`flex items-center gap-1 p-1 rounded-xl border shrink-0 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
        }`}>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white shadow-sm'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white shadow-sm'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cards</span>
          </button>
        </div>

      </div>

      {/* Swipe Guide on Mobile */}
      <div className="md:hidden px-4 py-2 text-[11px] text-amber-500 font-medium bg-amber-500/10 border-b border-amber-500/20">
        👉 Swipe table horizontally to see full factory addresses & phone numbers
      </div>

      {/* 2. TABLE VIEW */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto w-full custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[980px]">
            <thead>
              <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                isDark ? 'border-slate-800 text-slate-400 bg-slate-900/60' : 'border-slate-200 text-slate-600 bg-slate-100/80'
              }`}>
                <th onClick={() => handleSort('id')} className="py-3 px-4 cursor-pointer hover:text-blue-500 w-28">
                  <div className="flex items-center gap-1">
                    <span>ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th onClick={() => handleSort('name')} className="py-3 px-4 cursor-pointer hover:text-blue-500">
                  <div className="flex items-center gap-1">
                    <span>Company & Industry</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th onClick={() => handleSort('city')} className="py-3 px-4 cursor-pointer hover:text-blue-500 w-36">
                  <div className="flex items-center gap-1">
                    <span>City & Zone</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 min-w-[280px]">
                  <div className="flex items-center gap-1.5 text-rose-500 font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>In-Person Meeting Address</span>
                  </div>
                </th>
                <th className="py-3 px-4 w-40">Decision Maker</th>
                <th onClick={() => handleSort('webCost')} className="py-3 px-4 cursor-pointer hover:text-blue-500 w-32">
                  <div className="flex items-center gap-1">
                    <span>Pipeline Fee</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right w-28">Action</th>
              </tr>
            </thead>
            <tbody className={`divide-y text-xs ${
              isDark ? 'divide-slate-800/80' : 'divide-slate-200'
            }`}>
              {sortedLeads.map((lead) => (
                <tr 
                  key={lead.id}
                  className={`transition-colors ${
                    isDark ? 'hover:bg-slate-800/50' : 'hover:bg-blue-50/50'
                  }`}
                >
                  {/* ID + Fresh Tag */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-blue-500 font-bold">{lead.id}</span>
                      {lead.isNewToday ? (
                        <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-500 border border-amber-500/30 font-bold uppercase w-fit">
                          <Clock className="w-2.5 h-2.5 animate-pulse" />
                          <span>8:30 Fresh</span>
                        </span>
                      ) : (
                        <span className={`text-[10px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                          {lead.batchDate}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Company & Sector */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {lead.name}
                        </span>
                        {lead.priority === 'Hot' && (
                          <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-500 border border-rose-500/30 text-[9px] font-bold flex items-center gap-0.5">
                            <Flame className="w-3 h-3" />
                            HOT
                          </span>
                        )}
                      </div>
                      <span className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {lead.category}
                      </span>
                    </div>
                  </td>

                  {/* City & Zone */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {lead.city}
                      </span>
                      <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {lead.zone}
                      </span>
                    </div>
                  </td>

                  {/* Physical Address + Maps Link */}
                  <td className="py-3.5 px-4">
                    <div className={`p-2.5 rounded-xl border ${
                      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <p className={`text-[11px] leading-relaxed line-clamp-2 ${
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

                  {/* Decision Maker & Phone */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {lead.dm}
                      </span>
                      <a 
                        href={`tel:${lead.phone}`}
                        className="font-mono text-[11px] text-blue-500 hover:underline mt-0.5 inline-flex items-center gap-1"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>{lead.phone}</span>
                      </a>
                    </div>
                  </td>

                  {/* Pipeline Fee & Web Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono">
                    <div className="flex flex-col">
                      <span className={`font-extrabold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        ₹{(lead.webCost / 1000).toFixed(0)}k
                      </span>
                      <span className="text-[10px] text-emerald-500 font-bold">
                        +₹{(lead.mrr / 1000).toFixed(0)}k/mo
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-sans font-bold w-fit mt-0.5 ${
                        lead.website === 'No Website' 
                          ? 'bg-rose-500/15 text-rose-500' 
                          : 'bg-amber-500/15 text-amber-600'
                      }`}>
                        {lead.website}
                      </span>
                    </div>
                  </td>

                  {/* Pitch Action */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => onOpenPitch(lead)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
                      title="Send WhatsApp Pitch"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Pitch</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* CARDS VIEW */
        <div className="p-4 lg:p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sortedLeads.map((lead) => (
            <div
              key={lead.id}
              className={`p-4 rounded-2xl border transition-all shadow-sm flex flex-col justify-between ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-blue-500 text-xs font-bold">{lead.id}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {lead.city}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      lead.type === 'B2B' ? 'bg-indigo-500/20 text-indigo-500' : 'bg-purple-500/20 text-purple-500'
                    }`}>
                      {lead.type}
                    </span>
                  </div>
                </div>

                <h3 className={`text-sm font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lead.name}
                </h3>
                <p className={`text-xs mt-0.5 mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {lead.category}
                </p>

                {/* Address Box */}
                <div className={`p-3 rounded-xl border mb-3 text-xs ${
                  isDark ? 'bg-[#080d1a] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                }`}>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <p className="line-clamp-2 text-[11px] leading-relaxed">
                      {lead.address}
                    </p>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border grid grid-cols-2 gap-2 text-xs mb-3 ${
                  isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-white border-slate-200'
                }`}>
                  <div>
                    <span className={`text-[10px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Contact
                    </span>
                    <span className={`font-semibold truncate block ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      {lead.dm}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Pipeline
                    </span>
                    <span className="font-mono text-emerald-500 font-bold">
                      ₹{(lead.webCost / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
              </div>

              <div className={`pt-3 border-t grid grid-cols-2 gap-2 ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <button
                  onClick={() => onNavigateMap(lead)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                    isDark 
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700' 
                      : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <Navigation className="w-3.5 h-3.5 text-rose-500" />
                  <span>Map Route</span>
                </button>
                <button
                  onClick={() => onOpenPitch(lead)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/30"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Pitch</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Zero Leads fallback */}
      {sortedLeads.length === 0 && (
        <div className="py-12 text-center">
          <p className={`text-base font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            No leads match current filters.
          </p>
          <button
            onClick={onResetFilters}
            className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Footer Count */}
      <div className={`px-4 py-3 border-t text-xs flex items-center justify-between ${
        isDark ? 'border-slate-800 bg-[#0d1322] text-slate-400' : 'border-slate-200 bg-slate-50/70 text-slate-600'
      }`}>
        <span>Showing {sortedLeads.length} of {leads.length} Corridor Leads</span>
        <span className="font-mono">Surat ➔ Gandhinagar Corridor</span>
      </div>

    </div>
  );
}
