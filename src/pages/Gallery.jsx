import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setImages(data);
      } catch (err) {
        console.error("Error fetching gallery", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-cream-foundation text-on-background pt-8 md:pt-12 pb-24 px-6 md:px-12 lg:px-24">
      <Helmet>
        <title>Our Results | Save Life Agro</title>
        <meta name="description" content="See the real-world results of Save Life Agro's organic fertilizers on crops like mangoes and pomegranates." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display text-deep-forest mb-6">Real Results from the Field</h1>
        <p className="text-on-surface-variant max-w-2xl mb-12">
          Seeing is believing. Browse our gallery of real crops, buds, and fruits nurtured by Save Life Agro products.
        </p>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[250px]">
            {[...Array(12)].map((_, i) => {
              const isLarge = i % 8 === 0;
              const isWide = i % 8 === 4 || i % 8 === 5;
              const isTall = i % 8 === 2 || i % 8 === 7;
              
              let spanClass = "col-span-1 row-span-1";
              if (isLarge) spanClass = "col-span-2 row-span-2";
              else if (isWide) spanClass = "md:col-span-2 col-span-2 row-span-1";
              else if (isTall) spanClass = "col-span-1 row-span-2";
              
              return <div key={i} className={`bg-gray-200 animate-pulse rounded-2xl ${spanClass}`}></div>
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[250px]">
            {images.map((img, i) => {
              // Create dynamic bento grid pattern
              const isLarge = i % 8 === 0;
              const isWide = i % 8 === 4 || i % 8 === 5;
              const isTall = i % 8 === 2 || i % 8 === 7;
              
              let spanClass = "col-span-1 row-span-1";
              if (isLarge) spanClass = "col-span-2 row-span-2";
              else if (isWide) spanClass = "md:col-span-2 col-span-2 row-span-1";
              else if (isTall) spanClass = "col-span-1 row-span-2";

              return (
                <motion.div
                  key={img.id}
                  layoutId={`img-${img.id}`}
                  whileHover={{ scale: 0.98 }}
                  className={`relative cursor-pointer overflow-hidden rounded-2xl group shadow-sm hover:shadow-xl transition-all ${spanClass}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img.url}
                    alt={img.caption || 'Crop result'}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 drop-shadow-md text-4xl">
                      zoom_in
                    </span>
                  </div>
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-xs md:text-sm font-bold tracking-wide">{img.caption}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-pointer"
            >
              <motion.img
                layoutId={`img-${selectedImage.id}`}
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="max-w-full max-h-full object-contain rounded-md"
              />
              {selectedImage.caption && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-10 text-white text-lg font-medium"
                >
                  {selectedImage.caption}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
