import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TrackingPortal from '@/components/TrackingPortal';
import ServiceCatalog from '@/components/ServiceCatalog';
import CheckoutModal from '@/components/CheckoutModal';
import MobileBottomBar from '@/components/MobileBottomBar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">
        <HeroSection />
        <TrackingPortal />
        <ServiceCatalog />
      </main>
      <Footer />
      <MobileBottomBar />
      <CheckoutModal />
    </div>
  );
}
