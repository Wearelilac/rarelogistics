'use client';

import { Search, MessageCircle } from 'lucide-react';

export default function MobileBottomBar() {
  const handleTrackClick = () => {
    document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 p-3">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleTrackClick}
          className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-glow-purple"
        >
          <Search size={20} />
          <span>Track Package</span>
        </button>
        <a
          href="https://wa.me/26662100202"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 border border-slate-300 text-brand-primary font-semibold text-sm flex items-center justify-center space-x-2 hover:bg-slate-200 transition-colors"
        >
          <MessageCircle size={20} />
          <span>WhatsApp Us</span>
        </a>
      </div>
    </div>
  );
}
