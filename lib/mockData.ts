import { Parcel, Rental, ServiceType } from '@/types';

export const mockParcels: Parcel[] = [
  {
    id: '1',
    trackingCode: 'RL-PRC9823',
    clientName: 'Thabo Mokoena',
    phone: '+266 6210 0202',
    email: 'thabo@example.com',
    origin: 'Bloemfontein Hub',
    destination: 'Maseru Central Depot',
    status: 'in_transit',
    dispatchDate: new Date('2026-10-01'),
    estimatedArrival: new Date('2026-10-03'),
    amount: 150.00,
    paymentMethod: 'm-pesa',
    paymentStatus: 'paid',
  },
  {
    id: '2',
    trackingCode: 'RL-PRC4567',
    clientName: 'Sarah Nkosi',
    phone: '+266 5888 5859',
    email: 'sarah@example.com',
    origin: 'Ladybrand Depot',
    destination: 'Maseru Mall',
    status: 'at_hub',
    dispatchDate: new Date('2026-09-29'),
    estimatedArrival: new Date('2026-10-01'),
    amount: 200.00,
    paymentMethod: 'eco-cash',
    paymentStatus: 'paid',
  },
];

export const mockRentals: Rental[] = [
  {
    id: '1',
    trackingCode: 'RL-RNT4102',
    clientName: 'Mpho Malefane',
    phone: '+266 6210 0202',
    email: 'mpho@example.com',
    vehicleModel: 'Toyota Fortuner 7-Seater',
    vehicleType: '7-seater',
    startDate: new Date('2026-09-28'),
    returnDate: new Date('2026-10-05'),
    dailyRate: 850.00,
    totalAmount: 5950.00,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    status: 'active',
  },
  {
    id: '2',
    trackingCode: 'RL-RNT7890',
    clientName: 'Kgotso Mphahlele',
    phone: '+266 5888 5859',
    email: 'kgotso@example.com',
    vehicleModel: 'Isuzu 1.5-Ton Truck',
    vehicleType: 'truck',
    startDate: new Date('2026-09-25'),
    returnDate: new Date('2026-09-30'),
    dailyRate: 1200.00,
    totalAmount: 7200.00,
    paymentMethod: 'eft',
    paymentStatus: 'paid',
    status: 'completed',
  },
];

export const services: ServiceType[] = [
  {
    id: 'parcel-collection',
    name: 'Courier Collections',
    description: 'Bloemfontein & Ladybrand runs every Tuesday & Friday',
    price: 150.00,
    priceUnit: 'package',
    accent: 'purple',
    icon: 'Package',
  },
  {
    id: '7-seater-hire',
    name: '7-Seater Hire',
    description: 'Insured luxury 7-seaters for family & business trips',
    price: 850.00,
    priceUnit: 'day',
    accent: 'blue',
    icon: 'Car',
  },
  {
    id: 'truck-hire',
    name: 'Truck Hire',
    description: '1.5-Ton heavy trucks for large cargo & furniture moves',
    price: 0,
    priceUnit: 'quote',
    accent: 'emerald',
    icon: 'Truck',
  },
  {
    id: 'afriski-shuttles',
    name: 'AfriSki & Shuttles',
    description: 'Direct transfers to AfriSki, Maletsunyane & Airport',
    price: 0,
    priceUnit: 'booking',
    accent: 'pink',
    icon: 'MapPin',
  },
];

export function findParcelByCode(code: string): Parcel | undefined {
  return mockParcels.find(p => p.trackingCode.toUpperCase() === code.toUpperCase());
}

export function findRentalByCode(code: string): Rental | undefined {
  return mockRentals.find(r => r.trackingCode.toUpperCase() === code.toUpperCase());
}
