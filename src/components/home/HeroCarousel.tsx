"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { BannerSlide } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics-actions";

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD_PX = 40;

/**
 * Full-screen image slider. Each photo is shown whole (object-contain) over a
 * blurred, cover-fitted copy of itself, so portrait and landscape shots both
 * fill the screen without cropping people out of frame.
 */
export function HeroCarousel({ slides }: { slides: BannerSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (paused || reducedMotion || slides.length < 2) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, reducedMotion, slides.length, index]);

  // Every slide hidden in Admin → Banners.
  if (slides.length === 0) return null;

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);
  const active = slides[index];
  const hasCaption = !!(active.heading || active.ctaLabel);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Photo highlights"
      className="relative h-[calc(100svh-120px)] min-h-[380px] w-full overflow-hidden bg-primary-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > SWIPE_THRESHOLD_PX) goTo(dx < 0 ? index + 1 : index - 1);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") goTo(index - 1);
        if (e.key === "ArrowRight") goTo(index + 1);
      }}
    >
      {slides.map((slide, i) => {
        // Only mount the slides next to the active one so ten full-size photos
        // aren't downloaded up front.
        const near = Math.abs(i - index) <= 1 || (index === slides.length - 1 && i === 0) || (index === 0 && i === slides.length - 1);
        if (!near) return null;
        return (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-[1000ms] ease-in-out"
            style={{ opacity: i === index ? 1 : 0, pointerEvents: "none" }}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              sizes="40vw"
              priority={i === 0}
              className="scale-110 object-cover blur-2xl brightness-[.55]"
            />
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-contain"
            />
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous photo"
        className="absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/30 text-2xl text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/50 md:left-6"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next photo"
        className="absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/30 text-2xl text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/50 md:right-6"
      >
        ›
      </button>

      {hasCaption && (
        <div
          key={active.id}
          className="absolute right-4 bottom-14 left-4 z-10 max-w-[440px] rounded-[14px] border border-white/20 bg-black/45 p-4 backdrop-blur-sm md:right-auto md:bottom-auto md:top-8 md:left-10"
          style={{ animation: reducedMotion ? undefined : "feFadeUp .5s cubic-bezier(.16,1,.3,1) both" }}
        >
          {active.heading && <div className="text-base font-extrabold text-white">{active.heading}</div>}
          {active.subheading && <div className="mt-1 text-[13px] text-white/80">{active.subheading}</div>}
          {active.ctaLabel && active.ctaHref && (
            <Link
              href={active.ctaHref}
              onClick={() => trackEvent("BANNER_CLICK", undefined, active.id).catch(() => {})}
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-accent-500 px-3.5 py-2 text-[13px] font-bold text-white no-underline"
            >
              {active.ctaLabel} →
            </Link>
          )}
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 md:bottom-6 md:left-10 md:translate-x-0 md:px-4 md:py-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 w-2.5 cursor-pointer rounded-full border-none p-0 transition ${i === index ? "bg-highlight-500" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
