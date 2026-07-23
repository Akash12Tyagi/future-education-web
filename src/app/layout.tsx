import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { bodyFont, displayFont, devanagariFont } from "@/lib/fonts";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

// Set NEXT_PUBLIC_SITE_URL to the real production domain before launch —
// used to resolve absolute canonical/OG URLs.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Future Education — Admission Counselling & Career Guidance",
    template: "%s | Future Education",
  },
  description:
    "Honest, transparent admission counselling for MBBS, BDS, Engineering, Nursing, Management and more — guided by 15+ years of experience and a network of 5,000+ partner institutes.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Future Education Trust",
  description:
    "Admission counselling and career-guidance trust for MBBS, BDS, Engineering, Nursing, Management and more.",
  url: siteUrl,
  telephone: "+91-9334649506",
  address: {
    "@type": "PostalAddress",
    streetAddress: "HE-9, City Centre, Sector-4",
    addressLocality: "Bokaro Steel City",
    addressRegion: "Jharkhand",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${devanagariFont.variable}`}>
      <body className="flex min-h-full flex-col font-sans text-neutral-900" style={{ background: "var(--color-neutral-100)" }}>
        <JsonLd data={organizationJsonLd} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
