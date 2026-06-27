import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function TestimonialManager() {
  const { testimonials, updateTestimonial, addTestimonial, deleteTestimonial } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEditClick = (testimonial) => {
    setEditingId(testimonial.id);
    setEditForm({ ...testimonial });
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingId(null);
    setEditForm({ name: '', location: '', quote: '' });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
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
          + Add New
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
            <div key={testimonial.id} className="border border-surface-container p-5 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-deep-forest">{testimonial.name}</h4>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{testimonial.location}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditClick(testimonial)} className="text-primary hover:text-deep-forest">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button onClick={() => deleteTestimonial(testimonial.id)} className="text-red-400 hover:text-red-600">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
              <p className="text-sm italic text-charcoal-text leading-relaxed">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
