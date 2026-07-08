const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Ensure output directory exists
const outputDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
const outputPath = path.join(outputDir, 'report.pdf');

console.log('Generating project report PDF...');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 60, bottom: 60, left: 60, right: 60 },
  bufferPages: true // Enable buffering to compute total pages and dynamically compile TOC
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Theme Colors (PujaConnect Saffron and Gold Theme)
const PRIMARY_COLOR = '#F97316'; // Saffron
const SECONDARY_COLOR = '#D97706'; // Gold
const TEXT_COLOR = '#1C1917'; // Charcoal
const MUTED_COLOR = '#78716C'; // Gray
const LIGHT_BG = '#FFFBF5'; // Off-white

// TOC Mapping references
const chapterPages = {};
const tocYPositions = {};

// Helper to add headings
function addChapterTitle(id, title) {
  doc.addPage();
  // Record 1-based page number dynamically
  chapterPages[id] = doc.bufferedPageRange().count;
  
  doc.fillColor(PRIMARY_COLOR).font('Helvetica-Bold').fontSize(20).text(title, { align: 'left' });
  doc.moveDown(0.5);
  doc.strokeColor(SECONDARY_COLOR).lineWidth(2).moveTo(60, doc.y).lineTo(535, doc.y).stroke();
  doc.moveDown(0.9);
  doc.fillColor(TEXT_COLOR).font('Helvetica').fontSize(12);
}

function addSectionHeading(heading) {
  // Prevent subheadings from splitting or sitting alone near page bottoms
  if (doc.y > 620) {
    doc.addPage();
  } else {
    doc.moveDown(1.3);
  }
  doc.fillColor(SECONDARY_COLOR).font('Helvetica-Bold').fontSize(14).text(heading);
  doc.moveDown(0.45);
  doc.fillColor(TEXT_COLOR).font('Helvetica').fontSize(12);
}

function addSubsectionHeading(subheading) {
  if (doc.y > 650) {
    doc.addPage();
  } else {
    doc.moveDown(0.95);
  }
  doc.fillColor(TEXT_COLOR).font('Helvetica-Bold').fontSize(12.5).text(subheading);
  doc.moveDown(0.35);
  doc.fillColor(TEXT_COLOR).font('Helvetica').fontSize(12);
}

function addParagraph(text) {
  doc.font('Helvetica').fontSize(12).text(text, { align: 'justify', lineGap: 3.0 });
  doc.moveDown(0.6);
}

function addBullet(item, boldPrefix = '') {
  doc.font('Helvetica').fontSize(12);
  if (boldPrefix) {
    doc.font('Helvetica-Bold').text('  • ' + boldPrefix, { continued: true, lineGap: 2.0 })
       .font('Helvetica').text(' ' + item, { lineGap: 2.0 });
  } else {
    doc.text('  • ' + item, { lineGap: 2.0 });
  }
  doc.moveDown(0.35);
}

function addCodeBlock(code) {
  doc.moveDown(0.4);
  doc.font('Courier').fontSize(9).fillColor('#1E293B'); // slate-800
  doc.text(code, { lineGap: 1.6, indent: 15, align: 'left' });
  doc.moveDown(0.4);
  doc.fillColor(TEXT_COLOR).font('Helvetica').fontSize(12);
}

function drawTable(headers, rows, colWidths, startX = 60) {
  let y = doc.y + 8;
  
  // Header Row
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(PRIMARY_COLOR);
  headers.forEach((header, idx) => {
    const x = startX + colWidths.slice(0, idx).reduce((a, b) => a + b, 0);
    doc.text(header, x, y, { width: colWidths[idx], align: 'left' });
  });
  
  y += 14;
  doc.strokeColor(SECONDARY_COLOR).lineWidth(1).moveTo(startX, y).lineTo(startX + colWidths.reduce((a, b) => a + b, 0), y).stroke();
  y += 6;
  
  // Rows
  doc.font('Helvetica').fontSize(9.5).fillColor(TEXT_COLOR);
  rows.forEach((row) => {
    let maxHeight = 12;
    
    // Find tallest cell in this row
    row.forEach((cell, idx) => {
      const height = doc.heightOfString(cell.toString(), { width: colWidths[idx] });
      if (height > maxHeight) maxHeight = height;
    });
    
    // Page boundary check
    if (y + maxHeight > 700) {
      doc.addPage();
      y = 60;
      
      // Redraw header on new page
      doc.font('Helvetica-Bold').fontSize(10.5).fillColor(PRIMARY_COLOR);
      headers.forEach((header, idx) => {
        const x = startX + colWidths.slice(0, idx).reduce((a, b) => a + b, 0);
        doc.text(header, x, y, { width: colWidths[idx], align: 'left' });
      });
      y += 14;
      doc.strokeColor(SECONDARY_COLOR).lineWidth(1).moveTo(startX, y).lineTo(startX + colWidths.reduce((a, b) => a + b, 0), y).stroke();
      y += 6;
      doc.font('Helvetica').fontSize(9.5).fillColor(TEXT_COLOR);
    }
    
    // Draw cells
    row.forEach((cell, idx) => {
      const x = startX + colWidths.slice(0, idx).reduce((a, b) => a + b, 0);
      doc.text(cell.toString(), x, y, { width: colWidths[idx], align: 'left' });
    });
    
    y += maxHeight + 5;
    doc.strokeColor('#E5E7EB').lineWidth(0.5).moveTo(startX, y).lineTo(startX + colWidths.reduce((a, b) => a + b, 0), y).stroke();
    y += 5;
  });
  
  doc.y = y;
  doc.moveDown(0.8);
}

// ──────────────────────────────────────────────────────────────────────────
// 1. COVER PAGE (Page 0)
// ──────────────────────────────────────────────────────────────────────────
doc.rect(0, 0, 600, 20).fill(PRIMARY_COLOR);
doc.rect(0, 820, 600, 20).fill(SECONDARY_COLOR);

// Top Title Block
doc.y = 180;
doc.fillColor(TEXT_COLOR).font('Helvetica-Bold').fontSize(32).text('PujaConnect', { align: 'center' });
doc.fillColor(SECONDARY_COLOR).font('Helvetica-Bold').fontSize(16).text('Online Pandit & Booking Platform', { align: 'center' });
doc.moveDown(1.5);

doc.strokeColor(PRIMARY_COLOR).lineWidth(3).moveTo(150, doc.y).lineTo(450, doc.y).stroke();

// Middle Report Block
doc.y = 360;
doc.fillColor(TEXT_COLOR).font('Helvetica-Bold').fontSize(18).text('PROJECT REPORT', { align: 'center', characterSpacing: 1.5 });
doc.moveDown(0.5);
doc.fillColor(MUTED_COLOR).font('Helvetica-Oblique').fontSize(12).text('Technical Documentation & Architecture Manual', { align: 'center' });

// Bottom Authorship Block
doc.y = 620;

// Column 1: Submitted By
doc.font('Helvetica').fontSize(11).fillColor(MUTED_COLOR).text('Submitted by:', 80, 620);
doc.font('Helvetica-Bold').fontSize(12.5).fillColor(TEXT_COLOR).text('ABHIRAMA H Y', 80, 638);
doc.font('Helvetica').fontSize(10.5).fillColor(MUTED_COLOR).text('abhiramhy836@gmail.com', 80, 656);
doc.font('Helvetica').fontSize(10.5).fillColor(MUTED_COLOR).text('PES University', 80, 674);

// Column 2: Under Guidance
doc.font('Helvetica').fontSize(11).fillColor(MUTED_COLOR).text('Under the Guidance of:', 320, 620);
doc.font('Helvetica-Bold').fontSize(12.5).fillColor(TEXT_COLOR).text('Unified Mentor', 320, 638);
doc.font('Helvetica').fontSize(10.5).fillColor(MUTED_COLOR).text('Program Manager', 320, 656);

// ──────────────────────────────────────────────────────────────────────────
// 2. ABSTRACT (Page 1)
// ──────────────────────────────────────────────────────────────────────────
doc.addPage();
doc.y = 80;
doc.fillColor(TEXT_COLOR).font('Helvetica-Bold').fontSize(16).text('ABSTRACT', { align: 'center' });
doc.moveDown(2);

addParagraph(
  'In the modern era, while digital solutions have disrupted retail, travel, and logistics, the religious services sector in India remains highly unorganized and fragmented. Booking a Pandit (priest) for sacred rituals currently relies heavily on word-of-mouth recommendations, local references, or direct temple visits. This lack of standardization leads to opaque pricing, scheduling conflicts, and difficulty in finding credentialed, verified professionals.'
);

addParagraph(
  'PujaConnect is a premium, end-to-end full-stack digital platform designed to bridge this gap. Built using the MERN stack (MongoDB, Express, React, Node.js) and styled with a customized, Karnataka-inspired saffron and gold palette, PujaConnect establishes a reliable ecosystem connecting devotees (Users), priests (Pandits), and administrators (Admins).'
);

addParagraph(
  'Devotees benefit from transparent slot-based booking, an intuitive interface, direct booking-related chat, and detailed profiles. Pandits are empowered with digital tools to set custom availability, list services with standard pricing, and manage requests. Admins oversee the platform quality through manual credentials verification, ritual catalog curations (100+ categories), and user account moderations.'
);

addParagraph(
  'This report details the design decisions, system architecture, database design, core scheduling mechanics (including buffer gaps and slot locking), API parameters, security guidelines, and deployment practices (Vercel, Render, MongoDB Atlas, Cloudinary) that make PujaConnect a production-ready, highly scalable, and secure application.'
);

