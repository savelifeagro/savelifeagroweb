import React, { useState, useEffect, useRef } from 'react';
import Magnet from '../components/Magnet';
import ProductCard from '../components/ProductCard';
import BeforeAfter from '../components/BeforeAfter';
import { allProducts } from '../products';
import { useAdmin } from '../context/AdminContext';

export default function Home({ setPage, setActiveProduct }) {
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const manualScrollTimeout = useRef(null);

  const { products: productsList, testimonials } = useAdmin();



  const scroll = (direction) => {
    if (carouselRef.current) {
      // Pause auto-scroll for 5 seconds on manual interaction
      setIsHovered(true);
      if (manualScrollTimeout.current) clearTimeout(manualScrollTimeout.current);
      manualScrollTimeout.current = setTimeout(() => setIsHovered(false), 5000);

      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Seamless Infinite Looping on Scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const oneThird = scrollWidth / 3;

    // Use a small buffer to handle sub-pixel scrolling differences
    if (scrollLeft <= 5) {
      // Jump forward by one full set
      carouselRef.current.scrollLeft = scrollLeft + oneThird;
    }
    else if (scrollLeft + clientWidth >= scrollWidth - 5) {
      // Jump backward by one full set
      carouselRef.current.scrollLeft = scrollLeft - oneThird;
    }
  };

  // Center scroll position on mount
  useEffect(() => {
    const initScroll = () => {
      if (carouselRef.current) {
        const { scrollWidth } = carouselRef.current;
        carouselRef.current.scrollLeft = scrollWidth / 3;
      }
    };
    initScroll();
    const timer = setTimeout(initScroll, 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scrolling Carousel effect
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 340, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);
  
  // Trigger reveal animation class on scroll
  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 50;
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleReveal);
    // Trigger initially
    setTimeout(handleReveal, 100);
    return () => window.removeEventListener('scroll', handleReveal);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Global Shader Background (Reference overlay) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[radial-gradient(#3e8e4d_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* NEW PREMIUM HERO SECTION */}
      <section className="relative w-full overflow-hidden z-10 bg-cream-foundation h-auto pt-3 pb-5 md:py-20 lg:py-28 flex items-center">
        {/* Cinematic Background with Ken Burns */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: "url('/mango_orchard_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "kenBurns 20s ease-out forwards",
          }}
        />
        
        {/* Dark Overlays for Readability */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent md:from-black/60 md:via-black/20 z-0"></div>
        
        {/* Split Layout Container */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-16 flex flex-col md:flex-row items-center justify-between h-full gap-2 md:gap-4">
          
          {/* LEFT SIDE: Copy & CTAs */}
          <div className="flex-1 flex flex-col items-start text-left w-full md:max-w-xl xl:max-w-2xl reveal active delay-100">
            {/* Small Label */}
            <span 
              className="text-warm-gold text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-bold mb-3 md:mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Trusted Agricultural Solutions Since 2018
            </span>
            
            {/* Main Headline */}
            <h1 
              className="text-white font-bold leading-[1.1] mb-3 md:mb-6 drop-shadow-2xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 48px rgba(0,0,0,0.5)',
              }}
            >
              Helping Mango Farmers <br className="hidden md:block"/>
              Grow Better Harvests
            </h1>
            
            {/* Supporting Paragraph */}
            <p 
              className="text-white/90 text-sm md:text-base font-medium leading-relaxed mb-1 md:mb-10 max-w-lg"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Save Life Agro develops high-quality plant growth regulators and crop nutrition solutions that improve flowering, fruit setting, and overall yield for mango orchards across Maharashtra.
            </p>
            
            {/* MOBILE-ONLY Floating Bottle (Order: Headline -> Bottle -> Buttons) */}
            <div className="flex md:hidden justify-center items-center relative w-full h-auto py-2 mb-[-10px] mt-[-25px]">
              <div className="relative z-10 flex flex-col items-center translate-y-[45px]">
                <Magnet padding={80} strength={3}>
                  <img 
                    src="/main_product.png" 
                    alt="Bud Jet Product Bottle" 
                    className="w-auto h-[275px] sm:h-[340px] object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)] origin-bottom rotate-[4deg]"
                  />
                </Magnet>
                <div 
                  className="w-[150px] h-[10px] bg-black/60 rounded-[100%] blur-[8px] mt-[-10px]"
                ></div>
              </div>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto mt-0 md:mt-8 reveal active delay-300">
              <button
                onClick={() => setPage('products')}
                className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-warm-gold hover:bg-deep-forest text-deep-forest hover:text-white font-bold px-8 py-4 rounded-full shadow-2xl transition-all duration-300"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
              >
                View Products
              </button>
              <button
                onClick={() => {
                  const message = encodeURIComponent('Hi Save Life Agro, I would like to know more about your products.');
                  window.open(`https://wa.me/919822264529?text=${message}`, '_blank');
                }}
                className="w-full sm:w-auto flex items-center justify-center text-white/80 hover:text-warm-gold bg-white/10 hover:bg-white/20 backdrop-blur-md px-8 py-4 rounded-full border border-white/20 transition-all duration-300 font-bold"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
              >
                Contact Us
              </button>
            </div>
          </div>
          
          {/* RIGHT SIDE (DESKTOP ONLY): Floating Product Showcase */}
          <div className="hidden md:flex flex-1 justify-center items-center relative w-full h-[400px] lg:h-[550px] reveal active delay-200 mt-4 md:mt-0">
            {/* Floating Bottle */}
            <div className="relative z-10 flex flex-col items-center">
              <Magnet padding={150} strength={4}>
                <img 
                  src="/main_product.png" 
                  alt="Bud Jet Product Bottle" 
                  className="w-auto h-[380px] lg:h-[500px] object-contain drop-shadow-xl"
                  style={{ animation: "floatProduct 6s ease-in-out infinite" }}
                />
              </Magnet>
              {/* Animated floor shadow */}
              <div 
                className="w-[180px] lg:w-[240px] h-[12px] bg-black/50 rounded-[100%] blur-[10px] mt-5"
                style={{ animation: "floatShadow 6s ease-in-out infinite" }}
              ></div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Standalone Responsive Trust Section */}
      <section className="bg-cream-foundation py-8 md:py-12 px-6 md:px-container-padding relative z-10 border-b border-[#EADEC9]/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <div className="bg-white p-3 md:p-5 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 border border-[#EADEC9]/20 shadow-sm">
              <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">verified</span>
              <div>
                <p className="text-[9px] md:text-[10px] uppercase font-bold text-deep-forest tracking-wider">MSME Registered</p>
                <p className="text-[10px] md:text-xs text-on-surface-variant font-semibold">Government Verified</p>
              </div>
            </div>
            <div className="bg-white p-3 md:p-5 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 border border-[#EADEC9]/20 shadow-sm">
              <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">history</span>
              <div>
                <p className="text-[9px] md:text-[10px] uppercase font-bold text-deep-forest tracking-wider">Since 2018</p>
                <p className="text-[10px] md:text-xs text-on-surface-variant font-semibold">Years of Excellence</p>
              </div>
            </div>
            <div className="bg-white p-3 md:p-5 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 border border-[#EADEC9]/20 shadow-sm">
              <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">science</span>
              <div>
                <p className="text-[9px] md:text-[10px] uppercase font-bold text-deep-forest tracking-wider">Lab Tested</p>
                <p className="text-[10px] md:text-xs text-on-surface-variant font-semibold">Verified Composition</p>
              </div>
            </div>
            <div className="bg-white p-3 md:p-5 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 border border-[#EADEC9]/20 shadow-sm">
              <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">location_on</span>
              <div>
                <p className="text-[9px] md:text-[10px] uppercase font-bold text-deep-forest tracking-wider">Made in Sangli</p>
                <p className="text-[10px] md:text-xs text-on-surface-variant font-semibold">Maharashtra</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner / Recognition Section */}
      <section className="bg-cream-foundation/50 py-10 border-b border-[#EADEC9]/20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70 font-bold mb-6">
            Trusted By Farmers Across
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16 text-deep-forest opacity-90 transition-all">
            <span className="font-display-lg text-base md:text-xl font-bold tracking-widest hover:text-primary transition-colors">MAHARASHTRA</span>
            <span className="font-display-lg text-base md:text-xl font-semibold tracking-widest hover:text-primary transition-colors">KARNATAKA</span>
            <span className="font-display-lg text-base md:text-xl italic font-normal tracking-wide hover:text-primary transition-colors">GOA</span>
            <span className="font-display-lg text-base md:text-xl font-bold tracking-widest hover:text-primary transition-colors">GUJARAT</span>
            <span className="font-display-lg text-base md:text-xl font-semibold tracking-widest hover:text-primary transition-colors">ANDHRA PRADESH</span>
          </div>
        </div>
      </section>

      {/* Our Best Sellers Horizontal Carousel Section */}
      <section className="py-16 md:py-20 px-6 md:px-container-padding bg-surface-container-lowest relative z-10 overflow-hidden">
        <div className="texture-subtle absolute inset-0 pointer-events-none opacity-5"></div>
        
        <div className="max-w-7xl mx-auto relative px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#146a2e] mb-4 font-display-lg">
              Our Products
            </h2>
            <p className="text-on-surface-variant text-xs sm:text-sm uppercase tracking-[0.2em] font-bold">
              High-Efficacy Agricultural Solutions for Indian Farmers
            </p>
          </div>

          {/* Carousel Wrapper */}
          <div className="relative flex items-center">
            {/* Left Control Arrow */}
            <button 
              onClick={() => scroll('left')}
              className="absolute -left-2 md:-left-6 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-[#D4B242] hover:bg-[#c3a137] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll Left"
            >
              <span className="material-symbols-outlined text-white font-bold text-lg sm:text-2xl">arrow_back</span>
            </button>

            {/* Scrollable Container */}
            <div 
              ref={carouselRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto no-scrollbar py-6 px-4 w-full snap-x snap-mandatory"
            >
              {[...productsList, ...productsList, ...productsList].map((product, idx) => (
                <ProductCard 
                  key={`${product.id}-loop-${idx}`} 
                  product={product} 
                  setPage={setPage}
                  setActiveProduct={setActiveProduct}
                />
              ))}
            </div>

            {/* Right Control Arrow */}
            <button 
              onClick={() => scroll('right')}
              className="absolute -right-2 md:-right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-[#D4B242] hover:bg-[#c3a137] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll Right"
            >
              <span className="material-symbols-outlined text-white font-bold text-lg sm:text-2xl">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 px-6 md:px-container-padding bg-cream-foundation relative z-10 overflow-hidden">
        <div className="absolute -right-24 top-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="reveal">
            <span className="font-label-bold text-primary text-xs uppercase tracking-[0.4em] mb-4 md:mb-6 block font-bold">
              Our Commitment
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-deep-forest mb-8 md:mb-10 leading-tight">
              Proven Results at the <span className="italic font-normal">Field Level</span>
            </h2>
            <div className="space-y-8 md:space-y-10">
              <div className="flex gap-4 md:gap-6 items-start group">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-primary/20 transition-all border border-outline-variant/15">
                  <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">science</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-lg md:text-xl text-deep-forest mb-2 font-semibold">Organic Cytokinin Technology</h4>
                  <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">
                    5000 PPM Cytokinin combined with 10% Salt of Potash for maximum absorption and efficacy in mango crop management.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-6 items-start group">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-primary/20 transition-all border border-outline-variant/15">
                  <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">agriculture</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-lg md:text-xl text-deep-forest mb-2 font-semibold">Mango Crop Specialist</h4>
                  <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">
                    Fills potash deficiency in mango crops and promotes uniform buds and flowers, helping the fruit to form properly and increase yield.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-6 items-start group">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-primary/20 transition-all border border-outline-variant/15">
                  <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">verified_user</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-lg md:text-xl text-deep-forest mb-2 font-semibold">Tested &amp; Certified</h4>
                  <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">
                    Our products are lab-verified for composition accuracy, manufactured from Sangli, Maharashtra — the heart of India's mango belt.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative reveal stagger-2 mt-8 lg:mt-0 flex justify-center">
            {/* Aspect container with specific rounding */}
            <div className="w-full max-w-md md:max-w-lg aspect-square rounded-[48px] md:rounded-[80px] overflow-hidden shadow-2xl border border-outline-variant/10">
              <img 
                alt="Farmer Excellence" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2G4iKDROFizSFGTXrwFxNnRNb3mBfJdJU5H7zLygtIpFrmPZbsOsskdsA5k-BE4F1Huxmed6U_cn_5YlA00Ybq7SJdFtezBpaxX4JEoDsgg4OR_CbDTbJRLPBvlHtNaUL0RFQlrZ1RKhdLJU7nKL3z8cEHalJ2kMf3LR5gWm9dvW0rZ7LYyizZc9S9qai6RIZGyqUrPsLMiordikhz1q1XhsRV4BI9zOfh1QE-TVb82JyGA_UUkv0_Zzqwu4DYcT8ntQoD0xokQ"
              />
            </div>
            {/* Absolute badge */}
            <div className="absolute -bottom-6 -left-2 md:-bottom-10 md:-left-6 glass-card p-6 md:p-10 rounded-[30px] md:rounded-[40px] shadow-2xl border border-white/40 flex flex-col justify-center">
              <div className="text-primary font-display-lg text-3xl md:text-5xl font-bold leading-none mb-1 md:mb-2">100%</div>
              <div className="text-deep-forest font-label-bold uppercase tracking-widest text-[8px] md:text-[10px] font-bold">
                Net-Positive Impact
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skincare Ritual Section */}
      <section className="py-16 md:py-20 px-6 md:px-container-padding bg-cream-foundation relative z-10 border-t border-[#EADEC9]/25">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="font-label-bold text-primary text-xs uppercase tracking-[0.4em] mb-4 block font-bold">
              How To Use
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl text-deep-forest mb-4 leading-tight">
              Simple 3-Step Application Guide
            </h2>
            <p className="text-on-surface-variant text-xs sm:text-sm uppercase tracking-[0.2em] font-medium max-w-xl mx-auto">
              Get maximum results from Bud Jet with the correct application method.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#EADEC9]/25 shadow-sm hover:shadow-md transition-shadow reveal stagger-1">
              <div className="text-primary font-display-lg text-5xl font-extralight mb-6">01</div>
              <h4 className="font-headline-md text-xl text-deep-forest mb-3 font-semibold">Dilute Correctly</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                Mix 2-3 ml of Bud Jet in 1 litre of water. Stir well before use. Always prepare fresh solution for each application session.
              </p>
              <span className="text-primary text-xs uppercase tracking-widest font-bold font-label-bold">Dose: 2-3 ml / Ltr</span>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#EADEC9]/25 shadow-sm hover:shadow-md transition-shadow reveal stagger-2">
              <div className="text-primary font-display-lg text-5xl font-extralight mb-6">02</div>
              <h4 className="font-headline-md text-xl text-deep-forest mb-3 font-semibold">Spray at Right Stage</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                Apply when mango trees show early bud development signs. Spray evenly across all foliage for uniform bud and flower formation.
              </p>
              <span className="text-primary text-xs uppercase tracking-widest font-bold font-label-bold">Pre-Flowering Stage</span>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#EADEC9]/25 shadow-sm hover:shadow-md transition-shadow reveal stagger-3">
              <div className="text-primary font-display-lg text-5xl font-extralight mb-6">03</div>
              <h4 className="font-headline-md text-xl text-deep-forest mb-3 font-semibold">Avoid Mixing</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                Do NOT combine with sulfur or copper-based sprays. Use standalone for best results. Store in cool, dry place away from sunlight.
              </p>
              <span className="text-primary text-xs uppercase tracking-widest font-bold font-label-bold">No Sulfur / Copper Mix</span>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After Comparison */}
      <section className="bg-white">
        <BeforeAfter 
          beforeImage="/before.png" 
          afterImage="/after.png"
          beforeLabel="Without Bud Jet"
          afterLabel="With Bud Jet"
        />
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 px-6 md:px-container-padding bg-surface-container-lowest relative z-10 border-t border-[#EADEC9]/25">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="font-label-bold text-primary text-xs uppercase tracking-[0.4em] mb-4 block font-bold">
              Farmer Voices
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl text-deep-forest mb-4 leading-tight">
              Real Results from the Field
            </h2>
            <p className="text-on-surface-variant text-xs sm:text-sm uppercase tracking-[0.2em] font-medium">
              Verified reviews from mango farmers across Maharashtra
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, idx) => (
              <div key={testimonial.id} className={`bg-cream-foundation/40 p-8 rounded-3xl border border-[#EADEC9]/20 flex flex-col justify-between reveal stagger-${idx + 1}`}>
                <div>
                  <div className="flex text-warm-gold mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-charcoal-text text-sm italic leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {testimonial.image ? (
                    <img src={testimonial.image} className="w-10 h-10 rounded-full object-cover border border-outline-variant/30" alt={testimonial.name} />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-cream-foundation border border-outline-variant/30 flex items-center justify-center text-primary font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-label-bold text-xs uppercase tracking-wider font-bold text-deep-forest">{testimonial.name}</p>
                    <p className="text-on-surface-variant text-[10px]">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Philosophy Section */}
      <section className="py-16 md:py-20 bg-cream-foundation relative z-10 overflow-hidden border-t border-[#EADEC9]/20">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
          <span className="font-label-bold text-primary text-xs uppercase tracking-[0.4em] mb-8 block font-bold">
            Our Promise
          </span>
          <p 
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            className="text-lg sm:text-xl md:text-2xl text-deep-forest font-medium leading-relaxed mb-8 max-w-3xl mx-auto"
          >
            "We believe in the power of organic agriculture — carefully formulated, rigorously tested, and proven in the field. Our products are crafted to help Indian farmers grow stronger, healthier crops that sustain both families and ecosystems."
          </p>
          <div className="h-[1px] w-20 bg-warm-gold mx-auto mb-6"></div>
          <p 
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            className="text-base sm:text-lg text-deep-forest font-bold tracking-wide"
          >
            Husain Sayyad
          </p>
          <p className="text-[9px] text-on-surface-variant uppercase tracking-widest font-bold mt-1">
            Founder, Save Life Agro Products
          </p>
        </div>
      </section>

      {/* Key Active Botanicals Section */}
      <section className="py-16 md:py-20 px-6 md:px-container-padding bg-surface-container-lowest relative z-10 border-t border-[#EADEC9]/25">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="font-label-bold text-primary text-xs uppercase tracking-[0.4em] mb-4 block font-bold">
              Product Spotlight
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl text-deep-forest mb-4 leading-tight">
              What Makes Bud Jet Special
            </h2>
            <p className="text-on-surface-variant text-xs sm:text-sm uppercase tracking-[0.2em] font-medium max-w-xl mx-auto">
              Discover the key active ingredients behind Save Life Agro's flagship product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-cream-foundation/30 rounded-[32px] border border-[#EADEC9]/20 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 reveal stagger-1">
              <div className="aspect-[4/3] overflow-hidden bg-cream-foundation/50 flex items-center justify-center">
                <img 
                  alt="Bud Jet Organic Cytokinin" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src="/macro_crop_leaves.png" 
                />
              </div>
              <div className="p-8">
                <span className="text-[10px] uppercase font-bold text-primary tracking-widest mb-2 block">Plant Growth Regulator</span>
                <h4 className="font-headline-md text-xl text-deep-forest mb-3 font-semibold">Organic Cytokinin 5000 PPM</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Promotes uniform bud and flower formation in mango crops. Reduces excessive nitrogen while stimulating healthy growth hormones.
                </p>
                <button 
                  onClick={() => setPage('products')}
                  className="text-deep-forest font-label-bold text-xs uppercase tracking-widest font-bold border-b border-deep-forest/40 pb-0.5 hover:border-primary hover:text-primary transition-all"
                >
                  View Product
                </button>
              </div>
            </div>

            <div className="group bg-cream-foundation/30 rounded-[32px] border border-[#EADEC9]/20 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 reveal stagger-2">
              <div className="aspect-[4/3] overflow-hidden bg-cream-foundation/50 flex items-center justify-center">
                <img 
                  alt="Bud Jet Potash Mineral" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src="/modern_farming.png" 
                />
              </div>
              <div className="p-8">
                <span className="text-[10px] uppercase font-bold text-primary tracking-widest mb-2 block">Mineral Supplement</span>
                <h4 className="font-headline-md text-xl text-deep-forest mb-3 font-semibold">Salt of Potash 10%</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Fills potash deficiency in mango crops. Potassium is critical for fruit quality, size, and colour development across all growth stages.
                </p>
                <button 
                  onClick={() => setPage('products')}
                  className="text-deep-forest font-label-bold text-xs uppercase tracking-widest font-bold border-b border-deep-forest/40 pb-0.5 hover:border-primary hover:text-primary transition-all"
                >
                  View Product
                </button>
              </div>
            </div>

            <div className="group bg-cream-foundation/30 rounded-[32px] border border-[#EADEC9]/20 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 reveal stagger-3">
              <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-6 relative">
                <img 
                  alt="Bud Jet Complete Bottle" 
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700" 
                  src="/main product.png" 
                />
              </div>
              <div className="p-8">
                <span className="text-[10px] uppercase font-bold text-primary tracking-widest mb-2 block">For Agriculture Use Only</span>
                <h4 className="font-headline-md text-xl text-deep-forest mb-3 font-semibold">Bud Jet — 1 Litre Pack</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Complete solution for mango crop health — each 1-litre bottle lasts multiple application cycles. MFG. by Save Life Agro Products, Sangli.
                </p>
                <button 
                  onClick={() => setPage('products')}
                  className="text-deep-forest font-label-bold text-xs uppercase tracking-widest font-bold border-b border-deep-forest/40 pb-0.5 hover:border-primary hover:text-primary transition-all"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Save Life Agro Journal Editorial Feed */}
      <section className="py-24 px-6 md:px-container-padding bg-cream-foundation relative z-10 border-t border-[#EADEC9]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal">
            <div>
              <span className="font-label-bold text-primary text-xs uppercase tracking-[0.4em] mb-4 block font-bold">
                Agri Journal
              </span>
              <h2 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl text-deep-forest leading-tight">
                Farming Insights
              </h2>
            </div>
            <button 
              onClick={() => setPage('journal')}
              className="group flex items-center gap-2 text-primary font-label-bold text-xs uppercase tracking-widest font-bold border-b border-primary/20 pb-1 mt-4 md:mt-0 hover:border-primary hover:text-primary-container transition-all"
            >
              Read All Articles
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group flex flex-col justify-between p-6 bg-white rounded-3xl border border-[#EADEC9]/15 hover:shadow-md transition-all reveal stagger-1">
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest mb-4">Crop Management • June 24, 2026</p>
                <h4 className="font-headline-md text-xl text-deep-forest group-hover:text-primary transition-colors mb-3 font-semibold leading-snug">
                  Potash Deficiency in Mango: Symptoms &amp; Solutions
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Learn how to identify early signs of potash deficiency in mango crops and how organic cytokinin-based products like Bud Jet can help restore crop health.
                </p>
              </div>
              <button 
                onClick={() => setPage('journal')}
                className="text-primary font-label-bold text-xs uppercase tracking-widest font-bold text-left hover:text-primary-container transition-colors inline-flex items-center gap-1.5"
              >
                Read Article
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>

            <div className="group flex flex-col justify-between p-6 bg-white rounded-3xl border border-[#EADEC9]/15 hover:shadow-md transition-all reveal stagger-2">
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest mb-4">Agronomy • May 18, 2026</p>
                <h4 className="font-headline-md text-xl text-deep-forest group-hover:text-primary transition-colors mb-3 font-semibold leading-snug">
                  Understanding Cytokinins: The Plant Growth Hormone
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  A comprehensive guide to how cytokinins work in promoting cell division, bud break, and uniform flower formation in fruit-bearing trees.
                </p>
              </div>
              <button 
                onClick={() => setPage('journal')}
                className="text-primary font-label-bold text-xs uppercase tracking-widest font-bold text-left hover:text-primary-container transition-colors inline-flex items-center gap-1.5"
              >
                Read Article
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>

            <div className="group flex flex-col justify-between p-6 bg-white rounded-3xl border border-[#EADEC9]/15 hover:shadow-md transition-all reveal stagger-3">
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest mb-4">Best Practices • April 02, 2026</p>
                <h4 className="font-headline-md text-xl text-deep-forest group-hover:text-primary transition-colors mb-3 font-semibold leading-snug">
                  When &amp; How to Spray Bud Jet on Mango Crops
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  A field-level guide on the optimal timing, dilution, and spray technique for getting the best results with Bud Jet on Alphonso and Kesar mango varieties.
                </p>
              </div>
              <button 
                onClick={() => setPage('journal')}
                className="text-primary font-label-bold text-xs uppercase tracking-widest font-bold text-left hover:text-primary-container transition-colors inline-flex items-center gap-1.5"
              >
                Read Article
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
