// pages/api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, phone, service, timeline, message } = req.body || {};

        if (!name || !email || !service || !message) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: name, email, service, and message are required.',
            });
        }

        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            console.error('Missing email configuration: GMAIL_USER or GMAIL_APP_PASSWORD environment variables are not set.');
            return res.status(500).json({
                success: false,
                message: 'Email service is not configured. Please contact the site owner.',
            });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
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
        console.error('Contact API error:', error);
        const userMessage =
            error.code === 'EAUTH'
                ? 'Email authentication failed. Please contact the site owner.'
                : 'Failed to send email. Please try again later.';
        res.status(500).json({ success: false, message: userMessage });
    }
}