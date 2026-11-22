import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  MessageCircle, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const SECTOR_PRESETS = [
  { id: 'ceramic', name: 'Ceramic & Tiles (Morbi)', aov: 350000, leads: 35, convRate: 8, adSpend: 20000 },
  { id: 'textile', name: 'Textile & Fabrics (Surat)', aov: 180000, leads: 45, convRate: 10, adSpend: 15000 },
  { id: 'chemical', name: 'Chemical & Dyes (Ankleshwar)', aov: 450000, leads: 25, convRate: 6, adSpend: 25000 },
  { id: 'engineering', name: 'Engineering & Brass (Rajkot/Jamnagar)', aov: 220000, leads: 30, convRate: 8, adSpend: 15000 },
  { id: 'custom', name: 'Custom Industrial Unit', aov: 200000, leads: 30, convRate: 7, adSpend: 20000 }
];

export default function RoiCalculatorModal({ lead = null, onClose, theme = 'dark' }) {
  const [selectedPreset, setSelectedPreset] = useState('ceramic');
  const [aov, setAov] = useState(350000);
  const [leadsCount, setLeadsCount] = useState(35);
  const [convRate, setConvRate] = useState(8); // 8%
  const [adSpend, setAdSpend] = useState(20000);
  const [tierRetainer, setTierRetainer] = useState(22000); // Growth tier default
  const [copied, setCopied] = useState(false);

  const isDark = theme === 'dark';
  const senderPhone = localStorage.getItem('corridor_sender_phone') || '+91 98700 98180';
  const senderName = localStorage.getItem('corridor_sender_name') || 'Dhruv Rana';

  const handleSelectPreset = (presetId) => {
    setSelectedPreset(presetId);
    const p = SECTOR_PRESETS.find(x => x.id === presetId);
    if (p) {
      setAov(p.aov);
      setLeadsCount(p.leads);
      setConvRate(p.convRate);
      setAdSpend(p.adSpend);
    }
  };

  // Calculations
  const totalInvestment = tierRetainer + adSpend;
  const closedDeals = Math.max(1, Math.round(leadsCount * (convRate / 100)));
  const projectedGrossRevenue = closedDeals * aov;
  const netProfit = projectedGrossRevenue - totalInvestment;
  const roiMultiple = (projectedGrossRevenue / totalInvestment).toFixed(1);

  const formatCurrency = (val) => {
    return '₹' + Number(val).toLocaleString('en-IN');
  };

  const whatsappPitchText = `*ROI & REVENUE PROJECTION FOR YOUR FACTORY*\n` +
    `🏢 *Target:* ${lead ? lead.company : 'B2B Manufacturing Unit'}\n` +
    `👤 *Attn:* ${lead ? (lead.dm || 'Managing Director') : 'Business Owner'}\n\n` +
    `*Conservative Digital Investment vs Revenue Breakdown:*\n` +
    `• Monthly Ad Spend + Retainer: *${formatCurrency(totalInvestment)}*\n` +
    `• Targeted Wholesale Inquiries: *${leadsCount} verified buyer leads/month*\n` +
    `• Conservative Close Rate: *${convRate}%* (~${closedDeals} closed deals)\n` +
    `• Average Order Value: *${formatCurrency(aov)}*\n\n` +
    `📈 *Projected Monthly Revenue:* *${formatCurrency(projectedGrossRevenue)}*\n` +
    `💰 *Net Profit Pipeline:* *${formatCurrency(netProfit)}*\n` +
    `🚀 *Return on Investment (ROI):* *${roiMultiple}x Return*\n\n` +
    `Even if just *${closedDeals} order* closes in a month, your entire marketing campaign is 100% paid for and highly profitable.\n\n` +
    `Can we schedule a 10-minute demo to review the targeting framework?\n\n` +
    `Best regards,\n*${senderName}* | 📞 ${senderPhone}`;

  const handleSendWhatsApp = () => {
    const cleanPhone = (lead?.phone || '').replace(/[^0-9]/g, '');
    const phoneToUse = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const url = phoneToUse 
      ? `https://api.whatsapp.com/send?phone=${phoneToUse}&text=${encodeURIComponent(whatsappPitchText)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappPitchText)}`;
    window.open(url, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappPitchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden my-auto ${
        isDark ? 'bg-[#0b1120] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-blue-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Client ROI & Revenue Calculator</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                  {roiMultiple}x ROI
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {lead ? `${lead.company} (${lead.city})` : 'Live Pitch & Objection Buster Tool'}
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
          
          {/* Sector Presets Pills */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Select Gujarat Industry Sector:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SECTOR_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    selectedPreset === p.id 
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30 font-bold'
                      : isDark ? 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* Input 1: AOV */}
            <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold">Average Order Value (₹)</span>
                <span className="text-xs font-mono font-bold text-blue-400">{formatCurrency(aov)}</span>
              </div>
              <input 
                type="range"
                min="50000"
                max="1500000"
                step="25000"
                value={aov}
                onChange={(e) => setAov(Number(e.target.value))}
                className="w-full accent-blue-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block mt-1">1 Lot / Container / Batch Value</span>
            </div>

            {/* Input 2: Marketing Retainer */}
            <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold">Agency Retainer Tier</span>
                <span className="text-xs font-mono font-bold text-indigo-400">{formatCurrency(tierRetainer)}/mo</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 mt-1">
                <button
                  type="button"
                  onClick={() => setTierRetainer(8500)}
                  className={`py-1 rounded-lg text-[11px] font-bold border ${tierRetainer === 8500 ? 'bg-indigo-600 text-white border-indigo-500' : isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-white text-slate-700 border-slate-300'}`}
                >
                  ₹8.5k (Starter)
                </button>
                <button
                  type="button"
                  onClick={() => setTierRetainer(22000)}
                  className={`py-1 rounded-lg text-[11px] font-bold border ${tierRetainer === 22000 ? 'bg-indigo-600 text-white border-indigo-500' : isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-white text-slate-700 border-slate-300'}`}
                >
                  ₹22k (Growth)
                </button>
                <button
                  type="button"
                  onClick={() => setTierRetainer(45000)}
                  className={`py-1 rounded-lg text-[11px] font-bold border ${tierRetainer === 45000 ? 'bg-indigo-600 text-white border-indigo-500' : isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-white text-slate-700 border-slate-300'}`}
                >
                  ₹45k (Enterprise)
                </button>
              </div>
            </div>

            {/* Input 3: Target Monthly Leads */}
            <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold">Monthly Inquiries / Leads</span>
                <span className="text-xs font-mono font-bold text-amber-400">{leadsCount} leads</span>
              </div>
              <input 
                type="range"
                min="10"
                max="100"
                step="5"
                value={leadsCount}
                onChange={(e) => setLeadsCount(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block mt-1">Generated via Meta Ads + Google SEO</span>
            </div>

            {/* Input 4: Direct Ad Spend */}
            <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold">Monthly Ad Spend (Meta/Google)</span>
                <span className="text-xs font-mono font-bold text-emerald-400">{formatCurrency(adSpend)}</span>
              </div>
              <input 
                type="range"
                min="10000"
                max="80000"
                step="5000"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block mt-1">Paid directly by client for GST ITC</span>
            </div>
          </div>

          {/* Real-time Projected Outcome Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>Projected Client Business Returns</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                {roiMultiple}x ROI
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">Total Cost</span>
                <span className="text-xs font-mono font-bold text-slate-200">{formatCurrency(totalInvestment)}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">Deals Closed</span>
                <span className="text-xs font-mono font-bold text-amber-400">~{closedDeals} Deals</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">Gross Revenue</span>
                <span className="text-xs font-mono font-bold text-emerald-400">{formatCurrency(projectedGrossRevenue)}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">Net Profit Gain</span>
                <span className="text-xs font-mono font-bold text-cyan-400">{formatCurrency(netProfit)}</span>
              </div>
            </div>

            <p className="text-[11px] text-emerald-300/90 text-center font-medium">
              💡 <strong>Pitch Closer:</strong> Even if only <strong>1 order</strong> converts out of {leadsCount} inquiries, the client makes <strong>{formatCurrency(aov - totalInvestment)} net profit</strong> above marketing cost!
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`p-4 border-t flex flex-wrap items-center justify-between gap-2.5 ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              copied ? 'bg-emerald-600 text-white border-emerald-500' : isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-700 border-slate-300'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Pitch' : 'Copy ROI Pitch'}</span>
          </button>

          <button
            onClick={handleSendWhatsApp}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send ROI Pitch via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
