import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Provenance from './pages/Provenance';
import Journal from './pages/Journal';
import Distributor from './pages/Distributor';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';
import Admin from './pages/Admin';
import WhatsAppButton from './components/WhatsAppButton';
import { AdminProvider } from './context/AdminContext';

function AppContent() {
  const [page, setPage] = useState(() => {
    const path = window.location.pathname.replace('/', '');
    const validPages = ['home', 'products', 'story', 'journal', 'distributor', 'admin', 'product-details'];
    if (path && validPages.includes(path)) return path;
    return 'home';
  });
  const [activeProduct, setActiveProduct] = useState(null);

  // Sync state changes to URL
  useEffect(() => {
    if (page === 'home') {
      window.history.pushState({}, '', '/');
    } else {
      window.history.pushState({}, '', `/${page}`);
    }
  }, [page]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '');
      setPage(path || 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [showIntro, setShowIntro] = useState(true);
  const [fadeIntro, setFadeIntro] = useState(false);

  const particles = React.useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 50 + 35}%`,
      size: `${Math.random() * 3 + 2}px`,
      delay: `${Math.random() * 2.5}s`,
      duration: `${Math.random() * 2 + 2.5}s`,
      drift: `${(Math.random() - 0.5) * 50}px`,
    }));
  }, []);

  const handleIntroEnd = () => {
    setFadeIntro(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 1000); // 1000ms transition fadeout
  };

  // Auto-play and fade out the innovative loader after 3.5 seconds
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        handleIntroEnd();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  // Centralized scroll-to-top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home setPage={setPage} setActiveProduct={setActiveProduct} />;
      case 'products':
        return <Collection setPage={setPage} setActiveProduct={setActiveProduct} />;
      case 'product-details':
        return <ProductDetails product={activeProduct} setPage={setPage} />;
      case 'story':
        return <Provenance />;
      case 'distributor':
        return <Distributor />;
      case 'journal':
        return <Journal />;
      case 'admin':
        return <Admin />;
      case 'notfound':
        return <NotFound setPage={setPage} />;
      default:
        return <NotFound setPage={setPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-body-md text-on-background bg-cream-foundation antialiased">
      {/* Luxury CSS/SVG Intro Animation Overlay */}
      {showIntro && (
        <div 
          onClick={handleIntroEnd}
          className={`fixed inset-0 z-[99999] bg-[#FBF7F1] flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            fadeIntro ? 'opacity-0 scale-[1.03] blur-md pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Ambient Glow Background Pulse */}
          <div 
            className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(20,106,46,0.06)_0%,rgba(240,196,23,0.04)_40%,transparent_70%)] pointer-events-none"
            style={{
              animation: 'pulseBg 4s ease-in-out infinite',
            }}
          />

          {/* Floating Nebula Organic Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
              <span
                key={p.id}
                className="absolute rounded-full bg-warm-gold/30"
                style={{
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  animation: `nebulaFloat ${p.duration} ease-in-out infinite`,
                  animationDelay: p.delay,
                  '--drift-x': p.drift,
                }}
              />
            ))}
          </div>

          {/* Core Brand SVG Leaf & Star logo */}
          <div className="relative z-10 flex flex-col items-center select-none">
            <svg 
              viewBox="0 0 100 100" 
              className="w-24 h-24 md:w-28 md:h-28 mb-8 drop-shadow-[0_4px_12px_rgba(20,106,46,0.08)]"
            >
              {/* Leaf outer contour */}
              <path
                d="M 50,85 C 22,60 22,30 50,12 C 78,30 78,60 50,85 Z"
                fill="none"
                stroke="#1F5D3A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="350"
                strokeDashoffset="350"
                className="loader-draw-outline"
              />
              
              {/* Main vertical vein */}
              <path
                d="M 50,85 L 50,18"
                fill="none"
                stroke="#D4B242"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="120"
                strokeDashoffset="120"
                className="loader-draw-vein"
              />
              
              {/* Secondary diagonal veins */}
              <path
                d="M 50,72 C 40,66 38,58 38,58"
                fill="none"
                stroke="#D4B242"
                strokeWidth="0.85"
                strokeLinecap="round"
                strokeDasharray="120"
                strokeDashoffset="120"
                className="loader-draw-vein"
                style={{ animationDelay: '0.6s' }}
              />
              <path
                d="M 50,72 C 60,66 62,58 62,58"
                fill="none"
                stroke="#D4B242"
                strokeWidth="0.85"
                strokeLinecap="round"
                strokeDasharray="120"
                strokeDashoffset="120"
                className="loader-draw-vein"
                style={{ animationDelay: '0.6s' }}
              />
              <path
                d="M 50,57 C 38,51 35,42 35,42"
                fill="none"
                stroke="#D4B242"
                strokeWidth="0.85"
                strokeLinecap="round"
                strokeDasharray="120"
                strokeDashoffset="120"
                className="loader-draw-vein"
                style={{ animationDelay: '1.0s' }}
              />
              <path
                d="M 50,57 C 62,51 65,42 65,42"
                fill="none"
                stroke="#D4B242"
                strokeWidth="0.85"
                strokeLinecap="round"
                strokeDasharray="120"
                strokeDashoffset="120"
                className="loader-draw-vein"
                style={{ animationDelay: '1.0s' }}
              />
              <path
                d="M 50,42 C 42,37 40,28 40,28"
                fill="none"
                stroke="#D4B242"
                strokeWidth="0.85"
                strokeLinecap="round"
                strokeDasharray="120"
                strokeDashoffset="120"
                className="loader-draw-vein"
                style={{ animationDelay: '1.4s' }}
              />
              <path
                d="M 50,42 C 58,37 60,28 60,28"
                fill="none"
                stroke="#D4B242"
                strokeWidth="0.85"
                strokeLinecap="round"
                strokeDasharray="120"
                strokeDashoffset="120"
                className="loader-draw-vein"
                style={{ animationDelay: '1.4s' }}
              />

              {/* Sparkle star at the top (represents cosmic Nebula element) */}
              <path
                d="M 50,12 L 51.5,10.5 L 50,9 L 48.5,10.5 Z M 50,9 L 50,5 M 50,12 L 50,16 M 48.5,10.5 L 44.5,10.5 M 51.5,10.5 L 55.5,10.5"
                fill="#D4B242"
                stroke="#D4B242"
                strokeWidth="0.5"
                className="loader-sparkle"
                style={{ opacity: 0 }}
              />
            </svg>

            {/* Premium Typography Brand Reveal */}
            <h1 className="loader-title text-2xl md:text-3xl font-display-lg uppercase tracking-[0.3em] text-deep-forest font-semibold text-center select-none" style={{ opacity: 0 }}>
              Save Life Agro
            </h1>
            
            <p className="loader-tagline mt-2 text-[10px] md:text-xs tracking-[0.4em] text-on-surface-variant font-label-bold uppercase text-center select-none" style={{ opacity: 0 }}>
              Organic Solutions for Better Yields
            </p>
          </div>

          {/* Minimal Elegant Progress Bar */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-outline-variant/30 overflow-hidden">
            <div 
              className="h-full bg-warm-gold" 
              style={{
                animation: 'progressFill 3.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              }}
            />
          </div>

          {/* Removed Skip Intro Overlay Button */}
        </div>
      )}

      {/* Sticky Header Navigation */}
      <Navbar currentPage={page} setPage={setPage} />

      {/* Main Screen Content */}
      <div className="flex-grow animate-in fade-in zoom-in-95 duration-500 slide-in-from-bottom-4">
        {renderPage()}
      </div>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Foot Footer */}
      <Footer setPage={setPage} />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}
