'use client';

import { motion } from 'framer-motion';
import { Package, Car, Truck, MapPin, Plane, Clock } from 'lucide-react';
import { services } from '@/lib/mockData';
import { formatMalotiCompact } from '@/lib/utils';
import { useCheckoutStore } from '@/lib/store';

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
  Plane,
  Clock,
};

const additionalServices = [
  {
    id: 'door-to-door',
    name: 'Door-to-Door Local Bike & Courier Delivery',
    description: 'Same-day express parcel transfer within Maseru and surrounding urban centers.',
    price: 50.00,
    priceUnit: 'delivery',
    accent: 'purple' as const,
    icon: 'Clock' as const,
  },
  {
    id: 'afriski-tours',
    name: 'Travel to AfriSki Snow Resort & Tourism Packages',
    description: 'Dedicated 7-seater mountain transports tailored for snow trips to AfriSki, Maletsunyane Falls, and Semonkong.',
    price: 0,
    priceUnit: 'Custom Group Rates',
    accent: 'pink' as const,
    icon: 'MapPin' as const,
  },
  {
    id: 'airport-shuttle',
    name: 'Airport Shuttle Service',
    description: 'Direct transfers to and from Moshoeshoe I International Airport.',
    price: 350.00,
    priceUnit: 'transfer',
    accent: 'blue' as const,
    icon: 'Plane' as const,
  },
];

export default function ServiceCatalog() {
  const openCheckout = useCheckoutStore((state) => state.openCheckout);

  const allServices = [...services, ...additionalServices];

  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-4">
            Our Services & Fleet
          </h2>
          <p className="text-lg text-brand-secondary max-w-2xl mx-auto">
            Comprehensive logistics solutions tailored for Lesotho and cross-border operations
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-glass-md rounded-3xl p-6 hover:shadow-glass-lg transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${accentColors[service.accent]} border flex items-center justify-center mb-4`}>
                  <Icon size={28} className={accentColors[service.accent].split(' ')[1]} />
                </div>
                <h3 className="font-bold text-brand-primary text-lg mb-2">{service.name}</h3>
                <p className="text-brand-secondary mb-4 line-clamp-3 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-3 py-1.5 rounded-lg text-sm font-semibold ${accentColors[service.accent]} border`}>
                    {service.price > 0 ? formatMalotiCompact(service.price) : service.priceUnit}
                  </span>
                  <button
                    type="button"
                    onClick={() => openCheckout(service.id)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
