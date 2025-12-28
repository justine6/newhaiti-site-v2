// pages/api/join.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

type JoinResponse =
  | { success: true; message: string }
  | { success: false; error: string };

const ADMIN_EMAILS = ['info@nouvoayiti2075.com', 'nouvoayiti2075@gmail.com'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JoinResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res
      .status(405)
      .json({ success: false, error: 'Method Not Allowed' });
  }

  const { name, email, phone, location, message } = req.body ?? {};

  // ✅ Only name + email are required; others optional
  if (!name || !email) {
    return res
      .status(400)
      .json({ success: false, error: 'Name and email are required.' });
  }

  // ✅ Read + validate API key *inside* the handler
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      '[JOIN] RESEND_API_KEY is not set. Skipping email send but returning success.'
    );
    return res.status(200).json({
      success: true,
      message:
        'Nou resevwa enskripsyon ou. (Email yo tanporèman dezaktive sou anviwònman sa.)',
    });
  }

  const resend = new Resend(apiKey);

  try {
    // 1) Email to the user (confirmation)
    await resend.emails.send({
      from: 'Ayiti 2075 <info@nouvoayiti2075.com>',
      to: [email],
      subject: 'Mèsi pou enskripsyon w – Ayiti 2075',
      html: `
        <p>Bonjou ${name},</p>
        <p>Mèsi anpil paske ou deside rantre nan mouvman <strong>Nouvo Ayiti 2075</strong>.</p>
        <p>Men detay ou yo:</p>
        <ul>
          <li><strong>Non:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          ${phone ? `<li><strong>Telefòn:</strong> ${phone}</li>` : ''}
          ${location ? `<li><strong>Kote w ye:</strong> ${location}</li>` : ''}
          <li><strong>Mesaj:</strong> ${message || '—'}</li>
        </ul>
        <p>N ap retounen bò kote w byento ak plis enfòmasyon.</p>
        <p>Avèk respè,</p>
        <p>Ekip Nouvo Ayiti 2075</p>
      `,
    });

    // 2) Email to admins (notification)
    await resend.emails.send({
      from: 'Ayiti Bot <info@nouvoayiti2075.com>',
      to: ADMIN_EMAILS,
      subject: 'Nouvo enskripsyon sou fòm Ayiti 2075',
      html: `
        <p>📥 Nou resevwa yon nouvo enskripsyon:</p>
        <ul>
          <li><strong>Non:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          ${phone ? `<li><strong>Telefòn:</strong> ${phone}</li>` : ''}
          ${location ? `<li><strong>Kote li ye:</strong> ${location}</li>` : ''}
          <li><strong>Mesaj:</strong> ${message || '—'}</li>
        </ul>
      `,
    });

    console.log('[JOIN] Emails sent successfully for:', email);

    return res.status(200).json({
      success: true,
      message:
        'Mèsi! Enskripsyon ou reyisi. Tanpri tcheke bwat resepsyon w pou konfimasyon.',
    });
  } catch (error) {
    console.error('[JOIN] Error sending emails:', error);
    return res.status(500).json({
      success: false,
      error: 'Nou pa rive voye imèl la kounye a. Tanpri eseye ankò pita.',
    });
  }
}
