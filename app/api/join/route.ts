import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, location, message } = body;

    if (!name || !email || !phone || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 📨 Simulated handling (log to console for now)
    console.log('📥 New Join Request:', {
      name,
      email,
      phone,
      location,
      message: message || '—',
    });

    // ✅ Respond with confirmation
    return NextResponse.json(
      { success: true, message: 'Thank you for joining!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
