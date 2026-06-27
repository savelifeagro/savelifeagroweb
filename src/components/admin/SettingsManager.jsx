import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function SettingsManager() {
  const { announcement, updateAnnouncement } = useAdmin();
  const [localSettings, setLocalSettings] = useState({ enabled: false, text: '' });

  useEffect(() => {
    if (announcement) {
      setLocalSettings(announcement);
    }
  }, [announcement]);

  const handleSave = () => {
    updateAnnouncement(localSettings);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-surface-container overflow-hidden">
      <div className="p-6 border-b border-surface-container">
        <h2 className="text-xl font-headline-md text-deep-forest font-bold">Global Settings</h2>
        <p className="text-sm text-on-surface-variant">Manage global UI elements like the top announcement bar.</p>
      </div>
      
      <div className="p-6">
        <div className="bg-cream-foundation/50 p-6 rounded-xl border border-primary/20 space-y-6 max-w-2xl">
          <h3 className="font-bold text-deep-forest">Announcement Bar</h3>
          
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="enabled" 
              name="enabled" 
              checked={localSettings.enabled} 
              onChange={handleChange}
              className="w-4 h-4 text-primary focus:ring-primary border-surface-container rounded"
            />
            <label htmlFor="enabled" className="text-sm font-bold text-charcoal-text cursor-pointer">
              Enable Top Announcement Bar
            </label>
          </div>

          <div>
            <label className="block text-xs font-label-bold uppercase text-on-surface-variant mb-1">Announcement Text</label>
            <input
              type="text"
              name="text"
              value={localSettings.text}
              onChange={handleChange}
              disabled={!localSettings.enabled}
              className="w-full px-3 py-2 border border-surface-container rounded-lg focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              placeholder="e.g. MONSOON SPECIAL: Free shipping on all orders over ₹5,000"
            />
          </div>

          <div className="pt-2 border-t border-surface-container/30">
            <button 
              onClick={handleSave} 
              className="px-6 py-2 text-sm bg-warm-gold hover:bg-yellow-600 text-white rounded-full font-bold transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
