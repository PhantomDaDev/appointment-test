import { Resend } from 'resend';

const resend = new Resend('YOUR_API_KEY');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { name, email, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: 'your@email.com',
      subject: `New Appointment Request from ${name}`,
      html: `
        <h1>New Appointment Request</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return res.status(200).json({ message: 'Email sent', data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
