import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

async function sendEmail(recepient, body) {
  if (process.env.RESEND_API_KEY) {
    sendByResend(recepient, body);
  } else {
    sendByGoogleSMTP(recepient, body);
  }
}

async function sendByResend(recipient, body) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: 'My App <onboarding@resend.dev>',
      to: 'vlad.ua@gmail.com',
      subject: 'Your order 🚀',
      html: body,
    });

    console.log('Email sent via Resend.com:', result);
  } catch (error) {
    console.error('Error sending email via Resend.com:', error);
  }
}

async function sendByGoogleSMTP(recipient, body) {
  // 1. Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP host (e.g., smtp.mailtrap.io, ://brevo.com)
    port: 587, // 587 for TLS, 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your email address
      pass: process.env.SMTP_PASS, // Your app password (not your normal login password)
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: '"Simple electronics shop" ' + process.env.SMTP_USER, // Sender address
    to: recipient, // List of receivers (separated by commas if multiple)
    subject: 'Your order 🚀', // Subject line
    text: 'Hello, this is a plain text version of the email.', // Plain text body
    html: body, // '<h1>Hello!</h1><p>This is a <b>formatted HTML</b> email sent from Node.js.</p>', // HTML body
  };

  try {
    // 3. Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(
      'Email sent successfully via google SMTP. Message ID:',
      info.messageId,
    );
  } catch (error) {
    console.error('Error occurred while sending email via google SMTP:', error);
  }
}

export default sendEmail;
