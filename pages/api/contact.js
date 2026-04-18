// pages/api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, phone, service, timeline, message } = req.body;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Use the explicit host instead of the 'service' shorthand
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.GMAIL_USER, // Your full Gmail address
                pass: process.env.GMAIL_APP_PASSWORD // The 16-char password (spaces removed)
            }
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            subject: `New message from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service: ${service}
Timeline: ${timeline || 'Not specified'}
Message: ${message}
      `,
            html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br>')}</p>
      `,
        });

        res.status(200).json({ success: true, message: 'Email sent!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
}