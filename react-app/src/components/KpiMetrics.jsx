import React from 'react';
import { 
  Users, 
  IndianRupee, 
  Globe2, 
  MapPin, 
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

  const cards = [
    {
      title: 'Total Corridor Accounts',
      value: totalLeads,
      badge: `+${todayCount} Today 8:30 AM`,
      badgeColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      subtitle: `${hotLeads} Hot High-Priority Deals`,
      icon: Users,
      iconColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Web Dev Pipeline Value',
      value: `₹${(totalWebDev / 100000).toFixed(1)} Lakhs`,
      badge: `+₹${(totalMrr / 100000).toFixed(1)}L/mo MRR`,
      badgeColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      subtitle: 'Targeting FY 2026-27 Budgets',
      icon: IndianRupee,
      iconColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Zero-Website Opportunity',
      value: `${noWebPercentage}%`,
      badge: `${noWebCount} Zero-Web Accounts`,
      badgeColor: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      subtitle: 'Manufacturers with NO Online Portal',
      icon: Globe2,
      iconColor: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      title: 'Physical Meeting Ready',
      value: '100% Verified',
      badge: '13 GIDC Hubs',
      badgeColor: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      subtitle: '36 Exact Factory Addresses Mapped',
      icon: MapPin,
      iconColor: 'text-rose-500 bg-rose-500/10 border-rose-500/20'
    }
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`rounded-2xl p-5 border transition-all shadow-sm hover:shadow-md flex flex-col justify-between ${
              isDark 
                ? 'bg-[#111726] border-slate-800 text-slate-100 hover:border-slate-700' 
                : 'bg-white border-slate-200 text-slate-900 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {card.title}
                </span>
                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${card.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl lg:text-3xl font-black tracking-tight">
                  {card.value}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>
            </div>

            <div className={`mt-4 pt-3 border-t text-xs flex items-center justify-between ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
            }`}>
              <span>{card.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
