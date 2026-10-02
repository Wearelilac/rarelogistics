'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Package, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          {/* Mascot Image */}
          <div className="mb-8">
            <img
              src="/mascot.png"
              alt="Rare Logistics Mascot"
              className="w-48 h-auto mx-auto object-contain"
            />
          </div>

          {/* 404 Text */}
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl font-bold text-brand-primary mb-4">
            Page or Package Not Found
          </h2>
          <p className="text-brand-secondary mb-8">
            The page you are looking for might have been moved or the tracking link entered is incomplete.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-sm shadow-glow-purple transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </Link>
            <button
              type="button"
              onClick={() => document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-brand-primary font-semibold text-sm shadow-glass-sm transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Search size={20} />
              <span>Track Your Package</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
