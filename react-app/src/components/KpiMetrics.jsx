import React from 'react';
import { 
  Users, 
  IndianRupee, 
  Globe2, 
  MapPin, 
  TrendingUp, 
  Sparkles, 
  Building2,
  CalendarCheck
} from 'lucide-react';

export default function KpiMetrics({ leads, todayCount }) {
  // Aggregate metrics
  const totalLeads = leads.length;
  const totalWebDev = leads.reduce((acc, l) => acc + (l.webCost || 0), 0);
  const totalMrr = leads.reduce((acc, l) => acc + (l.mrr || 0), 0);
  const noWebCount = leads.filter(l => l.website === 'No Website').length;
  const noWebPercentage = totalLeads > 0 ? Math.round((noWebCount / totalLeads) * 100) : 0;
  const hotLeads = leads.filter(l => l.priority === 'Hot').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* Metric 1: Corridor Pipeline Size */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#0b1120] border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 hover:border-blue-500/40 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Corridor Leads</span>
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">{totalLeads}</span>
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
            <Sparkles className="w-3 h-3" />
            +{todayCount} Today 08:30 AM
          </span>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <span>Surat ➔ Gandhinagar</span>
          <span className="text-rose-400 font-medium">🔥 {hotLeads} Hot Deals</span>
        </div>
      </div>

      {/* Metric 2: Estimated Pipeline Revenue */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#0b1120] border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 hover:border-emerald-500/40 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Est. Web Dev Pipeline</span>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <IndianRupee className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
            ₹{(totalWebDev / 100000).toFixed(1)}L
          </span>
          <span className="text-xs text-slate-400 font-mono">
            + ₹{(totalMrr / 100000).toFixed(1)}L/mo
          </span>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <span>Target FY 2026-27</span>
          <span className="text-emerald-400 font-medium">100% High Intent</span>
        </div>
      </div>

      {/* Metric 3: Zero-Web Dominance Opportunity */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#0b1120] border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 hover:border-cyan-500/40 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Zero-Website Dominance</span>
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <Globe2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-cyan-400 tracking-tight">{noWebPercentage}%</span>
          <span className="text-xs font-medium text-slate-300">
            ({noWebCount} / {totalLeads} Leads)
          </span>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <span>Direct Pitch Conversion</span>
          <span className="text-cyan-400 font-medium">Top Priority</span>
        </div>
      </div>

      {/* Metric 4: Corridor Highway Coverage */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#0b1120] border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 hover:border-indigo-500/40 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Highway Corridor Hubs</span>
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <MapPin className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-indigo-400 tracking-tight">13 Hubs</span>
          <span className="text-xs font-mono text-slate-400">320 KM Span</span>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <span>NH-48 & NE-1 Express</span>
          <span className="text-indigo-400 font-medium">Direct Meetings Ready</span>
        </div>
      </div>

    </div>
  );
}