doc.moveDown(0.5);
doc.fillColor(PRIMARY_COLOR).font('Helvetica-Bold').fontSize(12).text('Live Deployed Application: ', { continued: true });
doc.fillColor('#1D4ED8').font('Helvetica').text('https://puja-connect-ahy.vercel.app/', { link: 'https://puja-connect-ahy.vercel.app/', underline: true });
doc.moveDown(0.5);
doc.fillColor(TEXT_COLOR).font('Helvetica').fontSize(12);

// ──────────────────────────────────────────────────────────────────────────
// 3. TABLE OF CONTENTS (Page 2)
// ──────────────────────────────────────────────────────────────────────────
doc.addPage();
doc.y = 80;
doc.fillColor(TEXT_COLOR).font('Helvetica-Bold').fontSize(16).text('TABLE OF CONTENTS', { align: 'center' });
doc.moveDown(1.5);

// Define chapters that will map to TOC dynamically
const toc = [
  ['project-overview', '1. Project Overview'],
  ['introduction', '2. Introduction'],
  ['problem-statement', '3. Problem Statement'],
  ['existing-system', '4. Existing System'],
  ['proposed-solution', '5. Proposed Solution'],
  ['objectives', '6. Objectives'],
  ['scope', '7. Scope'],
  ['architecture', '8. Complete System Architecture'],
  ['tech-stack', '9. Technology Stack'],
  ['folder-structure', '10. Folder Structure'],
  ['database-design', '11. Database Design'],
  ['auth-flow', '12. Authentication Flow'],
  ['user-module', '13. User (Devotee) Module'],
  ['pandit-module', '14. Pandit (Priest) Module'],
  ['admin-module', '15. Admin Module & Moderation'],
  ['ritual-management', '16. Ritual Management'],
  ['booking-workflow', '17. Booking Workflow'],
  ['availability-management', '18. Availability Management'],
  ['messaging-system', '19. Messaging System'],
  ['search-filtering', '20. Search & Filtering'],
  ['admin-verification', '21. Admin Verification Workflow'],
  ['deployment-architecture', '22. Deployment Architecture'],
  ['api-overview', '23. API Overview'],
  ['security-features', '24. Security Features'],
  ['future-enhancements', '25. Future Enhancements'],
  ['challenges-faced', '26. Challenges Faced'],
  ['conclusion', '27. Conclusion'],
  ['screenshots', '28. Project Screenshots Guide']
];

toc.forEach(([id, title]) => {
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(TEXT_COLOR).text(title, { continued: true });
  // Place dot leaders
  const dotsCount = 80 - title.length;
  doc.font('Helvetica').text(' ' + '.'.repeat(dotsCount > 5 ? dotsCount : 5) + ' ', { continued: true });
  // Record y position to draw the actual compiled page number later
  tocYPositions[id] = doc.y;
  doc.text(' ', { align: 'right' }); // Placeholder to complete the line
  doc.moveDown(0.6);
});

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 1. PROJECT OVERVIEW
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("project-overview", "1. Project Overview");

addParagraph("Live Deployed Application Link:");
addParagraph("https://puja-connect-ahy.vercel.app/");

addParagraph("PujaConnect is a production-ready, full-stack digital booking platform built using the MERN stack (MongoDB, Express, React, Node.js). Styled with a customized, Karnataka-inspired saffron and gold palette, it creates an organized, transparent, and trusted digital ecosystem bridging devotees (Users), religious service providers (Pandits), and platform managers (Admins).");
addParagraph("The platform includes structural components for slot-based real-time calendar availability, direct booking-linked message threads with unread counters, in-memory Cloudinary image upload streams, manual credentials verification workflows, and strict role-based route protections.");
addParagraph("The system is designed to be horizontally scalable. Each core concern (authentication, booking transactions, availability calculations, and messaging) is implemented in its own controller file, allowing independent modification without side effects across other modules.");

addSectionHeading("Ecosystem Core Parameters");
addBullet("Ecosystem Roles: User (Devotee), Pandit (Priest), and Admin");
addBullet("Access Control: Three distinct dashboard layouts with Role-Based Access Control (RBAC)");
addBullet("Catalog Size: 100+ Sacred Hindu Rituals across 12 custom categories");
addBullet("Key Tech Stack: MERN (MongoDB Atlas, Express.js, React.js, Node.js) + Tailwind CSS");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 2. INTRODUCTION
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("introduction", "2. Introduction");

addParagraph("In Hindu traditions, planning religious ceremonies is a sacred task, yet finding the right Pandit who is certified, speaks the appropriate regional language, and understands specific custom variations remains highly unorganized. PujaConnect resolves this digital divide by offering a unified discovery portal where devotees can discover Pandits, examine pricing models, and coordinate materials.");
addParagraph("This project represents a complete full-stack answer to the digitization of religious bookings, establishing standards in time-scheduling availability, secure communication channels, and identity validations.");

addSectionHeading("Platform Core Pillars");
addBullet("Multi-criteria Discovery: Users search verified Pandit profiles by city, state, experience, and spoken languages, eliminating the trust barrier.");
addBullet("Pricing Transparency: Explicit pricing models, required material checklists, estimated durations, and preparation guidelines are displayed upfront.");
addBullet("Unified Coordination: Dedicated messaging threads are created dynamically for each booking, allowing devotees and priests to coordinate gotra, addresses, and materials.");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 3. PROBLEM STATEMENT
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("problem-statement", "3. Problem Statement");

addSectionHeading("3.1 Industry Context");
addParagraph("In India, the religious services sector, specifically for Vedic rituals, pujas, and homas, is a massive market. However, it operates almost entirely within an informal, unorganized, and highly fragmented ecosystem. Traditionally, devotees rely on family networks, word-of-mouth recommendations, or local temple priests to find a Pandit (priest) for sacred occasions. This informal network lacks standards in credentials, pricing, and scheduling.");

addSectionHeading("3.2 Devotee Pain Points");
addBullet("Trust and Verification Deficit: There is no centralized registry to verify a priest's certifications (e.g., Veda Pathshala degrees) or background, leaving devotees uncertain about the Pandit's authenticity.");
addBullet("Opaque and Inconsistent Fees: The lack of standardized pricing leads to arbitrary negotiations. Devotees face opaque costs that vary wildly based on the location, priest, or auspiciousness of the day.");
addBullet("Coordination and Preparation Gaps: Coordinating gotra details, required puja preparation checklists (Samagri), and exact timing depends on fragile phone calls, leading to misunderstandings and preparation delays.");
addBullet("Scheduling Friction: Devotees frequently face last-minute cancellations, scheduling conflicts, or unavailability of priests during major festival seasons (Muhurats).");

addSectionHeading("3.3 Pandit Pain Points");
addBullet("Digital Exclusion: Many qualified priests are digitally offline, making them invisible to a wider metropolitan audience beyond their immediate community circles.");
addBullet("Manual Calendar Management: Relying on handwritten diaries leads to scheduling overlaps, double-bookings, and lost economic opportunities.");
addBullet("Unequal Market Access: Priests who lack prominent temple affiliations or established family networks face significant barriers in discovering client requests, resulting in uneven work opportunities.");

addSectionHeading("3.4 Product Scope & Technical Goals");
addParagraph("PujaConnect implements a robust marketplace where authenticated devotees discover, search, and book admin-verified Pandits. The platform scope and features address the core industry constraints:");
addBullet("In Scope (Phase 1): Responsive web client (desktop/mobile), verified Pandit profiles, structured ritual catalog, slot-based booking engine, direct chat coordinator, and admin moderation dashboards.");
addBullet("Out of Scope (Phase 2): Dedicated native mobile applications, automated Muhurat calculations, live-streamed online pujas, and global multi-language translation support.");

addSectionHeading("3.5 Core Data Entities");
addParagraph("To resolve the problem technically, the system implements a relational-first document design centered on five core entities:");
addBullet("Users: Credentials, contact details, and role categories (user, pandit, admin).");
addBullet("Pandits: Experience records, location parameters, pricing maps, and verification states.");
addBullet("Rituals: Standardized catalog details, occasion descriptions, durations, and checklists.");
addBullet("Bookings: Chronological parameters, location types, status tracking, and message lists.");
addBullet("Availability: Daily calendar sheets mapping active timeslots and booking associations.");

addSectionHeading("3.6 Non-Functional Requirements (NFRs)");
addBullet("Performance: Fast page load times (<3 seconds) across search grids and dashboards.");
addBullet("Security: Stateless JWT session verification, passwords encrypted with bcrypt (12 rounds), and route-level Role-Based Access Control (RBAC).");
addBullet("Usability: Clean, culturally respectful, and clear-to-navigate interface optimized for multiple age groups.");
addBullet("Scalability: Scalable schema structure designed to support multi-city and multi-region listings.");
addBullet("Reliability: Database transaction logic to prevent duplicate bookings or slot overlapping.");

addSectionHeading("3.7 Key Performance Indicators (KPIs)");
addBullet("Devotees Onboarded: Total registered user accounts.");
addBullet("Active Priests: Number of verified and listed Pandit profiles.");
addBullet("Fulfillment Rate: Ratio of completed bookings to requested bookings.");
addBullet("Scheduling Efficiency: Reduction in manual coordination time through slot locking.");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 4. EXISTING SYSTEM
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("existing-system", "4. Existing System");

addParagraph("The traditional religious booking workflow relies on unverified contacts, local temple visits, or word-of-mouth networks. It has no central reference registry, pricing transparency, or booking guarantees.");

