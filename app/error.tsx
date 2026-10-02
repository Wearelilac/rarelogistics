'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { AlertCircle, RefreshCw, MessageCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          {/* Error Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle size={48} className="text-red-500" />
            </div>
          </div>

          {/* Error Text */}
          <h1 className="text-3xl font-bold text-brand-primary mb-4">
            Something Went Wrong
          </h1>
          <p className="text-brand-secondary mb-8">
            We apologize for the inconvenience. An unexpected error has occurred. Please try again or contact our support team if the problem persists.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-sm shadow-glow-purple transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <RefreshCw size={20} />
              <span>Try Again</span>
            </button>
            <a
              href="https://wa.me/26662100202"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-brand-primary font-semibold text-sm shadow-glass-sm transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>Contact Support</span>
            </a>
          </div>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-red-50 rounded-2xl border border-red-200 text-left">
              <p className="text-sm font-semibold text-red-700 mb-2">Error Details:</p>
              <p className="text-xs text-red-600 font-mono">{error.message}</p>
              {error.digest && (
                <p className="text-xs text-red-600 font-mono mt-2">Digest: {error.digest}</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
