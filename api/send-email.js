import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { from_name, from_email, phone_number, appointment_date, who_to_meet, teacher_name, message } = req.body;

    try {
      // Create transporter
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,  // Store in Vercel secrets
          pass: process.env.GMAIL_PASS,  // Store in Vercel secrets
        },
      });

      // Email options
      let mailOptions = {
        from: from_email,
        to: 'shahaanikhlas06@gmail.com',
        subject: 'New Appointment Booking',
        html: `
          <h3>New Appointment Details</h3>
          <p><strong>Name:</strong> ${from_name}</p>
          <p><strong>Email:</strong> ${from_email}</p>
          <p><strong>Phone:</strong> ${phone_number}</p>
          <p><strong>Date:</strong> ${appointment_date}</p>
          <p><strong>Who to Meet:</strong> ${who_to_meet}</p>
          <p><strong>Teacher (if applicable):</strong> ${teacher_name}</p>
          <p><strong>Reason:</strong> ${message}</p>
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Appointment sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
