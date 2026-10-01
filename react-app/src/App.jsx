import React, { useState, useEffect } from 'react';
import { CORRIDOR_LEADS } from './data/leadsData';
import SecurityGate from './components/SecurityGate';
import Navbar from './components/Navbar';
import CorridorHighwayBar from './components/CorridorHighwayBar';
import SidebarFilters from './components/SidebarFilters';
import KpiMetrics from './components/KpiMetrics';
import Fresh830Shelf from './components/Fresh830Shelf';
import VisualAnalytics from './components/VisualAnalytics';
import LeadsMatrixTable from './components/LeadsMatrixTable';
import PitchModal from './components/PitchModal';
import AutoScanModal from './components/AutoScanModal';
import { Sparkles, Flame, Globe2, Building2, Clock, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Authentication State (Passcode: 2002)
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('gujarat_corridor_auth') === 'unlocked_2002';
  });

  // Sidebar Open/Close toggle for ultra full screen experience
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedWebStatus, setSelectedWebStatus] = useState('all');
  const [activeBatch, setActiveBatch] = useState('all');

  // Modals
  const [pitchLead, setPitchLead] = useState(null);
  const [isAutoScanOpen, setIsAutoScanOpen] = useState(false);

  // Lock portal
  const handleLock = () => {
    sessionStorage.removeItem('gujarat_corridor_auth');
    setIsUnlocked(false);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSelectedType('all');
    setSelectedPriority('all');
    setSelectedWebStatus('all');
    setActiveBatch('all');
  };

  // Filter logic
  const filteredLeads = CORRIDOR_LEADS.filter((lead) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        lead.name.toLowerCase().includes(q) ||
        lead.city.toLowerCase().includes(q) ||
        lead.dm.toLowerCase().includes(q) ||
        lead.category.toLowerCase().includes(q) ||
        lead.zone.toLowerCase().includes(q) ||
        lead.address.toLowerCase().includes(q) ||
        lead.id.toLowerCase().includes(q);
      if (!match) return false;
    }

    // City
    if (selectedCity !== 'all' && lead.city !== selectedCity) return false;

    // Type
    if (selectedType !== 'all' && lead.type !== selectedType) return false;

    // Priority
    if (selectedPriority !== 'all' && lead.priority !== selectedPriority) return false;

    // Website status
    if (selectedWebStatus !== 'all' && lead.website !== selectedWebStatus) return false;

    // Batch / Inflow
    if (activeBatch === 'today') {
      if (!lead.isNewToday) return false;
    } else if (activeBatch !== 'all') {
      if (lead.batchDate !== activeBatch) return false;
    }

    return true;
  });

  // Today's 08:30 AM fresh leads for dedicated shelf
  const freshLeadsToday = CORRIDOR_LEADS.filter((l) => l.isNewToday);

  // Map route navigation handler
  const handleNavigateMap = (lead) => {
    const query = encodeURIComponent(`${lead.name} ${lead.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  // Export to CSV
  const handleExportCsv = () => {
    const headers = [
      'ID',
      'Company Name',
      'Business Type',
      'Category / Sector',
      'City',
      'Zone',
      'Physical Factory/Office Address',
      'Decision Maker',
      'Phone Number',
      'Web Presence',
      'Lead Stage',
      'Priority',
      'Estimated Web Dev Fee (INR)',
      'Estimated Monthly MRR (INR)',
      'Batch Timestamp'
    ];

    const rows = filteredLeads.map((l) => [
      `"${l.id}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.type}"`,
      `"${l.category}"`,
      `"${l.city}"`,
      `"${l.zone}"`,
      `"${l.address.replace(/"/g, '""')}"`,
      `"${l.dm}"`,
      `"${l.phone}"`,
      `"${l.website}"`,
      `"${l.stage}"`,
      `"${l.priority}"`,
      l.webCost,
      l.mrr,
      `"${l.dateAdded}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Gujarat_Corridor_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If locked, show Security Gate
  if (!isUnlocked) {
    return <SecurityGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased w-full overflow-x-hidden">
      
      {/* 1. Ultra-Wide Top Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalLeads={CORRIDOR_LEADS.length}
        todayCount={freshLeadsToday.length}
        onOpenAutoScan={() => setIsAutoScanOpen(true)}
        onExportCsv={handleExportCsv}
        onLock={handleLock}
        activeBatch={activeBatch}
        setActiveBatch={setActiveBatch}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* 2. Interactive 13 Corridor Hubs Highway Ribbon (Surat ➔ Gandhinagar) */}
      <CorridorHighwayBar
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        leads={CORRIDOR_LEADS}
      />

      {/* 3. Full-Width Main Cockpit Workspace */}
      <div className="w-full px-3 lg:px-6 py-4 flex-1 flex flex-col lg:flex-row gap-5 items-start">
        
        {/* Left Filter Sidebar (Collapsible) */}
        {isSidebarOpen && (
          <SidebarFilters
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            selectedWebStatus={selectedWebStatus}
            setSelectedWebStatus={setSelectedWebStatus}
            activeBatch={activeBatch}
            setActiveBatch={setActiveBatch}
            leads={filteredLeads}
            onResetFilters={handleResetFilters}
          />
        )}

        {/* Right Dashboard Body (Takes 100% fluid space when sidebar is collapsed or on wide screens) */}
        <main className="flex-1 w-full min-w-0 flex flex-col">
          
          {/* Quick Filter Pills Row */}
          <div className="w-full flex items-center gap-2 overflow-x-auto pb-3 mb-2 no-scrollbar">
            <button
              onClick={() => handleResetFilters()}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCity === 'all' && activeBatch === 'all' && selectedType === 'all' && selectedPriority === 'all' && selectedWebStatus === 'all'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              All Highway Leads ({CORRIDOR_LEADS.length})
            </button>

            <button
              onClick={() => setActiveBatch(activeBatch === 'today' ? 'all' : 'today')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                activeBatch === 'today'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>🌅 08:30 AM Inflow ({freshLeadsToday.length})</span>
            </button>

            <button
              onClick={() => setSelectedPriority(selectedPriority === 'Hot' ? 'all' : 'Hot')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedPriority === 'Hot'
                  ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-600/30'
                  : 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/20'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>Hot Priority (19)</span>
            </button>

            <button
              onClick={() => setSelectedWebStatus(selectedWebStatus === 'No Website' ? 'all' : 'No Website')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedWebStatus === 'No Website'
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-600/30'
                  : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Zero Website Targets (25)</span>
            </button>

            <button
              onClick={() => setSelectedType(selectedType === 'B2B' ? 'all' : 'B2B')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedType === 'B2B'
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                  : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/20'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>B2B Industrial (26)</span>
            </button>
          </div>

          {/* Executive KPI Metrics */}
          <KpiMetrics 
            leads={filteredLeads} 
            todayCount={freshLeadsToday.length} 
          />

          {/* Dedicated 08:30 AM Fresh Lead Inflow Shelf (Near Top!) */}
          {activeBatch !== '2026-09-28' && activeBatch !== '2026-09-27' && (
            <Fresh830Shelf
              freshLeads={freshLeadsToday}
              onOpenPitch={(lead) => setPitchLead(lead)}
              onNavigateMap={handleNavigateMap}
            />
          )}

          {/* Visual Analytics (Dual Splines & Donuts) */}
          <VisualAnalytics leads={filteredLeads} />

          {/* Full Width Leads Matrix Table & Card Grid */}
          <LeadsMatrixTable
            leads={filteredLeads}
            onOpenPitch={(lead) => setPitchLead(lead)}
            onNavigateMap={handleNavigateMap}
          />

        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#050811] py-4 px-4 text-center text-xs text-slate-500 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-full px-4 gap-2 text-[11px]">
          <span>Gujarat Highway Corridor B2B Prospecting Engine • Built with React 19 & Tailwind CSS</span>
          <span>Surat ➔ Vadodara ➔ Ahmedabad ➔ Gandhinagar (320 KM) • Passcode Protected (2002)</span>
        </div>
      </footer>

      {/* WhatsApp & Meeting Pitch Modal */}
      {pitchLead && (
        <PitchModal
          lead={pitchLead}
          onClose={() => setPitchLead(null)}
        />
      )}

      {/* Corridor Auto Scanner Modal */}
      {isAutoScanOpen && (
        <AutoScanModal
          onClose={() => setIsAutoScanOpen(false)}
        />
      )}

    </div>
  );
}
