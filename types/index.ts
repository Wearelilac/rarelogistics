export interface Parcel {
  id: string;
  trackingCode: string;
  clientName: string;
  phone: string;
  email: string;
  origin: string;
  destination: string;
  status: 'picked_up' | 'in_transit' | 'at_hub' | 'out_for_delivery' | 'delivered';
  dispatchDate: Date;
  estimatedArrival: Date;
  amount: number;
  paymentMethod: 'm-pesa' | 'eco-cash' | 'card' | 'eft';
  paymentStatus: 'pending' | 'paid' | 'failed';
}

export interface Rental {
  id: string;
  trackingCode: string;
  clientName: string;
  phone: string;
  email: string;
  vehicleModel: string;
  vehicleType: '7-seater' | 'truck';
  startDate: Date;
  returnDate: Date;
  dailyRate: number;
  totalAmount: number;
  paymentMethod: 'm-pesa' | 'eco-cash' | 'card' | 'eft';
  paymentStatus: 'pending' | 'paid' | 'failed';
  status: 'active' | 'completed' | 'overdue';
}

export type TrackingData = Parcel | Rental;

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  accent: 'purple' | 'blue' | 'emerald' | 'pink';
  icon: string;
}

export interface BookingFormData {
  clientName: string;
  phone: string;
  email: string;
  serviceType: string;
  pickupAddress: string;
  dropoffAddress: string;
  paymentMethod: 'm-pesa' | 'eco-cash' | 'card' | 'eft';
  paymentPhone?: string;
}
