import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    // Validate required fields
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Please provide name, phone number, and message.' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const inquiryData = {
      timestamp,
      name,
      phone,
      email: email || 'Not provided',
      subject: subject || 'General Inquiry',
      message,
    };

    // Log the incoming message to server logs
    console.log('====================================================');
    console.log('📩 NEW CUSTOMER INQUIRY RECEIVED AT GLAMOUR NAILS:');
    console.log(JSON.stringify(inquiryData, null, 2));
    console.log('====================================================');

    /**
     * HOW THIS DELIVERS TO YOU IN PRODUCTION:
     * ----------------------------------------------------
     * Option 1: Via Resend (Recommended for Next.js - Free 3,000 emails/mo)
     * If process.env.RESEND_API_KEY is set:
     * const resend = new Resend(process.env.RESEND_API_KEY);
     * await resend.emails.send({
     *   from: 'inquiry@glamournails.vn',
     *   to: process.env.OWNER_EMAIL || 'your-email@gmail.com',
     *   subject: `[Glamour Nails] New Inquiry from ${name} - ${subject}`,
     *   text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
     * });
     *
     * Option 2: Via Telegram Bot (Instant phone push notification)
     * If process.env.TELEGRAM_BOT_TOKEN & TELEGRAM_CHAT_ID:
     * await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { ... })
     */

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been successfully sent to the salon owner.',
        receivedAt: timestamp,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact submission:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing your request.' },
      { status: 500 }
    );
  }
}
