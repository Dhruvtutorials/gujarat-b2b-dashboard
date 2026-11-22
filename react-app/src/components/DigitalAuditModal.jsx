import React, { useState } from 'react';
import { 
  X, 
  FileDown, 
  MessageCircle, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  ShieldAlert, 
  Copy, 
  Check, 
  Globe, 
  Search, 
  Zap, 
  Building2 
} from 'lucide-react';
import { generateDigitalAuditPdf } from '../services/auditReportGenerator';

export default function DigitalAuditModal({ lead, onClose, theme = 'dark' }) {
  if (!lead) return null;

  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const isDark = theme === 'dark';
  const hasWebsite = Boolean(lead.websiteUrl && lead.websiteUrl.trim());

  const webScore = hasWebsite ? 38 : 12;
  const seoScore = hasWebsite ? 22 : 8;
  const metaAdsScore = 0;
  const crmScore = 15;
  const overallScore = Math.round((webScore + seoScore + metaAdsScore + crmScore) / 4);

  const senderPhone = localStorage.getItem('corridor_sender_phone') || '+91 98700 98180';
  const senderName = localStorage.getItem('corridor_sender_name') || 'Dhruv Rana';

  const handleDownload = () => {
    setDownloading(true);
    try {
      generateDigitalAuditPdf(lead);
    } catch (err) {
      console.error('PDF error:', err);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const whatsappMessage = `*CONFIDENTIAL DIGITAL HEALTH & AUDIT REPORT*\n` +
    `🏢 *Factory:* ${lead.company}\n` +
    `📍 *Location:* ${lead.city}, Gujarat\n` +
    `👤 *Attn:* ${lead.dm || 'Managing Director'}\n\n` +
    `🚨 *Digital Health Score:* ${overallScore}/100 (CRITICAL INQUIRY LEAK)\n\n` +
    `*Key Audit Findings:*\n` +
    `1. *Web Portal:* ${hasWebsite ? 'Outdated mobile design & slow catalog' : 'ZERO online portal (82% mobile buyers bounce)'}\n` +
    `2. *Google SEO:* Not ranking on Page 1 for wholesale inquiries\n` +
    `3. *Meta Ads:* 0 active ads (Competitors running 8-15 active ads)\n` +
    `4. *Estimated Lost Inquiries:* 25 to 50 Bulk Dealer leads/month\n\n` +
    `💡 *Immediate Action Plan:* We have prepared a 30-day rescue roadmap to capture high-value buyer orders.\n\n` +
    `Can we connect for a quick 10-minute strategy call today?\n\n` +
    `Regards,\n*${senderName}* | 📞 ${senderPhone}\nGujarat Industrial Growth Partner`;

  const handleWhatsApp = () => {
    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
    const phoneToUse = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const url = `https://api.whatsapp.com/send?phone=${phoneToUse}&text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden my-auto ${
        isDark ? 'bg-[#0b1120] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Header Banner */}
        <div className="px-5 py-4 bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 border-b border-rose-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Digital Health & Competitor Audit</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono font-bold">
                  HIGH LOSS
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {lead.company} • {lead.city} ({lead.sector})
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

        {/* Content Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Overall Score Highlight */}
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-rose-50 border-rose-200'
          }`}>
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Critical Growth Leak Identified</span>
              </div>
              <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                This factory is losing estimated <strong className="text-rose-500">25 to 50 bulk inquiries monthly</strong> to regional competitors with active Meta ads & modern web catalogs.
              </p>
            </div>
            <div className="shrink-0 text-center px-4 py-2 rounded-xl bg-rose-600 text-white shadow-lg shadow-rose-600/30">
              <span className="text-2xl font-black">{overallScore}</span>
              <span className="text-xs opacity-80 block font-mono">/ 100 SCORE</span>
            </div>
          </div>

          {/* 4 Pillars Breakdown */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Four-Pillar Performance Gap Analysis
            </h4>

            {/* Pillar 1: Web */}
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold">1. Web & Mobile Portal</span>
                </div>
                <span className="text-xs font-bold text-rose-400 font-mono">{webScore}/100</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {hasWebsite 
                  ? 'Website exists but lacks mobile speed optimization, verified GST catalog & instant WhatsApp RFQ.' 
                  : 'Zero website detected. 82% of modern wholesale buyers look up online catalogs before ordering.'}
              </p>
            </div>

            {/* Pillar 2: Google SEO */}
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold">2. Google Search & GMB Map Visibility</span>
                </div>
                <span className="text-xs font-bold text-amber-400 font-mono">{seoScore}/100</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Unranked for high-intent keywords like "{lead.sector} manufacturer in {lead.city}". Missing GMB verification and 5-star customer reviews.
              </p>
            </div>

            {/* Pillar 3: Meta Ads */}
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-bold">3. Meta (FB/Instagram) Ads Pipeline</span>
                </div>
                <span className="text-xs font-bold text-rose-400 font-mono">0/100 (INACTIVE)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Zero active ad campaigns. Competitors are actively targeting builders, contractors, and wholesale dealers across Maharashtra & Gujarat.
              </p>
            </div>

            {/* Pillar 4: Lead CRM */}
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold">4. WhatsApp Automation & Inbound CRM</span>
                </div>
                <span className="text-xs font-bold text-amber-400 font-mono">{crmScore}/100</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Inquiries rely on manual reception calling. No automated catalog distribution or instant lead qualification sequence.
              </p>
            </div>
          </div>

          {/* Action Roadmap Alert */}
          <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${
            isDark ? 'bg-blue-950/20 border-blue-900/40 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}>
            <Zap className="w-5 h-5 text-blue-400 shrink-0" />
            <div className="text-xs">
              <strong className="block font-bold">Recommended 30-Day Digital Rescue:</strong>
              Launch a high-speed web catalog + Meta wholesale ads engine to generate 20+ inquiries in month 1.
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className={`p-4 border-t flex flex-wrap items-center justify-between gap-2.5 ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              copied ? 'bg-emerald-600 text-white border-emerald-500' : isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-700 border-slate-300'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Pitch' : 'Copy Audit Text'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
            >
              <FileDown className="w-4 h-4" />
              <span>{downloading ? 'Creating PDF...' : 'Download 1-Page PDF'}</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Audit on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
