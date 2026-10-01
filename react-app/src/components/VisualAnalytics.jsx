import React from 'react';
import { 
  TrendingUp, 
  PieChart, 
  Sparkles,
  Milestone,
  CheckCircle2,
  Globe2,
  Building2
} from 'lucide-react';

export default function VisualAnalytics({ leads }) {
  // City revenue aggregates
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

  // Split calculation
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
    <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
      
      {/* 2-Columns: Highway Corridor Spline / Revenue Chart */}
      <div className="xl:col-span-2 bg-[#0c1222]/90 border border-slate-800/90 rounded-3xl p-4 lg:p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-md shadow-blue-500/10">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  Corridor Revenue Velocity (Surat ➔ Gandhinagar)
                </h3>
                <p className="text-xs text-slate-400">
                  Targeted Web Dev Contract (₹) vs Monthly Retainer (MRR) along Highway Nodes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 shadow-sm shadow-blue-500/50" />
                <span>Web Dev</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                <span>Monthly MRR</span>
              </div>
            </div>
          </div>

          {/* Dual Bar Track List */}
          <div className="space-y-3 pt-1">
            {cityAggregates.map((item) => {
              const revWidth = `${Math.min(100, Math.round((item.rev / maxRev) * 100))}%`;
              const mrrWidth = `${Math.min(100, Math.round(((item.mrr * 2.5) / maxRev) * 100))}%`;

              return (
                <div key={item.city} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{item.city}</span>
                      <span className="text-[10px] text-slate-500 hidden sm:inline">({item.tag})</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
                        {item.leads} leads
                      </span>
                    </div>
                    <div className="font-mono text-xs">
                      <span className="text-white font-bold">₹{(item.rev / 1000).toFixed(0)}k</span>
                      <span className="text-emerald-400 font-bold ml-1.5">+₹{(item.mrr / 1000).toFixed(0)}k/mo</span>
                    </div>
                  </div>

                  {/* Dual Bar Track */}
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden flex gap-1 p-0.5 border border-slate-800">
                    <div 
                      style={{ width: revWidth }} 
                      className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 rounded-full transition-all duration-500 shadow-md shadow-blue-500/40"
                    />
                    <div 
                      style={{ width: mrrWidth }} 
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500 shadow-md shadow-emerald-500/40"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>NH-48 Corridor Span: 320 KM</span>
          <span className="text-emerald-400 font-extrabold font-mono">₹23.8L Total Corridor Web Revenue</span>
        </div>
      </div>

      {/* 1-Column: Donuts & Distribution */}
      <div className="bg-[#0c1222]/90 border border-slate-800/90 rounded-3xl p-4 lg:p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800/80 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight">Market Split Analytics</h3>
              <p className="text-xs text-slate-400">Corridor breakdown by business model & web presence</p>
            </div>
          </div>

          {/* Donut 1: B2B vs D2C */}
          <div className="mb-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-200">Wholesale vs Brands</span>
              <span className="text-indigo-400 font-mono font-bold">{b2bCount} B2B / {d2cCount} D2C</span>
            </div>

            <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
              <div style={{ width: `${b2bPercent}%` }} className="bg-indigo-500 h-full rounded-l-full transition-all" />
              <div style={{ width: `${d2cPercent}%` }} className="bg-purple-500 h-full rounded-r-full transition-all" />
            </div>

            <div className="flex items-center justify-between mt-2.5 text-xs">
              <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>B2B Industrial ({b2bPercent}%)</span>
              </span>
              <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>D2C Brands ({d2cPercent}%)</span>
              </span>
            </div>
          </div>

          {/* Donut 2: Zero-Web Opportunity */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-200">Digital Opportunity Gap</span>
              <span className="text-cyan-400 font-mono font-bold">{noWeb} Zero-Web Targets</span>
            </div>

            <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
              <div style={{ width: `${noWebPercent}%` }} className="bg-cyan-400 h-full rounded-l-full transition-all" />
              <div style={{ width: `${outdatedPercent}%` }} className="bg-amber-500 h-full rounded-r-full transition-all" />
            </div>

            <div className="flex items-center justify-between mt-2.5 text-xs">
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Zero Website ({noWebPercent}%)</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Outdated ({outdatedPercent}%)</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
          <span>Priority Pitch Target:</span>
          <span className="text-cyan-400 font-bold">Zero-Web B2B Wholesalers</span>
        </div>
      </div>

    </div>
  );
}
