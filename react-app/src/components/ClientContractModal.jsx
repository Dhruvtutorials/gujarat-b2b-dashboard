import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  FileDown, 
  MessageCircle, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  Lock
} from 'lucide-react';
import { generateContractPdf } from '../services/contractGenerator';
import { DIGITAL_MARKETING_PACKAGES } from '../data/packagesData';

export default function ClientContractModal({ lead, onClose, theme = 'dark' }) {
  if (!lead) return null;

  const [selectedPkgId, setSelectedPkgId] = useState('growth');
  const [downloading, setDownloading] = useState(false);

  const isDark = theme === 'dark';
  const selectedPackage = DIGITAL_MARKETING_PACKAGES.find(p => p.id === selectedPkgId) || DIGITAL_MARKETING_PACKAGES[1];

  const senderPhone = localStorage.getItem('corridor_sender_phone') || '+91 98700 98180';
  const senderName = localStorage.getItem('corridor_sender_name') || 'Dhruv Rana';

  const handleDownload = () => {
    setDownloading(true);
    try {
      generateContractPdf(lead, selectedPackage);
    } catch (err) {
      console.error('Contract generation error:', err);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const handleWhatsApp = () => {
    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
    const phoneToUse = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = `*OFFICIAL MASTER DIGITAL MARKETING SERVICE AGREEMENT*\n` +
      `🏢 *Client:* ${lead.company}\n` +
      `👤 *Attn:* ${lead.dm || 'Managing Director'}\n` +
      `📍 *Location:* ${lead.city}, Gujarat\n\n` +
      `Dear Sir,\n\n` +
      `We have drafted the official 2-page *Master Service Agreement & Scope of Work* for *${selectedPackage.name}*:\n` +
      `• *Setup & Portal Development:* ${selectedPackage.setupFee} (50% Advance / 50% Go-Live)\n` +
      `• *Monthly Retainer:* ${selectedPackage.monthlyRetainer}/month (Ad management, SEO & Creatives)\n` +
      `• *Direct Ad Spend:* Billed directly to your card for 100% transparency & GST input tax credit.\n` +
      `• *IP Ownership:* 100% of website source code, ad accounts & lead database belongs to you.\n\n` +
      `I am sending the legal PDF copy for your review and execution.\n\n` +
      `Best regards,\n*${senderName}* | 📞 ${senderPhone}\nGujarat Industrial Growth Partner`;

    const url = `https://api.whatsapp.com/send?phone=${phoneToUse}&text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden my-auto ${
        isDark ? 'bg-[#0b1120] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 border-b border-indigo-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Client Service Agreement & Contract</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                  2-PAGE LEGAL PDF
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Ready-to-Sign Contract for {lead.company} ({lead.city})
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Select Package Tier */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Package Tier for Contract:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {DIGITAL_MARKETING_PACKAGES.map((pkg) => {
                const isSelected = selectedPkgId === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPkgId(pkg.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected 
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-600/20' 
                        : isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs font-bold block text-white truncate">{pkg.name}</span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400 block mt-0.5">{pkg.setupFee} setup</span>
                    <span className="text-[10px] text-slate-400 block">{pkg.monthlyRetainer}/mo</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contract Clauses Summary */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Contract Structure & Protection Clauses:
            </h4>

            <div className={`p-3 rounded-xl border space-y-2 text-xs ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>50-50 Payment Milestones</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-6">
                50% Advance at contract signing, 50% upon successful portal launch & ad account configuration.
              </p>

              <div className="flex items-center gap-2 text-blue-400 font-bold pt-1 border-t border-slate-800/60">
                <Lock className="w-4 h-4 shrink-0" />
                <span>100% Client Intellectual Property</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-6">
                Client holds complete ownership of all domains, source code, ad creative assets, and lead databases.
              </p>

              <div className="flex items-center gap-2 text-amber-400 font-bold pt-1 border-t border-slate-800/60">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Direct Meta/Google Billing & GST ITC</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-6">
                Ad media budgets are charged straight to the client's corporate card for 100% transparency and full GST Input Tax Credit.
              </p>
            </div>
          </div>

          {/* Signatures Preview */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 text-xs ${
            isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
          }`}>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400">Service Provider</span>
              <strong className="text-slate-200 block">{senderName} Digital Consulting</strong>
              <span className="text-[11px] text-slate-400">{senderPhone}</span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] uppercase font-bold text-slate-400">Client Manufacturer</span>
              <strong className="text-slate-200 block">{lead.company}</strong>
              <span className="text-[11px] text-slate-400">{lead.dm || 'Managing Director'}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`p-4 border-t flex flex-wrap items-center justify-between gap-2.5 ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
            >
              <FileDown className="w-4 h-4" />
              <span>{downloading ? 'Generating Contract...' : 'Download Legal Agreement (PDF)'}</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Draft via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
