import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, FileText, Menu, X, ArrowDownToLine } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glassmorphism border-b transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl sm:text-3xl font-display font-bold bg-gradient-to-r from-saffron-500 via-gold-600 to-crimson-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              🛕 PujaConnect
            </span>
            <span className="hidden sm:inline-block text-[10px] tracking-widest font-semibold px-2 py-0.5 rounded-full border border-saffron-500/30 text-saffron-600 dark:text-saffron-400 bg-saffron-500/5">
              DOCS
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-saffron-600 dark:text-saffron-400 font-bold border-b-2 border-saffron-500 py-1' 
                  : 'text-stone-600 dark:text-stone-300 hover:text-saffron-500 dark:hover:text-saffron-400'
              }`}
            >
              Problem Statement
            </Link>
            <Link
              to="/technical-documentation"
              className={`text-sm font-semibold transition-colors duration-200 ${
                isActive('/technical-documentation')
                  ? 'text-saffron-600 dark:text-saffron-400 font-bold border-b-2 border-saffron-500 py-1'
                  : 'text-stone-600 dark:text-stone-300 hover:text-saffron-500 dark:hover:text-saffron-400'
              }`}
            >
              Technical Docs
            </Link>

            {/* Vertical Divider */}
            <div className="h-6 w-[1px] bg-light-border dark:bg-dark-border" />

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-light-border dark:border-dark-border hover:bg-saffron-500/5 transition-colors duration-200 text-stone-600 dark:text-stone-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Download Button */}
            <a
              href="/report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-saffron-500 to-gold-600 hover:from-saffron-600 hover:to-gold-700 hover:shadow-glow-saffron hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <FileText size={16} />
              <span>Download Project Report</span>
              <ArrowDownToLine size={14} className="animate-bounce" />
            </a>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-light-border dark:border-dark-border text-stone-600 dark:text-stone-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-light-border dark:border-dark-border text-stone-700 dark:text-stone-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glassmorphism border-b py-4 px-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-semibold py-2 transition-colors ${
                isActive('/') ? 'text-saffron-500' : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              Problem Statement
            </Link>
            <Link
              to="/technical-documentation"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-semibold py-2 transition-colors ${
                isActive('/technical-documentation') ? 'text-saffron-500' : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              Technical Docs
            </Link>

            <a
              href="/report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 mt-2 rounded-xl font-bold text-white bg-gradient-to-r from-saffron-500 to-gold-600 cursor-pointer text-center"
            >
              <FileText size={16} />
              <span>Download Project Report</span>
              <ArrowDownToLine size={14} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
