import { NextRequest, NextResponse } from "next/server";
import { sendContactFormEmail } from "@/lib/contact-email";
import { verifyRecaptchaToken } from "@/lib/verify-recaptcha";

const SUBJECTS = new Set(["Sales", "Billing", "Support", "Other"]);
const MESSAGE_MAX = 4000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const captchaToken = typeof body.captchaToken === "string" ? body.captchaToken : "";

    if (!name || !email || !phone || !company || !subject || !message) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
    }

    if (!SUBJECTS.has(subject)) {
      return NextResponse.json({ success: false, message: "Please select a valid subject." }, { status: 400 });
    }

    if (message.length > MESSAGE_MAX) {
      return NextResponse.json(
        { success: false, message: `Message must be at most ${MESSAGE_MAX} characters.` },
        { status: 400 },
      );
    }

    if (!captchaToken) {
      return NextResponse.json({ success: false, message: "CAPTCHA verification is required." }, { status: 400 });
    }

    const captcha = await verifyRecaptchaToken(
      captchaToken,
      request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
    );

    if (!captcha.success) {
      return NextResponse.json({ success: false, message: "CAPTCHA verification failed." }, { status: 400 });
    }

    await sendContactFormEmail({ name, email, phone, company, subject, message });

    return NextResponse.json({ success: true, message: "Thank you. We will respond shortly." });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, message: "Failed to send message. Please try again later." }, { status: 500 });
  }
}