addSectionHeading("Key Failures of the Existing System");
addBullet("Lack of Digital Presence: Pandits lack online profiles or calendars, making them invisible to potential clients beyond their immediate local community.");
addBullet("Double-Booking Risk: Priests maintain handwritten diaries, leading to frequent scheduling collisions, double-bookings, and last-minute cancellations.");
addBullet("Opaque Pricing: No standardized rate cards exist. Fees vary wildly and are negotiated ad-hoc, creating trust issues and confusion.");
addBullet("No Verification: Credentials, certifications, and experience claims are impossible to verify through informal channels.");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 5. PROPOSED SOLUTION
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("proposed-solution", "5. Proposed Solution");

addParagraph("PujaConnect implements a robust marketplace where authenticated devotees discover, search, and book admin-verified Pandits. Pricing maps are explicitly set per ritual. Availability schedules are managed via active date lists containing distinct slot objects. Coordination is handled through booking-linked message lines, ensuring transparent communication.");

addSectionHeading("Core Solution Capabilities");
addBullet("Verified Listings: Every Pandit undergoes manual admin verification before appearing in public search results, creating a trustworthy network.");
addBullet("Slot-Based Calendar: Pandits define availability as time slots; conflict-checking middleware prevents double-bookings automatically.");
addBullet("Fixed Pricing Maps: Each Pandit sets explicit per-ritual pricing stored as a Mongoose Map, eliminating ad-hoc negotiations.");
addBullet("Booking Chat: Embedded messaging arrays inside each booking document enable direct, contextual coordination.");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 6. OBJECTIVES
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("objectives", "6. Objectives");

addParagraph("The primary objective of PujaConnect is to bring organization, transparency, and digital efficiency to the traditional religious booking ecosystem in India. By utilizing modern web technologies, the platform aims to empower both devotees and priests through verified interactions, seamless scheduling, and structured pricing models.");
addParagraph("Historically, religious bookings in Karnataka and wider India have operated through informal, word-of-mouth networks. This lack of structure leads to scheduling conflicts, pricing discrepancies, and difficulty for devotees in verifying a priest's credentials. PujaConnect addresses these challenges directly by providing a formal marketplace that preserves Vedic traditions while introducing modern reliability.");

addSectionHeading("Digitization & Transparency Goals");
addBullet("Verified Professional Network: Establishing a trustworthy directory of religious service providers by manually verifying their certifications (Veda Pathshala, academic degrees in Sanskrit), years of experience, and location credentials.");
addBullet("Pricing Transparency: Eliminating arbitrary pricing fluctuations and ad-hoc negotiations. The platform records explicit per-ritual pricing for each Pandit and details estimated material costs upfront to build devotee trust.");
addBullet("Multi-criteria Discovery: Enabling devotees to locate the ideal priest by filtering search results dynamically by city, state, experience levels, spoken languages (Kannada, Sanskrit, Tamil, Telugu, Hindi, etc.), and ritual specialties.");

addSectionHeading("Priest & Devotee Empowerment");
addBullet("Autonomous Calendar Control: Priests manage their schedules through an online calendar dashboard where they can add specific availability dates, modify slot times, and view booking statuses in real-time.");
addBullet("Catalog Standardizations: Archiving 100+ Hindu rituals (Shiva Pujas, Homas, Sanskars) complete with historical significance descriptions, typical durations, and material lists to guide the devotee during ceremony preparations.");
addBullet("Remote Accessibility: Empowering out-of-town or distant devotees to book authentic ceremonies and connect with local regional traditions in their native state.");

addSectionHeading("Operational & Technical Excellence");
addBullet("Collision Prevention: Enforcing strict transaction guards at the database schema level to lock active time slots during checkout and release them immediately on cancellations, ensuring zero booking overlaps.");
addBullet("Contextual Messaging: Providing direct, secure, and private chat lines linked inside each booking record. Devotees and Pandits communicate directly about addresses, temple rules, and material lists.");
addBullet("Comprehensive Supervision: Granting administrators a dedicated control dashboard featuring moderation controls (profile suspensions, catalog editing, and application audits) to monitor platform health.");

addSectionHeading("Social & Economic Impact");
addBullet("Equal Visibility for Priests: Promoting fair search visibility for younger or rural priests who lack traditional family networking channels, offering them a direct stream of devotee requests.");
addBullet("Safeguarding Vedic Knowledge: Archiving authentic ritual details and scriptural descriptions, making Vedic wisdom accessible to the younger generation of devotees in an easy-to-use digital format.");
addBullet("Structured Payments & Escrow Foundation: Laying the groundwork for escrow payment flows and material store purchases to ensure that priests get compensated reliably for every ceremony they perform.");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 7. SCOPE
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("scope", "7. Scope");

addSectionHeading("In Scope (Phase 1)");
addBullet("Multi-role authentication with JWT-based sessions");
addBullet("Manual admin verification of Pandit credentials");
addBullet("100+ rituals CRUD catalog with pricing bounds");
addBullet("Slot-based availability calendars with conflict checks");
addBullet("Embedded booking-linked messaging threads");
addBullet("Cloudinary image streaming for profile photos");

addSectionHeading("Out of Scope (Phase 2)");
addBullet("Escrow payment gateways (Razorpay/Stripe)");
addBullet("Live ritual video streaming");
addBullet("Push notifications (Firebase Cloud Messaging)");
addBullet("Automated Muhurat calculation algorithms");
addBullet("Multi-language i18n translation support");
addBullet("Native mobile applications (iOS/Android)");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 8. COMPLETE SYSTEM ARCHITECTURE
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("architecture", "8. Complete System Architecture");

addParagraph("PujaConnect implements a robust Three-Tier Software Architecture aligned with the Model-View-Controller (MVC) design pattern. This architecture ensures high modularity, scalability, and security:");

addSectionHeading("Presentation Tier (Client App)");
addParagraph("React + Vite: Renders interactive user interfaces, manages page routing, and holds client state.");
addBullet("App.jsx - Declares routes and dashboard layouts.");
addBullet("AuthContext - Manages state and caching for JWT tokens.");
addBullet("ThemeContext - Tracks and triggers light/dark theme shifts.");
addBullet("axios.js - Handles standard HTTP requests with bearer headers.");

addSectionHeading("Application Tier (REST Server)");
addParagraph("Node.js + Express: Processes backend logical operations, endpoints, uploads, and verifies RBAC permissions.");
addBullet("authController.js - Coordinates devotee and priest signups.");
addBullet("bookingController.js - Handles checkout calendars, slots updates, and messages.");
addBullet("authMiddleware.js - Decodes JWT bearer tokens and checks role access.");
addBullet("uploadMiddleware.js - RAM buffers upload parsing for images.");

addSectionHeading("Data & Cloud Storage Tier");
addParagraph("MongoDB + Cloudinary: Persists all database documents and stores profile images in cloud CDNs.");
addBullet("Users Collection - Accounts records for devotees, priests, and admins.");
addBullet("Pandits Collection - Profiles, pricing maps, and verification states.");
addBullet("Bookings Collection - Scheduled transaction dates and embedded chat arrays.");
addBullet("Cloudinary Storage - Cloud host for profile photograph uploads.");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 9. TECHNOLOGY STACK & ARCHITECTURAL DECISIONS
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("tech-stack", "9. Technology Stack & Architectural Decisions");

addParagraph("The technical design of PujaConnect is optimized for security, performance, real-time sync, and rapid front-to-back response times. We selected a MERN stack foundation backed by cloud native storage engines and a modern design system. By using Javascript throughout the entire development stack (React on client, Node/Express on backend), the system maintains a unified JSON data format, accelerating developer velocity and eliminating database mapping costs.");

addSectionHeading("Client Side Architecture (Frontend)");
addSubsectionHeading("React.js (v18.2) - Component Framework");
addParagraph("Leverages declarative functional components, virtual DOM reconciliation, and standard hooks (useEffect, useState, useRef, useContext) for application state management. This ensures instantaneous UI updates and modular, reusable logic blocks across complex search grids, live chat messaging panels, and multi-step booking schedules.");

addSubsectionHeading("Vite.js Build Tool - Development & Bundling");
addParagraph("Serves as the high-speed frontend bundler and development environment. Vite utilizes native ES modules (ESM) to deliver lightning-fast Hot Module Replacement (HMR) during coding and performs Rollup-based tree-shaking optimizations during production compile, resulting in highly compact static assets.");

addSubsectionHeading("Tailwind CSS (v3.4) & Design Tokens - Styling");
addParagraph("Provides utility-first styling. We constructed a Karnataka-inspired color schema (saffron, gold, crimson) mapped as design tokens in the Tailwind configuration. This allows responsive fluid layouts, dark/light theme shifts, and custom glassmorphism panels to render consistently.");

addSubsectionHeading("Framer Motion - Micro-Animations");
addParagraph("Powers page-level layout transitions, sidebars overlays, and subtle button click micro-animations. It keeps the user interface responsive and animated without overloading the rendering loops or slowing down the DOM repaint cycle.");

addSubsectionHeading("Axios HTTP Client - Server Fetching");
addParagraph("Manages XMLHttpRequests. Includes pre-configured instance handlers with interceptor logic to append JWT authorization bearer keys automatically to outgoing headers and parse server exception packets to extract friendly error indicators.");

addSectionHeading("Server Side Architecture (Backend)");
addSubsectionHeading("Node.js & Express.js - Application Engine");
addParagraph("Powers the REST API service. Express coordinates the modular MVC pipeline, handling route specifications, JWT-based security guard checks, image stream parsing, and error-handling interceptors within a stateless HTTP server.");

addSubsectionHeading("MongoDB Atlas & Mongoose ODM - Database");
addParagraph("MongoDB stores documents representing users, pandits, availability tables, and booking records. Mongoose maps these documents to application-level objects, checking schema specifications, applying database hooks (pre-save hashing), and executing compound indexes.");

