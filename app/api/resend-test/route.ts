// app/api/resend-test/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: 'RESEND_API_KEY is NOT set on the server' },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: 'Ayiti 2075 <info@nouvoayiti2075.com>',
      // 👇 use an inbox you control to see the test email
      to: ['justinelongla1@gmail.com'],
      subject: 'Resend test – Ayiti 2075',
      html: '<p>This is a test email from /api/resend-test 🎉</p>',
    });

    return NextResponse.json(
      { ok: true, id: (result as any).id ?? null },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[RESEND_TEST_ERROR]', error);
    return NextResponse.json(
      { ok: false, error: error?.message || 'Resend send() failed' },
      { status: 500 }
    );
  }
}

