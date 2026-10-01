import React from 'react';
import { 
  Compass, 
  Search, 
  Radar, 
  Download, 
  Lock, 
  Clock, 
  Layers, 
  MapPin, 
  Sparkles,
  TrendingUp
} from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  totalLeads, 
  todayCount, 
  onOpenAutoScan, 
  onExportCsv, 
  onLock,
  activeBatch,
  setActiveBatch
}) {
  return (
    <header className="sticky top-0 z-30 bg-[#090d16]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Branding & Corridor Indicator */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                  Gujarat B2B Corridor
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono uppercase">React 2.0</span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <span>Surat</span>
                <span className="text-blue-500">➔</span>
                <span>Vadodara</span>
                <span className="text-blue-500">➔</span>
                <span>Ahmedabad</span>
                <span className="text-blue-500">➔</span>
                <span className="text-emerald-400 font-medium">Gandhinagar</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400 font-mono">FY 2026-27</span>
              </p>
            </div>
          </div>

          {/* Quick status pill on mobile */}
          <div className="md:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>08:30 AM Inflow</span>
          </div>
        </div>

        {/* Middle: Search Box */}
        <div className="relative w-full md:w-80 lg:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, city, owner, sector..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Batch Selector Pill */}
          <button
            onClick={() => setActiveBatch(activeBatch === 'today' ? 'all' : 'today')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
              activeBatch === 'today'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20'
                : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-slate-700/60'
            }`}
            title="Filter by Today's 8:30 AM Inflow"
          >
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>08:30 AM Inflow</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono">
              +{todayCount}
            </span>
          </button>

          {/* Auto Scan button */}
          <button
            onClick={onOpenAutoScan}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-all hover:scale-[1.02]"
            title="Simulate Corridor Harvester"
          >
            <Radar className="w-3.5 h-3.5 animate-spin" />
            <span className="hidden sm:inline">Corridor Scan</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={onExportCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/70 text-xs font-medium transition-all"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Lock Dashboard */}
          <button
            onClick={onLock}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-medium transition-all"
            title="Lock Portal (Passcode: 2002)"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Lock</span>
          </button>
        </div>

      </div>
    </header>
  );
}
