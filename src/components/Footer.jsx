import React, { useState } from 'react';

export default function Footer({ setPage }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleNavClick = (pageId) => {
    setPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-deep-forest text-white py-16 md:py-24 px-6 md:px-container-padding relative z-10 overflow-hidden">
      <div className="texture-subtle absolute inset-0 opacity-10 filter invert pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-12 lg:gap-16 relative">
        {/* Brand Column */}
        <div className="sm:col-span-2 lg:col-span-4 flex flex-col">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-xl md:text-2xl font-headline-md font-bold text-warm-gold mb-6 text-left hover:opacity-90"
          >
            SAVE LIFE AGRO PRODUCTS, SANGLI
          </button>
          <p className="text-white/60 mb-8 text-sm leading-relaxed max-w-sm">
            Trusted agricultural solutions for Indian farmers. Quality organic crop regulators and nutrients manufactured and marketed by Save Life Agro Products, Sangli.
          </p>
          


        </div>

        {/* Column 2: Discover */}
        <div className="lg:col-span-2">
          <h5 className="font-label-bold text-[10px] uppercase tracking-widest text-warm-gold mb-6 md:mb-8">Discover</h5>
          <ul className="space-y-4 text-sm text-white/60">
            <li><button onClick={() => handleNavClick('products')} className="hover:text-white transition-colors">All Products</button></li>
            <li><button onClick={() => handleNavClick('products')} className="hover:text-white transition-colors">Bud Jet</button></li>
            <li><button onClick={() => handleNavClick('story')} className="hover:text-white transition-colors">About Us</button></li>
            <li><button onClick={() => handleNavClick('story')} className="hover:text-white transition-colors">Our Story</button></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div className="lg:col-span-2">
          <h5 className="font-label-bold text-[10px] uppercase tracking-widest text-warm-gold mb-6 md:mb-8">Support</h5>
          <ul className="space-y-4 text-sm text-white/60">
            <li><a className="hover:text-white transition-colors" href="#faq">FAQs</a></li>
            <li><a class="hover:text-white transition-colors" href="#shipping">Shipping & Care</a></li>
            <li><a className="hover:text-white transition-colors" href="#certifications">Certifications</a></li>
            <li><a className="hover:text-white transition-colors" href="#returns">Returns Policy</a></li>
          </ul>
        </div>

        {/* Column 4: Get In Touch */}
        <div className="sm:col-span-2 lg:col-span-4">
          <h5 className="font-label-bold text-[10px] uppercase tracking-widest text-warm-gold mb-6 md:mb-8">Get In Touch</h5>
          <div className="space-y-6">
            <div>
              <p className="text-[10px] uppercase text-white/40 mb-1">Email Us</p>
              <a href="mailto:savelifeagroproducts@yahoo.com" className="text-sm hover:text-warm-gold transition-colors">savelifeagroproducts@yahoo.com</a>
            </div>
            <div>
              <p className="text-[10px] uppercase text-white/40 mb-1">Call Us</p>
              <p className="text-sm">+91 9403594529</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-white/40 mb-1">Address</p>
              <p className="text-sm opacity-60">C/O - Subhadra Niwas, Plot No. 53,<br/>Yashwant Nagar, Sangli.</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-white/40 mb-1">Hours</p>
              <p className="text-sm opacity-60">Mon - Sat: 9 AM - 6 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 md:mt-24 pt-8 md:pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-[9px] text-white/30 uppercase tracking-[0.2em]">© 2026 Save Life Agro Products. All Rights Reserved.</p>
          <p className="text-[9px] text-white/30 uppercase tracking-[0.2em]">
            Designed and developed by <a href="https://www.nebulasystems.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4 font-bold">Nebula Systems</a>
          </p>
        </div>
        <div className="flex gap-8 text-[9px] text-white/30 uppercase tracking-[0.2em]">
          <button className="hover:text-white transition-colors" onClick={() => handleNavClick('privacy')}>Privacy Policy</button>
          <button className="hover:text-white transition-colors" onClick={() => handleNavClick('terms')}>Terms of Service</button>
          <button className="hover:text-white transition-colors" onClick={() => handleNavClick('accessibility')}>Accessibility</button>
        </div>
      </div>
    </footer>
  );
}
