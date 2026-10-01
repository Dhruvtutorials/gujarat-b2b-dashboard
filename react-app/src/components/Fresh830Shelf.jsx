import React from 'react';
import { 
  Clock, 
  MapPin, 
  Navigation, 
  MessageCircle, 
  Sparkles, 
  Building2, 
  UserCheck, 
  IndianRupee,
  PhoneCall,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';

export default function Fresh830Shelf({ freshLeads, onOpenPitch, onNavigateMap }) {
  if (!freshLeads || freshLeads.length === 0) return null;

  return (
    <div className="w-full mb-6 bg-gradient-to-r from-amber-950/30 via-slate-900/90 to-blue-950/30 border-2 border-amber-500/40 rounded-3xl p-4 lg:p-6 shadow-2xl shadow-amber-500/10 relative overflow-hidden backdrop-blur-2xl">
      
      {/* Ambient background glows */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b border-amber-500/20">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base lg:text-lg font-black text-white tracking-tight flex items-center gap-2">
                <span>🌅 TODAY'S 08:30 AM FRESH LEAD INFLOW</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md shadow-amber-500/40">
                ACTIVE BATCH
              </span>
            </div>
            <p className="text-xs text-amber-200/80 mt-0.5">
              High-priority accounts scanned at 08:30 AM today • Physical factory & office addresses ready for in-person corridor visits.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          <span className="text-xs font-mono text-amber-300 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Today, 08:30 AM IST</span>
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {freshLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-[#0b101e]/90 border border-amber-500/30 hover:border-amber-400/80 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/15 flex flex-col justify-between group"
          >
            <div>
              {/* Card Top Pill */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 border border-blue-500/40 text-blue-400 text-xs font-mono font-bold">
                  {lead.id}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
                    {lead.city} ({lead.zone})
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                    lead.type === 'B2B' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {lead.type}
                  </span>
                </div>
              </div>

              {/* Company Title */}
              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                {lead.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 mb-3">{lead.category}</p>

              {/* Physical Address Callout Box */}
              <div className="bg-[#070b14] border border-slate-800 rounded-xl p-3 mb-3 text-xs shadow-inner">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-rose-400 font-bold block mb-0.5">
                      Direct Meeting Address
                    </span>
                    <p className="text-[11px] text-slate-200 font-sans leading-relaxed">
                      {lead.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact info & Web Status */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-3 text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                <div className="truncate">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Decision Maker</span>
                  <span className="text-slate-100 font-semibold truncate block">{lead.dm}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Pipeline Potential</span>
                  <span className="font-mono text-emerald-400 font-bold text-xs">
                    ₹{(lead.webCost / 1000).toFixed(0)}k <span className="text-slate-400 text-[10px]">+₹{(lead.mrr / 1000).toFixed(0)}k/m</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Direct In-person Navigation & Pitch Actions */}
            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigateMap(lead)}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl text-xs font-bold transition-all border border-slate-700 shadow-sm"
                title="Direct Route to Factory in Google Maps"
              >
                <Navigation className="w-3.5 h-3.5 text-rose-400" />
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
