import React from 'react';
import { 
  Clock, 
  MapPin, 
  Navigation, 
  MessageCircle, 
  UserCheck, 
  IndianRupee
} from 'lucide-react';

export default function Fresh830Shelf({ freshLeads, onOpenPitch, onNavigateMap, theme = 'dark' }) {
  if (!freshLeads || freshLeads.length === 0) return null;

  const isDark = theme === 'dark';

  return (
    <div className={`w-full mb-6 border-2 rounded-3xl p-4 lg:p-6 shadow-2xl relative overflow-hidden backdrop-blur-2xl transition-colors ${
      isDark 
        ? 'bg-gradient-to-r from-amber-950/30 via-slate-900/90 to-blue-950/30 border-amber-500/40 text-slate-100 shadow-amber-500/10' 
        : 'bg-gradient-to-r from-amber-50/80 via-white to-blue-50/80 border-amber-400 text-slate-900 shadow-lg'
    }`}>
      
      {/* Ambient background glows */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className={`relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b ${
        isDark ? 'border-amber-500/20' : 'border-amber-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500 shadow-lg shadow-amber-500/20">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className={`text-base lg:text-lg font-black tracking-tight flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <span>🌅 TODAY'S 08:30 AM FRESH LEAD INFLOW</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md shadow-amber-500/40">
                ACTIVE BATCH
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-amber-200/80' : 'text-amber-800'}`}>
              High-priority accounts scanned at 08:30 AM today • Physical factory & office addresses ready for in-person corridor visits.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          <span className={`text-xs font-mono px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 shadow-inner border ${
            isDark 
              ? 'text-amber-300 bg-amber-500/15 border-amber-500/30' 
              : 'text-amber-900 bg-amber-100 border-amber-300'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Today, 08:30 AM IST</span>
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {freshLeads.map((lead) => (
          <div
            key={lead.id}
            className={`border rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between group ${
              isDark 
                ? 'bg-[#0b101e]/90 border-amber-500/30 hover:border-amber-400/80 shadow-black/40' 
                : 'bg-white border-amber-300/80 hover:border-amber-500 shadow-md'
            }`}
          >
            <div>
              {/* Card Top Pill */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 border border-blue-500/40 text-blue-500 text-xs font-mono font-bold">
                  {lead.id}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-600 text-xs font-semibold">
                    {lead.city} ({lead.zone})
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                    lead.type === 'B2B' ? 'bg-indigo-500/20 text-indigo-500 border border-indigo-500/30' : 'bg-purple-500/20 text-purple-500 border border-purple-500/30'
                  }`}>
                    {lead.type}
                  </span>
                </div>
              </div>

              {/* Company Title */}
              <h3 className={`text-sm font-bold transition-colors leading-snug ${
                isDark ? 'text-white group-hover:text-amber-300' : 'text-slate-900 group-hover:text-amber-600'
              }`}>
                {lead.name}
              </h3>
              <p className={`text-xs mt-0.5 mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {lead.category}
              </p>

              {/* Physical Address Callout Box */}
              <div className={`border rounded-xl p-3 mb-3 text-xs shadow-inner ${
                isDark ? 'bg-[#070b14] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-rose-500 font-bold block mb-0.5">
                      Direct Meeting Address
                    </span>
                    <p className={`text-[11px] font-sans leading-relaxed ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      {lead.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact info & Web Status */}
              <div className={`grid grid-cols-2 gap-2 text-xs mb-3 p-2.5 rounded-xl border ${
                isDark ? 'bg-slate-900/60 border-slate-800/80 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}>
                <div className="truncate">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Decision Maker</span>
                  <span className={`font-semibold truncate block ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                    {lead.dm}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Pipeline Potential</span>
                  <span className="font-mono text-emerald-500 font-bold text-xs">
                    ₹{(lead.webCost / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
            </div>

            {/* Direct In-person Navigation & Pitch Actions */}
            <div className={`pt-3 border-t grid grid-cols-2 gap-2 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <button
                onClick={() => onNavigateMap(lead)}
                className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border shadow-sm ${
                  isDark 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                }`}
                title="Direct Route to Factory in Google Maps"
              >
                <Navigation className="w-3.5 h-3.5 text-rose-500" />
                <span>Map Route</span>
              </button>

              <button
                onClick={() => onOpenPitch(lead)}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/30"
                title="Open WhatsApp Pitch with Meeting Invitation"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Pitch</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
