import { jsPDF } from 'jspdf';

export function generateQuotationPdf(lead, selectedPackage = null, chosenPlanKey = 'all') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const primaryColor = [15, 23, 42];      // Slate 900
  const accentColor = [37, 99, 235];      // Blue 600
  const emeraldColor = [16, 185, 129];   // Emerald 500
  const amberColor = [245, 158, 11];     // Amber 500
  const mutedText = [100, 116, 139];     // Slate 500

  const senderPhone = localStorage.getItem('corridor_sender_phone') || '+91 98700 98180';
  const senderName = localStorage.getItem('corridor_sender_name') || 'Dhruv Rana';

  const pkgCode = selectedPackage ? selectedPackage.id.toUpperCase().substring(0, 3) : 'WEB';
  const quoteNo = `QT-${(lead.id || 'LEAD').replace(/[^a-zA-Z0-9]/g, '')}-${pkgCode}-${new Date().getFullYear()}`;
  const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  // ==========================================
  // PAGE 1: SCOPE, DELIVERABLES & STRATEGY
  // ==========================================

  // 1. Top Header Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 38, 'F');

  // Decorative Accent Strip
  doc.setFillColor(...accentColor);
  doc.rect(0, 38, pageWidth, 2.5, 'F');

  // Title in Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  const headerTitle = selectedPackage 
    ? `${selectedPackage.name.toUpperCase()} - COMMERCIAL PROPOSAL`
    : '360° B2B DIGITAL MARKETING & WEB PROPOSAL';
  doc.text(headerTitle, 14, 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text('GUJARAT INDUSTRIAL CORRIDOR • META ADS, SEO & WEB ACCELERATION', 14, 24);

  // Quote Reference & Date (Right side)
  doc.setFontSize(8);
  doc.text(`Quote Ref: ${quoteNo}`, pageWidth - 14, 16, { align: 'right' });
  doc.text(`Date: ${todayStr}`, pageWidth - 14, 22, { align: 'right' });
  doc.text('Valid: 15 Days | Confidential', pageWidth - 14, 28, { align: 'right' });

  // 2. Client Profile Card
  let y = 47;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, 36, 2, 2, 'FD');

  doc.setTextColor(...accentColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('PROPOSAL PREPARED SPECIFICALLY FOR:', 20, y + 7.5);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.text(lead.name || 'Industrial Enterprise', 20, y + 15.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...mutedText);
  const dmText = `Attn: ${lead.dm || 'Managing Director / Business Owner'}  |  Phone: ${lead.phone || 'Available on request'}`;
  doc.text(dmText, 20, y + 21.5);

  const rawAddress = lead.address || `${lead.city}, Gujarat Industrial Estate`;
  const splitAddress = doc.splitTextToSize(`Factory Address: ${rawAddress}`, pageWidth - 42);
  doc.text(splitAddress, 20, y + 27.5);

  // 3. Strategic Objective
  y += 44;
  doc.setFillColor(239, 246, 255); // Blue 50
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(14, y, pageWidth - 28, 18, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...accentColor);
  doc.text('STRATEGIC GROWTH OBJECTIVE & CORRIDOR FOCUS:', 20, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  const objectiveText = `Accelerate high-ticket B2B buyer inquiries for ${lead.name} across Gujarat & Pan-India wholesale markets through precision Meta Lead Gen Ads, Google first-page keyword rankings, and a high-converting digital product portal.`;
  const splitObjective = doc.splitTextToSize(objectiveText, pageWidth - 42);
  doc.text(splitObjective, 20, y + 11.5);

  // 4. Section 1: Detailed Deliverables Scope
  y += 24;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryColor);
  doc.text('1. Detailed Scope of Digital Marketing Deliverables', 14, y);

  doc.setDrawColor(...accentColor);
  doc.line(14, y + 2, 95, y + 2);

  y += 8;

  let deliverables = [];
  if (selectedPackage && selectedPackage.deliverables) {
    deliverables = selectedPackage.deliverables.map((d) => ({
      title: d.title.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim(),
      desc: d.desc
    }));
  } else {
    deliverables = [
      {
        title: 'Modern Turnkey B2B Web Portal & Catalog Redesign',
        desc: 'Mobile-first responsive architecture with RFQ (Request for Quote) system, machinery specs, and ISO certification showcase.'
      },
      {
        title: 'Meta Ads (Facebook & Instagram) B2B Lead Generation',
        desc: 'Precision audience targeting reaching wholesale buyers, distributors, dealers, and purchase managers across Pan-India corridors.'
      },
      {
        title: 'Active Google Search Engine Optimization (SEO)',
        desc: 'Top 10 Google search rankings for 15+ high-volume commercial keywords, GIDC factory geo-pinning, and Google Business Profile optimization.'
      },
      {
        title: 'Social Media Management & Factory Video Showcase',
        desc: 'Monthly production reels & graphic creatives showcasing manufacturing facilities, CNC machinery, dispatch containers, and quality control.'
      },
      {
        title: 'Direct WhatsApp 1-Click Inquiry Routing & CRM Integration',
        desc: 'Buyer inquiries from Ads & Website instantly routed to owner & sales team WhatsApp with pre-filled inquiry details for rapid conversion.'
      },
      {
        title: 'Enterprise Cloud SSD Hosting, SSL & Bi-Weekly ROI Reports',
        desc: '99.9% uptime secure cloud server, SSL certificate, official @company.com emails, and bi-weekly Cost Per Lead (CPL) performance reviews.'
      }
    ];
  }

  // Render 6 deliverables cleanly
  deliverables.slice(0, 6).forEach((item) => {
    doc.setFillColor(...accentColor);
    doc.circle(18, y + 1.5, 1.2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(item.title, 23, y + 2.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...mutedText);
    const splitDesc = doc.splitTextToSize(item.desc, pageWidth - 42);
    doc.text(splitDesc, 23, y + 6.8);

    y += 13.5;
  });

  // Expected Timeline Note at bottom of Page 1
  y += 2;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, y, pageWidth - 28, 12, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  const timeline = selectedPackage?.timeline || '7 - 10 Days';
  doc.text(`⚡ Setup & Launch Timeline: ${timeline} from asset sign-off. First ad inquiries typically start within 48 hours of ad launch.`, 20, y + 7.5);

  // Page 1 Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...mutedText);
  doc.text(`Page 1 of 2  •  Itemized Services & Payment Schedules on Next Page →`, pageWidth / 2, pageHeight - 10, { align: 'center' });

  // ==========================================
  // PAGE 2: ITEMIZED BREAKDOWN & PAYMENT PLANS
  // ==========================================
  doc.addPage();

  // Page 2 Header Banner (Slim)
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 22, 'F');
  doc.setFillColor(...accentColor);
  doc.rect(0, 22, pageWidth, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('ITEMIZED SERVICE-BY-SERVICE PRICING & PAYMENT SCHEDULES', 14, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225);
  doc.text(`Quote Ref: ${quoteNo}  |  Prepared For: ${lead.name}`, pageWidth - 14, 13, { align: 'right' });

  y = 30;

  // 1. Transparent Itemized Deliverable Breakdown Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...primaryColor);
  doc.text('2. Service-Wise Fee Breakdown (Meta Ads, SEO, Website, Social Media)', 14, y);
  doc.setDrawColor(...accentColor);
  doc.line(14, y + 2, 115, y + 2);

  y += 6.5;

  // Table Header
  doc.setFillColor(...primaryColor);
  doc.rect(14, y, pageWidth - 28, 6.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('Service Deliverable Pillar', 20, y + 4.5);
  doc.text('Setup Investment', 110, y + 4.5);
  doc.text('Monthly Retainer', pageWidth - 20, y + 4.5, { align: 'right' });

  y += 6.5;

  const itemizedList = selectedPackage?.itemizedBreakdown || [
    { service: 'B2B Website Portal / Modern Redesign', setup: 22000, monthly: 0, desc: 'Interactive machinery catalog, RFQ system & fast mobile loading' },
    { service: 'Meta Ads (FB & Insta B2B Lead Gen)', setup: 12000, monthly: 10000, desc: 'Targeting wholesale buyers, high-CTR copy & daily optimization' },
    { service: 'Google Search SEO & GIDC Maps Pinning', setup: 8000, monthly: 6500, desc: 'Top 10 ranking for 15+ keywords + factory GPS pinning' },
    { service: 'Social Media & Factory Production Reels', setup: 3000, monthly: 4500, desc: '12 high-impact graphics + monthly factory video reels' },
    { service: 'WhatsApp CRM & Fast Cloud SSD Hosting', setup: 3000, monthly: 1000, desc: 'Instant lead routing, SSL certificate & daily cloud backups' }
  ];

  itemizedList.forEach((item, index) => {
    const isEven = index % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.setDrawColor(226, 232, 240);
    doc.rect(14, y, pageWidth - 28, 7.5, 'FD');

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(item.service, 20, y + 3.8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    doc.setTextColor(...mutedText);
    doc.text(item.desc, 20, y + 6.8);

    // Setup Fee
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`₹${item.setup.toLocaleString('en-IN')}`, 110, y + 4.8);

    // Monthly Fee
    doc.setTextColor(...accentColor);
    const mText = item.monthly > 0 ? `₹${item.monthly.toLocaleString('en-IN')}/mo` : 'Included';
    doc.text(mText, pageWidth - 20, y + 4.8, { align: 'right' });

    y += 7.5;
  });

  // Package Bundle Total Row
  doc.setFillColor(239, 246, 255); // Blue 50
  doc.setDrawColor(...accentColor);
  doc.rect(14, y, pageWidth - 28, 8, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...primaryColor);
  const pkgName = selectedPackage ? selectedPackage.name : '360° Industrial Package';
  doc.text(`★ BUNDLE PACKAGE INVESTMENT: ${pkgName}`, 20, y + 5);

  const totalSetup = selectedPackage ? selectedPackage.setupFee : 48000;
  const totalMonthly = selectedPackage ? selectedPackage.monthlyFee : 22000;

  doc.setFontSize(8.5);
  doc.setTextColor(...emeraldColor);
  doc.text(`₹${totalSetup.toLocaleString('en-IN')}`, 110, y + 5);

  doc.setTextColor(...accentColor);
  doc.text(`₹${totalMonthly.toLocaleString('en-IN')}/mo`, pageWidth - 20, y + 5, { align: 'right' });

  // 2. 3 Distinct Payment Plan Choices
  y += 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...primaryColor);
  doc.text('3. Choose Your Preferred Payment Schedule & Billing Plan', 14, y);
  doc.setDrawColor(...accentColor);
  doc.line(14, y + 2, 105, y + 2);

  y += 6.5;

  const plans = selectedPackage?.paymentPlans || {
    monthly: { setupFee: totalSetup, retainer: totalMonthly, savings: 'Standard Flexi Pricing', terms: '50% Advance Setup + 50% on Go-Live' },
    quarterly: { setupFee: totalSetup, retainer: Math.round(totalMonthly * 0.9), quarterlyTotal: totalSetup + Math.round(totalMonthly * 0.9 * 3), savings: 'Save 10% on Retainer', terms: 'Setup + 3 Months Upfront' },
    annual: { setupFee: Math.round(totalSetup * 0.5), retainer: Math.round(totalMonthly * 0.8), annualTotal: Math.round(totalSetup * 0.5) + Math.round(totalMonthly * 0.8 * 12), savings: 'Save 20% + 50% Setup Waived', terms: 'Full Year Domination' }
  };

  const planCards = [
    {
      title: 'Option A: Monthly Flexi',
      badge: 'Pay As You Go',
      badgeColor: [100, 116, 139],
      setup: `₹${plans.monthly.setupFee.toLocaleString('en-IN')}`,
      retainer: `₹${plans.monthly.retainer.toLocaleString('en-IN')}/mo`,
      benefit: 'No long-term lock-in',
      terms: 'Setup: 50% Kickoff + 50% Go-Live',
      isSelected: chosenPlanKey === 'monthly'
    },
    {
      title: 'Option B: Quarterly Growth',
      badge: 'Save 10% 🌟',
      badgeColor: [37, 99, 235],
      setup: `₹${plans.quarterly.setupFee.toLocaleString('en-IN')}`,
      retainer: `₹${plans.quarterly.retainer.toLocaleString('en-IN')}/mo`,
      benefit: plans.quarterly.savings,
      terms: `Quarterly Total: ₹${(plans.quarterly.quarterlyTotal || (plans.quarterly.setupFee + plans.quarterly.retainer * 3)).toLocaleString('en-IN')}`,
      isSelected: chosenPlanKey === 'quarterly'
    },
    {
      title: 'Option C: Annual Domination',
      badge: 'Save 20% + 50% Setup 🚀',
      badgeColor: [16, 185, 129],
      setup: `₹${plans.annual.setupFee.toLocaleString('en-IN')}`,
      retainer: `₹${plans.annual.retainer.toLocaleString('en-IN')}/mo`,
      benefit: plans.annual.savings,
      terms: `Annual Total: ₹${(plans.annual.annualTotal || (plans.annual.setupFee + plans.annual.retainer * 12)).toLocaleString('en-IN')}`,
      isSelected: chosenPlanKey === 'annual'
    }
  ];

  const cardWidth = (pageWidth - 28 - 6) / 3;
  planCards.forEach((card, i) => {
    const cardX = 14 + i * (cardWidth + 3);

    // Card background
    if (card.isSelected) {
      doc.setFillColor(239, 246, 255);
      doc.setDrawColor(...accentColor);
      doc.setLineWidth(0.5);
    } else {
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
    }
    doc.roundedRect(cardX, y, cardWidth, 38, 2, 2, 'FD');

    // Badge
    doc.setFillColor(...card.badgeColor);
    doc.roundedRect(cardX + 3, y + 2.5, cardWidth - 6, 4, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.text(card.badge, cardX + cardWidth / 2, y + 5.5, { align: 'center' });

    // Plan Title
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(7);
    doc.text(card.title, cardX + cardWidth / 2, y + 10.5, { align: 'center' });

    // Setup Fee
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(...mutedText);
    doc.text('Setup:', cardX + 4, y + 15.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(card.setup, cardX + cardWidth - 4, y + 15.5, { align: 'right' });

    // Retainer Fee
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...mutedText);
    doc.text('Monthly:', cardX + 4, y + 20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...accentColor);
    doc.text(card.retainer, cardX + cardWidth - 4, y + 20, { align: 'right' });

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.line(cardX + 4, y + 22.5, cardX + cardWidth - 4, y + 22.5);

    // Benefit & Terms
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.8);
    doc.setTextColor(...emeraldColor);
    doc.text(card.benefit, cardX + cardWidth / 2, y + 27, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.5);
    doc.setTextColor(71, 85, 105);
    const splitTerms = doc.splitTextToSize(card.terms, cardWidth - 6);
    doc.text(splitTerms, cardX + cardWidth / 2, y + 32, { align: 'center' });
  });

  // 3. Payment Milestones & Modes
  y += 43;
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, y, pageWidth - 28, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(15, 23, 42);
  doc.text('PAYMENT MILESTONES & MODES OF PAYMENT:', 20, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(...mutedText);
  doc.text('• Milestone 1: 50% advance setup fee upon project commencement & ad account audit.', 20, y + 8.5);
  doc.text('• Milestone 2: 50% setup balance upon website deployment & Meta Ads campaign activation.', 20, y + 12);
  doc.text('• Monthly Retainer: Billed at the beginning of each billing cycle (1st of month) for ongoing ad management & SEO.', 20, y + 15.5);
  doc.text('• Accepted Modes: Direct NEFT / RTGS / IMPS Bank Transfer, UPI (GPay, PhonePe, Paytm), Corporate Net Banking.', 20, y + 19);
  doc.text('• Direct Ads Spend: Meta & Google ad budgets are paid directly by client for 100% transparent GST tax credit (ITC).', 20, y + 22.5);

  // 4. Authorization & Signatures
  y += 29;
  doc.setDrawColor(203, 213, 225);
  doc.line(14, y, pageWidth - 14, y);

  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Proposal Prepared & Authorized By:', 14, y);
  doc.text('Accepted & Authorized By (Client):', pageWidth - 14, y, { align: 'right' });

  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(...accentColor);
  doc.text(`${senderName} (Digital Growth Architect)`, 14, y);
  doc.setTextColor(15, 23, 42);
  doc.text(`For: ${lead.name}`, pageWidth - 14, y, { align: 'right' });

  y += 3.8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(...mutedText);
  doc.text(`Gujarat B2B Web & Digital Solutions  •  Phone: ${senderPhone}`, 14, y);
  doc.text(`Name & Designation: ${lead.dm || 'Managing Director'}`, pageWidth - 14, y, { align: 'right' });

  y += 3.8;
  doc.text(`Official Email: info@gujaratcorridor.in`, 14, y);
  doc.text(`Signature & Company Stamp: ___________________`, pageWidth - 14, y, { align: 'right' });

  // Page 2 Footer
  doc.setFontSize(6.5);
  doc.text(`Page 2 of 2  •  Commercial Quotation QT-${(lead.id || 'LEAD').replace(/[^a-zA-Z0-9]/g, '')}`, pageWidth / 2, pageHeight - 8, { align: 'center' });

  // Clean filename
  const cleanName = (lead.name || 'Lead').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 25);
  const pkgTag = selectedPackage ? selectedPackage.id : 'MarketingProposal';
  const filename = `Quotation_${cleanName}_${pkgTag}_Itemized.pdf`;

  // Download PDF
  doc.save(filename);
  return filename;
}
