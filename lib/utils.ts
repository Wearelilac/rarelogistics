import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMaloti(amount: number): string {
  return new Intl.NumberFormat('en-LS', {
    style: 'currency',
    currency: 'LSL',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatMalotiCompact(amount: number): string {
  return `M ${amount.toLocaleString('en-LS', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function generateTrackingCode(type: 'parcel' | 'rental'): string {
  const prefix = type === 'parcel' ? 'RL-PRC' : 'RL-RNT';
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${randomDigits}`;
}

export function calculateDaysRemaining(returnDate: Date): { days: number; hours: number } {
  const now = new Date();
  const diff = returnDate.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { days, hours };
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-LS', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-LS', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
