"use client";

import { useEffect, useState } from "react";
import { waHref } from "@/lib/whatsapp";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Rotating messages in the centre of the top bar.
const MESSAGES = [
  "Admission Helpline: +91 9334649506 | +91 9835398833 — Call or WhatsApp us",
  "Landline: 06542-233033, 233033",
  "Office: HE 9, City Centre, Sector 4, Bokaro Steel City, Jharkhand 827004",
  "Office Hours: Daily, 10 AM – 6 PM (Sunday by appointment)",
  "Email: info@futureeducationonline.com",
];

// Replace with the official page URLs.
const FACEBOOK_URL = "https://www.facebook.com/";
const INSTAGRAM_URL = "https://www.instagram.com/";

const ROTATE_MS = 4500;

export function TopBar() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, reducedMotion, index]);

  const goTo = (i: number) => setIndex((i + MESSAGES.length) % MESSAGES.length);

  return (
    <div className="border-b border-[#E5E7EB] bg-white text-neutral-900">
      <div className="mx-auto flex max-w-[1220px] items-center gap-3 px-[22px] py-2">
        <div
          className="flex min-w-0 flex-1 items-center gap-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous message"
            className="flex h-7 w-7 flex-none cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-neutral-900 hover:bg-neutral-100"
          >
            <Chevron dir="left" />
          </button>
          <div className="min-w-0 flex-1 overflow-hidden text-center" aria-live="polite">
            <p
              key={index}
              className="m-0 truncate text-[13px] font-medium md:text-[15px]"
              style={{ animation: reducedMotion ? undefined : "feFadeUp .45s cubic-bezier(.16,1,.3,1) both" }}
            >
              {MESSAGES[index]}
            </p>
          </div>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next message"
            className="flex h-7 w-7 flex-none cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-neutral-900 hover:bg-neutral-100"
          >
            <Chevron dir="right" />
          </button>
        </div>

        <div className="hidden flex-none items-center gap-2 md:flex">
          <a
            href="tel:+919334649506"
            className="flex items-center gap-1.5 rounded-sm border border-[#D1D5DB] px-3 py-1.5 text-[14px] font-medium text-neutral-900 no-underline hover:border-neutral-400"
          >
            <PhoneIcon /> +91 9334649506
          </a>
          <a
            href={waHref()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-sm bg-[#ede809] px-3.5 py-1.5 text-[14px] font-bold text-primary-900 no-underline hover:bg-[#f4f04a]"
          >
            <WhatsAppIcon /> WhatsApp
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="flex h-8 w-9 items-center justify-center rounded-sm border border-[#D1D5DB] text-neutral-900 hover:border-neutral-400"
          >
            <FacebookIcon />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex h-8 w-9 items-center justify-center rounded-sm border border-[#D1D5DB] text-neutral-900 hover:border-neutral-400"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={dir === "left" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .78.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06a6.7 6.7 0 0 1-3.3-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43l-.76-1.83c-.2-.48-.4-.41-.56-.42h-.48a.92.92 0 0 0-.66.31 2.8 2.8 0 0 0-.87 2.07 4.8 4.8 0 0 0 1 2.56 11 11 0 0 0 4.2 3.7c1.56.68 2.17.73 2.95.62.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