addSubsectionHeading("Cloudinary CDN - Media Storage & Optimization");
addParagraph("Serves as the cloud-optimized media storage provider. Profile photographs are uploaded through Multer RAM buffers directly to Cloudinary, ensuring quick loading, automatic caching, and asset optimization.");

addSubsectionHeading("Bcrypt.js & JSON Web Tokens (JWT) - Security");
addParagraph("Manages access verification. Passwords are salted and hashed with bcrypt (12 rounds) on creation or updates. Upon login, client devices receive signed, stateless JWT tokens containing user credentials, valid for 24 hours.");

addSubsectionHeading("Multer Buffer Parser - File Upload Handling");
addParagraph("Acts as file-upload parser middleware, extracting incoming multipart/form-data. It keeps file byte streams in temporary memory, preventing local disk caching issues.");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 10. FOLDER STRUCTURE
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("folder-structure", "10. Folder Structure");

addParagraph("Below is the complete, exhaustive directory tree representing all backend controllers, schemas, route maps, and middleware files present in the PujaConnect repository workspace:");

addCodeBlock(`PujaConnect/
|-- backend/
|   |-- server.js (Express server entry point)
|   |-- package.json (Backend configurations & packages)
|   |-- config/
|   |   |-- db.js (MongoDB Mongoose connection pool)
|   |   |-- cloudinary.js (Cloudinary CDN setup)
|   |-- controllers/
|   |   |-- authController.js (Login, signup, JWT verification)
|   |   |-- userController.js (Devotee profiles & data views)
|   |   |-- panditController.js (Priest profiles & pricing setup)
|   |   |-- bookingController.js (Booking lifecycles & messaging)
|   |   |-- availabilityController.js (Calendar configurations)
|   |   |-- adminController.js (Dashboard analytics & suspensions)
|   |-- models/
|   |   |-- User.js (User role base records schema)
|   |   |-- Pandit.js (Pandit profile schema & pricing maps)
|   |   |-- Ritual.js (100+ standardized ritual definitions)
|   |   |-- Booking.js (Booking records & embedded chat logs)
|   |   |-- Availability.js (Priest slot schemas & overlap rules)
|   |-- routes/
|   |   |-- authRoutes.js (Authentication endpoints)
|   |   |-- userRoutes.js (User profile endpoints)
|   |   |-- panditRoutes.js (Pandit directory & update routes)
|   |   |-- bookingRoutes.js (Booking postings & chat endpoints)
|   |   |-- availabilityRoutes.js (Availability updates & calendars)
|   |   |-- adminRoutes.js (Administrative access & audits)
|   |-- middleware/
|   |   |-- authMiddleware.js (JWT validation & session parsing)
|   |   |-- roleMiddleware.js (RBAC permission verifiers)
|   |   |-- uploadMiddleware.js (Multer in-memory stream parser)
|   |   |-- errorMiddleware.js (Global Express error catcher)
|   |-- utils/
|   |   |-- generateToken.js (Stateless JWT token signing)
|   |   |-- validators.js (Phone, email, and date validators)
|   |-- seed/
|   |   |-- seed.js (Catalog seeder orchestrator)`);

doc.addPage(); // Force frontend folder structure to start on the next page

addSectionHeading("Frontend Project Directory Tree");
addParagraph("Below is the directory tree mapping out the frontend single-page application (SPA) client files, React contexts, layout components, and view pages:");

addCodeBlock(`PujaConnect/
|-- frontend/
|   |-- index.html (SPA index container & React entry mount)
|   |-- package.json (Frontend libraries configurations)
|   |-- tailwind.config.js (Karnataka-inspired styling tokens)
|   |-- vite.config.js (High-speed development & build setup)
|   |-- vercel.json (SPAs browser routing configuration redirects)
|   |-- src/
|   |   |-- main.jsx (React renderer & context bindings)
|   |   |-- App.jsx (Route definitions & dashboard checks)
|   |   |-- index.css (Global design system variables & styles)
|   |   |-- api/
|   |   |   |-- axios.js (Axios HTTP instance with bearer interceptors)
|   |   |   |-- index.js (Client-side request wrapper functions)
|   |   |-- context/
|   |   |   |-- AuthContext.jsx (Global login session manager)
|   |   |   |-- ThemeContext.jsx (Platform dark/light mode state)
|   |   |-- components/
|   |   |   |-- common/
|   |   |   |   |-- Navbar.jsx (Dynamic navigation menu)
|   |   |   |   |-- Footer.jsx (Site footer)
|   |   |   |   |-- ThemeToggle.jsx (Theme mode slider)
|   |   |   |   |-- StatusBadge.jsx (Color-coded status markers)
|   |   |   |   |-- ProtectedRoute.jsx (Authentication session gate)
|   |   |   |-- booking/
|   |   |   |   |-- BookingChat.jsx (Direct WhatsApp-like message component)
|   |   |   |   |-- pandit/
|   |   |   |   |-- PanditCard.jsx (Priest profile search card details)
|   |   |-- pages/
|   |   |   |-- Home.jsx (Platform search landing page)
|   |   |   |-- Login.jsx (Role-based signup/login form)
|   |   |   |-- Register.jsx (Onboarding parameters checklist)
|   |   |   |-- Rituals.jsx (SACRED catalog dashboard)
|   |   |   |-- PanditList.jsx (Priests listings directories)
|   |   |   |-- BookingPage.jsx (Date checkout scheduling wizard)
|   |   |   |-- dashboard/
|   |   |   |   |-- UserDashboard.jsx (Devotee timelines lists)
|   |   |   |   |-- PanditDashboard.jsx (Priest availability managers)
|   |   |   |   |-- AdminDashboard.jsx (Analytics moderation consoles)`);

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 11. DATABASE DESIGN & COLLECTIONS
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("database-design", "11. Database Design & Collections");

addParagraph("The database layer of PujaConnect is built on MongoDB Atlas using the Mongoose Object-Document Mapper (ODM). The schema structure is designed around 5 primary collections with denormalized subdocuments to balance query speeds and write performance.");
addParagraph("To support search indexing and ensure fast page loads, we have configured compound index strategies for matching locations, active availability ranges, and verification flags. Relational integrity is enforced programmatically using Mongoose pre-save middleware hooks and route triggers.");

addSectionHeading("1. Users Collection (User.js)");
addParagraph("Manages base registration records for Devotees (role: 'user'), Priests (role: 'pandit'), and Administrators (role: 'admin'). Includes conditional validation fields to check phone and city details on devotee/priest entries, password salting triggers, and a suspension action audit tracker.");
addCodeBlock("const userSchema = new mongoose.Schema(\n  {\n    name: {\n      type: String,\n      required: [true, 'Name is required'],\n      trim: true,\n      maxlength: [100, 'Name cannot exceed 100 characters'],\n    },\n    email: {\n      type: String,\n      required: [true, 'Email is required'],\n      unique: true,\n      lowercase: true,\n      trim: true,\n      match: [/\\S+@\\S+\\.\\S+/, 'Please enter a valid email'],\n    },\n    password: {\n      type: String,\n      required: [true, 'Password is required'],\n      minlength: [6, 'Password must be at least 6 characters'],\n      select: false,\n    },\n    role: {\n      type: String,\n      enum: ['user', 'pandit', 'admin'],\n      default: 'user',\n    },\n    phone: {\n      type: String,\n      trim: true,\n      required: [function () { return this.role === 'pandit' || this.role === 'user'; }, 'Phone number is required'],\n    },\n    city: {\n      type: String,\n      trim: true,\n      required: [function () { return this.role === 'pandit' || this.role === 'user'; }, 'City is required'],\n    },\n    region: {\n      type: String,\n      trim: true,\n      required: [function () { return this.role === 'pandit'; }, 'State / Region is required'],\n    },\n    isSuspended: {\n      type: Boolean,\n      default: false,\n    },\n    lastLogin: {\n      type: Date,\n    },\n    adminActionHistory: [\n      {\n        actionType: { type: String, enum: ['suspended', 'reactivated', 'deleted'] },\n        adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },\n        actionDate: { type: Date, default: Date.now },\n        reason: { type: String }\n      }\n    ],\n  },\n  { timestamps: true }\n);\nuserSchema.index({ name: 1 });\nuserSchema.pre('save', async function (next) {\n  if (!this.isModified('password')) return next();\n  this.password = await bcrypt.hash(this.password, 12);\n  next();\n});");

doc.addPage(); // Force Pandit collection to start on a new page

addSectionHeading("2. Pandits Collection (Pandit.js)");
addParagraph("Establishes the profile details for verified priests, referencing a User record. Includes experience boundaries, location details, supported rituals lists, spoken language tags, a Mongoose Map mapping ritual IDs to custom pricing in INR, and verification logs.");
addCodeBlock("const panditSchema = new mongoose.Schema(\n  {\n    userId: {\n      type: mongoose.Schema.Types.ObjectId,\n      ref: 'User',\n      required: true,\n      unique: true,\n    },\n    photo: {\n      type: String,\n      default: '',\n    },\n    bio: {\n      type: String,\n      maxlength: [1000, 'Bio cannot exceed 1000 characters'],\n    },\n    location: {\n      city:   { type: String, trim: true },\n      region: { type: String, trim: true },\n      state:  { type: String, trim: true },\n    },\n    yearsOfExperience: {\n      type: Number,\n      min: [0,  'Experience cannot be negative'],\n      max: [60, 'Experience cannot exceed 60 years'],\n      default: 0,\n    },\n    supportedRituals: [\n      {\n        type: mongoose.Schema.Types.ObjectId,\n        ref: 'Ritual',\n      },\n    ],\n    languagesSpoken: [\n      {\n        type: String,\n        trim: true,\n      },\n    ],\n    pricing: {\n      type: Map,\n      of: Number,\n      default: {},\n    },\n    verificationStatus: {\n      type: String,\n      enum: ['pending', 'verified', 'rejected', 'suspended'],\n      default: 'pending',\n    },\n    adminActionHistory: [\n      {\n        actionType: { type: String, enum: ['approved', 'rejected', 'suspended', 'unsuspended', 'restored', 'deleted'], required: true },\n        adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },\n        actionDate: { type: Date, default: Date.now },\n        reason: { type: String },\n      },\n    ],\n    isActive: {\n      type: Boolean,\n      default: true,\n    },\n  },\n  { timestamps: true }\n);\npanditSchema.index({ 'location.city': 1, verificationStatus: 1 });");

