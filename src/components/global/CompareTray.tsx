"use client";

import Link from "next/link";
import { useAppState } from "@/context/app-state";
import { colleges } from "@/data/colleges";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function CompareTray() {
  const { compare, removeCompare, clearCompare, sheetOpen } = useAppState();
  const isMobile = useIsMobile();

  const items = compare.map((id) => colleges.find((c) => c.id === id)).filter((c): c is NonNullable<typeof c> => !!c);
  if (items.length === 0 || sheetOpen) return null;

  return (
    <div className={isMobile ? "fixed right-0 bottom-0 left-0 z-[68]" : "fixed bottom-[22px] left-[22px] z-[68]"}>
      <div
        className="flex flex-wrap items-center gap-3.5 rounded-2xl bg-primary-900 p-3 px-4 text-white shadow-[0_14px_40px_rgba(0,0,0,.28)]"
        style={{ animation: "feFadeUp .35s cubic-bezier(.16,1,.3,1)" }}
      >
        <span className="text-sm font-extrabold">Compare ({items.length}/4)</span>
        <div className="flex max-w-[420px] flex-wrap gap-1.5">
          {items.map((c) => (
            <span key={c.id} className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-[12.5px]">
              {c.name}
              <button
                onClick={() => removeCompare(c.id)}
                aria-label="Remove"
                className="cursor-pointer border-none bg-none text-[15px] leading-none text-highlight-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <Link
          href="/colleges/compare"
          className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-bold text-white no-underline"
        >
          Compare Now →
        </Link>
        <button onClick={clearCompare} className="cursor-pointer border-none bg-none text-[13px] text-[#B9D6C4] underline">
          Clear
        </button>
      </div>
    </div>
  );
}
