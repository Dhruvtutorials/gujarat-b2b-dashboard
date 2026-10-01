import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Search, 
  Radar, 
  Download, 
  Lock, 
  Clock, 
  MapPin, 
  Sparkles,
  Maximize2,
  Minimize2,
  PanelLeftClose,
  PanelLeftOpen,
  Radio,
  Flame
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
  setActiveBatch,
  isSidebarOpen,
  setIsSidebarOpen
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Fullscreen error:", err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070b14]/95 backdrop-blur-2xl border-b border-slate-800/90 px-3 lg:px-6 py-2.5 transition-all w-full shadow-2xl shadow-black/40">
      <div className="w-full flex items-center justify-between gap-3">
        
        {/* Left Section: Sidebar Toggle + Brand */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sidebar Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all shadow-sm"
            title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/25">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm lg:text-base font-extrabold text-white tracking-tight leading-none">
                  GUJARAT B2B CORRIDOR
                </h1>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono font-bold uppercase">
                  ENTERPRISE 2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 leading-none mt-1">
                <span className="text-slate-300 font-semibold">Surat ➔ Gandhinagar</span>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400 font-mono font-semibold">36 Active Highway Leads</span>
              </p>
            </div>
          </div>
        </div>

        {/* Center Section: Live News / Inflow Ticker (Desktop) */}
        <div className="hidden xl:flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 max-w-xl truncate">
          <span className="flex items-center gap-1.5 text-amber-400 font-bold shrink-0 font-mono">
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>08:30 AM INFLOW LIVE:</span>
          </span>
          <span className="truncate text-slate-400">
            3 New Verified High-Ticket Prospects in Surat, Dahej & Chhatral with Physical Factory Addresses.
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs md:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, GIDC hub, owner, phone..."
            className="w-full pl-9 pr-8 py-1.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right Section: Controls */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* 08:30 AM Filter Pill */}
          <button
            onClick={() => setActiveBatch(activeBatch === 'today' ? 'all' : 'today')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              activeBatch === 'today'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
            }`}
            title="Filter by Today's 08:30 AM Inflow"
          >
            <Clock className={`w-3.5 h-3.5 ${activeBatch === 'today' ? 'text-slate-950' : 'text-amber-400 animate-pulse'}`} />
            <span className="hidden sm:inline">08:30 AM Inflow</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
              activeBatch === 'today' ? 'bg-slate-900 text-amber-300' : 'bg-amber-500/20 text-amber-300'
            }`}>
              +{todayCount}
            </span>
          </button>

          {/* Full Screen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              isFullscreen 
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-700/80 hover:text-white'
            }`}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Mode"}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-indigo-200" />
                <span className="hidden md:inline">Exit Full</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-slate-300" />
                <span className="hidden md:inline">Full Screen</span>
              </>
            )}
          </button>

          {/* Auto Scan */}
          <button
            onClick={onOpenAutoScan}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-all"
            title="Corridor Lead Harvester"
          >
            <Radar className="w-3.5 h-3.5 animate-spin" />
            <span className="hidden lg:inline">Harvester</span>
          </button>

          {/* CSV Export */}
          <button
            onClick={onExportCsv}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 text-xs font-medium transition-all"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Lock */}
          <button
            onClick={onLock}
            className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs transition-all"
            title="Lock Portal (Passcode: 2002)"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </header>
  );
}
