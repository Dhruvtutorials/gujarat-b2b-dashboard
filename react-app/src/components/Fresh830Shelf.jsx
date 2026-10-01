import React from 'react';
import { 
  Clock, 
  MapPin, 
  Navigation, 
  MessageCircle, 
  Sparkles, 
  ExternalLink, 
  Building2, 
  UserCheck, 
  IndianRupee,
  PhoneCall
} from 'lucide-react';

export default function Fresh830Shelf({ freshLeads, onOpenPitch, onNavigateMap }) {
  if (!freshLeads || freshLeads.length === 0) return null;

  return (
    <div className="mb-6 bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-indigo-500/10 border-2 border-amber-500/30 rounded-3xl p-5 lg:p-6 shadow-xl shadow-amber-500/5 relative overflow-hidden backdrop-blur-xl">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-amber-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md shadow-amber-500/20">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">
                🌅 Today's 08:30 AM Fresh Lead Inflow
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider animate-pulse">
                Hot Inflow
              </span>
            </div>
            <p className="text-xs text-amber-200/70">
              High-priority prospects scanned at 08:30 AM today with full physical factory & office addresses ready for in-person meetings.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs font-mono text-amber-300/80 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl">
            Batch Timestamp: Today, 08:30 AM IST
          </span>
        </div>
      </div>

      {/* Fresh Leads Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {freshLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-[#0b101d]/90 border border-slate-800/90 hover:border-amber-400/50 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10 flex flex-col justify-between group"
          >
            <div>
              {/* Card Top: ID & City */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-mono font-semibold">
                  {lead.id}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-semibold">
                    {lead.city} ({lead.zone})
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    lead.type === 'B2B' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-purple-500/20 text-purple-300'
                  }`}>
                    {lead.type}
                  </span>
                </div>
              </div>

              {/* Company Title */}
              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                {lead.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 mb-2.5">{lead.category}</p>

              {/* Physical Meeting Address Box */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 mb-3 text-xs">
                <div className="flex items-start gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <p className="line-clamp-2 text-[11px] text-slate-300 leading-relaxed font-sans">
                    {lead.address}
                  </p>
                </div>
              </div>

              {/* Contact info & Web Status */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-3 text-slate-400">
                <div className="flex items-center gap-1.5 truncate">
                  <UserCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="text-slate-200 truncate">{lead.dm}</span>
                </div>
                <div className="flex items-center justify-end gap-1 font-mono text-emerald-400 font-semibold">
                  <span>₹{(lead.webCost / 1000).toFixed(0)}k</span>
                  <span className="text-slate-500 text-[10px]">+₹{(lead.mrr / 1000).toFixed(0)}k/m</span>
                </div>
              </div>
            </div>

            {/* Actions: Map Route & WhatsApp Pitch */}
            <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigateMap(lead)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all border border-slate-700"
                title="Open Google Maps Route for In-Person Meeting"
              >
                <Navigation className="w-3.5 h-3.5 text-rose-400" />
                <span>Map Route</span>
              </button>

              <button
                onClick={() => onOpenPitch(lead)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-emerald-600/20"
                title="Send WhatsApp Pitch with Physical Meeting Invitation"
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
