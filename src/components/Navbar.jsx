import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function Navbar({ currentPage, setPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { announcement } = useAdmin();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'story', label: 'Our Story' },
    { id: 'distributor', label: 'Partner with Us' },
    { id: 'journal', label: 'Journal' }
  ];

  const handleNavClick = (pageId) => {
    setPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-cream-foundation/80 backdrop-blur-xl border-b border-surface-container transition-all duration-500">
      {/* Promotional Bar */}
      {announcement?.enabled && (
        <div className="relative z-[60] bg-deep-forest text-white py-2 text-center text-[10px] uppercase tracking-[0.2em] font-label-bold">
          <div className="overflow-hidden whitespace-nowrap">
            <div className="inline-block animate-marquee">
              {announcement.text}
            </div>
          </div>
        </div>
      )}

      <div className="px-6 md:px-container-padding flex justify-between items-center h-20 md:h-24 max-w-7xl mx-auto">
        {/* Left Side: Brand Logo and Search */}
        <div className="flex items-center gap-1 lg:gap-4">
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-1 md:gap-4 flex-shrink-0 hover:opacity-85 transition-opacity focus:outline-none"
          >
            <img 
              src="/logo.png" 
              alt="Save Life Agro Logo" 
              className="h-20 md:h-36 w-auto object-contain drop-shadow-sm -my-4 md:-my-10 -ml-6 md:ml-0" 
            />
            <span className="text-lg md:text-3xl font-headline-md font-bold text-deep-forest tracking-tight">
              Save Life Agro
            </span>
          </button>
        </div>

        {/* Right Side: Navigation Links & Actions */}
        <div className="flex items-center gap-6 md:gap-10">
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 lg:gap-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`font-label-bold text-xs uppercase tracking-widest transition-all pb-1 border-b-2 ${
                  currentPage === link.id
                    ? 'text-primary border-primary font-bold'
                    : 'text-on-surface-variant/80 border-transparent hover:text-primary'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="material-symbols-outlined text-deep-forest text-2xl md:hidden hover:opacity-75 transition-opacity"
            >
              {mobileMenuOpen ? 'close' : 'menu'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-cream-foundation/95 border-b border-surface-container py-6 px-6 flex flex-col gap-6 shadow-xl z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left font-label-bold text-sm uppercase tracking-widest py-2 border-b border-surface-container-high/40 ${
                  currentPage === link.id ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
