import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, location, message } = body;

    // ✅ Basic validation
    if (!name || !email || !phone || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // ✅ Example: Log to console (we’ll replace this later with email/SMS logic)
    console.log('📥 New Join Submission:', {
      name,
      email,
      phone,
      location,
      message: message || '—',
    });

    // ✅ Respond with success
    return NextResponse.json(
      { success: true, message: 'Submission received.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error in /api/join:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
