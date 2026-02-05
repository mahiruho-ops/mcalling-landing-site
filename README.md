# MChat Bot Website

Marketing website for MChat Bot - an AI-powered chatbot platform.

**Live:** https://mchatbot.ai

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment file:
   ```bash
   cp .envexample .env.local
   ```

3. Fill in the environment variables (see below)

4. Run development server:
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | SMTP port (465 for SSL) |
| `SMTP_SECURE` | Use SSL (true/false) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `SMTP_FROM` | From email address |
| `ADMIN_EMAIL` | Email to receive form submissions |
| `EHLO_DOMAIN` | Domain for SMTP EHLO |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 secret key |

## Deployment

Hosted on **Vercel**. Pushing to `main` automatically deploys to production.

⚠️ **Important:** Commits must be made with git email `github@mahiruho.com` for deployment to trigger.

```bash
git config user.email "github@mahiruho.com"
```

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
