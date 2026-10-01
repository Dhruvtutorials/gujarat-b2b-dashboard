import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Navigation, 
  MessageCircle, 
  ExternalLink, 
  PhoneCall, 
  Star, 
  Flame, 
  Calendar, 
  ArrowUpDown, 
  LayoutGrid, 
  Table as TableIcon,
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function LeadsMatrixTable({ 
  leads, 
  onOpenPitch, 
  onNavigateMap 
}) {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [sortField, setSortField] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);

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

  return (
    <div className="bg-[#0c1222]/90 border border-slate-800/90 rounded-2xl p-4 lg:p-5 shadow-xl backdrop-blur-md">
      
      {/* Table Header & View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                Highway Corridor Leads Intelligence Matrix
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">
                {leads.length} Active Leads
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Verified factory addresses & direct navigation links from Surat to Gandhinagar
            </p>
          </div>
        </div>

        {/* View Switcher: Table vs Cards */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cards</span>
          </button>
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-900/50">
                <th 
                  onClick={() => handleSort('id')} 
                  className="py-3 px-3 cursor-pointer hover:text-blue-400"
                >
                  <div className="flex items-center gap-1">
                    <span>ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('name')} 
                  className="py-3 px-3 cursor-pointer hover:text-blue-400"
                >
                  <div className="flex items-center gap-1">
                    <span>Company & Decision Maker</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('city')} 
                  className="py-3 px-3 cursor-pointer hover:text-blue-400"
                >
                  <div className="flex items-center gap-1">
                    <span>City & Zone</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 min-w-[260px]">
                  <div className="flex items-center gap-1 text-amber-300">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>Physical Meeting Address</span>
                  </div>
                </th>
                <th className="py-3 px-3">Digital Presence</th>
                <th 
                  onClick={() => handleSort('webCost')} 
                  className="py-3 px-3 cursor-pointer hover:text-blue-400"
                >
                  <div className="flex items-center gap-1">
                    <span>Value</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {sortedLeads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Lead ID + Inflow Tag */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-blue-400 font-semibold">{lead.id}</span>
                      {lead.isNewToday ? (
                        <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase w-fit">
                          <Clock className="w-2.5 h-2.5 animate-pulse" />
                          <span>08:30 Fresh</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">
                          {lead.batchDate}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Company Name & Decision Maker */}
                  <td className="py-3 px-3">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white group-hover:text-blue-300 transition-colors">
                          {lead.name}
                        </span>
                        {lead.priority === 'Hot' && (
                          <Flame className="w-3.5 h-3.5 text-rose-400 shrink-0" title="Hot Prospect" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-slate-400 text-[11px]">
                        <span>{lead.dm}</span>
                        <span>•</span>
                        <span className="font-mono text-slate-500">{lead.phone}</span>
                      </div>
                    </div>
                  </td>

                  {/* City & Zone */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-200">{lead.city}</span>
                      <span className="text-[11px] text-slate-400">{lead.zone}</span>
                    </div>
                  </td>

                  {/* Physical Address + Direct Google Map Link */}
                  <td className="py-3 px-3">
                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2 max-w-sm">
                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                        {lead.address}
                      </p>
                      <button
                        onClick={() => onNavigateMap(lead)}
                        className="mt-1 inline-flex items-center gap-1 text-[10px] text-rose-400 hover:text-rose-300 font-semibold"
                        title="Open Google Maps Route"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Navigate to Factory</span>
                      </button>
                    </div>
                  </td>

                  {/* Web Status & Category */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium w-fit ${
                        lead.website === 'No Website'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {lead.website}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                        {lead.category}
                      </span>
                    </div>
                  </td>

                  {/* Revenue Value */}
                  <td className="py-3 px-3 whitespace-nowrap font-mono">
                    <div className="flex flex-col">
                      <span className="text-white font-bold">₹{(lead.webCost / 1000).toFixed(0)}k</span>
                      <span className="text-[10px] text-emerald-400">+₹{(lead.mrr / 1000).toFixed(0)}k/mo</span>
                    </div>
                  </td>

                  {/* Direct Actions */}
                  <td className="py-3 px-3 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onNavigateMap(lead)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded-lg transition-all"
                        title="Open Map Location"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onOpenPitch(lead)}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-all shadow-sm shadow-emerald-600/20"
                        title="Send WhatsApp Pitch"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Pitch</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* CARD GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-blue-400 text-xs font-semibold">{lead.id}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                      {lead.city}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      lead.type === 'B2B' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {lead.type}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                  {lead.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 mb-2.5">{lead.category}</p>

                {/* Address Box */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 mb-3 text-xs">
                  <div className="flex items-start gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <p className="line-clamp-2 text-[11px] text-slate-300 leading-relaxed">
                      {lead.address}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3 text-slate-400">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Decision Maker</span>
                    <span className="text-slate-200 font-medium truncate block">{lead.dm}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 text-[10px] block">Pipeline Value</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      ₹{(lead.webCost / 1000).toFixed(0)}k <span className="text-slate-400 text-[10px]">+₹{(lead.mrr / 1000).toFixed(0)}k/m</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onNavigateMap(lead)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all border border-slate-700"
                >
                  <Navigation className="w-3.5 h-3.5 text-rose-400" />
                  <span>Map Route</span>
                </button>
                <button
                  onClick={() => onOpenPitch(lead)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Pitch</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Zero Leads Fallback */}
      {sortedLeads.length === 0 && (
        <div className="py-12 text-center text-slate-400">
          <p className="text-base font-semibold text-slate-300">No leads match the current filters.</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the city or inflow batch filter from the left sidebar.</p>
        </div>
      )}

    </div>
  );
}
