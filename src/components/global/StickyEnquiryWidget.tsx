"use client";

import Link from "next/link";
import { useAppState } from "@/context/app-state";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { waHref } from "@/lib/whatsapp";

export function StickyEnquiryWidget() {
  const { scrolled, stickyDismissed, compare, dismissSticky, openSheet } = useAppState();
  const isMobile = useIsMobile();

  const show = scrolled && !stickyDismissed && compare.length === 0;
  if (!show) return null;

  if (isMobile) {
    return (
      <div className="fixed right-0 bottom-0 left-0 z-[70]">
        <div
          className="flex flex-col gap-2 border-t border-[#E5E7EB] bg-white px-3.5 py-2.5 shadow-[0_-6px_20px_rgba(0,0,0,.08)]"
          style={{ animation: "feFadeUp .35s cubic-bezier(.16,1,.3,1)" }}
        >
          <Link
            href="/find-your-course/matcher"
            className="rounded-[10px] bg-accent-500 py-2.5 text-center text-[14.5px] font-bold text-white no-underline"
          >
            Apply Now →
          </Link>
          <div className="flex gap-2.5">
            <a
              href={waHref()}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-[10px] bg-primary-900 py-3 text-center text-[15px] font-bold text-white no-underline"
            >
              WhatsApp Us
            </a>
            <button
              onClick={openSheet}
              className="flex-1 cursor-pointer rounded-[10px] border-[1.5px] border-primary-600 bg-white py-3 text-[15px] font-bold text-primary-600"
            >
              Request Callback
            </button>
            <button
              onClick={dismissSticky}
              aria-label="Dismiss"
              className="w-11 cursor-pointer rounded-[10px] border border-[#E5E7EB] bg-neutral-100 text-lg text-neutral-500"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed right-[22px] bottom-[22px] z-[70]">
      <div
        className="flex w-[250px] flex-col gap-2.5 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_12px_34px_rgba(27, 37, 89,.16)]"
        style={{ animation: "feFadeUp .35s cubic-bezier(.16,1,.3,1)" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-bold text-primary-900">Need guidance?</span>
          <button onClick={dismissSticky} aria-label="Dismiss" className="border-none bg-none text-lg leading-none text-neutral-500">
            ×
          </button>
        </div>
        <Link
          href="/find-your-course/matcher"
          className="rounded-[10px] bg-accent-500 py-3 text-center text-[14.5px] font-bold text-white no-underline"
        >
          Apply Now →
        </Link>
        <a
          href={waHref()}
          target="_blank"
          rel="noreferrer"
          className="rounded-[10px] bg-primary-900 py-3 text-center text-[14.5px] font-bold text-white no-underline"
        >
          WhatsApp Us
        </a>
        <button onClick={openSheet} className="cursor-pointer rounded-[10px] border-[1.5px] border-primary-600 bg-white py-3 text-[14.5px] font-bold text-primary-600">
          Request Callback
        </button>
      </div>
    </div>
  );
}
