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
  Flame,
  Sun,
  Moon,
  Table as TableIcon
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
  setIsSidebarOpen,
  theme,
  setTheme,
  onScrollToTable
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

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 px-3 lg:px-6 py-2.5 transition-colors w-full border-b backdrop-blur-2xl ${
      isDark 
        ? 'bg-[#070b14]/95 border-slate-800/90 shadow-2xl shadow-black/40 text-slate-100' 
        : 'bg-white/95 border-slate-200 shadow-md text-slate-800'
    }`}>
      <div className="w-full flex items-center justify-between gap-3">
        
        {/* Left Section: Sidebar Toggle + Brand */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sidebar Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-xl border transition-all shadow-sm ${
              isDark 
                ? 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white' 
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/25">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                isDark ? 'bg-[#090d16]' : 'bg-white'
              }`}>
                <Compass className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className={`text-sm lg:text-base font-extrabold tracking-tight leading-none ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  GUJARAT B2B CORRIDOR
                </h1>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-500 border border-blue-500/30 font-mono font-bold uppercase">
                  PRO 2.0
                </span>
              </div>
              <p className={`text-[11px] flex items-center gap-1 leading-none mt-1 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                <span className="font-semibold">Surat ➔ Gandhinagar</span>
                <span>|</span>
                <span className="text-emerald-500 font-mono font-semibold">36 Qualified Leads</span>
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="relative flex-1 max-w-xs md:max-w-md">
          <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
            isDark ? 'text-slate-400' : 'text-slate-400'
          }`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, GIDC hub, owner, address..."
            className={`w-full pl-9 pr-8 py-1.5 rounded-xl text-xs transition-all border shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              isDark 
                ? 'bg-slate-900/90 border-slate-700/80 text-slate-100 placeholder-slate-500 focus:border-blue-500' 
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right Section: Controls */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* View Table Quick Button */}
          <button
            onClick={onScrollToTable}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30"
            title="Jump Directly to Leads Table"
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>

          {/* White / Dark Mode Toggle Button */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-sm ${
              isDark 
                ? 'bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border-amber-400/30' 
                : 'bg-slate-900 text-white border-slate-800 hover:bg-slate-800'
            }`}
            title={isDark ? "Switch to White / Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
                <span>White</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-blue-300" />
                <span>Dark</span>
              </>
            )}
          </button>

          {/* 08:30 AM Filter Pill */}
          <button
            onClick={() => setActiveBatch(activeBatch === 'today' ? 'all' : 'today')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              activeBatch === 'today'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 font-bold'
                : isDark
                  ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
            }`}
            title="Filter by Today's 08:30 AM Inflow"
          >
            <Clock className={`w-3.5 h-3.5 ${activeBatch === 'today' ? 'text-slate-950' : 'text-amber-500 animate-pulse'}`} />
            <span>08:30 AM</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
              activeBatch === 'today' ? 'bg-slate-900 text-amber-300' : 'bg-amber-500/20 text-amber-600'
            }`}>
              +{todayCount}
            </span>
          </button>

          {/* Full Screen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isFullscreen 
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                : isDark
                  ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-700/80 hover:text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Mode"}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Exit Full</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Full Screen</span>
              </>
            )}
          </button>

          {/* Auto Scan */}
          <button
            onClick={onOpenAutoScan}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-500 border border-blue-500/30 text-xs font-semibold transition-all"
            title="Corridor Lead Harvester"
          >
            <Radar className="w-3.5 h-3.5 animate-spin" />
            <span>Scan</span>
          </button>

          {/* CSV Export */}
          <button
            onClick={onExportCsv}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
              isDark 
                ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-700/80' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CSV</span>
          </button>

          {/* Lock */}
          <button
            onClick={onLock}
            className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 text-xs transition-all"
            title="Lock Portal (Passcode: 2002)"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </header>
  );
}
