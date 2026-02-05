import { NextRequest, NextResponse } from 'next/server';
import { sendInterestFormEmails } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message, interestType, countryCode, phone, industry, captchaToken } = body;

    // Validate required fields
    if (!name || !email || !interestType || !phone || !industry) {
      return NextResponse.json(
        { success: false, message: 'Name, email, interest type, phone, and industry are required' },
        { status: 400 }
      );
    }

    // Validate CAPTCHA token
    if (!captchaToken) {
      return NextResponse.json(
        { success: false, message: 'CAPTCHA verification is required' },
        { status: 400 }
      );
    }

    // Verify CAPTCHA token with Google
    const captchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY || '',
        response: captchaToken,
        remoteip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
      }),
    });

    const captchaResult = await captchaResponse.json();

    if (!captchaResult.success) {
      return NextResponse.json(
        { success: false, message: 'CAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Log the submission data
    console.log('Interest form submission:', {
      name,
      email,
      company,
      message,
      interestType,
      countryCode,
      phone,
      industry,
      timestamp: new Date().toISOString()
    });

    // Send both confirmation and notification emails
    await sendInterestFormEmails({
      name,
      email,
      company,
      message,
      interestType,
      countryCode,
      phone,
      industry
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest! We\'ll be in touch soon.'
    });

  } catch (error) {
    console.error('Error processing interest form:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
