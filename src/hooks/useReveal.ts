"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Mirrors the prototype's scroll-reveal system: observe one container
 * (e.g. a grid section) and flip `revealed` to true the first time it
 * enters the viewport. Children then stagger in via per-index delay.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.16) {
  const ref = useRef<T | null>(null);
  const [intersected, setIntersected] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIntersected(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion, threshold]);

  // Reduced-motion users always get content already revealed.
  const revealed = reducedMotion || intersected;

  return { ref, revealed };
}

export interface RevealStyleOpts {
  delay?: number;
  dist?: number;
  dur?: number;
  scale?: boolean;
  scaleFrom?: number;
}

export function revealStyle(revealed: boolean, opts: RevealStyleOpts = {}): React.CSSProperties {
  const dist = opts.dist ?? 20;
  const dur = opts.dur ?? 650;
  const delay = opts.delay ?? 0;
  if (opts.scale) {
    const from = opts.scaleFrom ?? 1.05;
    return {
      opacity: revealed ? 1 : 0,
      transform: revealed ? "scale(1)" : `scale(${from})`,
      transition: `opacity ${dur}ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform ${dur}ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
      willChange: "opacity, transform",
    };
  }
  return {
    opacity: revealed ? 1 : 0,
    transform: revealed ? "none" : `translateY(${dist}px)`,
    transition: `opacity ${dur}ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform ${dur}ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
    willChange: "opacity, transform",
  };
}
