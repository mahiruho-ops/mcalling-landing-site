import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MetaPixel from "@/components/MetaPixel";
import type { Viewport } from 'next'
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { InterestForm } from "@/components/InterestForm";
import { Metadata } from "next";
import { seoContent } from "@/content/mkcalling/seo";

export const metadata: Metadata = {
  metadataBase: new URL(seoContent.metadataBase),
  alternates: {
    canonical: seoContent.metadataBase,
  },
  title: {
    default: seoContent.defaultTitle,
    template: `%s | ${seoContent.siteName}`,
  },
  description: seoContent.defaultDescription,
  keywords: seoContent.defaultKeywords,
  authors: [{ name: "Mahiruho Consulting Services" }],
  creator: "Mahiruho Consulting Services",
  publisher: "Mahiruho Consulting Services",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: seoContent.openGraph.type,
    locale: seoContent.openGraph.locale,
    url: seoContent.metadataBase,
    title: seoContent.defaultTitle,
    description: seoContent.defaultDescription,
    siteName: seoContent.openGraph.siteName,
    images: seoContent.openGraph.images,
  },
  twitter: {
    card: seoContent.twitter.card,
    title: seoContent.defaultTitle,
    description: seoContent.defaultDescription,
    images: seoContent.openGraph.images.map(img => img.url),
    site: seoContent.twitter.site,
  },
  category: "technology",
}; 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8B5CF6' },
    { media: '(prefers-color-scheme: dark)', color: '#8B5CF6' }
  ],
  colorScheme: "light dark",
}
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



import { BackToTop } from "@/components/BackToTop";
import HeatMap from "@/components/HeatMap";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
           <div className="min-h-screen bg-background text-foreground" suppressHydrationWarning>
           <Header />
           <main>
            {children}
            <InterestForm />
            </main>
            <Footer />
            <Toaster />
            <BackToTop />
          </div>
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        )}
        <HeatMap />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
