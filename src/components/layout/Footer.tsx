"use client";

import Link from "next/link";
import Image from "next/image";
import { footerGroups } from "@/data/navigation";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { NewsletterSignup } from "@/components/global/NewsletterSignup";

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
          <div className="mb-3.5">
            <Image src="/logo.png" alt="Future Education Trust" width={300} height={122} className="h-14 w-auto rounded-md" />
          </div>
          <p className="mb-3 text-sm leading-relaxed">
            Career counselling and admission guidance under the Future Education Trust — 15+ years, 5,000+ partner
            institutes, one honest conversation at a time.
          </p>
          <div className="mb-4 text-[13px] leading-relaxed">HE-9, City Centre, Sector-4, Bokaro Steel City, Jharkhand</div>
          <NewsletterSignup />
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
