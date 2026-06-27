import React from 'react';
import { useAdmin } from '../context/AdminContext';

export default function AnnouncementBar() {
  const { announcement } = useAdmin();

  if (!announcement?.enabled || !announcement?.text) {
    return null;
  }

  return (
    <div className="bg-primary text-white text-center py-2 px-4 text-xs font-bold tracking-widest uppercase relative z-50">
      <div className="max-w-7xl mx-auto">
        {announcement.text}
      </div>
    </div>
  );
}
