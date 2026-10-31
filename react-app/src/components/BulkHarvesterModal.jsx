import React, { useState } from 'react';
import { 
  X, 
  Radar, 
  MapPin, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Building2, 
  Zap, 
  Globe2,
  AlertCircle
} from 'lucide-react';
import { fetchRealLeadsFromGooglePlaces } from '../services/apiService';

const GUJARAT_CORRIDOR_CITIES = [
  { city: 'Surat', hub: 'Textiles, Diamonds & Synthetic Weaving', keyword: 'textile manufacturer factory Surat' },
  { city: 'Ahmedabad', hub: 'Active Pharma & Heavy Engineering GIDC', keyword: 'engineering manufacturing factory Ahmedabad' },
  { city: 'Vadodara', hub: 'Chemical, Switchgears & Power Equipment', keyword: 'chemical manufacturer GIDC Vadodara' },
  { city: 'Rajkot', hub: 'CNC Machine Tools, Auto Castings & Foundry', keyword: 'machine tools foundry manufacturer Rajkot' },
  { city: 'Morbi', hub: 'Ceramic Tiles, Sanitaryware & Vitrified Slabs', keyword: 'ceramic tiles manufacturer factory Morbi' },
  { city: 'Jamnagar', hub: 'Brass Turned Components & Sanitary Parts', keyword: 'brass components manufacturer Jamnagar' },
  { city: 'Gandhinagar', hub: 'Electronics, IT Hardware & Infocity', keyword: 'electronics industrial unit Gandhinagar' },
  { city: 'Ankleshwar', hub: 'Bulk Drugs, Dyes & Active Pharma Hub', keyword: 'chemical pharma manufacturing Ankleshwar' },
  { city: 'Bharuch', hub: 'Fertilizers, PCPIR Chemicals & Port SEZ', keyword: 'chemical manufacturer Bharuch Dahej' },
  { city: 'Vapi', hub: 'Kraft Paper, Corrugation & Specialty Dyes', keyword: 'paper packaging chemicals factory Vapi' },
];

