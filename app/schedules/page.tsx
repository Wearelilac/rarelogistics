'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Calendar, Calculator, ArrowRight } from 'lucide-react';
import { formatMalotiCompact } from '@/lib/utils';

export default function SchedulesPage() {
  const [weight, setWeight] = useState(5);
  const [estimatedCost, setEstimatedCost] = useState(150);

  const handleWeightChange = (value: number) => {
    setWeight(value);
    // Simple calculation: base M 150 + M 20 per kg over 5kg
    const cost = value <= 5 ? 150 : 150 + (value - 5) * 20;
    setEstimatedCost(cost);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-4">
              Route Schedules & Rates
            </h1>
            <p className="text-lg text-brand-secondary">
              Weekly dispatch timetable and freight rate calculator
            </p>
          </div>

          {/* Weekly Dispatch Timetable */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-glass-md rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-brand-primary mb-6 flex items-center space-x-3">
              <Calendar className="text-purple-600" size={28} />
              <span>Weekly Dispatch Timetable</span>
            </h2>

            <div className="space-y-6">
              {/* Tuesday Run */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-brand-primary">Tuesday Run</h3>
                    <p className="text-brand-secondary">Bloemfontein & Ladybrand Online Parcel Collections</p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-purple-100 text-purple-700 text-sm font-semibold border border-purple-200">
                    Weekly
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-brand-secondary">Departure:</span>
                    <span className="font-semibold text-brand-primary ml-2">Tuesday, 06:00 AM</span>
                  </div>
                  <div>
                    <span className="text-brand-secondary">Cut-off Time:</span>
                    <span className="font-semibold text-brand-primary ml-2">Monday, 18:00 PM</span>
                  </div>
                  <div>
                    <span className="text-brand-secondary">Route:</span>
                    <span className="font-semibold text-brand-primary ml-2">Bfn → Ladybrand → Maseru</span>
                  </div>
                  <div>
                    <span className="text-brand-secondary">Service:</span>
                    <span className="font-semibold text-brand-primary ml-2">Parcels & Documents</span>
                  </div>
                </div>
              </div>

              {/* Friday Run */}
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-brand-primary">Friday Run</h3>
                    <p className="text-brand-secondary">Weekend Express Collections & Freight Logistics</p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-sm font-semibold border border-blue-200">
                    Weekly
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-brand-secondary">Departure:</span>
                    <span className="font-semibold text-brand-primary ml-2">Friday, 06:00 AM</span>
                  </div>
                  <div>
                    <span className="text-brand-secondary">Cut-off Time:</span>
                    <span className="font-semibold text-brand-primary ml-2">Thursday, 18:00 PM</span>
                  </div>
                  <div>
                    <span className="text-brand-secondary">Route:</span>
                    <span className="font-semibold text-brand-primary ml-2">Bfn → Ladybrand → Maseru</span>
                  </div>
                  <div>
                    <span className="text-brand-secondary">Service:</span>
                    <span className="font-semibold text-brand-primary ml-2">Parcels, Freight & Large Items</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Freight Rate Calculator */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-glass-md rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-brand-primary mb-6 flex items-center space-x-3">
              <Calculator className="text-emerald-600" size={28} />
              <span>Freight Rate Calculator</span>
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-brand-secondary mb-3">
                  Package Weight: {weight} kg
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={weight}
                  onChange={(e) => handleWeightChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs text-brand-secondary mt-1">
                  <span>1 kg</span>
                  <span>50 kg</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-brand-secondary mb-1">Estimated Cost</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      {formatMalotiCompact(estimatedCost)}
                    </div>
                  </div>
                  <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm flex items-center space-x-2 shadow-glow-purple hover:from-purple-700 hover:to-blue-700 transition-all">
                    <span>Book Now</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
                <p className="text-xs text-brand-secondary mt-3">
                  * Rates are estimates. Final pricing may vary based on dimensions and special handling requirements.
                </p>
              </div>

              <div className="text-sm text-brand-secondary">
                <p className="font-semibold mb-2">Rate Structure:</p>
                <ul className="space-y-1">
                  <li>• Base rate: M 150.00 for packages up to 5 kg</li>
                  <li>• Additional weight: M 20.00 per kg over 5 kg</li>
                  <li>• Oversized items: Custom quote required</li>
                  <li>• Fragile items: Additional M 50.00 handling fee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
