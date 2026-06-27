import React from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function InquiriesViewer() {
  const { inquiries, markInquiryAsRead, deleteInquiry } = useAdmin();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      deleteInquiry(id);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-surface-container overflow-hidden">
      <div className="p-6 border-b border-surface-container">
        <h2 className="text-xl font-headline-md text-deep-forest font-bold">Inquiries & Dealer Forms</h2>
        <p className="text-sm text-on-surface-variant">View incoming distributor applications and contact messages.</p>
      </div>
      
      <div className="p-6">
        {inquiries.length === 0 ? (
          <div className="text-center py-12 text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
            <p>No inquiries received yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div 
                key={inquiry.id} 
                className={`border p-5 rounded-xl transition-shadow flex flex-col md:flex-row gap-4 justify-between items-start ${
                  inquiry.read ? 'border-surface-container bg-surface-container-lowest' : 'border-primary/40 bg-cream-foundation/30 shadow-sm'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {!inquiry.read && (
                      <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                    )}
                    <h4 className={`font-bold ${!inquiry.read ? 'text-primary' : 'text-deep-forest'}`}>
                      {inquiry.name} <span className="text-on-surface-variant font-normal text-sm">({inquiry.type === 'dealer' ? 'Dealer Application' : 'Contact'})</span>
                    </h4>
                  </div>
                  
                  <p className="text-sm text-charcoal-text font-medium">{inquiry.phone} {inquiry.email ? `• ${inquiry.email}` : ''}</p>
                  {inquiry.district && inquiry.state && (
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">{inquiry.district}, {inquiry.state}</p>
                  )}
                  
                  {inquiry.message && (
                    <div className="bg-white p-4 rounded-lg border border-outline-variant/30 mt-3">
                      <p className="text-sm text-charcoal-text leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span className="text-xs text-on-surface-variant font-medium">
                    {inquiry.createdAt?.toDate ? inquiry.createdAt.toDate().toLocaleDateString() : new Date(inquiry.createdAt).toLocaleDateString()}
                  </span>
                  
                  <div className="flex gap-2">
                    {!inquiry.read && (
                      <button 
                        onClick={() => markInquiryAsRead(inquiry.id)}
                        className="text-xs bg-white border border-primary text-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-white font-bold transition-colors"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(inquiry.id)}
                      className="text-xs bg-white border border-red-300 text-red-500 px-3 py-1.5 rounded-full hover:bg-red-50 hover:border-red-400 font-bold transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
