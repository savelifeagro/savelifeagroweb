import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function JournalManager() {
  const { journals, updateJournal, addJournal, deleteJournal } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleEditClick = (journal) => {
    setEditingId(journal.id);
    setEditForm({ ...journal });
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingId(null);
    setEditForm({
      id: `journal-${Date.now()}`,
      category: 'agro-science',
      tag: '',
      title: '',
      summary: '',
      body: '',
      image: ''
    });
  };

  const handleSave = () => {
    if (isAdding) {
      addJournal(editForm);
    } else {
      updateJournal(editForm);
    }
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this journal entry?")) {
      deleteJournal(id);
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
          <h2 className="text-xl font-headline-md text-deep-forest font-bold">Manage Journals</h2>
          <p className="text-sm text-on-surface-variant">Update the essays and guides published in your Agri Journal.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="bg-primary hover:bg-deep-forest text-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
        >
          + Add Entry
        </button>
      </div>
      
      <div className="p-6 space-y-6">
        {(isAdding || editingId) && (
          <div className="bg-cream-foundation/50 p-6 rounded-xl border border-primary/20 space-y-4">
            <h3 className="font-bold text-deep-forest">{isAdding ? 'New Journal Entry' : 'Edit Journal Entry'}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. The Physiology of Bud Break"
                />
              </div>

              <div>
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Category</label>
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="agro-science">Crop Science</option>
                  <option value="soil-vitality">Soil Vitality</option>
                  <option value="journey">Distributor Logs</option>
                  <option value="sustainability">Sustainability</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Tag (Short Label)</label>
                <input
                  type="text"
                  name="tag"
                  value={editForm.tag}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. CROP SCIENCE"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Cover Image</label>
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
                    <div className="w-32 h-20 shrink-0 bg-white border border-surface-container rounded-lg overflow-hidden">
                      <img loading="lazy" decoding="async" src={editForm.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Summary</label>
                <textarea
                  name="summary"
                  value={editForm.summary}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Short description for the list..."
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Full Body Content</label>
                <textarea
                  name="body"
                  value={editForm.body}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="The main article text..."
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

        <div className="flex flex-col gap-4">
          {journals.map((journal) => (
            <div key={journal.id} className="border border-surface-container p-4 rounded-xl flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:shadow-md transition-shadow bg-surface-container-lowest">
              <div className="flex gap-4 items-center w-full md:w-auto overflow-hidden">
                <div className="w-24 h-16 shrink-0 rounded overflow-hidden bg-cream-foundation">
                  {journal.image && <img loading="lazy" decoding="async" src={journal.image} className="w-full h-full object-cover" alt="" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold text-warm-gold tracking-widest">{journal.tag}</span>
                  </div>
                  <h4 className="font-bold text-deep-forest truncate">{journal.title}</h4>
                  <p className="text-xs text-on-surface-variant truncate">{journal.summary}</p>
                </div>
              </div>
              <div className="flex gap-2 self-end md:self-center shrink-0">
                <button onClick={() => handleEditClick(journal)} className="text-primary hover:text-deep-forest p-2 border border-transparent hover:border-primary/20 rounded-lg transition-all">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
                <button onClick={() => handleDelete(journal.id)} className="text-red-400 hover:text-red-600 p-2 border border-transparent hover:border-red-400/20 rounded-lg transition-all">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          ))}
          {journals.length === 0 && (
            <p className="text-sm text-on-surface-variant text-center py-8">No journal entries found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
