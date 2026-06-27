import React, { useState, useRef, useEffect } from 'react';

export default function BeforeAfter({ beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After" }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    
    setSliderPosition(percent);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full max-w-5xl mx-auto py-16 px-6 md:px-0">
      <div className="text-center mb-12 reveal">
        <span className="text-label-bold font-label-bold text-primary tracking-[0.4em] mb-4 block font-bold uppercase text-xs">
          Proven Results
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display-lg text-deep-forest leading-tight mb-4">
          See the Difference
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          Slide to compare the crop before and after using Bud Jet. Notice the uniform flowering and healthier canopy.
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden cursor-ew-resize select-none border border-[#EADEC9]/50 shadow-2xl reveal stagger-1"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* Background (After) Image */}
        <img 
          src={afterImage} 
          alt={afterLabel} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        
        {/* Foreground (Before) Image inside a clipped div */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img 
            src={beforeImage} 
            alt={beforeLabel} 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs md:text-sm font-label-bold uppercase tracking-widest font-bold z-10">
          {beforeLabel}
        </div>
        <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs md:text-sm font-label-bold uppercase tracking-widest font-bold z-10">
          {afterLabel}
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 hover:w-1.5 transition-all"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.3)] text-deep-forest">
            <span className="material-symbols-outlined font-bold text-lg md:text-xl">code</span>
          </div>
        </div>
      </div>
    </div>
  );
}
