"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { BannerSlide } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics-actions";

const DEFAULT_SLIDES: BannerSlide[] = [
  {
    id: "default-1",
    image: "/images/campus/image copy 3.png",
    imageAlt: "Modern multi-storey university campus building with landscaped lawns",
    heading: null,
    subheading: null,
    ctaLabel: null,
    ctaHref: null,
  },
  {
    id: "default-2",
    image: "/images/campus/image copy 4.png",
    imageAlt: "Deemed university campus with a grand academic building",
    heading: null,
    subheading: null,
    ctaLabel: null,
    ctaHref: null,
  },
  {
    id: "default-3",
    image: "/images/campus/image copy 5.png",
    imageAlt: "Hillside technical institute campus surrounded by greenery",
    heading: null,
    subheading: null,
    ctaLabel: null,
    ctaHref: null,
  },
  {
    id: "default-4",
    image: "/images/campus/image copy 6.png",
    imageAlt: "Management institute building entrance with manicured gardens",
    heading: null,
    subheading: null,
    ctaLabel: null,
    ctaHref: null,
  },
  {
    id: "default-5",
    image: "/images/campus/campus-11.jpg",
    imageAlt: "Institute of engineering and technology campus front view",
    heading: null,
    subheading: null,
    ctaLabel: null,
    ctaHref: null,
  },
];

const AUTOPLAY_MS = 4500;

export function HeroCarousel({ slides: providedSlides }: { slides?: BannerSlide[] }) {
  const slides = providedSlides && providedSlides.length > 0 ? providedSlides : DEFAULT_SLIDES;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || reducedMotion) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, reducedMotion, slides.length]);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);
  const active = slides[index];
  const hasCaption = !!(active.heading || active.ctaLabel);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-primary-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <Image
          key={slide.id}
          src={slide.image}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className="object-cover transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === index ? 1 : 0, pointerEvents: "none" }}
        />
      ))}
      <div
        // className="absolute inset-0"
        // style={{
        //   background:
        //     "linear-gradient(105deg, rgba(8,20,14,.90) 0%, rgba(10,28,19,.68) 45%, rgba(12,34,23,.52) 100%)",
        // }}
      />

      {/* Arrows */}
      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous slide"
        className="absolute top-1/2 left-3 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/25 md:flex"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next slide"
        className="absolute top-1/2 right-3 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/25 md:flex"
      >
        ›
      </button>

      {hasCaption && (
        <div
          key={active.id}
          className="absolute right-4 bottom-14 left-4 max-w-[380px] rounded-[14px] border border-white/20 bg-black/35 p-4 backdrop-blur-sm md:right-auto"
          style={{ animation: reducedMotion ? undefined : "feFadeUp .5s cubic-bezier(.16,1,.3,1) both" }}
        >
          {active.heading && <div className="mb-1 text-base font-extrabold text-white">{active.heading}</div>}
          {active.subheading && <div className="mb-2.5 text-[13px] text-white/80">{active.subheading}</div>}
          {active.ctaLabel && active.ctaHref && (
            <Link
              href={active.ctaHref}
              onClick={() => trackEvent("BANNER_CLICK", undefined, active.id).catch(() => {})}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent-500 px-3.5 py-2 text-[13px] font-bold text-white no-underline"
            >
              {active.ctaLabel} →
            </Link>
          )}
        </div>
      )}

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="cursor-pointer border-none p-0 transition-all duration-300"
            style={
              i === index
                ? { width: 20, height: 6, borderRadius: 3, background: "var(--color-highlight-500)" }
                : { width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,.5)" }
            }
          />
        ))}
      </div>
    </div>
  );
}
