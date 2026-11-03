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
  Phone,
  FileDown,
  StickyNote,
  Tag,
  CheckCircle2,
  FileText,
  Share2,
  Globe,
  RefreshCw
} from 'lucide-react';
import { generateQuotationPdf } from '../services/quotationGenerator';

const STATUS_COLOR_MAP = {
  'New Lead': 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  'WhatsApp Sent': 'bg-purple-500/20 text-purple-400 border-purple-500/40',
  'Call Done': 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  'Meeting Fixed': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
  'Deal Closed (Won) 🏆': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold',
  'Cold / Follow Later': 'bg-slate-500/20 text-slate-400 border-slate-500/40',
};

export default function LeadsMatrixTable({ 
  leads, 
  selectedCity = 'all',
  onSelectCity,
  onResetFilters,
  onTriggerCityScan,
  onDeleteLead,
  onOpenPitch, 
  onNavigateMap,
  onOpenNotes,
  onOpenShare,
  onOpenBulkHarvester,
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
  const [downloadingPdfId, setDownloadingPdfId] = useState(null);

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

  const handleDownloadPdf = (lead) => {
    setDownloadingPdfId(lead.id);
    try {
      generateQuotationPdf(lead);
    } catch (err) {
      console.error('Failed to generate PDF quotation:', err);
    }
    setTimeout(() => setDownloadingPdfId(null), 1200);
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
                <span className="text-sm sm:text-base font-black tracking-tight">
                  {selectedCity} Industrial Corridor
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
                  {leads.length} Leads
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Viewing verified B2B enterprises & factory addresses in {selectedCity}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onTriggerCityScan && (
              <button
                onClick={() => onTriggerCityScan(selectedCity)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/30"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Scan {selectedCity}</span>
              </button>
            )}
            <button
              onClick={() => onSelectCity ? onSelectCity('all') : null}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Show All Hubs</span>
            </button>
          </div>
        </div>
      )}

      {/* Control Strip Above Table */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        
        {/* Left: Heading & Count */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base lg:text-lg font-black tracking-tight flex items-center gap-2">
              <span>Verified Prospect Matrix</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold border border-blue-500/30">
                {leads.length}
              </span>
            </h2>
          </div>

          {/* Quick 10-City Harvester Button in Matrix Bar */}
          {onOpenBulkHarvester && (
            <button
              onClick={onOpenBulkHarvester}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 text-white shadow-md shadow-indigo-600/20 hover:opacity-90 animate-pulse"
              title="Harvest 10 Cities at once"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>10-City Harvest</span>
            </button>
          )}

          {/* Financial Pipeline Pills */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono">
            <span className={`px-2 py-1 rounded-lg border ${
              isDark ? 'bg-slate-900 border-slate-800 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}>
              Fee: ₹{(totalPipeline / 100000).toFixed(2)}L
            </span>
            <span className={`px-2 py-1 rounded-lg border ${
              isDark ? 'bg-slate-900 border-slate-800 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}>
              MRR: ₹{(totalMrr / 1000).toFixed(0)}k/mo
            </span>
          </div>
        </div>

        {/* Right: View Mode Toggle (Table / Grid Cards) */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className={`p-1 rounded-xl border flex items-center gap-1 ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Table View (Desktop Recommended)"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Card View (Mobile Recommended)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Swipe Hint */}
      {viewMode === 'table' && (
        <div className="md:hidden mb-2 text-[11px] text-slate-400 flex items-center justify-between px-1">
          <span>👉 Swipe sideways to view address & CRM actions</span>
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
          <table className="w-full text-left border-collapse min-w-[980px]">
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
                <th className="py-3 px-3">CRM Stage</th>
                <th 
                  onClick={() => handleSort('city')} 
                  className="py-3 px-3 cursor-pointer hover:text-blue-500"
                >
                  <div className="flex items-center gap-1">
                    <span>City</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3.5 min-w-[240px]">
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
              {sortedLeads.map((lead) => {
                const leadStatus = lead.status || 'New Lead';
                const statusStyle = STATUS_COLOR_MAP[leadStatus] || 'bg-blue-500/20 text-blue-400 border-blue-500/40';

                return (
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
                          {lead.googleVerified && (
                            <span className="inline-flex items-center gap-0.5 text-[8px] px-1 py-0.2 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 font-bold font-mono">
                              Google
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

                    {/* CRM Stage & Notes Indicator */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex flex-col gap-1 items-start">
                        <button
                          onClick={() => onOpenNotes && onOpenNotes(lead)}
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold border transition-all hover:scale-105 flex items-center gap-1 ${statusStyle}`}
                          title="Click to update CRM status & notes"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          <span>{leadStatus}</span>
                        </button>
                        {lead.notes && (
                          <button
                            onClick={() => onOpenNotes && onOpenNotes(lead)}
                            className="inline-flex items-center gap-1 text-[10px] text-amber-400 hover:text-amber-300 font-mono truncate max-w-[120px]"
                            title={lead.notes}
                          >
                            <FileText className="w-3 h-3 shrink-0" />
                            <span className="truncate">{lead.notes}</span>
                          </button>
                        )}
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
                            'bg-blue-500/15 text-blue-500 border-blue-500/30'
                          }`}>
                            'GJ'
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
                        {lead.websiteUrl ? (
                          <div className="flex flex-col gap-1 items-start">
                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold w-fit bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              <RefreshCw className="w-2.5 h-2.5" />
                              <span>Needs Redesign</span>
                            </span>
                            <a
                              href={lead.websiteUrl.startsWith('http') ? lead.websiteUrl : `http://${lead.websiteUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-mono text-blue-400 hover:text-blue-300 hover:underline max-w-[170px] truncate"
                              title={`Inspect ${lead.websiteUrl}`}
                            >
                              <Globe className="w-3 h-3 text-cyan-400 shrink-0" />
                              <span className="truncate">{lead.websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                              <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                            </a>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-0.5 items-start">
                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold w-fit bg-rose-500/20 text-rose-400 border border-rose-500/30">
                              <Globe className="w-2.5 h-2.5" />
                              <span>No Website</span>
                            </span>
                            <span className={`text-[10px] truncate max-w-[140px] ${
                              isDark ? 'text-slate-500' : 'text-slate-400'
                            }`}>
                              Needs Fresh Portal
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Pipeline Fee */}
                    <td className="py-3 px-3 whitespace-nowrap font-mono">
                      <div className="flex flex-col">
                        <span className={`font-extrabold text-sm ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          ₹{((lead.webCost || 25000) / 1000).toFixed(0)}k
                        </span>
                        <span className="text-[10px] text-emerald-500 font-bold">
                          +₹{((lead.mrr || 3500) / 1000).toFixed(0)}k/mo
                        </span>
                      </div>
                    </td>

                    {/* Actions: CRM Notes, PDF Quote, Pitch, Map */}
                    <td className="py-3 px-3 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* 1. CRM Notes Button */}
                        <button
                          onClick={() => onOpenNotes && onOpenNotes(lead)}
                          className={`p-2 rounded-xl transition-all border shadow-sm ${
                            lead.notes 
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 ring-1 ring-amber-500/50' 
                              : isDark 
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                          }`}
                          title="Notes & CRM Status"
                        >
                          <StickyNote className="w-4 h-4" />
                        </button>

                        {/* 2. 1-Click Quotation PDF Download Button */}
                        <button
                          onClick={() => handleDownloadPdf(lead)}
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-sm ${
                            downloadingPdfId === lead.id
                              ? 'bg-emerald-600 text-white border-emerald-500 animate-bounce'
                              : isDark
                                ? 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border-indigo-500/40'
                                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                          }`}
                          title="Download 1-Click PDF Commercial Proposal"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span className="hidden xl:inline">Quote</span>
                        </button>

                        {/* 3. WhatsApp Pitch Button */}
                        <button
                          onClick={() => onOpenPitch(lead)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/30"
                          title="Send WhatsApp Pitch"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Pitch</span>
                        </button>

                        {/* 4. Share Lead Dossier Button */}
                        <button
                          onClick={() => onOpenShare && onOpenShare(lead)}
                          className={`p-2 rounded-xl transition-all border shadow-sm ${
                            isDark 
                              ? 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border-blue-500/40' 
                              : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                          }`}
                          title="Share Complete Lead Dossier"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>

                        {/* 5. Map */}
                        <button
                          onClick={() => onNavigateMap(lead)}
                          className={`p-2 rounded-xl transition-all border shadow-sm ${
                            isDark 
                              ? 'bg-slate-800 hover:bg-slate-700 text-rose-400 border-slate-700' 
                              : 'bg-slate-100 hover:bg-slate-200 text-rose-600 border-slate-200'
                          }`}
                          title="Open Google Maps Route"
                        >
                          <MapPin className="w-4 h-4" />
                        </button>

                        {/* Delete (if provided) */}
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
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* CARD GRID VIEW (Optimized for Mobile & Tablet Touch Screens) */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {sortedLeads.map((lead) => {
            const leadStatus = lead.status || 'New Lead';
            const statusStyle = STATUS_COLOR_MAP[leadStatus] || 'bg-blue-500/20 text-blue-400 border-blue-500/40';

            return (
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
                      {/* CRM Status Tag */}
                      <button
                        onClick={() => onOpenNotes && onOpenNotes(lead)}
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold border transition-all ${statusStyle}`}
                      >
                        {leadStatus}
                      </button>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {lead.city}
                      </span>
                      <button
                        onClick={() => onOpenShare && onOpenShare(lead)}
                        className={`p-1 rounded-lg border transition-all ${
                          isDark ? 'bg-slate-800 text-blue-400 border-slate-700 hover:bg-slate-700' : 'bg-white text-blue-600 border-slate-200 hover:bg-slate-100'
                        }`}
                        title="Share Lead"
                      >
                        <Share2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Company Name */}
                  <h3 className={`text-sm sm:text-base font-bold transition-colors leading-snug ${
                    isDark ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'
                  }`}>
                    {lead.name}
                  </h3>
                  <p className={`text-xs mt-0.5 mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {lead.category} • <span className="font-mono text-[11px] text-blue-400">{lead.zone}</span>
                  </p>

                  {/* Digital Footprint / Website Bar */}
                  <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                    {lead.websiteUrl ? (
                      <>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                          <RefreshCw className="w-2.5 h-2.5" />
                          <span>Needs Redesign</span>
                        </span>
                        <a
                          href={lead.websiteUrl.startsWith('http') ? lead.websiteUrl : `http://${lead.websiteUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-blue-400 hover:text-blue-300 hover:underline bg-blue-500/10 px-2 py-0.5 rounded-lg border border-blue-500/20"
                          title="Open website"
                        >
                          <Globe className="w-3 h-3 text-cyan-400" />
                          <span>{lead.websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                        </a>
                      </>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                        <Globe className="w-2.5 h-2.5" />
                        <span>Zero Website (Build First Portal)</span>
                      </span>
                    )}
                  </div>

                  {/* Client Notes Preview if available */}
                  {lead.notes && (
                    <div 
                      onClick={() => onOpenNotes && onOpenNotes(lead)}
                      className={`p-2 rounded-xl mb-2 text-xs border cursor-pointer ${
                        isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}
                    >
                      <div className="flex items-center gap-1 font-bold text-[10px] uppercase text-amber-400 mb-0.5">
                        <StickyNote className="w-3 h-3" />
                        <span>Client Note:</span>
                      </div>
                      <p className="line-clamp-2 text-[11px]">{lead.notes}</p>
                    </div>
                  )}

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
                        ₹{((lead.webCost || 25000) / 1000).toFixed(0)}k
                      </span>
                      <span className="text-[10px] text-emerald-600 font-mono block">
                        +₹{((lead.mrr || 3500) / 1000).toFixed(0)}k/mo
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: 5 Touch-Friendly Targets for Mobile / Cards */}
                <div className={`pt-2.5 border-t grid grid-cols-5 gap-1 sm:gap-1.5 ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}>
                  {/* 1. CRM Notes */}
                  <button
                    onClick={() => onOpenNotes && onOpenNotes(lead)}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all border ${
                      lead.notes 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                        : isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                    title="Notes & Stage"
                  >
                    <StickyNote className="w-3.5 h-3.5 text-amber-400" />
                    <span>Notes</span>
                  </button>

                  {/* 2. PDF Quote */}
                  <button
                    onClick={() => handleDownloadPdf(lead)}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all border ${
                      isDark
                        ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    }`}
                    title="Download Quotation PDF"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Quote</span>
                  </button>

                  {/* 3. Share Lead Dossier */}
                  <button
                    onClick={() => onOpenShare && onOpenShare(lead)}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all border ${
                      isDark
                        ? 'bg-blue-600/20 text-blue-300 border-blue-500/40 hover:bg-blue-600/30'
                        : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                    }`}
                    title="Share Lead Details"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>

                  {/* 4. Direct Phone Call */}
                  <a
                    href={`tel:${lead.phone}`}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all border ${
                      isDark
                        ? 'bg-blue-600/15 text-blue-400 border-blue-500/30'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}
                    title={`Call ${lead.dm}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>

                  {/* 5. WhatsApp Pitch */}
                  <button
                    onClick={() => onOpenPitch(lead)}
                    className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 py-1.5 sm:py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] sm:text-xs font-bold transition-all shadow-md shadow-emerald-600/30"
                    title="WhatsApp Pitch"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Pitch</span>
                  </button>
                </div>
              </div>
            );
          })}
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
                View All Hubs
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
