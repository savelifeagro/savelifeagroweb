import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function TestimonialManager() {
  const { testimonials, updateTestimonial, addTestimonial, deleteTestimonial } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleEditClick = (testimonial) => {
    setEditingId(testimonial.id);
    setEditForm({ ...testimonial });
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingId(null);
    setEditForm({ name: '', location: '', quote: '', image: '' });
  };

  const handleSave = () => {
    if (isAdding) {
      addTestimonial(editForm);
    } else {
      updateTestimonial(editForm);
    }
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      deleteTestimonial(id);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.secure_url) {
        setEditForm(prev => ({ ...prev, image: data.secure_url }));
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-surface-container overflow-hidden">
      <div className="p-6 border-b border-surface-container flex justify-between items-center">
        <div>
          <h2 className="text-xl font-headline-md text-deep-forest font-bold">Manage Testimonials</h2>
          <p className="text-sm text-on-surface-variant">Update what farmers are saying about your products.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="bg-primary hover:bg-deep-forest text-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
        >
          + Add Testimonial
        </button>
      </div>
      
      <div className="p-6 space-y-6">
        {(isAdding || editingId) && (
          <div className="bg-cream-foundation/50 p-6 rounded-xl border border-primary/20 space-y-4">
            <h3 className="font-bold text-deep-forest">{isAdding ? 'New Testimonial' : 'Edit Testimonial'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Farmer Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. Ramesh Patil"
                />
              </div>
              <div>
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Location / Details</label>
                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. Verified Farmer • Ratnagiri"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Farmer Image</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input type="text" name="image" value={editForm.image || ''} onChange={handleChange} placeholder="Or paste image URL here..." className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary mb-2 text-sm" />
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        disabled={isUploading}
                        className="block w-full text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors disabled:opacity-50"
                      />
                      {isUploading && <span className="absolute right-4 top-2 text-xs font-bold text-primary animate-pulse">Uploading...</span>}
                    </div>
                  </div>
                  {editForm.image && (
                    <div className="w-16 h-16 shrink-0 bg-white border border-surface-container rounded-full overflow-hidden">
                      <img loading="lazy" decoding="async" src={editForm.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Review Quote</label>
                <textarea
                  name="quote"
                  value={editForm.quote}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Their testimonial..."
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => { setEditingId(null); setIsAdding(false); }} 
                className="px-4 py-2 text-sm text-on-surface-variant hover:text-deep-forest"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="px-6 py-2 text-sm bg-warm-gold hover:bg-yellow-600 text-white rounded-full font-bold"
              >
                Save
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="border border-surface-container p-5 rounded-xl hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    {testimonial.image ? (
                      <img loading="lazy" decoding="async" src={testimonial.image} className="w-10 h-10 rounded-full object-cover border border-outline-variant/30" alt={testimonial.name} />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-cream-foundation border border-outline-variant/30 flex items-center justify-center text-primary font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-deep-forest leading-tight">{testimonial.name}</h4>
                      <p className="text-[9px] text-on-surface-variant uppercase tracking-wider">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEditClick(testimonial)} className="text-primary hover:text-deep-forest p-1">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                    <button onClick={() => handleDelete(testimonial.id)} className="text-red-400 hover:text-red-600 p-1">
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
                <p className="text-sm italic text-charcoal-text leading-relaxed line-clamp-4">"{testimonial.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
