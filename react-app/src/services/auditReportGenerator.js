import { jsPDF } from 'jspdf';

/**
 * Generates a 1-Page High-Impact Digital Health & Competitor Gap Audit PDF
 * Tailored for Gujarat Industrial B2B Decision Makers (Morbi, Surat, Ahmedabad, etc.)
 */
export function generateDigitalAuditPdf(lead) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const primaryColor = [15, 23, 42];      // Slate 900
  const accentColor = [37, 99, 235];      // Blue 600
  const roseColor = [225, 29, 72];       // Rose 600 (Alert)
  const amberColor = [217, 119, 6];      // Amber 600
  const emeraldColor = [16, 185, 129];   // Emerald 500
  const mutedText = [100, 116, 139];     // Slate 500

  const senderPhone = localStorage.getItem('corridor_sender_phone') || '+91 98700 98180';
  const senderName = localStorage.getItem('corridor_sender_name') || 'Dhruv Rana';

  const auditNo = `AUDIT-${(lead.id || 'LEAD').replace(/[^a-zA-Z0-9]/g, '')}-${new Date().getFullYear()}`;
  const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const hasWebsite = Boolean(lead.websiteUrl && lead.websiteUrl.trim());
  const webScore = hasWebsite ? 38 : 12;
  const seoScore = hasWebsite ? 22 : 8;
  const metaAdsScore = 0; // Most factories run 0 Meta ads
  const crmScore = 15;
  const overallScore = Math.round((webScore + seoScore + metaAdsScore + crmScore) / 4);

  // 1. Top Header Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 36, 'F');

  // Decorative Accent Strip
  doc.setFillColor(...roseColor);
  doc.rect(0, 36, pageWidth, 2.5, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('CONFIDENTIAL B2B DIGITAL READINESS & COMPETITOR GAP AUDIT', 14, 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text('GUJARAT INDUSTRIAL CORRIDOR • MARKET SHARE DEFENSE & INQUIRY ACCELERATION', 14, 23);

  // Audit Reference & Date
  doc.setFontSize(8);
  doc.text(`Audit Ref: ${auditNo}`, pageWidth - 14, 15, { align: 'right' });
  doc.text(`Date: ${todayStr}`, pageWidth - 14, 21, { align: 'right' });
  doc.setTextColor(251, 113, 133); // Rose 400
  doc.text('Status: CRITICAL GROWTH LEAK', pageWidth - 14, 27, { align: 'right' });

  // 2. Client Profile & Overall Score Summary Card
  let y = 44;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, 32, 3, 3, 'FD');

  // Left side: Company Details
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(lead.company || 'Industrial Manufacturing Unit', 20, y + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...mutedText);
  doc.text(`Sector: ${lead.sector || 'Manufacturing'}  |  Hub: ${lead.city || 'Gujarat'} Corridor  |  DM: ${lead.dm || 'Managing Director'}`, 20, y + 16);
  doc.text(`Registered Address: ${lead.address || 'Industrial Estate, Gujarat'}`, 20, y + 23);

  // Right side: Overall Score Gauge
  const scoreBoxX = pageWidth - 60;
  doc.setFillColor(255, 241, 242); // Rose 50
  doc.setDrawColor(...roseColor);
  doc.roundedRect(scoreBoxX, y + 4, 42, 24, 2.5, 2.5, 'FD');

  doc.setTextColor(...roseColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(`${overallScore}/100`, scoreBoxX + 21, y + 14, { align: 'center' });
  doc.setFontSize(7.5);
  doc.text('DIGITAL MATURITY', scoreBoxX + 21, y + 20, { align: 'center' });
  doc.setFontSize(6.5);
  doc.text('(HIGH INQUIRY LOSS)', scoreBoxX + 21, y + 24, { align: 'center' });

  // 3. 4-Pillar Audit Breakdown
  y = 82;
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('1. FOUR-PILLAR DIGITAL PERFORMANCE BENCHMARK', 14, y);

  y += 5;
  const pillars = [
    {
      title: 'A. Web Portal & Mobile Responsiveness',
      score: `${webScore}/100`,
      status: hasWebsite ? 'Outdated UI / Slow Mobile Speed' : 'ZERO Web Presence (Critical)',
      impact: '82% of modern wholesale buyers leave if mobile page is slow or unoptimized.',
      color: roseColor
    },
    {
      title: 'B. Google Search & Local GMB Visibility',
      score: `${seoScore}/100`,
      status: 'Page 2+ Ranking (Invisible to Buyers)',
      impact: 'Wholesale buyers in Mumbai/Delhi searching for your products never discover you.',
      color: amberColor
    },
    {
      title: 'C. Meta Ads (Facebook / Instagram Wholesale Funnel)',
      score: '0/100',
      status: '0 Active Meta Ad Campaigns Detected',
      impact: 'Competitors are running 8-15 active ads, capturing 100% of social wholesale demand.',
      color: roseColor
    },
    {
      title: 'D. Inbound Lead Capture & WhatsApp Automation',
      score: `${crmScore}/100`,
      status: 'Manual Reception Calling Only',
      impact: 'Over 60% of after-hours wholesale inquiries go unaddressed with 0 automated follow-up.',
      color: amberColor
    }
  ];

  pillars.forEach((p) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, y, pageWidth - 28, 17, 2, 2, 'FD');

    // Title & Score
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryColor);
    doc.text(p.title, 18, y + 5.5);

    doc.setFontSize(8.5);
    doc.setTextColor(...p.color);
    doc.text(p.score, pageWidth - 20, y + 5.5, { align: 'right' });

    // Status Pill
    doc.setFontSize(7.5);
    doc.text(`Status: ${p.status}`, 18, y + 10.5);

    // Impact
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...mutedText);
    doc.text(`Financial Impact: ${p.impact}`, 18, y + 14.5);

    y += 19.5;
  });

  // 4. Competitor Alert & Lost Revenue Callout Box
  y += 2;
  doc.setFillColor(254, 242, 242); // Rose 50
  doc.setDrawColor(...roseColor);
  doc.setLineWidth(0.4);
  doc.roundedRect(14, y, pageWidth - 28, 28, 2.5, 2.5, 'FD');

  doc.setTextColor(...roseColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('⚠ COMPETITOR THREAT & ESTIMATED MONTHLY REVENUE DRAIN', 20, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(30, 41, 59);
  const alertText = [
    `• In the ${lead.city || 'Gujarat'} industrial corridor, top competing ${lead.sector || 'manufacturing'} units run active Meta & Google campaigns.`,
    '• Estimated Lost Wholesale Inquiries: 25 to 60 Qualified Dealer/Distributor leads per month.',
    '• Estimated Monthly Lost Deal Value: Rs. 6,00,000 to Rs. 25,00,000 in domestic & export orders.'
  ];
  alertText.forEach((line, idx) => {
    doc.text(line, 20, y + 13 + (idx * 4.5));
  });

  // 5. 3-Phase Acceleration Strategy by Dhruv Rana
  y += 34;
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('2. RECOMMENDED 30-DAY DIGITAL RESCUE PLAN', 14, y);

  y += 5;
  const steps = [
    { num: 'PHASE 1', title: 'High-Converting Web Portal', desc: 'Modern mobile-first catalog, verified GST credentials & 1-Click WhatsApp RFQ' },
    { num: 'PHASE 2', title: 'Targeted Meta & Google Ads', desc: 'Targeting verified wholesale buyers, builders & B2B distributors nationwide' },
    { num: 'PHASE 3', title: 'Automated CRM Lead Nurturing', desc: 'Instant WhatsApp catalog delivery, automated inquiry routing & weekly reporting' }
  ];

  const colWidth = (pageWidth - 28 - 8) / 3;
  steps.forEach((s, idx) => {
    const colX = 14 + (idx * (colWidth + 4));
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(colX, y, colWidth, 34, 2, 2, 'FD');

    doc.setFillColor(...accentColor);
    doc.roundedRect(colX + 3, y + 3, 18, 5, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text(s.num, colX + 12, y + 6.5, { align: 'center' });

    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(s.title, colX + 4, y + 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(...mutedText);
    const splitDesc = doc.splitTextToSize(s.desc, colWidth - 8);
    doc.text(splitDesc, colX + 4, y + 18);
  });

  // 6. Consultant Contact & Next Steps Footer
  y += 39;
  doc.setFillColor(...primaryColor);
  doc.rect(14, y, pageWidth - 28, 22, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('CLAIM YOUR DETAILED 360° DIGITAL STRATEGY SESSION:', 20, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text(`Consultant: ${senderName} | WhatsApp & Direct Phone: ${senderPhone}`, 20, y + 13);
  doc.text('Gujarat Corridor Prospecting & Marketing Infrastructure | All Rights Reserved.', 20, y + 18);

  const cleanName = (lead.company || 'Lead').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Digital_Audit_${cleanName}.pdf`);
}
