export async function verifyRecaptchaToken(
  captchaToken: string,
  remoteIp?: string | null,
): Promise<{ success: boolean }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!secret) {
    console.error("RECAPTCHA_SECRET_KEY is not configured");
    return { success: false };
  }

  const captchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: captchaToken,
      remoteip: remoteIp ?? "",
    }),
  });

  const captchaResult = (await captchaResponse.json()) as { success?: boolean };
  return { success: Boolean(captchaResult.success) };
}
