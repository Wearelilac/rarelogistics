'use client';

import Navbar from '@/components/Navbar';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-glass-md rounded-3xl p-8">
            <h1 className="text-3xl font-bold text-brand-primary mb-6">Terms of Service</h1>
            <p className="text-brand-secondary mb-8">Last updated: October 2026</p>

            <div className="space-y-8 prose prose-slate max-w-none">
              <section>
                <h2 className="text-xl font-bold text-brand-primary mb-4">1. Scope of Services</h2>
                <p className="text-brand-secondary leading-relaxed">
                  Rare Logistics provides courier collection, vehicle rentals (7-Seater / Trucks), and shuttle services 
                  within Lesotho and across South African borders (Bloemfontein & Ladybrand). By using our services, 
                  you agree to these terms and conditions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-brand-primary mb-4">2. Parcel Pickup & Storage Policy</h2>
                <div className="space-y-4 text-brand-secondary">
                  <p className="leading-relaxed">
                    <strong>Content Disclosure:</strong> Customers must disclose parcel contents. We prohibit shipping 
                    illegal, hazardous, or unregistered commercial items.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Pickup Schedule:</strong> Parcel collections from Bloemfontein and Ladybrand operate every 
                    Tuesday and Friday. Bookings must be made by 18:00 PM the day before the scheduled run.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Storage Policy:</strong> Uncollected parcels at the Maseru Hub will be held for a maximum 
                    of 7 days. After this period, demurrage fees of M 25.00 per day will apply.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-brand-primary mb-4">3. Vehicle & Fleet Rental Terms</h2>
                <div className="space-y-4 text-brand-secondary">
                  <p className="leading-relaxed">
                    <strong>Driver Requirements:</strong> Renters must hold a valid driver's license for a minimum of 
                    2 years and be at least 21 years of age.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Insurance & Liability:</strong> Standard insurance is included. A security deposit of 
                    M 2,000.00 is required for 7-seater rentals and M 3,500.00 for truck rentals. Road usage policies 
                    for AfriSki and mountain passes must be followed.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Fuel Policy:</strong> Vehicles are provided with a full tank and must be returned with the 
                    same fuel level. Refueling charges will apply if not met.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-brand-primary mb-4">4. Payments & Cancellations</h2>
                <div className="space-y-4 text-brand-secondary">
                  <p className="leading-relaxed">
                    <strong>Payment Methods:</strong> We accept Vodacom M-Pesa, Econet EcoCash, Credit/Debit cards 
                    (via PayFast), and EFT bank transfers to Standard Lesotho Bank or Nedbank Lesotho.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Cancellation Policy:</strong> Full refund if cancelled 24 hours prior to dispatch or rental 
                    start. 50% refund for cancellations made less than 24 hours before. No refund for no-shows.
                  </p>
                  <p className="leading-relaxed">
                    <strong>Pricing:</strong> All prices are quoted in Lesotho Maloti (M/LSL) and are subject to change 
                    without notice. Confirmed bookings are locked at the quoted rate.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-brand-primary mb-4">5. Liability & Limitations</h2>
                <p className="text-brand-secondary leading-relaxed">
                  Rare Logistics is not liable for delays caused by border control, weather conditions, or force majeure 
                  events. For lost or damaged parcels, liability is limited to the declared value up to M 5,000.00 unless 
                  additional insurance is purchased.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-brand-primary mb-4">6. Contact Information</h2>
                <div className="text-brand-secondary space-y-2">
                  <p><strong>Phone:</strong> +266 6210 0202</p>
                  <p><strong>WhatsApp:</strong> +266 6210 0202</p>
                  <p><strong>Email:</strong> info@rarelogistics.co.ls</p>
                  <p><strong>Address:</strong> Maseru, Lesotho</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
