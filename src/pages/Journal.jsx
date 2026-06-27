import React, { useState, useEffect } from 'react';

export default function Journal() {
  const [activeCategory, setActiveCategory] = useState('all'); // all | agro-science | soil-vitality | sustainability | journey
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [readingEssay, setReadingEssay] = useState(null);

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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const essays = [
    {
      id: 'bud-break-science',
      category: 'agro-science',
      tag: 'CROP SCIENCE',
      title: 'The Physiology of Bud Break',
      summary: 'A deep dive into how Organic Cytokinin 5000 PPM triggers cell division and uniform flowering in Kesar and Alphonso mango crops.',
      body: 'In this investigation, we analyze the biological processes behind bud initiation. Flower bud differentiation is a crucial stage in mango cultivation. By applying organic cytokinin, we stimulate lateral bud development and cellular division. Combined with 10% potash, it reduces excess nitrogen, balancing plant vigor and promoting uniform flowering. Save Life Agro agronomists work with field data across Ratnagiri to refine application timing for maximum fruit setting.',
      image: '/macro_crop_leaves.png'
    },
    {
      id: 'soil-vitality-konkan',
      category: 'soil-vitality',
      tag: 'SOIL VITALITY',
      title: 'Restoring Soil Nutrients in the Mango Belt',
      summary: 'How potassium deficiency affects fruit size, weight, and color, and our methods to replenish soil vitality organically.',
      body: 'Mango crops draw heavy amounts of potassium during fruit development. In coastal soils like Ratnagiri and Devgad, high rainfall leaches away vital minerals. Potash application is critical to balance soil composition. Our Soil Energizer formula helps release locked nutrients, promoting healthy root structures that absorb trace elements. Farmers using organic soil conditioners report improved crop resistance to weather extremes and better soil water retention.',
      image: '/modern_farming.png'
    },
    {
      id: 'sangli-to-orchards',
      category: 'journey',
      tag: 'DISTRIBUTOR NETWORK',
      title: 'Connecting Sangli to Indian Mango Orchards',
      summary: 'How Save Life Agro grew from a local Sangli formulation laboratory to a trusted brand serving thousands of farmers.',
      body: 'Founded in Sangli, Maharashtra, Save Life Agro began with a simple mission: to provide high-efficacy organic agricultural products to local farmers. Today, our distributor network spans Maharashtra, Karnataka, Gujarat, and Goa. We coordinate directly with local dealers to ensure that fresh, lab-tested batches of Bud Jet reach farmers right before the bud differentiation season. This close-knit relationship ensures technical field support is always a phone call away.',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'organic-horticulture',
      category: 'sustainability',
      tag: 'SUSTAINABILITY',
      title: 'Sustainable Farming: The Future of Horticulture',
      summary: 'Why organic farming formulations are key to preserving soil quality for future generations.',
      body: 'Over-application of chemical nitrogen fertilizers has led to soil acidification and decreased microbial activity in many orchards. At Save Life Agro, we advocate for organic alternatives. Our products trigger the plant\'s natural hormonal pathways without leaving harmful chemical residues. By adopting organic plant growth regulators like Bud Jet, farmers build long-term sustainability, ensuring their land remains fertile and productive for generations to come.',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'potash-role-quality',
      category: 'agro-science',
      tag: 'NUTRIENT RESEARCH',
      title: 'The Vital Role of Potash in Fruit Quality',
      summary: 'Analyzing how potash aids in starch conversion and enzyme activation during the critical mango fruit setting phase.',
      body: 'Potassium (supplied as Potash) acts as an activator for dozens of essential enzymes within plant tissues. It regulates water loss by controlling the opening and closing of stomata, facilitates the transport of sugars and starches from leaves to developing fruit, and plays a major role in nitrogen utilization. When combined with organic Cytokinin, it guarantees that the uniform blossoms transition into heavy, sweet, and uniform mangoes.',
      image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop&q=80'
    }
  ];

  const filteredEssays = essays.filter(e => activeCategory === 'all' || e.category === activeCategory);

  return (
    <div className="bg-cream-foundation text-charcoal-text overflow-x-hidden min-h-screen">
      
      {/* Hero Cover Story */}
      <section className="px-6 md:px-container-padding pt-12 md:pt-16 mb-20 md:mb-section-gap max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Cover Image */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-2xl shadow-2xl h-[400px] sm:h-[550px] md:h-[650px] lg:h-[716px] group border border-outline-variant/10">
            <img 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103" 
              src={essays[0].image} 
              alt={essays[0].title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] tracking-wider uppercase font-bold mb-4 border border-white/25">
                FEATURE STORY
              </span>
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display-lg leading-[0.95] tracking-tighter max-w-lg font-bold">
                {essays[0].title}
              </h2>
            </div>
          </div>

          {/* Cover Description */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:pl-8 reveal">
            <span className="text-label-bold font-label-bold text-warm-gold tracking-[0.25em] mb-4 block font-bold text-xs uppercase">
              {essays[0].tag}
            </span>
            <p className="text-xl md:text-3xl font-headline-md text-charcoal-text leading-snug mb-6 font-bold">
              {essays[0].summary}
            </p>
            <p className="text-xs md:text-sm text-on-surface-variant/80 mb-10 leading-relaxed max-w-md">
              In this volume, our agronomy research team sits down to discuss how organic hormones and key active minerals combine to trigger healthy bud formation.
            </p>
            <button 
              onClick={() => setReadingEssay(essays[0])}
              className="w-fit bg-deep-forest hover:bg-primary text-white px-8 py-4.5 rounded-full text-xs font-label-bold font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 tracking-widest uppercase cursor-pointer"
            >
              READ ESSAY <span className="material-symbols-outlined text-[16px]">north_east</span>
            </button>
          </div>
        </div>
      </section>

      {/* Category Sorters */}
      <section className="bg-surface-container-low/70 border-y border-surface-container py-6 px-6 md:px-container-padding mb-20 max-w-7xl mx-auto rounded-2xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar max-w-full">
            {[
              { id: 'all', label: 'ALL PAPERS' },
              { id: 'agro-science', label: 'CROP SCIENCE' },
              { id: 'soil-vitality', label: 'SOIL VITALITY' },
              { id: 'journey', label: 'DISTRIBUTOR LOGS' },
              { id: 'sustainability', label: 'SUSTAINABILITY' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`text-[10px] uppercase font-label-bold tracking-widest pb-1 transition-all whitespace-nowrap border-b-2 font-bold cursor-pointer ${
                  activeCategory === tab.id 
                    ? 'text-primary border-primary' 
                    : 'text-on-surface-variant/50 border-transparent hover:text-deep-forest'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article Grid Layout */}
      <section className="px-6 md:px-container-padding mb-20 md:mb-section-gap max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-gutter">
          
          {/* Main List Column */}
          <div className="md:col-span-8 flex flex-col gap-12">
            {filteredEssays.slice(1).length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl mb-2">info</span>
                <p className="text-sm">No additional articles in this category.</p>
              </div>
            ) : (
              filteredEssays.slice(1).map((essay) => (
                <div 
                  key={essay.id}
                  onClick={() => setReadingEssay(essay)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm border border-outline-variant/15 hover:-translate-y-2 hover:shadow-md transition-all duration-500"
                >
                  <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-surface-container-low border-b border-surface-container/30">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" 
                      src={essay.image} 
                      alt={essay.title} 
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <span className="text-[10px] font-label-bold text-warm-gold font-bold tracking-widest mb-2 block uppercase">
                      {essay.tag}
                    </span>
                    <h3 className="text-xl md:text-2xl font-headline-md text-charcoal-text font-bold mb-4 group-hover:text-primary transition-colors">
                      {essay.title}
                    </h3>
                    <p className="text-xs md:text-sm text-on-surface-variant/80 leading-relaxed line-clamp-3">
                      {essay.summary}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar Columns */}
          <div className="md:col-span-4 flex flex-col gap-12 lg:pl-6 justify-start">
            {/* Pull Quote Card */}
            <div className="bg-white/40 p-8 rounded-2xl border border-outline-variant/20 flex flex-col justify-center shadow-inner relative overflow-hidden">
              <span className="material-symbols-outlined text-warm-gold text-4xl mb-4 self-start opacity-75">format_quote</span>
              <blockquote className="text-lg md:text-xl font-headline-md italic text-deep-forest font-semibold mb-6 leading-relaxed">
                "Our mission is simple: helping Indian farmers grow healthier crops that sustain both families and soil health."
              </blockquote>
              <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                — HUSAIN SAYYAD, FOUNDER
              </p>
            </div>
            
            {/* Tiny Featured Banner */}
            <div 
              onClick={() => setReadingEssay(essays[3])}
              className="group cursor-pointer bg-deep-forest text-cream-foundation p-6 rounded-2xl hover:shadow-xl transition-all duration-500 flex flex-col gap-4 border border-outline-variant/10"
            >
              <span className="text-[9px] font-label-bold text-warm-gold tracking-widest uppercase font-bold">Featured Guide</span>
              <h4 className="font-headline-md text-base md:text-lg font-bold text-white group-hover:text-warm-gold transition-colors">Flowering & Setting Guide</h4>
              <p className="text-xs text-cream-foundation/75 leading-relaxed">A complete guide to managing pre-flowering hormones and potassium uptake in Alphonso crops.</p>
              <span className="text-[10px] font-label-bold font-bold uppercase tracking-widest text-white/90 border-b border-white/20 pb-0.5 self-start group-hover:border-warm-gold transition-colors">Read Guide</span>
            </div>
          </div>

        </div>
      </section>

      {/* Monthly Crop Newsletter Subscription */}
      <section className="px-6 md:px-container-padding max-w-7xl mx-auto mb-20 md:mb-section-gap">
        <div className="px-8 py-16 md:p-24 bg-deep-forest text-cream-foundation rounded-[32px] md:rounded-[40px] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[300px] md:text-[400px] absolute -right-12 -top-12">eco</span>
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <p className="text-label-bold font-label-bold text-warm-gold tracking-[0.2em] mb-4 md:mb-6 font-bold text-xs uppercase">
              JOIN THE SAVE LIFE AGRO NETWORK
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display-lg leading-tight mb-10 md:mb-12 max-w-2xl">
              Receive seasonal crop newsletters, direct to your inbox.
            </h2>
            
            {subscribed ? (
              <div className="bg-white/10 rounded-xl p-6 border border-white/20 max-w-md animate-in fade-in duration-500">
                <p className="text-warm-gold font-bold text-sm">✓ Welcome to the Network</p>
                <p className="text-xs text-white/80 mt-1">Our upcoming seasonal crop management guide will be emailed to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-6 max-w-2xl">
                <div className="flex-grow">
                  <input 
                    className="w-full bg-transparent border-0 border-b border-cream-foundation/30 py-3 text-lg md:text-xl font-headline-md placeholder:text-cream-foundation/30 focus:ring-0 focus:border-warm-gold transition-colors duration-500 text-white outline-none" 
                    placeholder="Your email address" 
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-warm-gold hover:bg-white text-deep-forest px-10 py-4.5 rounded-full text-xs font-label-bold font-bold transition-all uppercase tracking-widest self-start sm:self-end active:scale-95 shadow-lg cursor-pointer"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Full Essay Overlay Modal */}
      {readingEssay && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/55 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-3xl bg-cream-foundation rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto custom-scrollbar border border-outline-variant/30 animate-in zoom-in-95 duration-300">
            {/* Header Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img className="w-full h-full object-cover" src={readingEssay.image} alt={readingEssay.title} />
              <div className="absolute inset-0 bg-black/45 flex items-end p-6">
                <div>
                  <span className="text-warm-gold text-[10px] tracking-widest font-label-bold font-bold block mb-1 uppercase">
                    {readingEssay.tag}
                  </span>
                  <h2 className="text-white text-2xl md:text-4xl font-headline-md font-bold leading-tight">
                    {readingEssay.title}
                  </h2>
                </div>
              </div>
              <button 
                onClick={() => setReadingEssay(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            {/* Content Body */}
            <div className="p-6 md:p-10">
              <p className="text-base md:text-lg font-headline-md font-bold text-deep-forest mb-6 italic leading-relaxed">
                {readingEssay.summary}
              </p>
              <div className="text-sm md:text-base text-on-surface-variant leading-relaxed space-y-4">
                <p>{readingEssay.body}</p>
                <p>
                  To receive the complete agronomic research reports, soil mapping charts, and seasonal dealer price listings, join our subscriber network using the newsletter forms located on this page.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-surface-container flex justify-end">
                <button 
                  onClick={() => setReadingEssay(null)}
                  className="px-6 py-2.5 bg-deep-forest text-white rounded-full font-label-bold text-xs uppercase tracking-widest hover:bg-primary transition-colors cursor-pointer"
                >
                  Close Essay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
