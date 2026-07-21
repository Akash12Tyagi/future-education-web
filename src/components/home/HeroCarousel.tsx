"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const slides = [
  { src: "/images/campus/hero1.png", alt: "Modern multi-storey university campus building with landscaped lawns" },
  { src: "/images/campus/image.png", alt: "Deemed university campus with a grand academic building" },
  { src: "/images/campus/image copy.png", alt: "Hillside technical institute campus surrounded by greenery" },
  { src: "/images/campus/image copy 2.png", alt: "Management institute building entrance with manicured gardens" },
  { src: "/images/campus/campus-11.jpg", alt: "Institute of engineering and technology campus front view" },
];

const AUTOPLAY_MS = 4500;

export function HeroCarousel() {
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
  }, [paused, reducedMotion]);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-primary-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true"
    >
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className="object-cover transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === index ? 1 : 0, pointerEvents: "none" }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(8,20,14,.90) 0%, rgba(10,28,19,.68) 45%, rgba(12,34,23,.52) 100%)",
        }}
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

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
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