doc.addPage(); // Force Ritual collection to start on a new page

addSectionHeading("3. Rituals Collection (Ritual.js)");
addParagraph("Defines the database catalog of 100+ standard Hindu ceremonies. Features categories, unique SEO slugs, duration calculations in minutes, checklist details for puja materials, price ranges, and featured/popular sorting tags.");
addCodeBlock("const ritualSchema = new mongoose.Schema(\n  {\n    pujaName: {\n      type: String,\n      required: [true, 'Puja name is required'],\n      trim: true,\n      unique: true,\n    },\n    slug: {\n      type: String,\n      required: [true, 'Slug is required'],\n      unique: true,\n      lowercase: true,\n      trim: true,\n    },\n    category: {\n      type: String,\n      required: [true, 'Category is required'],\n      enum: [\n        'Griha & Property Pujas', 'Marriage & Family Rituals',\n        'Child & Sanskar Ceremonies', 'Business & Career Pujas',\n        'Health & Protection Pujas', 'Festival Pujas',\n        'Shiva Pujas', 'Vishnu Pujas', 'Devi Pujas',\n        'Navagraha Pujas', 'Homa & Havan Rituals', 'Special Vedic Ceremonies'\n      ],\n      trim: true,\n    },\n    description: { type: String, required: true },\n    duration: { type: String, required: true },\n    durationMinutes: { type: Number, required: true, default: 120 },\n    requiredMaterials: [{ type: String, trim: true }],\n    estimatedMaterialCost: { type: Number, default: 0 },\n    priceRange: {\n      min: { type: Number, default: 0 },\n      max: { type: Number, default: 0 },\n    },\n    locationType: { type: String, enum: ['Home', 'Temple', 'Both'], default: 'Both' },\n    isActive: { type: Boolean, default: true },\n    featured: { type: Boolean, default: false },\n    popular: { type: Boolean, default: false },\n    searchKeywords: { type: [String], default: [] },\n  },\n  { timestamps: true }\n);\nritualSchema.index({ category: 1 });");

doc.addPage(); // Force Booking collection to start on a new page

addSectionHeading("4. Bookings Collection (Booking.js)");
addParagraph("Tracks religious service bookings. Records client details, assigned priests, scheduled dates, and address details. Implements pre-save hooks to clean legacy location records, updates availability slots dynamically on cancellations, and manages the embedded messaging array.");
addCodeBlock("const bookingSchema = new mongoose.Schema(\n  {\n    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },\n    pandit: { type: mongoose.Schema.Types.ObjectId, ref: 'Pandit', required: true },\n    ritual: { type: mongoose.Schema.Types.ObjectId, ref: 'Ritual', required: true },\n    date: { type: Date, required: true },\n    time: { type: String, required: true },\n    location: { type: mongoose.Schema.Types.Mixed, default: 'Home' },\n    locationType: { type: String, enum: ['Home', 'Temple'], default: 'Home' },\n    address: {\n      houseNumber: String, street: String, city: String,\n      state: String, pincode: String, landmark: String\n    },\n    templeDetails: {\n      templeName: String, templeAddress: String, city: String,\n      state: String, pincode: String, locality: String\n    },\n    status: {\n      type: String,\n      enum: ['pending', 'accepted', 'rejected', 'cancelled', 'completed', 'expired'],\n      default: 'pending',\n    },\n    statusHistory: [\n      {\n        status: { type: String, required: true },\n        changedAt: { type: Date, default: Date.now },\n        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },\n        note: String\n      }\n    ],\n    messages: [\n      {\n        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },\n        senderRole: { type: String, enum: ['user', 'pandit'], required: true },\n        message: { type: String, required: true, trim: true },\n        isRead: { type: Boolean, default: false },\n        readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],\n        createdAt: { type: Date, default: Date.now },\n      }\n    ],\n    availabilitySlotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Availability' },\n  },\n  { timestamps: true }\n);");

doc.addPage(); // Force Availability collection to start on a new page

addSectionHeading("5. Availability Collection (Availability.js)");
addParagraph("Manages timeslots for verified priests. Each daily calendar is recorded as a single document containing an array of time slot objects. Features regex validation to enforce proper time-slot layout formats (e.g. \"09:00 AM\") and a compound index to restrict duplicate date sheets per Pandit.");
addCodeBlock("const timeSlotSchema = new mongoose.Schema(\n  {\n    time: {\n      type: String,\n      required: true,\n      validate: {\n        validator: function (v) {\n          return /^\\d{1,2}:\\d{2}\\s*(AM|PM)(?:\\s*-\\s*\\d{1,2}:\\d{2}\\s*(AM|PM))?$/i.test(v);\n        },\n        message: props => `${props.value} is not a valid time slot or range!`\n      }\n    },\n    isBooked: { type: Boolean, default: false },\n    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', default: null },\n  }\n);\n\nconst availabilitySchema = new mongoose.Schema(\n  {\n    pandit: { type: mongoose.Schema.Types.ObjectId, ref: 'Pandit', required: true },\n    date: { type: Date, required: true },\n    timeSlots: [timeSlotSchema],\n    status: { type: String, enum: ['available', 'unavailable'], default: 'available' },\n  },\n  { timestamps: true }\n);\navailabilitySchema.index({ pandit: 1, date: 1 }, { unique: true });");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 12. AUTHENTICATION FLOW & SECURITY
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("auth-flow", "12. Authentication Flow & Security");

addParagraph("PujaConnect enforces a strict role-based authentication flow to verify and protect endpoints. The security infrastructure is composed of multi-tier checks working across client-side router buffers and server-side middleware:");

addSectionHeading("Credentials Encryption");
addParagraph("Passwords are never stored in plain text. Mongoose schema pre-save hooks intercept the registration or update flow to hash passwords using bcryptjs with 12 salting rounds. Incoming check matches are executed asynchronously using direct comparisons:");
addCodeBlock("userSchema.pre('save', async function (next) {\n  if (!this.isModified('password')) return next();\n  this.password = await bcrypt.hash(this.password, 12);\n  next();\n});");

addSectionHeading("Stateless JWT Issuance");
addParagraph("Upon successful login matches, the backend signs a JSON Web Token (JWT) containing the User Object ID, username, and role profile. This token is configured with a 24-hour expiration duration. Client-side contexts intercept this token and cache it dynamically within memory buffers.");
addCodeBlock("const jwt = require('jsonwebtoken');\nconst generateToken = (id) => {\n  return jwt.sign({ id }, process.env.JWT_SECRET, {\n    expiresIn: '24h',\n  });\n};");

addSectionHeading("Express Authentication Guards");
addParagraph("The backend endpoint pipeline incorporates authMiddleware.js to intercept request headers, extract the bearer token, verify its signature, and attach the active User profile to the Express request context:");
addCodeBlock("const protect = asyncHandler(async (req, res, next) => {\n  let token = req.headers.authorization?.split(' ')[1];\n  if (!token) throw new Error('Not authorized, no token');\n  const decoded = jwt.verify(token, process.env.JWT_SECRET);\n  req.user = await User.findById(decoded.id).select('-password');\n  next();\n});");

addSectionHeading("Role-Based Access Control (RBAC)");
addParagraph("To prevent role privilege escalations, roleMiddleware.js blocks requests if the attached user role does not match permissions. For instance, only users with the 'pandit' role can modify calendar schedules, and only 'admin' roles can verify priest applications:");
addCodeBlock("const authorize = (...roles) => {\n  return (req, res, next) => {\n    if (!roles.includes(req.user.role)) {\n      return res.status(403).json({ message: 'Forbidden' });\n    }\n    next();\n  };\n};");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 13. USER (DEVOTEE) MODULE
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("user-module", "13. User (Devotee) Module");

addParagraph("The Devotee portal is designed to provide users with a clean interface to discover authentic Hindu ceremonies, match with verified priests, schedule booking dates, and communicate about ceremony parameters:");

addSectionHeading("Pandit Discovery & Filters");
addParagraph("Devotees can browse a directory of verified priests. They can search by name, locate priests in their city or region, set experience levels, filter by languages spoken (e.g., Kannada, Sanskrit), and select specific rituals. Only verified, active profiles are shown.");
addBullet("Full name and bio preview cards");
addBullet("Pricing tags displayed per ritual specialty");
addBullet("Ratings and years of experience badges");

addSectionHeading("Checkout & Scheduling Wizard");
addParagraph("Once a devotee selects a Pandit for a specific ritual, the scheduling wizard opens a calendar showing only the Pandit's available dates. Selecting a date displays its active timeslots (e.g. \"09:00 AM - 11:00 AM\") to prevent overlaps.");
addBullet("Address input with landmark and pin codes");
addBullet("Temple options featuring temple address forms");
addBullet("Special notes field for custom family gotras");

