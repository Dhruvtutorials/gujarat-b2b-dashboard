import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  Copy, 
  Check, 
  Send, 
  Calendar, 
  Flame, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function FollowUpDripModal({ lead, onClose, theme = 'dark' }) {
  if (!lead) return null;

  const [copiedDay, setCopiedDay] = useState(null);
  const [sentStages, setSentStages] = useState(() => {
    try {
      const saved = localStorage.getItem(`drip_status_${lead.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const isDark = theme === 'dark';
  const senderPhone = localStorage.getItem('corridor_sender_phone') || '+91 98700 98180';
  const senderName = localStorage.getItem('corridor_sender_name') || 'Dhruv Rana';

  const markStageSent = (dayKey) => {
    const updated = { ...sentStages, [dayKey]: new Date().toLocaleDateString('en-IN') };
    setSentStages(updated);
    try {
      localStorage.setItem(`drip_status_${lead.id}`, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
  const phoneToUse = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

  const sendWhatsApp = (text, dayKey) => {
    markStageSent(dayKey);
    const url = `https://api.whatsapp.com/send?phone=${phoneToUse}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const copyText = (text, dayKey) => {
    navigator.clipboard.writeText(text);
    setCopiedDay(dayKey);
    setTimeout(() => setCopiedDay(null), 2000);
  };

  const DRIP_STEPS = [
    {
      id: 'day1',
      title: 'Day 1: Instant Proposal & Digital Audit Intro',
      timing: 'Immediately after discovery call or initial contact',
      badge: 'Step 1: Pitch',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      message: `Namaste ${lead.dm || 'Sir'},\n\n` +
        `This is *${senderName}* from Gujarat B2B Industrial Growth Consulting.\n\n` +
        `Following up on *${lead.company}*, we have completed a quick *Digital Readiness & Competitor Audit* for your ${lead.sector || 'manufacturing'} unit in ${lead.city}.\n\n` +
        `📊 *Audit Result:* We identified that competing factories are actively running Meta & Google ads, while your factory is currently missing 25-50 bulk dealer inquiries every month.\n\n` +
        `We have shared our official proposal & quotation with you. Can we take 10 minutes on phone today to discuss our 30-day inquiry generation plan?\n\n` +
        `Warm regards,\n*${senderName}* | 📞 ${senderPhone}`
    },
    {
      id: 'day3',
      title: 'Day 3: Regional Competitor Alert & Demand Proof',
      timing: '48 to 72 hours after first pitch (FOMO trigger)',
      badge: 'Step 2: Urgency',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      message: `Namaste ${lead.dm || 'Sir'},\n\n` +
        `Wanted to share an interesting market update for *${lead.city}*:\n\n` +
        `Over the last 7 days, online search volume for *${lead.sector || 'industrial manufacturing'}* products from dealers in Maharashtra, Rajasthan & Delhi has surged by 35%.\n\n` +
        `Currently, regional competitors with active Meta ads & Google ranking are capturing 100% of these calls.\n\n` +
        `With our *360° Industrial Growth Package*, we can position *${lead.company}* directly in front of these verified wholesale buyers.\n\n` +
        `Shall I share 2 sample creative concepts designed for your product line?\n\n` +
        `Regards,\n*${senderName}* | 📞 ${senderPhone}`
    },
    {
      id: 'day7',
      title: 'Day 7: Client Case Study & ROI Demonstration',
      timing: '1 week after initial pitch (Proof & credibility)',
      badge: 'Step 3: Social Proof',
      badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      message: `Hello ${lead.dm || 'Sir'},\n\n` +
        `Quick 30-second update: A similar manufacturing client in the Gujarat corridor recently launched our *Growth Meta Ads + Web Portal* setup.\n\n` +
        `📈 *Real 30-Day Results:*\n` +
        `• 42 verified wholesale RFQs received\n` +
        `• 3 container/bulk lot dealer orders closed\n` +
        `• 14x ROI generated on their total marketing investment\n\n` +
        `We can deploy this exact proven blueprint for *${lead.company}* with zero technical hassle on your side.\n\n` +
        `When would be a convenient time for a brief 5-minute call this week?\n\n` +
        `Best regards,\n*${senderName}* | 📞 ${senderPhone}`
    },
    {
      id: 'day14',
      title: 'Day 14: Limited-Time Setup Offer & Closing Check-in',
      timing: '2 weeks after initial proposal (Discount & close)',
      badge: 'Step 4: Deal Closer',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      message: `Namaste ${lead.dm || 'Sir'},\n\n` +
        `I know you have a busy manufacturing schedule at *${lead.company}*.\n\n` +
        `We are currently finalizing our client roster for this month's Gujarat Industrial marketing batch.\n\n` +
        `🎁 *Special Closing Incentive:* If we kick off *${lead.company}*'s digital setup this week, we will provide:\n` +
        `1. *15% Discount* on the one-time development & setup fee\n` +
        `2. Free WhatsApp Automated Inquiry Catalog setup (Value ₹6,000)\n` +
        `3. Complete Google My Business 5-star reputation audit\n\n` +
        `Can we lock in your slot today?\n\n` +
        `Warm regards,\n*${senderName}* | 📞 ${senderPhone}`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden my-auto ${
        isDark ? 'bg-[#0b1120] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-b border-emerald-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">WhatsApp Follow-Up Drip System</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                  4 CADENCES
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Target: {lead.company} ({lead.dm || 'Decision Maker'}) • {lead.phone}
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
          <p className="text-xs text-slate-400">
            Factory owners rarely sign on day 1. Use this structured 4-step sequence to systematically nurture and close high-ticket clients without sounding pushy.
          </p>

          <div className="space-y-3.5">
            {DRIP_STEPS.map((step) => {
              const isSent = Boolean(sentStages[step.id]);
              return (
                <div 
                  key={step.id} 
                  className={`p-4 rounded-xl border transition-all ${
                    isSent 
                      ? isDark ? 'bg-slate-900/90 border-emerald-500/40' : 'bg-emerald-50/60 border-emerald-300'
                      : isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {/* Step Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold border ${step.badgeColor}`}>
                        {step.badge}
                      </span>
                      <h4 className="text-xs font-bold">{step.title}</h4>
                    </div>
                    {isSent ? (
                      <span className="text-[10px] flex items-center gap-1 font-mono font-bold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Sent on {sentStages[step.id]}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{step.timing}</span>
                      </span>
                    )}
                  </div>

                  {/* Message Preview Box */}
                  <div className={`p-3 rounded-lg text-xs font-sans whitespace-pre-line leading-relaxed mb-3 border ${
                    isDark ? 'bg-slate-950/80 border-slate-800/80 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                  }`}>
                    {step.message}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => copyText(step.message, step.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        copiedDay === step.id 
                          ? 'bg-emerald-600 text-white border-emerald-500' 
                          : isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      {copiedDay === step.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedDay === step.id ? 'Copied' : 'Copy'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => markStageSent(step.id)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-semibold ${
                          isSent ? 'text-emerald-400 border-emerald-500/30' : 'text-slate-400 border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        {isSent ? 'Marked Sent ✓' : 'Mark as Sent'}
                      </button>

                      <button
                        onClick={() => sendWhatsApp(step.message, step.id)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-between ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <span className="text-xs text-slate-400">
            Drip stages are saved locally for this prospect.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
