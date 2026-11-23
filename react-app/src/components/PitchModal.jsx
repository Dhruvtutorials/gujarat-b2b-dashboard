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
  RefreshCw,
  Target,
  Zap
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
  const [recipientPhone, setRecipientPhone] = useState(lead.phone || '');

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
    if (pitchType === 'marketing') {
      return `Namaste ${lead.dm} ji,

I am ${senderName} from Gujarat B2B Web & Digital Solutions (${senderPhone}).
We reviewed ${lead.name} in ${lead.city} (${lead.zone || 'GIDC'}).

In your domain of *${lead.category}*, over 80% of wholesale buyers, distributors, and bulk purchasers now look for verified manufacturers directly on Google Search and Meta (Facebook & Instagram).

We provide a complete 360° Industrial Digital Growth System for Gujarat manufacturers:
1. 🎯 *Meta Ads (FB & Instagram Lead Gen)*: Direct Pan-India buyer inquiries routed straight to your WhatsApp.
2. 🔍 *Google SEO & Maps Ranking*: Top 10 Google search ranking when buyers search for ${lead.category} suppliers.
3. 🌐 *Modern B2B Digital Catalog Portal*: Fast, mobile-first showcase with technical machinery specs.
4. 📱 *Monthly Social Media & Factory Showcase*: High-grade creatives highlighting your manufacturing capacity & dispatch.

We are traveling through the ${lead.city} corridor this week and would love to visit your facility at:
📍 *${lead.address}*

Could we schedule a quick 15-minute in-person meeting on Wednesday or Thursday to showcase a tailored Digital Growth Plan for ${lead.name}?

Best Regards,
${senderName}
B2B Digital Growth Architect
Phone: ${senderPhone}`;
    }

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
    let digits = (recipientPhone || lead.phone || '').replace(/\D/g, '');
    if (digits.startsWith('0')) {
      digits = digits.substring(1);
    }
    if (!digits.startsWith('91') && digits.length === 10) {
      digits = '91' + digits;
    }
    if (!digits) {
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
      return;
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
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Personalized Meeting Pitch</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                  {lead.id}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Tailored for physical factory visits & direct WhatsApp booking
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

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1 text-[11px]">
              <PhoneCall className="w-3 h-3 text-cyan-400" />
              <span>Client Phone:</span>
            </span>
            <input
              type="text"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              placeholder="Client WhatsApp #"
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-cyan-300 font-mono font-bold text-xs focus:outline-none focus:border-cyan-500 max-w-[140px]"
            />
            {!recipientPhone && (
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent((lead.name || '') + ' ' + (lead.city || 'Gujarat') + ' phone number')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-0.5"
                title="Search real number on Google Maps"
              >
                <span>🔍 Find</span>
              </a>
            )}
          </div>
        </div>

        {/* Pitch Mode Toggle & Website Inspector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400">Pitch Angle:</span>
            <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700 flex-wrap gap-0.5">
              <button
                type="button"
                onClick={() => setPitchType('marketing')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                  pitchType === 'marketing'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3 h-3 text-amber-300" />
                <span>360° Meta Ads & Marketing</span>
              </button>
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
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Prospect</span>
            <span className="text-slate-200 font-bold truncate block">{lead.name}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Contact (DM)</span>
            <span className="text-slate-200 font-bold truncate block">{lead.dm}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Phone</span>
            <span className="text-emerald-400 font-mono font-bold truncate block">{lead.phone || 'N/A'}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">City Hub</span>
            <span className="text-blue-400 font-bold truncate block">{lead.city}</span>
          </div>
        </div>

        {/* Pitch Message Preview Box */}
        <div className="relative mb-3 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Personalized WhatsApp Pitch (Physical Meeting Hook Included):</span>
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
          </div>

          <textarea
            readOnly
            value={pitchText}
            className="w-full h-44 sm:h-52 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-xs font-mono text-slate-200 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 leading-relaxed"
          />
        </div>

        {/* Webhook Status Alert (if sent) */}
        {webhookResult && (
          <div className={`mb-3 p-2.5 rounded-xl border text-xs flex items-center justify-between ${
            webhookResult.success 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{webhookResult.message || (webhookResult.success ? 'Pitch logged to CRM webhook' : webhookResult.error)}</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {webhookResult.webhookUrl ? 'Target: custom webhook' : 'Mode: local simulation'}
            </span>
          </div>
        )}

        {/* Actions Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2">
            {/* Maps Route Navigation */}
            <button
              onClick={handleMapRoute}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
              title="Open physical factory in Google Maps"
            >
              <Navigation className="w-3.5 h-3.5 text-rose-400" />
              <span>Map Route</span>
            </button>

            {/* Direct Phone Call */}
            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
                title="Call Decision Maker directly"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                <span>Call DM</span>
              </a>
            )}

            {/* Webhook / CRM Push */}
            <button
              onClick={handleSendWebhook}
              disabled={isSendingWebhook}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-all disabled:opacity-50"
              title="Dispatch lead payload to n8n / Zapier webhook"
            >
              {isSendingWebhook ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5 text-indigo-400" />}
              <span>Sync Webhook</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {/* Direct WhatsApp Launch */}
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Send WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
