import handler from '../../../pages/api/contact';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-id' }),
  })),
}));

describe('POST /api/contact', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      method: 'POST',
      body: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '123-456-7890',
        service: 'Web Development',
        timeline: '1 month',
        message: 'Hello, I want a website.',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    process.env.GMAIL_USER = 'test@gmail.com';
    process.env.GMAIL_APP_PASSWORD = 'testpassword';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 405 for non-POST methods', async () => {
    req.method = 'GET';
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: 'Method not allowed' });
  });

  it('sends email and returns 200 on success', async () => {
    const nodemailer = require('nodemailer');
    await handler(req, res);

    expect(nodemailer.createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Email sent!' });
  });

  it('returns 500 when sendMail fails', async () => {
    const nodemailer = require('nodemailer');
    nodemailer.createTransport.mockReturnValueOnce({
      sendMail: jest.fn().mockRejectedValue(new Error('SMTP error')),
    });

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Failed to send email.' });
  });

  it('includes phone fallback when phone is not provided', async () => {
    req.body.phone = '';
    const nodemailer = require('nodemailer');
    const sendMailMock = jest.fn().mockResolvedValue({ messageId: 'test-id' });
    nodemailer.createTransport.mockReturnValueOnce({ sendMail: sendMailMock });

    await handler(req, res);

    const callArgs = sendMailMock.mock.calls[0][0];
    expect(callArgs.text).toContain('Not provided');
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('includes timeline fallback when timeline is not specified', async () => {
    req.body.timeline = '';
    const nodemailer = require('nodemailer');
    const sendMailMock = jest.fn().mockResolvedValue({ messageId: 'test-id' });
    nodemailer.createTransport.mockReturnValueOnce({ sendMail: sendMailMock });

    await handler(req, res);

    const callArgs = sendMailMock.mock.calls[0][0];
    expect(callArgs.text).toContain('Not specified');
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
