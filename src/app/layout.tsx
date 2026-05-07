import type { Metadata, Viewport } from "next";
import { Poppins, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { CustomCode } from "@/components/seo/CustomCode";
import {
  organizationSchema,
  personSchema,
  websiteSchema,
} from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Saurabh Bhayana — Website Development, Digital Marketing & AI Services",
    template: "%s · Saurabh Bhayana",
  },
  description: site.description,
  applicationName: site.brand,
  authors: [{ name: site.founder.name, url: site.url }],
  creator: site.founder.name,
  publisher: site.brand,
  keywords: [
    "website development",
    "web development services",
    "digital marketing agency",
    "AI services",
    "AI SEO",
    "GEO",
    "AEO",
    "LLMO",
    "Generative Engine Optimization",
    "Answer Engine Optimization",
    "Large Language Model Optimization",
    "SEO services",
    "Google Ads",
    "Meta Ads",
    "Shopify development",
    "Webflow development",
    "Next.js development",
    "WordPress development",
    "conversion-focused websites",
    "growth marketing consultant",
    "founder-led agency",
    "Saurabh Bhayana",
    "Saurabh Bhayana & Team",
    "Fatehabad",
    "India",
  ],
  category: "Marketing & Web Development",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.brand,
    title:
      "Saurabh Bhayana — Website Development, Digital Marketing & AI Services",
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.brand} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Saurabh Bhayana — Website Development, Digital Marketing & AI Services",
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${spaceGrotesk.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        {/* Site-wide structured data: Organization, Person (founder), WebSite. */}
        <JsonLd id="ld-organization" data={organizationSchema()} />
        <JsonLd id="ld-person" data={personSchema()} />
        <JsonLd id="ld-website" data={websiteSchema()} />
        {/* Admin-managed custom code (analytics, GTM, verification, etc.) */}
        <CustomCode slot="head" />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        <CustomCode slot="body_start" />
        {children}
        <CustomCode slot="body_end" />
      </body>
    </html>
  );
}
