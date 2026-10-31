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
  const noWebCount = leads.filter(l => (l.website || '').toLowerCase().includes('no') || (l.website || '').toLowerCase().includes('zero')).length;
  const noWebPercentage = totalLeads > 0 ? Math.round((noWebCount / totalLeads) * 100) : 0;
  const hotLeads = leads.filter(l => (l.priority || '').toLowerCase().includes('hot')).length;
  const uniqueHubs = new Set(leads.map(l => l.city)).size;

  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 mb-4 sm:mb-6">
      
      {/* Metric 1: Corridor Pipeline Size */}
      <div className={`relative overflow-hidden rounded-2xl p-3 sm:p-4 lg:p-5 shadow-xl transition-all border group ${
        isDark 
          ? 'bg-[#0c1222]/90 border-slate-800/90 hover:border-blue-500/50 text-slate-100' 
          : 'bg-white border-slate-200 hover:border-blue-500/50 text-slate-900 shadow-md'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate mr-1 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Corridor Volume
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5 flex-wrap">
          <span className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {totalLeads}
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded-full">
            <Sparkles className="w-2.5 h-2.5" />
            +{todayCount} 08:30
          </span>
        </div>
        <div className={`mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t flex items-center justify-between text-[10px] sm:text-xs ${
          isDark ? 'border-slate-800/60 text-slate-400' : 'border-slate-100 text-slate-500'
        }`}>
          <span className="hidden sm:inline">Gujarat & RJ</span>
          <span className="text-rose-500 font-bold flex items-center gap-1">
            <Flame className="w-3 h-3" />
            {hotLeads} Hot Deals
          </span>
        </div>
      </div>

      {/* Metric 2: Estimated Pipeline Revenue */}
      <div className={`relative overflow-hidden rounded-2xl p-3 sm:p-4 lg:p-5 shadow-xl transition-all border group ${
        isDark 
          ? 'bg-[#0c1222]/90 border-slate-800/90 hover:border-emerald-500/50 text-slate-100' 
          : 'bg-white border-slate-200 hover:border-emerald-500/50 text-slate-900 shadow-md'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate mr-1 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Pipeline Value
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
            <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-500 tracking-tight">
            ₹{(totalWebDev / 100000).toFixed(1)}L
          </span>
          <span className={`text-[10px] sm:text-xs font-mono font-semibold ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            +₹{(totalMrr / 100000).toFixed(1)}L/mo
          </span>
        </div>
        <div className={`mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t flex items-center justify-between text-[10px] sm:text-xs ${
          isDark ? 'border-slate-800/60 text-slate-400' : 'border-slate-100 text-slate-500'
        }`}>
          <span className="hidden sm:inline">FY 2026-27</span>
          <span className="text-emerald-500 font-bold">100% Pipeline</span>
        </div>
      </div>

      {/* Metric 3: Zero-Web Dominance Opportunity */}
      <div className={`relative overflow-hidden rounded-2xl p-3 sm:p-4 lg:p-5 shadow-xl transition-all border group ${
        isDark 
          ? 'bg-[#0c1222]/90 border-slate-800/90 hover:border-cyan-500/50 text-slate-100' 
          : 'bg-white border-slate-200 hover:border-cyan-500/50 text-slate-900 shadow-md'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate mr-1 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Zero-Website
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 shrink-0">
            <Globe2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-xl sm:text-2xl lg:text-3xl font-black text-cyan-500 tracking-tight">{noWebPercentage}%</span>
          <span className={`text-[10px] sm:text-xs font-semibold ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            ({noWebCount} Accts)
          </span>
        </div>
        <div className={`mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t flex items-center justify-between text-[10px] sm:text-xs ${
          isDark ? 'border-slate-800/60 text-slate-400' : 'border-slate-100 text-slate-500'
        }`}>
          <span className="hidden sm:inline">Direct Pitch</span>
          <span className="text-cyan-500 font-bold">Prime Target</span>
        </div>
      </div>

      {/* Metric 4: Physical Meeting Readiness */}
      <div className={`relative overflow-hidden rounded-2xl p-3 sm:p-4 lg:p-5 shadow-xl transition-all border group ${
        isDark 
          ? 'bg-[#0c1222]/90 border-slate-800/90 hover:border-indigo-500/50 text-slate-100' 
          : 'bg-white border-slate-200 hover:border-indigo-500/50 text-slate-900 shadow-md'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate mr-1 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Meeting Ready
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 shrink-0">
            <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-xl sm:text-2xl lg:text-3xl font-black text-indigo-500 tracking-tight">100%</span>
          <span className={`text-[10px] sm:text-xs font-mono ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>{uniqueHubs} Hubs</span>
        </div>
        <div className={`mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t flex items-center justify-between text-[10px] sm:text-xs ${
          isDark ? 'border-slate-800/60 text-slate-400' : 'border-slate-100 text-slate-500'
        }`}>
          <span className="hidden sm:inline">Western Route</span>
          <span className="text-indigo-500 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Verified GPS
          </span>
        </div>
      </div>

    </div>
  );
}
