import React from 'react';

export default function Accessibility() {
  return (
    <div className="bg-cream-foundation text-on-background min-h-screen py-24 px-6 md:px-container-padding">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display-lg text-deep-forest mb-8">Accessibility Statement</h1>
        <div className="space-y-6 text-on-surface-variant font-body-md leading-relaxed">
          <p>Save Life Agro Products is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>
          
          <h2 className="text-2xl font-headline-md text-deep-forest mt-8">Conformance Status</h2>
          <p>We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 level AA. These guidelines explain how to make web content more accessible for people with disabilities.</p>
          
          <h2 className="text-2xl font-headline-md text-deep-forest mt-8">Feedback</h2>
          <p>We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers, please let us know:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Email: savelifeagroproducts@yahoo.com</li>
            <li>Phone: +91 9403594529</li>
          </ul>
          
          <p className="mt-8">We try to respond to feedback within 2 business days.</p>
        </div>
      </div>
    </div>
  );
}
