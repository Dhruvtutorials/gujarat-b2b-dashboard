import React from 'react';
import { 
  TrendingUp, 
  PieChart, 
  Sparkles, 
  Milestone, 
  Globe2, 
  Building2 
} from 'lucide-react';

export default function VisualAnalytics({ leads, theme = 'dark' }) {
  const isDark = theme === 'dark';

  const cityAggregates = [
    { city: 'Surat', rev: 255000, mrr: 137000, leads: 4, tag: 'Textile & Diamonds' },
    { city: 'Ankleshwar', rev: 235000, mrr: 110000, leads: 3, tag: 'Chemical GIDC' },
    { city: 'Bharuch & Dahej', rev: 375000, mrr: 165000, leads: 5, tag: 'PCPIR Port' },
    { city: 'Vadodara', rev: 380000, mrr: 175000, leads: 5, tag: 'Engineering Hub' },
    { city: 'Anand & Nadiad', rev: 360000, mrr: 177000, leads: 5, tag: 'Food Tech' },
    { city: 'Ahmedabad', rev: 490000, mrr: 235000, leads: 6, tag: 'Mega Industrial' },
    { city: 'Gandhinagar', rev: 275000, mrr: 135000, leads: 3, tag: 'Capital & IT' },
  ];

  const maxRev = 500000;

  const b2bCount = leads.filter(l => l.type === 'B2B').length;
  const d2cCount = leads.filter(l => l.type === 'D2C').length;
  const total = leads.length || 1;
  const b2bPercent = Math.round((b2bCount / total) * 100);
  const d2cPercent = 100 - b2bPercent;

  const noWeb = leads.filter(l => l.website === 'No Website').length;
  const outdatedWeb = total - noWeb;
  const noWebPercent = Math.round((noWeb / total) * 100);
  const outdatedPercent = 100 - noWebPercent;

  return (
    <div className={`w-full rounded-2xl border p-5 lg:p-6 transition-colors shadow-sm mb-6 ${
      isDark ? 'bg-[#111726] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-700/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight">
              Corridor Revenue Velocity & Market Breakdown
            </h2>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Estimated Web Development pipeline and monthly retainers across Gujarat industrial corridor.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-blue-500 font-bold">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
            <span>Web Dev Contract</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            <span>Monthly MRR</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* City Revenue Velocity Bars (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Hub-by-Hub Revenue Velocity (₹ Lakhs)
          </h3>

          <div className="space-y-3.5 pt-1">
            {cityAggregates.map((item) => {
              const revWidth = `${Math.min(100, Math.round((item.rev / maxRev) * 100))}%`;
              const mrrWidth = `${Math.min(100, Math.round(((item.mrr * 2.5) / maxRev) * 100))}%`;

              return (
                <div key={item.city} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        {item.city}
                      </span>
                      <span className={`text-[10px] hidden sm:inline ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        ({item.tag})
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.leads} leads
                      </span>
                    </div>
                    <div className="font-mono text-xs">
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        ₹{(item.rev / 1000).toFixed(0)}k
                      </span>
                      <span className="text-emerald-500 font-bold ml-1.5">
                        +₹{(item.mrr / 1000).toFixed(0)}k/mo
                      </span>
                    </div>
                  </div>

                  <div className={`w-full h-3 rounded-full overflow-hidden flex gap-1 p-0.5 border ${
                    isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <div 
                      style={{ width: revWidth }} 
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    />
                    <div 
                      style={{ width: mrrWidth }} 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donut Distributions (1 Col) */}
        <div className="space-y-4">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Segment Distribution
          </h3>

          {/* Card 1: B2B vs D2C */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Business Model
              </span>
              <span className="text-indigo-500 font-mono font-bold">{b2bCount} B2B / {d2cCount} D2C</span>
            </div>

            <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
              <div style={{ width: `${b2bPercent}%` }} className="bg-indigo-600 h-full" />
              <div style={{ width: `${d2cPercent}%` }} className="bg-purple-500 h-full" />
            </div>

            <div className="flex items-center justify-between mt-2.5 text-xs">
              <span className="text-indigo-500 font-semibold">B2B Wholesale ({b2bPercent}%)</span>
              <span className="text-purple-500 font-semibold">D2C Brands ({d2cPercent}%)</span>
            </div>
          </div>

          {/* Card 2: Zero-Web Opportunity */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Digital Gap
              </span>
              <span className="text-cyan-500 font-mono font-bold">{noWeb} Zero-Web</span>
            </div>

            <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
              <div style={{ width: `${noWebPercent}%` }} className="bg-cyan-500 h-full" />
              <div style={{ width: `${outdatedPercent}%` }} className="bg-amber-500 h-full" />
            </div>

            <div className="flex items-center justify-between mt-2.5 text-xs">
              <span className="text-cyan-500 font-semibold">Zero Website ({noWebPercent}%)</span>
              <span className="text-amber-500 font-semibold">Outdated Web ({outdatedPercent}%)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
