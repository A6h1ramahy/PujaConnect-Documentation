import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Target, Compass, Sparkles, AlertCircle, Layout, Cpu, 
  GitBranch, Database, Activity, CheckCircle2, ShieldAlert, Award, 
  ArrowRight, Heart, Star, BadgeCheck, Users, Calendar, MessageSquare, ListCollapse
} from 'lucide-react';

const SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'problem-statement', label: 'Problem Statement' },
  { id: 'primary-objectives', label: 'Primary Objectives' },
  { id: 'secondary-objectives', label: 'Secondary Objectives' },
  { id: 'scope-of-product', label: 'Scope of the Product' },
  { id: 'key-features', label: 'Key Features & Functional Requirements' },
  { id: 'non-functional-reqs', label: 'Non-Functional Requirements' },
  { id: 'technology-stack', label: 'Technology Stack (Suggested)' },
  { id: 'user-flow', label: 'User Flow (High-Level)' },
  { id: 'data-requirements', label: 'Data Requirements' },
  { id: 'kpis', label: 'Key Performance Indicators (KPIs)' },
  { id: 'assumptions-constraints', label: 'Assumptions & Constraints' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'expected-impact', label: 'Expected Impact' },
  { id: 'future-enhancements', label: 'Future Enhancements' }
];

export default function ProblemStatement() {
  const [activeSection, setActiveSection] = useState('context');
  const sectionRefs = useRef({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is in the center
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90; // offset for sticky navbars
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Section */}
      <div className="text-center mb-16 relative overflow-hidden p-8 rounded-3xl bg-gradient-to-tr from-saffron-500/5 via-gold-500/5 to-crimson-500/5 border border-light-border/40 dark:border-dark-border/40">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 border border-saffron-500/20">
            <Award size={12} />
            Unified Mentor
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20">
            SmartPuja
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/20">
            Official Problem Statement
          </span>
        </div>
        <p className="text-xs uppercase tracking-widest font-bold text-saffron-500 mb-1">
          Technical Documentation
        </p>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-stone-900 dark:text-white leading-tight">
          PujaConnect – Online Pandit & Puja Booking Platform
        </h1>
        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 mt-4 max-w-3xl mx-auto leading-relaxed">
          Detailed guide and project requirements for the PujaConnect – Online Pandit & Puja Booking Platform analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sticky Sidebar Navigation */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto pr-4 select-none">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 px-2">
              Sections
            </h3>
            <ul className="flex flex-col gap-1.5 border-l-2 border-light-border dark:border-dark-border">
              {SECTIONS.map((sec) => (
                <li key={sec.id}>
                  <button
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left pl-4 py-1.5 text-sm transition-all duration-200 border-l-2 -ml-[2px] ${
                      activeSection === sec.id
                        ? 'text-saffron-600 dark:text-saffron-400 font-bold border-saffron-500'
                        : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 border-transparent'
                    }`}
                  >
                    {sec.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-14">
          
          {/* Context */}
          <section id="context" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <BookOpen size={22} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Context</h2>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-light-border dark:border-dark-border leading-relaxed text-stone-700 dark:text-stone-300">
              A service-based digital platform that enables users to discover, compare, and book verified Pandits for religious ceremonies such as Satyanarayan Katha, Naamkaran, Griha Pravesh, Havan, Mundan, and other rituals. Services can be booked for home-based pujas or temple-based ceremonies, with transparent pricing, availability, and ritual details.
            </div>
          </section>

          {/* Problem Statement */}
          <section id="problem-statement" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-crimson-500/10 text-crimson-600 dark:text-crimson-400">
                <AlertCircle size={22} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Problem Statement</h2>
            </div>
            <div className="p-6 rounded-2xl border border-crimson-500/30 bg-crimson-500/5 text-stone-700 dark:text-stone-300 flex flex-col gap-4">
              <p className="font-semibold text-crimson-600 dark:text-crimson-400">
                Currently, booking a Pandit for religious rituals is mostly done through:
              </p>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-2">
                  <span className="text-crimson-500 mt-1">•</span>
                  <span>Personal references or local contacts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-crimson-500 mt-1">•</span>
                  <span>Phone calls or temple visits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-crimson-500 mt-1">•</span>
                  <span>Lack of standardized pricing and availability information</span>
                </li>
              </ul>
              <p className="font-semibold text-stone-900 dark:text-white mt-2">
                This leads to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Trust Barrier", desc: "Difficulty in finding trusted and verified Pandits." },
                  { title: "Inconsistent Costs", desc: "No clarity on puja requirements, duration, or costs." },
                  { title: "Scheduling Friction", desc: "Last-minute cancellations or scheduling issues." },
                  { title: "No Comparison", desc: "Limited options for comparing services." }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/50 dark:bg-dark-card border border-light-border dark:border-dark-border">
                    <span className="block font-bold text-saffron-500 mb-1">{item.title}</span>
                    <span className="text-sm">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Primary Objectives */}
          <section id="primary-objectives" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Target size={22} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Primary Objectives</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Digitize Discovery", desc: "Digitize the Pandit discovery and puja booking process." },
                { title: "Verified Providers", desc: "Provide verified and trusted religious service providers." },
                { title: "Transparent Pricing", desc: "Enable transparent pricing and ritual details." },
                { title: "Simplified Scheduling", desc: "Simplify booking and scheduling for users." }
              ].map((obj, idx) => (
                <div key={idx} className="p-5 rounded-2xl glass-card flex flex-col gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 font-bold text-sm">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-stone-900 dark:text-white mt-2">{obj.title}</h4>
                  <p className="text-sm text-stone-600 dark:text-stone-400">{obj.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Secondary Objectives */}
          <section id="secondary-objectives" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400">
                <Compass size={22} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Secondary Objectives</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Traditions & Rituals", desc: "Support multiple rituals and regional traditions." },
                { title: "Digital Empowerment", desc: "Enable Pandits to manage bookings digitally." },
                { title: "Scale Across Regions", desc: "Provide scalability across cities and regions." },
                { title: "Improve Accessibility", desc: "Improve accessibility to religious services." }
              ].map((obj, idx) => (
                <div key={idx} className="p-5 rounded-2xl glass-card border-l-4 border-l-gold-500 flex flex-col gap-2">
                  <h4 className="font-bold text-stone-900 dark:text-white">{obj.title}</h4>
                  <p className="text-sm text-stone-600 dark:text-stone-400">{obj.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Scope */}
          <section id="scope-of-product" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Sparkles size={22} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Scope of the Product</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* In Scope */}
              <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-4 flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  In Scope
                </h4>
                <ul className="flex flex-col gap-3 text-sm text-stone-700 dark:text-stone-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Web-based platform (desktop & mobile responsive)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Pandit profile listing and verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Puja and ritual catalog</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Booking and scheduling management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>Admin moderation and approvals</span>
                  </li>
                </ul>
              </div>

              {/* Out of Scope */}
              <div className="p-6 rounded-2xl border border-crimson-500/20 bg-crimson-500/5">
                <h4 className="font-bold text-crimson-600 dark:text-crimson-400 text-lg mb-4 flex items-center gap-2">
                  <ShieldAlert size={18} />
                  Out of Scope
                </h4>
                <ul className="flex flex-col gap-3 text-sm text-stone-700 dark:text-stone-300">
                  <li className="flex items-start gap-2">
                    <span className="text-crimson-500 mt-1">•</span>
                    <span>Native mobile applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-crimson-500 mt-1">•</span>
                    <span>Online puja live streaming</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-crimson-500 mt-1">•</span>
                    <span>Advanced astrology or horoscope services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-crimson-500 mt-1">•</span>
                    <span>Multi-language voice support</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section id="key-features" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Layout size={22} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Key Features & Functional Requirements</h2>
            </div>
            
            <div className="flex flex-col gap-8">
              {/* User Features */}
              <div className="p-6 rounded-2xl glass-card">
                <h3 className="font-bold text-saffron-500 text-lg mb-4 flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                  <Users size={18} />
                  User Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "User registration & login (secure JWT validation)",
                    "Browse & search Pandits by location, puja type, experience, or language",
                    "Detailed Pandit profiles containing biographies, pricing, and availability",
                    "Book puja services by selecting rituals, date, time slot, and address",
                    "Booking history, real-time status tracking, and confirmation notifications"
                  ].map((feat, idx) => (
                    <div key={idx} className="flex gap-2.5 text-sm text-stone-700 dark:text-stone-300">
                      <BadgeCheck size={16} className="text-saffron-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pandit Features */}
              <div className="p-6 rounded-2xl glass-card">
                <h3 className="font-bold text-gold-600 dark:text-gold-400 text-lg mb-4 flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                  <Calendar size={18} />
                  Pandit Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Pandit onboarding & professional profile creation",
                    "Add supported rituals and set individual pricing maps",
                    "Dynamic availability calendar management",
                    "Accept or reject booking requests with custom reason notes",
                    "Manage upcoming schedules, histories, and update details"
                  ].map((feat, idx) => (
                    <div key={idx} className="flex gap-2.5 text-sm text-stone-700 dark:text-stone-300">
                      <BadgeCheck size={16} className="text-gold-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Features */}
              <div className="p-6 rounded-2xl glass-card">
                <h3 className="font-bold text-crimson-600 dark:text-crimson-400 text-lg mb-4 flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-2">
                  <BadgeCheck size={18} />
                  Admin Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Verify, approve, reject, or suspend Pandit profiles",
                    "Create, update, or deprecate puja categories and catalog rituals",
                    "Monitor bookings, tracking status workflows and platform histories",
                    "Handle reports, user account status changes, and platform feedbacks"
                  ].map((feat, idx) => (
                    <div key={idx} className="flex gap-2.5 text-sm text-stone-700 dark:text-stone-300">
                      <BadgeCheck size={16} className="text-crimson-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Non-Functional Requirements */}
          <section id="non-functional-reqs" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Cpu size={22} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Non-Functional Requirements</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { title: "Performance", spec: "Fast page load times (<3 seconds) and smooth transitions." },
                { title: "Security", spec: "Secure JWT verification and role-based access controls." },
                { title: "Usability", spec: "Simple, culturally respectful, and clear-to-navigate UI." },
                { title: "Scalability", spec: "Design ready to support multi-city and multi-region listings." },
                { title: "Reliability", spec: "Strict scheduling rules to block double-bookings." }
              ].map((nfr, idx) => (
                <div key={idx} className="p-5 rounded-2xl glass-card flex flex-col gap-2">
                  <h4 className="font-bold text-stone-850 dark:text-white text-base">{nfr.title}</h4>
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{nfr.spec}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section id="technology-stack" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <GitBranch size={22} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Technology Stack (Suggested)</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { title: "Frontend", techs: ["HTML5, CSS3, JavaScript", "React.js / Next.js", "Bootstrap / Tailwind CSS"] },
                { title: "Backend", techs: ["Node.js", "Express.js"] },
                { title: "Database", techs: ["MongoDB", "PostgreSQL"] },
                { title: "APIs", techs: ["REST APIs", "CRUD Enpoints"] },
                { title: "Deployment", techs: ["AWS", "Vercel", "Netlify"] }
              ].map((stk, idx) => (
                <div key={idx} className="p-5 rounded-2xl glass-card flex flex-col gap-3">
                  <h4 className="font-bold text-saffron-500 text-base border-b border-light-border dark:border-dark-border pb-1.5">
                    {stk.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {stk.techs.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-light-border dark:border-dark-border">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* User Flow */}
          <section id="user-flow" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <GitBranch size={22} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">User Flow (High-Level)</h2>
            </div>
            <div className="p-6 rounded-2xl glass-card">
              <div className="flex flex-col gap-4 max-w-md mx-auto">
                {[
                  "User Visits Platform",
                  "Search Pandit (by location, language, or experience)",
                  "View Pandit Profile & Supported Rituals",
                  "Choose Ritual",
                  "Select Date & Time Slot",
                  "Send Booking Request",
                  "Pandit Accepts or Rejects Request",
                  "Booking Confirmation & Chat Active"
                ].map((step, idx, arr) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-full flex items-center justify-between p-4 rounded-xl border border-light-border dark:border-dark-border bg-white/60 dark:bg-dark-card shadow-sm group hover:border-saffron-500 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-saffron-500 text-white font-mono text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-semibold text-stone-850 dark:text-stone-200">
                          {step}
                        </span>
                      </div>
                    </div>
                    {idx < arr.length - 1 && (
                      <ArrowRight size={18} className="text-saffron-500 my-1 rotate-90 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Data Requirements */}
          <section id="data-requirements" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Database size={22} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Data Requirements</h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="p-5 rounded-2xl border-l-4 border-l-saffron-500 glass-card">
                <h4 className="font-bold text-stone-900 dark:text-white mb-2">Core Entities</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Users", "Pandits", "Rituals / Pujas", "Bookings", "Availability Schedules"].map((ent, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-bold bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 border border-saffron-500/20">
                      {ent}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl glass-card">
                  <h4 className="font-bold text-stone-900 dark:text-white border-b border-light-border dark:border-dark-border pb-1.5 mb-3">
                    Sample Pandit Fields
                  </h4>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-400 font-sans">
                    <li>• Name</li>
                    <li>• Supported Rituals</li>
                    <li>• Location</li>
                    <li>• Languages Spoken</li>
                    <li>• Years of Experience</li>
                    <li>• Pricing maps</li>
                    <li>• Availability scheduler</li>
                    <li>• Verification Status</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl glass-card">
                  <h4 className="font-bold text-stone-900 dark:text-white border-b border-light-border dark:border-dark-border pb-1.5 mb-3">
                    Sample Puja Fields
                  </h4>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-400 font-sans">
                    <li>• Puja Name</li>
                    <li>• Price Range</li>
                    <li>• Description</li>
                    <li>• Location Type (Home / Temple)</li>
                    <li>• Duration</li>
                    <li>• Required Materials</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* KPIs */}
          <section id="kpis" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Activity size={22} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Key Performance Indicators (KPIs)</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                { label: "Registered Users", value: "Devotees Onboarded" },
                { label: "Verified Pandits", value: "Active Priests" },
                { label: "Booking Success", value: "Completion Rate" },
                { label: "Retention Rate", value: "Cancellation Tracking" },
                { label: "Efficiency", value: "Avg Booking Time" }
              ].map((kpi, idx) => (
                <div key={idx} className="p-4 rounded-2xl glass-card flex flex-col items-center text-center justify-center">
                  <span className="text-xs text-stone-500 dark:text-stone-400 block mb-1">
                    {kpi.value}
                  </span>
                  <span className="text-sm font-bold text-stone-900 dark:text-white">
                    {kpi.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Assumptions & Constraints */}
          <section id="assumptions-constraints" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <AlertCircle size={22} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Assumptions & Constraints</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Assumptions */}
              <div className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5">
                <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Assumptions
                </h4>
                <ul className="flex flex-col gap-2 text-sm text-stone-700 dark:text-stone-300">
                  <li>• Pandits are willing to onboard digitally.</li>
                  <li>• Basic ritual data is standardized.</li>
                  <li>• Admin verification is manual initially.</li>
                </ul>
              </div>

              {/* Constraints */}
              <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5">
                <h4 className="font-bold text-amber-600 dark:text-amber-500 mb-3 flex items-center gap-2">
                  <ShieldAlert size={16} />
                  Constraints
                </h4>
                <ul className="flex flex-col gap-2 text-sm text-stone-700 dark:text-stone-300">
                  <li>• Cultural sensitivity and accuracy required.</li>
                  <li>• Limited budget for Phase 1.</li>
                  <li>• Regulatory compliance for religious services.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Deliverables */}
          <section id="deliverables" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <CheckCircle2 size={22} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Deliverables</h2>
            </div>
            
            <div className="p-6 rounded-2xl glass-card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Functional web application (responsive clients)",
                  "Admin dashboard portal interface",
                  "Pandit onboarding & profiles module",
                  "PRD & technical documentation repository",
                  "Deployment-ready code builds"
                ].map((del, idx) => (
                  <div key={idx} className="flex gap-2 text-sm text-stone-750 dark:text-stone-300">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Expected Impact */}
          <section id="expected-impact" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Award size={22} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Expected Impact</h2>
            </div>
            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-stone-750 dark:text-stone-300">
                {[
                  "Easy access to trusted religious services",
                  "Reduced dependency on local references",
                  "Transparent and organized booking experience",
                  "Digital empowerment of Pandits"
                ].map((imp, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Star size={16} className="text-gold-500 shrink-0 mt-0.5 fill-gold-500/20" />
                    <span>{imp}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Future Enhancements */}
          <section id="future-enhancements" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-saffron-500/10 text-saffron-600 dark:text-saffron-400">
                <Sparkles size={22} />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Future Enhancements</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                "Online payments & donations",
                "Multi-language support",
                "Puja reminder notifications",
                "Live puja streaming",
                "Astrology and horoscope services",
                "Mobile applications"
              ].map((fut, idx) => (
                <div key={idx} className="p-4 rounded-xl glass-card text-center flex items-center justify-center">
                  <span className="text-sm font-semibold">{fut}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Page Navigation */}
          <div className="flex items-center justify-between border-t border-light-border dark:border-dark-border pt-8 mt-4">
            <div className="w-1/2" />
            <Link 
              to="/technical-documentation" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-saffron-500 to-gold-600 hover:from-saffron-600 hover:to-gold-700 shadow-glow-saffron cursor-pointer"
            >
              <span>Next: Technical Documentation</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
