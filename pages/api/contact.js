import nodemailer from 'nodemailer';

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function isRateLimited(ip) {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.set(ip, { windowStart: now, count: 1 });
        return false;
    }

    entry.count += 1;
    return entry.count > MAX_REQUESTS_PER_WINDOW;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeField(value, maxLength) {
    if (typeof value !== 'string') return '';
    return value.slice(0, maxLength).replace(/[\r\n]/g, ' ');
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    if (isRateLimited(ip)) {
        return res.status(429).json({ message: 'Too many requests. Please try again later.' });
    }

    try {
        const body = req.body;
        if (!body || typeof body !== 'object') {
            return res.status(400).json({ message: 'Invalid request body.' });
        }

        const name = sanitizeField(body.name, 100);
        const email = sanitizeField(body.email, 254);
        const phone = sanitizeField(body.phone, 30);
        const service = sanitizeField(body.service, 100);
        const timeline = sanitizeField(body.timeline, 100);
        const message = typeof body.message === 'string' ? body.message.slice(0, 2000) : '';

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required.' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address.' });
        }

        const allowedServices = ['Web Development', 'QA Testing', 'UI/UX Design', 'Frontend Dev'];
        if (service && !allowedServices.includes(service)) {
            return res.status(400).json({ message: 'Invalid service selection.' });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone);
        const safeService = escapeHtml(service);
        const safeTimeline = escapeHtml(timeline);
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            subject: `New message from ${name.replace(/[^\w\s.-]/g, '')}`,
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
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${safeService}</p>
        <p><strong>Timeline:</strong> ${safeTimeline || 'Not specified'}</p>
        <p><strong>Message:</strong><br/>${safeMessage}</p>
      `,
        });

        res.status(200).json({ success: true, message: 'Email sent!' });
    } catch (error) {
        console.error('Contact form error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
}
