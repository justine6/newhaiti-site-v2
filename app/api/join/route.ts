// app/api/join/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit } from '@/lib/rateLimiter';
import logger from '@/lib/logger';

// Always run dynamically (no static optimization)
export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = ['info@nouvoayiti2075.com', 'nouvoayiti2075@gmail.com'];

function getClientIP(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  return fwd ? fwd.split(',')[0].trim() : 'unknown';
}

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);

  try {
    const tier = 'public';
    logger.info(`[JOIN_SUBMISSION] Request received from IP: ${ip}`);

    // Optional: keep your rate limiter
    if (!rateLimit(ip, tier)) {
      logger.warn(`[RATE_LIMIT_BLOCKED] IP: ${ip} exceeded tier '${tier}'`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);

    const name = (body?.name || '').toString().trim();
    const email = (body?.email || '').toString().trim();
    const phone = (body?.phone || '').toString().trim();
    const location = (body?.location || '').toString().trim();
    const message = (body?.message || '').toString().trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Very explicit error so we notice in logs
      logger.error(
        '[JOIN_ERROR] RESEND_API_KEY is not configured in this environment.'
      );
      return NextResponse.json(
        { error: 'Email service is not configured on the server.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // 1) Email to user
    const userResult = await resend.emails.send({
      from: 'Ayiti 2075 <info@nouvoayiti2075.com>',
      to: [email],
      subject: 'Mèsi paske w rantre nan Nouvo Ayiti 2075',
      html: `
        <p>Bonjour / Bonjou ${name},</p>
        <p>Merci / Mèsi paske ou te pran tan pou w ranpli fòm Nouvo Ayiti 2075 la.</p>
        <p>Nou resevwa enfòmasyon ou yo epi n ap kenbe w okouran sou pwochen aktyalite yo.</p>
        <ul>
          <li><strong>Non:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          ${phone ? `<li><strong>Telefòn:</strong> ${phone}</li>` : ''}
          ${location ? `<li><strong>Vil / Peyi:</strong> ${location}</li>` : ''}
          <li><strong>Mesaj:</strong> ${message || '—'}</li>
        </ul>
        <p>Ak tout respè,</p>
        <p>Ekip Nouvo Ayiti 2075</p>
      `,
    });

    logger.info(
      `[EMAIL_SENT_USER] to=${email} id=${(userResult as any)?.id ?? 'n/a'}`
    );

    // 2) Email to admins
    const adminResult = await resend.emails.send({
      from: 'Ayiti Bot <info@nouvoayiti2075.com>',
      to: ADMIN_EMAILS,
      subject: `Nouvo moun ki rantre: ${name}`,
      html: `
        <p>📥 Yon nouvo moun sot ranpli fòm "Join":</p>
        <ul>
          <li><strong>Non:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          ${phone ? `<li><strong>Telefòn:</strong> ${phone}</li>` : ''}
          ${location ? `<li><strong>Vil / Peyi:</strong> ${location}</li>` : ''}
          <li><strong>Mesaj:</strong> ${message || '—'}</li>
        </ul>
        <p>— Sistèm Ayiti 2075</p>
      `,
    });

    logger.info(
      `[EMAIL_SENT_ADMIN] to=${ADMIN_EMAILS.join(
        ','
      )} id=${(adminResult as any)?.id ?? 'n/a'}`
    );

    return NextResponse.json(
      { success: true, message: 'Submission received and emails sent.' },
      { status: 200 }
    );
  } catch (error) {
    logger.error(
      `[JOIN_ERROR] Failed to process submission from IP: ${ip}`,
      error
    );
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
