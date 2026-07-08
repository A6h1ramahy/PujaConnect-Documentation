# 🛕 PujaConnect – Technical Documentation Website & Project Report

This is a premium, fully responsive, standalone documentation website and project report manager for **PujaConnect – Online Pandit & Booking Platform**. 

Built with **React + Vite**, styled using a customized **Karnataka-inspired saffron/gold palette** with full dark/light modes, scroll progress tracking, animations, and an embedded PDF generation pipeline.

---

## 🛠 Technology Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v3 + Custom PostCSS configuration
- **Routing:** React Router v7
- **Animations:** Framer Motion v12
- **Icons:** Lucide React
- **Document Compiler:** PDFKit v0.19 (configured for page-budget optimization, tables, and asset injection)

---

## ✨ Features

- **Double-Page Architecture:**
  - **Problem Statement Page:** Highlights the official internship problem statement from Unified Mentor with feature grids, user flows, and checklists.
  - **Technical Documentation Page:** A comprehensive system analysis breakdown across 28 technical headings:
    - **1-10:** General project introduction, problem statement, objectives, and folder structure.
    - **11 (Database Design):** Interactive panels displaying complete Mongoose schemas (User, Pandit, Ritual, Booking, Availability) in syntax-highlighted code blocks, highlighting compound indexes and transactional hooks.
    - **12 (Authentication Flow):** Explains credentials encryption using bcrypt, JWT generation, and Express routing guards (RBAC).
    - **13-15 (Roles Modules):** Custom-built dashboards for Devotees (User), Priests (Pandits), and Admins (Verification, Suspensions, and Catalog control).
    - **16-20 (Backend Systems):** Ritual taxonomies, booking state machines with automatic slot release triggers, timezone date processing (UTC midnight normalization), embedded chat threads, and compound index queries.
    - **21-27:** Admin verification workflow, cloud deployment maps, API overview tables (listing all 23 backend endpoints), security features, challenges faced, and conclusions.
    - **28 (Project Screenshots Guide):** 15 high-fidelity screenshot preview cards (Home page, Login, Dashboards, Search, Chat, etc.) with detailed functional captions and fullscreen image viewers.
- **Karnataka-Inspired Aesthetic:** Luxury saffron (`#F97316`), gold (`#D97706`), and crimson accents set against warm off-white in light mode and deep maroon-charcoal in dark mode.
- **Scroll Tracking Sidebar:** Sticky left sidebar navigation with automatic active link highlighting via `IntersectionObserver`.
- **Reading Progress Bar:** Displays scroll progress at the top of the window dynamically.
- **Fully Embedded PDF Report Compiler:** Programmatic PDF compiler that reads system details, imports screenshot files from disk, and compiles a comprehensive project report [report.pdf](public/report.pdf).

---

## 🚀 Getting Started

### 1. Install Dependencies
Run `npm install` in the directory root:
```bash
npm install
```

### 2. Generate/Regenerate PDF Report
Compile the PDF document using the offline compiler. This reads local screenshot assets and compiles `report.pdf` inside the `public/` directory:
```bash
node scripts/generate-report.cjs
```

### 3. Start Development Server
Launch the local dev server:
```bash
npm run dev
```

### 4. Build for Production
Bundle the production static assets for Vercel deployment:
```bash
npm run build
```

---