"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppState } from "@/context/app-state";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { LeadForm } from "@/components/lead-form/LeadForm";
import { courseOptions } from "@/data/courses";
import { waHref, WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function ContactPage() {
  const { recordLead } = useAppState();
  const isMobile = useIsMobile();

  return (
    <div className="mx-auto max-w-[1080px] px-[22px] pt-10 pb-[90px]">
      <h1 className="mb-2.5 text-[clamp(28px,3.4vw,40px)] font-extrabold text-primary-900">Contact us</h1>
      <p className="m-0 mb-7.5 max-w-[60ch] text-[17px] text-[#4B5563]">
        Fill the form and a counsellor calls you within 24 hours — or reach us directly at our Bokaro Steel City
        office, open every day of the year.
      </p>

      <div
        className="grid items-start gap-7.5"
        style={{ gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "minmax(0, 1.2fr) minmax(0, 0.9fr)" }}
      >
        <div className="order-1 rounded-2xl border border-[#E5E7EB] bg-white p-7">
          <h2 className="mb-4 text-xl font-extrabold text-primary-900">Send an enquiry</h2>
          <LeadForm
            variant="full"
            sourceTag="contact_page"
            submitLabel="Send enquiry"
            onSubmitLead={recordLead}
            courseOptions={courseOptions}
          />
        </div>
        <div className="order-2 flex flex-col gap-4">
          <div className="rounded-[14px] bg-primary-900 p-5.5 text-[#E5F3EA]">
            <div className="mb-3.5 text-base font-extrabold text-white">Talk to us now</div>
            <div className="flex flex-col gap-3 text-[15px]">
              <a href={waHref()} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-white no-underline">
                <span className="h-2.5 w-2.5 rounded-full bg-[#25D366]" /> WhatsApp: +91 {WHATSAPP_NUMBER.slice(2)}
              </a>
              <a href="tel:+919334649506" className="text-[#E5F3EA] no-underline">
                ☎ +91 93346 49506
              </a>
              <a href="tel:+919835398833" className="text-[#E5F3EA] no-underline">
                ☎ +91 98353 98833
              </a>
              <a href="tel:+916542233033" className="text-[#E5F3EA] no-underline">
                ☎ 06542-233033 (landline)
              </a>
            </div>
          </div>
          <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-5.5">
            <div className="mb-3 text-[15px] font-extrabold text-primary-900">Our offices</div>
            <div className="mb-3.5 text-sm leading-relaxed text-[#4B5563]">
              <strong className="text-neutral-900">Bokaro Steel City (Head Office)</strong>
              <br />
              HE-9, City Centre, Sector-4, Bokaro Steel City, Jharkhand
            </div>
            <div className="text-sm leading-relaxed text-[#4B5563]">
              <strong className="text-neutral-900">Email</strong>
              <br />
              infofutureeducation@gmail.com
            </div>
            <div className="mt-3.5 text-[13px] text-neutral-500">Office hours: Daily, 10 AM – 8 PM (Sunday by appointment)</div>
          </div>
          <div className="relative overflow-hidden rounded-[14px]" style={{ aspectRatio: "16/10" }}>
            <Image
              src="/images/office/bokaro-office.jpg"
              alt="Welcoming reception area of a modern education consultancy office"
              fill
              sizes="(max-width: 1080px) 100vw, 460px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-6.5 flex flex-wrap items-center justify-between gap-4 rounded-[14px] bg-primary-100 p-5.5">
        <span className="text-[15px] text-primary-900">Not ready to fill a form? See exactly how our consultancy works first.</span>
        <Link href="/admission-consultancy" className="font-bold text-accent-500 no-underline">
          How it works →
        </Link>
      </div>
    </div>
  );
}
