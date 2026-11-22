import { jsPDF } from 'jspdf';

/**
 * Generates a 2-Page Legal-Grade "Master Digital Marketing & Web Service Agreement" PDF
 * For Gujarat B2B Industrial Clients (Dhruv Rana Digital Consulting)
 */
export function generateContractPdf(lead, selectedPackage = null) {
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

  const senderPhone = localStorage.getItem('corridor_sender_phone') || '+91 98700 98180';
  const senderName = localStorage.getItem('corridor_sender_name') || 'Dhruv Rana';

  const contractNo = `AGR-${(lead.id || 'LEAD').replace(/[^a-zA-Z0-9]/g, '')}-${new Date().getFullYear()}`;
  const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const pkgName = selectedPackage ? selectedPackage.name : '360° Industrial Growth Package';
  const setupFee = selectedPackage ? selectedPackage.setupFee : '₹48,000';
  const monthlyRetainer = selectedPackage ? selectedPackage.monthlyRetainer : '₹22,000';

  // ==========================================
  // PAGE 1: RECITALS, PARTIES & SCOPE OF WORK
  // ==========================================

  // 1. Top Header Banner
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 36, 'F');

  // Decorative Accent Strip
  doc.setFillColor(...emeraldColor);
  doc.rect(0, 36, pageWidth, 2.5, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('MASTER DIGITAL MARKETING & WEB SERVICES AGREEMENT', 14, 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text('LEGAL SERVICE CONTRACT • TERMS OF ENGAGEMENT & SCOPE OF WORK', 14, 23);

  // Contract Ref & Date
  doc.setFontSize(8);
  doc.text(`Contract Ref: ${contractNo}`, pageWidth - 14, 15, { align: 'right' });
  doc.text(`Effective Date: ${todayStr}`, pageWidth - 14, 21, { align: 'right' });
  doc.setTextColor(110, 231, 183); // Emerald 300
  doc.text('Jurisdiction: Gujarat, India', pageWidth - 14, 27, { align: 'right' });

  // 2. The Parties Section
  let y = 45;
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('1. PARTIES TO THE AGREEMENT', 14, y);

  y += 5;
  // Provider Box (Left)
  const boxW = (pageWidth - 28 - 6) / 2;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, boxW, 30, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...primaryColor);
  doc.text('SERVICE PROVIDER:', 18, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...mutedText);
  doc.text(`${senderName} Digital Consulting`, 18, y + 12);
  doc.text('Gujarat B2B Corridor Infrastructure', 18, y + 17);
  doc.text(`Direct Contact: ${senderPhone}`, 18, y + 22);

  // Client Box (Right)
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14 + boxW + 6, y, boxW, 30, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...primaryColor);
  doc.text('CLIENT (MANUFACTURER):', 18 + boxW + 6, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...mutedText);
  doc.text(lead.company || 'Industrial Manufacturing Unit', 18 + boxW + 6, y + 12);
  doc.text(`Authorized Rep: ${lead.dm || 'Managing Director'}`, 18 + boxW + 6, y + 17);
  doc.text(`Location: ${lead.city || 'Gujarat'}, India`, 18 + boxW + 6, y + 22);

  // 3. Recitals & Appointment
  y += 37;
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('2. RECITALS & SCOPE OF SERVICES', 14, y);

  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const recitals = [
    `The Client hereby retains the Service Provider to execute end-to-end digital marketing and online presence development under the "${pkgName}" tier for products manufactured at the Client's facilities.`,
    'The engagement comprises the following technical and operational deliverables:'
  ];
  recitals.forEach(r => {
    doc.text(r, 14, y);
    y += 5;
  });

  const deliverables = [
    { title: 'A. Mobile-First Web Portal & B2B RFQ Funnel', desc: 'Custom responsive website, product catalog, verified GST badge, mobile speed optimization & 1-Click WhatsApp RFQ.' },
    { title: 'B. Meta (Facebook / Instagram) Ads Engine', desc: 'Campaign strategy, creative ad design, audience targeting for dealers/builders, pixel setup & lead routing.' },
    { title: 'C. Google Local & National Search SEO', desc: 'Google My Business (GMB) optimization, 5-star review funnel, keyword ranking for wholesale B2B inquiries.' },
    { title: 'D. Social Media Branding & Video Reels', desc: 'Monthly creative banners, factory process video reels, brand positioning & corporate profile building.' },
    { title: 'E. WhatsApp CRM & Automated Lead Notification', desc: 'Instant WhatsApp routing of buyer inquiries to sales head, automated reply catalog & weekly lead audit.' }
  ];

  y += 2;
  deliverables.forEach(d => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, y, pageWidth - 28, 14, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...accentColor);
    doc.text(d.title, 18, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(...mutedText);
    doc.text(d.desc, 18, y + 10);

    y += 16;
  });

  // Footer on Page 1
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text(`Master Service Agreement • ${contractNo} • Page 1 of 2`, pageWidth / 2, pageHeight - 8, { align: 'center' });

  // ==========================================
  // PAGE 2: COMMERCIALS, TERMS & SIGNATURES
  // ==========================================
  doc.addPage();

  // Header Banner Page 2
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 24, 'F');
  doc.setFillColor(...emeraldColor);
  doc.rect(0, 24, pageWidth, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('COMMERCIAL TERMS, LEGAL CLAUSES & EXECUTION', 14, 14);
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text(`Contract Ref: ${contractNo} | Page 2 of 2`, pageWidth - 14, 14, { align: 'right' });

  // 4. Commercial Terms & Payment Milestones
  y = 34;
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('3. COMMERCIAL TERMS & PAYMENT SCHEDULE', 14, y);

  y += 6;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, 30, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...primaryColor);
  doc.text(`Selected Package: ${pkgName}`, 20, y + 7);
  doc.text(`One-Time Setup & Development Fee: ${setupFee}`, 20, y + 13);
  doc.text(`Monthly Retainer (Ads, SEO, Creatives): ${monthlyRetainer} / month`, 20, y + 19);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...emeraldColor);
  doc.text('Payment Milestones: 50% Kickoff Advance | 50% On Go-Live | Retainer Due 1st of Each Month', 20, y + 25);

  // 5. Legal & Operational Terms
  y += 37;
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('4. KEY TERMS & CONDITIONS', 14, y);

  y += 5;
  const terms = [
    {
      num: '4.1 Ad Spend Transparency:',
      text: 'All Meta/Google media ad budgets are paid directly by the Client via credit card/UPI linked to the Client\'s own ad account to ensure 100% transparency and GST Input Tax Credit (ITC) eligibility.'
    },
    {
      num: '4.2 Intellectual Property Ownership:',
      text: 'Upon full payment of setup fees, 100% ownership of the website domain, source code, creative artwork, ad account history, and customer lead databases belongs exclusively to the Client.'
    },
    {
      num: '4.3 Confidentiality & Data Protection:',
      text: 'Both parties agree to hold all manufacturing specifications, dealer pricing, sales lead numbers, and marketing strategies in strict commercial confidence.'
    },
    {
      num: '4.4 Term & Termination:',
      text: 'This agreement remains in effect on a monthly rolling basis following the initial launch. Either party may terminate with a 30-day written notice without penalty.'
    }
  ];

  terms.forEach(t => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...primaryColor);
    doc.text(t.num, 14, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.3);
    doc.setTextColor(71, 85, 105);
    const splitText = doc.splitTextToSize(t.text, pageWidth - 28);
    doc.text(splitText, 14, y);
    y += splitText.length * 4 + 2;
  });

  // 6. Signatures and Execution Block
  y = pageHeight - 65;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, y, pageWidth - 28, 52, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...primaryColor);
  doc.text('IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the Effective Date.', 20, y + 7);

  // Signature columns
  const sigColW = (pageWidth - 28 - 16) / 2;
  const leftX = 20;
  const rightX = 20 + sigColW + 8;

  // Provider Signature
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...primaryColor);
  doc.text('FOR SERVICE PROVIDER:', leftX, y + 16);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text(`${senderName} Digital Consulting`, leftX, y + 21);
  doc.text('Authorized Signatory', leftX, y + 26);

  // Signature line
  doc.setDrawColor(203, 213, 225);
  doc.line(leftX, y + 42, leftX + sigColW - 10, y + 42);
  doc.setFontSize(7);
  doc.text('Signature & Official Stamp', leftX, y + 46);

  // Client Signature
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...primaryColor);
  doc.text('FOR CLIENT (MANUFACTURER):', rightX, y + 16);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text(lead.company || 'Industrial Manufacturing Unit', rightX, y + 21);
  doc.text(`Authorized Signatory (${lead.dm || 'Managing Director'})`, rightX, y + 26);

  // Client Signature line
  doc.line(rightX, y + 42, rightX + sigColW - 10, y + 42);
  doc.setFontSize(7);
  doc.text('Signature & Factory Seal', rightX, y + 46);

  // Bottom watermark
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text(`Master Service Agreement • ${contractNo} • Page 2 of 2`, pageWidth / 2, pageHeight - 6, { align: 'center' });

  const cleanName = (lead.company || 'Lead').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Service_Agreement_${cleanName}.pdf`);
}
