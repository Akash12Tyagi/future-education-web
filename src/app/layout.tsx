import type { Metadata } from "next";
import { bodyFont, displayFont, devanagariFont } from "@/lib/fonts";
import "./globals.css";
import { AppStateProvider } from "@/context/app-state";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyEnquiryWidget } from "@/components/global/StickyEnquiryWidget";
import { CompareTray } from "@/components/global/CompareTray";
import { CallbackSheet } from "@/components/global/CallbackSheet";

export const metadata: Metadata = {
  title: "Future Education — Admission Counselling & Career Guidance",
  description:
    "Honest, transparent admission counselling for MBBS, BDS, Engineering, Nursing, Management and more — guided by 15+ years of experience and a network of 5,000+ partner institutes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${devanagariFont.variable}`}>
      <body className="flex min-h-full flex-col font-sans text-neutral-900" style={{ background: "var(--color-neutral-100)" }}>
        <AppStateProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyEnquiryWidget />
          <CompareTray />
          <CallbackSheet />
        </AppStateProvider>
      </body>
    </html>
  );
}
