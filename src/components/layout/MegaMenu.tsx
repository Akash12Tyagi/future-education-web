"use client";

import Link from "next/link";
import Image from "next/image";
import type { MegaMenuColumn, MegaMenuPromo, NavGroup } from "@/data/navigation";

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 ease-out ${className}`}
    >
      <path d="M4 11 11 4M11 4H5M11 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MegaColumn({ column, onNavigate }: { column: MegaMenuColumn; onNavigate: () => void }) {
  return (
    <div>
      <div className="mb-4 text-[12px] font-bold tracking-[.08em] text-highlight-500 uppercase">{column.heading}</div>
      <ul className="flex flex-col">
        {column.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className="group -mx-3 flex items-center justify-between gap-3 rounded-xl px-3 py-3.5 text-[16px] font-bold text-neutral-900 no-underline transition-colors hover:bg-neutral-100"
            >
              <span className="flex items-center gap-2.5">
                {link.label}
                {link.tag && (
                  <span className="rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-accent-500 uppercase">
                    {link.tag}
                  </span>
                )}
              </span>
              <ArrowIcon className="text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-900" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PromoCard({ promo, onNavigate }: { promo: MegaMenuPromo; onNavigate: () => void }) {
  return (
    <Link
      href={promo.ctaHref}
      onClick={onNavigate}
      className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-[#F3DDB0] bg-[linear-gradient(160deg,#FFF8EC_0%,#FEEFD6_100%)] p-7 no-underline"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage: "linear-gradient(120deg, transparent 48%, black 80%)",
          WebkitMaskImage: "linear-gradient(120deg, transparent 48%, black 80%)",
        }}
      >
        <Image src={promo.image} alt="" fill sizes="360px" className="object-cover object-[75%_30%]" />
      </div>

      <div className="relative z-10 max-w-[58%]">
        <div className="mb-3 text-[11.5px] font-bold tracking-[.08em] text-highlight-500 uppercase">{promo.eyebrow}</div>
        <h3 className="font-display text-[26px] leading-[1.15] font-extrabold text-neutral-900">
          {promo.title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h3>
        <p className="mt-3 text-[13.5px] leading-relaxed text-neutral-500">{promo.description}</p>
      </div>

      <span className="relative z-10 mt-6 flex items-center gap-1.5 text-[14px] font-bold text-highlight-500">
        {promo.ctaLabel}
        <ArrowIcon className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

interface MegaMenuProps {
  group: NavGroup;
  onNavigate: () => void;
}

export function MegaMenu({ group, onNavigate }: MegaMenuProps) {
  return (
    <div className="flex gap-10 px-10 py-9">
      <div className="grid flex-[1.9] grid-cols-2 gap-x-10 gap-y-8">
        {group.columns.map((column) => (
          <MegaColumn key={column.heading} column={column} onNavigate={onNavigate} />
        ))}
      </div>
      <div className="w-px shrink-0 bg-[#E5E7EB]" />
      <div className="flex-1">
        <PromoCard promo={group.promo} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
