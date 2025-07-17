import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = 'info@nouvoayiti2075.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, location, message } = body;

    // Basic validation
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
        <p>Nous avons bien reçu vos informations :</p>
        <ul>
          <li><strong>Nom :</strong> ${name}</li>
          <li><strong>Email :</strong> ${email}</li>
          <li><strong>Téléphone :</strong> ${phone}</li>
          <li><strong>Localisation :</strong> ${location}</li>
          <li><strong>Message :</strong> ${message || '—'}</li>
        </ul>
        <p>Nous vous contacterons sous peu. Merci encore !</p>
        <p>L’équipe Nouvo Ayiti 2075</p>
      `
    });

    // Send notification to admin
    await resend.emails.send({
      from: 'Nouvo Ayiti Bot <info@nouvoayiti2075.com>',
      to: [ADMIN_EMAIL],
      subject: 'Nouvel adhérent - Nouvo Ayiti 2075',
      html: `
        <p>📥 Une nouvelle soumission a été reçue :</p>
        <ul>
          <li><strong>Nom :</strong> ${name}</li>
          <li><strong>Email :</strong> ${email}</li>
          <li><strong>Téléphone :</strong> ${phone}</li>
          <li><strong>Localisation :</strong> ${location}</li>
          <li><strong>Message :</strong> ${message || '—'}</li>
        </ul>
      `
    });

    return NextResponse.json(
      { success: true, message: 'Submission received and emails sent.' },
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
