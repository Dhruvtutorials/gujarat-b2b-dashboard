import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  MessageCircle, 
  Copy, 
  Check, 
  Mail, 
  FileDown, 
  Navigation, 
  Building2, 
  MapPin, 
  Phone, 
  User, 
  Sparkles,
  CheckCircle2,
  Send
} from 'lucide-react';
import { generateQuotationPdf } from '../services/quotationGenerator';

export default function ShareLeadModal({ lead, onClose, theme = 'dark' }) {
  if (!lead) return null;

  const isDark = theme === 'dark';
  const [copied, setCopied] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  // Clean phone number for links
  const getCleanPhone = () => {
    let digits = (lead.phone || '').replace(/\D/g, '');
    if (digits.startsWith('0')) digits = digits.substring(1);
    if (!digits.startsWith('91') && digits.length === 10) digits = '91' + digits;
    return digits;
  };

  const mapQuery = encodeURIComponent(`${lead.name} ${lead.address || lead.city}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  // Formatted comprehensive lead dossier for sharing
  const generateShareText = () => {
    const stage = lead.status || lead.stage || 'New Lead';
    const notesText = lead.notes ? `\n📝 *Notes:* ${lead.notes}` : '';
    const feeText = lead.webCost ? `₹${(lead.webCost / 1000).toFixed(0)}k Web Dev + ₹${((lead.mrr || 3500) / 1000).toFixed(0)}k/mo AMC` : '₹28k Web Dev + ₹3.5k/mo AMC';

    let webDisplay = 'No Dedicated Website (Fresh Build ❌)';
    if (lead.websiteUrl) {
      webDisplay = `${lead.websiteUrl} (Needs Modern Redesign 🔄)`;
    } else if (lead.website && !lead.website.toLowerCase().includes('no')) {
      webDisplay = `${lead.website} (Needs Modern Redesign 🔄)`;
    }

    return `🏭 *B2B LEAD DOSSIER: ${lead.name}*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 *Category:* ${lead.category || 'Industrial Manufacturing'} (${lead.type || 'GIDC Unit'})
📍 *Hub:* ${lead.city}, Gujarat (${lead.zone || 'GIDC Industrial Belt'})
📌 *Factory Address:* ${lead.address || `${lead.city} GIDC, Gujarat`}
🗺️ *Google Maps:* ${mapsUrl}

👤 *Decision Maker:* ${lead.dm || 'Managing Director / Owner'}
📞 *Contact Phone:* ${lead.phone || 'To be verified'}
🌐 *Web Presence:* ${webDisplay}

💼 *Opportunity Value:* ${feeText}
📊 *CRM Pipeline Stage:* ${stage}${notesText}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Shared via Gujarat B2B Corridor Engine
By: Dhruv Rana (+91 98700 98180)`;
  };

  const shareText = generateShareText();

  // 1. Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // 2. Share via WhatsApp
  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  // 3. Native Device Share (Mobile Sheet)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `B2B Lead: ${lead.name} (${lead.city})`,
          text: shareText,
          url: mapsUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  // 4. Email Share
  const handleEmailShare = () => {
    const subject = encodeURIComponent(`B2B Lead Details: ${lead.name} - ${lead.city}, Gujarat`);
    const body = encodeURIComponent(shareText);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // 5. Download Quotation PDF
  const handleDownloadPdf = () => {
    setDownloadingPdf(true);
    try {
      generateQuotationPdf(lead);
    } catch (e) {
      console.error('PDF error:', e);
    }
    setTimeout(() => setDownloadingPdf(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4">
      <div className={`relative w-full max-w-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border transition-all max-h-[92vh] flex flex-col ${
        isDark ? 'bg-[#0f172a] border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3.5 mb-3 border-b border-slate-700/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-500 p-0.5 shadow-md flex items-center justify-center text-white shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
                  {lead.id}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{lead.city}, Gujarat</span>
              </div>
              <h3 className="text-sm sm:text-base font-black truncate max-w-xs sm:max-w-md mt-0.5">
                Share Lead: {lead.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Snapshot Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 shrink-0 text-xs">
          <div className={`p-2 rounded-xl border ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-[10px] text-slate-400 block font-semibold">Decision Maker</span>
            <span className="font-bold truncate block">{lead.dm}</span>
          </div>

          <div className={`p-2 rounded-xl border ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-[10px] text-slate-400 block font-semibold">Phone</span>
            <span className="font-mono text-emerald-400 font-bold truncate block">{lead.phone}</span>
          </div>

          <div className={`p-2 rounded-xl border ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-[10px] text-slate-400 block font-semibold">Pipeline</span>
            <span className="font-mono text-blue-400 font-bold block">₹{((lead.webCost || 25000) / 1000).toFixed(0)}k</span>
          </div>

          <div className={`p-2 rounded-xl border ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-[10px] text-slate-400 block font-semibold">Status</span>
            <span className="text-amber-400 font-bold truncate block">{lead.status || 'New Lead'}</span>
          </div>
        </div>

        {/* Share Preview Text Area */}
        <div className={`flex-1 min-h-[150px] overflow-y-auto mb-3.5 p-3 rounded-2xl border text-xs font-mono whitespace-pre-wrap leading-relaxed select-all custom-scrollbar ${
          isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          {shareText}
        </div>

        {/* Share Action Buttons Grid */}
        <div className="space-y-2 shrink-0 pt-2 border-t border-slate-700/60">
          
          {/* Main 2 Highlight Buttons: WhatsApp & Native Share */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* WhatsApp Share */}
            <button
              onClick={handleWhatsAppShare}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all active:scale-[0.99]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Share on WhatsApp</span>
            </button>

            {/* Native Mobile Share / Copy */}
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all active:scale-[0.99]"
            >
              <Share2 className="w-4 h-4" />
              <span>{typeof navigator !== 'undefined' && navigator.share ? 'Send via App / Share Sheet' : 'Copy Formatted Dossier'}</span>
            </button>
          </div>

          {/* Secondary Action Row: Copy, Email, Download Quote PDF */}
          <div className="grid grid-cols-3 gap-2">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                copied
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            {/* Email Share */}
            <button
              onClick={handleEmailShare}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>Email</span>
            </button>

            {/* Download PDF Quotation */}
            <button
              onClick={handleDownloadPdf}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                downloadingPdf
                  ? 'bg-indigo-600 text-white border-indigo-400 animate-bounce'
                  : isDark ? 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border-indigo-500/40' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
              }`}
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>PDF Quote</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
