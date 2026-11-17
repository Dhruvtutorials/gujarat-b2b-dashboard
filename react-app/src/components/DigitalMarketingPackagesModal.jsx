import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  MessageCircle, 
  FileDown, 
  Sparkles, 
  TrendingUp, 
  Globe, 
  Target, 
  Search, 
  Share2, 
  ShieldCheck, 
  Zap,
  Building2,
  Phone,
  User,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  CreditCard,
  Calendar,
  Layers,
  Send,
  BookOpen,
  DollarSign
} from 'lucide-react';
import { 
  DIGITAL_MARKETING_PACKAGES, 
  STANDALONE_SERVICES_RATE_CARD,
  PAYMENT_MILESTONES, 
  PAYMENT_MODES_INFO, 
  generatePackageWhatsAppMessage 
} from '../data/packagesData';
import { generateQuotationPdf } from '../services/quotationGenerator';

export default function DigitalMarketingPackagesModal({ lead, leads = [], onClose, isDark = true }) {
  const [activeViewTab, setActiveViewTab] = useState('packages'); // 'packages' | 'brochure'
  const [selectedLeadId, setSelectedLeadId] = useState(() => (lead ? lead.id : (leads[0]?.id || null)));
  const [selectedPackageId, setSelectedPackageId] = useState('growth'); // Default to growth (popular)
  const [selectedPlanKey, setSelectedPlanKey] = useState('all'); // 'all', 'monthly', 'quarterly', 'annual'
  const [copiedPackageId, setCopiedPackageId] = useState(null);
  const [downloadingPkgId, setDownloadingPkgId] = useState(null);

  const senderName = localStorage.getItem('corridor_sender_name') || 'Dhruv Rana';
  const senderPhone = localStorage.getItem('corridor_sender_phone') || '+91 98700 98180';

  // Find the currently active lead
  const currentLead = leads.find((l) => l.id === selectedLeadId) || lead || {
    id: 'DEMO',
    name: 'Industrial Enterprise',
    dm: 'Managing Director',
    city: 'Surat',
    category: 'Textile & Manufacturing',
    phone: senderPhone,
    address: 'Gujarat Industrial Estate'
  };

  const selectedPkg = DIGITAL_MARKETING_PACKAGES.find((p) => p.id === selectedPackageId) || DIGITAL_MARKETING_PACKAGES[1];
  const plans = selectedPkg.paymentPlans || {};

  const handleCopyPitch = (pkg) => {
    const text = generatePackageWhatsAppMessage(pkg, currentLead, senderName, senderPhone, selectedPlanKey);
    navigator.clipboard.writeText(text);
    setCopiedPackageId(pkg.id);
    setTimeout(() => setCopiedPackageId(null), 2500);
  };

  const handleSendWhatsApp = (pkg) => {
    const text = generatePackageWhatsAppMessage(pkg, currentLead, senderName, senderPhone, selectedPlanKey);
    const cleanPhone = (currentLead.phone || '').replace(/[^0-9]/g, '');
    let targetUrl = '';
    if (cleanPhone && cleanPhone.length >= 10) {
      const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
      targetUrl = `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodeURIComponent(text)}`;
    } else {
      targetUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    }
    window.open(targetUrl, '_blank');
  };

  const handleDownloadPdf = async (pkg) => {
    setDownloadingPkgId(pkg.id);
    try {
      await generateQuotationPdf(currentLead, pkg, selectedPlanKey);
    } catch (err) {
      console.error('PDF error:', err);
    } finally {
      setTimeout(() => setDownloadingPkgId(null), 1000);
    }
  };

  // Generate full brochure text for WhatsApp
  const handleSendBrochureWhatsApp = () => {
    const brochureText = `Namaste ${currentLead.dm} ji,

I am ${senderName} from Gujarat B2B Web & Digital Solutions (${senderPhone}).
Here is our *Official B2B Digital Marketing Services Brochure & Rate Card* for *${currentLead.name}*:

1️⃣ *🌐 Modern B2B Web Portal & Catalog Redesign*
• Setup: ₹26,000 | Annual Hosting/SSL: ₹3,500
• Mobile-first industrial portal, machinery specs, RFQ engine & ISO showcase.

2️⃣ *🎯 Meta Ads (Facebook & Instagram B2B Lead Gen)*
• Setup: ₹14,000 | Monthly Management: ₹12,000/mo
• Pan-India wholesaler/dealer targeting, high-CTR creatives & direct WhatsApp inquiries.

3️⃣ *🔍 Google Search SEO & GIDC Maps Geo-Pinning*
• Setup: ₹10,000 | Monthly SEO Retainer: ₹8,500/mo
• Top 10 Google ranking on 15+ high-volume search terms + factory GPS pin.

4️⃣ *📱 Social Media & Factory Production Reels*
• Setup: ₹6,000 | Monthly Retainer: ₹7,500/mo
• 10-12 monthly graphics + 2-4 factory video reels (machinery, testing & dispatch).

5️⃣ *⚡ WhatsApp CRM & Cloud Infrastructure*
• Setup: ₹8,000 | Monthly: ₹2,500/mo
• Instant lead routing, catalog auto-delivery & SSL security.

--------------------------------------------------
💡 *BUNDLE DISCOUNT ADVICE:*
Instead of buying individual services (Total: ₹64,000+ Setup), our *Pan-India Lead Accelerator Bundle* gives you ALL 5 services together at just:
👉 *₹48,000 Setup + ₹22,000/month Retainer* (Save ₹27,500+)!

Can we schedule a 15-minute meeting this week to show you a live interactive mockup?

Best Regards,
${senderName}
B2B Digital Growth Architect
Phone: ${senderPhone}`;

    const cleanPhone = (currentLead.phone || '').replace(/[^0-9]/g, '');
    let targetUrl = '';
    if (cleanPhone && cleanPhone.length >= 10) {
      const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
      targetUrl = `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodeURIComponent(brochureText)}`;
    } else {
      targetUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(brochureText)}`;
    }
    window.open(targetUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col ${
        isDark ? 'bg-[#0b101b] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Top Header */}
        <div className={`px-4 sm:px-6 py-3.5 border-b flex items-center justify-between shrink-0 ${
          isDark ? 'border-slate-800 bg-[#0e1524]' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white shrink-0">
              <Zap className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                  360° Digital Marketing Proposal & Service Brochure
                </h2>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Gujarat B2B
                </span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Itemized Service Breakdown: Meta Ads, SEO, Website, Social Media & Flexible Payment Schedules
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-all ${
              isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lead Selector Bar & View Mode Toggle */}
        <div className={`px-4 sm:px-6 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 text-xs shrink-0 ${
          isDark ? 'border-slate-800/80 bg-slate-900/60' : 'border-slate-200 bg-slate-100/60'
        }`}>
          <div className="flex items-center gap-2 min-w-0">
            <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="font-semibold text-slate-400 shrink-0">Prospect:</span>
            {leads && leads.length > 0 ? (
              <select
                value={currentLead.id}
                onChange={(e) => setSelectedLeadId(e.target.value)}
                className={`text-xs font-bold rounded-lg px-2.5 py-1 border outline-none cursor-pointer max-w-[200px] sm:max-w-[260px] truncate ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.city} - {l.dm})
                  </option>
                ))}
              </select>
            ) : (
              <span className="font-bold text-white">{currentLead.name}</span>
            )}
            <span className="hidden md:inline text-slate-500">• {currentLead.category} • {currentLead.city}</span>
          </div>

          {/* View Tab Switcher: Packages vs Standalone Brochure */}
          <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => setActiveViewTab('packages')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeViewTab === 'packages'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>360° Packages</span>
            </button>
            <button
              onClick={() => setActiveViewTab('brochure')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeViewTab === 'brochure'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Services Rate Card & Brochure</span>
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: 360° PACKAGES VIEW */}
          {activeViewTab === 'packages' && (
            <>
              {/* Step 1: Package Tiers */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span>1. Select Package Tier:</span>
                  </span>
                  <span className="text-xs text-slate-400">
                    Click any tier to view itemized pricing & scope
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {DIGITAL_MARKETING_PACKAGES.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    const isPopular = pkg.isPopular;

                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`relative rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-500/[0.08] ring-2 ring-blue-500/40 shadow-xl shadow-blue-500/10' 
                            : isDark 
                              ? 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/80' 
                              : 'border-slate-200 bg-slate-50/80 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {/* Top Badge */}
                        <div className="flex items-center justify-between mb-2.5">
                          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isPopular 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                              : pkg.id === 'enterprise'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                          }`}>
                            {pkg.badge}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">{pkg.timeline}</span>
                        </div>

                        {/* Title & Tagline */}
                        <div>
                          <h3 className="font-extrabold text-sm sm:text-base">{pkg.name}</h3>
                          <p className="text-[11px] font-semibold text-blue-400 mt-0.5">{pkg.hindiName}</p>
                          <p className={`text-xs mt-2 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {pkg.tagline}
                          </p>
                        </div>

                        {/* Pricing Box */}
                        <div className={`mt-3.5 p-3 rounded-xl border ${
                          isDark ? 'bg-slate-950/70 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
                        }`}>
                          <div className="flex items-baseline justify-between">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Total Setup:</span>
                            <span className="text-base font-extrabold text-emerald-400">
                              ₹{pkg.setupFee.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="flex items-baseline justify-between mt-1 pt-1 border-t border-slate-800/40">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Monthly Retainer:</span>
                            <span className="text-sm font-extrabold text-blue-400">
                              ₹{pkg.monthlyFee.toLocaleString('en-IN')}<span className="text-[10px] font-normal text-slate-400">/mo</span>
                            </span>
                          </div>
                        </div>

                        {/* Bundle Savings Highlight */}
                        <div className="mt-2.5 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-400 text-center">
                          🎁 {pkg.savingsText}
                        </div>

                        {/* Card Select Indicator */}
                        <div className="mt-3.5 pt-2.5 border-t border-slate-800/50 flex items-center justify-between text-xs">
                          <span className={`font-bold ${isSelected ? 'text-blue-400' : 'text-slate-500'}`}>
                            {isSelected ? '✓ Selected Tier' : 'Click to View Breakdown'}
                          </span>
                          <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-600'}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Itemized Service-by-Service Breakdown Table */}
              <div className={`rounded-2xl border p-4 sm:p-5 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span>Service-by-Service Fee Breakdown for {selectedPkg.name}</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Client ko clear pata chalega: Website me kitna, Meta Ads me kitna, SEO me kitna aur Social Media me kitna
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Transparent B2B Pricing
                  </span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto mt-3.5">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className={`border-b text-[11px] uppercase font-bold text-slate-400 ${
                        isDark ? 'border-slate-800' : 'border-slate-200'
                      }`}>
                        <th className="py-2.5 px-3">Service Deliverable</th>
                        <th className="py-2.5 px-3">Scope & Features</th>
                        <th className="py-2.5 px-3">Setup Fee</th>
                        <th className="py-2.5 px-3">Monthly Retainer</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                      {selectedPkg.itemizedBreakdown?.map((item, idx) => (
                        <tr key={idx} className={isDark ? 'hover:bg-slate-850/40' : 'hover:bg-slate-100/50'}>
                          <td className="py-2.5 px-3 font-bold text-white whitespace-nowrap">
                            {item.service}
                          </td>
                          <td className="py-2.5 px-3 text-slate-400">
                            {item.desc}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-emerald-400 whitespace-nowrap">
                            ₹{item.setup.toLocaleString('en-IN')}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-blue-400 whitespace-nowrap">
                            {item.monthly > 0 ? `₹${item.monthly.toLocaleString('en-IN')}/mo` : 'Included'}
                          </td>
                        </tr>
                      ))}
                      {/* Bundle Total Row */}
                      <tr className={`border-t-2 font-bold ${
                        isDark ? 'bg-blue-600/10 border-blue-500/40' : 'bg-blue-50 border-blue-300'
                      }`}>
                        <td className="py-3 px-3 text-blue-300">
                          ★ Complete Package Total
                        </td>
                        <td className="py-3 px-3 text-emerald-400 text-[11px]">
                          {selectedPkg.savingsText}
                        </td>
                        <td className="py-3 px-3 font-mono text-sm text-emerald-400 whitespace-nowrap">
                          ₹{selectedPkg.setupFee.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-3 font-mono text-sm text-blue-400 whitespace-nowrap">
                          ₹{selectedPkg.monthlyFee.toLocaleString('en-IN')}/mo
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Flexible Payment Options & Billing Plans */}
              <div className={`rounded-2xl border p-4 sm:p-5 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-400" />
                      <span>Flexible Payment Options & Schedules</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Select payment terms to reflect in the Quotation PDF and WhatsApp Pitch
                    </p>
                  </div>

                  {/* Payment Filter Pills */}
                  <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedPlanKey('all')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedPlanKey === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      All Options
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPlanKey('monthly')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedPlanKey === 'monthly' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPlanKey('quarterly')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedPlanKey === 'quarterly' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Quarterly (-10%)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPlanKey('annual')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedPlanKey === 'annual' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Annual (-20%)
                    </button>
                  </div>
                </div>

                {/* 3 Payment Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4">
                  {/* Option A */}
                  <div 
                    onClick={() => setSelectedPlanKey('monthly')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedPlanKey === 'monthly'
                        ? 'border-blue-500 bg-blue-500/10 ring-1 ring-blue-500/40'
                        : isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold">{plans.monthly?.title || 'Option A: Monthly'}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Pay As You Go
                      </span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Setup:</span>
                        <strong className="text-white">₹{plans.monthly?.setupFee?.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Monthly:</span>
                        <strong className="text-blue-400">₹{plans.monthly?.retainer?.toLocaleString('en-IN')}/mo</strong>
                      </div>
                      <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                        50% Advance + 50% on Go-Live
                      </div>
                    </div>
                  </div>

                  {/* Option B */}
                  <div 
                    onClick={() => setSelectedPlanKey('quarterly')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedPlanKey === 'quarterly'
                        ? 'border-blue-500 bg-blue-500/10 ring-1 ring-blue-500/40'
                        : isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold">{plans.quarterly?.title || 'Option B: Quarterly'}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        Save 10% 🌟
                      </span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Setup:</span>
                        <strong className="text-white">₹{plans.quarterly?.setupFee?.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Retainer:</span>
                        <strong className="text-emerald-400">₹{plans.quarterly?.retainer?.toLocaleString('en-IN')}/mo</strong>
                      </div>
                      <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold">
                        {plans.quarterly?.savings}
                      </div>
                    </div>
                  </div>

                  {/* Option C */}
                  <div 
                    onClick={() => setSelectedPlanKey('annual')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedPlanKey === 'annual'
                        ? 'border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500/40'
                        : isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold">{plans.annual?.title || 'Option C: Annual'}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Save 20% + Setup Waived 🚀
                      </span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Setup:</span>
                        <strong className="text-white">₹{plans.annual?.setupFee?.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Retainer:</span>
                        <strong className="text-emerald-400">₹{plans.annual?.retainer?.toLocaleString('en-IN')}/mo</strong>
                      </div>
                      <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold">
                        {plans.annual?.savings}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    Send Tailored Quotation for {currentLead.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Includes itemized fees, deliverables & selected payment schedule
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* WhatsApp */}
                  <button
                    onClick={() => handleSendWhatsApp(selectedPkg)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Send on WhatsApp</span>
                  </button>

                  {/* PDF Download */}
                  <button
                    onClick={() => handleDownloadPdf(selectedPkg)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>{downloadingPkgId === selectedPkg.id ? 'Generating...' : 'Download Quotation PDF'}</span>
                  </button>

                  {/* Copy Quote */}
                  <button
                    onClick={() => handleCopyPitch(selectedPkg)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                      copiedPackageId === selectedPkg.id
                        ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40'
                        : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                          : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                    }`}
                  >
                    {copiedPackageId === selectedPkg.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Pitch</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* WhatsApp Quotation Message Live Preview */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Proposal Message Preview (Sent to {currentLead.name}):</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Itemized Pricing + Payment Terms Included
                  </span>
                </div>
                <pre className={`p-3.5 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto border ${
                  isDark ? 'bg-[#080d16] border-slate-800/90 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}>
                  {generatePackageWhatsAppMessage(selectedPkg, currentLead, senderName, senderPhone, selectedPlanKey)}
                </pre>
              </div>
            </>
          )}

          {/* TAB 2: STANDALONE SERVICES BROCHURE & RATE CARD */}
          {activeViewTab === 'brochure' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 border border-blue-500/30">
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-300" />
                    <span>Official B2B Digital Marketing Services Brochure & Rate Card</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Agar client alag-alag service lena chahe to har service ka standalone rate aur scope yahan hai.
                  </p>
                </div>

                <button
                  onClick={handleSendBrochureWhatsApp}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 shrink-0"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Full Brochure (WhatsApp)</span>
                </button>
              </div>

              {/* 5 Standalone Service Pillar Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STANDALONE_SERVICES_RATE_CARD.map((svc) => (
                  <div
                    key={svc.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      isDark ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-extrabold text-sm text-white">{svc.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {svc.billingType}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-blue-400 mb-3">{svc.hindiName}</p>

                      {/* Standalone Pricing Box */}
                      <div className={`p-2.5 rounded-xl border mb-3 flex items-center justify-between text-xs ${
                        isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
                      }`}>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Standalone Setup:</span>
                          <strong className="text-emerald-400 font-mono text-sm">₹{svc.standaloneSetup.toLocaleString('en-IN')}</strong>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Monthly Retainer:</span>
                          <strong className="text-blue-400 font-mono text-sm">₹{svc.standaloneMonthly.toLocaleString('en-IN')}/mo</strong>
                        </div>
                      </div>

                      {/* Deliverables */}
                      <ul className="space-y-1.5 text-xs">
                        {svc.deliverables.map((d, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span>⚡ Included in 360° Package with bundle discount</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className={`px-4 sm:px-6 py-3 border-t flex flex-wrap items-center justify-between gap-3 text-xs shrink-0 ${
          isDark ? 'border-slate-800 bg-[#0e1524]' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Complete itemized transparency: Meta Ads + SEO + Website + Social Media + WhatsApp Automation.</span>
          </div>

          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-xl font-bold transition-all ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
            }`}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
