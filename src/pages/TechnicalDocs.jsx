import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, FileText, Database, Shield, Layout, GitBranch, Cpu,
  Activity, CheckCircle2, Server, HelpCircle, Code, ShieldCheck, 
  MessageSquare, Sliders, Calendar, Search, UserCheck, AlertTriangle, 
  Info, Terminal, BookOpen, Layers, Monitor, ChevronsDown, Compass, Award, ExternalLink, Sparkles, Clock, X, ArrowDown, Globe
} from 'lucide-react';
import ImageCard from '../components/ImageCard';

const DOC_SECTIONS = [
  { id: 'project-overview', label: '1. Project Overview' },
  { id: 'introduction', label: '2. Introduction' },
  { id: 'problem-statement', label: '3. Problem Statement' },
  { id: 'existing-system', label: '4. Existing System' },
  { id: 'proposed-solution', label: '5. Proposed Solution' },
  { id: 'objectives', label: '6. Objectives' },
  { id: 'scope', label: '7. Scope' },
  { id: 'architecture', label: '8. Complete System Architecture' },
  { id: 'tech-stack', label: '9. Technology Stack' },
  { id: 'folder-structure', label: '10. Folder Structure' },
  { id: 'database-design', label: '11. Database Design' },
  { id: 'auth-flow', label: '12. Authentication Flow' },
  { id: 'user-module', label: '13. User Module' },
  { id: 'pandit-module', label: '14. Pandit Module' },
  { id: 'admin-module', label: '15. Admin Module' },
  { id: 'ritual-management', label: '16. Ritual Management' },
  { id: 'booking-workflow', label: '17. Booking Workflow' },
  { id: 'availability-management', label: '18. Availability Management' },
  { id: 'messaging-system', label: '19. Messaging System' },
  { id: 'search-filtering', label: '20. Search & Filtering' },
  { id: 'admin-verification', label: '21. Admin Verification Workflow' },
  { id: 'deployment-architecture', label: '22. Deployment Architecture' },
  { id: 'api-overview', label: '23. API Overview' },
  { id: 'security-features', label: '24. Security Features' },
  { id: 'future-enhancements', label: '25. Future Enhancements' },
  { id: 'challenges-faced', label: '26. Challenges Faced' },
  { id: 'conclusion', label: '27. Conclusion' },
  { id: 'project-screenshots', label: '28. Project Screenshots Guide' },
  { id: 'access-credentials', label: '29. Access Credentials' }
];

