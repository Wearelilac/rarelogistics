import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white/70 backdrop-blur-xl border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div>
                <h3 className="font-bold text-brand-primary">RARE LOGISTICS</h3>
                <p className="text-xs text-brand-secondary">Moving People • Parcels • Possibilities</p>
              </div>
            </div>
            <p className="text-brand-secondary text-sm leading-relaxed mb-4">
              Leading courier, parcel collection, and vehicle rental services across Lesotho and South Africa.
            </p>
            <div className="text-sm text-brand-secondary">
              <p>Phone: +266 6210 0202</p>
              <p>Email: info@rarelogistics.co.ls</p>
              <p>Maseru, Lesotho</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-brand-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-brand-secondary hover:text-brand-primary text-sm transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#tracking" className="text-brand-secondary hover:text-brand-primary text-sm transition-colors">
                  Tracking Portal
                </Link>
              </li>
              <li>
                <Link href="/schedules" className="text-brand-secondary hover:text-brand-primary text-sm transition-colors">
                  Schedules & Rates
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-brand-secondary hover:text-brand-primary text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/driver-portal" className="text-brand-secondary hover:text-brand-primary text-sm transition-colors">
                  Driver Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-brand-primary mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-brand-secondary hover:text-brand-primary text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-brand-secondary hover:text-brand-primary text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 text-center text-sm text-brand-secondary">
          <p>&copy; 2026 Rare Logistics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
