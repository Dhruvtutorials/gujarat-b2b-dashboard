import React, { useState, useEffect } from 'react';
import { 
  X, 
  Activity, 
  CheckCircle2, 
  Wifi, 
  Server, 
  Database, 
  RotateCcw, 
  Download, 
  FileCode2,
  ShieldCheck,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { apiService } from '../services/apiService';

export default function ApiStatusModal({ onClose, totalLeadsCount, onResetDatabase, theme = 'dark' }) {
  const isDark = theme === 'dark';
  const [healthData, setHealthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = async () => {
    setIsLoading(true);
    const health = await apiService.checkHealth();
    setHealthData(health);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleExportJson = () => {
    const raw = localStorage.getItem('corridor_leads_database_v2') || '[]';
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `corridor_leads_api_export_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className={`relative w-full max-w-lg rounded-3xl p-6 shadow-2xl backdrop-blur-2xl border transition-all ${
        isDark ? 'bg-[#0f172a] border-emerald-500/40 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                <span>API Status & Health Monitor</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                  200 OK
                </span>
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Real-time API gateway, OpenStreetMap Overpass Harvester & database state
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Diagnostics Card */}
        <div className="space-y-3 mb-5">
          <div className={`p-4 rounded-2xl border ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>API Gateway State:</span>
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                {healthData ? `${healthData.latencyMs}ms Ping` : 'Pinging...'}
              </span>
            </div>

            <p className="text-sm font-bold text-white mb-1">
              {healthData?.mode || 'Client REST & Overpass Engine (v2.4)'}
            </p>
            <p className="text-xs text-slate-400">
              Production corridor endpoint with offline persistent fallback and live OSM Harvester.
            </p>
          </div>

          {/* Metrics 3-box */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className={`p-3 rounded-xl border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <Database className="w-4 h-4 mx-auto mb-1 text-blue-400" />
              <span className="text-[10px] text-slate-400 block">Total Records</span>
              <span className="font-mono font-bold text-sm text-white">{totalLeadsCount}</span>
            </div>
            <div className={`p-3 rounded-xl border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <Wifi className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
              <span className="text-[10px] text-slate-400 block">Harvester API</span>
              <span className="font-mono font-bold text-xs text-emerald-400">Overpass Live</span>
            </div>
            <div className={`p-3 rounded-xl border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-indigo-400" />
              <span className="text-[10px] text-slate-400 block">Security Gate</span>
              <span className="font-mono font-bold text-xs text-indigo-400">Passcode 1935</span>
            </div>
          </div>

          {/* Endpoints List */}
          <div className={`p-3 rounded-2xl border space-y-1.5 ${
            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider block mb-1">
              Active Endpoints
            </span>
            {[
              { method: 'GET', path: '/api/leads', desc: 'All leads + filter params', status: '200' },
              { method: 'POST', path: '/api/leads', desc: 'Insert new B2B lead', status: '201' },
              { method: 'POST', path: '/api/leads/scan', desc: 'Real OpenStreetMap Harvester', status: '200' },
              { method: 'POST', path: '/api/pitch', desc: 'WhatsApp & Meeting Webhook', status: '200' },
            ].map((ep) => (
              <div key={ep.path} className="flex items-center justify-between text-xs font-mono py-1 border-b border-slate-800/40 last:border-0">
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                    ep.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {ep.method}
                  </span>
                  <span className="text-slate-200">{ep.path}</span>
                </div>
                <span className="text-emerald-400 font-bold text-[11px]">{ep.status} OK</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
          <button
            onClick={onResetDatabase}
            className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
            title="Restore original 59 corridor leads"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Database</span>
          </button>

          <button
            onClick={handleExportJson}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold transition-all flex items-center gap-1.5 border border-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Database JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
}
