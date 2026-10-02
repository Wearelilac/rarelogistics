'use client';

import { useState } from 'react';
import { Search, Package, Car, Clock, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { findParcelByCode, findRentalByCode } from '@/lib/mockData';
import { formatDateTime, calculateDaysRemaining, formatMalotiCompact } from '@/lib/utils';
import { Parcel, Rental } from '@/types';

type TrackingResult = { type: 'parcel'; data: Parcel } | { type: 'rental'; data: Rental } | null;

export default function TrackingPortal() {
  const [trackingCode, setTrackingCode] = useState('');
  const [result, setResult] = useState<TrackingResult>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async () => {
    if (!trackingCode.trim()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const code = trackingCode.trim().toUpperCase();

    if (code.startsWith('RL-PRC')) {
      const parcel = findParcelByCode(code);
      setResult(parcel ? { type: 'parcel', data: parcel } : null);
    } else if (code.startsWith('RL-RNT')) {
      const rental = findRentalByCode(code);
      setResult(rental ? { type: 'rental', data: rental } : null);
    } else {
      setResult(null);
    }

    setIsLoading(false);
  };

  const handleQuickFillParcel = () => {
    setTrackingCode('RL-PRC9823');
    handleTrack();
  };

  const handleQuickFillRental = () => {
    setTrackingCode('RL-RNT4102');
    handleTrack();
  };

  const handleQuickFill = (code: string) => {
    setTrackingCode(code);
    handleTrack();
  };

  return (
    <section id="tracking" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-4">
            Live Order & Rental Tracking
          </h2>
          <p className="text-lg text-brand-secondary">
            Enter your parcel tracking ID or vehicle rental reference code to view real-time location and timeline.
          </p>
        </div>

        {/* Search Box */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-secondary" size={24} />
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              placeholder="Enter tracking code (e.g., RL-PRC9823 or RL-RNT4102)"
              className="w-full rounded-2xl bg-white border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 text-brand-primary placeholder:text-slate-400 p-4 pl-12 font-medium transition-all"
            />
            <button
              type="button"
              onClick={handleTrack}
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold text-sm transition-all disabled:opacity-50"
            >
              {isLoading ? 'Tracking...' : 'Track Status'}
            </button>
          </div>

          {/* Quick Fill Chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-brand-secondary">Try demo codes:</span>
            <button
              type="button"
              onClick={handleQuickFillParcel}
              className="px-3 py-1 rounded-lg bg-purple-100 text-purple-700 text-sm font-medium hover:bg-purple-200 transition-colors"
            >
              RL-PRC9823 (Parcel)
            </button>
            <button
              type="button"
              onClick={handleQuickFillRental}
              className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              RL-RNT4102 (Rental)
            </button>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result && result.type === 'parcel' && (
            <ParcelResult key="parcel" parcel={result.data} />
          )}
          {result && result.type === 'rental' && (
            <RentalResult key="rental" rental={result.data} />
          )}
          {result === null && trackingCode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/70 backdrop-blur-xl border border-red-200 rounded-3xl p-8 text-center"
            >
              <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
              <h3 className="text-xl font-bold text-brand-primary mb-2">Tracking Code Not Found</h3>
              <p className="text-brand-secondary mb-6">
                The tracking code you entered doesn't match any active records.
              </p>
              <a
                href="https://wa.me/26662100202"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm"
              >
                <span>Verify with Dispatch on WhatsApp</span>
                <ChevronRight size={18} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ParcelResult({ parcel }: { parcel: Parcel }) {
  const steps = [
    { key: 'picked_up', label: 'Order Collected' },
    { key: 'in_transit', label: 'In Transit (Ladybrand/Bfn)' },
    { key: 'at_hub', label: 'Maseru Depot Arrival' },
    { key: 'out_for_delivery', label: 'Out for Final Delivery' },
  ];

  const statusOrder = ['picked_up', 'in_transit', 'at_hub', 'out_for_delivery', 'delivered'];
  const currentIndex = statusOrder.indexOf(parcel.status);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-glass-md rounded-3xl p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Package className="text-purple-600" size={24} />
            <h3 className="text-xl font-bold text-brand-primary">{parcel.trackingCode}</h3>
          </div>
          <span className="inline-block px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-sm font-semibold border border-emerald-200">
            {parcel.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-primary text-sm font-medium transition-colors">
          Download Receipt
        </button>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-50 rounded-2xl p-4">
          <div className="text-sm text-brand-secondary mb-1">Origin</div>
          <div className="font-semibold text-brand-primary">{parcel.origin}</div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-4">
          <div className="text-sm text-brand-secondary mb-1">Destination</div>
          <div className="font-semibold text-brand-primary">{parcel.destination}</div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-4">
          <div className="text-sm text-brand-secondary mb-1">Dispatch Date</div>
          <div className="font-semibold text-brand-primary">{formatDateTime(parcel.dispatchDate)}</div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-4">
          <div className="text-sm text-brand-secondary mb-1">Est. Arrival</div>
          <div className="font-semibold text-brand-primary">{formatDateTime(parcel.estimatedArrival)}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          return (
            <div key={step.key} className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
              }`}>
                {isCompleted ? <CheckCircle2 size={18} className="text-white" /> : <Clock size={18} className="text-slate-400" />}
              </div>
              <span className={`font-medium ${isCompleted ? 'text-brand-primary' : 'text-slate-400'}`}>
                {step.label}
              </span>
              {isCurrent && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 rounded-full bg-purple-500 ml-auto"
                />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function RentalResult({ rental }: { rental: Rental }) {
  const { days, hours } = calculateDaysRemaining(rental.returnDate);
  const isUrgent = days <= 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-glass-md rounded-3xl p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Car className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-brand-primary">{rental.trackingCode}</h3>
          </div>
          <span className="inline-block px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-sm font-semibold border border-blue-200">
            ACTIVE RENTAL
          </span>
        </div>
        <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-primary text-sm font-medium transition-colors">
          Download Receipt
        </button>
      </div>

      {/* Vehicle Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
        <h4 className="font-bold text-brand-primary text-lg mb-2">{rental.vehicleModel}</h4>
        <div className="flex items-center space-x-2 text-brand-secondary">
          <span>Insured</span>
          <span>•</span>
          <span>{formatMalotiCompact(rental.dailyRate)}/day</span>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 rounded-2xl p-4">
          <div className="text-sm text-brand-secondary mb-1">Pickup Date</div>
          <div className="font-semibold text-brand-primary">{formatDateTime(rental.startDate)}</div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-4">
          <div className="text-sm text-brand-secondary mb-1">Return Due Date</div>
          <div className="font-semibold text-brand-primary">{formatDateTime(rental.returnDate)}</div>
        </div>
      </div>

      {/* Countdown Gauge */}
      <div className={`rounded-2xl p-6 mb-6 ${isUrgent ? 'bg-amber-50 border-2 border-amber-300' : 'bg-emerald-50 border-2 border-emerald-300'}`}>
        <div className="flex items-center space-x-3 mb-2">
          <Clock size={24} className={isUrgent ? 'text-amber-600' : 'text-emerald-600'} />
          <span className={`font-bold ${isUrgent ? 'text-amber-700' : 'text-emerald-700'}`}>
            {isUrgent ? 'Return Due Soon!' : 'Time Remaining'}
          </span>
        </div>
        <div className="text-3xl font-bold text-brand-primary mb-1">
          {days} Days, {hours} Hours
        </div>
        <p className="text-sm text-brand-secondary">
          {isUrgent ? 'Please contact us to extend your rental period.' : 'until vehicle return deadline'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm">
          Extend Rental Period
        </button>
        <a
          href="https://wa.me/26662100202"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-6 py-3 rounded-2xl bg-white border border-slate-300 text-brand-primary font-semibold text-sm hover:bg-slate-50 transition-colors text-center"
        >
          Contact Roadside Assistance
        </a>
      </div>
    </motion.div>
  );
}
