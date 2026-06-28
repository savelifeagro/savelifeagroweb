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
    <div className="min-h-screen bg-cream-foundation text-on-background pt-32 pb-24 px-6 md:px-12 lg:px-24">
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
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-gray-300 animate-pulse rounded-lg break-inside-avoid" style={{ height: `${Math.floor(Math.random() * (400 - 200 + 1) + 200)}px` }}></div>
            ))}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((img) => (
              <motion.div
                key={img.id}
                layoutId={`img-${img.id}`}
                whileHover={{ scale: 1.02 }}
                className="relative cursor-pointer break-inside-avoid overflow-hidden rounded-lg group"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img.url}
                  alt={img.caption || 'Crop result'}
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">{img.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
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
