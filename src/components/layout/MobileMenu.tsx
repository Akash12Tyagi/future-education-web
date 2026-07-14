"use client";

import Link from "next/link";

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
  { href: "/success-stories", label: "Success Stories", delay: 320 },
  { href: "/about", label: "About", delay: 360 },
];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-[rgba(15,23,31,.5)]"
      style={{ animation: "fe-fade .22s ease" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 flex h-full w-[min(340px,86vw)] flex-col gap-1 overflow-y-auto bg-white p-5"
        style={{ animation: "feSlideInRight .32s cubic-bezier(.16,1,.3,1)" }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[17px] font-extrabold text-primary-900">Menu</span>
          <button onClick={onClose} className="border-none bg-none text-2xl text-neutral-500">
            ×
          </button>
        </div>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={onClose}
            className={
              l.sub
                ? "border-none py-2.5 pr-2 pl-4.5 text-[14.5px] font-medium text-[#4B5563] no-underline"
                : "border-b border-[#F0F2EF] py-3.5 px-2 text-base font-bold text-primary-900 no-underline"
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
