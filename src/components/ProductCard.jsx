import React, { useState } from 'react';

export default function ProductCard({ product, setPage, setActiveProduct }) {
  // Initialize with first size variant
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].name);

  // Find details for active size selection
  const activeSize = product.sizes.find((s) => s.name === selectedSize) || product.sizes[0];

  const handleEnquiry = (e) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      `Hi Save Life Agro,\n\nI would like to inquire about the following product:\n\n*Product:* ${product.name}\n*Size:* ${activeSize.name}\n*Price:* ₹${activeSize.price}\n\nPlease provide more details on how to order.`
    );
    window.open(`https://wa.me/919822264529?text=${message}`, '_blank');
  };

  const handleCardClick = () => {
    if (setPage && setActiveProduct) {
      setActiveProduct(product);
      setPage('product-details');
    }
  };

  return (
    <div 
      className="w-[280px] sm:w-[310px] md:w-[440px] max-w-[340px] md:max-w-[440px] mx-auto flex-shrink-0 flex flex-col justify-between transition-all duration-300 relative group snap-center pb-2 cursor-pointer"
      onClick={handleCardClick}
    >
      
      {/* Inner Image Container (Padded to 0 so photos fill completely) */}
      <div className="relative rounded-[28px] bg-[#F5EDE0] aspect-square flex items-center justify-center overflow-hidden mb-4 border border-[#E3D4BF]/40 p-0">
        
        <img 
          className="w-full h-full object-contain bg-white p-4 rounded-[28px] transition-transform duration-700 group-hover:scale-102" 
          src={product.image} 
          alt={product.name} 
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col flex-grow text-center px-1">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#1C1C1C] mb-2 hover:text-[#146a2e] transition-colors leading-tight">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-lg sm:text-xl font-extrabold text-[#1C1C1C]">
            ₹{activeSize.price}
          </span>
        </div>

        <div className="relative w-full mb-4" onClick={(e) => e.stopPropagation()}>
          <select 
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full text-center bg-white border border-[#DCD3C5] rounded-full py-2.5 px-6 text-xs sm:text-sm text-[#1C1C1C] font-semibold outline-none appearance-none cursor-pointer focus:ring-1 focus:ring-[#146a2e]/20 transition-all"
          >
            {product.sizes.map((sz) => (
              <option key={sz.name} value={sz.name}>
                {sz.name}
              </option>
            ))}
          </select>
          {/* Custom Arrow Indicator */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-600 font-bold">
            ▼
          </div>
        </div>

        {/* Enquiry CTA */}
        <button 
          onClick={handleEnquiry}
          className="w-full py-3.5 bg-[#146a2e] hover:bg-[#0f5222] text-white rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm active:scale-[0.98]"
        >
          Enquire Now
        </button>
      </div>

    </div>
  );
}