export default function BulkHarvesterModal({ onClose, onLeadsHarvested, theme = 'dark' }) {
  const isDark = theme === 'dark';
  const [isRunning, setIsRunning] = useState(false);
  const [currentCityIndex, setCurrentCityIndex] = useState(-1);
  const [cityProgress, setCityProgress] = useState({});
  const [totalHarvestedCount, setTotalHarvestedCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleStartBulkHarvest = async () => {
    setIsRunning(true);
    setIsFinished(false);
    setErrorMessage('');
    let accumulatedLeads = [];
    let countTotal = 0;

    for (let i = 0; i < GUJARAT_CORRIDOR_CITIES.length; i++) {
      const target = GUJARAT_CORRIDOR_CITIES[i];
      setCurrentCityIndex(i);
      setCityProgress((prev) => ({
        ...prev,
        [target.city]: { status: 'loading', count: 0 }
      }));

      try {
        const res = await fetchRealLeadsFromGooglePlaces(target.city, 'Gujarat', target.keyword);
        if (res.success && res.data && res.data.length > 0) {
          accumulatedLeads = [...res.data, ...accumulatedLeads];
          countTotal += res.data.length;
          setCityProgress((prev) => ({
            ...prev,
            [target.city]: { status: 'success', count: res.data.length }
          }));
        } else {
          setCityProgress((prev) => ({
            ...prev,
            [target.city]: { status: 'warning', count: 0, msg: res.error || '0 leads found' }
          }));
        }
      } catch (err) {
        console.error(`Error harvesting ${target.city}:`, err);
        setCityProgress((prev) => ({
          ...prev,
          [target.city]: { status: 'error', count: 0 }
        }));
      }

      setTotalHarvestedCount(countTotal);
      // Small pause between calls to be gentle with Google API rate limits
      await new Promise((r) => setTimeout(r, 600));
    }

    setIsRunning(false);
    setIsFinished(true);

    if (accumulatedLeads.length > 0) {
      onLeadsHarvested(accumulatedLeads);
    }
  };

  const completedCount = Object.values(cityProgress).filter(p => p.status === 'success' || p.status === 'warning').length;
  const progressPercent = Math.round((completedCount / GUJARAT_CORRIDOR_CITIES.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4">
      <div className={`relative w-full max-w-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 max-h-[92vh] overflow-y-auto shadow-2xl border transition-all ${
        isDark ? 'bg-[#0f172a] border-blue-500/40 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-500 p-0.5 shadow-lg shadow-blue-500/30 flex items-center justify-center text-white shrink-0">
              <Radar className={`w-5 h-5 ${isRunning ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30 uppercase">
                  Gujarat Golden Corridor
                </span>
                <span className="text-xs text-emerald-400 font-bold">100% Real Google Verified</span>
              </div>
              <h3 className="text-base sm:text-lg font-black tracking-tight mt-0.5">
                Populate All 10 Gujarat Industrial Hubs
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isRunning}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
              isRunning ? 'opacity-40 cursor-not-allowed' : isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Banner */}
        <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Ye automated scanner poore **Gujarat Golden Industrial Corridor (Vapi to Morbi)** ke 10 top industrial hubs se 100% real Google Maps verified business leads (company names, physical factory addresses aur direct phone numbers) ek saath fetch karta hai.
        </p>

        {/* Progress Bar when running */}
        {isRunning && (
          <div className="mb-4 p-3 rounded-2xl border bg-blue-950/40 border-blue-500/30">
            <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
              <span className="text-blue-400 flex items-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Scanning: {GUJARAT_CORRIDOR_CITIES[currentCityIndex]?.city}...</span>
              </span>
              <span className="text-emerald-400 font-mono">{progressPercent}% Completed</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Finished Success Banner */}
        {isFinished && (
          <div className="mb-4 p-3.5 rounded-2xl border bg-emerald-950/40 border-emerald-500/40 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-emerald-300">
                Gujarat 10-Hub Harvest Complete!
              </h4>
              <p className="text-[11px] text-emerald-400/90 mt-0.5">
                {totalHarvestedCount} Real Google Verified Leads successfully synced into your dashboard table.
              </p>
            </div>
          </div>
        )}

        {/* 10 Cities List Cards */}
        <div className="space-y-2 mb-5 max-h-60 overflow-y-auto pr-1">
          {GUJARAT_CORRIDOR_CITIES.map((item, idx) => {
            const prog = cityProgress[item.city];
            const isCurrentlyScanning = isRunning && currentCityIndex === idx;

            return (
              <div
                key={item.city}
                className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                  isCurrentlyScanning
                    ? 'bg-blue-600/15 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                    : prog?.status === 'success'
                      ? isDark ? 'bg-slate-900/90 border-emerald-500/30' : 'bg-emerald-50/60 border-emerald-300'
                      : isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs font-bold font-mono">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs">{item.city}</span>
                      <span className="text-[9px] px-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono font-bold">
                        GJ
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">{item.hub}</span>
                  </div>
                </div>

                <div className="text-right">
                  {isCurrentlyScanning && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 font-mono animate-pulse">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Scanning...</span>
                    </span>
                  )}
                  {!isCurrentlyScanning && prog?.status === 'success' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>+{prog.count} Leads</span>
                    </span>
                  )}
                  {!isCurrentlyScanning && !prog && (
                    <span className="text-[10px] text-slate-500 font-mono">Pending</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-700/60">
          <div className="text-xs">
            <span className="text-slate-400">Total Leads Harvested: </span>
            <span className="font-mono font-bold text-emerald-400">{totalHarvestedCount}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              disabled={isRunning}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                isRunning ? 'opacity-40 cursor-not-allowed' : isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'border-slate-300 text-slate-600'
              }`}
            >
              {isFinished ? 'Close' : 'Cancel'}
            </button>

            {!isFinished ? (
              <button
                onClick={handleStartBulkHarvest}
                disabled={isRunning}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
                  isRunning
                    ? 'bg-blue-600/50 text-white cursor-wait'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 hover:opacity-90 text-white shadow-blue-500/25'
                }`}
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Harvesting Gujarat...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Start Gujarat Harvest</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30"
              >
                View Leads in Table
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
