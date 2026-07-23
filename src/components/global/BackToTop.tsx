"use client";

import { useEffect, useState } from "react";
import { useAppState } from "@/context/app-state";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function BackToTop() {
  const { compare } = useAppState();
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // CompareTray occupies the same bottom-left corner when active — match the
  // mutual-exclusion pattern StickyEnquiryWidget already uses for that widget.
  if (!visible || compare.length > 0) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-[22px] left-[22px] z-[65] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-lg text-primary-900 shadow-[0_8px_24px_rgba(15,61,38,.16)]"
      style={{ animation: "fe-fade .25s ease" }}
    >
      ↑
    </button>
  );
}
