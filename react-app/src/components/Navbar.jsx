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
  Table as TableIcon,
  Plus,
  Activity,
  Filter,
  MoreVertical,
  X,
  Zap
} from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  totalLeads, 
  todayCount, 
  onOpenAutoScan, 
  onOpenAddLead,
  onOpenApiStatus,
  onOpenGoogleSetup,
  onOpenBulkHarvester,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <header className={`sticky top-0 z-40 px-2.5 sm:px-4 lg:px-6 py-2 sm:py-2.5 transition-colors w-full border-b backdrop-blur-2xl ${
      isDark 
        ? 'bg-[#070b14]/95 border-slate-800/90 shadow-2xl shadow-black/40 text-slate-100' 
        : 'bg-white/95 border-slate-200 shadow-md text-slate-800'
    }`}>
      {/* Main Bar */}
      <div className="w-full flex items-center justify-between gap-2 md:gap-3">
        
        {/* Left Section: Sidebar Toggle + Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Sidebar / Filter Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:p-2 rounded-xl border transition-all shadow-sm ${
              isSidebarOpen 
                ? 'bg-blue-600 text-white border-blue-500 shadow-blue-500/20' 
                : isDark 
                  ? 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
            }`}
            title={isSidebarOpen ? "Close Filters" : "Open Filters"}
          >
            <Filter className="w-3.5 h-3.5 sm:hidden text-inherit" />
            <span className="hidden sm:inline">
              {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
            </span>
            <span className="text-[11px] font-bold sm:hidden">
              {isSidebarOpen ? 'Hide' : 'Filter'}
            </span>
          </button>

          {/* Logo & Title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/25 shrink-0">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                isDark ? 'bg-[#090d16]' : 'bg-white'
              }`}>
                <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              </div>
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <h1 className={`text-xs sm:text-sm lg:text-base font-black tracking-tight leading-none ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <span className="sm:hidden">CORRIDOR B2B</span>
                  <span className="hidden sm:inline">GUJARAT B2B CORRIDOR</span>
                </h1>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-500 border border-blue-500/30 font-mono font-bold uppercase hidden sm:inline">
                  ENTERPRISE
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-500 font-mono font-bold border border-emerald-500/30 sm:hidden">
                  {totalLeads} Leads
                </span>
              </div>
              <p className={`text-[10px] sm:text-[11px] items-center gap-1 leading-none mt-1 hidden sm:flex ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                <span className="font-semibold">Vapi ➔ Surat ➔ Vadodara ➔ Ahmedabad ➔ Rajkot ➔ Morbi</span>
                <span>|</span>
                <span className="text-emerald-500 font-mono font-semibold">{totalLeads} Leads</span>
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search Bar (Desktop / Tablet) */}
        <div className="relative flex-1 max-w-xs md:max-w-md hidden md:block">
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

        {/* Right Section: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Live API Status Indicator (Desktop) */}
          <button
            onClick={onOpenApiStatus}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-sm ${
              isDark 
                ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
            }`}
            title="Inspect Live API Gateway, Latency & Endpoints"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>API: Live</span>
          </button>

          {/* Add Lead Quick Button */}
          <button
            onClick={onOpenAddLead}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30"
            title="Add New Verified B2B Lead via API"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Lead</span>
          </button>

          {/* Real Leads - Google Places Setup (Desktop) */}
          <button
            onClick={onOpenGoogleSetup}
            className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 animate-pulse"
            title="Fetch 100% Real Google-Verified Business Leads"
          >
            <span className="text-sm leading-none">⚡</span>
            <span>Real Leads</span>
          </button>

                    {/* 10-City Harvest (Desktop) */}
          <button
            onClick={onOpenBulkHarvester}
            className="hidden lg:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 hover:opacity-90 text-white shadow-md shadow-indigo-600/30"
            title="Populate All 10 Gujarat Industrial Hubs"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>10-City Harvest</span>
          </button>

          {/* View Table Quick Button (Desktop) */}
          <button
            onClick={onScrollToTable}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30"
            title="Jump Directly to Leads Table"
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>

          {/* White / Dark Mode Toggle Button */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-sm ${
              isDark 
                ? 'bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border-amber-400/30' 
                : 'bg-slate-900 text-white border-slate-800 hover:bg-slate-800'
            }`}
            title={isDark ? "Switch to White / Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] sm:text-xs">White</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-blue-300" />
                <span className="text-[11px] sm:text-xs">Dark</span>
              </>
            )}
          </button>

          {/* 08:30 AM Filter Pill (Desktop) */}
          <button
            onClick={() => setActiveBatch(activeBatch === 'today' ? 'all' : 'today')}
            className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
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

          {/* Full Screen Toggle Button (Desktop) */}
          <button
            onClick={toggleFullscreen}
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isFullscreen 
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                : isDark
                  ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-700/80 hover:text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Mode"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Auto Scan (Desktop) */}
          <button
            onClick={onOpenAutoScan}
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-500 border border-blue-500/30 text-xs font-semibold transition-all"
            title="Corridor Lead Harvester"
          >
            <Radar className="w-3.5 h-3.5 animate-spin" />
            <span>Scan</span>
          </button>

          {/* CSV Export (Desktop) */}
          <button
            onClick={onExportCsv}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
              isDark 
                ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-700/80' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>

          {/* Mobile Menu Dropdown Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-1.5 rounded-xl border transition-all ${
              isMobileMenuOpen
                ? 'bg-blue-600 text-white border-blue-500'
                : isDark
                  ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                  : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
            title="More Actions"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <MoreVertical className="w-4 h-4" />}
          </button>

          {/* Lock Button */}
          <button
            onClick={onLock}
            className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 text-xs transition-all shrink-0"
            title="Lock Portal (Passcode: 1935)"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

      {/* Mobile Second Row: Full Width Touch Search Bar */}
      <div className="mt-2 md:hidden">
        <div className="relative w-full">
          <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
            isDark ? 'text-slate-400' : 'text-slate-400'
          }`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, GIDC hub, owner..."
            className={`w-full pl-8 pr-7 py-1.5 rounded-xl text-xs transition-all border shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              isDark 
                ? 'bg-slate-900/90 border-slate-700/80 text-slate-100 placeholder-slate-500' 
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
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
      </div>

      {/* Mobile Quick Actions Menu (Drawer/Flyout) */}
      {isMobileMenuOpen && (
        <div className={`mt-2 p-3 rounded-2xl border md:hidden grid grid-cols-2 gap-2 shadow-xl animate-in slide-in-from-top-2 duration-150 ${
          isDark ? 'bg-[#0f172a] border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
        }`}>
          <button
            onClick={() => {
              onScrollToTable();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 p-2 rounded-xl bg-blue-600 text-white text-xs font-bold justify-center"
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>

          <button
            onClick={() => {
              onOpenApiStatus();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold justify-center"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>API Gateway</span>
          </button>

                    <button
            onClick={() => {
              onOpenBulkHarvester();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold justify-center col-span-2 shadow-md"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Populate 10 Gujarat Hubs</span>
          </button>

          <button
            onClick={() => {
              onOpenGoogleSetup();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 p-2 rounded-xl bg-rose-600/80 text-white text-xs font-bold justify-center"
          >
            <span className="text-sm leading-none">⚡</span>
            <span>Real Leads</span>
          </button>

          <button
            onClick={() => {
              onOpenAutoScan();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 text-xs font-bold justify-center"
          >
            <Radar className="w-3.5 h-3.5" />
            <span>Auto Scan</span>
          </button>

          <button
            onClick={() => {
              onExportCsv();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold justify-center"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      )}
    </header>
  );
}
