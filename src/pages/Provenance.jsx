import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ImageGallery from '../components/ImageGallery';

export default function Provenance() {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 432;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleReveal);
    setTimeout(handleReveal, 100);
    return () => window.removeEventListener('scroll', handleReveal);
  }, []);

  const regions = [
    {
      id: 'maharashtra',
      location: 'RATNAGIRI, MAHARASHTRA',
      title: "Alphonso Mango Belt",
      image: '/region1.webp'
    },
    {
      id: 'konkan',
      location: 'KONKAN COAST, MAHARASHTRA',
      title: 'Hapus & Kesar Orchards',
      image: '/region2.webp'
    },
    {
      id: 'sangli',
      location: 'SANGLI, MAHARASHTRA',
      title: 'Save Life Agro Origin',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=60'
    }
  ];

  const milestones = [
    {
      year: '2018',
      title: 'The Idea Takes Root',
      description: 'Founder Husen Sayyad, seeing mango farmers in Sangli struggle with poor bud formation and potash deficiency, began formulating an organic solution.',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop&q=60'
    },
    {
      year: '2020',
      title: 'Bud Jet is Born',
      description: 'After 2 years of field trials across Ratnagiri and Devgad orchards, the Bud Jet formula — Organic Cytokinin 5000 PPM + Salt of Potash 10% — was finalized.',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&auto=format&fit=crop&q=60'
    },
    {
      year: '2024',
      title: 'Trusted by Thousands',
      description: 'Save Life Agro now serves mango farmers across Maharashtra, Karnataka, Goa, and Gujarat, with consistent results in uniform budding and improved fruit formation.',
      image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&auto=format&fit=crop&q=60'
    }
  ];

  return (
    <div className="bg-cream-foundation text-on-background overflow-x-hidden min-h-screen">
      <Helmet>
        <title>Our Story & Provenance | Save Life Agro</title>
        <meta name="description" content="Discover the roots of Save Life Agro. Lab-tested formulations crafted for the unique needs of Indian agriculture." />
      </Helmet>
      
      {/* Hero Section */}
      <header className="relative w-full h-[70vh] md:h-[90vh] flex items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Mango orchards at sunrise"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=1600&auto=format&fit=crop&q=80"
            style={{ opacity: 0.38 }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 reveal">
          <span className="text-label-bold font-label-bold text-warm-gold tracking-[0.3em] uppercase mb-4 md:mb-6 block font-bold">
            The Story of Save Life Agro
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display-lg text-white max-w-4xl leading-tight">
            From Field to Fruit
          </h1>
          <p className="text-xs sm:text-sm md:text-lg font-body-lg text-white/90 max-w-2xl mx-auto mt-6 md:mt-8 leading-relaxed">
            Born in Sangli, Maharashtra, Save Life Agro was created to solve a real problem — helping Indian mango farmers grow uniform, healthy crops with organic, science-backed solutions.
          </p>
        </div>
      </header>

      {/* Process Section */}
      <section className="py-20 md:py-section-gap px-6 md:px-container-padding max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter items-center">
          
          {/* Text Content */}
          <div className="col-span-12 lg:col-span-5 z-20 reveal">
            <span className="text-label-bold font-label-bold text-primary tracking-widest mb-4 block font-bold">
              PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display-lg text-deep-forest mb-6 md:mb-8 leading-tight">
              Organic Agri Science
            </h2>
            <div className="space-y-6 text-sm md:text-base text-on-surface-variant">
              <p className="leading-relaxed">
                Bud Jet is formulated using Organic Cytokinin — a natural plant hormone that promotes cell division, uniform bud break, and flower formation. Combined with Salt of Potash (10%), it fills a critical mineral gap in mango crop nutrition.
              </p>
              <p className="leading-relaxed">
                The result is a mango crop that flowers uniformly, reduces nitrogen excess, and forms fruit properly — leading to better yields and higher quality produce for the farmer.
              </p>
              <div className="pt-4">
                <span className="inline-flex items-center gap-4 text-label-bold font-label-bold text-deep-forest group font-bold tracking-wider text-xs uppercase">
                  DOSE: 2-3 ML PER LITRE OF WATER 
                  <span className="material-symbols-outlined">science</span>
                </span>
              </div>
            </div>
          </div>

          {/* Layered Image Composition */}
          <div className="col-span-12 lg:col-span-7 relative h-[450px] sm:h-[600px] lg:h-[700px] mt-8 lg:mt-0">
            {/* Top Right Background Image */}
            <div className="absolute top-0 right-0 w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-xl border border-outline-variant/10 bg-white p-6">
              <img loading="lazy" decoding="async" 
                className="w-full h-full object-contain" 
                src="/main product.png" 
                alt="Bud Jet Product"
              />
            </div>
            
            {/* Bottom Left Foreground Image */}
            <div className="absolute bottom-4 left-0 w-[55%] h-[60%] rounded-2xl overflow-hidden shadow-2xl border-[6px] md:border-[8px] border-cream-foundation z-30">
              <img loading="lazy" decoding="async" 
                className="w-full h-full object-cover" 
                src="/story1.webp" 
                alt="Bud Jet Organic Growth Details"
              />
            </div>
            
            {/* Floating Glass Chip Badge */}
            <div className="absolute top-[25%] left-[5%] md:left-[15%] glass-card px-5 py-3 md:px-6 md:py-4 rounded-xl shadow-xl z-40 border border-white/40">
              <span className="text-xs md:text-sm font-label-bold text-deep-forest block font-bold">5000 PPM Cytokinin</span>
              <span className="text-[10px] text-on-surface-variant font-semibold">+ Salt of Potash 10%</span>
            </div>
          </div>

        </div>
      </section>

      {/* Numbers Counter Section */}
      <section className="bg-deep-forest text-white py-16 md:py-20 relative z-10 border-y border-warm-gold/20">
        <div className="max-w-7xl mx-auto px-6 md:px-container-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-8 md:pt-0 reveal stagger-1 flex flex-col items-center justify-center">
              <span className="text-4xl md:text-6xl font-display-lg text-warm-gold font-bold mb-2 flex items-center gap-1">
                500<span className="text-3xl">+</span>
              </span>
              <p className="text-[10px] md:text-xs font-label-bold uppercase tracking-[0.2em] text-white/80">Farmers Served</p>
            </div>
            
            <div className="pt-8 md:pt-0 reveal stagger-2 flex flex-col items-center justify-center">
              <span className="text-4xl md:text-6xl font-display-lg text-warm-gold font-bold mb-2 flex items-center gap-1">
                5<span className="text-3xl">+</span>
              </span>
              <p className="text-[10px] md:text-xs font-label-bold uppercase tracking-[0.2em] text-white/80">Years in Business</p>
            </div>

            <div className="pt-8 md:pt-0 reveal stagger-3 flex flex-col items-center justify-center">
              <span className="text-4xl md:text-6xl font-display-lg text-warm-gold font-bold mb-2 flex items-center gap-1">
                100<span className="text-3xl">%</span>
              </span>
              <p className="text-[10px] md:text-xs font-label-bold uppercase tracking-[0.2em] text-white/80">Organic Formulation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="relative h-[300px] md:h-[450px] overflow-hidden my-12">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" decoding="async" 
            alt="Mango orchard texture" 
            className="w-full h-full object-cover opacity-20 filter saturate-50" 
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&auto=format&fit=crop&q=60"
          />
          <div className="absolute inset-0 bg-primary/5"></div>
        </div>
        <div className="relative z-10 flex h-full items-center justify-center text-center px-6 max-w-3xl mx-auto reveal">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-display-lg text-deep-forest font-medium mb-6 leading-relaxed">
              "Healthy crops mean healthy families. That is why we do what we do."
            </h3>
            <p className="text-[10px] md:text-xs font-label-bold font-bold text-primary uppercase tracking-[0.4em]">
              Husen Sayyad, Founder — Save Life Agro Products
            </p>
          </div>
        </div>
      </section>

      {/* Farm Regions Carousel */}
      <section className="py-16 md:py-20 px-6 md:px-container-padding max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12">
          <div className="max-w-xl reveal">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display-lg text-deep-forest leading-tight">
              The Farmer's Region
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant mt-4 leading-relaxed">
              Bud Jet is designed for farmers across India's premier mango growing regions.
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => scrollCarousel('left')}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-primary-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined">west</span>
            </button>
            <button 
              onClick={() => scrollCarousel('right')}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-warm-gold bg-warm-gold flex items-center justify-center text-deep-forest hover:scale-105 transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined">east</span>
            </button>
          </div>
        </div>

        {/* Carousel Row */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 scroll-smooth snap-x snap-mandatory"
        >
          {regions.map((region) => (
            <div key={region.id} className="min-w-[280px] sm:min-w-[360px] md:min-w-[400px] flex-shrink-0 snap-start group">
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-6 shadow-xl border border-outline-variant/15">
                <img loading="lazy" decoding="async" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src={region.image} 
                  alt={region.title} 
                />
                
                {/* Overlay Card Details */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-5 md:p-6 glass-card bg-cream-foundation/90 rounded-xl border border-white/40 shadow-lg">
                  <span className="text-[9px] md:text-[10px] font-label-bold text-primary font-bold tracking-widest block mb-2">
                    {region.location}
                  </span>
                  <h4 className="text-lg md:text-xl font-headline-md text-deep-forest font-bold">
                    {region.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Heritage Timeline Section */}
      <section className="py-16 md:py-24 px-6 md:px-container-padding max-w-4xl mx-auto overflow-hidden">
        <div className="text-center mb-16 md:mb-24 reveal">
          <span className="text-label-bold font-label-bold text-primary tracking-[0.4em] mb-4 block font-bold text-xs uppercase">
            TIMELINE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display-lg text-deep-forest leading-tight">
            Our Journey
          </h2>
        </div>

        {/* Responsive Timeline Grid */}
        <div className="relative flex flex-col gap-16 md:gap-24">
          {/* Vertical line helper on Desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-warm-gold to-transparent"></div>

          {milestones.map((m, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={m.year}
                className={`relative flex flex-col md:flex-row items-center justify-between w-full group gap-6 md:gap-0 ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Year and Text */}
                <div className={`w-full md:w-[42%] flex flex-col ${
                  isEven ? 'md:text-right md:items-end' : 'md:text-left md:items-start'
                } reveal`}>
                  <span className="text-2xl md:text-3xl font-headline-md text-warm-gold font-bold mb-1">{m.year}</span>
                  <h4 className="text-sm md:text-base font-label-bold text-deep-forest mb-3 font-bold uppercase tracking-wider">{m.title}</h4>
                  <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">{m.description}</p>
                </div>

                {/* Circle marker on Desktop */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-deep-forest border-4 border-cream-foundation z-10 shadow-md"></div>

                {/* Image */}
                <div className="w-full md:w-[42%] reveal stagger-1">
                  <div className="rounded-xl overflow-hidden shadow-lg h-44 md:h-48 border border-outline-variant/15 hover:shadow-xl transition-all duration-300">
                    <img loading="lazy" decoding="async" 
                      className="w-full h-full object-cover" 
                      src={m.image} 
                      alt={m.title} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Field Gallery Section */}
      <section className="py-16 md:py-24 px-6 md:px-container-padding max-w-7xl mx-auto border-t border-[#EADEC9]/50">
        <div className="text-center mb-12 reveal">
          <span className="text-label-bold font-label-bold text-primary tracking-[0.4em] mb-4 block font-bold text-xs uppercase">
            From the Fields
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display-lg text-deep-forest leading-tight mb-4">
            Farmer Success Stories
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Glimpses of healthy orchards and satisfied farmers from across our growing regions.
          </p>
        </div>
        
        <div className="reveal stagger-1">
          <ImageGallery images={[
            { src: "/success1.webp", caption: "Healthy mango budding in Ratnagiri" },
            { src: "/success2.webp", caption: "Early morning spray at Devgad orchards" },
            { src: "/success3.webp", caption: "Uniform flowering post Bud Jet application" },
            { src: "/success4.webp", caption: "Farmer assessing crop quality in Sangli" }
          ]} />
        </div>
      </section>
    </div>
  );
}
