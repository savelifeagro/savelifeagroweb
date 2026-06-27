import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function ProductManager() {
  const { products, updateProduct } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditForm({ 
      ...product,
      price: product.sizes[0]?.price || 0 
    });
  };

  const handleSave = () => {
    const updatedProduct = { ...editForm };
    if (updatedProduct.sizes && updatedProduct.sizes.length > 0) {
      updatedProduct.sizes[0].price = editForm.price;
    }
    updateProduct(updatedProduct);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-surface-container overflow-hidden">
      <div className="p-6 border-b border-surface-container">
        <h2 className="text-xl font-headline-md text-deep-forest font-bold">Manage Products</h2>
        <p className="text-sm text-on-surface-variant">Update pricing, images, and details for your products.</p>
      </div>

      <div className="p-6 space-y-6">
        {editingId && (
          <div className="bg-cream-foundation/50 p-6 rounded-xl border border-primary/20 space-y-4">
            <h3 className="font-bold text-deep-forest">Edit Product: {editForm.name}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Product Name</label>
                <input type="text" name="name" value={editForm.name || ''} onChange={handleChange} className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              
              <div>
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Price (₹)</label>
                <input type="number" name="price" value={editForm.price || ''} onChange={handleChange} className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>

              <div>
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Image URL</label>
                <input type="text" name="image" value={editForm.image || ''} onChange={handleChange} className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>

              <div>
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Badge Status</label>
                <select name="badge" value={editForm.badge || ''} onChange={handleChange} className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary">
                  <option value="">None</option>
                  <option value="Best Seller">Best Seller</option>
                  <option value="New Arrival">New Arrival</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Category</label>
                <select name="category" value={editForm.category || ''} onChange={handleChange} className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary">
                  <option value="plant-growth">Plant Growth</option>
                  <option value="soil-care">Soil Care</option>
                  <option value="crop-care">Crop Care</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Type / Tagline</label>
                <input type="text" name="type" value={editForm.type || ''} onChange={handleChange} className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>

              <div>
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Composition</label>
                <input type="text" name="composition" value={editForm.composition || ''} onChange={handleChange} className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>

              <div>
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Recommended Dose</label>
                <input type="text" name="dose" value={editForm.dose || ''} onChange={handleChange} className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>

              <div>
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Application Stage</label>
                <input type="text" name="applicationStage" value={editForm.applicationStage || ''} onChange={handleChange} className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>

              <div>
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Compatibility</label>
                <input type="text" name="compatibility" value={editForm.compatibility || ''} onChange={handleChange} className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Description</label>
                <textarea name="description" value={editForm.description || ''} onChange={handleChange} rows="3" className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"></textarea>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setEditingId(null)} className="px-4 py-2 text-sm text-on-surface-variant hover:text-deep-forest">Cancel</button>
              <button onClick={handleSave} className="px-6 py-2 text-sm bg-warm-gold hover:bg-yellow-600 text-white rounded-full font-bold">Save Changes</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border border-surface-container p-4 rounded-xl flex items-center justify-between hover:shadow-md transition-shadow bg-surface-container-lowest">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-surface-container p-1 flex items-center justify-center shrink-0">
                  <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-deep-forest">{product.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold text-primary">₹{product.sizes?.[0]?.price || 0}</span>
                    {product.badge && (
                      <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-warm-gold/20 text-warm-gold">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleEditClick(product)}
                className="text-primary hover:text-deep-forest p-2 border border-transparent hover:border-primary/20 rounded-lg transition-all"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
