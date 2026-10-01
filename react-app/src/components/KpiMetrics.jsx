import React from 'react';
import { 
  Users, 
  IndianRupee, 
  Globe2, 
  TrendingUp, 
  Sparkles, 
  Building2, 
  Flame, 
  CheckCircle2, 
  Navigation 
} from 'lucide-react';

export default function KpiMetrics({ leads, todayCount, theme = 'dark' }) {
  const isDark = theme === 'dark';

  const totalLeads = leads.length;
  const totalWebDev = leads.reduce((acc, l) => acc + (l.webCost || 0), 0);
  const totalMrr = leads.reduce((acc, l) => acc + (l.mrr || 0), 0);
  const noWebCount = leads.filter(l => l.website === 'No Website').length;
  const noWebPercentage = totalLeads > 0 ? Math.round((noWebCount / totalLeads) * 100) : 0;
  const hotLeads = leads.filter(l => l.priority === 'Hot').length;

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-6">
      
      {/* Metric 1: Corridor Pipeline Size */}
      <div className={`relative overflow-hidden rounded-2xl p-4 lg:p-5 shadow-xl transition-all border group ${
        isDark 
          ? 'bg-[#0c1222]/90 border-slate-800/90 hover:border-blue-500/50 text-slate-100' 
          : 'bg-white border-slate-200 hover:border-blue-500/50 text-slate-900 shadow-md'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Total Corridor Volume
          </span>
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className={`text-3xl font-black tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {totalLeads}
          </span>
          <span className="text-xs font-bold text-emerald-500 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3" />
            +{todayCount} 08:30 Inflow
          </span>
        </div>
        <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-xs ${
          isDark ? 'border-slate-800/60 text-slate-400' : 'border-slate-100 text-slate-500'
        }`}>
          <span>Surat ➔ Gandhinagar</span>
          <span className="text-rose-500 font-bold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            {hotLeads} Hot Deals
          </span>
        </div>
      </div>

      {/* Metric 2: Estimated Pipeline Revenue */}
      <div className={`relative overflow-hidden rounded-2xl p-4 lg:p-5 shadow-xl transition-all border group ${
        isDark 
          ? 'bg-[#0c1222]/90 border-slate-800/90 hover:border-emerald-500/50 text-slate-100' 
          : 'bg-white border-slate-200 hover:border-emerald-500/50 text-slate-900 shadow-md'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Corridor Revenue Value
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
            <IndianRupee className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-black text-emerald-500 tracking-tight">
            ₹{(totalWebDev / 100000).toFixed(1)}L
          </span>
          <span className={`text-xs font-mono font-semibold ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            + ₹{(totalMrr / 100000).toFixed(1)}L/mo
          </span>
        </div>
        <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-xs ${
          isDark ? 'border-slate-800/60 text-slate-400' : 'border-slate-100 text-slate-500'
        }`}>
          <span>Fiscal Year 2026-27</span>
          <span className="text-emerald-500 font-bold">100% Pipeline Value</span>
        </div>
      </div>

      {/* Metric 3: Zero-Web Dominance Opportunity */}
      <div className={`relative overflow-hidden rounded-2xl p-4 lg:p-5 shadow-xl transition-all border group ${
        isDark 
          ? 'bg-[#0c1222]/90 border-slate-800/90 hover:border-cyan-500/50 text-slate-100' 
          : 'bg-white border-slate-200 hover:border-cyan-500/50 text-slate-900 shadow-md'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Zero-Website Opportunity
          </span>
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform">
            <Globe2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-black text-cyan-500 tracking-tight">{noWebPercentage}%</span>
          <span className={`text-xs font-semibold ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            ({noWebCount} / {totalLeads} Accounts)
          </span>
        </div>
        <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-xs ${
          isDark ? 'border-slate-800/60 text-slate-400' : 'border-slate-100 text-slate-500'
        }`}>
          <span>Direct Pitch Conversion</span>
          <span className="text-cyan-500 font-bold">Prime Target</span>
        </div>
      </div>

      {/* Metric 4: Physical Meeting Readiness */}
      <div className={`relative overflow-hidden rounded-2xl p-4 lg:p-5 shadow-xl transition-all border group ${
        isDark 
          ? 'bg-[#0c1222]/90 border-slate-800/90 hover:border-indigo-500/50 text-slate-100' 
          : 'bg-white border-slate-200 hover:border-indigo-500/50 text-slate-900 shadow-md'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            In-Person Meeting Readiness
          </span>
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
            <Navigation className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-black text-indigo-500 tracking-tight">100%</span>
          <span className={`text-xs font-mono ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>13 Hubs Mapped</span>
        </div>
        <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-xs ${
          isDark ? 'border-slate-800/60 text-slate-400' : 'border-slate-100 text-slate-500'
        }`}>
          <span>NH-48 & NE-1 Route</span>
          <span className="text-indigo-500 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Factory GPS
          </span>
        </div>
      </div>

    </div>
  );
}
