import React from 'react';
import { 
  Users, 
  IndianRupee, 
  Globe2, 
  MapPin, 
  TrendingUp, 
  Sparkles, 
  Building2,
  CalendarCheck,
  Flame,
  CheckCircle2,
  Navigation
} from 'lucide-react';

export default function KpiMetrics({ leads, todayCount }) {
  const totalLeads = leads.length;
  const totalWebDev = leads.reduce((acc, l) => acc + (l.webCost || 0), 0);
  const totalMrr = leads.reduce((acc, l) => acc + (l.mrr || 0), 0);
  const noWebCount = leads.filter(l => l.website === 'No Website').length;
  const noWebPercentage = totalLeads > 0 ? Math.round((noWebCount / totalLeads) * 100) : 0;
  const hotLeads = leads.filter(l => l.priority === 'Hot').length;

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-6">
      
      {/* Metric 1: Corridor Pipeline Size */}
      <div className="relative overflow-hidden bg-[#0c1222]/90 border border-slate-800/90 hover:border-blue-500/50 rounded-2xl p-4 lg:p-5 shadow-xl backdrop-blur-xl transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Corridor Volume
          </span>
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-black text-white tracking-tight">{totalLeads}</span>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3" />
            +{todayCount} 08:30 Inflow
          </span>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <span>Surat ➔ Gandhinagar</span>
          <span className="text-rose-400 font-bold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            {hotLeads} Hot Deals
          </span>
        </div>
      </div>

      {/* Metric 2: Estimated Pipeline Revenue */}
      <div className="relative overflow-hidden bg-[#0c1222]/90 border border-slate-800/90 hover:border-emerald-500/50 rounded-2xl p-4 lg:p-5 shadow-xl backdrop-blur-xl transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Corridor Revenue Value
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <IndianRupee className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-black text-emerald-400 tracking-tight">
            ₹{(totalWebDev / 100000).toFixed(1)}L
          </span>
          <span className="text-xs text-slate-400 font-mono font-semibold">
            + ₹{(totalMrr / 100000).toFixed(1)}L/mo
          </span>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <span>Fiscal Year 2026-27</span>
          <span className="text-emerald-400 font-bold">100% Pipeline Value</span>
        </div>
      </div>

      {/* Metric 3: Zero-Web Dominance Opportunity */}
      <div className="relative overflow-hidden bg-[#0c1222]/90 border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl p-4 lg:p-5 shadow-xl backdrop-blur-xl transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Zero-Website Opportunity
          </span>
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <Globe2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-black text-cyan-400 tracking-tight">{noWebPercentage}%</span>
          <span className="text-xs font-semibold text-slate-300">
            ({noWebCount} / {totalLeads} Accounts)
          </span>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <span>Direct Pitch Conversion</span>
          <span className="text-cyan-400 font-bold">Prime Target</span>
        </div>
      </div>

      {/* Metric 4: Physical Meeting Readiness */}
      <div className="relative overflow-hidden bg-[#0c1222]/90 border border-slate-800/90 hover:border-indigo-500/50 rounded-2xl p-4 lg:p-5 shadow-xl backdrop-blur-xl transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            In-Person Meeting Readiness
          </span>
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <Navigation className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-black text-indigo-400 tracking-tight">100%</span>
          <span className="text-xs font-mono text-slate-400">13 Hubs Mapped</span>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <span>NH-48 & NE-1 Route</span>
          <span className="text-indigo-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Factory GPS
          </span>
        </div>
      </div>

    </div>
  );
}
