import { NextRequest, NextResponse } from 'next/server';
import { sendInterestFormEmails } from '@/lib/email';
import { INTEREST_MESSAGE_MAX_LENGTH } from '@/lib/interest-form-limits';
import { parsePricingContext } from '@/lib/pricing-context';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      message,
      interestType,
      countryCode,
      phone,
      industry,
      primaryUseCase: primaryUseCaseRaw,
      callingDirection,
      monthlyCallingMinutes,
      preferredLanguages,
      goLiveTimeline,
      currentCallingSetup,
      crmTools,
      captchaToken,
      pricingContext: pricingContextBody,
    } = body;
    const primaryUseCase = Array.isArray(primaryUseCaseRaw) ? primaryUseCaseRaw : [];

    const messageStr = typeof message === 'string' ? message : message != null ? String(message) : '';
    if (messageStr.length > INTEREST_MESSAGE_MAX_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          message: `Message must be at most ${INTEREST_MESSAGE_MAX_LENGTH} characters.`,
        },
        { status: 400 },
      );
    }

    const goLiveTimelineStr = typeof goLiveTimeline === 'string' ? goLiveTimeline.trim() : '';
    if (!goLiveTimelineStr) {
      return NextResponse.json(
        { success: false, message: 'Go-live timeline is required' },
        { status: 400 },
      );
    }

    const companyStr = typeof company === 'string' ? company.trim() : '';
    if (!companyStr) {
      return NextResponse.json(
        { success: false, message: 'Company name is required' },
        { status: 400 },
      );
    }

    let parsedPricingContext = null as ReturnType<typeof parsePricingContext>;
    if (pricingContextBody != null) {
      try {
        const raw = typeof pricingContextBody === 'string' ? JSON.parse(pricingContextBody) : pricingContextBody;
        parsedPricingContext = parsePricingContext(raw);
      } catch {
        parsedPricingContext = null;
      }
    }
    const hasValidPricingContext = parsedPricingContext !== null;

    // Validate required fields (all except message and crmTools; company validated above as trimmed)
    if (!name || !email || !interestType || !phone || !preferredLanguages) {
      return NextResponse.json(
        { success: false, message: 'Name, email, interest type, phone, and preferred languages are required' },
        { status: 400 }
      );
    }

    if (!hasValidPricingContext) {
      if (!industry || !primaryUseCase || !callingDirection || !monthlyCallingMinutes || !currentCallingSetup) {
        return NextResponse.json(
          { success: false, message: 'All fields are required except Message and CRM/Tools' },
          { status: 400 }
        );
      }
    }

    // Validate primaryUseCase is an array with at least one item (skip when estimator context supplies it server-side via prefill — still require client sent array or allow empty if context)
    if (!Array.isArray(primaryUseCase)) {
      return NextResponse.json(
        { success: false, message: 'Primary use case must be a valid selection' },
        { status: 400 }
      );
    }
    if (!hasValidPricingContext && primaryUseCase.length === 0) {
      return NextResponse.json(
        { success: false, message: 'At least one primary use case must be selected' },
        { status: 400 }
      );
    }
    if (hasValidPricingContext && primaryUseCase.length === 0 && parsedPricingContext!.interestFormPrefill.primaryUseCase.length === 0) {
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

    const primaryUseCaseEffective =
      hasValidPricingContext && primaryUseCase.length === 0
        ? parsedPricingContext!.interestFormPrefill.primaryUseCase
        : primaryUseCase;

    const smbMonthlyMinutesFromContext =
      hasValidPricingContext &&
      parsedPricingContext!.source === "smb" &&
      Boolean(String(parsedPricingContext!.interestFormPrefill.monthlyCallingMinutes || "").trim());

    const monthlyCallingMinutesEffective =
      smbMonthlyMinutesFromContext && !String(monthlyCallingMinutes || "").trim()
        ? String(parsedPricingContext!.interestFormPrefill.monthlyCallingMinutes).trim()
        : String(monthlyCallingMinutes || "").trim();

    if (!monthlyCallingMinutesEffective) {
      return NextResponse.json(
        { success: false, message: "Estimated monthly calling minutes are required (or run the SMB estimator first)." },
        { status: 400 },
      );
    }

    // Log the submission data
    console.log('Interest form submission:', {
      name,
      email,
      company: companyStr,
      message: messageStr,
      interestType,
      countryCode,
      phone,
      industry,
      primaryUseCase: primaryUseCaseEffective,
      callingDirection,
      monthlyCallingMinutes: monthlyCallingMinutesEffective,
      preferredLanguages,
      goLiveTimeline: goLiveTimelineStr,
      currentCallingSetup,
      crmTools,
      hasValidPricingContext,
      timestamp: new Date().toISOString()
    });

    const pricingEmailExtras =
      hasValidPricingContext && parsedPricingContext
        ? {
            pricingEstimatorSource: parsedPricingContext.source,
            pricingEstimatorSummary: parsedPricingContext.summaryLines.join('\n'),
            pricingEstimatorJson: JSON.stringify(parsedPricingContext),
          }
        : {};

    // Send both confirmation and notification emails
    await sendInterestFormEmails({
      name,
      email,
      company: companyStr,
      message: messageStr,
      interestType,
      countryCode,
      phone,
      industry,
      primaryUseCase: primaryUseCaseEffective,
      callingDirection,
      monthlyCallingMinutes: monthlyCallingMinutesEffective,
      preferredLanguages,
      goLiveTimeline: goLiveTimelineStr,
      currentCallingSetup,
      crmTools,
      ...pricingEmailExtras,
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
