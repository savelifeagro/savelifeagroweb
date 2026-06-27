import React, { useState } from 'react';

export default function Distributor() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    region: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', company: '', phone: '', region: '', message: '' });
    }, 5000);
  };

  return (
    <div className="bg-cream-foundation min-h-screen pt-24 pb-20 px-6 md:px-container-padding text-on-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-label-bold font-label-bold text-primary tracking-[0.4em] mb-4 block font-bold uppercase text-xs">
            Partnership
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display-lg text-deep-forest leading-tight mb-6">
            Become a Distributor
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Join the Save Life Agro network. We are looking for passionate dealers and distributors across India to help us bring high-efficacy organic agricultural solutions to farmers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Benefits Info */}
          <div className="animate-in fade-in slide-in-from-left-8 duration-700 delay-150">
            <h2 className="text-2xl md:text-3xl font-display-lg text-deep-forest mb-6">
              Why Partner With Us?
            </h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-outline-variant/15 text-primary">
                  <span className="material-symbols-outlined">workspace_premium</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-lg text-deep-forest font-bold mb-1">Premium Quality Products</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Lab-tested, 100% organic formulations that deliver proven results in the field.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-outline-variant/15 text-primary">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-lg text-deep-forest font-bold mb-1">High Demand & Margin</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Our flagship Bud Jet has a loyal farmer base, ensuring consistent demand and excellent distributor margins.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-outline-variant/15 text-primary">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-lg text-deep-forest font-bold mb-1">Dedicated Support</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">Direct technical support from our agronomists, marketing materials, and priority stock access.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-white rounded-3xl border border-[#EADEC9]/40 shadow-sm">
              <h4 className="font-label-bold text-xs uppercase tracking-widest text-deep-forest font-bold mb-4">Contact Info</h4>
              <p className="flex items-center gap-3 text-sm text-on-surface-variant mb-3">
                <span className="text-lg">📍</span>
                Sangli, Maharashtra, India
              </p>
              <p className="flex items-center gap-3 text-sm text-on-surface-variant mb-3">
                <span className="text-lg">📞</span>
                +91 9403594529
              </p>
              <p className="flex items-center gap-3 text-sm text-on-surface-variant">
                <span className="text-lg">✉️</span>
                savelifeagroproducts@yahoo.com
              </p>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="bg-white rounded-[40px] p-8 md:p-12 border border-[#EADEC9]/50 shadow-xl animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-display-lg text-deep-forest mb-4">Request Submitted!</h3>
                <p className="text-on-surface-variant">
                  Thank you for your interest. Our partnership team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <h3 className="text-2xl font-display-lg text-deep-forest mb-2">Dealer Enquiry Form</h3>
                
                <div>
                  <label className="block text-[10px] font-bold text-deep-forest uppercase tracking-widest mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-cream-foundation/50 border border-[#EADEC9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="Your Name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-deep-forest uppercase tracking-widest mb-2">Company/Shop Name *</label>
                    <input 
                      type="text" 
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-cream-foundation/50 border border-[#EADEC9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                      placeholder="Agro Traders"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-deep-forest uppercase tracking-widest mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-cream-foundation/50 border border-[#EADEC9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-deep-forest uppercase tracking-widest mb-2">Target Region/City *</label>
                  <input 
                    type="text" 
                    name="region"
                    required
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full bg-cream-foundation/50 border border-[#EADEC9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="Ratnagiri, Maharashtra"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-deep-forest uppercase tracking-widest mb-2">Message (Optional)</label>
                  <textarea 
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-cream-foundation/50 border border-[#EADEC9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Tell us about your current business..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 mt-2 bg-deep-forest hover:bg-primary text-white rounded-xl font-bold text-sm tracking-widest uppercase transition-all shadow-md active:scale-[0.98]"
                >
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
