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
import AddLeadModal from './components/AddLeadModal';
import ApiStatusModal from './components/ApiStatusModal';
import GooglePlacesSetup from './components/GooglePlacesSetup';
import LeadNotesModal from './components/LeadNotesModal';
import BulkHarvesterModal from './components/BulkHarvesterModal';
import ShareLeadModal from './components/ShareLeadModal';
import WebsiteIntelligenceSection from './components/WebsiteIntelligenceSection';
import { apiService } from './services/apiService';
import { Sparkles, Flame, Globe2, Building2, Clock, Table as TableIcon, BarChart3, Plus, Activity } from 'lucide-react';

export default function App() {
  // Authentication State (Passcode: 1935)
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('gujarat_corridor_auth') === 'unlocked_1935';
  });

  // White / Dark Mode Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('gujarat_corridor_theme') || 'dark';
  });

  const handleSetTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('gujarat_corridor_theme', newTheme);
  };

  // View Sections: 'table' or 'analytics'
  const [activeMainTab, setActiveMainTab] = useState('table');

  // Sidebar Open/Close toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => (typeof window !== "undefined" ? window.innerWidth >= 1024 : true));

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all'); // 'all', 'Gujarat', 'Rajasthan'
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedWebStatus, setSelectedWebStatus] = useState('all');
  const [activeBatch, setActiveBatch] = useState('all');

  // Persistent Leads Database State loaded from apiService / localStorage
  const [allLeads, setAllLeads] = useState(() => {
    try {
      const raw = localStorage.getItem('corridor_leads_database_v5_redesign') || localStorage.getItem('corridor_leads_database_v4_gujarat');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length >= CORRIDOR_LEADS.length) {
          // Merge latest websiteUrl and website field from CORRIDOR_LEADS while preserving notes/status
          const seedMap = new Map(CORRIDOR_LEADS.map((l) => [l.id, l]));
          const upgraded = parsed.map((lead) => {
            const seed = seedMap.get(lead.id);
            if (!seed) return lead;
            return {
              ...lead,
              website: lead.website && lead.website !== 'Outdated' ? lead.website : seed.website,
              websiteUrl: lead.websiteUrl !== undefined && lead.websiteUrl !== '' ? lead.websiteUrl : (seed.websiteUrl || '')
            };
          });
          localStorage.setItem('corridor_leads_database_v5_redesign', JSON.stringify(upgraded));
          return upgraded;
        }
      }
    } catch {}
    localStorage.setItem('corridor_leads_database_v5_redesign', JSON.stringify(CORRIDOR_LEADS));
    return CORRIDOR_LEADS;
  });

  // Modals
  const [pitchLead, setPitchLead] = useState(null);
  const [isAutoScanOpen, setIsAutoScanOpen] = useState(false);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isApiStatusOpen, setIsApiStatusOpen] = useState(false);
  const [isGoogleSetupOpen, setIsGoogleSetupOpen] = useState(false);
  const [activeNotesLead, setActiveNotesLead] = useState(null);
  const [activeShareLead, setActiveShareLead] = useState(null);
  const [isBulkHarvesterOpen, setIsBulkHarvesterOpen] = useState(false);
  const [harvesterCity, setHarvesterCity] = useState('all');

  // API Action Handlers
  const handleCreateLead = async (leadData) => {
    const res = await apiService.createLead(leadData);
    if (res.success && res.data) {
      setAllLeads((prev) => [res.data, ...prev]);
      handleSelectCity(res.data.city);
    }
  };

  const handleDeleteLead = async (id) => {
    await apiService.deleteLead(id);
    setAllLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const handleSaveLead = (updatedLead) => {
    setAllLeads((prev) => {
      const updated = prev.map((l) => (l.id === updatedLead.id ? updatedLead : l));
      localStorage.setItem('corridor_leads_database_v5_redesign', JSON.stringify(updated));
      return updated;
    });
  };

  const handleLeadsHarvested = (newLeads) => {
    if (newLeads && newLeads.length > 0) {
      setAllLeads((prev) => {
        const existingIds = new Set(prev.map((l) => l.id));
        const filteredNew = newLeads.filter((l) => !existingIds.has(l.id));
        return [...filteredNew, ...prev];
      });
      handleSelectCity(newLeads[0].city);
    }
  };

  const handleResetDatabase = () => {
    apiService.resetToDefault();
    setAllLeads(CORRIDOR_LEADS);
    setIsApiStatusOpen(false);
  };

  const handleTriggerCityScan = (cityName) => {
    setHarvesterCity(cityName);
    setIsAutoScanOpen(true);
  };

  // Lock portal
  const handleLock = () => {
    sessionStorage.removeItem('gujarat_corridor_auth');
    setIsUnlocked(false);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedState('all');
    setSelectedCity('all');
    setSelectedType('all');
    setSelectedPriority('all');
    setSelectedWebStatus('all');
    setActiveBatch('all');
  };

  const scrollToTable = () => {
    setActiveMainTab('table');
    const el = document.getElementById('leads-table-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // City selection handler with auto-scroll and conflict resolution
  const handleSelectCity = (city) => {
    if (!city || city === 'all') {
      setSelectedCity('all');
      return;
    }
    // Toggle: if already selected, reset to all
    if (selectedCity && selectedCity.toLowerCase() === city.toLowerCase()) {
      setSelectedCity('all');
      return;
    }
    setSelectedCity(city);
    setActiveMainTab('table');
    setTimeout(() => {
      const el = document.getElementById('leads-table-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // Filter logic based on live allLeads state (100% click-tolerant)
  const filteredLeads = allLeads.filter((lead) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match = 
        (lead.name || '').toLowerCase().includes(q) ||
        (lead.city || '').toLowerCase().includes(q) ||
        (lead.state || '').toLowerCase().includes(q) ||
        (lead.dm || '').toLowerCase().includes(q) ||
        (lead.category || '').toLowerCase().includes(q) ||
        (lead.zone || '').toLowerCase().includes(q) ||
        (lead.address || '').toLowerCase().includes(q) ||
        (lead.id || '').toLowerCase().includes(q) ||
        (lead.notes || '').toLowerCase().includes(q);
      if (!match) return false;
    }

    // City (case-insensitive)
    if (selectedCity !== 'all') {
      if ((lead.city || '').toLowerCase() !== selectedCity.toLowerCase()) return false;
    }

    // Industrial Type
    if (selectedType !== 'all') {
      if ((lead.type || '').toLowerCase() !== selectedType.toLowerCase()) return false;
    }

    // Priority (matches Hot / Ultra Hot)
    if (selectedPriority !== 'all') {
      const prio = (lead.priority || '').toLowerCase();
      if (selectedPriority === 'Hot') {
        if (!prio.includes('hot')) return false;
      } else if (prio !== selectedPriority.toLowerCase()) {
        return false;
      }
    }

    // Website status (tolerant match for Google Places & Seeded data)
    if (selectedWebStatus !== 'all') {
      const web = (lead.website || '').toLowerCase();
      const hasUrl = Boolean(lead.websiteUrl && lead.websiteUrl.trim());
      if (selectedWebStatus === 'No Website' || selectedWebStatus === 'No Web Presence') {
        if (hasUrl || (!web.includes('no') && !web.includes('zero'))) return false;
      } else if (
        selectedWebStatus === 'Outdated' || 
        selectedWebStatus === 'Outdated Site' || 
        selectedWebStatus === 'Needs Redesign'
      ) {
        if (!hasUrl && !web.includes('outdated') && !web.includes('redesign')) return false;
      } else if (selectedWebStatus === 'Active Website') {
        if (!web.includes('active')) return false;
      }
    }

    // Batch / Inflow
    if (activeBatch === 'today') {
      if (!lead.isNewToday) return false;
    } else if (activeBatch !== 'all') {
      if (lead.batchDate !== activeBatch) return false;
    }

    return true;
  });

  // Today's 08:30 AM fresh leads for dedicated shelf
  const freshLeadsToday = allLeads.filter((l) => l.isNewToday);

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

  const isDark = theme === 'dark';

  // If locked, show Security Gate
  if (!isUnlocked) {
    return <SecurityGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors w-full overflow-x-hidden antialiased ${
      isDark ? 'bg-[#070a13] text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      
      {/* 1. Ultra-Wide Top Navigation Bar with White/Dark Button */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalLeads={allLeads.length}
        todayCount={freshLeadsToday.length}
        onOpenAddLead={() => setIsAddLeadOpen(true)}
        onOpenApiStatus={() => setIsApiStatusOpen(true)}
            onOpenGoogleSetup={() => setIsGoogleSetupOpen(true)}
        onOpenBulkHarvester={() => setIsBulkHarvesterOpen(true)}
        onOpenAutoScan={() => {
          setHarvesterCity('all');
          setIsAutoScanOpen(true);
        }}
        onExportCsv={handleExportCsv}
        onLock={handleLock}
        activeBatch={activeBatch}
        setActiveBatch={setActiveBatch}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        theme={theme}
        setTheme={handleSetTheme}
        onScrollToTable={scrollToTable}
      />

      {/* 2. Interactive Corridor Hubs Highway Ribbon (Gujarat + Rajasthan) */}
      <CorridorHighwayBar
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onSelectCity={handleSelectCity}
        leads={allLeads}
        theme={theme}
      />

      {/* 3. Full-Width Main Cockpit Workspace */}
      <div className="w-full px-2 sm:px-4 lg:px-6 py-3 sm:py-4 flex-1 flex flex-col lg:flex-row gap-4 lg:gap-5 items-start">
        
        {/* Left Filter Sidebar */}
        {isSidebarOpen && (
          <SidebarFilters
            allLeads={allLeads}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            onSelectCity={handleSelectCity}
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
            onClose={() => setIsSidebarOpen(false)}
            theme={theme}
          />
        )}

        {/* Right Dashboard Body */}
        <main className="flex-1 w-full min-w-0 flex flex-col">
          
          {/* Quick Filter Pills Row */}
          <div className="w-full flex items-center justify-between gap-2 sm:gap-3 overflow-x-auto pb-2.5 mb-2 no-scrollbar touch-pan-x scroll-smooth">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleResetFilters()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedState === 'all' && selectedCity === 'all' && activeBatch === 'all' && selectedType === 'all' && selectedPriority === 'all' && selectedWebStatus === 'all'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                    : isDark 
                      ? 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                All Belt ({allLeads.length})
              </button>

              <button
                onClick={() => {
                  setSelectedState(selectedState === 'Gujarat' ? 'all' : 'Gujarat');
                  setSelectedCity('all');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedState === 'Gujarat'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                    : isDark
                      ? 'bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/20'
                      : 'bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100'
                }`}
              >
                <span>🦁 Gujarat ({allLeads.filter(l => l.state === 'Gujarat').length})</span>
              </button>



              <button
                onClick={() => setActiveBatch(activeBatch === 'today' ? 'all' : 'today')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  activeBatch === 'today'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                    : isDark
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                      : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>🌅 08:30 AM Fresh ({freshLeadsToday.length})</span>
              </button>

              <button
                onClick={() => setSelectedPriority(selectedPriority === 'Hot' ? 'all' : 'Hot')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedPriority === 'Hot'
                    ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-600/30'
                    : isDark
                      ? 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/20'
                      : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                <span>Hot Deals</span>
              </button>

              <button
                onClick={() => setSelectedWebStatus(selectedWebStatus === 'No Website' ? 'all' : 'No Website')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedWebStatus === 'No Website'
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-600/30'
                    : isDark
                      ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20'
                      : 'bg-cyan-50 text-cyan-800 border-cyan-300 hover:bg-cyan-100'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>Zero Website</span>
              </button>

              <button
                onClick={() => setSelectedType(selectedType === 'B2B' ? 'all' : 'B2B')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedType === 'B2B'
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                    : isDark
                      ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/20'
                      : 'bg-indigo-50 text-indigo-800 border-indigo-300 hover:bg-indigo-100'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>B2B Industrial</span>
              </button>
            </div>

            {/* View Selector: Table vs Analytics */}
            <div className={`flex items-center gap-1 p-1 rounded-xl border shrink-0 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <button
                onClick={() => setActiveMainTab('table')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeMainTab === 'table'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Leads Table</span>
              </button>
              <button
                onClick={() => setActiveMainTab('analytics')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeMainTab === 'analytics'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Analytics Charts</span>
              </button>
            </div>
          </div>

          {/* Executive KPI Metrics */}
          <KpiMetrics 
            leads={filteredLeads} 
            todayCount={freshLeadsToday.length} 
            theme={theme}
          />

          {/* Dedicated 08:30 AM Fresh Lead Inflow Shelf */}
          {activeBatch !== '2026-09-28' && activeBatch !== '2026-09-27' && (
            <Fresh830Shelf
              freshLeads={freshLeadsToday}
              onOpenPitch={(lead) => setPitchLead(lead)}
              onNavigateMap={handleNavigateMap}
              theme={theme}
            />
          )}

          {/* Dedicated Website Intelligence & Redesign Splitter Section */}
          <WebsiteIntelligenceSection
            allLeads={allLeads}
            selectedWebStatus={selectedWebStatus}
            onSelectWebStatus={setSelectedWebStatus}
            theme={theme}
          />

          {/* TABLE VIEW IS SHOWN DIRECTLY & PROMINENTLY */}
          {activeMainTab === 'table' ? (
            <>
              <LeadsMatrixTable
                leads={filteredLeads}
                allLeads={allLeads}
                selectedCity={selectedCity}
                selectedWebStatus={selectedWebStatus}
                onSelectWebStatus={setSelectedWebStatus}
                onSelectCity={handleSelectCity}
                onResetFilters={handleResetFilters}
                onTriggerCityScan={handleTriggerCityScan}
                onDeleteLead={handleDeleteLead}
                onOpenPitch={(lead) => setPitchLead(lead)}
                onNavigateMap={handleNavigateMap}
                onOpenNotes={(lead) => setActiveNotesLead(lead)}
                onOpenShare={(lead) => setActiveShareLead(lead)}
                onOpenBulkHarvester={() => setIsBulkHarvesterOpen(true)}
                theme={theme}
              />
              <VisualAnalytics leads={filteredLeads} theme={theme} />
            </>
          ) : (
            <>
              <VisualAnalytics leads={filteredLeads} theme={theme} />
              <LeadsMatrixTable
                leads={filteredLeads}
                allLeads={allLeads}
                selectedCity={selectedCity}
                selectedWebStatus={selectedWebStatus}
                onSelectWebStatus={setSelectedWebStatus}
                onSelectCity={handleSelectCity}
                onResetFilters={handleResetFilters}
                onTriggerCityScan={handleTriggerCityScan}
                onDeleteLead={handleDeleteLead}
                onOpenPitch={(lead) => setPitchLead(lead)}
                onNavigateMap={handleNavigateMap}
                onOpenNotes={(lead) => setActiveNotesLead(lead)}
                onOpenShare={(lead) => setActiveShareLead(lead)}
                onOpenBulkHarvester={() => setIsBulkHarvesterOpen(true)}
                theme={theme}
              />
            </>
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className={`mt-auto border-t py-4 px-4 text-center text-xs w-full transition-colors ${
        isDark ? 'border-slate-800/80 bg-[#050811] text-slate-500' : 'border-slate-200 bg-white text-slate-500'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-full px-4 gap-2 text-[11px]">
          <span>Gujarat Golden Industrial Corridor B2B Prospecting Engine (Vapi to Morbi) • Live API & Overpass Harvester</span>
          <span>Vapi ➔ Surat ➔ Vadodara ➔ Ahmedabad ➔ Gandhinagar ➔ Rajkot ➔ Morbi (550 KM) • Passcode Protected (1935)</span>
        </div>
      </footer>

      {/* WhatsApp & Meeting Pitch Modal */}
      {pitchLead && (
        <PitchModal
          lead={pitchLead}
          onClose={() => setPitchLead(null)}
        />
      )}

      {/* Corridor Auto Scanner / Overpass Harvester Modal */}
      {isAutoScanOpen && (
        <AutoScanModal
          defaultCity={harvesterCity}
          onLeadsHarvested={handleLeadsHarvested}
          onClose={() => setIsAutoScanOpen(false)}
          theme={theme}
        />
      )}

      {/* Add Lead Modal via API */}
      {isAddLeadOpen && (
        <AddLeadModal
          onClose={() => setIsAddLeadOpen(false)}
          onLeadCreated={handleCreateLead}
          theme={theme}
        />
      )}

      {/* API Gateway & Health Diagnostics Modal */}
      {isApiStatusOpen && (
        <ApiStatusModal
          onClose={() => setIsApiStatusOpen(false)}
          totalLeadsCount={allLeads.length}
          onResetDatabase={handleResetDatabase}
          theme={theme}
        />
      )}

      {/* Google Places Real Leads Setup Modal */}
      {isGoogleSetupOpen && (
        <GooglePlacesSetup
          onLeadsHarvested={handleLeadsHarvested}
          onClose={() => setIsGoogleSetupOpen(false)}
          theme={theme}
        />
      )}

      {/* Mini CRM Lead Notes & Pipeline Status Modal */}
      {activeNotesLead && (
        <LeadNotesModal
          lead={activeNotesLead}
          onClose={() => setActiveNotesLead(null)}
          onSaveLead={handleSaveLead}
          theme={theme}
        />
      )}

      {/* Populate All 10 Corridor Cities Highway Harvester Modal */}
      {isBulkHarvesterOpen && (
        <BulkHarvesterModal
          onClose={() => setIsBulkHarvesterOpen(false)}
          onLeadsHarvested={handleLeadsHarvested}
          theme={theme}
        />
      )}

      {/* 1-Click Share Lead Dossier Modal */}
      {activeShareLead && (
        <ShareLeadModal
          lead={activeShareLead}
          onClose={() => setActiveShareLead(null)}
          theme={theme}
        />
      )}

    </div>
  );
}
