import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Copy, 
  Check, 
  Navigation, 
  PhoneCall, 
  ExternalLink, 
  Sparkles, 
  MapPin, 
  Building2,
  Send,
  Loader2,
  CheckCircle2,
  User,
  Phone,
  Globe,
  RefreshCw
} from 'lucide-react';
import { apiService } from '../services/apiService';

export default function PitchModal({ lead, onClose }) {
  if (!lead) return null;

  const hasExistingSite = Boolean(lead.websiteUrl && lead.websiteUrl.trim()) || (lead.website && !lead.website.toLowerCase().includes('no'));
  const [pitchType, setPitchType] = useState(() => (hasExistingSite ? 'redesign' : 'fresh'));

  const [senderName, setSenderName] = useState(() => {
    return localStorage.getItem('corridor_sender_name') || 'Dhruv Rana';
  });
  const [senderPhone, setSenderPhone] = useState(() => {
    return localStorage.getItem('corridor_sender_phone') || '+91 98700 98180';
  });

  const [copied, setCopied] = useState(false);
  const [isSendingWebhook, setIsSendingWebhook] = useState(false);
  const [webhookResult, setWebhookResult] = useState(null);

  const handleUpdateSenderPhone = (val) => {
    setSenderPhone(val);
    localStorage.setItem('corridor_sender_phone', val);
  };

  const handleUpdateSenderName = (val) => {
    setSenderName(val);
    localStorage.setItem('corridor_sender_name', val);
  };

  // Generate personalized WhatsApp pitch with physical meeting address
  const generatePitchText = () => {
    if (pitchType === 'redesign') {
      const siteDisplay = lead.websiteUrl || 'your company website';
      return `Namaste ${lead.dm} ji,

I am ${senderName} from Gujarat B2B Web Solutions. We specialize in Modern B2B Web Redesign, Digital Catalogues & Google Lead Acceleration for leading manufacturers across Gujarat (${lead.city} corridor).

We audited your company's existing website:
🌐 *${siteDisplay}*

While your manufacturing facility at ${lead.city} is top-tier, your current website is outdated, slow on mobile smartphones, and lacks an interactive digital product catalogue. In your sector of *${lead.category}*, over 70% of high-ticket B2B & export buyers verify suppliers online before placing bulk orders.

We are traveling through the ${lead.city} corridor this week and would love to visit your facility at:
📍 *${lead.address}*

Could we schedule a quick 15-minute in-person meeting on Wednesday or Thursday to showcase a live interactive Redesign Mockup specifically modernized for ${lead.name}?

Best Regards,
${senderName}
Corridor B2B Digital Architect
Phone: ${senderPhone}`;
    }

    return `Namaste ${lead.dm} ji,

I am ${senderName} from Gujarat B2B Web Solutions. We specialize in B2B Web Portals, Online Digital Catalogues & Google Lead Acceleration for leading manufacturers across Gujarat (${lead.city} corridor).

We reviewed *${lead.name}* in ${lead.city} (${lead.zone || 'GIDC'}).
Currently, your digital footprint shows: No dedicated digital portal / website. 
In your domain of *${lead.category}*, over 70% of high-ticket B2B buyers search and verify suppliers online before placing orders.

We are traveling through the corridor this week and would love to visit your facility at:
📍 *${lead.address}*

Could we schedule a quick 15-minute in-person meeting on Wednesday or Thursday to showcase a live interactive portal mockup specifically designed for ${lead.name}?

Best Regards,
${senderName}
Corridor B2B Digital Architect
Phone: ${senderPhone}`;
  };

  const pitchText = generatePitchText();

  const handleCopy = () => {
    navigator.clipboard.writeText(pitchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(pitchText);
    let digits = (lead.phone || '').replace(/\D/g, '');
    if (digits.startsWith('0')) {
      digits = digits.substring(1);
    }
    if (!digits.startsWith('91') && digits.length === 10) {
      digits = '91' + digits;
    }
    window.open(`https://wa.me/${digits}?text=${encoded}`, '_blank');
  };

  const handleMapRoute = () => {
    const query = encodeURIComponent(`${lead.name} ${lead.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleSendWebhook = async () => {
    setIsSendingWebhook(true);
    setWebhookResult(null);
    try {
      const res = await apiService.sendPitchWebhook(lead, pitchText);
      setWebhookResult(res);
    } catch (e) {
      setWebhookResult({ success: false, error: e.message });
    } finally {
      setIsSendingWebhook(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-700/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-2xl flex flex-col max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Direct WhatsApp & Meeting Pitch</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                  {lead.id}
                </span>
              </h3>
              <p className="text-xs text-slate-400 truncate max-w-xs sm:max-w-md">
                To: <span className="text-slate-200 font-semibold">{lead.dm}</span> ({lead.name}) • {lead.city}, Gujarat
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

        {/* Sender Profile Quick Bar */}
        <div className="mb-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1 text-[11px]">
              <User className="w-3 h-3 text-blue-400" />
              <span>Sender Name:</span>
            </span>
            <input
              type="text"
              value={senderName}
              onChange={(e) => handleUpdateSenderName(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-white font-bold text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1 text-[11px]">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>My Phone:</span>
            </span>
            <input
              type="text"
              value={senderPhone}
              onChange={(e) => handleUpdateSenderPhone(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-emerald-300 font-mono font-bold text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Pitch Mode Toggle & Website Inspector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400">Pitch Angle:</span>
            <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => setPitchType('redesign')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  pitchType === 'redesign'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <RefreshCw className="w-3 h-3" />
                <span>Website Redesign</span>
              </button>
              <button
                type="button"
                onClick={() => setPitchType('fresh')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  pitchType === 'fresh'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>New Portal Pitch</span>
              </button>
            </div>
          </div>

          {/* Inspect Old Website Link */}
          {lead.websiteUrl && (
            <a
              href={lead.websiteUrl.startsWith('http') ? lead.websiteUrl : `http://${lead.websiteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 border border-blue-500/30 text-[11px] font-bold transition-all self-start sm:self-auto"
              title="Open current website in a new window"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Inspect Old Site ({lead.websiteUrl.replace(/^https?:\/\/(www\.)?/, '')})</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Lead Context Quick Snapshot */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 mb-3 text-xs grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Target Company</span>
            <span className="font-bold text-slate-200 truncate block">{lead.name}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Decision Maker</span>
            <span className="font-bold text-slate-200 truncate block">{lead.dm}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Client Phone</span>
            <span className="font-mono text-emerald-400 font-semibold block">{lead.phone}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Web Dev Potential</span>
            <span className="font-mono text-blue-400 font-bold block">₹{((lead.webCost || 28000) / 1000).toFixed(0)}k</span>
          </div>
        </div>

        {/* Message Preview Box */}
        <div className="flex-1 min-h-[160px] bg-slate-950 border border-slate-800 rounded-2xl p-3.5 mb-3 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed overflow-y-auto select-all selection:bg-emerald-500/30 selection:text-white">
          {pitchText}
        </div>

        {/* Webhook Feedback (if triggered) */}
        {webhookResult && (
          <div className={`p-3 rounded-xl mb-3 text-xs flex items-center justify-between border ${
            webhookResult.success 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{webhookResult.message || webhookResult.error || 'Webhook Executed'}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleMapRoute}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all border border-slate-700"
              title="Inspect exact GPS pin on Google Maps"
            >
              <Navigation className="w-3.5 h-3.5 text-rose-400" />
              <span>Verify Location</span>
            </button>

            <button
              onClick={handleCopy}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                copied 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Pitch'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`tel:${(lead.phone || '').replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 transition-all"
              title="Direct Phone Call"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>

            <button
              onClick={handleWhatsApp}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-500/25"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Send WhatsApp Now</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
