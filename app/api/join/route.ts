// app/api/join/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit } from '@/lib/rateLimiter';
import logger from '@/lib/logger';

// Ensure this API route is always dynamic (no pre-exec during build)
export const dynamic = 'force-dynamic';

// Multiple admin emails
const ADMIN_EMAILS = ['info@nouvoayiti2075.com', 'nouvoayiti2075@gmail.com'];

// Helper: Get IP address
function getClientIP(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  return fwd ? fwd.split(',')[0].trim() : 'unknown';
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    const tier = 'public';

    logger.info(`[JOIN_SUBMISSION] Request received from IP: ${ip}`);

    if (!rateLimit(ip, tier)) {
      logger.warn(`[RATE_LIMIT_BLOCKED] IP: ${ip} exceeded tier '${tier}'`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { name, email, phone, location, message } = await req.json();

    if (!name || !email || !phone || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // ✅ Read & validate the API key **inside** the handler (no top-level throw)
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      // Don’t crash builds or previews — just log and return success
      logger.warn(
        '[JOIN_WARNING] RESEND_API_KEY is not set. Skipping email send but returning success.'
      );
      return NextResponse.json(
        {
          success: true,
          message:
            'Submission received. (Email sending temporarily disabled on this environment.)',
        },
        { status: 200 }
      );
    }

    const resend = new Resend(resendApiKey);

    // Send confirmation to user
    await resend.emails.send({
      from: 'Ayiti 2075 <info@nouvoayiti2075.com>',
      to: [email],
      subject: 'Ayiti 2075: Confirmation de votre inscription',
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
        <p>L’équipe Ayiti 2075</p>
      `,
    });

    logger.info(`[EMAIL_SENT] Confirmation sent to: ${email}`);

    // Notify admins
    await resend.emails.send({
      from: 'Ayiti Bot <info@nouvoayiti2075.com>',
      to: ADMIN_EMAILS,
      subject: 'Nouvel adhérent - Ayiti 2075',
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

    logger.info(`[ADMIN_ALERT] Notification sent for: ${email}`);

    return NextResponse.json(
      { success: true, message: 'Submission received and emails sent.' },
      { status: 200 }
    );
  } catch (error) {
    const ip = getClientIP(req);
    logger.error(`[JOIN_ERROR] Failed to process submission from IP: ${ip}`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

