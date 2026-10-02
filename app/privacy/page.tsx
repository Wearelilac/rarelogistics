'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function PrivacyPage() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  const handlePreferences = () => {
    // In a real app, this would open a preferences modal
    alert('Preferences modal would open here');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-glass-md rounded-3xl p-8">
            <h1 className="text-3xl font-bold text-brand-primary mb-6">Privacy & Cookie Policy</h1>
            <p className="text-brand-secondary mb-8">Last updated: October 2026</p>

            <div className="space-y-8 prose prose-slate max-w-none">
              <section>
                <h2 className="text-xl font-bold text-brand-primary mb-4">Data Collection Transparency</h2>
                <p className="text-brand-secondary leading-relaxed">
                  At Rare Logistics, we collect the following personal data during checkout and tracking:
                </p>
                <ul className="list-disc pl-6 text-brand-secondary space-y-2">
                  <li>Full Name</li>
                  <li>Phone Number (for M-Pesa/EcoCash payment prompts and delivery notifications)</li>
                  <li>Email Address (for digital receipts and updates)</li>
                  <li>Pickup and Delivery Addresses</li>
                  <li>IP Address and browser cookies for session management</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-brand-primary mb-4">How We Use Your Data</h2>
                <p className="text-brand-secondary leading-relaxed">
                  Your data is strictly used for:
                </p>
                <ul className="list-disc pl-6 text-brand-secondary space-y-2">
                  <li>Processing and tracking your shipments or rentals</li>
                  <li>Facilitating payments through local gateways (M-Pesa, EcoCash)</li>
                  <li>Sending delivery notifications and updates</li>
                  <li>Generating digital receipts and invoices</li>
                  <li>Improving our service quality</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-brand-primary mb-4">Data Security & Third-Party Sharing</h2>
                <p className="text-brand-secondary leading-relaxed">
                  <strong>Security:</strong> We implement industry-standard security measures to protect your personal 
                  information. All payment transactions are encrypted and processed through secure payment gateways.
                </p>
                <p className="text-brand-secondary leading-relaxed mt-4">
                  <strong>No Third-Party Sales:</strong> We explicitly state that client data is strictly used for shipment 
                  handling and internal operations. We never sell, rent, or share your personal data with third parties 
                  for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-brand-primary mb-4">Cookie Policy</h2>
                <p className="text-brand-secondary leading-relaxed">
                  We use cookies and local storage to:
                </p>
                <ul className="list-disc pl-6 text-brand-secondary space-y-2">
                  <li>Keep track of your parcel tracking sessions</li>
                  <li>Remember your payment preferences</li>
                  <li>Maintain your shopping cart or booking state</li>
                  <li>Analyze website traffic to improve user experience</li>
                </ul>
                <p className="text-brand-secondary leading-relaxed mt-4">
                  You can manage cookie preferences through your browser settings or by using the cookie consent banner 
                  displayed on your first visit.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-brand-primary mb-4">Your Rights</h2>
                <p className="text-brand-secondary leading-relaxed">
                  Under Lesotho data protection regulations, you have the right to:
                </p>
                <ul className="list-disc pl-6 text-brand-secondary space-y-2">
                  <li>Access your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data (subject to legal retention requirements)</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-brand-primary mb-4">Contact Information</h2>
                <div className="text-brand-secondary space-y-2">
                  <p>To exercise your rights or ask questions about our privacy practices:</p>
                  <p><strong>Phone:</strong> +266 6210 0202</p>
                  <p><strong>Email:</strong> privacy@rarelogistics.co.ls</p>
                  <p><strong>Address:</strong> Maseru, Lesotho</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Cookie Consent Banner */}
      {showConsent && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl p-5 shadow-2xl z-50">
          <h3 className="font-bold text-brand-primary mb-2">Cookie Preferences</h3>
          <p className="text-sm text-brand-secondary mb-4">
            We use cookies and local storage to keep track of your parcel tracking sessions and payment preferences.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm"
            >
              Accept All
            </button>
            <button
              onClick={handlePreferences}
              className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-300 text-brand-primary font-semibold text-sm hover:bg-slate-200 transition-colors"
            >
              Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
