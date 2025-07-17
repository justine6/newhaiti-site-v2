import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimiter';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = 'info@nouvoayiti2075.com';

// Helper: Get IP address from request
function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown';
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const tier = 'public';
    console.log(`[JOIN_SUBMISSION] Request received from IP: ${ip}`);

    if (!rateLimit(ip, tier)) {
      console.warn(`[RATE_LIMIT_BLOCKED] IP: ${ip} exceeded tier '${tier}'`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, phone, location, message } = body;

    if (!name || !email || !phone || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'Nouvo Ayiti 2075 <info@nouvoayiti2075.com>',
      to: [email],
      subject: 'Nouvo Ayiti 2075: Confirmation de votre inscription',
      html: `
        <p>Bonjour ${name},</p>
        <p>Merci de nous avoir rejoints dans la mission de renouvellement d’Haïti à l’horizon 2075.</p>
        <ul>
          <li><strong>Nom :</strong> ${name}</li>
          <li><strong>Email :</strong> ${email}</li>
          <li><strong>Téléphone :</strong> ${phone}</li>
          <li><strong>Localisation :</strong> ${location}</li>
          <li><strong>Message :</strong> ${message || '—'}</li>
        </ul>
        <p>L’équipe Nouvo Ayiti 2075</p>
      `,
    });

    console.log(`[EMAIL_SENT] Confirmation sent to: ${email}`);

    // Notify admin
    await resend.emails.send({
      from: 'Nouvo Ayiti Bot <info@nouvoayiti2075.com>',
      to: [ADMIN_EMAIL],
      subject: 'Nouvel adhérent - Nouvo Ayiti 2075',
      html: `
        <p>📥 Nouvelle demande d’adhésion :</p>
        <ul>
          <li><strong>Nom :</strong> ${name}</li>
          <li><strong>Email :</strong> ${email}</li>
          <li><strong>Téléphone :</strong> ${phone}</li>
          <li><strong>Localisation :</strong> ${location}</li>
          <li><strong>Message :</strong> ${message || '—'}</li>
        </ul>
      `,
    });

    console.log(`[ADMIN_ALERT] Notification sent to admin for: ${email}`);

    return NextResponse.json(
      { success: true, message: 'Submission received and emails sent.' },
      { status: 200 }
    );
  } catch (error) {
    const ip = getClientIP(req);
    console.error(`[JOIN_ERROR] Failed to process submission from IP: ${ip}`, error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
