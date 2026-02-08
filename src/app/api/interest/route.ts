import { NextRequest, NextResponse } from 'next/server';
import { sendInterestFormEmails } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message, interestType, countryCode, phone, industry, primaryUseCase, callingDirection, monthlyCallingMinutes, preferredLanguages, goLiveTimeline, currentCallingSetup, crmTools, captchaToken } = body;

    // Validate required fields (all except company, message, and crmTools)
    if (!name || !email || !interestType || !phone || !industry || !primaryUseCase || !callingDirection || !monthlyCallingMinutes || !preferredLanguages || !goLiveTimeline || !currentCallingSetup) {
      return NextResponse.json(
        { success: false, message: 'All fields are required except Company Name, Message, and CRM/Tools' },
        { status: 400 }
      );
    }

    // Validate primaryUseCase is an array with at least one item
    if (!Array.isArray(primaryUseCase) || primaryUseCase.length === 0) {
      return NextResponse.json(
        { success: false, message: 'At least one primary use case must be selected' },
        { status: 400 }
      );
    }

    // Validate preferredLanguages is an array with at least one item
    if (!Array.isArray(preferredLanguages) || preferredLanguages.length === 0) {
      return NextResponse.json(
        { success: false, message: 'At least one preferred language must be selected' },
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
      primaryUseCase,
      callingDirection,
      monthlyCallingMinutes,
      preferredLanguages,
      goLiveTimeline,
      currentCallingSetup,
      crmTools,
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
      industry,
      primaryUseCase,
      callingDirection,
      monthlyCallingMinutes,
      preferredLanguages,
      goLiveTimeline,
      currentCallingSetup,
      crmTools
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
