import { NextRequest, NextResponse } from 'next/server';
import { findParcelByCode, findRentalByCode } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Tracking code is required' },
      { status: 400 }
    );
  }

  const normalizedCode = code.trim().toUpperCase();

  // Check for parcel
  if (normalizedCode.startsWith('RL-PRC')) {
    const parcel = findParcelByCode(normalizedCode);
    if (parcel) {
      return NextResponse.json({ type: 'parcel', data: parcel });
    }
  }

  // Check for rental
  if (normalizedCode.startsWith('RL-RNT')) {
    const rental = findRentalByCode(normalizedCode);
    if (rental) {
      return NextResponse.json({ type: 'rental', data: rental });
    }
  }

  return NextResponse.json(
    { error: 'Tracking code not found' },
    { status: 404 }
  );
}
