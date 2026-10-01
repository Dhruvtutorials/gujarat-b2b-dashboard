import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Search, 
  Download, 
  Lock, 
  Clock, 
  MapPin, 
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Table as TableIcon,
  BarChart3,
  Milestone,
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  totalLeads, 
  todayCount, 
  onExportCsv, 
  onLock,
  theme,
  setTheme
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

  const tabs = [
    { id: 'leads', label: 'All Leads Matrix', icon: TableIcon, count: totalLeads },
    { id: 'fresh', label: "Today's 8:30 AM Inflow", icon: Clock, count: `+${todayCount}`, highlight: true },
    { id: 'analytics', label: 'Revenue Analytics', icon: BarChart3 },
    { id: 'corridor', label: 'Corridor Route (13 Hubs)', icon: Milestone },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full transition-colors border-b backdrop-blur-xl ${
      isDark 
        ? 'bg-[#0b0f19]/90 border-slate-800 text-slate-100 shadow-xl' 
        : 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      {/* Top Main Bar */}
      <div className="w-full px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/20">
            <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
              isDark ? 'bg-[#0f172a]' : 'bg-white'
            }`}>
              <Compass className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-tight">
                Gujarat B2B Corridor
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-mono font-bold border border-blue-500/20">
                FY 2026-27
              </span>
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Surat ➔ Vadodara ➔ Ahmedabad ➔ Gandhinagar (320 KM)
            </p>
          </div>
        </div>

        {/* Center: Clean Segmented Navigation Tabs */}
        <nav className={`hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl border shadow-inner ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : isDark
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${tab.highlight && !isActive ? 'text-amber-500 animate-pulse' : ''}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive
                      ? 'bg-blue-800 text-white'
                      : tab.highlight
                        ? 'bg-amber-500/20 text-amber-500 font-bold'
                        : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Theme Toggle, Fullscreen, CSV, Lock */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* White / Dark Mode Toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-sm ${
              isDark 
                ? 'bg-slate-900 hover:bg-slate-800 text-amber-400 border-slate-800' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
            }`}
            title={isDark ? "Switch to White Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">White Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>

          {/* Full Screen Toggle */}
          <button
            onClick={toggleFullscreen}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              isDark 
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">{isFullscreen ? 'Exit Full' : 'Full Screen'}</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={onExportCsv}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              isDark 
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title="Download Leads CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Lock */}
          <button
            onClick={onLock}
            className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 text-xs transition-all"
            title="Lock Dashboard (Passcode: 2002)"
          >
            <Lock className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Mobile Tabs Scrollbar */}
      <div className={`md:hidden flex items-center gap-2 px-3 py-2 border-t overflow-x-auto no-scrollbar ${
        isDark ? 'border-slate-800/80 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
      }`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                  : isDark
                    ? 'bg-slate-900 text-slate-400 border-slate-800'
                    : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="text-[10px] font-mono">{tab.count}</span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
