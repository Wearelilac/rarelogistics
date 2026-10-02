'use client';

import { Package, Car, Truck, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { services } from '@/lib/mockData';
import { formatMalotiCompact } from '@/lib/utils';

const accentColors = {
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  pink: 'bg-pink-100 text-pink-700 border-pink-200',
};

const iconMap = {
  Package,
  Car,
  Truck,
  MapPin,
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Mascot Watermark */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none z-0 sm:top-40">
        <img
          src="/mascot.png"
          alt="Rare Logistics Mascot"
          className="w-[400px] sm:w-[600px] h-auto object-contain mx-auto"
        />
      </div>

      {/* Ambient Glow Orbs */}
      <div className="ambient-glow-purple top-20 -left-40" />
      <div className="ambient-glow-blue bottom-20 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Trust Badge - New Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 shadow-glass-sm mb-8"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center">
              <ShieldCheck size={18} className="text-white" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Trusted</div>
              <div className="text-sm font-bold text-brand-primary">Courier & Logistics across Lesotho & RSA</div>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-primary leading-tight mb-6"
          >
            Your Parcels, Our Priority.
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Seamless Logistics Solutions.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-brand-secondary max-w-2xl mx-auto mb-8"
          >
            Weekly Bloemfontein & Ladybrand pickup runs every Tuesday & Friday. 
            Reliable courier services, 7-seater car rentals, and truck hire across Lesotho.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button
              type="button"
              onClick={() => document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-sm shadow-glow-purple transition-all duration-200"
            >
              Track Your Order / Rental
            </button>
            <a
              href="https://wa.me/26662100202"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-brand-primary font-semibold text-sm shadow-glass-sm transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Phone size={20} />
              <span>WhatsApp Us (+266 6210 0202)</span>
            </a>
          </motion.div>
        </div>

        {/* Glass Cubes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-glass-md rounded-3xl p-6 hover:shadow-glass-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl ${accentColors[service.accent]} border flex items-center justify-center mb-4`}>
                  <Icon size={24} className={accentColors[service.accent].split(' ')[1]} />
                </div>
                <h3 className="font-bold text-brand-primary mb-2">{service.name}</h3>
                <p className="text-sm text-brand-secondary mb-3 line-clamp-2">{service.description}</p>
                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${accentColors[service.accent]} border`}>
                  {service.price > 0 ? formatMalotiCompact(service.price) : service.priceUnit === 'quote' ? 'Custom Quotes' : 'Book Trips'}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {[
            { value: '100+', label: 'Weekly Parcels Delivered' },
            { value: 'Tue & Fri', label: 'Scheduled Cross-Border Runs' },
            { value: '100%', label: 'Insured Fleet' },
            { value: 'Nationwide', label: 'Service Coverage' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-glass-sm rounded-2xl p-6 text-center"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-brand-secondary mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
