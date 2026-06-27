import React, { useState } from 'react';
import ProductManager from '../components/admin/ProductManager';
import TestimonialManager from '../components/admin/TestimonialManager';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="min-h-screen bg-surface-container-lowest py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline-xl text-deep-forest font-bold">Admin Dashboard</h1>
            <p className="text-sm text-on-surface-variant uppercase tracking-widest font-label-bold mt-1">Local Storage Mode</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Menu */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-surface-container p-4 flex flex-col gap-2">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'products' ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:bg-cream-foundation hover:text-deep-forest'
                }`}
              >
                <span className="material-symbols-outlined text-xl">inventory_2</span>
                Products
              </button>
              
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'testimonials' ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:bg-cream-foundation hover:text-deep-forest'
                }`}
              >
                <span className="material-symbols-outlined text-xl">reviews</span>
                Testimonials
              </button>
            </div>
            
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
              <span className="material-symbols-outlined text-amber-500 mb-2 block">info</span>
              Data is currently saved to your browser's Local Storage. Changes will only be visible on this device.
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'products' && <ProductManager />}
            {activeTab === 'testimonials' && <TestimonialManager />}
          </div>
        </div>
      </div>
    </div>
  );
}
