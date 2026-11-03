import { jsPDF } from 'jspdf';

export function generateQuotationPdf(lead) {
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
  const mutedText = [100, 116, 139];     // Slate 500

  // 1. Top Header Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 38, 'F');

  // Decorative Accent Strip
  doc.setFillColor(...accentColor);
  doc.rect(0, 38, pageWidth, 2.5, 'F');

  // Title in Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('B2B WEB DEVELOPMENT PROPOSAL', 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text('GUJARAT INDUSTRIAL CORRIDOR DIGITAL ACCELERATOR', 14, 25);

  // Quote Reference & Date (Right side)
  const quoteNo = `QT-${(lead.id || 'LEAD').replace(/[^a-zA-Z0-9]/g, '')}-${new Date().getFullYear()}`;
  const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  doc.setFontSize(8.5);
  doc.text(`Quote Ref: ${quoteNo}`, pageWidth - 14, 18, { align: 'right' });
  doc.text(`Date: ${todayStr}`, pageWidth - 14, 24, { align: 'right' });
  doc.text('Valid: 15 Days', pageWidth - 14, 30, { align: 'right' });

  // 2. Client & Prospect Details Box
  let y = 48;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, 36, 2, 2, 'FD');

  doc.setTextColor(...accentColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('PROPOSAL PREPARED FOR:', 20, y + 8);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.text(lead.name || 'Industrial Enterprise', 20, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...mutedText);
  const dmText = `Attn: ${lead.dm || 'Director / Business Owner'}  |  Phone: ${lead.phone || 'Provided upon request'}`;
  doc.text(dmText, 20, y + 22);

  const rawAddress = lead.address || `${lead.city}, Gujarat Industrial Estate`;
  const splitAddress = doc.splitTextToSize(`Address: ${rawAddress}`, pageWidth - 40);
  doc.text(splitAddress, 20, y + 28);

  // 3. Project Objective & Strategic Overview
  y += 44;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.text('1. Project Scope & Deliverables', 14, y);

  doc.setDrawColor(...accentColor);
  doc.line(14, y + 2, 70, y + 2);

  y += 9;
  const isRedesign = Boolean(lead.websiteUrl && lead.websiteUrl.trim());
  const deliverables = [
    {
      title: isRedesign 
        ? 'Complete B2B Website Redesign & Modernization' 
        : 'Modern High-Conversion B2B Corporate Website',
      desc: isRedesign
        ? `Comprehensive redesign of legacy digital presence (${lead.websiteUrl}) into a lightning-fast, mobile-first industrial portal.`
        : 'Mobile-first, lightning-fast responsive architecture designed for industrial buyers and exporters.'
    },
    {
      title: 'Digital B2B Product & Machinery Catalog',
      desc: 'Showcase specifications, certifications (ISO/CE), manufacturing capacity & downloadable brochures.'
    },
    {
      title: 'Direct WhatsApp Business & 1-Click Dial Integration',
      desc: 'Instant buyer inquiry routing directly to management WhatsApp for rapid conversion.'
    },
    {
      title: 'Google Business & GIDC Factory Location Pinning',
      desc: 'Complete geo-tagging on Google Maps so buyers and transport vendors easily locate factory gates.'
    },
    {
      title: 'Local & Export Search Engine Optimization (SEO)',
      desc: 'Targeted ranking for relevant B2B manufacturing keywords across Gujarat industrial hubs.'
    },
    {
      title: 'High-Speed Cloud Hosting, SSL & Professional Business Email',
      desc: 'Secure enterprise cloud setup with free 1-year SSL certificate and @yourcompany.com emails.'
    },
  ];

  deliverables.forEach((item, index) => {
    // Bullet point dot
    doc.setFillColor(...accentColor);
    doc.circle(18, y + 1.5, 1.2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(item.title, 23, y + 2.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...mutedText);
    doc.text(item.desc, 23, y + 6.8);

    y += 11;
  });

  // 4. Commercials & Investment Table
  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.text('2. Commercial Proposal & Investment', 14, y);

  doc.setDrawColor(...accentColor);
  doc.line(14, y + 2, 85, y + 2);

  y += 8;

  // Table Header
  doc.setFillColor(...primaryColor);
  doc.rect(14, y, pageWidth - 28, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Service Description', 20, y + 5.5);
  doc.text('Billing Model', 120, y + 5.5);
  doc.text('Amount (INR)', pageWidth - 20, y + 5.5, { align: 'right' });

  y += 8;
  const webFee = lead.webCost || 28000;
  const mrrFee = lead.mrr || 3500;

  // Row 1: Web Development
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, y, pageWidth - 28, 12, 'FD');
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Complete Turnkey B2B Website & Catalog Setup', 20, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text('Includes UI/UX, responsive development, WhatsApp hook & launch', 20, y + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('One-Time Fee', 120, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...emeraldColor);
  doc.text(`₹${webFee.toLocaleString('en-IN')}`, pageWidth - 20, y + 7.5, { align: 'right' });

  y += 12;

  // Row 2: Monthly Retainer
  doc.setFillColor(248, 250, 252);
  doc.rect(14, y, pageWidth - 28, 12, 'FD');
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Cloud Hosting, Security Maintenance & Minor Content Updates', 20, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text('99.9% uptime server, daily cloud backups, SSL renewal & technical support', 20, y + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Monthly Retainer', 120, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...accentColor);
  doc.text(`₹${mrrFee.toLocaleString('en-IN')}/mo`, pageWidth - 20, y + 7.5, { align: 'right' });

  // 5. Terms & Payment Schedule
  y += 18;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, y, pageWidth - 28, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('TERMS & DELIVERY TIMELINE:', 20, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text('• Delivery Schedule: 7 to 10 working days from asset and product catalog submission.', 20, y + 11);
  doc.text('• Payment Schedule: 50% initial advance upon commencement, 50% upon final live deployment.', 20, y + 15);
  doc.text('• Support: 30 days of comprehensive post-launch warranty with dedicated phone assistance.', 20, y + 19);

  // 6. Signoff Footer
  y += 28;
  doc.setDrawColor(203, 213, 225);
  doc.line(14, y, pageWidth - 14, y);

  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('Prepared By:', 14, y);
  doc.text('Accepted & Authorized By (Client):', pageWidth - 14, y, { align: 'right' });

  const senderPhone = localStorage.getItem('corridor_sender_phone') || '+91 98700 98180';
  const senderName = localStorage.getItem('corridor_sender_name') || 'Dhruv Rana';

  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text(`Gujarat B2B Corridor Web Solutions (${senderName} • ${senderPhone})`, 14, y);
  doc.text(`For: ${lead.name || 'Company Authorized Signatory'}`, pageWidth - 14, y, { align: 'right' });

  // Clean filename
  const cleanName = (lead.name || 'Lead').replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
  const filename = `Quotation_${cleanName}_WebDev.pdf`;

  // Download PDF
  doc.save(filename);
  return filename;
}
