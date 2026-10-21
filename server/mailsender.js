import nodemailer from 'nodemailer';

async function sendEmail(recipient, body) {
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
    console.log('Email sent successfully!. Message ID:', info.messageId);
  } catch (error) {
    console.error('Error occurred while sending email:', error);
  }
}

export default sendEmail;