addSectionHeading("Fulfillment & Timeline Tracking");
addParagraph("The Devotee Dashboard organizes requests into status categories: pending, accepted, rejected, completed, and cancelled. Status transitions update on a live timeline, showing administrative notes and rejection explanations.");
addBullet("Visual badges showing booking status");
addBullet("Cancellation trigger buttons for devotees");
addBullet("Material lists and pricing summaries");

addSectionHeading("Embedded Messaging Panel");
addParagraph("Each booking details page features an integrated chat client. Devotees can communicate directly with the assigned priest about materials, custom dates, or venue details, with unread counters and read status check marks.");
addBullet("Message tracking linked to booking context");
addBullet("WhatsApp-style read receipt ticks");
addBullet("Client-side unread message calculations");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 14. PANDIT (PRIEST) MODULE
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("pandit-module", "14. Pandit (Priest) Module");

addParagraph("The Pandit Portal provides priests with tools to manage their profiles, update pricing, schedule their availability calendar, and accept or reject devotee booking requests:");

addSectionHeading("Profile & Photo Manager");
addParagraph("Priests build their public profiles by detailing years of experience, a biographical summary, city/state details, and uploading a profile photo. The photo is uploaded directly to Cloudinary using in-memory file stream buffers.");
addBullet("Bio input fields with character validation checks");
addBullet("Photo upload to Cloudinary (no local cache)");
addBullet("Languages spoken checklist options");

addSectionHeading("Custom Rates Configuration");
addParagraph("Pandits set their own rates for each ritual they support. This configuration is stored in a Mongoose Map, allowing rates to be updated without altering the main database schema.");
addCodeBlock("const updatePricing = async (req, res) => {\n  const pandit = await Pandit.findOne({ userId: req.user.id });\n  pandit.pricing = req.body.pricing; // ritualId -> price\n  await pandit.save();\n  res.json(pandit);\n};");

addSectionHeading("Availability Slot Editor");
addParagraph("Priests define their availability on a daily calendar. For each date, they add specific time slots (e.g. \"06:00 AM - 09:00 AM\"), which are validated for time formatting and checked against existing slots to prevent overlap conflicts.");
addBullet("Date-specific timeslot arrays");
addBullet("Check constraints to block scheduling clashes");
addBullet("Custom slot deletion triggers");

addSectionHeading("Fulfillment Pipeline");
addParagraph("Incoming booking requests appear on the Pandit Dashboard. The priest reviews the date, location type (home or temple), address details, and special instructions. The priest can accept, reject with a note, or complete the booking.");
addBullet("Acceptance locks availability slots");
addBullet("Rejections release slots automatically");
addBullet("Completion marks booking status \"completed\"");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 15. ADMIN MODULE & MODERATION CONSOLE
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("admin-module", "15. Admin Module & Moderation Console");

addParagraph("The Administrative Dashboard provides platform managers with oversight of user accounts, priest credentials, active bookings, and catalog data:");

addSectionHeading("Pandit Credentials Verification");
addParagraph("To maintain trust on the platform, new Pandit signups do not appear in public searches until approved by an admin. Admins review each priest's application, verifying their credentials, experience claims, and certifications.");
addBullet("Applications list filtered by \"pending\" status");
addBullet("Verification notes log explanations for actions");
addBullet("Validation updates Pandit profiles to \"verified\"");

addSectionHeading("Ritual Catalog Management");
addParagraph("Admins manage the database of Hindu rituals. They can create, edit, or deactivate rituals, updating names, categories, descriptions, typical durations, required materials, estimated costs, and search keywords.");
addBullet("CRUD operations on rituals");
addBullet("Automatic slug generators");
addBullet("Status toggle switches for rituals");

addSectionHeading("Moderation & User Suspension");
addParagraph("Admins can suspend users or Pandits who violate platform guidelines. Suspended accounts are blocked from accessing dashboards, and their profiles are hidden from public search results.");
addCodeBlock("// Suspend a user profile\nconst toggleSuspend = async (req, res) => {\n  const user = await User.findById(req.params.id);\n  user.isSuspended = !user.isSuspended;\n  user.adminActionHistory.push({\n    actionType: user.isSuspended ? 'suspended' : 'reactivated',\n    adminId: req.user.id,\n    reason: req.body.reason\n  });\n  await user.save();\n  res.json(user);\n};");

addSectionHeading("Analytics & Platform Statistics");
addParagraph("The admin panel aggregates key metrics from the database, displaying total user counts, verified/pending Pandit numbers, booking volumes, and transaction statuses to help monitor platform activity.");
addBullet("Active user counts");
addBullet("Pending verification applications count");
addBullet("Booking statuses distributions");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 16. RITUAL CATALOG MANAGEMENT
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("ritual-management", "16. Ritual Catalog Management");

addParagraph("PujaConnect standardizes religious services using a structured catalog. Each ritual contains specific parameters, including descriptions, typical durations, material lists, price limits, and categorization:");

addSectionHeading("Ritual Schema Fields");
addParagraph("The schema models both administrative options and public content details, helping devotees understand the significance of each ceremony:");
addBullet("SEO Slug: URL-safe lowercase strings (e.g. \"griha-pravesh\") for search engine indexing.");
addBullet("Category Enum: Rituals are assigned to one of 12 categories, such as Griha Pujas, Marriage Ceremonies, or Festival Pujas.");
addBullet("Material Checklist: Array of strings listing required materials (e.g., coconut, incense), helping devotees prepare for the ceremony.");

addSectionHeading("Operational & Pricing Parameters");
addParagraph("Operational details help coordinate scheduling and pricing:");
addBullet("Duration Details: Numeric durationMinutes limits scheduling overlaps.");
addBullet("Price Limits: Min/max bounds prevent pricing discrepancies.");
addBullet("Image Assignments: Cloudinary assets illustrate the rituals visually.");
addBullet("Featured & Popular: Boolean tags promote specific rituals on the homepage catalog.");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 17. BOOKING WORKFLOW & STATE MACHINE
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("booking-workflow", "17. Booking Workflow & State Machine");

addParagraph("The booking lifecycle in PujaConnect is managed by a state machine enforced via database transaction guards. The system coordinates timeslot allocations and releases slots automatically on status changes to prevent scheduling conflicts.");

addSectionHeading("Booking Lifecycle States");
addBullet("PENDING: Devotee completes checkout, reserving availability timeslot temporarily.");
addBullet("ACCEPTED: Pandit approves request. Slot locked permanently.");
addBullet("REJECTED: Pandit declines request (requires explanation). Slot released instantly.");
addBullet("CANCELLED: Devotee cancels. Slot released instantly.");
addBullet("COMPLETED: Pandit confirms ritual completed on site.");

addSectionHeading("Automatic Slot Release Mechanics");
addParagraph("When a booking is cancelled, rejected, or expires, a pre-save trigger in Mongoose automatically frees the associated availability slot, making it available for other devotees.");
addCodeBlock("bookingSchema.pre('save', async function (next) {\n  if (this.isModified('status') && ['cancelled', 'rejected', 'expired'].includes(this.status)) {\n    if (this.availabilitySlotId) {\n      const Availability = mongoose.model('Availability');\n      const availability = await Availability.findById(this.availabilitySlotId);\n      if (availability) {\n        const slot = availability.timeSlots.find(\n          (s) => s.bookingId?.toString() === this._id.toString() || (s.time === this.time && s.isBooked)\n        );\n        if (slot) {\n          slot.isBooked = false; // release slot\n          await availability.save();\n        }\n      }\n    }\n  }\n  next();\n});");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 18. AVAILABILITY MANAGEMENT & SCHEDULING
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("availability-management", "18. Availability Management & Scheduling");

addParagraph("Pandits define their work availability by creating daily slots. When a devotee schedules a ceremony, the system marks the selected slot as booked, referencing the associated Booking ID.");

addSectionHeading("Conflict Prevention Logic");
addParagraph("The scheduling engine prevents duplicate bookings at the database and application levels:");
addBullet("Database Layer: A compound unique index { pandit: 1, date: 1 } prevents multiple schedule documents for the same priest on the same day.");
addBullet("Validation RegEx: Ensures slots are entered in a standardized time format (e.g. \"09:00 AM - 12:00 PM\").");

addSectionHeading("Timezone & Date Processing");
addParagraph("To prevent timezone offsets from shifting availability dates (e.g. making a Saturday slot appear on Friday), the system normalizes all dates to UTC midnight before saving them to the database.");
addCodeBlock("// Normalize date to UTC midnight\nconst date = new Date(req.body.date);\nconst utcMidnight = new Date(Date.UTC(\n  date.getFullYear(),\n  date.getMonth(),\n  date.getDate()\n));");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 19. MESSAGING & COORDINATION SYSTEM
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("messaging-system", "19. Messaging & Coordination System");

addParagraph("PujaConnect includes a messaging system embedded directly within the booking documents. Storing messages as subdocument arrays inside each Booking record keeps conversations contextually linked to their bookings and simplifies data retrieval.");

addSectionHeading("Key Messaging Architectures");
addBullet("Subdocument Storage: Conversations are stored directly in the booking document. This simplifies queries and ensures the booking page loads message history in one fetch.");
addBullet("Read Status Tracker: Tracks read statuses using an isRead flag and a readBy array. Unread message badges are calculated dynamically on the client side.");
addBullet("Access Control Guards: To maintain privacy, only the devotee who created the booking and the assigned Pandit have access to read or send messages in a given chat thread.");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 20. SEARCH & FILTERING ENGINE
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("search-filtering", "20. Search & Filtering Engine");

addParagraph("The platform implements a multi-criteria search engine, allowing devotees to filter Pandits dynamically by location, languages spoken, experience levels, pricing, and ritual specialties.");

