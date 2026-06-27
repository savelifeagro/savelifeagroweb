import React, { useState } from 'react';
import ProductManager from '../components/admin/ProductManager';
import TestimonialManager from '../components/admin/TestimonialManager';
import JournalManager from '../components/admin/JournalManager';
import InquiriesViewer from '../components/admin/InquiriesViewer';
import SettingsManager from '../components/admin/SettingsManager';
import { useAdmin } from '../context/AdminContext';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('products');
  const { adminUser, authLoading, inquiries } = useAdmin();
  const [loginError, setLoginError] = useState('');

  const unreadInquiriesCount = inquiries ? inquiries.filter(i => !i.read).length : 0;

  const handleLogin = async () => {
    setLoginError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;
      
      if (email !== 'savelifeagro@gmail.com') {
        await signOut(auth);
        setLoginError('Access Denied: You are not authorized to view the admin panel.');
      }
    } catch (error) {
      console.error('Login failed', error);
      setLoginError(`Login Failed: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!adminUser) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-surface-container-lowest">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-surface-container p-8 text-center">
          <span className="material-symbols-outlined text-5xl text-warm-gold mb-4">admin_panel_settings</span>
          <h2 className="text-2xl font-headline-md font-bold text-deep-forest mb-2">Admin Access Required</h2>
          <p className="text-on-surface-variant text-sm mb-8">
            Please sign in with the authorized Google account to manage products and testimonials.
          </p>
          
          {loginError && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-6 flex items-start gap-2 text-left">
              <span className="material-symbols-outlined text-lg">error</span>
              {loginError}
            </div>
          )}
          
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 py-3 px-4 rounded-xl font-bold transition-all shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Sign In with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline-xl text-deep-forest font-bold">Admin Dashboard</h1>
            <p className="text-sm text-on-surface-variant uppercase tracking-widest font-label-bold mt-1 text-primary">Live Firebase Mode</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-on-surface-variant font-medium hidden md:block">
              {adminUser.email}
            </span>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-bold border border-red-200 transition-colors"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              Logout
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Menu */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-surface-container p-4 flex flex-row overflow-x-auto md:flex-col gap-2 no-scrollbar">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'products' ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:bg-cream-foundation hover:text-deep-forest'
                }`}
              >
                <span className="material-symbols-outlined text-xl">inventory_2</span>
                Products
              </button>
              
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'testimonials' ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:bg-cream-foundation hover:text-deep-forest'
                }`}
              >
                <span className="material-symbols-outlined text-xl">reviews</span>
                Testimonials
              </button>

              <button
                onClick={() => setActiveTab('journals')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'journals' ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:bg-cream-foundation hover:text-deep-forest'
                }`}
              >
                <span className="material-symbols-outlined text-xl">article</span>
                Journals
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'inquiries' ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:bg-cream-foundation hover:text-deep-forest'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl">inbox</span>
                  Inquiries
                </div>
                {unreadInquiriesCount > 0 && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === 'inquiries' ? 'bg-white text-primary' : 'bg-red-500 text-white'}`}>
                    {unreadInquiriesCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'settings' ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:bg-cream-foundation hover:text-deep-forest'
                }`}
              >
                <span className="material-symbols-outlined text-xl">settings</span>
                Settings
              </button>
            </div>
            
            <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-800">
              <span className="material-symbols-outlined text-emerald-600 mb-2 block">cloud_done</span>
              Connected to Firebase. All changes are instantly saved to the cloud and visible to customers.
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'products' && <ProductManager />}
            {activeTab === 'testimonials' && <TestimonialManager />}
            {activeTab === 'journals' && <JournalManager />}
            {activeTab === 'inquiries' && <InquiriesViewer />}
            {activeTab === 'settings' && <SettingsManager />}
          </div>
        </div>
      </div>
    </div>
  );
}
