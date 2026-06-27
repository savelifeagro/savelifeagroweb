import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { allProducts } from '../products';
import { useAdmin } from '../context/AdminContext';

export default function Collection({ setPage, setActiveProduct }) {
  const [activeFilter, setActiveFilter] = useState('all'); // all | plant-growth
  const [sortBy, setSortBy] = useState('seasonality'); // seasonality | price-low | price-high
  const [vaultSubscribed, setVaultSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  // Mouse Parallax Micro-interaction for staggered grids
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return; // Disable on mobile
      const moveX = (e.clientX - window.innerWidth / 2) / 80;
      const moveY = (e.clientY - window.innerHeight / 2) / 80;

      const floats = document.querySelectorAll('.asymmetric-float');
      floats.forEach((el, index) => {
        const depth = (index % 3 + 1) * 1.5;
        // Check if index is even/odd for base offsets
        const baseOffset = index % 2 === 0 ? -12 : 24;
        el.style.transform = `translate(${moveX * depth}px, ${moveY * depth + baseOffset}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { products: productsList } = useAdmin();

  // Filter & Sort Logic
  const filteredProducts = productsList
    .filter(p => activeFilter === 'all' || p.category === activeFilter)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.sizes[0].price - b.sizes[0].price;
      if (sortBy === 'price-high') return b.sizes[0].price - a.sizes[0].price;
      return 0; // Maintain default order for 'seasonality'
    });

  const handleVaultSubmit = (e) => {
    e.preventDefault();
    if (emailInput) {
      setVaultSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div className="bg-cream-foundation text-on-surface font-body-md overflow-x-hidden min-h-screen">
      {/* Editorial Header */}
      <header className="max-w-7xl mx-auto px-6 md:px-container-padding pt-16 md:pt-24 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12">
          <div className="max-w-2xl">
            <span className="text-label-bold font-label-bold text-primary tracking-[0.25em] uppercase mb-4 block font-bold">
              Save Life Agro Products
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display-lg text-deep-forest leading-tight mb-6">
              All Products
            </h1>
            <p className="text-sm md:text-base text-on-surface-variant max-w-lg leading-relaxed">
              High-efficacy organic agricultural solutions for Indian farmers. Lab-tested, field-proven compositions to help your mango and other crops thrive.
            </p>
          </div>

          {/* Filtering Tabs & Sorters */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="flex bg-white/60 p-1.5 rounded-full border border-outline-variant/20 overflow-x-auto no-scrollbar max-w-full">
              {['all', 'plant-growth', 'soil-care', 'crop-care'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`text-[10px] uppercase font-label-bold tracking-widest px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                    activeFilter === cat 
                      ? 'bg-primary text-white font-bold' 
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {cat.replace('-', ' ')}
                </button>
              ))}
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/60 border border-outline-variant/20 rounded-full px-5 py-2 text-[10px] uppercase font-label-bold tracking-widest text-deep-forest focus:ring-1 focus:ring-primary/20 outline-none cursor-pointer"
            >
              <option value="seasonality">Seasonality</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </header>

      {/* Product Grid: Asymmetric & Editorial */}
      <section className="max-w-7xl mx-auto px-6 md:px-container-padding py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-16 justify-items-center">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              setPage={setPage}
              setActiveProduct={setActiveProduct}
            />
          ))}
        </div>
      </section>

      {/* The Botanical Vault */}
      <section className="bg-deep-forest text-cream-foundation py-16 md:py-24 relative overflow-hidden z-10">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none"></div>
        
        <div className="px-6 md:px-container-padding max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Vault Left: Content */}
            <div className="w-full lg:w-1/2">
              <span className="text-label-bold font-label-bold text-warm-gold tracking-[0.3em] uppercase mb-4 md:mb-6 block font-bold">
                Member Exclusive
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display-lg mb-8 leading-tight">
                The Agro Advantage
              </h2>
              <p className="text-sm md:text-base text-cream-foundation/80 mb-10 leading-relaxed max-w-md">
                Join our exclusive network of mango farmers and agricultural distributors. Get priority access to bulk pricing, seasonal stock alerts, and direct tech support from our team.
              </p>
              
              <ul className="space-y-4 md:space-y-6 mb-10 text-xs md:text-sm">
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-warm-gold">verified</span>
                  Verified Composition & Lab Reports
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-warm-gold">agriculture</span>
                  Mango Crop Expert Support
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-warm-gold">lock</span>
                  Bulk & Distributor Pricing Access
                </li>
              </ul>
              
              {vaultSubscribed ? (
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20 max-w-md animate-in fade-in duration-500">
                  <p className="text-warm-gold font-bold text-sm">✓ Partner Request Received</p>
                  <p className="text-xs text-white/70 mt-1">Our team will contact you within 24 hours with partner pricing and technical support details.</p>
                </div>
              ) : (
                <form onSubmit={handleVaultSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
                  <input 
                    className="flex-1 bg-white/10 border-b border-white/30 focus:border-warm-gold focus:ring-0 text-xs py-3 px-4 rounded-xl text-white placeholder:text-white/40 outline-none" 
                    placeholder="Enter your email address" 
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                  />
                  <button 
                    type="submit"
                    className="px-8 py-3.5 bg-warm-gold hover:bg-white text-deep-forest font-label-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                  >
                    Request Partnership
                  </button>
                </form>
              )}
            </div>

            {/* Vault Right: Visual Card */}
            <div className="w-full lg:w-1/2 relative flex flex-col items-center justify-center">
              <div className="w-[80%] max-w-sm md:max-w-lg lg:max-w-[580px] aspect-square rounded-full border border-warm-gold/20 p-6 md:p-12 animate-pulse duration-[4000ms]">
                <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-2 border-warm-gold">
                  <img 
                    className="w-full h-full object-contain bg-white p-6" 
                    src="/main_product.png" 
                    alt="Bud Jet Product" 
                  />
                </div>
              </div>
              
              {/* Floating Glassmorphic Details Card */}
              <div className="relative mt-[-30px] z-10 md:absolute md:-bottom-8 md:-left-8 p-6 md:p-8 bg-white/10 border border-white/20 rounded-2xl max-w-xs backdrop-blur-xl shadow-2xl mx-auto md:mx-0">
                <p className="text-warm-gold font-label-bold text-[8px] md:text-[10px] mb-2 uppercase tracking-[0.2em] font-bold">New Product Launch</p>
                <h4 className="text-lg md:text-xl font-headline-md font-bold text-white mb-2">Bud Jet — 1 Litre</h4>
                <p className="text-xs text-white/70 mb-4 leading-relaxed">Organic Cytokinin 5000 PPM + Salt of Potash 10%. For Mango Crop.</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">₹1,450 / Litre</span>
                  <span className="text-warm-gold font-bold">In Stock</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Innovative Product Range Showcase Card */}
      <section className="py-12 md:py-16 bg-cream-foundation relative z-10 flex justify-center px-6 border-t border-[#EADEC9]/20">
        <div className="max-w-5xl w-full rounded-3xl overflow-hidden shadow-2xl border border-[#EADEC9]/50 bg-white transition-all duration-500 hover:shadow-3xl hover:scale-[1.01]">
          <img 
            src="/nourishing_growth_banner.jpg" 
            alt="Nourishing Growth Range" 
            className="w-full h-auto object-contain block" 
          />
        </div>
      </section>
    </div>
  );
}
