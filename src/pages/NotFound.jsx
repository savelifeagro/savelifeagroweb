import React from 'react';

export default function NotFound({ setPage }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-cream-foundation px-6 text-center">
      <h1 className="text-6xl md:text-8xl font-display-lg text-deep-forest mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-headline-md text-deep-forest mb-6">Page Not Found</h2>
      <p className="text-on-surface-variant max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <button
        onClick={() => setPage && setPage('home')}
        className="bg-warm-gold hover:bg-white text-deep-forest font-label-bold text-xs uppercase tracking-widest py-3 px-8 rounded-full shadow-lg transition-all"
      >
        Return to Homepage
      </button>
    </div>
  );
}
