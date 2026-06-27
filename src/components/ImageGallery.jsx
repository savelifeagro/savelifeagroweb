import React, { useState, useEffect } from 'react';

export default function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {images.map((img, index) => (
          <div 
            key={index}
            onClick={() => setSelectedImage(img)}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-[#EADEC9]/30 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <img 
              src={img.src} 
              alt={img.alt || `Gallery image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-deep-forest/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <span className="material-symbols-outlined text-xl md:text-2xl">close</span>
          </button>
          
          <div 
            className="relative flex flex-col items-center justify-center w-full max-w-6xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.src}
              alt={selectedImage.alt || 'Enlarged image'}
              className="max-w-full max-h-[75vh] md:max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            {selectedImage.caption && (
              <p className="mt-4 md:mt-6 text-white text-xs md:text-base font-body-md bg-black/50 px-4 md:px-6 py-2 rounded-full text-center max-w-[90vw]">
                {selectedImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
