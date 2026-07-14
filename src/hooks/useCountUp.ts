"use client";

import { useEffect, useRef, useState } from "react";

/** Eased 0→1 progress value, started once `start` becomes true. */
export function useCountUp(start: boolean, duration = 1400): number {
  const [progress, setProgress] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!start || started.current) return;
    started.current = true;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, duration]);

  return progress;
}
