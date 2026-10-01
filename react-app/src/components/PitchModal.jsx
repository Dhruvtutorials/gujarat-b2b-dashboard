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
  Building2 
} from 'lucide-react';

export default function PitchModal({ lead, onClose }) {
  if (!lead) return null;

  const [copied, setCopied] = useState(false);

  // Generate personalized WhatsApp pitch with physical meeting address
  const generatePitchText = () => {
    return `Namaste ${lead.dm} ji,

I am Dhruv Rana from WebCorridor Solutions. We specialize in B2B Web Portals, Online Catalogues & Google Lead Acceleration for leading manufacturers across Gujarat (Surat ➔ Gandhinagar corridor).

We reviewed *${lead.name}* in ${lead.city} (${lead.zone}).
Currently, your digital footprint shows: ${lead.website === 'No Website' ? 'No dedicated digital portal / website' : 'Outdated catalogue'}. 
In your domain of *${lead.category}*, over 70% of high-ticket B2B buyers search and verify suppliers online before placing orders.

We are traveling through the corridor this week and would love to visit your facility at:
📍 *${lead.address}*

Could we schedule a quick 15-minute in-person meeting on Wednesday or Thursday to showcase a live interactive portal mockup specifically designed for ${lead.name}?

Best Regards,
Dhruv Rana
Corridor B2B Digital Architect
Phone: +91 98250 19350`;
  };

  const pitchText = generatePitchText();

  const handleCopy = () => {
    navigator.clipboard.writeText(pitchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(pitchText);
    const cleanPhone = lead.phone.replace(/\D/g, '');
    window.open(`https://wa.me/91${cleanPhone}?text=${encoded}`, '_blank');
  };

  const handleMapRoute = () => {
    const query = encodeURIComponent(`${lead.name} ${lead.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Direct WhatsApp & Meeting Pitch</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                  {lead.id}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                To: <span className="text-slate-200 font-semibold">{lead.dm}</span> ({lead.name}) - {lead.city}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Physical Address Notice */}
        <div className="my-4 p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-start gap-2.5 text-xs text-slate-300">
          <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-rose-400 font-semibold">Physical Meeting Location:</span>
            <p className="text-slate-300 mt-0.5 font-sans leading-relaxed">{lead.address}</p>
          </div>
        </div>

        {/* Pitch Body Preview */}
        <div className="flex-1 overflow-y-auto mb-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
          {pitchText}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={handleMapRoute}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all border border-slate-700"
            >
              <Navigation className="w-3.5 h-3.5 text-rose-400" />
              <span>Open Map Route</span>
            </button>
            <a
              href={`tel:${lead.phone}`}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all border border-slate-700"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
              <span>Call ({lead.phone})</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
