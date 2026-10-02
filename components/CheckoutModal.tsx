'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, Building2, CheckCircle2, Download, Share2, Phone } from 'lucide-react';
import { useCheckoutStore } from '@/lib/store';
import { generateTrackingCode, formatMalotiCompact } from '@/lib/utils';
import { services } from '@/lib/mockData';
import { BookingFormData } from '@/types';

export default function CheckoutModal() {
  const { isOpen, closeCheckout, selectedService, bookingData, setBookingData, resetBookingData } = useCheckoutStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'m-pesa' | 'eco-cash' | 'card' | 'eft' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const selectedServiceData = services.find(s => s.id === selectedService);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const isParcel = selectedServiceData?.id === 'parcel-collection' || selectedServiceData?.id === 'door-to-door';
    const code = generateTrackingCode(isParcel ? 'parcel' : 'rental');
    setGeneratedCode(code);
    setStep(3);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    closeCheckout();
    setStep(1);
    setPaymentMethod(null);
    setGeneratedCode(null);
    resetBookingData();
  };

  const totalAmount = selectedServiceData?.price || 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-brand-primary">
                {step === 3 ? 'Booking Confirmed!' : 'Complete Your Booking'}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X size={24} className="text-brand-secondary" />
              </button>
            </div>

            {/* Progress Steps */}
            {step < 3 && (
              <div className="flex items-center justify-center p-6 border-b border-slate-200">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= s ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-slate-200 text-slate-400'
                    }`}>
                      {step > s ? <CheckCircle2 size={20} /> : s}
                    </div>
                    {s < 2 && <div className="w-16 h-1 bg-slate-200 mx-2" />}
                  </div>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {step === 1 && (
                <Step1
                  bookingData={bookingData}
                  setBookingData={setBookingData}
                  selectedService={selectedServiceData}
                  onNext={() => setStep(2)}
                />
              )}
              {step === 2 && (
                <Step2
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  bookingData={bookingData}
                  setBookingData={setBookingData}
                  onBack={() => setStep(1)}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  totalAmount={totalAmount}
                />
              )}
              {step === 3 && generatedCode && (
                <Step3
                  trackingCode={generatedCode}
                  bookingData={bookingData}
                  totalAmount={totalAmount}
                  paymentMethod={paymentMethod}
                  onClose={handleClose}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Step1({ bookingData, setBookingData, selectedService, onNext }: any) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-6">
      {/* Service Summary */}
      {selectedService && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4">
          <h3 className="font-bold text-brand-primary">{selectedService.name}</h3>
          <p className="text-sm text-brand-secondary">{selectedService.description}</p>
        </div>
      )}

      {/* Customer Info */}
      <div className="space-y-4">
        <h3 className="font-semibold text-brand-primary text-lg">Customer Information</h3>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-2">Full Name</label>
          <input
            type="text"
            required
            value={bookingData.clientName || ''}
            onChange={(e) => setBookingData({ clientName: e.target.value })}
            className="w-full rounded-2xl bg-white border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 text-brand-primary p-4 font-medium transition-all"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-2">WhatsApp Phone Number</label>
          <div className="flex">
            <span className="inline-flex items-center px-4 rounded-l-2xl bg-slate-100 border border-r-0 border-slate-300 text-brand-secondary font-medium">
              +266
            </span>
            <input
              type="tel"
              required
              value={bookingData.phone || ''}
              onChange={(e) => setBookingData({ phone: e.target.value })}
              className="flex-1 rounded-r-2xl bg-white border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 text-brand-primary p-4 font-medium transition-all"
              placeholder="6210 0202"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-2">Email Address</label>
          <input
            type="email"
            required
            value={bookingData.email || ''}
            onChange={(e) => setBookingData({ email: e.target.value })}
            className="w-full rounded-2xl bg-white border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 text-brand-primary p-4 font-medium transition-all"
            placeholder="your@email.com"
          />
        </div>
      </div>

      {/* Logistics Info */}
      <div className="space-y-4">
        <h3 className="font-semibold text-brand-primary text-lg">Logistics Details</h3>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-2">Pickup Address / Merchant Name</label>
          <input
            type="text"
            required
            value={bookingData.pickupAddress || ''}
            onChange={(e) => setBookingData({ pickupAddress: e.target.value })}
            className="w-full rounded-2xl bg-white border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 text-brand-primary p-4 font-medium transition-all"
            placeholder="e.g., Takealot Bloemfontein Pickup Point"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-2">Dropoff Address in Lesotho</label>
          <input
            type="text"
            required
            value={bookingData.dropoffAddress || ''}
            onChange={(e) => setBookingData({ dropoffAddress: e.target.value })}
            className="w-full rounded-2xl bg-white border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 text-brand-primary p-4 font-medium transition-all"
            placeholder="e.g., Maseru Mall Depot or Home Address"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-sm shadow-glow-purple transition-all duration-200"
      >
        Continue to Payment
      </button>
    </form>
  );
}

function Step2({ paymentMethod, setPaymentMethod, bookingData, setBookingData, onBack, onSubmit, isSubmitting, totalAmount }: any) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="font-semibold text-brand-primary text-lg">Select Payment Method</h3>
        
        <div className="grid gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod('m-pesa')}
            className={`p-4 rounded-2xl border-2 transition-all flex items-center space-x-4 ${
              paymentMethod === 'm-pesa' ? 'border-purple-600 bg-purple-50' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <Smartphone className={paymentMethod === 'm-pesa' ? 'text-purple-600' : 'text-slate-400'} size={24} />
            <div className="text-left">
              <div className="font-semibold text-brand-primary">Vodacom M-Pesa (Lesotho)</div>
              <div className="text-sm text-brand-secondary">Instant mobile payment</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('eco-cash')}
            className={`p-4 rounded-2xl border-2 transition-all flex items-center space-x-4 ${
              paymentMethod === 'eco-cash' ? 'border-purple-600 bg-purple-50' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <Smartphone className={paymentMethod === 'eco-cash' ? 'text-purple-600' : 'text-slate-400'} size={24} />
            <div className="text-left">
              <div className="font-semibold text-brand-primary">Econet EcoCash</div>
              <div className="text-sm text-brand-secondary">Mobile wallet payment</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`p-4 rounded-2xl border-2 transition-all flex items-center space-x-4 ${
              paymentMethod === 'card' ? 'border-purple-600 bg-purple-50' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <CreditCard className={paymentMethod === 'card' ? 'text-purple-600' : 'text-slate-400'} size={24} />
            <div className="text-left">
              <div className="font-semibold text-brand-primary">Credit / Debit Card</div>
              <div className="text-sm text-brand-secondary">PayFast / Flutterwave</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('eft')}
            className={`p-4 rounded-2xl border-2 transition-all flex items-center space-x-4 ${
              paymentMethod === 'eft' ? 'border-purple-600 bg-purple-50' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <Building2 className={paymentMethod === 'eft' ? 'text-purple-600' : 'text-slate-400'} size={24} />
            <div className="text-left">
              <div className="font-semibold text-brand-primary">EFT / Bank Transfer</div>
              <div className="text-sm text-brand-secondary">Direct bank transfer</div>
            </div>
          </button>
        </div>
      </div>

      {/* Payment Phone for Mobile Money */}
      {(paymentMethod === 'm-pesa' || paymentMethod === 'eco-cash') && (
        <div>
          <label className="block text-sm font-medium text-brand-secondary mb-2">
            {paymentMethod === 'm-pesa' ? 'M-Pesa' : 'EcoCash'} Phone Number
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-4 rounded-l-2xl bg-slate-100 border border-r-0 border-slate-300 text-brand-secondary font-medium">
              +266
            </span>
            <input
              type="tel"
              required
              value={bookingData.paymentPhone || ''}
              onChange={(e) => setBookingData({ paymentPhone: e.target.value })}
              className="flex-1 rounded-r-2xl bg-white border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 text-brand-primary p-4 font-medium transition-all"
              placeholder="6210 0202"
            />
          </div>
          <p className="text-sm text-brand-secondary mt-2">
            Upon clicking confirm, you will receive a STK push prompt on your {paymentMethod === 'm-pesa' ? 'Vodacom Lesotho' : 'Econet'} line to authorize payment.
          </p>
        </div>
      )}

      {/* EFT Details */}
      {paymentMethod === 'eft' && (
        <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
          <h4 className="font-semibold text-brand-primary">Bank Account Details</h4>
          <div className="text-sm text-brand-secondary space-y-2">
            <div><span className="font-medium">Bank:</span> Standard Lesotho Bank</div>
            <div><span className="font-medium">Account Number:</span> 0123456789</div>
            <div><span className="font-medium">Branch Code:</span> 450105</div>
            <div><span className="font-medium">Account Holder:</span> Rare Logistics (Pty) Ltd</div>
          </div>
        </div>
      )}

      {/* Total */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 flex items-center justify-between">
        <span className="font-semibold text-brand-primary">Total Amount</span>
        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {formatMalotiCompact(totalAmount)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-8 py-4 rounded-2xl bg-white border border-slate-300 text-brand-primary font-semibold text-sm hover:bg-slate-50 transition-all"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!paymentMethod || isSubmitting}
          className="flex-1 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-glow-emerald transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing...' : `Pay ${formatMalotiCompact(totalAmount)}`}
        </button>
      </div>
    </form>
  );
}

function Step3({ trackingCode, bookingData, totalAmount, paymentMethod, onClose }: any) {
  const handleTrackOrder = () => {
    onClose();
    setTimeout(() => {
      document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="space-y-6">
      {/* Success Animation */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle2 size={40} className="text-emerald-600" />
        </motion.div>
        <h3 className="text-2xl font-bold text-brand-primary mb-2">Booking Confirmed!</h3>
        <p className="text-brand-secondary">Your booking has been successfully processed.</p>
      </div>

      {/* Digital Receipt */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-6 border border-slate-200">
        <div className="text-center mb-6">
          <div className="text-sm text-brand-secondary mb-1">Tracking Code</div>
          <div className="text-3xl font-mono font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {trackingCode}
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-brand-secondary">Customer</span>
            <span className="font-medium text-brand-primary">{bookingData.clientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-secondary">Phone</span>
            <span className="font-medium text-brand-primary">+266 {bookingData.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-secondary">Payment Method</span>
            <span className="font-medium text-brand-primary capitalize">{paymentMethod?.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-secondary">Status</span>
            <span className="font-medium text-emerald-600">Paid</span>
          </div>
          <div className="border-t border-slate-200 pt-3 flex justify-between">
            <span className="font-semibold text-brand-primary">Total Paid</span>
            <span className="font-bold text-xl text-brand-primary">{formatMalotiCompact(totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button type="button" className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-glow-purple">
          <Download size={20} />
          <span>Download PDF Receipt</span>
        </button>
        <button type="button" className="w-full px-8 py-4 rounded-2xl bg-white border border-slate-300 text-brand-primary font-semibold text-sm flex items-center justify-center space-x-2 hover:bg-slate-50 transition-all">
          <Share2 size={20} />
          <span>Send Receipt to WhatsApp</span>
        </button>
        <button
          type="button"
          onClick={handleTrackOrder}
          className="w-full px-8 py-4 rounded-2xl bg-slate-100 text-brand-primary font-semibold text-sm hover:bg-slate-200 transition-all"
        >
          Track Order Now
        </button>
      </div>
    </div>
  );
}
