import React from 'react';
import { 
  Clock, 
  MapPin, 
  Navigation, 
  MessageCircle, 
  Sparkles, 
  PhoneCall, 
  CheckCircle2, 
  IndianRupee 
} from 'lucide-react';

export default function Fresh830Shelf({ freshLeads, onOpenPitch, onNavigateMap, theme = 'dark' }) {
  if (!freshLeads || freshLeads.length === 0) return null;

  const isDark = theme === 'dark';

  return (
    <div className={`w-full rounded-2xl border p-5 lg:p-6 mb-6 transition-colors shadow-sm ${
      isDark ? 'bg-[#111726] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-700/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold tracking-tight">
                🌅 Today's 08:30 AM Fresh Lead Inflow
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                Active Batch
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              New high-priority accounts scanned at 08:30 AM today with full factory addresses ready for in-person meetings.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className={`text-xs font-mono px-3 py-1.5 rounded-xl font-semibold border flex items-center gap-1.5 ${
            isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-amber-50 border-amber-300 text-amber-800'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Today, 08:30 AM IST</span>
          </span>
        </div>
      </div>

      {/* Grid of Fresh Leads */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {freshLeads.map((lead) => (
          <div
            key={lead.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
              isDark 
                ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/50' 
                : 'bg-slate-50 border-slate-200 hover:border-amber-400 shadow-sm'
            }`}
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-mono font-bold">
                  {lead.id}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {lead.city} ({lead.zone})
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    lead.type === 'B2B' ? 'bg-indigo-500/20 text-indigo-500' : 'bg-purple-500/20 text-purple-500'
                  }`}>
                    {lead.type}
                  </span>
                </div>
              </div>

              {/* Title & Category */}
              <h3 className={`text-sm font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lead.name}
              </h3>
              <p className={`text-xs mt-0.5 mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {lead.category}
              </p>

              {/* Physical Meeting Address Box */}
              <div className={`p-3 rounded-xl border mb-3 text-xs ${
                isDark ? 'bg-[#080d1a] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-500 block mb-0.5">
                      Direct Meeting Address
                    </span>
                    <p className="text-[11px] leading-relaxed">
                      {lead.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact info & Web Status */}
              <div className={`p-2.5 rounded-xl border grid grid-cols-2 gap-2 text-xs mb-4 ${
                isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-white border-slate-200'
              }`}>
                <div>
                  <span className={`text-[10px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Decision Maker
                  </span>
                  <span className={`font-semibold truncate block ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {lead.dm}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Pipeline Potential
                  </span>
                  <span className="font-mono text-emerald-500 font-bold text-xs">
                    ₹{(lead.webCost / 1000).toFixed(0)}k <span className="text-[10px] text-slate-400">+₹{(lead.mrr / 1000).toFixed(0)}k/m</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={`pt-3 border-t grid grid-cols-2 gap-2.5 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <button
                onClick={() => onNavigateMap(lead)}
                className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
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
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/30"
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