addSectionHeading("Dynamic Mongoose Queries & Database Indexes");
addParagraph("The backend constructs dynamic Mongoose queries based on the active search filters, matching location names case-insensitively and checking arrays for spoken languages or supported rituals.");
addCodeBlock("// Dynamic Pandit search query\nconst query = { verificationStatus: 'verified', isActive: true };\nif (city) {\n  query['location.city'] = new RegExp('^' + city.trim() + '$', 'i');\n}\nif (languagesSpoken) {\n  query.languagesSpoken = { $in: [languagesSpoken] };\n}\nif (yearsOfExperience) {\n  query.yearsOfExperience = { $gte: Number(yearsOfExperience) };\n}\nif (ritualId) {\n  query.supportedRituals = ritualId;\n}\nconst pandits = await Pandit.find(query).populate('userId', 'name email phone');");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 21. ADMIN VERIFICATION WORKFLOW
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("admin-verification", "21. Admin Verification Workflow");

addParagraph("Trust is central to PujaConnect. Every Pandit must pass an admin-managed verification pipeline before their profile becomes publicly visible. The workflow progresses through distinct status stages:");

addSectionHeading("Verification Lifecycle Stages");
addBullet("Registration: Pandit signs up and creates profile (Status: PENDING)");
addBullet("Admin Review: Admin inspects Veda Pathshala credentials, bio, and photo (Status: UNDER REVIEW)");
addBullet("Approved: Profile marked verified and becomes visible in search directories (Status: VERIFIED)");
addBullet("Denied: Application rejected with reason note (Status: REJECTED)");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 22. DEPLOYMENT ARCHITECTURE
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("deployment-architecture", "22. Deployment Architecture");

addParagraph("Production URL: https://puja-connect-ahy.vercel.app/");

addSectionHeading("Cloud Platform Architectures");
addBullet("Frontend Host: Deployed on Vercel with automatic CI/CD from GitHub. A vercel.json rewrite rule maps routes to index.html for React Router.");
addBullet("Backend Host: Deployed on Render as a Node.js service. Handles REST API calls and connects with Atlas cluster.");
addBullet("Database Layer: MongoDB Atlas M0 cluster hosted on AWS. Secured via IP whitelisting and auto-managed backups.");
addBullet("Media CDN: Cloudinary handles secure upload streams for priest profile photographs, preventing local storage overheads.");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 23. API OVERVIEW
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("api-overview", "23. API Overview");

addParagraph("Below is the comprehensive API endpoint specification for the Express.js backend. All protected routes require a valid JWT Bearer token in the Authorization header.");

const apiHeaders = ['Method', 'Endpoint', 'Auth Scope', 'Functional Operation'];
const apiColWidths = [60, 160, 80, 175];
const apiRows = [
  ['POST', '/api/auth/register', 'Public', 'Create devotee or pandit account. Hashes password.'],
  ['POST', '/api/auth/login', 'Public', 'Validate credentials & return signed JWT token.'],
  ['GET', '/api/auth/me', 'Authenticated', 'Fetch current user profile from JWT claims.'],
  ['GET', '/api/pandits', 'Public', 'Query verified Pandits with multi-criteria filters.'],
  ['GET', '/api/pandits/:id', 'Public', 'Fetch single Pandit profile with populated rituals.'],
  ['POST', '/api/pandits/profile', 'Pandit Only', 'Create Pandit profile (bio, experience, photo upload).'],
  ['PUT', '/api/pandits/profile', 'Pandit Only', 'Update Pandit profile fields and pricing maps.'],
  ['GET', '/api/rituals', 'Public', 'List all rituals with category filtering and search.'],
  ['GET', '/api/rituals/:id', 'Public', 'Fetch ritual details: description, duration, materials.'],
  ['POST', '/api/rituals', 'Admin Only', 'Create new ritual entry in the platform catalog.'],
  ['PUT', '/api/rituals/:id', 'Admin Only', 'Update existing ritual details and pricing bounds.'],
  ['DELETE', '/api/rituals/:id', 'Admin Only', 'Remove ritual from the catalog permanently.'],
  ['POST', '/api/bookings', 'Devotee Only', 'Create booking request with date, time, and address.'],
  ['GET', '/api/bookings', 'Authenticated', 'List all bookings for the authenticated user/Pandit.'],
  ['GET', '/api/bookings/:id', 'Participant', 'Get single booking details with references.'],
  ['PUT', '/api/bookings/:id/accept', 'Pandit Only', 'Accept booking request, lock availability slot.'],
  ['PUT', '/api/bookings/:id/reject', 'Pandit Only', 'Reject booking request with reason, release slot.'],
  ['PUT', '/api/bookings/:id/complete', 'Pandit Only', 'Mark booking ceremony as completed on-site.'],
  ['PUT', '/api/bookings/:id/cancel', 'Devotee Only', 'Cancel pending/accepted booking, release slot.'],
  ['GET', '/api/bookings/:id/messages', 'Participant', 'Retrieve message thread for a booking.'],
  ['POST', '/api/bookings/:id/messages', 'Participant', 'Send new message, append to booking subdocument.'],
  ['PUT', '/api/bookings/:id/messages/read', 'Participant', 'Mark all unread messages as read for the user.'],
  ['POST', '/api/availability', 'Pandit Only', 'Create availability slot with date and times.'],
  ['GET', '/api/availability/:panditId', 'Public', 'Get all available slots for a specific Pandit.'],
  ['DELETE', '/api/availability/:id', 'Pandit Only', 'Delete an unbooked availability slot.'],
  ['GET', '/api/admin/stats', 'Admin Only', 'Aggregate dashboard statistics (counts, statuses).'],
  ['GET', '/api/admin/pandits', 'Admin Only', 'List all Pandits including pending verifications.'],
  ['PUT', '/api/admin/pandits/:id/verify', 'Admin Only', 'Approve Pandit profile, set status to verified.'],
  ['PUT', '/api/admin/pandits/:id/reject', 'Admin Only', 'Reject Pandit application with reason.'],
  ['GET', '/api/admin/users', 'Admin Only', 'List all registered devotee accounts.'],
  ['GET', '/api/admin/bookings', 'Admin Only', 'View all platform bookings with status filters.']
];

drawTable(apiHeaders, apiRows, apiColWidths);

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 24. SECURITY FEATURES
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("security-features", "24. Security Features");

addSectionHeading("Stateless JWT Authentication");
addParagraph("Session tokens are signed with HS256 using a server-side secret. Tokens contain userId, username, and role. No server-side session storage required.");

addSectionHeading("bcrypt Password Hashing");
addParagraph("All passwords are one-way hashed using bcryptjs with 12 salt rounds on Mongoose pre-save hooks. Raw passwords never touch the database.");

addSectionHeading("Role-Based Access Control");
addParagraph("Layered middleware chain: protect verifies JWT validity, then requireRole('admin') or requireRole('pandit') gates access per-route.");

addSectionHeading("In-Memory File Streaming");
addParagraph("Multer MemoryStorage prevents temporary disk writes. Image buffers stream directly to Cloudinary, eliminating local file exposure vectors.");

addSectionHeading("CORS Policy");
addParagraph("Configured cors middleware with explicit whitelisting for the Vercel frontend domain, preventing unauthorized cross-origin requests.");

addSectionHeading("Environment Variables");
addParagraph("All secrets (MongoDB URI, JWT_SECRET, Cloudinary keys) stored in environment variables. Never committed to version control via .gitignore.");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 25. FUTURE ENHANCEMENTS
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("future-enhancements", "25. Future Enhancements");

addParagraph("To expand PujaConnect into a comprehensive, nationwide spiritual platform, the following strategic features are planned for future development phases:");

addBullet("Stripe/Razorpay escrow routing with automated settlement upon ceremony completion confirmation.", "Payment Integration:");
addBullet("React-i18n integration for Hindi, Kannada, Tamil, Telugu, and other regional language translations.", "Multi-Language Support:");
addBullet("WebRTC-based live video streaming for remote family members to participate in ceremonies virtually.", "Live Streaming:");
addBullet("Post-ceremony rating system with verified reviews to build trust and reputation for Pandits.", "Rating & Reviews:");
addBullet("Firebase Cloud Messaging for real-time booking status updates, new message alerts, and reminders.", "Push Notifications:");
addBullet("React Native mobile applications for iOS and Android with offline-first capabilities.", "Native Mobile Apps:");
addBullet("Automated auspicious timing (Muhurat) calculations based on Hindu Panchang for ceremony scheduling.", "Muhurat Calculator:");
addBullet("Nodemailer integration for booking confirmations, status change alerts, and weekly digest emails.", "Email Notifications:");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 26. CHALLENGES FACED & RESOLUTIONS
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("challenges-faced", "26. Challenges Faced & Resolutions");

addSectionHeading("Challenge 1: Memory Upload Streams");
addParagraph("Writing uploaded photos to local disk caches is slow and risks leaking files. I resolved this by using Multer's in-memory storage buffer, streaming files directly to Cloudinary via resource upload streams.");

addSectionHeading("Challenge 2: Concurrent Overlapping Calendars");
addParagraph("Checking slots overlaps dynamically while preventing double-bookings. I developed a check middleware script that validates proposed dates against standard durations and enforces a strict 1-hour transit buffer gap.");

addSectionHeading("Challenge 3: UTC Time zone Discrepancies");
addParagraph("Timezone calculations for auspicious times shifted incorrectly across regions. I normalized all database inputs to save UTC timestamps and used date-fns formatting to offset local client times dynamically.");

addSectionHeading("Challenge 4: Legacy Location Schema Setters");
addParagraph("Older booking records used a mixed object schema, which crashed Mongoose when loading documents. I resolved this by coding pre-save hydration setters that parse incoming objects and normalize them back to strings.");

