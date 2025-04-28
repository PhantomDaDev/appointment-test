import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// POST route to send email
app.post('/send-email', async (req, res) => {
  const { from_name, from_email, phone_number, appointment_date, who_to_meet, teacher_name, message } = req.body;

  try {
    // Create transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shahaanikhlas06@gmail.com',  // <-- REPLACE with your Gmail
        pass: 'xpkz xuvs yidi gkap',         // <-- REPLACE with your App Password (NOT normal password)
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

    res.json({ message: 'Appointment sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
