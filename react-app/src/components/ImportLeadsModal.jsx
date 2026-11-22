import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Trash2, 
  Sparkles,
  Building2,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import { apiService } from '../services/apiService';

export default function ImportLeadsModal({ onClose, onLeadsImported, onClearDemoLeads, currentCount = 0, theme = 'dark' }) {
  const isDark = theme === 'dark';
  const [csvText, setCsvText] = useState('');
  const [importStatus, setImportStatus] = useState(null);
  const [parsedPreview, setParsedPreview] = useState([]);

  // Parse CSV text
  const handleParseCsv = (text) => {
    setCsvText(text);
    if (!text.trim()) {
      setParsedPreview([]);
      return;
    }

    try {
      const lines = text.trim().split('\n');
      if (lines.length <= 1) return;

      const header = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
      const parsed = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Simple CSV splitter handling quoted commas
        const cols = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
        const cleanCols = cols.map(c => c.replace(/^"|"$/g, '').trim());

        // Extract fields
        const name = cleanCols[0] || `Industrial Enterprise #${i}`;
        const phone = cleanCols[1] || '';
        const city = cleanCols[2] || 'Surat';
        const dm = cleanCols[3] || 'Director / Owner';
        const category = cleanCols[4] || 'Industrial Manufacturing';
        const address = cleanCols[5] || `${city} GIDC Industrial Estate`;
        const website = cleanCols[6] || '';

        const dateStr = new Date().toISOString().slice(0, 10);
        parsed.push({
          id: `IMP-${city.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
          name,
          phone,
          city,
          state: 'Gujarat',
          dm,
          category,
          address,
          website: website ? 'Active Website' : 'No Web Presence (High Opportunity)',
          websiteUrl: website || null,
          type: 'B2B',
          zone: `${city} GIDC`,
          priority: 'Hot',
          webCost: website ? 20000 : 35000,
          mrr: 4500,
          dateAdded: `${dateStr} 08:30 AM`,
          batchDate: dateStr,
          isNewToday: true,
          isRealImported: true,
        });
      }

      setParsedPreview(parsed);
      setImportStatus({
        type: 'info',
        message: `Detected ${parsed.length} verified leads ready to import!`
      });
    } catch (err) {
      setImportStatus({
        type: 'error',
        message: `Failed to parse CSV format: ${err.message}`
      });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        handleParseCsv(content);
      }
    };
    reader.readAsText(file);
  };

  const handleExecuteImport = () => {
    if (parsedPreview.length === 0) return;

    const updated = apiService.importLeads(parsedPreview);
    if (onLeadsImported) {
      onLeadsImported(parsedPreview);
    }
    setImportStatus({
      type: 'success',
      message: `🎉 Successfully imported ${parsedPreview.length} real leads into your live dashboard!`
    });
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleDownloadTemplate = () => {
    const template = `Company Name,Phone,City,Decision Maker,Category,Address,Website
"Surat Precision Engineering","9825012345","Surat","Rameshbhai Patel","CNC Machinery","Plot 45 Pandesara GIDC Surat",""
"Morbi Ceramic Tiles Pvt Ltd","9824098765","Morbi","Gordhanbhai Patel","Ceramic Vitrified Tiles","8-A National Highway Morbi","http://example.com"
"Ankleshwar Pharma Intermediates","9879511223","Ankleshwar","Dr. Rajesh Shah","Active Pharma Chemical","Plot 112 GIDC Ankleshwar",""`;

    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'real_leads_import_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4">
      <div className={`relative w-full max-w-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 max-h-[92vh] overflow-y-auto shadow-2xl border transition-all ${
        isDark ? 'bg-[#0f172a] border-emerald-500/40 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">Import Real Verified Leads</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  CSV / Excel
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Upload genuine factory contacts from SGCCI, Justdial, GIDC or your phone contacts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Options: Template Download & Clear Demo Data */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800 mb-4 text-xs">
          <button
            onClick={handleDownloadTemplate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-bold transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV Template</span>
          </button>

          {onClearDemoLeads && (
            <button
              onClick={onClearDemoLeads}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 font-bold transition-all"
              title="Delete demonstration sample leads from database"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Sample Demo Leads ({currentCount})</span>
            </button>
          )}
        </div>

        {/* Upload File Drag & Drop Box */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-300 mb-2">
            1. Upload CSV File or Paste Data:
          </label>
          <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-900/40 relative">
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <Upload className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-200">
              Click to select a CSV file or drag and drop
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Supports: Company Name, Phone, City, Contact Person, Category, Address, Website
            </p>
          </div>
        </div>

        {/* Or Paste CSV text */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Or Paste CSV text directly:
          </label>
          <textarea
            rows={3}
            value={csvText}
            onChange={(e) => handleParseCsv(e.target.value)}
            placeholder='Company Name,Phone,City,Decision Maker,Category,Address,Website&#10;"Shree Balaji Textile","9825123456","Surat","Rameshbhai","Textiles","Pandesara GIDC",""'
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Status Alert */}
        {importStatus && (
          <div className={`p-3 rounded-xl mb-4 text-xs flex items-center gap-2 ${
            importStatus.type === 'success' 
              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
              : importStatus.type === 'error'
                ? 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
                : 'bg-blue-500/15 border border-blue-500/30 text-blue-300'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{importStatus.message}</span>
          </div>
        )}

        {/* Parsed Preview Table */}
        {parsedPreview.length > 0 && (
          <div className="mb-4">
            <span className="text-xs font-bold text-slate-300 block mb-2">
              Preview of {parsedPreview.length} Real Leads to be added:
            </span>
            <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-800 divide-y divide-slate-800 text-xs bg-slate-950/70">
              {parsedPreview.map((lead, idx) => (
                <div key={idx} className="p-2.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="font-bold text-white truncate block">{lead.name}</span>
                    <span className="text-[11px] text-slate-400">
                      {lead.city} • {lead.dm} • {lead.category}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-emerald-400 font-bold block">{lead.phone || 'No Phone'}</span>
                    <span className="text-[10px] text-blue-400">{lead.website.includes('No') ? 'Zero Website' : 'Active Web'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleExecuteImport}
            disabled={parsedPreview.length === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Import {parsedPreview.length} Leads to Dashboard</span>
          </button>
        </div>

      </div>
    </div>
  );
}
