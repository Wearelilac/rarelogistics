'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileMenuStore } from '@/lib/store';
import { useEffect } from 'react';

export default function Navbar() {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenuStore();
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Tracking Portal', href: '#tracking' },
    { name: 'Schedules', href: '/schedules' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Driver Portal', href: '/driver-portal' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Rare Logistics Logo"
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-brand-secondary hover:text-brand-primary font-medium transition-colors relative group"
                >
                  {link.name}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300"
                    layoutId="underline"
                  />
                </Link>
              ))}
              <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm shadow-glow-purple transition-all duration-200">
                Get Instant Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} className="text-brand-primary" /> : <Menu size={24} className="text-brand-primary" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-80 h-full bg-white/95 backdrop-blur-xl border-l border-slate-200 z-50 md:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-brand-primary">Menu</h2>
                  <button onClick={closeMenu} className="p-2 rounded-xl hover:bg-slate-100">
                    <X size={24} className="text-brand-primary" />
                  </button>
                </div>
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="py-3 text-lg border-b border-slate-200/50 text-brand-secondary hover:text-brand-primary hover:bg-slate-50 rounded-xl px-4 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <button className="mt-4 w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm shadow-glow-purple">
                    Get Instant Quote
                  </button>
                  <a
                    href="https://wa.me/26662100202"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-brand-primary font-semibold text-sm flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Phone size={20} />
                    <span>WhatsApp Us</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
