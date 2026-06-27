import React, { useState } from 'react';
import FAQ from '../components/FAQ';
import { allProducts } from '../products';

export default function ProductDetails({ product: initialProduct, setPage }) {
  // Always try to get the freshest data from products.js in case of hot reloads or state staleness
  const product = allProducts.find(p => p.id === initialProduct?.id) || initialProduct;
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]?.name);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button onClick={() => setPage('products')} className="text-primary hover:underline">
          Back to Products
        </button>
      </div>
    );
  }

  const activeSize = product.sizes.find((s) => s.name === selectedSize) || product.sizes[0];

  const handleEnquiry = () => {
    const message = encodeURIComponent(
      `Hi Save Life Agro,\n\nI would like to inquire about the following product:\n\n*Product:* ${product.name}\n*Size:* ${activeSize.name}\n*Price:* ₹${activeSize.price}\n\nPlease provide more details on how to order.`
    );
    window.open(`https://wa.me/919822264529?text=${message}`, '_blank');
  };

  return (
    <div className="bg-cream-foundation min-h-screen pt-24 pb-20 px-6 md:px-container-padding text-on-surface">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => setPage('products')} 
          className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary mb-8 transition-colors font-label-bold uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
          {/* Left Column: Image */}
          <div className="relative w-full aspect-square bg-white rounded-[40px] overflow-hidden border border-[#EADEC9]/80 shadow-sm group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-cover animate-in fade-in zoom-in-95 duration-1000 group-hover:scale-105 transition-transform" 
            />
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col justify-center animate-in fade-in slide-in-from-right-8 duration-700 delay-150">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-warm-gold tracking-[0.2em]">{product.category.replace('-', ' ')}</span>
              {product.type && (
                <>
                  <span className="text-warm-gold/50">•</span>
                  <span className="text-[10px] uppercase font-bold text-warm-gold tracking-[0.2em]">{product.type}</span>
                </>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display-lg font-bold text-deep-forest mb-4 leading-tight">
              {product.name}
            </h1>
            
            <p className="text-2xl md:text-3xl font-display-lg text-primary mb-6">
              ₹{activeSize.price} <span className="text-sm text-on-surface-variant/60 font-body-md font-medium tracking-wide">/ {activeSize.name}</span>
            </p>

            <p className="text-on-surface-variant mb-8 leading-relaxed max-w-xl">
              {product.description}
            </p>

            {/* Selector and Actions */}
            <div className="bg-white p-6 rounded-3xl border border-[#EADEC9]/50 shadow-sm mb-8">
              <div className="mb-6">
                <label className="block text-[10px] font-bold text-deep-forest uppercase tracking-widest mb-3">Select Size</label>
                <div className="flex gap-3">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz.name}
                      onClick={() => setSelectedSize(sz.name)}
                      className={`py-2 px-6 rounded-full text-xs font-bold border transition-all ${
                        selectedSize === sz.name 
                        ? 'border-primary bg-primary text-white shadow-md' 
                        : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/50'
                      }`}
                    >
                      {sz.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleEnquiry}
                  className="flex-1 py-4 bg-deep-forest hover:bg-primary text-white rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">forum</span>
                  Enquire Now
                </button>
                <a
                  href="/Save_Life_Agro_Brochure.pdf"
                  target="_blank"
                  className="flex-1 py-4 bg-white hover:bg-cream-foundation text-deep-forest border border-[#EADEC9] rounded-full font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">download</span>
                  Download Brochure
                </a>
              </div>
            </div>
            
            <p className="text-xs text-on-surface-variant/80 flex items-center gap-2">
              <span className="material-symbols-outlined text-warm-gold text-base">verified</span>
              100% Genuine Product • Made in Maharashtra
            </p>
          </div>
        </div>

        {/* Detailed Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#EADEC9]/50 pt-16 mt-8">
          
          {/* Key Benefits */}
          {product.benefits && (
            <div className="bg-white p-8 rounded-3xl border border-[#EADEC9]/30 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl font-headline-md text-deep-forest font-bold mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-warm-gold">psychiatry</span>
                Why Choose {product.name}?
              </h3>
              <ul className="space-y-4">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant leading-relaxed">
                    <span className="material-symbols-outlined text-primary text-lg shrink-0">check_circle</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Specs */}
          <div className="bg-white p-8 rounded-3xl border border-[#EADEC9]/30 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-headline-md text-deep-forest font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-warm-gold">science</span>
              Technical Specifications
            </h3>
            
            <div className="space-y-5">
              {product.composition && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Composition</h4>
                  <p className="text-sm text-on-surface-variant font-medium">{product.composition}</p>
                </div>
              )}
              {product.suitableCrops && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Suitable Crops</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.suitableCrops.map(crop => (
                      <span key={crop} className="bg-cream-foundation text-xs text-deep-forest px-3 py-1 rounded-md border border-[#EADEC9]/50">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.applicationStage && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Recommended Application Stage</h4>
                  <p className="text-sm text-on-surface-variant font-medium">{product.applicationStage}</p>
                </div>
              )}
              {product.compatibility && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Compatibility</h4>
                  <p className="text-sm text-on-surface-variant font-medium">{product.compatibility}</p>
                </div>
              )}
              {product.dose && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Recommended Dosage</h4>
                  <p className="text-sm text-on-surface-variant font-medium">{product.dose}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <FAQ faqs={product.faqs || [
            {
              question: "How do I apply this product?",
              answer: `For best results, mix the recommended dose of ${product.dose || '2-3 ml per litre of water'} and apply as a foliar spray during the early morning or late evening.`
            },
            {
              question: "Is this safe for organic farming?",
              answer: "Yes, our formulation is 100% organic and designed to be safe for plants, soil, and the environment."
            },
            {
              question: "Can I mix this with other pesticides?",
              answer: product.compatibility || "It is compatible with most common agricultural chemicals, but we recommend doing a small jar test before mixing in the main tank."
            }
          ]} />
        </div>

      </div>
    </div>
  );
}
