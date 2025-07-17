import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, location, message } = req.body;

  if (!name || !email || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await resend.emails.send({
      from: 'Nouvo Ayiti 2075 <info@nouvoayiti2075.com>',
      to: ['info@nouvoayiti2075.com'],
      subject: 'New Join Form Submission',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Message:</strong> ${message || 'No message provided'}</p>
      `,
    });

    console.log('✅ Email sent:', result);
    res.status(200).json({ success: true, message: 'Submission received' });
  } catch (error) {
    console.error('❌ Email failed:', error);
    res.status(500).json({ success: false, error: 'Email failed to send' });
  }
}
