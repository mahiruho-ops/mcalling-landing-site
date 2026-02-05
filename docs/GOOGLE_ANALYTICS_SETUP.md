# Google Analytics Setup

This document explains how to set up Google Analytics for your MChatbot website.

## Prerequisites

1. A Google Analytics account
2. A Google Analytics 4 (GA4) property set up for your website

## Setup Steps

### 1. Get Your Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Go to Admin → Data Streams
4. Click on your web stream
5. Copy the Measurement ID (format: G-XXXXXXXXXX)

### 2. Environment Variable

Create a `.env.local` file in your project root and add:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual measurement ID.

### 3. For Production Deployment

When deploying to production (Vercel, Netlify, etc.), add the environment variable:

- **Vercel**: Go to your project settings → Environment Variables
- **Netlify**: Go to Site settings → Environment variables
- **Other platforms**: Follow their respective documentation for environment variables

## How It Works

The Google Analytics implementation:

1. **GoogleAnalytics Component**: A client-side component that loads the Google Analytics script
2. **Layout Integration**: The component is conditionally rendered in the root layout when the environment variable is present
3. **Performance**: Uses Next.js Script component with `afterInteractive` strategy for optimal loading
4. **Privacy**: Only loads when the measurement ID is provided

## Features

- ✅ Automatic page view tracking
- ✅ Performance optimized loading
- ✅ Works alongside Vercel Analytics
- ✅ Environment-based configuration
- ✅ TypeScript support

## Testing

1. Set up the environment variable
2. Run your development server: `npm run dev`
3. Open browser developer tools → Network tab
4. Navigate your site and look for requests to `googletagmanager.com`
5. Check Google Analytics Real-time reports to see live data

## Troubleshooting

- **Analytics not working**: Ensure the environment variable is set correctly
- **No data in GA**: It may take 24-48 hours for data to appear in reports
- **Development vs Production**: Make sure to set the environment variable in your production environment
