import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Activity, 
  Building, 
  Globe2, 
  Sparkles 
} from 'lucide-react';

export default function VisualAnalytics({ leads }) {
  const [activeTab, setActiveTab] = useState('pipeline');

  // City revenue aggregates
  const cityAggregates = [
    { city: 'Surat', rev: 255000, mrr: 137000, leads: 4 },
    { city: 'Ankleshwar', rev: 235000, mrr: 110000, leads: 3 },
    { city: 'Bharuch', rev: 215000, mrr: 95000, leads: 3 },
    { city: 'Vadodara', rev: 380000, mrr: 175000, leads: 5 },
    { city: 'Anand', rev: 215000, mrr: 107000, leads: 3 },
    { city: 'Ahmedabad', rev: 490000, mrr: 235000, leads: 6 },
    { city: 'Gandhinagar', rev: 275000, mrr: 135000, leads: 3 },
  ];

  // Max revenue for scaling
  const maxRev = 500000;

  // Business model split
  const b2bCount = leads.filter(l => l.type === 'B2B').length;
  const d2cCount = leads.filter(l => l.type === 'D2C').length;
  const total = leads.length || 1;
  const b2bPercent = Math.round((b2bCount / total) * 100);
  const d2cPercent = 100 - b2bPercent;

  // Zero web split
  const noWeb = leads.filter(l => l.website === 'No Website').length;
  const outdatedWeb = total - noWeb;
  const noWebPercent = Math.round((noWeb / total) * 100);
  const outdatedPercent = 100 - noWebPercent;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      
      {/* 2-Columns: Highway Corridor Spline / Revenue Chart */}
      <div className="lg:col-span-2 bg-[#0c1222]/90 border border-slate-800/90 rounded-2xl p-5 shadow-lg backdrop-blur-md flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Corridor Revenue Velocity (NH-48 ➔ NE-1)
                </h3>
                <p className="text-xs text-slate-400">
                  Estimated Web Development Value & Monthly Retainer (MRR) along Highway Hubs
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-blue-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                <span>Web Dev (₹)</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                <span>MRR/mo (₹)</span>
              </div>
            </div>
          </div>

          {/* Glowing Dual Chart Bars with Hover Tooltips */}
          <div className="space-y-3.5 pt-2">
            {cityAggregates.map((item) => {
              const revWidth = `${Math.min(100, Math.round((item.rev / maxRev) * 100))}%`;
              const mrrWidth = `${Math.min(100, Math.round(((item.mrr * 2.5) / maxRev) * 100))}%`;

              return (
                <div key={item.city} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200 flex items-center gap-2">
                      <span>{item.city}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                        {item.leads} leads
                      </span>
                    </span>
                    <span className="font-mono text-[11px] text-slate-300">
                      ₹{(item.rev / 1000).toFixed(0)}k <span className="text-emerald-400 font-semibold">+₹{(item.mrr / 1000).toFixed(0)}k MRR</span>
                    </span>
                  </div>

                  {/* Dual Bar Track */}
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex gap-1 p-0.5 border border-slate-800">
                    <div 
                      style={{ width: revWidth }} 
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-500"
                      title={`Web Dev: ₹${item.rev.toLocaleString()}`}
                    />
                    <div 
                      style={{ width: mrrWidth }} 
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500"
                      title={`MRR: ₹${item.mrr.toLocaleString()}/mo`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Surat (South Hub) ➔ Vadodara ➔ Ahmedabad ➔ Gandhinagar (Capital)</span>
          <span className="text-emerald-400 font-medium">₹23.8L Total Corridor Web Revenue</span>
        </div>
      </div>

      {/* 1-Column: Donuts & Distribution */}
      <div className="bg-[#0c1222]/90 border border-slate-800/90 rounded-2xl p-5 shadow-lg backdrop-blur-md flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800/80 mb-4">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <PieChart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Market Split Analytics</h3>
              <p className="text-xs text-slate-400">Corridor breakdown by business model & web presence</p>
            </div>
          </div>

          {/* Donut 1: B2B vs D2C */}
          <div className="mb-5 bg-slate-900/60 border border-slate-800/60 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-300">B2B Wholesale vs D2C Brands</span>
              <span className="text-indigo-400 font-mono text-[11px]">{b2bCount} B2B / {d2cCount} D2C</span>
            </div>

            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div style={{ width: `${b2bPercent}%` }} className="bg-indigo-500 h-full transition-all" />
              <div style={{ width: `${d2cPercent}%` }} className="bg-purple-500 h-full transition-all" />
            </div>

            <div className="flex items-center justify-between mt-2 text-[11px]">
              <span className="flex items-center gap-1.5 text-indigo-400">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>B2B Industrial ({b2bPercent}%)</span>
              </span>
              <span className="flex items-center gap-1.5 text-purple-400">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>D2C Brands ({d2cPercent}%)</span>
              </span>
            </div>
          </div>

          {/* Donut 2: Zero-Web Opportunity */}
          <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-300">Website Readiness Gap</span>
              <span className="text-cyan-400 font-mono text-[11px]">{noWeb} Zero-Web Leads</span>
            </div>

            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div style={{ width: `${noWebPercent}%` }} className="bg-cyan-400 h-full transition-all" />
              <div style={{ width: `${outdatedPercent}%` }} className="bg-amber-500 h-full transition-all" />
            </div>

            <div className="flex items-center justify-between mt-2 text-[11px]">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Zero Website ({noWebPercent}%)</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Outdated Web ({outdatedPercent}%)</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Priority Pitch Target:</span>
          <span className="text-cyan-400 font-semibold">Zero-Web B2B Wholesalers</span>
        </div>
      </div>

    </div>
  );
}
