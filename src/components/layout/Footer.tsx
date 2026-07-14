"use client";

import Link from "next/link";
import { footerGroups } from "@/data/navigation";
import { useReveal, revealStyle } from "@/hooks/useReveal";

export function Footer() {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <footer className="bg-[#0B2E1D] text-[#B9D6C4]">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1220px] gap-8 px-[22px] pt-[52px] pb-[30px]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
      >
        <div className="col-span-full max-w-[340px]" style={revealStyle(revealed, { delay: 0 })}>
          <div className="mb-3.5 flex items-center gap-2.5">
            <span className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] bg-highlight-500 text-[19px] font-extrabold text-primary-900">
              F
            </span>
            <span className="text-[17px] font-extrabold text-white">Future Education</span>
          </div>
          <p className="mb-3 text-sm leading-relaxed">
            Career counselling and admission guidance under the Future Education Trust — 15+ years, 5,000+ partner
            institutes, one honest conversation at a time.
          </p>
          <div className="text-[13px] leading-relaxed">HE-9, City Centre, Sector-4, Bokaro Steel City, Jharkhand</div>
        </div>

        {footerGroups.map((group, i) => (
          <div key={group.heading} style={revealStyle(revealed, { delay: (i + 1) * 70 })}>
            <div className="mb-3 text-sm font-bold text-white">{group.heading}</div>
            {group.links.map((link) => (
              <Link key={link.href} href={link.href} className="block py-1.5 text-sm text-[#B9D6C4] no-underline">
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1220px] flex-wrap justify-between gap-3.5 px-[22px] py-4.5 text-[13px]">
          <span>© 2026 Future Education Trust. Open daily, 10 AM – 8 PM (Sunday by appointment).</span>
          <span>+91 93346 49506 · +91 98353 98833</span>
        </div>
      </div>
    </footer>
  );
}
