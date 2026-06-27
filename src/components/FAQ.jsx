import React, { useState } from 'react';

export default function FAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-8 border border-[#EADEC9]/30 shadow-sm mt-8">
      <h3 className="text-xl font-headline-md text-deep-forest font-bold mb-6 flex items-center gap-3">
        <span className="material-symbols-outlined text-warm-gold">help</span>
        Frequently Asked Questions
      </h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-[#EADEC9]/50 rounded-xl overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 flex items-center justify-between bg-cream-foundation/30 hover:bg-cream-foundation/50 text-left transition-colors"
            >
              <span className="font-bold text-sm text-deep-forest">{faq.question}</span>
              <span className="material-symbols-outlined text-primary transition-transform duration-300" style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                expand_more
              </span>
            </button>
            <div 
              className="px-6 text-sm text-on-surface-variant overflow-hidden transition-all duration-500 ease-in-out"
              style={{ 
                maxHeight: openIndex === index ? '500px' : '0',
                paddingTop: openIndex === index ? '16px' : '0',
                paddingBottom: openIndex === index ? '16px' : '0',
                opacity: openIndex === index ? 1 : 0
              }}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
