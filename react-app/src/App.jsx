import React, { useState } from 'react';
import { CORRIDOR_LEADS, CORRIDOR_CITIES } from './data/leadsData';
import SecurityGate from './components/SecurityGate';
import Navbar from './components/Navbar';
import KpiMetrics from './components/KpiMetrics';
import LeadsMatrixTable from './components/LeadsMatrixTable';
import Fresh830Shelf from './components/Fresh830Shelf';
import VisualAnalytics from './components/VisualAnalytics';
import CorridorRouteView from './components/CorridorRouteView';
import PitchModal from './components/PitchModal';
import AutoScanModal from './components/AutoScanModal';

export default function App() {
  // Passcode Authentication (PIN: 2002)
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('gujarat_corridor_auth') === 'unlocked_2002';
  });

  // White / Dark Mode Theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('gujarat_corridor_theme') || 'dark';
  });

  const handleSetTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('gujarat_corridor_theme', newTheme);
  };

  // Active Navigation Tab: 'leads' | 'fresh' | 'analytics' | 'corridor'
  const [activeTab, setActiveTab] = useState('leads');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedWebStatus, setSelectedWebStatus] = useState('all');

  // Modals
  const [pitchLead, setPitchLead] = useState(null);
  const [isAutoScanOpen, setIsAutoScanOpen] = useState(false);

  // Lock Portal
  const handleLock = () => {
    sessionStorage.removeItem('gujarat_corridor_auth');
    setIsUnlocked(false);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSelectedType('all');
    setSelectedPriority('all');
    setSelectedWebStatus('all');
  };

  // Filter logic
  const filteredLeads = CORRIDOR_LEADS.filter((lead) => {
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

    if (selectedCity !== 'all' && lead.city !== selectedCity) return false;
    if (selectedType !== 'all' && lead.type !== selectedType) return false;
    if (selectedPriority !== 'all' && lead.priority !== selectedPriority) return false;
    if (selectedWebStatus !== 'all' && lead.website !== selectedWebStatus) return false;

    return true;
  });

  const freshLeadsToday = CORRIDOR_LEADS.filter((l) => l.isNewToday);

  // Map route handler
  const handleNavigateMap = (lead) => {
    const query = encodeURIComponent(`${lead.name} ${lead.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'ID', 'Company Name', 'Type', 'Category', 'City', 'Zone',
      'Address', 'Decision Maker', 'Phone', 'Website', 'Stage',
      'Priority', 'Web Dev Fee (INR)', 'Monthly MRR (INR)', 'Timestamp'
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

  // If locked, render SecurityGate
  if (!isUnlocked) {
    return <SecurityGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors w-full antialiased ${
      isDark ? 'bg-[#090d16] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* 1. Clean Navigation Bar with Tabs & White/Dark Switch */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalLeads={CORRIDOR_LEADS.length}
        todayCount={freshLeadsToday.length}
        onExportCsv={handleExportCsv}
        onLock={handleLock}
        theme={theme}
        setTheme={handleSetTheme}
      />

      {/* 2. Main Executive Content Container */}
      <main className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-6 flex-1 flex flex-col">
        
        {/* Clean Executive KPI Metrics */}
        <KpiMetrics 
          leads={filteredLeads} 
          todayCount={freshLeadsToday.length} 
          theme={theme}
        />

        {/* 3. Clean Modular Tabs */}
        {activeTab === 'leads' && (
          <LeadsMatrixTable
            leads={filteredLeads}
            onOpenPitch={(lead) => setPitchLead(lead)}
            onNavigateMap={handleNavigateMap}
            theme={theme}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            selectedWebStatus={selectedWebStatus}
            setSelectedWebStatus={setSelectedWebStatus}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onResetFilters={handleResetFilters}
          />
        )}

        {activeTab === 'fresh' && (
          <div>
            <Fresh830Shelf
              freshLeads={freshLeadsToday}
              onOpenPitch={(lead) => setPitchLead(lead)}
              onNavigateMap={handleNavigateMap}
              theme={theme}
            />
            {/* Also show table filtered for today */}
            <LeadsMatrixTable
              leads={freshLeadsToday}
              onOpenPitch={(lead) => setPitchLead(lead)}
              onNavigateMap={handleNavigateMap}
              theme={theme}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedPriority={selectedPriority}
              setSelectedPriority={setSelectedPriority}
              selectedWebStatus={selectedWebStatus}
              setSelectedWebStatus={setSelectedWebStatus}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onResetFilters={handleResetFilters}
            />
          </div>
        )}

        {activeTab === 'analytics' && (
          <VisualAnalytics 
            leads={filteredLeads} 
            theme={theme} 
          />
        )}

        {activeTab === 'corridor' && (
          <CorridorRouteView
            onSelectCity={(city) => {
              setSelectedCity(city);
              setActiveTab('leads');
            }}
            theme={theme}
          />
        )}

      </main>

      {/* Clean Minimalist Footer */}
      <footer className={`mt-auto border-t py-4 px-4 text-center text-xs transition-colors ${
        isDark ? 'border-slate-800 bg-[#070a13] text-slate-500' : 'border-slate-200 bg-white text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4 text-[11px]">
          <span>Gujarat Highway Corridor B2B Portal • Surat ➔ Gandhinagar (320 KM)</span>
          <span>Passcode Protected (PIN: 2002) • Built with React 19</span>
        </div>
      </footer>

      {/* WhatsApp Pitch Modal */}
      {pitchLead && (
        <PitchModal
          lead={pitchLead}
          onClose={() => setPitchLead(null)}
        />
      )}

      {/* Auto Scan Modal */}
      {isAutoScanOpen && (
        <AutoScanModal
          onClose={() => setIsAutoScanOpen(false)}
        />
      )}

    </div>
  );
}
