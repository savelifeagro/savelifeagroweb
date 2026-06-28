import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function GalleryManager() {
  const { gallery, addGalleryImage, updateGalleryImage, deleteGalleryImage, seedGallery } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const handleEditClick = (image) => {
    setEditingId(image.id);
    setEditForm({ ...image });
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingId(null);
    setEditForm({ url: '', caption: '' });
  };

  const handleSave = () => {
    if (isAdding) {
      addGalleryImage(editForm);
    } else {
      updateGalleryImage(editForm);
    }
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      deleteGalleryImage(id);
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
        setEditForm(prev => ({ ...prev, url: data.secure_url }));
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleSeed = async () => {
    if (window.confirm("Seed the database with the initial 31 images? This might take a few seconds.")) {
      setSeeding(true);
      try {
        const response = await fetch('/gallery-seed.json');
        const data = await response.json();
        await seedGallery(data);
        alert("Gallery seeded successfully!");
      } catch(err) {
        alert("Error seeding gallery: " + err.message);
      } finally {
        setSeeding(false);
      }
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-surface-container overflow-hidden">
      <div className="p-6 border-b border-surface-container flex justify-between items-center">
        <div>
          <h2 className="text-xl font-headline-md text-deep-forest font-bold">Manage Gallery</h2>
          <p className="text-sm text-on-surface-variant">Update the "Real Results" crop gallery.</p>
        </div>
        <div className="flex gap-2">
          {gallery.length === 0 && (
            <button 
              onClick={handleSeed}
              disabled={seeding}
              className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold transition-colors disabled:opacity-50"
            >
              {seeding ? 'Seeding...' : 'Seed Initial Images'}
            </button>
          )}
          <button 
            onClick={handleAddClick}
            className="bg-primary hover:bg-deep-forest text-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
          >
            + Add Image
          </button>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {(isAdding || editingId) && (
          <div className="bg-cream-foundation/50 p-6 rounded-xl border border-primary/20 space-y-4">
            <h3 className="font-bold text-deep-forest">{isAdding ? 'New Gallery Image' : 'Edit Gallery Image'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Upload or URL</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input type="text" name="url" value={editForm.url || ''} onChange={handleChange} placeholder="https://..." className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary mb-2 text-sm" />
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
                  {editForm.url && (
                    <div className="w-24 h-24 shrink-0 bg-white border border-surface-container rounded-lg overflow-hidden">
                      <img loading="lazy" decoding="async" src={editForm.url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Caption (Optional)</label>
                <input
                  type="text"
                  name="caption"
                  value={editForm.caption || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. Mango buds after using Bud Jet"
                />
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((img) => (
            <div key={img.id} className="relative border border-surface-container rounded-xl overflow-hidden group">
              <div className="aspect-square bg-gray-100">
                <img loading="lazy" decoding="async" src={img.url} className="w-full h-full object-cover" alt={img.caption || 'Gallery Image'} />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <button onClick={() => handleEditClick(img)} className="bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm transition-colors">
                  <span className="material-symbols-outlined text-[18px] block">edit</span>
                </button>
                <button onClick={() => handleDelete(img.id)} className="bg-red-500/80 hover:bg-red-500 text-white rounded-full p-2 backdrop-blur-sm transition-colors">
                  <span className="material-symbols-outlined text-[18px] block">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
