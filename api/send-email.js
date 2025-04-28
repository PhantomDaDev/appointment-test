import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { from_name, from_email, phone_number, appointment_date, who_to_meet, teacher_name, message } = req.body;

    // Create a transport object using Gmail service (or use other providers)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // Environment variable for email user
        pass: process.env.EMAIL_PASSWORD, // Environment variable for email password
      },
    });

    const mailOptions = {
      from: from_email,
      to: process.env.EMAIL_TO, // The email you want to send appointments to
      subject: 'Appointment Request',
      text: `
        Name: ${from_name}
        Email: ${from_email}
        Phone: ${phone_number}
        Date: ${appointment_date}
        Who to Meet: ${who_to_meet}
        Teacher: ${teacher_name || 'N/A'}
        Message: ${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Appointment request sent successfully!' });
    } catch (error) {
      return res.status(500).json({ message: 'Error sending email!' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

