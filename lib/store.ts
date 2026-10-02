import { create } from 'zustand';
import { BookingFormData } from '@/types';

interface CheckoutStore {
  isOpen: boolean;
  selectedService: string | null;
  bookingData: Partial<BookingFormData>;
  openCheckout: (serviceId?: string) => void;
  closeCheckout: () => void;
  setBookingData: (data: Partial<BookingFormData>) => void;
  resetBookingData: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  isOpen: false,
  selectedService: null,
  bookingData: {},
  openCheckout: (serviceId) => set({ isOpen: true, selectedService: serviceId || null }),
  closeCheckout: () => set({ isOpen: false, selectedService: null }),
  setBookingData: (data) => set((state) => ({ bookingData: { ...state.bookingData, ...data } })),
  resetBookingData: () => set({ bookingData: {} }),
}));

interface MobileMenuStore {
  isOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export const useMobileMenuStore = create<MobileMenuStore>((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
  closeMenu: () => set({ isOpen: false }),
}));
