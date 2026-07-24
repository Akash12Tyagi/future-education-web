"use client";

import Link from "next/link";
import { useEscapeToClose } from "@/hooks/useEscapeToClose";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const links: { href: string; label: string; sub?: boolean; delay: number }[] = [
  { href: "/find-your-course", label: "Find Your Course", delay: 40 },
  { href: "/find-your-course/matcher", label: "↳ AI Course Matcher", sub: true, delay: 80 },
  { href: "/colleges", label: "Colleges & Universities", delay: 120 },
  { href: "/colleges/compare", label: "↳ Compare Colleges", sub: true, delay: 160 },
  { href: "/admission-consultancy", label: "Admission Consultancy", delay: 200 },
  { href: "/admission-consultancy/scholarships", label: "↳ Scholarships & Loans", sub: true, delay: 240 },
  { href: "/tracker", label: "↳ Application Tracker", sub: true, delay: 280 },
  { href: "/downloads", label: "↳ Downloads", sub: true, delay: 300 },
  { href: "/success-stories", label: "Success Stories", delay: 320 },
  { href: "/placements", label: "Placements", delay: 360 },
  { href: "/gallery", label: "Gallery", delay: 400 },
  { href: "/about", label: "About", delay: 440 },
  { href: "/news-events", label: "↳ News & Events", sub: true, delay: 480 },
];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEscapeToClose(open, onClose);
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-[rgba(15,23,31,.5)]"
      style={{ animation: "fe-fade .22s ease" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 flex h-full w-[min(340px,86vw)] flex-col gap-1 overflow-y-auto bg-white p-5"
        style={{ animation: "feSlideInRight .32s cubic-bezier(.16,1,.3,1)" }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[17px] font-extrabold text-primary-900">Menu</span>
          <button onClick={onClose} aria-label="Close menu" className="border-none bg-none text-2xl text-neutral-500">
            ×
          </button>
        </div>
        <form action="/search" className="mb-2.5 flex gap-1.5" onSubmit={onClose}>
          <input
            name="q"
            type="search"
            placeholder="Search…"
            className="flex-1 rounded-lg border-[1.5px] border-[#D1D5DB] bg-white px-3 py-2 text-sm outline-none"
          />
          <button type="submit" className="cursor-pointer rounded-lg border-none bg-primary-100 px-3 text-base text-primary-900">
            🔍
          </button>
        </form>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={onClose}
            className={
              l.sub
                ? "border-none py-2.5 pr-2 pl-4.5 text-[14.5px] font-medium text-[#4B5563] no-underline"
                : "border-b border-[#eef1f7] py-3.5 px-2 text-base font-bold text-primary-900 no-underline"
            }
            style={{ animation: `feSlideInFromRight .3s cubic-bezier(.16,1,.3,1) ${l.delay}ms both` }}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={onClose}
          className="mt-3 rounded-[10px] bg-accent-500 py-3.5 text-center font-bold text-white no-underline"
          style={{ animation: "feFadeUp .35s cubic-bezier(.16,1,.3,1) 400ms both" }}
        >
          Enquire Now
        </Link>
      </div>
    </div>
  );
}