addSectionHeading("Challenge 5: Stateless JWT Route Guards");
addParagraph("Checking user states while checking endpoints. I developed layered middlewares (protect + requireRole) that verify JWT authentication claims and enforce RBAC properties on endpoints.");

addSectionHeading("Challenge 6: CORS Cross-Origin Deployment");
addParagraph("Frontend on Vercel and backend on Render created CORS policy failures. I configured explicit origin whitelisting in the Express CORS middleware, allowing only the production Vercel domain to make API calls.");

addSectionHeading("Challenge 7: SPA Client-Side Routing on Vercel");
addParagraph("Direct URL access to React Router routes returned 404 on Vercel since no server-side routes existed. I added a vercel.json configuration file with rewrite rules that redirects all paths to /index.html, letting React Router handle navigation.");

addSectionHeading("Challenge 8: Responsive Multi-Dashboard Design");
addParagraph("Designing three completely different dashboard experiences (User, Pandit, Admin) that work on both desktop and mobile was complex. I used Tailwind's responsive breakpoints with a mobile-first approach and dedicated layout components for each role.");

addSectionHeading("Challenge 9: Mongoose Map Query Serialization");
addParagraph("Mongoose Maps are saved as subdocuments under the hood, making standard query population tricky. I overcame this by writing a custom toObject() hooks pipeline to serialize the Maps into standard JavaScript objects during API JSON stringification.");

addSectionHeading("Challenge 10: PDF Kit Dynamic TOC Generation");
addParagraph("Determining section page numbers before compiling the document is impossible since layout dimensions flow dynamically. I overcame this by enabling bufferPages: true in PDFKit, letting the content generate fully, and then using a secondary page-switching pass to write the calculated page numbers directly into the placeholder coordinates on Page 2 (the TOC page).");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 27. CONCLUSION
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle("conclusion", "27. Conclusion");

addParagraph("PujaConnect successfully digitizes a traditional, unorganized sector. By introducing transparent profile search engines, slot schedules validations (conflict buffer checks), and secure direct messaging interfaces, it establishes a premium ecosystem connecting devotees and Pandits. The project is production-ready and fully deployed.");
addParagraph("This project demonstrates a comprehensive application of the MERN stack in a real-world domain, showcasing skills in database modeling, RESTful API design, authentication systems, cloud deployment, and responsive UI engineering.");

addSectionHeading("Project Core Deliverables Completed");
addBullet("MongoDB Collections and Schema Configurations");
addBullet("REST API Route Handlers and Controller Middleware");
addBullet("Devotee, Priest, and Administrative Dashboards");
addBullet("sacred 100+ Rituals Master Catalog Directory");
addBullet("Visit PujaConnect Live Deployed Application: https://puja-connect-ahy.vercel.app/");

// ──────────────────────────────────────────────────────────────────────────
// SECTION: 28. PROJECT SCREENSHOTS GUIDE
// ──────────────────────────────────────────────────────────────────────────
addChapterTitle('screenshots', '28. Project Screenshots Guide');

addParagraph(
  'The following screenshots demonstrate the functional interfaces, responsive layouts, role-based dashboards, and communication channels implemented on the PujaConnect platform.'
);

const screenshotsList = [
  { file: 'home-page.png', title: '1. Home Page', caption: 'Premium spiritual theme featuring Cormorant Garamond typography and saffron color palettes.' },
  { file: 'login.png', title: '2. Login Page', caption: 'Role-based login interface directing users, pandits, and admins to their respective dashboards.' },
  { file: 'registration.png', title: '3. Registration Page', caption: 'Secure onboarding with phone checks, regional state selections, and validation guides.' },
  { file: 'ritual-list.png', title: '4. Ritual List Page', caption: 'Searchable catalog representing 100+ Hindu ceremonies categorized dynamically.' },
  { file: 'ritual-details.png', title: '5. Ritual Details Page', caption: 'Public description page outlining puja significance, durations, and standard cost lists.' },
  { file: 'pandit-search.png', title: '6. Pandit Search Page', caption: 'Filters for experiences, spoken languages, locations, cities, and active credentials.' },
  { file: 'pandit-profile.png', title: '7. Pandit Profile Page', caption: 'Showcases verification flags, pricing mappings per ritual, bio, and photo fields.' },
  { file: 'booking-flow.png', title: '8. Booking Flow Page', caption: 'Checkout scheduler where devotees choose dates, addresses, and select active availability slots.' },
  { file: 'user-dashboard.png', title: '9. User Dashboard', caption: 'Timeline status mapping representing requested ceremonies, histories, and coordinates.' },
  { file: 'pandit-dashboard.png', title: '10. Pandit Dashboard', caption: 'Availability scheduler calendar and client requests approval pipeline.' },
  { file: 'admin-dashboard.png', title: '11. Admin Dashboard', caption: 'Verification review queues, catalog editor, and user suspension switches.' },
  { file: 'availability-management.png', title: '12. Availability Management', caption: 'Pandits build, edit, or delete custom calendar timeframes with overlapping check guards.' },
  { file: 'booking-details.png', title: '13. Booking Details Page', caption: 'Detailed page displaying addresses, check sheets, and access coordinates.' },
  { file: 'chat-system.png', title: '14. Chat System', caption: 'Integrated messaging interface featuring unread counters and read status indicators.' },
  { file: 'mobile-view.png', title: '15. Mobile View', caption: 'Fully responsive layout optimized for touch screens and mobile web browsers.' }
];

function getPngDimensions(imgPath) {
  try {
    const fd = fs.openSync(imgPath, 'r');
    const buf = Buffer.alloc(8);
    fs.readSync(fd, buf, 0, 8, 16);
    fs.closeSync(fd);
    const width = buf.readUInt32BE(0);
    const height = buf.readUInt32BE(4);
    return { width, height };
  } catch (err) {
    return { width: 1920, height: 1080 };
  }
}

screenshotsList.forEach((item, idx) => {
  // Page split every 2 screenshots
  if (idx % 2 === 0 && idx > 0) {
    doc.addPage();
  }
  
  doc.fillColor(SECONDARY_COLOR).font('Helvetica-Bold').fontSize(11).text(item.title);
  doc.moveDown(0.15);
  
  const imgPath = path.join(__dirname, '..', 'public', 'screenshots', item.file);
  if (fs.existsSync(imgPath)) {
    const dims = getPngDimensions(imgPath);
    const maxW = 360;
    const maxH = 430; // Limit max height to prevent page breaks
    let scaledW = maxW;
    let scaledH = (dims.height / dims.width) * scaledW;
    if (scaledH > maxH) {
      scaledH = maxH;
      scaledW = (dims.width / dims.height) * scaledH;
    }
    
    const startX = (doc.page.width - scaledW) / 2;
    const startY = doc.y;
    
    doc.image(imgPath, startX, startY, { width: scaledW, height: scaledH });
    doc.strokeColor('#E5E7EB').lineWidth(1).rect(startX, startY, scaledW, scaledH).stroke();
    doc.y = startY + scaledH;
  } else {
    // Fallback if image file is not found
    doc.rect(107.5, doc.y, 360, 202.5).fill('#F3F4F6');
    doc.fillColor(MUTED_COLOR).fontSize(10).text('Screenshot asset not found.', { align: 'center' });
  }
  
  doc.moveDown(0.35);
  doc.fillColor(MUTED_COLOR).font('Helvetica-Oblique').fontSize(9.5).text(item.caption, { align: 'center' });
  
  // To avoid adding an extra blank page at the very end of compilation:
  if (idx < screenshotsList.length - 1) {
    doc.moveDown(1);
  }
});

// ──────────────────────────────────────────────────────────────────────────
// FOOTER, PAGE NUMBERING & DYNAMIC TOC COMPILATION
// ──────────────────────────────────────────────────────────────────────────
const range = doc.bufferedPageRange();
for (let i = 0; i < range.count; i++) {
  doc.switchToPage(i);
  
  // Temporarily set bottom margin to 0 to prevent automatic page breaks from footer text
  const oldBottomMargin = doc.page.margins.bottom;
  doc.page.margins.bottom = 0;
  
  // Skip headers/footers on the cover page
  if (i > 0) {
    // Header
    doc.fillColor(MUTED_COLOR).font('Helvetica').fontSize(8);
    doc.text('PujaConnect — Online Pandit & Booking Platform Project Report', 60, 30, { align: 'left' });
    doc.strokeColor('#E5E7EB').lineWidth(0.5).moveTo(60, 42).lineTo(535, 42).stroke();
    
    // Footer
    doc.strokeColor('#E5E7EB').lineWidth(0.5).moveTo(60, 785).lineTo(535, 785).stroke();
    doc.fillColor(MUTED_COLOR).font('Helvetica').fontSize(8);
    doc.text('Department of CSE, PES University', 60, 792, { align: 'left' });
    doc.text("Page " + (i + 1) + " of " + range.count, 450, 792, { align: 'right' });
  }
  
  // Restore bottom margin
  doc.page.margins.bottom = oldBottomMargin;
  
  // If we are on the Table of Contents page (index 2), write the dynamic page numbers
  if (i === 2) {
    doc.font('Helvetica-Bold').fontSize(10.5).fillColor(TEXT_COLOR);
    toc.forEach(([id, title]) => {
      const pageNum = chapterPages[id];
      const y = tocYPositions[id];
      if (pageNum && y) {
        doc.text('Page ' + pageNum, 450, y, { align: 'right' });
      }
    });
  }
}

doc.end();
console.log('PDF generation finished. Total pages: ' + range.count);
