import React from 'react';
import { 
  Globe2, 
  RefreshCw, 
  ExternalLink, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Building2
} from 'lucide-react';

export default function WebsiteIntelligenceSection({ 
  allLeads = [], 
  selectedWebStatus = 'all', 
  onSelectWebStatus, 
  theme = 'dark' 
}) {
  const isDark = theme === 'dark';

  // Calculate stats
  const totalLeads = allLeads.length;

  const redesignLeads = allLeads.filter(l => 
    Boolean(l.websiteUrl && l.websiteUrl.trim()) || 
    (l.website || '').toLowerCase().includes('redesign') || 
    (l.website || '').toLowerCase().includes('outdated')
  );

  const noWebLeads = allLeads.filter(l => 
    !l.websiteUrl && (l.website || '').toLowerCase().includes('no')
  );

  const redesignCount = redesignLeads.length;
  const noWebCount = noWebLeads.length;

  const redesignPipeline = redesignLeads.reduce((acc, l) => acc + (l.webCost || 0), 0);
  const redesignMrr = redesignLeads.reduce((acc, l) => acc + (l.mrr || 0), 0);

  const noWebPipeline = noWebLeads.reduce((acc, l) => acc + (l.webCost || 0), 0);
  const noWebMrr = noWebLeads.reduce((acc, l) => acc + (l.mrr || 0), 0);

  return (
    <div className={`w-full rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 mb-4 sm:mb-6 border transition-all ${
      isDark 
        ? 'bg-gradient-to-b from-[#0c1324] to-[#070b14] border-slate-800 text-slate-100 shadow-xl' 
        : 'bg-white border-slate-200 text-slate-900 shadow-lg'
    }`}>
      
      {/* Header with Title & Quick Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight flex items-center gap-2">
                <span>Website Intelligence & Redesign Split</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold">
                  76 Verified Accounts
                </span>
              </h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Turant pata karein kiske paas purani website hai (Redesign target) aur kiske paas zero website hai (New Portal target).
              </p>
            </div>
          </div>
        </div>

        {/* 1-Click Fast Switcher Buttons */}
        <div className={`p-1 rounded-xl border flex items-center gap-1 self-start sm:self-auto shrink-0 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => onSelectWebStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedWebStatus === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({totalLeads})
          </button>

          <button
            onClick={() => onSelectWebStatus('Needs Redesign')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedWebStatus === 'Needs Redesign'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                : isDark ? 'text-amber-400/90 hover:text-amber-300' : 'text-amber-700 hover:text-amber-900'
            }`}
          >
            <RefreshCw className="w-3 h-3" />
            <span>Redesign ({redesignCount})</span>
          </button>

          <button
            onClick={() => onSelectWebStatus('No Website')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedWebStatus === 'No Website'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : isDark ? 'text-rose-400/90 hover:text-rose-300' : 'text-rose-700 hover:text-rose-900'
            }`}
          >
            <span>❌ Zero-Web ({noWebCount})</span>
          </button>
        </div>
      </div>

      {/* 2 Main Split Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        
        {/* Card 1: Has Website (Needs Redesign) */}
        <div 
          onClick={() => onSelectWebStatus(selectedWebStatus === 'Needs Redesign' ? 'all' : 'Needs Redesign')}
          className={`cursor-pointer rounded-2xl p-4 border transition-all relative overflow-hidden group ${
            selectedWebStatus === 'Needs Redesign'
              ? isDark 
                ? 'bg-amber-500/10 border-amber-500/60 ring-2 ring-amber-500/40 shadow-lg shadow-amber-500/10' 
                : 'bg-amber-50 border-amber-400 ring-2 ring-amber-400 shadow-md'
              : isDark 
                ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40 hover:bg-slate-900' 
                : 'bg-slate-50 border-slate-200 hover:border-amber-300 hover:bg-white'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-wide text-amber-400">
                    Has Website (Needs Redesign)
                  </span>
                  {selectedWebStatus === 'Needs Redesign' && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950">
                      ACTIVE FILTER
                    </span>
                  )}
                </div>
                <h4 className="text-xl sm:text-2xl font-black mt-0.5 flex items-baseline gap-2">
                  <span>{redesignCount} Companies</span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">
                    ({totalLeads > 0 ? Math.round((redesignCount / totalLeads) * 100) : 0}% of Corridor)
                  </span>
                </h4>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Redesign Pipeline</span>
              <span className="text-sm sm:text-base font-black font-mono text-emerald-400">
                ₹{(redesignPipeline / 100000).toFixed(1)}L
              </span>
            </div>
          </div>

          <p className={`text-xs mb-3 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <span className="font-semibold text-amber-400">Inke paas already website hai:</span> Lekin purani 2012-2015 era ki HTML/PHP site hai, mobile par khulti nahi aur modern catalog nahi hai. Inhe <strong>"Website Redesign & Mobile Catalog"</strong> pitch karein.
          </p>

          {/* Quick Domain Samples & Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2.5 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-slate-400 font-mono">Sample Domains:</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                laxmidiamondtools.com
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 hidden sm:inline">
                varabridal.in
              </span>
            </div>
            
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>{selectedWebStatus === 'Needs Redesign' ? 'Clear Filter ✕' : 'View All 30 Redesign Leads →'}</span>
            </span>
          </div>
        </div>

        {/* Card 2: Zero Website (Needs Fresh B2B Portal) */}
        <div 
          onClick={() => onSelectWebStatus(selectedWebStatus === 'No Website' ? 'all' : 'No Website')}
          className={`cursor-pointer rounded-2xl p-4 border transition-all relative overflow-hidden group ${
            selectedWebStatus === 'No Website'
              ? isDark 
                ? 'bg-rose-500/10 border-rose-500/60 ring-2 ring-rose-500/40 shadow-lg shadow-rose-500/10' 
                : 'bg-rose-50 border-rose-400 ring-2 ring-rose-400 shadow-md'
              : isDark 
                ? 'bg-slate-900/60 border-slate-800 hover:border-rose-500/40 hover:bg-slate-900' 
                : 'bg-slate-50 border-slate-200 hover:border-rose-300 hover:bg-white'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                <Globe2 className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-wide text-rose-400">
                    Zero Website (Build First Portal)
                  </span>
                  {selectedWebStatus === 'No Website' && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-600 text-white">
                      ACTIVE FILTER
                    </span>
                  )}
                </div>
                <h4 className="text-xl sm:text-2xl font-black mt-0.5 flex items-baseline gap-2">
                  <span>{noWebCount} Companies</span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">
                    ({totalLeads > 0 ? Math.round((noWebCount / totalLeads) * 100) : 0}% of Corridor)
                  </span>
                </h4>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">New Portal Pipeline</span>
              <span className="text-sm sm:text-base font-black font-mono text-emerald-400">
                ₹{(noWebPipeline / 100000).toFixed(1)}L
              </span>
            </div>
          </div>

          <p className={`text-xs mb-3 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <span className="font-semibold text-rose-400">Zero dedicated website:</span> Internet par inka koi official web portal nahi hai. B2B buyers search karte hain toh verify nahi kar pate. Inhe <strong>"First Digital Portal & Google Maps Presence"</strong> pitch karein.
          </p>

          {/* Opportunity info & Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2.5 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-400 font-mono">Opportunity:</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                100% Uncaptured Market
              </span>
            </div>
            
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>{selectedWebStatus === 'No Website' ? 'Clear Filter ✕' : 'View All 46 Zero-Web Leads →'}</span>
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
