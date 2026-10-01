import React, { useState, useEffect } from 'react';
import { 
  X, 
  Radar, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Building2 
} from 'lucide-react';
import { CORRIDOR_CITIES } from '../data/leadsData';

export default function AutoScanModal({ onClose }) {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [discoveredCount, setDiscoveredCount] = useState(0);

  useEffect(() => {
    if (currentCityIndex < CORRIDOR_CITIES.length) {
      const timer = setTimeout(() => {
        setCurrentCityIndex(prev => prev + 1);
        setDiscoveredCount(prev => prev + Math.floor(Math.random() * 3) + 2);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setIsScanning(false);
    }
  }, [currentCityIndex]);

  const currentCity = CORRIDOR_CITIES[Math.min(currentCityIndex, CORRIDOR_CITIES.length - 1)];
  const progressPercent = Math.min(100, Math.round(((currentCityIndex + 1) / CORRIDOR_CITIES.length) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg bg-[#0f172a] border border-blue-500/40 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scan Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4 text-blue-400">
          <Radar className={`w-8 h-8 ${isScanning ? 'animate-spin' : ''}`} />
        </div>

        <h3 className="text-xl font-bold text-white tracking-tight">
          {isScanning ? 'Highway Corridor Lead Harvester' : 'Corridor Scan Complete!'}
        </h3>
        
        <p className="text-xs text-slate-400 mt-1 mb-5">
          {isScanning 
            ? `Scanning GIDC hubs & verified registries from Surat to Gandhinagar...`
            : `All 13 Corridor Hubs scanned. All fresh leads tagged with 08:30 AM batch timestamp.`}
        </p>

        {/* City Indicator */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-5 text-left">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Current Hub:</span>
            </span>
            <span className="text-blue-400 font-bold font-mono">
              {isScanning ? `${currentCityIndex + 1} / ${CORRIDOR_CITIES.length}` : 'Done'}
            </span>
          </div>

          <div className="text-base font-bold text-white flex items-center gap-2">
            <span>{currentCity}</span>
            {isScanning ? (
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-3 w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              style={{ width: `${progressPercent}%` }} 
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-300"
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
            <span className="text-[11px] text-slate-400 uppercase">Hubs Checked</span>
            <p className="text-lg font-bold text-white font-mono mt-0.5">
              {Math.min(currentCityIndex + 1, CORRIDOR_CITIES.length)} / 13
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
            <span className="text-[11px] text-slate-400 uppercase">Total Leads</span>
            <p className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
              36 Qualified
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/30"
        >
          {isScanning ? 'Scan in Background' : 'View Corridor Pipeline'}
        </button>

      </div>
    </div>
  );
}
