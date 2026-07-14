"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/about", label: "Our Story" },
  { href: "/about/director-message", label: "Director's Message" },
  { href: "/about/counsellors", label: "Our Counsellors" },
  { href: "/about/media", label: "Media & Recognition" },
];

export function AboutTabs() {
  const pathname = usePathname();

  return (
    <div className="mb-7 flex flex-wrap gap-2">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-lg px-4 py-2.5 text-sm font-bold whitespace-nowrap no-underline"
            style={
              active
                ? { background: "var(--color-primary-900)", color: "#fff" }
                : { background: "#fff", color: "#4B5563", border: "1px solid #E5E7EB" }
            }
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
