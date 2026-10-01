import React, { useState, useEffect } from 'react';
import { CORRIDOR_LEADS } from './data/leadsData';
import SecurityGate from './components/SecurityGate';
import Navbar from './components/Navbar';
import SidebarFilters from './components/SidebarFilters';
import KpiMetrics from './components/KpiMetrics';
import Fresh830Shelf from './components/Fresh830Shelf';
import VisualAnalytics from './components/VisualAnalytics';
import LeadsMatrixTable from './components/LeadsMatrixTable';
import PitchModal from './components/PitchModal';
import AutoScanModal from './components/AutoScanModal';

export default function App() {
  // Authentication State (Passcode: 2002)
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('gujarat_corridor_auth') === 'unlocked_2002';
  });

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedWebStatus, setSelectedWebStatus] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
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
    setSelectedStage('all');
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

  // Map route handler
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
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Navigation */}
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
      />

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 flex-1 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Filter Sidebar */}
        <SidebarFilters
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          selectedWebStatus={selectedWebStatus}
          setSelectedWebStatus={setSelectedWebStatus}
          selectedStage={selectedStage}
          setSelectedStage={setSelectedStage}
          activeBatch={activeBatch}
          setActiveBatch={setActiveBatch}
          leads={filteredLeads}
          onResetFilters={handleResetFilters}
        />

        {/* Right Dashboard Body */}
        <main className="flex-1 w-full min-w-0 flex flex-col">
          
          {/* Executive KPI Metrics */}
          <KpiMetrics 
            leads={filteredLeads} 
            todayCount={freshLeadsToday.length} 
          />

          {/* Dedicated 08:30 AM Fresh Lead Inflow Shelf */}
          {activeBatch !== '2026-09-28' && activeBatch !== '2026-09-27' && (
            <Fresh830Shelf
              freshLeads={freshLeadsToday}
              onOpenPitch={(lead) => setPitchLead(lead)}
              onNavigateMap={handleNavigateMap}
            />
          )}

          {/* Visual Analytics (Spline Curves & Donut Distributions) */}
          <VisualAnalytics leads={filteredLeads} />

          {/* Leads Matrix Table & Card Grid */}
          <LeadsMatrixTable
            leads={filteredLeads}
            onOpenPitch={(lead) => setPitchLead(lead)}
            onNavigateMap={handleNavigateMap}
          />

        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#070b13] py-4 px-4 text-center text-xs text-slate-500">
        <p>
          Gujarat Highway Corridor B2B Intelligence Portal • Built with React 19 & Tailwind CSS • Surat ➔ Gandhinagar Pipeline • Passcode Protected (2002)
        </p>
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