export default function TechnicalDocs() {
  const [activeDocSection, setActiveDocSection] = useState('project-overview');
  const sidebarRef = useRef(null);
  const itemRefs = useRef({});

  // Auto-scroll sidebar to keep the active item visible
  useEffect(() => {
    const activeEl = itemRefs.current[activeDocSection];
    if (activeEl && sidebarRef.current) {
      const container = sidebarRef.current;
      const elTop = activeEl.offsetTop;
      const elHeight = activeEl.offsetHeight;
      const containerHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      if (elTop < scrollTop + 40 || elTop + elHeight > scrollTop + containerHeight - 40) {
        container.scrollTo({ top: elTop - containerHeight / 2 + elHeight / 2, behavior: 'smooth' });
      }
    }
  }, [activeDocSection]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -60% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveDocSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    DOC_SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToDocSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 95;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveDocSection(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title Header */}
      <div className="border-b border-light-border dark:border-dark-border pb-6 mb-10">
        <p className="text-xs uppercase tracking-widest font-bold text-saffron-500 mb-1">
          TECHNICAL DOCUMENTATION
        </p>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-stone-900 dark:text-white">
          PujaConnect – Online Pandit & Booking Platform Analysis
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
          Comprehensive project report and structural documentation covering all backend models, API metrics, schemas, and workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="hidden lg:block lg:col-span-1">
          <div ref={sidebarRef} className="sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto pr-4 select-none scrollbar-thin">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 px-2">
              Report Sections
            </h3>
            <ul className="flex flex-col gap-1 border-l border-light-border dark:border-dark-border">
              {DOC_SECTIONS.map((sec) => (
                <li key={sec.id} ref={(el) => { itemRefs.current[sec.id] = el; }}>
                  <button
                    onClick={() => scrollToDocSection(sec.id)}
                    className={`w-full text-left pl-4 py-1.5 text-xs transition-all duration-200 border-l-2 -ml-[1px] ${
                      activeDocSection === sec.id
                        ? 'text-saffron-600 dark:text-saffron-400 font-bold border-saffron-500'
                        : 'text-stone-500 dark:text-stone-400 hover:text-stone-850 dark:hover:text-stone-200 border-transparent'
                    }`}
                  >
                    {sec.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-16 text-stone-800 dark:text-stone-200 leading-relaxed font-sans text-base">
          
          {/* 1. Project Overview */}
          <section id="project-overview" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <FileText size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                1. Project Overview
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              {/* Live Deployed Link Banner */}
              <a href="https://puja-connect-ahy.vercel.app/" target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl border-2 border-saffron-500/40 bg-gradient-to-r from-saffron-500/10 to-gold-500/10 flex items-center justify-between gap-4 hover:border-saffron-500 transition-all duration-300 group cursor-pointer">
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-saffron-500" />
                  <div>
                    <span className="text-xs uppercase font-bold text-saffron-600 dark:text-saffron-400 block">Live Deployed Application</span>
                    <span className="text-sm font-semibold text-stone-850 dark:text-white">https://puja-connect-ahy.vercel.app/</span>
                  </div>
                </div>
                <ExternalLink size={16} className="text-saffron-500 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4">
                <p>
                  <strong>PujaConnect</strong> is a production-ready, full-stack digital booking platform built using the MERN stack (MongoDB, Express, React, Node.js). Styled with a customized, Karnataka-inspired saffron and gold palette, it creates an organized, transparent, and trusted digital ecosystem bridging devotees (Users), religious service providers (Pandits), and platform managers (Admins).
                </p>
                <p>
                  The platform includes structural components for slot-based real-time calendar availability, direct booking-linked message threads with unread counters, in-memory Cloudinary image upload streams, manual credentials verification workflows, and strict role-based route protections.
                </p>
                <p>
                  The system is designed to be horizontally scalable. Each core concern (authentication, booking transactions, availability calculations, and messaging) is implemented in its own controller file, allowing independent modification without side effects across other modules.
                </p>
              </div>

              {/* Quick Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-saffron-500/5 flex flex-col justify-center">
                  <span className="text-xs uppercase font-bold text-saffron-600 dark:text-saffron-400 block mb-1">Ecosystem Roles</span>
                  <span className="text-base font-bold block">User, Pandit, Admin</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400 mt-1">Three distinct dashboards with RBAC</span>
                </div>
                <div className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-gold-500/5 flex flex-col justify-center">
                  <span className="text-xs uppercase font-bold text-gold-600 dark:text-gold-400 block mb-1">Catalog Size</span>
                  <span className="text-base font-bold block">100+ Sacred Rituals</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400 mt-1">Admin-managed with categories & pricing</span>
                </div>
                <div className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-crimson-500/5 flex flex-col justify-center">
                  <span className="text-xs uppercase font-bold text-crimson-600 dark:text-crimson-400 block mb-1">Key Tech</span>
                  <span className="text-base font-bold block">MERN Stack + Tailwind</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400 mt-1">React, Node, Express, MongoDB Atlas</span>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Introduction */}
          <section id="introduction" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <BookOpen size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                2. Introduction
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4">
                <p>
                  In Hindu traditions, planning religious ceremonies is a sacred task, yet finding the right Pandit who is certified, speaks the appropriate regional language, and understands specific custom variations remains highly unorganized. PujaConnect resolves this digital divide by offering a unified discovery portal where devotees can discover Pandits, examine pricing models, and coordinate materials.
                </p>
                <p>
                  This project represents a complete full-stack answer to the digitization of religious bookings, establishing standards in time-scheduling availability, secure communication channels, and identity validations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                  <span className="font-bold text-saffron-500 block text-sm mb-2">Discovery</span>
                  <p className="text-xs text-stone-600 dark:text-stone-400">Users browse verified Pandit profiles by city, language, experience, and supported rituals, eliminating the need for personal references.</p>
                </div>
                <div className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                  <span className="font-bold text-gold-600 dark:text-gold-400 block text-sm mb-2">Transparency</span>
                  <p className="text-xs text-stone-600 dark:text-stone-400">Standardized pricing, required materials checklists, estimated durations, and preparation guidelines are displayed upfront before each booking.</p>
                </div>
                <div className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                  <span className="font-bold text-crimson-600 dark:text-crimson-400 block text-sm mb-2">Coordination</span>
                  <p className="text-xs text-stone-600 dark:text-stone-400">Each booking includes a dedicated messaging thread so users and Pandits can discuss ceremony details, share addresses, and confirm timings.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Problem Statement */}
          <section id="problem-statement" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <AlertTriangle size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                3. Problem Statement
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-crimson-500/20 bg-crimson-500/5 flex flex-col gap-3">
                <span className="font-bold text-crimson-600 dark:text-crimson-400 text-sm uppercase tracking-wide">For Devotees</span>
                <p className="text-sm">
                  devotees struggle with finding trusted priests, lack standardized pricing information (leading to arbitrary ad-hoc pricing disputes), and face last-minute scheduling updates without clear communication paths.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-crimson-500/20 bg-crimson-500/5 flex flex-col gap-3">
                <span className="font-bold text-crimson-600 dark:text-crimson-400 text-sm uppercase tracking-wide">For Pandits</span>
                <p className="text-sm">
                  Priests are digitally excluded, relying on manual paper schedules which are prone to double-booking conflicts. They lack the visibility to promote regional specialties to wider regions.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Existing System */}
          <section id="existing-system" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <HelpCircle size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                4. Existing System
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4">
                <p>
                  The traditional existing workflow relies on unverified contacts, local temple visits, or word-of-mouth networks. It has no central reference registry, pricing transparency, or booking guarantees.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-crimson-500/20 bg-crimson-500/5">
                  <span className="font-bold text-crimson-600 dark:text-crimson-400 block text-sm mb-2">❌ No Digital Presence</span>
                  <p className="text-xs">Pandits lack online profiles or calendars, making them invisible to potential clients beyond their immediate community.</p>
                </div>
                <div className="p-5 rounded-2xl border border-crimson-500/20 bg-crimson-500/5">
                  <span className="font-bold text-crimson-600 dark:text-crimson-400 block text-sm mb-2">❌ Double-Booking Risk</span>
                  <p className="text-xs">Priests maintain handwritten diaries, leading to frequent scheduling collisions and last-minute cancellations.</p>
                </div>
                <div className="p-5 rounded-2xl border border-crimson-500/20 bg-crimson-500/5">
                  <span className="font-bold text-crimson-600 dark:text-crimson-400 block text-sm mb-2">❌ Opaque Pricing</span>
                  <p className="text-xs">No standardized rate cards exist. Fees vary wildly and are usually negotiated ad-hoc, creating trust issues.</p>
                </div>
                <div className="p-5 rounded-2xl border border-crimson-500/20 bg-crimson-500/5">
                  <span className="font-bold text-crimson-600 dark:text-crimson-400 block text-sm mb-2">❌ No Verification</span>
                  <p className="text-xs">Credentials, certifications, and experience claims are impossible to verify through informal channels.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Proposed Solution */}
          <section id="proposed-solution" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <CheckCircle2 size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                5. Proposed Solution
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4">
                <p>
                  PujaConnect implements a robust marketplace where authenticated devotees discover, search, and book admin-verified Pandits. Pricing maps are explicitly set per ritual. Availability schedules are managed via active date lists containing distinct slot objects. Coordination is handled through booking-linked message lines, ensuring transparent communication.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-sm mb-2">✓ Verified Listings</span>
                  <p className="text-xs">Every Pandit undergoes manual admin verification before appearing in public search results.</p>
                </div>
                <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-sm mb-2">✓ Slot-Based Calendar</span>
                  <p className="text-xs">Pandits define availability as time slots; conflict-checking middleware prevents double-bookings automatically.</p>
                </div>
                <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-sm mb-2">✓ Fixed Pricing Maps</span>
                  <p className="text-xs">Each Pandit sets explicit per-ritual pricing stored as a Mongoose Map, eliminating ad-hoc negotiations.</p>
                </div>
                <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-sm mb-2">✓ Booking Chat</span>
                  <p className="text-xs">Embedded messaging arrays inside each booking document enable direct, contextual coordination.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Objectives */}
          <section id="objectives" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Compass size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                6. Objectives
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card text-base">
                <p className="mb-4">
                  The primary objective of <strong>PujaConnect</strong> is to bring organization, transparency, and digital efficiency to the traditional religious booking ecosystem in India. By utilizing modern web technologies, the platform aims to empower both devotees and priests through verified interactions, seamless scheduling, and structured pricing models.
                </p>
                <p>
                  Historically, religious bookings in Karnataka and wider India have operated through informal, word-of-mouth networks. This lack of structure leads to scheduling conflicts, pricing discrepancies, and difficulty for devotees in verifying a priest's credentials. PujaConnect addresses these challenges directly by providing a formal marketplace that preserves Vedic traditions while introducing modern reliability.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Digitization Goals */}
                <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-saffron-500">
                  <h4 className="font-bold text-saffron-600 dark:text-saffron-400 text-base flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    Digitization & Transparency Goals
                  </h4>
                  <ul className="text-xs flex flex-col gap-3 list-none pl-0">
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>✓ Verified Professional Network:</strong> Establishing a trustworthy directory of religious service providers by manually verifying their certifications (Veda Pathshala, academic degrees in Sanskrit), years of experience, and location credentials.
                    </li>
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>✓ Pricing Transparency:</strong> Eliminating arbitrary pricing fluctuations and ad-hoc negotiations. The platform records explicit per-ritual pricing for each Pandit and details estimated material costs upfront to build devotee trust.
                    </li>
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>✓ Multi-criteria Discovery:</strong> Enabling devotees to locate the ideal priest by filtering search results dynamically by city, state, experience levels, spoken languages (Kannada, Sanskrit, Tamil, Telugu, Hindi, etc.), and ritual specialties.
                    </li>
                  </ul>
                </div>

                {/* Digital Empowerment */}
                <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-gold-500">
                  <h4 className="font-bold text-gold-600 dark:text-gold-455 text-base flex items-center gap-2">
                    <Calendar size={18} />
                    Priest & Devotee Empowerment
                  </h4>
                  <ul className="text-xs flex flex-col gap-3 list-none pl-0">
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>✓ Autonomous Calendar Control:</strong> Priests manage their schedules through an online calendar dashboard where they can add specific availability dates, modify slot times, and view booking statuses in real-time.
                    </li>
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>✓ Catalog Standardizations:</strong> Archiving 100+ Hindu rituals (Shiva Pujas, Homas, Sanskars) complete with historical significance descriptions, typical durations, and material lists to guide the devotee during ceremony preparations.
                    </li>
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>✓ Remote Accessibility:</strong> Empowering out-of-town or distant devotees to book authentic ceremonies and connect with local regional traditions in their native state.
                    </li>
                  </ul>
                </div>

                {/* Operational Excellence */}
                <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-crimson-600">
                  <h4 className="font-bold text-crimson-600 dark:text-crimson-400 text-base flex items-center gap-2">
                    <Sliders size={18} />
                    Operational & Technical Excellence
                  </h4>
                  <ul className="text-xs flex flex-col gap-3 list-none pl-0">
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>✓ Collision Prevention:</strong> Enforcing strict transaction guards at the database schema level to lock active time slots during checkout and release them immediately on cancellations, ensuring zero booking overlaps.
                    </li>
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>✓ Contextual Messaging:</strong> Providing direct, secure, and private chat lines linked inside each booking record. Devotees and Pandits communicate directly about addresses, temple rules, and material lists.
                    </li>
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>✓ Comprehensive Supervision:</strong> Granting administrators a dedicated control dashboard featuring moderation controls (profile suspensions, catalog editing, and application audits) to monitor platform health.
                    </li>
                  </ul>
                </div>

                {/* Social & Economic Impact */}
                <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-emerald-600">
                  <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-base flex items-center gap-2">
                    <Activity size={18} />
                    Social & Economic Impact
                  </h4>
                  <ul className="text-xs flex flex-col gap-3 list-none pl-0">
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>✓ Equal Visibility for Priests:</strong> Promoting fair search visibility for younger or rural priests who lack traditional family networking channels, offering them a direct stream of devotee requests.
                    </li>
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>✓ Safeguarding Vedic Knowledge:</strong> Archiving authentic ritual details and scriptural descriptions, making Vedic wisdom accessible to the younger generation of devotees in an easy-to-use digital format.
                    </li>
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>✓ Structured Payments & Escrow Foundation:</strong> Laying the groundwork for escrow payment flows and material store purchases to ensure that priests get compensated reliably for every ceremony they perform.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 7. Scope */}
          <section id="scope" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Sliders size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                7. Scope
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl glass-card">
                <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mb-3 uppercase tracking-wider">In Scope (Phase 1)</h4>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">Multi-role authentication with JWT-based sessions</div>
                  <div className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">Manual admin verification of Pandit credentials</div>
                  <div className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">100+ rituals CRUD catalog with pricing bounds</div>
                  <div className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">Slot-based availability calendars with conflict checks</div>
                  <div className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">Embedded booking-linked messaging threads</div>
                  <div className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">Cloudinary image streaming for profile photos</div>
                </div>
              </div>
              <div className="p-6 rounded-2xl glass-card">
                <h4 className="font-bold text-stone-500 text-sm mb-3 uppercase tracking-wider">Out of Scope (Phase 2)</h4>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30 text-stone-500 dark:text-stone-500">Escrow payment gateways (Razorpay/Stripe)</div>
                  <div className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30 text-stone-500 dark:text-stone-500">Live ritual video streaming</div>
                  <div className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30 text-stone-500 dark:text-stone-500">Push notifications (Firebase Cloud Messaging)</div>
                  <div className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30 text-stone-500 dark:text-stone-500">Automated Muhurat calculation algorithms</div>
                  <div className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30 text-stone-500 dark:text-stone-500">Multi-language i18n translation support</div>
                  <div className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30 text-stone-500 dark:text-stone-500">Native mobile applications (iOS/Android)</div>
                </div>
              </div>
            </div>
          </section>

          {/* 8. Complete System Architecture */}
          <section id="architecture" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <GitBranch size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                8. Complete System Architecture
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <p>
                PujaConnect implements a robust <strong>Three-Tier Software Architecture</strong> aligned with the Model-View-Controller (MVC) design pattern. This architecture ensures high modularity, scalability, and security:
              </p>
              
              {/* High-fidelity Visual Flow panels */}
              <div className="flex flex-col gap-6 mt-4 items-center">
                {/* Presentation Tier */}
                <div className="w-full max-w-xl p-5 rounded-2xl border border-saffron-500/30 bg-saffron-500/5 hover:border-saffron-500 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3 border-b border-light-border dark:border-dark-border pb-2">
                    <span className="flex items-center gap-2 font-display font-bold text-saffron-600 dark:text-saffron-400">
                      <Monitor size={16} />
                      Presentation Tier (Client App)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-saffron-500 text-white font-mono">React + Vite</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
                    Renders interactive user interfaces, manages page routing, and holds client state.
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-stone-505 dark:text-stone-400 font-mono">
                    <li>📄 App.jsx (Routing)</li>
                    <li>📄 AuthContext (JWT Sessions)</li>
                    <li>📄 ThemeContext (Dark/Light)</li>
                    <li>📄 axios.js (API Fetch)</li>
                  </ul>
                </div>

                {/* Flow Arrow 1 */}
                <div className="flex flex-col items-center gap-1 my-1">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-400 border border-light-border dark:border-dark-border">
                    HTTPS REST API Calls (JSON + JWT)
                  </span>
                  <ChevronsDown className="text-saffron-500 animate-bounce" size={20} />
                </div>

                {/* Application Tier */}
                <div className="w-full max-w-xl p-5 rounded-2xl border border-gold-500/30 bg-gold-500/5 hover:border-gold-500 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3 border-b border-light-border dark:border-dark-border pb-2">
                    <span className="flex items-center gap-2 font-display font-bold text-gold-600 dark:text-gold-400">
                      <Server size={16} />
                      Application Tier (REST Server)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gold-500 text-white font-mono">Node.js + Express</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
                    Processes backend logical operations, endpoints, uploads, and verifies RBAC permissions.
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-stone-505 dark:text-stone-400 font-mono">
                    <li>⚙️ authController.js</li>
                    <li>⚙️ bookingController.js</li>
                    <li>⚙️ authMiddleware.js</li>
                    <li>⚙️ uploadMiddleware.js</li>
                  </ul>
                </div>

                {/* Flow Arrow 2 */}
                <div className="flex flex-col items-center gap-1 my-1">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-400 border border-light-border dark:border-dark-border">
                    Mongoose Schema Operations & Streams
                  </span>
                  <ChevronsDown className="text-gold-500 animate-bounce" size={20} />
                </div>

                {/* Database/Storage Tier */}
                <div className="w-full max-w-xl p-5 rounded-2xl border border-crimson-500/30 bg-crimson-500/5 hover:border-crimson-500 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3 border-b border-light-border dark:border-dark-border pb-2">
                    <span className="flex items-center gap-2 font-display font-bold text-crimson-600 dark:text-crimson-400">
                      <Database size={16} />
                      Data & Cloud Storage Tier
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-crimson-600 text-white font-mono">MongoDB + Cloudinary</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
                    Persists all dynamic records and safely stores image assets inside cloud-optimized hosts.
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-stone-505 dark:text-stone-400 font-mono">
                    <li>🗄️ Users Collection</li>
                    <li>🗄️ Pandits Collection</li>
                    <li>🗄️ Bookings Collection</li>
                    <li>☁️ Cloudinary Storage</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 9. Technology Stack */}
          <section id="tech-stack" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Cpu size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                9. Technology Stack & Architectural Decisions
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card text-base flex flex-col gap-4">
                <p>
                  The technical design of <strong>PujaConnect</strong> is optimized for security, performance, real-time sync, and rapid front-to-back response times. We selected a MERN stack foundation backed by cloud native storage engines and a modern design system.
                </p>
                <p>
                  By using Javascript throughout the entire development stack (React on client, Node/Express on backend), the system maintains a unified data structure format (JSON). This facilitates rapid schema serialization, accelerates developer velocity, and eliminates database mapping translation costs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Frontend Card */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-saffron-500 flex flex-col gap-6">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Layers size={18} className="text-saffron-500" />
                    Client Side Architecture (Frontend)
                  </h4>
                  <div className="flex flex-col gap-4 text-xs">
                    <div className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <span className="font-semibold block text-sm text-saffron-600 dark:text-saffron-400">React.js (v18.2) — Component Framework</span>
                      <p className="mt-1 text-stone-600 dark:text-stone-400">
                        Leverages declarative functional components, virtual DOM reconciliation, and standard hooks (useEffect, useState, useRef, useContext) for application state management. This ensures instantaneous UI updates and modular, reusable logic blocks across complex search grids, live chat messaging panels, and multi-step booking schedules.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <span className="font-semibold block text-sm text-saffron-600 dark:text-saffron-400">Vite.js Build Tool — Development & Bundling</span>
                      <p className="mt-1 text-stone-600 dark:text-stone-400">
                        Serves as the high-speed frontend bundler and development environment. Vite utilizes native ES modules (ESM) to deliver lightning-fast Hot Module Replacement (HMR) during coding and performs Rollup-based tree-shaking optimizations during production compile, resulting in highly compact static assets.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <span className="font-semibold block text-sm text-saffron-600 dark:text-saffron-400">Tailwind CSS (v3.4) & Design Tokens — Styling</span>
                      <p className="mt-1 text-stone-600 dark:text-stone-400">
                        Provides utility-first styling. We constructed a Karnataka-inspired color schema (saffron, gold, crimson) mapped as design tokens in the Tailwind configuration. This allows responsive fluid layouts, dark/light theme shifts, and custom glassmorphism panels to render consistently.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <span className="font-semibold block text-sm text-saffron-600 dark:text-saffron-400">Framer Motion — Micro-Animations</span>
                      <p className="mt-1 text-stone-600 dark:text-stone-400">
                        Powers page-level layout transitions, sidebars overlays, and subtle button click micro-animations. It keeps the user interface responsive and animated without overloading the rendering loops or slowing down the DOM repaint cycle.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <span className="font-semibold block text-sm text-saffron-600 dark:text-saffron-400">Axios HTTP Client — Server Fetching</span>
                      <p className="mt-1 text-stone-600 dark:text-stone-400">
                        Manages XMLHttpRequests. Includes pre-configured instance handlers with interceptor logic to append JWT authorization bearer keys automatically to outgoing headers and parse server exception packets to extract friendly error indicators.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Backend Card */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-gold-600 flex flex-col gap-6">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Server size={18} className="text-gold-600" />
                    Server Side Architecture (Backend)
                  </h4>
                  <div className="flex flex-col gap-4 text-xs">
                    <div className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <span className="font-semibold block text-sm text-gold-600 dark:text-gold-455">Node.js & Express.js — Application Engine</span>
                      <p className="mt-1 text-stone-600 dark:text-stone-400">
                        Powers the REST API service. Express coordinates the modular MVC pipeline, handling route specifications, JWT-based security guard checks, image stream parsing, and error-handling interceptors within a stateless HTTP server.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <span className="font-semibold block text-sm text-gold-600 dark:text-gold-455">MongoDB Atlas & Mongoose ODM — Database</span>
                      <p className="mt-1 text-stone-600 dark:text-stone-400">
                        MongoDB stores documents representing users, pandits, availability tables, and booking records. Mongoose maps these documents to application-level objects, checking schema specifications, applying database hooks (pre-save hashing), and executing compound indexes.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <span className="font-semibold block text-sm text-gold-600 dark:text-gold-455">Cloudinary CDN — Media Storage & Optimization</span>
                      <p className="mt-1 text-stone-600 dark:text-stone-400">
                        Serves as the cloud-optimized media storage provider. Profile photographs are uploaded through Multer RAM buffers directly to Cloudinary, ensuring quick loading, automatic caching, and asset optimization.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <span className="font-semibold block text-sm text-gold-600 dark:text-gold-455">Bcrypt.js & JSON Web Tokens (JWT) — Security</span>
                      <p className="mt-1 text-stone-600 dark:text-stone-400">
                        Manages access verification. Passwords are salted and hashed with bcrypt (12 rounds) on creation or updates. Upon login, client devices receive signed, stateless JWT tokens containing user credentials, valid for 24 hours.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <span className="font-semibold block text-sm text-gold-600 dark:text-gold-455">Multer Buffer Parser — File Upload Handling</span>
                      <p className="mt-1 text-stone-600 dark:text-stone-400">
                        Acts as file-upload parser middleware, extracting incoming multipart/form-data. It keeps file byte streams in temporary memory, preventing local disk caching issues.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 10. Folder Structure */}
          <section id="folder-structure" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Code size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                10. Folder Structure
              </h2>
            </div>
            
            <div className="flex flex-col gap-6 font-sans">
              <div className="p-6 rounded-2xl glass-card text-base flex flex-col gap-4">
                <p>
                  Below is the complete, exhaustive directory tree representing all files, controllers, schemas, pages, context managers, and utility files present in the <strong>PujaConnect</strong> project workspace:
                </p>
                <p>
                  The codebase is split cleanly into a backend REST API and a client-side Single-Page Application (SPA). This structure guarantees modularity and division of concerns, facilitating independent development and deployment.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Backend Tree */}
                <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-saffron-500">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Terminal size={16} className="text-saffron-500" />
                    Complete Backend Directory Mappings
                  </h4>
                  <div className="text-xs font-mono flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
                    <div>
                      <span className="text-saffron-500 font-bold block">📁 backend/</span>
                      <span className="text-stone-600 pl-4 block">📄 server.js — Main server entry point configured with Express middleware, CORS, security headers, and API route registrations.</span>
                      <span className="text-stone-600 pl-4 block">📄 package.json — Lists all backend dependencies (Express, Mongoose, BcryptJS, JWT, Multer, Cloudinary, Dotenv).</span>
                      <span className="text-stone-600 pl-4 block">📄 package-lock.json — Dependency lockfile defining exact package resolution trees.</span>
                      <span className="text-stone-600 pl-4 block">📄 .env.example — Baseline template for required backend environment variables.</span>
                    </div>

                    <div>
                      <span className="text-saffron-500 font-bold block pl-4">📁 config/</span>
                      <span className="text-stone-600 pl-8 block">📄 db.js — Mongoose database connector establishing connection pools and logging connection events.</span>
                      <span className="text-stone-600 pl-8 block">📄 cloudinary.js — Cloudinary SDK wrapper configuration using environment API credentials.</span>
                    </div>

                    <div>
                      <span className="text-saffron-500 font-bold block pl-4">📁 models/</span>
                      <span className="text-stone-600 pl-8 block">📄 User.js — User model defining name, email, role, phone, and city fields, featuring password-hashing pre-save triggers.</span>
                      <span className="text-stone-600 pl-8 block">📄 Pandit.js — Pandit profile schema detailing experiences, location details, supported rituals, and a per-ritual pricing map.</span>
                      <span className="text-stone-600 pl-8 block">📄 Ritual.js — Stores the 100+ standardized Hindu rituals with categories, occasion tags, descriptions, price limits, and material lists.</span>
                      <span className="text-stone-600 pl-8 block">📄 Booking.js — Tracks booking transactions, status timelines, address details, and handles the embedded messaging array.</span>
                      <span className="text-stone-600 pl-8 block">📄 Availability.js — Represents Pandit availability calendars, modeling daily timeslots and active booking assignments.</span>
                    </div>

                    <div>
                      <span className="text-saffron-500 font-bold block pl-4">📁 controllers/</span>
                      <span className="text-stone-600 pl-8 block">📄 authController.js — Coordinates devotee/priest signups, credential matching, and signs JWT tokens.</span>
                      <span className="text-stone-600 pl-8 block">📄 userController.js — Manages devotee profile information, updates, and moderation summaries.</span>
                      <span className="text-stone-600 pl-8 block">📄 panditController.js — Coordinates priest details updates, bio edits, pricing map adjustments, and list discovery queries.</span>
                      <span className="text-stone-600 pl-8 block">📄 bookingController.js — Handles checkout scheduling processes, acceptances, cancellations, and appends messages to logs.</span>
                      <span className="text-stone-600 pl-8 block">📄 availabilityController.js — Handles Pandit daily calendar setups, slot additions, removals, and checks for overlaps.</span>
                      <span className="text-stone-600 pl-8 block">📄 ritualController.js — Serves public queries for the ritual catalog, slug resolutions, and category maps.</span>
                      <span className="text-stone-600 pl-8 block">📄 adminController.js — Aggregates analytics, details user lists, and logs suspension actions.</span>
                      <span className="text-stone-600 pl-8 block">📄 adminManagementController.js — Orchestrates administrative access and catalog modifications.</span>
                    </div>

                    <div>
                      <span className="text-saffron-500 font-bold block pl-4">📁 routes/</span>
                      <span className="text-stone-600 pl-8 block">📄 authRoutes.js — API endpoints mapping client login, signup, and validation requests.</span>
                      <span className="text-stone-600 pl-8 block">📄 userRoutes.js — Defines profile edit routes and session verifications.</span>
                      <span className="text-stone-600 pl-8 block">📄 panditRoutes.js — Endpoints for Pandit profile modifications and list queries.</span>
                      <span className="text-stone-600 pl-8 block">📄 bookingRoutes.js — Handles checkout postings, cancellations, acceptances, and messaging postings.</span>
                      <span className="text-stone-600 pl-8 block">📄 availabilityRoutes.js — Routes to fetch, append, or purge Pandit daily availability tables.</span>
                      <span className="text-stone-600 pl-8 block">📄 ritualRoutes.js — Public endpoints to read the standardized ritual directory list.</span>
                      <span className="text-stone-600 pl-8 block">📄 adminRoutes.js — Routes for panel statistics, pandit verification review queues, and user suspension triggers.</span>
                    </div>

                    <div>
                      <span className="text-saffron-500 font-bold block pl-4">📁 middleware/</span>
                      <span className="text-stone-600 pl-8 block">📄 authMiddleware.js — Enforces route protection, decoding JWT bearer headers and attaching verified user objects to request contexts.</span>
                      <span className="text-stone-600 pl-8 block">📄 roleMiddleware.js — Evaluates active user roles to block unauthorized access on Pandit or Admin routes.</span>
                      <span className="text-stone-600 pl-8 block">📄 uploadMiddleware.js — Integrates Multer memory storage options to parse incoming multipart/form-data media streams.</span>
                      <span className="text-stone-600 pl-8 block">📄 errorMiddleware.js — Global express handler catching and formatting backend exceptions.</span>
                    </div>

                    <div>
                      <span className="text-saffron-500 font-bold block pl-4">📁 utils/</span>
                      <span className="text-stone-600 pl-8 block">📄 generateToken.js — Sign JWT tokens with standard 24h expiration parameters.</span>
                      <span className="text-stone-600 pl-8 block">📄 validators.js — Performs robust server validation checks for emails, phone numbers, and dates.</span>
                    </div>

                    <div>
                      <span className="text-saffron-500 font-bold block pl-4">📁 seed/</span>
                      <span className="text-stone-600 pl-8 block">📄 seed.js — Orchestrator seeding file populating baseline catalog datasets.</span>
                      <span className="text-stone-600 pl-8 block">📄 ritualsData.js — Master array storing details for 100+ standard Hindu rituals.</span>
                      <span className="text-stone-600 pl-8 block">📄 panditsData.js — Standard mock profile parameters used for seeding Pandit entities.</span>
                      <span className="text-stone-600 pl-8 block">📄 seedPandits.js — Seeds linked User/Pandit entities and pricing mappings.</span>
                    </div>
                  </div>
                </div>

                {/* Frontend Tree */}
                <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-gold-600">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Layout size={16} className="text-gold-600" />
                    Complete Frontend Directory Mappings
                  </h4>
                  <div className="text-xs font-mono flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
                    <div>
                      <span className="text-gold-600 font-bold block">📁 frontend/</span>
                      <span className="text-stone-600 pl-4 block">📄 index.html — Single-Page Application HTML page template containing the root anchor mount for React DOM.</span>
                      <span className="text-stone-600 pl-4 block">📄 package.json — Frontend dependencies (React Router, Axios, Tailwind, Framer Motion, Lucide Icons).</span>
                      <span className="text-stone-600 pl-4 block">📄 package-lock.json — Exact lockfile recording resolve trees for client libraries.</span>
                      <span className="text-stone-600 pl-4 block">📄 postcss.config.js — PostCSS configurations enabling Tailwind compilation.</span>
                      <span className="text-stone-600 pl-4 block">📄 tailwind.config.js — Defines custom colors, fonts, responsive parameters, and light/dark theme shifts.</span>
                      <span className="text-stone-600 pl-4 block">📄 vite.config.js — Bundler configuration managing paths, loaders, and development proxies.</span>
                      <span className="text-stone-600 pl-4 block">📄 vercel.json — Vercel routing configurations enabling clean browser refreshes on React Router paths.</span>
                    </div>

                    <div>
                      <span className="text-gold-600 font-bold block pl-4">📁 public/</span>
                      <span className="text-stone-600 pl-8 block">📄 default-om.png — Default religious avatar fallback when profile image upload is pending.</span>
                    </div>

                    <div>
                      <span className="text-gold-600 font-bold block pl-4">📁 src/</span>
                      <span className="text-stone-600 pl-8 block">📄 main.jsx — Application entry point compiling context builders and rendering React to the DOM.</span>
                      <span className="text-stone-600 pl-8 block">📄 App.jsx — Declares paths and protects routes with Role-Based context gates.</span>
                      <span className="text-stone-600 pl-8 block">📄 index.css — Base style rules, glassmorphism tokens, and custom scrollbar properties.</span>
                    </div>

                    <div>
                      <span className="text-gold-600 font-bold block pl-4">📁 src/api/</span>
                      <span className="text-stone-600 pl-8 block">📄 axios.js — Pre-configured Axios connector featuring header token interceptor loops.</span>
                      <span className="text-stone-600 pl-8 block">📄 index.js — Exports client request mappings (auth, profile, booking, availability).</span>
                    </div>

                    <div>
                      <span className="text-gold-600 font-bold block pl-4">📁 src/context/</span>
                      <span className="text-stone-600 pl-8 block">📄 AuthContext.jsx — Stores login records, tracks active user details, and controls logout procedures.</span>
                      <span className="text-stone-600 pl-8 block">📄 ThemeContext.jsx — Manages active dark/light mode state variable across elements.</span>
                    </div>

                    <div>
                      <span className="text-gold-600 font-bold block pl-4">📁 src/utils/</span>
                      <span className="text-stone-600 pl-8 block">📄 validators.js — Performs user form check processes (email, phone lengths, empty state inputs).</span>
                    </div>

                    <div>
                      <span className="text-gold-600 font-bold block pl-4">📁 src/components/common/</span>
                      <span className="text-stone-600 pl-8 block">📄 Navbar.jsx — Main navigation bar showing links and role-specific dashboard keys.</span>
                      <span className="text-stone-600 pl-8 block">📄 Footer.jsx — Standard site footer with copyright info.</span>
                      <span className="text-stone-600 pl-8 block">📄 ThemeToggle.jsx — Slide switch changing site theme smoothly.</span>
                      <span className="text-stone-600 pl-8 block">📄 StatusBadge.jsx — Colors booking statuses (pending, accepted, rejected, completed).</span>
                      <span className="text-stone-600 pl-8 block">📄 ProtectedRoute.jsx — Access blocker requiring active sessions to enter specific pages.</span>
                      <span className="text-stone-600 pl-8 block">📄 ChangePasswordForm.jsx — Standard secure inputs for user password resets.</span>
                      <span className="text-stone-600 pl-8 block">📄 PanditAvatar.jsx — Displays Pandit photo or fallback OM icon.</span>
                      <span className="text-stone-600 pl-8 block">📄 LoadingSpinner.jsx — Spinning loading animation.</span>
                      <span className="text-stone-600 pl-8 block">📄 SkeletonLoader.jsx — Shimmering blocks showing outline layouts during data loads.</span>
                      <span className="text-stone-600 pl-8 block">📄 PageTransition.jsx — Framer Motion container fading pages in on navigation.</span>
                      <span className="text-stone-600 pl-8 block">📄 ScrollReveal.jsx — Trigger scroll animations on elements when they scroll into view.</span>
                      <span className="text-stone-600 pl-8 block">📄 SpiritualVisuals.jsx — Renders saffron-gold frames and borders.</span>
                    </div>

                    <div>
                      <span className="text-gold-600 font-bold block pl-4">📁 src/components/booking/</span>
                      <span className="text-stone-600 pl-8 block">📄 BookingChat.jsx — Live chat component managing context-specific booking conversations.</span>
                    </div>

                    <div>
                      <span className="text-gold-600 font-bold block pl-4">📁 src/components/pandit/</span>
                      <span className="text-stone-600 pl-8 block">📄 PanditCard.jsx — Displays bio details, rates, experience rating, and links to profile.</span>
                    </div>

                    <div>
                      <span className="text-gold-600 font-bold block pl-4">📁 src/pages/</span>
                      <span className="text-stone-600 pl-8 block">📄 Home.jsx — Dashboard landing page hosting search queries.</span>
                      <span className="text-stone-600 pl-8 block">📄 Login.jsx — Simple login screen.</span>
                      <span className="text-stone-600 pl-8 block">📄 Register.jsx — Onboarding form directing devotee or priest registrations.</span>
                      <span className="text-stone-600 pl-8 block">📄 Rituals.jsx — Catalog interface presenting 100+ Hindu rituals.</span>
                      <span className="text-stone-600 pl-8 block">📄 RitualDetail.jsx — Displays significance, duration, material checklist.</span>
                      <span className="text-stone-600 pl-8 block">📄 PanditList.jsx — List directory displaying Pandits with filtering panels.</span>
                      <span className="text-stone-600 pl-8 block">📄 PanditProfile.jsx — Profile previews, pricing list, and calendar access.</span>
                      <span className="text-stone-600 pl-8 block">📄 BookingPage.jsx — Scheduler checklist where devotees post bookings.</span>
                      <span className="text-stone-600 pl-8 block">📄 PlaceholderPage.jsx — Page shell indicating template content.</span>
                    </div>

                    <div>
                      <span className="text-gold-600 font-bold block pl-4">📁 src/pages/dashboard/</span>
                      <span className="text-stone-600 pl-8 block">📄 UserDashboard.jsx — Devotee active booking tracking timelines.</span>
                      <span className="text-stone-600 pl-8 block">📄 UserBookingDetail.jsx — Displays addresses, checklist, and opens messaging drawer.</span>
                      <span className="text-stone-600 pl-8 block">📄 PanditDashboard.jsx — Priest schedule matrix and client request workflow keys.</span>
                      <span className="text-stone-600 pl-8 block">📄 PanditBookingDetail.jsx — Accepts/declines devotee requests, shows addresses, and hosts chat.</span>
                      <span className="text-stone-600 pl-8 block">📄 AdminDashboard.jsx — Main statistics dashboard detailing moderation tabs.</span>
                      <span className="text-stone-600 pl-8 block">📄 AdminBookingDetail.jsx — Supervise booking records and details.</span>
                      <span className="text-stone-600 pl-8 block">📄 AdminPanditDetail.jsx — Allows admin review and verification of Pandit applications.</span>
                      <span className="text-stone-600 pl-8 block">📄 AdminUserDetail.jsx — Moderate user profile suspensions.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

                              {/* 11. Database Design */}
          <section id="database-design" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Database size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                11. Database Design & Collections
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card text-base flex flex-col gap-4">
                <p>
                  The database layer of <strong>PujaConnect</strong> is built on MongoDB Atlas using the Mongoose Object-Document Mapper (ODM). The schema structure is designed around 5 primary collections with denormalized subdocuments to balance query speeds and write performance.
                </p>
                <p>
                  To support search indexing and ensure fast page loads, we have configured compound index strategies for matching locations, active availability ranges, and verification flags. Relational integrity is enforced programmatically using Mongoose pre-save middleware hooks and route triggers.
                </p>
              </div>

              {/* User Schema Card */}
              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-saffron-500">
                <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-saffron-500" />
                  1. Users Collection (User.js)
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  Manages base registration records for Devotees (role: <code>'user'</code>), Priests (role: <code>'pandit'</code>), and Administrators (role: <code>'admin'</code>). Includes conditional validation fields to check phone and city details on devotee/priest entries, password salting triggers, and a suspension action audit tracker.
                </p>
                <pre className="text-xs bg-stone-100 dark:bg-stone-850 p-4 rounded-xl font-mono text-stone-700 dark:text-stone-300 overflow-x-auto">
{`const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'pandit', 'admin'],
      default: 'user',
    },
    phone: {
      type: String,
      trim: true,
      required: [function () { return this.role === 'pandit' || this.role === 'user'; }, 'Phone number is required'],
    },
    city: {
      type: String,
      trim: true,
      required: [function () { return this.role === 'pandit' || this.role === 'user'; }, 'City is required'],
    },
    region: {
      type: String,
      trim: true,
      required: [function () { return this.role === 'pandit'; }, 'State / Region is required'],
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    adminActionHistory: [
      {
        actionType: { type: String, enum: ['suspended', 'reactivated', 'deleted'] },
        adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        actionDate: { type: Date, default: Date.now },
        reason: { type: String }
      }
    ],
  },
  { timestamps: true }
);

// Indexes and hooks
userSchema.index({ name: 1 });
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});`}
                </pre>
              </div>

              {/* Pandit Schema Card */}
              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-gold-500">
                <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-500" />
                  2. Pandits Collection (Pandit.js)
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  Establishes the profile details for verified priests, referencing a User record. Includes experience boundaries, location details, supported rituals lists, spoken language tags, a Mongoose Map mapping ritual IDs to custom pricing in INR, and verification logs.
                </p>
                <pre className="text-xs bg-stone-100 dark:bg-stone-850 p-4 rounded-xl font-mono text-stone-700 dark:text-stone-300 overflow-x-auto">
{`const panditSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    photo: {
      type: String, // Cloudinary secure_url mapping
      default: '',
    },
    bio: {
      type: String,
      maxlength: [1000, 'Bio cannot exceed 1000 characters'],
    },
    location: {
      city:   { type: String, trim: true },
      region: { type: String, trim: true },
      state:  { type: String, trim: true },
    },
    yearsOfExperience: {
      type: Number,
      min: [0,  'Experience cannot be negative'],
      max: [60, 'Experience cannot exceed 60 years'],
      default: 0,
    },
    supportedRituals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ritual',
      },
    ],
    languagesSpoken: [
      {
        type: String,
        trim: true,
      },
    ],
    pricing: {
      type: Map,
      of: Number, // Maps ritualObjectId -> price in INR
      default: {},
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected', 'suspended'],
      default: 'pending',
    },
    adminActionHistory: [
      {
        actionType: { type: String, enum: ['approved', 'rejected', 'suspended', 'unsuspended', 'restored', 'deleted'], required: true },
        adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        actionDate: { type: Date, default: Date.now },
        reason: { type: String },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Search optimization performance indexes
panditSchema.index({ 'location.city': 1 });
panditSchema.index({ verificationStatus: 1, isActive: 1 });
panditSchema.index({ 'location.city': 1, verificationStatus: 1 });`}
                </pre>
              </div>

              {/* Ritual Schema Card */}
              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-crimson-600">
                <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-crimson-500" />
                  3. Rituals Collection (Ritual.js)
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  Defines the database catalog of 100+ standard Hindu ceremonies. Features categories, unique SEO slugs, duration calculations in minutes, checklist details for puja materials, price ranges, and featured/popular sorting tags.
                </p>
                <pre className="text-xs bg-stone-100 dark:bg-stone-850 p-4 rounded-xl font-mono text-stone-700 dark:text-stone-300 overflow-x-auto">
{`const ritualSchema = new mongoose.Schema(
  {
    pujaName: {
      type: String,
      required: [true, 'Puja name is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Griha & Property Pujas', 'Marriage & Family Rituals',
        'Child & Sanskar Ceremonies', 'Business & Career Pujas',
        'Health & Protection Pujas', 'Festival Pujas',
        'Shiva Pujas', 'Vishnu Pujas', 'Devi Pujas',
        'Navagraha Pujas', 'Homa & Havan Rituals', 'Special Vedic Ceremonies'
      ],
      trim: true,
    },
    description: { type: String, required: true },
    duration: { type: String, required: true }, // e.g. "2-3 hours"
    durationMinutes: { type: Number, required: true, default: 120 },
    requiredMaterials: [{ type: String, trim: true }],
    estimatedMaterialCost: { type: Number, default: 0 },
    priceRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
    },
    locationType: { type: String, enum: ['Home', 'Temple', 'Both'], default: 'Both' },
    isActive: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    popular: { type: Boolean, default: false },
    searchKeywords: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Indexes
ritualSchema.index({ category: 1 });
ritualSchema.index({ searchKeywords: 1 });`}
                </pre>
              </div>

              {/* Booking Schema Card */}
              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-emerald-600">
                <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  4. Bookings Collection (Booking.js)
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  Tracks religious service bookings. Records client details, assigned priests, scheduled dates, and address details. Implements pre-save hooks to clean legacy location records, updates availability slots dynamically on cancellations, and manages the embedded messaging array.
                </p>
                <pre className="text-xs bg-stone-100 dark:bg-stone-850 p-4 rounded-xl font-mono text-stone-700 dark:text-stone-300 overflow-x-auto">
{`const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pandit: { type: mongoose.Schema.Types.ObjectId, ref: 'Pandit', required: true },
    ritual: { type: mongoose.Schema.Types.ObjectId, ref: 'Ritual', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: mongoose.Schema.Types.Mixed, default: 'Home' }, // normalized pre-save
    locationType: { type: String, enum: ['Home', 'Temple'], default: 'Home' },
    address: {
      houseNumber: String, street: String, city: String,
      state: String, pincode: String, landmark: String
    },
    templeDetails: {
      templeName: String, templeAddress: String, city: String,
      state: String, pincode: String, locality: String
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'cancelled', 'completed', 'expired'],
      default: 'pending',
    },
    statusHistory: [
      {
        status: { type: String, required: true },
        changedAt: { type: Date, default: Date.now },
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        note: String
      }
    ],
    messages: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        senderRole: { type: String, enum: ['user', 'pandit'], required: true },
        message: { type: String, required: true, trim: true },
        isRead: { type: Boolean, default: false },
        readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        createdAt: { type: Date, default: Date.now },
      }
    ],
    availabilitySlotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Availability' },
  },
  { timestamps: true }
);

// Pre-save slot release trigger
bookingSchema.pre('save', async function (next) {
  if (this.isModified('status') && ['cancelled', 'rejected', 'expired'].includes(this.status)) {
    if (this.availabilitySlotId) {
      const Availability = mongoose.model('Availability');
      const availability = await Availability.findById(this.availabilitySlotId);
      if (availability) {
        const slot = availability.timeSlots.find(
          (s) => s.bookingId?.toString() === this._id.toString() || (s.time === this.time && s.isBooked)
        );
        if (slot) {
          slot.isBooked = false; // release slot
          await availability.save();
        }
      }
    }
  }
  next();
});`}
                </pre>
              </div>

              {/* Availability Schema Card */}
              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-blue-500">
                <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  5. Availability Collection (Availability.js)
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  Manages timeslots for verified priests. Each daily calendar is recorded as a single document containing an array of time slot objects. Features regex validation to enforce proper time-slot layout formats (e.g. <code>"09:00 AM"</code>) and a compound index to restrict duplicate date sheets per Pandit.
                </p>
                <pre className="text-xs bg-stone-100 dark:bg-stone-850 p-4 rounded-xl font-mono text-stone-700 dark:text-stone-300 overflow-x-auto">
{`const timeSlotSchema = new mongoose.Schema(
  {
    time: {
      type: String, // e.g., "09:00 AM" or "09:00 AM - 10:00 AM"
      required: true,
      validate: {
        validator: function (v) {
          return /^\\d{1,2}:\\d{2}\\s*(AM|PM)(?:\\s*-\\s*\\d{1,2}:\\d{2}\\s*(AM|PM))?$/i.test(v);
        },
        message: props => \`\${props.value} is not a valid time slot or range!\`
      }
    },
    isBooked: { type: Boolean, default: false },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', default: null },
  }
);

const availabilitySchema = new mongoose.Schema(
  {
    pandit: { type: mongoose.Schema.Types.ObjectId, ref: 'Pandit', required: true },
    date: { type: Date, required: true },
    timeSlots: [timeSlotSchema],
    status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
  },
  { timestamps: true }
);

// Restrict duplicate calendar sheets per Pandit per day
availabilitySchema.index({ pandit: 1, date: 1 }, { unique: true });`}
                </pre>
              </div>
            </div>
          </section>


                    {/* 12. Authentication Flow */}
          <section id="auth-flow" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Shield size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                12. Authentication Flow & Security Infrastructure
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card text-base flex flex-col gap-4">
                <p>
                  <strong>PujaConnect</strong> enforces a strict role-based authentication flow to verify and protect endpoints. The security infrastructure is composed of multi-tier checks working across client-side router buffers and server-side middleware:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Credentials Security */}
                <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-saffron-500">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <ShieldCheck size={18} className="text-saffron-500" />
                    Credentials Encryption
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Passwords are never stored in plain text. Mongoose schema pre-save hooks intercept the registration or update flow to hash passwords using <code>bcryptjs</code> with 12 salting rounds. Incoming check matches are executed asynchronously using direct comparisons:
                  </p>
                  <pre className="text-[10px] bg-stone-100 dark:bg-stone-850 p-3 rounded-lg font-mono text-stone-700 dark:text-stone-300">
{`userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});`}
                  </pre>
                </div>

                {/* Session Signatures */}
                <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-gold-500">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Sliders size={18} className="text-gold-600" />
                    Stateless JWT Issuance
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Upon successful login matches, the backend signs a JSON Web Token (JWT) containing the User Object ID, username, and role profile. This token is configured with a 24-hour expiration duration. Client-side contexts intercept this token and cache it dynamically within memory buffers.
                  </p>
                  <pre className="text-[10px] bg-stone-100 dark:bg-stone-850 p-3 rounded-lg font-mono text-stone-700 dark:text-stone-300">
{`const jwt = require('jsonwebtoken');
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
};`}
                  </pre>
                </div>

                {/* Access Protection */}
                <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-crimson-600">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Server size={18} className="text-crimson-600" />
                    Express Authentication Guards
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    The backend endpoint pipeline incorporates <code>authMiddleware.js</code> to intercept request headers, extract the bearer token, verify its signature, and attach the active User profile to the Express request context:
                  </p>
                  <pre className="text-[10px] bg-stone-100 dark:bg-stone-850 p-3 rounded-lg font-mono text-stone-700 dark:text-stone-300">
{`const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('Not authorized, no token');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id).select('-password');
  next();
});`}
                  </pre>
                </div>

                {/* Role Authorization */}
                <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-emerald-600">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <UserCheck size={18} className="text-emerald-600" />
                    Role-Based Access Control (RBAC)
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    To prevent role privilege escalations, <code>roleMiddleware.js</code> blocks requests if the attached user role does not match permissions. For instance, only users with the <code>'pandit'</code> role can modify calendar schedules, and only <code>'admin'</code> roles can verify priest applications:
                  </p>
                  <pre className="text-[10px] bg-stone-100 dark:bg-stone-850 p-3 rounded-lg font-mono text-stone-700 dark:text-stone-300">
{`const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};`}
                  </pre>
                </div>
              </div>
            </div>
          </section>


                    {/* 13. User Module */}
          <section id="user-module" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Layout size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                13. User (Devotee) Module
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card text-base flex flex-col gap-4">
                <p>
                  The Devotee portal is designed to provide users with a clean interface to discover authentic Hindu ceremonies, match with verified priests, schedule booking dates, and communicate about ceremony parameters:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Search and Discovery */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-saffron-500 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Search size={18} className="text-saffron-500" />
                    Pandit Discovery & Filters
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Devotees can browse a directory of verified priests. They can search by name, locate priests in their city or region, set experience levels, filter by languages spoken (e.g., Kannada, Sanskrit), and select specific rituals. Only verified, active profiles are shown.
                  </p>
                  <ul className="text-xs flex flex-col gap-2 pl-0 list-none font-medium">
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Full name and bio preview cards</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Pricing tags displayed per ritual specialty</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Ratings and years of experience badges</li>
                  </ul>
                </div>

                {/* Scheduling Wizard */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-gold-500 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Calendar size={18} className="text-gold-600" />
                    Checkout & Scheduling Wizard
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Once a devotee selects a Pandit for a specific ritual, the scheduling wizard opens a calendar showing only the Pandit's available dates. Selecting a date displays its active timeslots (e.g. <code>"09:00 AM - 11:00 AM"</code>) to prevent overlaps.
                  </p>
                  <ul className="text-xs flex flex-col gap-2 pl-0 list-none font-medium">
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Address input with landmark and pin codes</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Temple options featuring temple address forms</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Special notes field for custom family gotras</li>
                  </ul>
                </div>

                {/* Booking Timeline */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-crimson-600 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Sliders size={18} className="text-crimson-600" />
                    Fulfillment & Timeline Tracking
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    The Devotee Dashboard organizes requests into status categories: pending, accepted, rejected, completed, and cancelled. Status transitions update on a live timeline, showing administrative notes and rejection explanations.
                  </p>
                  <ul className="text-xs flex flex-col gap-2 pl-0 list-none font-medium">
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Visual badges showing booking status</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Cancellation trigger buttons for devotees</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Material lists and pricing summaries</li>
                  </ul>
                </div>

                {/* Direct Communications */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-emerald-600 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <MessageSquare size={18} className="text-emerald-600" />
                    Embedded Messaging Panel
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Each booking details page features an integrated chat client. Devotees can communicate directly with the assigned priest about materials, custom dates, or venue details, with unread counters and read status check marks.
                  </p>
                  <ul className="text-xs flex flex-col gap-2 pl-0 list-none font-medium">
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Message tracking linked to booking context</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ WhatsApp-style read receipt ticks</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Client-side unread message calculations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>


                    {/* 14. Pandit Module */}
          <section id="pandit-module" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Calendar size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                14. Pandit (Priest) Module
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card text-base flex flex-col gap-4">
                <p>
                  The Pandit Portal provides priests with tools to manage their profiles, update pricing, schedule their availability calendar, and accept or reject devotee booking requests:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Customization */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-saffron-500 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <UserCheck size={18} className="text-saffron-500" />
                    Profile & Photo Manager
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Priests build their public profiles by detailing years of experience, a biographical summary, city/state details, and uploading a profile photo. The photo is uploaded directly to Cloudinary using in-memory file stream buffers.
                  </p>
                  <ul className="text-xs flex flex-col gap-2 pl-0 list-none font-medium">
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Bio input fields with character validation checks</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Photo upload to Cloudinary (no local cache)</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Languages spoken checklist options</li>
                  </ul>
                </div>

                {/* Custom Rates Map */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-gold-500 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Sliders size={18} className="text-gold-600" />
                    Custom Rates Configuration
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Pandits set their own rates for each ritual they support. This configuration is stored in a Mongoose Map, allowing rates to be updated without altering the main database schema.
                  </p>
                  <pre className="text-[10px] bg-stone-100 dark:bg-stone-850 p-3 rounded-lg font-mono text-stone-700 dark:text-stone-300">
{`// Save pricing updates
const updatePricing = async (req, res) => {
  const pandit = await Pandit.findOne({ userId: req.user.id });
  pandit.pricing = req.body.pricing; // ritualId -> price
  await pandit.save();
  res.json(pandit);
};`}
                  </pre>
                </div>

                {/* Timeslots Manager */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-crimson-600 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Calendar size={18} className="text-crimson-600" />
                    Availability Slot Editor
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Priests define their availability on a daily calendar. For each date, they add specific time slots (e.g. <code>"06:00 AM - 09:00 AM"</code>), which are validated for time formatting and checked against existing slots to prevent overlap conflicts.
                  </p>
                  <ul className="text-xs flex flex-col gap-2 pl-0 list-none font-medium">
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Date-specific timeslot arrays</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Check constraints to block scheduling clashes</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Custom slot deletion triggers</li>
                  </ul>
                </div>

                {/* Request Pipeline */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-emerald-600 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    Fulfillment Pipeline
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Incoming booking requests appear on the Pandit Dashboard. The priest reviews the date, location type (home or temple), address details, and special instructions. The priest can accept, reject with a note, or complete the booking.
                  </p>
                  <ul className="text-xs flex flex-col gap-2 pl-0 list-none font-medium">
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Acceptance locks availability slots</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Rejections release slots automatically</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Completion marks booking status "completed"</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>


                    {/* 15. Admin Module */}
          <section id="admin-module" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <UserCheck size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                15. Admin Module & Moderation Console
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card text-base flex flex-col gap-4">
                <p>
                  The Administrative Dashboard provides platform managers with oversight of user accounts, priest credentials, active bookings, and catalog data:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Credentials Auditing */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-saffron-500 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Shield size={18} className="text-saffron-500" />
                    Pandit Credentials Verification
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    To maintain trust on the platform, new Pandit signups do not appear in public searches until approved by an admin. Admins review each priest's application, verifying their credentials, experience claims, and certifications.
                  </p>
                  <ul className="text-xs flex flex-col gap-2 pl-0 list-none font-medium">
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Applications list filtered by "pending" status</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Verification notes log explanations for actions</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Validation updates Pandit profiles to "verified"</li>
                  </ul>
                </div>

                {/* Catalog Controller */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-gold-500 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Sliders size={18} className="text-gold-600" />
                    Ritual Catalog Management
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Admins manage the database of Hindu rituals. They can create, edit, or deactivate rituals, updating names, categories, descriptions, typical durations, required materials, estimated costs, and search keywords.
                  </p>
                  <ul className="text-xs flex flex-col gap-2 pl-0 list-none font-medium">
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ CRUD operations on rituals</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Automatic slug generators</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Status toggle switches for rituals</li>
                  </ul>
                </div>

                {/* Moderation Controls */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-crimson-600 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <AlertTriangle size={18} className="text-crimson-600" />
                    Moderation & User Suspension
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Admins can suspend users or Pandits who violate platform guidelines. Suspended accounts are blocked from accessing dashboards, and their profiles are hidden from public search results.
                  </p>
                  <pre className="text-[10px] bg-stone-100 dark:bg-stone-850 p-3 rounded-lg font-mono text-stone-700 dark:text-stone-300">
{`// Suspend a user profile
const toggleSuspend = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isSuspended = !user.isSuspended;
  user.adminActionHistory.push({
    actionType: user.isSuspended ? 'suspended' : 'reactivated',
    adminId: req.user.id,
    reason: req.body.reason
  });
  await user.save();
  res.json(user);
};`}
                  </pre>
                </div>

                {/* Administrative Oversight */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-emerald-600 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Activity size={18} className="text-emerald-600" />
                    Analytics & Platform Statistics
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    The admin panel aggregates key metrics from the database, displaying total user counts, verified/pending Pandit numbers, booking volumes, and transaction statuses to help monitor platform activity.
                  </p>
                  <ul className="text-xs flex flex-col gap-2 pl-0 list-none font-medium">
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Active user counts</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Pending verification applications count</li>
                    <li className="p-2.5 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">✓ Booking statuses distributions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>


                    {/* 16. Ritual Management */}
          <section id="ritual-management" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Sliders size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                16. Ritual Catalog Management
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card text-base flex flex-col gap-4">
                <p>
                  PujaConnect standardizes religious services using a structured catalog. Each ritual contains specific parameters, including descriptions, typical durations, material lists, price limits, and categorization:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Catalog Schema Attributes */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-saffron-500 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Database size={18} className="text-saffron-500" />
                    Ritual Schema Fields
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    The schema models both administrative options and public content details, helping devotees understand the significance of each ceremony:
                  </p>
                  <ul className="text-xs flex flex-col gap-2.5 pl-0 list-none font-medium">
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>• SEO Slug:</strong> URL-safe lowercase strings (e.g. <code>"griha-pravesh"</code>) for search engine indexing.
                    </li>
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>• Category Enum:</strong> Rituals are assigned to one of 12 categories, such as Griha Pujas, Marriage Ceremonies, or Festival Pujas.
                    </li>
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>• Material Checklist:</strong> Array of strings listing required materials (e.g., coconut, incense), helping devotees prepare for the ceremony.
                    </li>
                  </ul>
                </div>

                {/* Operational Details */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-gold-500 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Sliders size={18} className="text-gold-600" />
                    Operational & Pricing Parameters
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Operational details help coordinate scheduling and pricing:
                  </p>
                  <ul className="text-xs flex flex-col gap-2.5 pl-0 list-none font-medium">
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>• Duration Details:</strong> Numeric <code>durationMinutes</code> limits scheduling overlaps.
                    </li>
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>• Price Limits:</strong> Min/max bounds prevent pricing discrepancies.
                    </li>
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>• Image Assignments:</strong> Cloudinary assets illustrate the rituals visually.
                    </li>
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>• Featured & Popular:</strong> Boolean tags promote specific rituals on the homepage catalog.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>


                    {/* 17. Booking Workflow */}
          <section id="booking-workflow" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Activity size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                17. Booking Workflow & State Machine
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card text-base flex flex-col gap-4">
                <p>
                  The booking lifecycle in <strong>PujaConnect</strong> is managed by a state machine enforced via database transaction guards. The system coordinates timeslot allocations and releases slots automatically on status changes to prevent scheduling conflicts.
                </p>
              </div>

              {/* State Machine Flowchart Card */}
              <div className="p-6 rounded-2xl glass-card flex flex-col gap-6 border-t-4 border-t-saffron-500">
                <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                  <GitBranch size={16} className="text-saffron-500" />
                  Booking Lifecycle Transitions
                </h4>
                <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
                  {/* Step 1 */}
                  <div className="p-4 rounded-xl border border-saffron-500/20 bg-saffron-500/5 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-saffron-500 text-white text-xs font-bold font-mono">1</span>
                      <div>
                        <span className="font-bold text-stone-850 dark:text-white text-sm block">Pending Request Created</span>
                        <span className="text-[11px] text-stone-500 dark:text-stone-400">Checkout reserves the slot; Pandit receives a booking request.</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-saffron-500 text-white font-mono text-[9px] font-bold">PENDING</span>
                  </div>

                  <div className="flex justify-center text-stone-400">
                    <ArrowDown size={18} className="animate-bounce text-saffron-500" />
                  </div>

                  {/* Step 2 (Branching Options) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Approve branch */}
                    <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 shadow-sm flex flex-col justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">2A</span>
                        <span className="font-bold text-stone-850 dark:text-white text-xs">Pandit Accepts</span>
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">Moves status to Accepted. Locks scheduling calendars permanently.</p>
                      <span className="px-2 py-0.5 rounded bg-emerald-500 text-white font-mono text-[9px] font-bold self-start mt-2">ACCEPTED</span>
                    </div>

                    {/* Reject branch */}
                    <div className="p-4 rounded-xl border border-crimson-500/20 bg-crimson-500/5 shadow-sm flex flex-col justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-crimson-500 text-white text-[10px] font-bold">2B</span>
                        <span className="font-bold text-stone-850 dark:text-white text-xs">Pandit Rejects</span>
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">Requires custom explanation note. Instantly releases the availability slot.</p>
                      <span className="px-2 py-0.5 rounded bg-crimson-600 text-white font-mono text-[9px] font-bold self-start mt-2">REJECTED</span>
                    </div>
                  </div>

                  <div className="flex justify-center text-stone-400">
                    <ArrowDown size={18} className="text-gold-500" />
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 rounded-xl border border-gold-500/20 bg-gold-500/5 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold-500 text-white text-xs font-bold font-mono">3</span>
                      <div>
                        <span className="font-bold text-stone-850 dark:text-white text-sm block">Final Fulfillment</span>
                        <span className="text-[11px] text-stone-500 dark:text-stone-400">Devotee cancels, or Pandit marks ceremony completed on site.</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-gold-500 text-white font-mono text-[9px] font-bold">COMPLETED / CANCELLED</span>
                  </div>
                </div>
              </div>

              {/* Automatic Slot Release logic */}
              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-gold-500">
                <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                  <Shield size={18} className="text-gold-600" />
                  Automatic Slot Release Mechanics
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  When a booking is cancelled, rejected, or expires, a pre-save trigger in Mongoose automatically frees the associated availability slot, making it available for other devotees.
                </p>
                <pre className="text-xs bg-stone-100 dark:bg-stone-850 p-4 rounded-xl font-mono text-stone-700 dark:text-stone-300 overflow-x-auto">
{`bookingSchema.pre('save', async function (next) {
  if (this.isModified('status') && ['cancelled', 'rejected', 'expired'].includes(this.status)) {
    if (this.availabilitySlotId) {
      const Availability = mongoose.model('Availability');
      const availability = await Availability.findById(this.availabilitySlotId);
      if (availability) {
        const slot = availability.timeSlots.find(
          (s) => s.bookingId?.toString() === this._id.toString() || (s.time === this.time && s.isBooked)
        );
        if (slot) {
          slot.isBooked = false; // release slot
          await availability.save();
        }
      }
    }
  }
  next();
});`}
                </pre>
              </div>
            </div>
          </section>


                    {/* 18. Availability Management */}
          <section id="availability-management" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Calendar size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                18. Availability Management & Scheduling
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card text-base flex flex-col gap-4">
                <p>
                  Pandits define their work availability by creating daily slots. When a devotee schedules a ceremony, the system marks the selected slot as booked, referencing the associated Booking ID.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Conflict Prevention */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-saffron-500 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <ShieldCheck size={18} className="text-saffron-500" />
                    Conflict Prevention Logic
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    The scheduling engine prevents duplicate bookings at the database and application levels:
                  </p>
                  <ul className="text-xs flex flex-col gap-3 pl-0 list-none font-medium">
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>• Database Layer:</strong> A compound unique index <code>{"{ pandit: 1, date: 1 }"}</code> prevents multiple schedule documents for the same priest on the same day.
                    </li>
                    <li className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                      <strong>• Validation RegEx:</strong> Ensures slots are entered in a standardized time format (e.g. <code>"09:00 AM - 12:00 PM"</code>).
                    </li>
                  </ul>
                </div>

                {/* Timezone Normalization */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-gold-500 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Sliders size={18} className="text-gold-600" />
                    Timezone & Date Processing
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    To prevent timezone offsets from shifting availability dates (e.g. making a Saturday slot appear on Friday), the system normalizes all dates to UTC midnight before saving them to the database.
                  </p>
                  <pre className="text-[10px] bg-stone-100 dark:bg-stone-850 p-3 rounded-lg font-mono text-stone-700 dark:text-stone-300">
{`// Normalize date to UTC midnight
const date = new Date(req.body.date);
const utcMidnight = new Date(Date.UTC(
  date.getFullYear(),
  date.getMonth(),
  date.getDate()
));`}
                  </pre>
                </div>
              </div>
            </div>
          </section>


                    {/* 19. Messaging System */}
          <section id="messaging-system" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <MessageSquare size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                19. Messaging & Coordination System
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card text-base flex flex-col gap-4">
                <p>
                  PujaConnect includes a messaging system embedded directly within the booking documents. Storing messages as subdocument arrays inside each Booking record keeps conversations contextually linked to their bookings and simplifies data retrieval.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Data Locality */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-saffron-500 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Database size={18} className="text-saffron-500" />
                    Subdocument Storage
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Conversations are stored directly in the associated booking document. This design simplifies data queries and ensures that the booking details page can load all message histories in a single query.
                  </p>
                </div>

                {/* Read status receipts */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-gold-500 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <CheckCircle2 size={18} className="text-gold-600" />
                    Read receipts & counters
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    The messaging system tracks read statuses using an <code>isRead</code> flag and a <code>readBy</code> array. Unread message badges are calculated dynamically on the client side.
                  </p>
                </div>

                {/* Secure context validations */}
                <div className="p-6 rounded-2xl glass-card border-t-4 border-t-crimson-600 flex flex-col gap-4">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                    <Shield size={18} className="text-crimson-600" />
                    Secure Routing Access
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    To maintain privacy, only the devotee who created the booking and the assigned Pandit have access to read or send messages in a given chat thread.
                  </p>
                </div>
              </div>
            </div>
          </section>


                    {/* 20. Search & Filtering */}
          <section id="search-filtering" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Search size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                20. Search & Filtering Engine
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card text-base flex flex-col gap-4">
                <p>
                  The platform implements a multi-criteria search engine, allowing devotees to filter Pandits dynamically by location, languages spoken, experience levels, pricing, and ritual specialties.
                </p>
              </div>

              {/* Backend Queries Card */}
              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-t-4 border-t-saffron-500">
                <h4 className="font-bold text-stone-850 dark:text-white text-base flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                  <Sliders size={18} className="text-saffron-500" />
                  Dynamic Mongoose Queries & Database Indexes
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  The backend constructs dynamic Mongoose queries based on the active search filters, matching location names case-insensitively and checking arrays for spoken languages or supported rituals.
                </p>
                <pre className="text-xs bg-stone-100 dark:bg-stone-850 p-4 rounded-xl font-mono text-stone-700 dark:text-stone-300 overflow-x-auto">
{`// Dynamic Pandit search query
const query = { verificationStatus: 'verified', isActive: true };

if (city) {
  query['location.city'] = new RegExp('^' + city.trim() + '$', 'i');
}
if (languagesSpoken) {
  query.languagesSpoken = { $in: [languagesSpoken] };
}
if (yearsOfExperience) {
  query.yearsOfExperience = { $gte: Number(yearsOfExperience) };
}
if (ritualId) {
  query.supportedRituals = ritualId;
}

const pandits = await Pandit.find(query).populate('userId', 'name email phone');`}
                </pre>
              </div>
            </div>
          </section>


          {/* 21. Admin Verification Workflow */}
          <section id="admin-verification" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <UserCheck size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                21. Admin Verification Workflow
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4">
                <p>
                  Trust is central to PujaConnect. Every Pandit must pass an admin-managed verification pipeline before their profile becomes publicly visible. The workflow progresses through distinct status stages:
                </p>
              </div>
              <div className="flex flex-col gap-4 max-w-xl mx-auto w-full">
                <div className="p-4 rounded-xl border border-saffron-500/20 bg-saffron-500/5 flex items-center justify-between">
                  <div><span className="font-bold text-sm">Registration</span><br/><span className="text-xs text-stone-500 dark:text-stone-400">Pandit signs up and creates profile</span></div>
                  <span className="px-2 py-0.5 rounded bg-saffron-500 text-white font-mono text-[9px] font-bold">PENDING</span>
                </div>
                <div className="flex justify-center"><ArrowDown size={16} className="text-saffron-500" /></div>
                <div className="p-4 rounded-xl border border-gold-500/20 bg-gold-500/5 flex items-center justify-between">
                  <div><span className="font-bold text-sm">Admin Review</span><br/><span className="text-xs text-stone-500 dark:text-stone-400">Admin inspects credentials, bio, and photo</span></div>
                  <span className="px-2 py-0.5 rounded bg-gold-500 text-white font-mono text-[9px] font-bold">UNDER REVIEW</span>
                </div>
                <div className="flex justify-center"><ArrowDown size={16} className="text-gold-500" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center">
                    <span className="font-bold text-sm">Approved</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500 text-white font-mono text-[9px] font-bold block mt-2">VERIFIED</span>
                  </div>
                  <div className="p-4 rounded-xl border border-crimson-500/20 bg-crimson-500/5 text-center">
                    <span className="font-bold text-sm">Denied</span>
                    <span className="px-2 py-0.5 rounded bg-crimson-600 text-white font-mono text-[9px] font-bold block mt-2">REJECTED</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 22. Deployment Architecture */}
          <section id="deployment-architecture" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Server size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                22. Deployment Architecture
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              {/* Live URL banner */}
              <a href="https://puja-connect-ahy.vercel.app/" target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl border-2 border-saffron-500/40 bg-gradient-to-r from-saffron-500/10 to-gold-500/10 flex items-center justify-between gap-4 hover:border-saffron-500 transition-all duration-300 group cursor-pointer">
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-saffron-500" />
                  <div>
                    <span className="text-xs uppercase font-bold text-saffron-600 dark:text-saffron-400 block">Production URL</span>
                    <span className="text-sm font-semibold text-stone-850 dark:text-white">https://puja-connect-ahy.vercel.app/</span>
                  </div>
                </div>
                <ExternalLink size={16} className="text-saffron-500 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl glass-card border-t-4 border-t-saffron-500">
                  <span className="font-bold text-saffron-500 block text-sm mb-2">Frontend Host</span>
                  <p className="text-xs">Deployed on <strong>Vercel</strong> with automatic CI/CD from GitHub. A `vercel.json` rewrite rule maps all client-side routes to `/index.html` for SPA navigation.</p>
                </div>
                <div className="p-5 rounded-2xl glass-card border-t-4 border-t-gold-600">
                  <span className="font-bold text-gold-600 dark:text-gold-400 block text-sm mb-2">Backend Host</span>
                  <p className="text-xs">Deployed on <strong>Render</strong> as a containerized Node.js service with environment variables configured for MongoDB Atlas connection strings, JWT secrets, and Cloudinary credentials.</p>
                </div>
                <div className="p-5 rounded-2xl glass-card border-t-4 border-t-crimson-600">
                  <span className="font-bold text-crimson-600 dark:text-crimson-400 block text-sm mb-2">Database</span>
                  <p className="text-xs"><strong>MongoDB Atlas</strong> M0 cluster hosted on AWS. Configured with IP whitelisting, connection pooling, and automatic backups.</p>
                </div>
                <div className="p-5 rounded-2xl glass-card border-t-4 border-t-blue-500">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block text-sm mb-2">Media Storage</span>
                  <p className="text-xs"><strong>Cloudinary</strong> cloud storage for profile photos. Images are streamed directly from Multer's in-memory buffer, bypassing local disk writes entirely.</p>
                </div>
              </div>
            </div>
          </section>


          {/* 23. API Overview */}
          <section id="api-overview" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Code size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                23. API Overview
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <p className="text-sm">
                Below is the comprehensive API endpoint specification for the Express.js backend. All protected routes require a valid JWT Bearer token in the Authorization header.
              </p>
              <div className="p-6 rounded-2xl glass-card font-mono text-[11px] overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-light-border dark:border-dark-border text-saffron-500 font-bold text-xs">
                      <th className="py-3 pr-4">Method</th>
                      <th className="py-3 pr-4">Endpoint</th>
                      <th className="py-3 pr-4">Auth Scope</th>
                      <th className="py-3">Functional Operation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light-border/40 dark:divide-dark-border/40">
                    {/* Auth Routes */}
                    <tr><td className="py-3 pr-4 font-bold text-emerald-500">POST</td><td className="py-3 pr-4">/api/auth/register</td><td className="py-3 pr-4 text-stone-400">Public</td><td className="py-3">Create devotee or pandit account. Hashes password with bcrypt.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-emerald-500">POST</td><td className="py-3 pr-4">/api/auth/login</td><td className="py-3 pr-4 text-stone-400">Public</td><td className="py-3">Validate credentials & return signed JWT token.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-blue-500">GET</td><td className="py-3 pr-4">/api/auth/me</td><td className="py-3 pr-4 text-stone-400">Any Authenticated</td><td className="py-3">Fetch current user profile from JWT claims.</td></tr>
                    {/* Pandit Routes */}
                    <tr><td className="py-3 pr-4 font-bold text-blue-500">GET</td><td className="py-3 pr-4">/api/pandits</td><td className="py-3 pr-4 text-stone-400">Public</td><td className="py-3">Query verified Pandits with multi-criteria filters.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-blue-500">GET</td><td className="py-3 pr-4">/api/pandits/:id</td><td className="py-3 pr-4 text-stone-400">Public</td><td className="py-3">Fetch single Pandit public profile with populated rituals.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-emerald-500">POST</td><td className="py-3 pr-4">/api/pandits/profile</td><td className="py-3 pr-4 text-gold-600">Pandit</td><td className="py-3">Create Pandit profile with bio, experience, photo upload.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-purple-500">PUT</td><td className="py-3 pr-4">/api/pandits/profile</td><td className="py-3 pr-4 text-gold-600">Pandit</td><td className="py-3">Update existing Pandit profile fields and pricing maps.</td></tr>
                    {/* Ritual Routes */}
                    <tr><td className="py-3 pr-4 font-bold text-blue-500">GET</td><td className="py-3 pr-4">/api/rituals</td><td className="py-3 pr-4 text-stone-400">Public</td><td className="py-3">List all rituals with category filtering and search.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-blue-500">GET</td><td className="py-3 pr-4">/api/rituals/:id</td><td className="py-3 pr-4 text-stone-400">Public</td><td className="py-3">Fetch ritual details: description, duration, materials, cost.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-emerald-500">POST</td><td className="py-3 pr-4">/api/rituals</td><td className="py-3 pr-4 text-crimson-600">Admin</td><td className="py-3">Create new ritual entry in the platform catalog.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-purple-500">PUT</td><td className="py-3 pr-4">/api/rituals/:id</td><td className="py-3 pr-4 text-crimson-600">Admin</td><td className="py-3">Update existing ritual details and pricing bounds.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-red-500">DELETE</td><td className="py-3 pr-4">/api/rituals/:id</td><td className="py-3 pr-4 text-crimson-600">Admin</td><td className="py-3">Remove ritual from the catalog permanently.</td></tr>
                    {/* Booking Routes */}
                    <tr><td className="py-3 pr-4 font-bold text-emerald-500">POST</td><td className="py-3 pr-4">/api/bookings</td><td className="py-3 pr-4 text-saffron-600">Devotee</td><td className="py-3">Create booking request with date, time, address details.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-blue-500">GET</td><td className="py-3 pr-4">/api/bookings</td><td className="py-3 pr-4 text-stone-400">Authenticated</td><td className="py-3">List all bookings for the authenticated user/Pandit.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-blue-500">GET</td><td className="py-3 pr-4">/api/bookings/:id</td><td className="py-3 pr-4 text-stone-400">Participant</td><td className="py-3">Get single booking details with populated references.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-purple-500">PUT</td><td className="py-3 pr-4">/api/bookings/:id/accept</td><td className="py-3 pr-4 text-gold-600">Pandit</td><td className="py-3">Accept booking, lock availability slot permanently.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-purple-500">PUT</td><td className="py-3 pr-4">/api/bookings/:id/reject</td><td className="py-3 pr-4 text-gold-600">Pandit</td><td className="py-3">Reject booking with reason, release availability slot.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-purple-500">PUT</td><td className="py-3 pr-4">/api/bookings/:id/complete</td><td className="py-3 pr-4 text-gold-600">Pandit</td><td className="py-3">Mark booking ceremony as completed on-site.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-purple-500">PUT</td><td className="py-3 pr-4">/api/bookings/:id/cancel</td><td className="py-3 pr-4 text-saffron-600">Devotee</td><td className="py-3">Cancel pending/accepted booking. Releases slot.</td></tr>
                    {/* Messaging */}
                    <tr><td className="py-3 pr-4 font-bold text-blue-500">GET</td><td className="py-3 pr-4">/api/bookings/:id/messages</td><td className="py-3 pr-4 text-stone-400">Participant</td><td className="py-3">Retrieve message thread for a booking.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-emerald-500">POST</td><td className="py-3 pr-4">/api/bookings/:id/messages</td><td className="py-3 pr-4 text-stone-400">Participant</td><td className="py-3">Send new message, append to booking subdocument.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-purple-500">PUT</td><td className="py-3 pr-4">/api/bookings/:id/messages/read</td><td className="py-3 pr-4 text-stone-400">Participant</td><td className="py-3">Mark all unread messages as read for the user.</td></tr>
                    {/* Availability */}
                    <tr><td className="py-3 pr-4 font-bold text-emerald-500">POST</td><td className="py-3 pr-4">/api/availability</td><td className="py-3 pr-4 text-gold-600">Pandit</td><td className="py-3">Create availability slot with date, start/end times.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-blue-500">GET</td><td className="py-3 pr-4">/api/availability/:panditId</td><td className="py-3 pr-4 text-stone-400">Public</td><td className="py-3">Get all available slots for a specific Pandit.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-red-500">DELETE</td><td className="py-3 pr-4">/api/availability/:id</td><td className="py-3 pr-4 text-gold-600">Pandit</td><td className="py-3">Delete an unbooked availability slot.</td></tr>
                    {/* Admin */}
                    <tr><td className="py-3 pr-4 font-bold text-blue-500">GET</td><td className="py-3 pr-4">/api/admin/stats</td><td className="py-3 pr-4 text-crimson-600">Admin</td><td className="py-3">Aggregate dashboard statistics (counts, status).</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-blue-500">GET</td><td className="py-3 pr-4">/api/admin/pandits</td><td className="py-3 pr-4 text-crimson-600">Admin</td><td className="py-3">List all Pandits including pending verification.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-purple-500">PUT</td><td className="py-3 pr-4">/api/admin/pandits/:id/verify</td><td className="py-3 pr-4 text-crimson-600">Admin</td><td className="py-3">Approve Pandit profile, set status to verified.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-purple-500">PUT</td><td className="py-3 pr-4">/api/admin/pandits/:id/reject</td><td className="py-3 pr-4 text-crimson-600">Admin</td><td className="py-3">Reject Pandit application with reason.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-blue-500">GET</td><td className="py-3 pr-4">/api/admin/users</td><td className="py-3 pr-4 text-crimson-600">Admin</td><td className="py-3">List all registered devotee accounts.</td></tr>
                    <tr><td className="py-3 pr-4 font-bold text-blue-500">GET</td><td className="py-3 pr-4">/api/admin/bookings</td><td className="py-3 pr-4 text-crimson-600">Admin</td><td className="py-3">View all platform bookings with status filters.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 24. Security Features */}
          <section id="security-features" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <ShieldCheck size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                24. Security Features
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl glass-card border-l-4 border-l-saffron-500">
                <span className="font-bold text-saffron-500 block text-sm mb-2">Stateless JWT Authentication</span>
                <p className="text-xs">Session tokens are signed with HS256 using a server-side secret. Tokens contain userId, username, and role. No server-side session storage required.</p>
              </div>
              <div className="p-5 rounded-2xl glass-card border-l-4 border-l-gold-600">
                <span className="font-bold text-gold-600 dark:text-gold-400 block text-sm mb-2">bcrypt Password Hashing</span>
                <p className="text-xs">All passwords are one-way hashed using bcryptjs with 12 salt rounds on Mongoose pre-save hooks. Raw passwords never touch the database.</p>
              </div>
              <div className="p-5 rounded-2xl glass-card border-l-4 border-l-crimson-600">
                <span className="font-bold text-crimson-600 dark:text-crimson-400 block text-sm mb-2">Role-Based Access Control</span>
                <p className="text-xs">Layered middleware chain: `protect` verifies JWT validity, then `requireRole('admin')` or `requireRole('pandit')` gates access per-route.</p>
              </div>
              <div className="p-5 rounded-2xl glass-card border-l-4 border-l-blue-500">
                <span className="font-bold text-blue-600 dark:text-blue-400 block text-sm mb-2">In-Memory File Streaming</span>
                <p className="text-xs">Multer MemoryStorage prevents temporary disk writes. Image buffers stream directly to Cloudinary, eliminating local file exposure vectors.</p>
              </div>
              <div className="p-5 rounded-2xl glass-card border-l-4 border-l-emerald-500">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-sm mb-2">CORS Policy</span>
                <p className="text-xs">Configured `cors` middleware with explicit origin whitelisting for the Vercel frontend domain, preventing unauthorized cross-origin requests.</p>
              </div>
              <div className="p-5 rounded-2xl glass-card border-l-4 border-l-purple-500">
                <span className="font-bold text-purple-600 dark:text-purple-400 block text-sm mb-2">Environment Variables</span>
                <p className="text-xs">All secrets (MongoDB URI, JWT_SECRET, Cloudinary keys) stored in environment variables. Never committed to version control via `.gitignore`.</p>
              </div>
            </div>
          </section>

          {/* 25. Future Enhancements */}
          <section id="future-enhancements" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Sparkles size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                25. Future Enhancements
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                <span className="font-bold text-saffron-500 block text-sm mb-2">💳 Payment Integration</span>
                <p className="text-xs text-stone-600 dark:text-stone-400">Stripe/Razorpay escrow payment routing with automatic settlement upon ceremony completion confirmation.</p>
              </div>
              <div className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                <span className="font-bold text-gold-600 dark:text-gold-400 block text-sm mb-2">🌐 Multi-Language Support</span>
                <p className="text-xs text-stone-600 dark:text-stone-400">React-i18n integration for Hindi, Kannada, Tamil, Telugu, and other regional language translations.</p>
              </div>
              <div className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                <span className="font-bold text-crimson-600 dark:text-crimson-400 block text-sm mb-2">📹 Live Streaming</span>
                <p className="text-xs text-stone-600 dark:text-stone-400">WebRTC-based live video streaming for remote family members to participate in ceremonies virtually.</p>
              </div>
              <div className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                <span className="font-bold text-purple-600 dark:text-purple-400 block text-sm mb-2">⭐ Rating & Reviews</span>
                <p className="text-xs text-stone-600 dark:text-stone-400">Post-ceremony rating system with verified reviews to build trust and reputation for Pandits.</p>
              </div>
              <div className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                <span className="font-bold text-blue-600 dark:text-blue-400 block text-sm mb-2">🔔 Push Notifications</span>
                <p className="text-xs text-stone-600 dark:text-stone-400">Firebase Cloud Messaging for real-time booking status updates, new message alerts, and reminders.</p>
              </div>
              <div className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-sm mb-2">📱 Native Mobile Apps</span>
                <p className="text-xs text-stone-600 dark:text-stone-400">React Native mobile applications for iOS and Android with offline-first capabilities.</p>
              </div>
              <div className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-sm mb-2">🌙 Muhurat Calculator</span>
                <p className="text-xs text-stone-600 dark:text-stone-400">Automated auspicious timing (Muhurat) calculations based on Hindu Panchang for ceremony scheduling.</p>
              </div>
              <div className="p-5 rounded-2xl border border-light-border dark:border-dark-border bg-stone-100/30 dark:bg-dark-surface/30">
                <span className="font-bold text-amber-600 dark:text-amber-400 block text-sm mb-2">📧 Email Notifications</span>
                <p className="text-xs text-stone-600 dark:text-stone-400">Nodemailer integration for booking confirmations, status change alerts, and weekly digest emails.</p>
              </div>
            </div>
          </section>

          {/* 26. Challenges Faced */}
          <section id="challenges-faced" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <AlertTriangle size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                26. Challenges Faced & Resolutions
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-l-4 border-l-crimson-600">
                <h4 className="font-bold text-stone-850 dark:text-white text-base">Challenge 1: Memory Upload Streams</h4>
                <p className="text-sm">
                  Writing uploaded photos to local disk caches is slow and risks leaking files. I resolved this by using Multer's in-memory storage buffer, streaming files directly to Cloudinary via resource upload streams.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-l-4 border-l-gold-500">
                <h4 className="font-bold text-stone-850 dark:text-white text-base">Challenge 2: Concurrent Overlapping Calendars</h4>
                <p className="text-sm">
                  Checking slots overlaps dynamically while preventing double-bookings. I developed a check middleware script that validates proposed dates against standard durations and enforces a strict 1-hour transit buffer gap.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-l-4 border-l-saffron-500">
                <h4 className="font-bold text-stone-850 dark:text-white text-base">Challenge 3: UTC Time zone Discrepancies</h4>
                <p className="text-sm">
                  Timezone calculations for auspicious times shifted incorrectly across regions. I normalized all database inputs to save UTC timestamps and used `date-fns` formatting to offset local client times dynamically.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-l-4 border-l-blue-500">
                <h4 className="font-bold text-stone-850 dark:text-white text-base">Challenge 4: Legacy Location Schema Setters</h4>
                <p className="text-sm">
                  Older booking records used a mixed object schema, which crashed Mongoose when loading documents. I resolved this by coding pre-save hydration setters that parse incoming objects and normalize them back to strings.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-l-4 border-l-indigo-500">
                <h4 className="font-bold text-stone-850 dark:text-white text-base">Challenge 5: Stateless JWT Route Guards</h4>
                <p className="text-sm">
                  Checking user states while checking endpoints. I developed layered middlewares (`protect` + `requireRole`) that verify JWT authentication claims and enforce RBAC properties on endpoints.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-l-4 border-l-emerald-500">
                <h4 className="font-bold text-stone-850 dark:text-white text-base">Challenge 6: CORS Cross-Origin Deployment</h4>
                <p className="text-sm">
                  Frontend on Vercel and backend on Render created CORS policy failures. I configured explicit origin whitelisting in the Express CORS middleware, allowing only the production Vercel domain to make API calls.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-l-4 border-l-purple-500">
                <h4 className="font-bold text-stone-850 dark:text-white text-base">Challenge 7: SPA Client-Side Routing on Vercel</h4>
                <p className="text-sm">
                  Direct URL access to React Router routes returned 404 on Vercel since no server-side routes existed. I added a `vercel.json` configuration file with rewrite rules that redirects all paths to `/index.html`, letting React Router handle navigation.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4 border-l-4 border-l-amber-500">
                <h4 className="font-bold text-stone-850 dark:text-white text-base">Challenge 8: Responsive Multi-Dashboard Design</h4>
                <p className="text-sm">
                  Designing three completely different dashboard experiences (User, Pandit, Admin) that work on both desktop and mobile was complex. I used Tailwind's responsive breakpoints with a mobile-first approach and dedicated layout components for each role.
                </p>
              </div>
            </div>
          </section>

          {/* 27. Conclusion */}
          <section id="conclusion" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <CheckCircle2 size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                27. Conclusion
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl glass-card flex flex-col gap-4">
                <p className="text-base">
                  PujaConnect successfully digitizes a traditional, unorganized sector. By introducing transparent profile search engines, slot schedules validations (conflict buffer checks), and secure direct messaging interfaces, it establishes a premium ecosystem connecting devotees and Pandits. The project is production-ready and fully deployed.
                </p>
                <p className="text-base">
                  This project demonstrates a comprehensive application of the MERN stack in a real-world domain, showcasing skills in database modeling, RESTful API design, authentication systems, cloud deployment, and responsive UI engineering.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl border border-light-border dark:border-dark-border bg-saffron-500/5 text-center">
                  <span className="text-2xl font-bold text-saffron-500 block">6</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">MongoDB Collections</span>
                </div>
                <div className="p-4 rounded-2xl border border-light-border dark:border-dark-border bg-gold-500/5 text-center">
                  <span className="text-2xl font-bold text-gold-600 dark:text-gold-400 block">30+</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">API Endpoints</span>
                </div>
                <div className="p-4 rounded-2xl border border-light-border dark:border-dark-border bg-crimson-500/5 text-center">
                  <span className="text-2xl font-bold text-crimson-600 dark:text-crimson-400 block">3</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">Role Dashboards</span>
                </div>
                <div className="p-4 rounded-2xl border border-light-border dark:border-dark-border bg-emerald-500/5 text-center">
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 block">100+</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">Ritual Catalog</span>
                </div>
              </div>
              {/* Final live link */}
              <a href="https://puja-connect-ahy.vercel.app/" target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl border-2 border-saffron-500/40 bg-gradient-to-r from-saffron-500/10 to-gold-500/10 flex items-center justify-between gap-4 hover:border-saffron-500 transition-all duration-300 group cursor-pointer">
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-saffron-500" />
                  <div>
                    <span className="text-xs uppercase font-bold text-saffron-600 dark:text-saffron-400 block">Visit PujaConnect Live</span>
                    <span className="text-sm font-semibold text-stone-850 dark:text-white">https://puja-connect-ahy.vercel.app/</span>
                  </div>
                </div>
                <ExternalLink size={16} className="text-saffron-500 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </section>

          {/* Table of screenshots */}
          <section id="project-screenshots" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Layout size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                Project Screenshots Guide
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageCard title="Home Page" caption="Premium spiritual theme featuring Cormorant Garamond typography and saffron color palettes." gradientClass="from-saffron-500/10 to-gold-500/10" />
              <ImageCard title="Login" caption="Role-based login interface directing users, pandits, and admins to their respective dashboards." gradientClass="from-gold-500/10 to-crimson-500/10" />
              <ImageCard title="Registration" caption="Secure onboarding with phone checks, regional state selections, and validation guides." gradientClass="from-crimson-500/10 to-saffron-500/10" />
              <ImageCard title="Ritual List" caption="Searchable catalog representing 100+ Hindu ceremonies categorized dynamically." gradientClass="from-saffron-500/10 to-gold-500/10" />
              <ImageCard title="Ritual Details" caption="Public description page outlining puja significance, durations, and standard cost lists." gradientClass="from-gold-500/10 to-crimson-500/10" />
              <ImageCard title="Pandit Search" caption="Filters for experiences, spoken languages, locations, cities, and active credentials." gradientClass="from-crimson-500/10 to-saffron-500/10" />
              <ImageCard title="Pandit Profile" caption="Showcases verification flags, pricing mappings per ritual, bio, and photo fields." gradientClass="from-saffron-500/10 to-gold-500/10" />
              <ImageCard title="Booking Flow" caption="Checkout scheduler where devotees choose dates, addresses, and select active availability slots." gradientClass="from-gold-500/10 to-crimson-500/10" />
              <ImageCard title="User Dashboard" caption="Timeline status mapping representing requested ceremonies, histories, and coordinates." gradientClass="from-crimson-500/10 to-saffron-500/10" />
              <ImageCard title="Pandit Dashboard" caption="Availability scheduler calendar and client requests approval pipeline." gradientClass="from-saffron-500/10 to-gold-500/10" />
              <ImageCard title="Admin Dashboard" caption="Verification review queues, catalog editor, and user suspension switches." gradientClass="from-gold-500/10 to-crimson-500/10" />
              <ImageCard title="Availability Management" caption="Pandits build, edit, or delete custom calendar timeframes with overlapping check guards." gradientClass="from-crimson-500/10 to-saffron-500/10" />
              <ImageCard title="Booking Details" caption="Detailed page displaying addresses, check sheets, and access coordinates." gradientClass="from-saffron-500/10 to-gold-500/10" />
              <ImageCard title="Chat System" caption="Integrated messaging interface featuring unread counters and read status indicators." gradientClass="from-gold-500/10 to-crimson-500/10" />
              <ImageCard title="Mobile View" caption="Fully responsive layout optimized for touch screens and mobile web browsers." isMobile={true} gradientClass="from-crimson-500/10 to-saffron-500/10" />
            </div>
          </section>

          {/* 29. Access Credentials */}
          <section id="access-credentials" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 border-b border-light-border dark:border-dark-border pb-3">
              <span className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <ShieldCheck size={22} />
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-display">
                29. Access Credentials
              </h2>
            </div>

            <div className="p-6 rounded-2xl border-2 border-saffron-500/30 bg-gradient-to-br from-saffron-500/10 via-gold-500/5 to-crimson-500/5 shadow-lg shadow-saffron-500/10">
              <div className="flex flex-col gap-4 mb-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron-600 dark:text-saffron-400">
                  Important Login Details
                </p>
                <p className="text-sm text-stone-700 dark:text-stone-300">
                  Keep these credentials for reference. The pandit email uses the format <span className="font-semibold">pandit(number)@pujaconnect.com</span>, where any number from 1 to 500 can replace the brackets. Example: <span className="font-semibold">pandit500@pujaconnect.com</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/80 dark:bg-dark-surface/80 border border-saffron-500/20 backdrop-blur-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-saffron-600 dark:text-saffron-400 mb-3">Admin Account</p>
                  <div className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                    <p><span className="font-semibold">Mail:</span> admin@pujaconnect.com</p>
                    <p><span className="font-semibold">Password:</span> Admin@123</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/80 dark:bg-dark-surface/80 border border-gold-500/20 backdrop-blur-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400 mb-3">Pandit Account</p>
                  <div className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                    <p><span className="font-semibold">Mail:</span> pandit(number)@pujaconnect.com</p>
                    <p><span className="font-semibold">Password:</span> Pandit@123</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">Example: pandit500@pujaconnect.com</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Page Navigation */}
          <div className="flex items-center justify-between border-t border-light-border dark:border-dark-border pt-8 mt-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-saffron-500 text-saffron-600 dark:text-saffron-400 hover:bg-saffron-50 dark:hover:bg-saffron-900/20 transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Previous: Problem Statement</span>
            </Link>
            <div className="w-1/2" />
          </div>

        </div>
      </div>
    </div>
  );
}
