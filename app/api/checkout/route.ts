import { NextRequest, NextResponse } from 'next/server';
import { generateTrackingCode } from '@/lib/utils';
import { BookingFormData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: BookingFormData = await request.json();

    // Validate required fields
    if (!body.clientName || !body.phone || !body.email || !body.pickupAddress || !body.dropoffAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Determine if it's a parcel or rental based on service type
    const isParcel = body.serviceType === 'parcel-collection' || body.serviceType === 'door-to-door';
    const trackingCode = generateTrackingCode(isParcel ? 'parcel' : 'rental');

    // In a real application, you would:
    // 1. Save to database (Supabase/PostgreSQL)
    // 2. Process payment with M-Pesa/EcoCash/Card gateway
    // 3. Send confirmation SMS/Email

    // For now, return success with the generated tracking code
    return NextResponse.json({
      success: true,
      trackingCode,
      message: 'Booking created successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
