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
  ExternalLink
} from 'lucide-react';

export default function LeadsMatrixTable({ 
  leads, 
  onOpenPitch, 
  onNavigateMap,
  theme = 'dark'
}) {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
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
    <div 
      id="leads-table-section" 
      className={`w-full rounded-3xl p-4 lg:p-6 transition-colors border shadow-2xl backdrop-blur-xl mb-6 ${
        isDark 
          ? 'bg-[#0c1222]/95 border-slate-800/90 text-slate-100' 
          : 'bg-white border-slate-200 text-slate-900 shadow-xl'
      }`}
    >
      
      {/* Table Header & View Controls */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b ${
        isDark ? 'border-slate-800/80' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shadow-md shadow-blue-500/10">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className={`text-base lg:text-lg font-black tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Highway Corridor Leads Intelligence Matrix
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-500 font-mono font-bold border border-blue-500/30">
                {leads.length} Leads Displayed
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Physical factory addresses & verified Google Maps routes from Surat to Gandhinagar
            </p>
          </div>
        </div>

        {/* View Switcher: Table vs Cards */}
        <div className={`flex items-center gap-1.5 p-1.5 rounded-xl border self-start sm:self-auto shadow-inner ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cards View</span>
          </button>
        </div>
      </div>

      {/* Swipe indicator on mobile */}
      <div className="md:hidden mb-2 text-[11px] text-amber-500 font-medium flex items-center gap-1">
        <span>👉 Swipe table sideways to see address & direct actions</span>
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'table' ? (
        <div className={`overflow-x-auto w-full custom-scrollbar rounded-2xl border ${
          isDark ? 'border-slate-800/80 bg-slate-950/40' : 'border-slate-200 bg-white'
        }`}>
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className={`border-b text-[11px] font-bold uppercase tracking-wider sticky top-0 z-10 backdrop-blur-md ${
                isDark 
                  ? 'border-slate-800 text-slate-300 bg-slate-950/90' 
                  : 'border-slate-200 text-slate-700 bg-slate-100'
              }`}>
                <th 
                  onClick={() => handleSort('id')} 
                  className="py-3 px-3.5 cursor-pointer hover:text-blue-500"
                >
                  <div className="flex items-center gap-1">
                    <span>ID / Inflow</span>
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
                  className="py-3 px-3.5 cursor-pointer hover:text-blue-500"
                >
                  <div className="flex items-center gap-1">
                    <span>City & Hub</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3.5 min-w-[280px]">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Physical Meeting Address</span>
                  </div>
                </th>
                <th className="py-3 px-3.5">Digital Opportunity</th>
                <th 
                  onClick={() => handleSort('webCost')} 
                  className="py-3 px-3.5 cursor-pointer hover:text-blue-500"
                >
                  <div className="flex items-center gap-1">
                    <span>Pipeline</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3.5 text-right">Direct Actions</th>
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
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-blue-500 font-bold">{lead.id}</span>
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
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                        {lead.city}
                      </span>
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
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold w-fit ${
                        lead.website === 'No Website'
                          ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-600 border border-amber-500/30'
                      }`}>
                        {lead.website}
                      </span>
                      <span className={`text-[10px] truncate max-w-[150px] ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {lead.category}
                      </span>
                    </div>
                  </td>

                  {/* Pipeline Fee */}
                  <td className="py-3 px-3.5 whitespace-nowrap font-mono">
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
                  <td className="py-3 px-3.5 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
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
                        className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/30"
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sortedLeads.map((lead) => (
            <div
              key={lead.id}
              className={`rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between border shadow-lg ${
                isDark 
                  ? 'bg-slate-900/70 border-slate-800/90 hover:border-blue-500/50' 
                  : 'bg-slate-50 border-slate-200 hover:border-blue-500'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-blue-500 text-xs font-bold">{lead.id}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
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

                <h3 className={`text-sm font-bold transition-colors leading-snug ${
                  isDark ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'
                }`}>
                  {lead.name}
                </h3>
                <p className={`text-xs mt-0.5 mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {lead.category}
                </p>

                {/* Address Box */}
                <div className={`border rounded-xl p-3 mb-3 text-xs ${
                  isDark ? 'bg-[#080d1a] border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <p className={`line-clamp-2 text-[11px] leading-relaxed font-sans ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      {lead.address}
                    </p>
                  </div>
                </div>

                <div className={`grid grid-cols-2 gap-2 text-xs mb-3 p-2 rounded-xl ${
                  isDark ? 'bg-slate-950/60 text-slate-400' : 'bg-white text-slate-600 border border-slate-200'
                }`}>
                  <div>
                    <span className="text-[10px] block font-semibold">Contact</span>
                    <span className={`font-medium truncate block ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      {lead.dm}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] block font-semibold">Est. Pipeline</span>
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
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
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

      {/* Fallback if 0 results */}
      {sortedLeads.length === 0 && (
        <div className="py-12 text-center">
          <p className={`text-base font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            No leads match current filters.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Please reset filters from the sidebar or click "All Highway Leads".
          </p>
        </div>
      )}

    </div>
  );
}
