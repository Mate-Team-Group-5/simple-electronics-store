import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(recipient, body) {
  try {
    const result = await resend.emails.send({
      from: 'My App <onboarding@resend.dev>',
      to: 'vlad.ua@gmail.com',
      subject: 'Your order 🚀',
      html: body,
    });

    console.log('Email sent:', result);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export default sendEmail;
