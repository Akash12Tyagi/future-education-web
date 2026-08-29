"use client";

import { useReveal, revealStyle } from "@/hooks/useReveal";

export interface StickyFeatureCard {
  title: string;
  description: string;
  /** CSS color value. Falls back to cycling through the theme's default palette. */
  color?: string;
}

export interface StickyFeatureListProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  paragraph?: string;
  cards: StickyFeatureCard[];
  className?: string;
}

// Pulled from the theme tokens in globals.css (--color-*) — all pass WCAG AA
// contrast (>=4.5:1) for white text, unlike highlight-500 which is reserved
// for dark-text-on-light use elsewhere in the app.
const DEFAULT_CARD_COLORS = [
  "var(--color-primary-900)",
  "var(--color-accent-500)",
  "var(--color-success-500)",
  "var(--color-primary-600)",
];

/**
 * Two-column "sticky feature list" section: a pinned intro column on the
 * left and a scrolling stack of color-block cards on the right (desktop
 * only — stacks normally below `lg`). Purely CSS-driven via `sticky`, no
 * scroll listeners: the left column stays pinned for the height of the grid
 * row it shares with the card stack, then scrolls away once the stack ends.
 */
export function StickyFeatureList({ eyebrow, heading, subheading, paragraph, cards, className = "" }: StickyFeatureListProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <section className={`mx-auto max-w-[1220px] px-[22px] py-14 ${className}`}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
        <div className="lg:sticky lg:top-[90px] lg:self-start">
          {eyebrow && (
            <div className="mb-2.5 text-[12.5px] font-bold tracking-[.08em] text-accent-500 uppercase">{eyebrow}</div>
          )}
          <h2 className="mb-2.5 text-[clamp(24px,3vw,34px)] font-extrabold text-primary-900">{heading}</h2>
          {subheading && <div className="mb-3.5 text-lg font-semibold text-neutral-900">{subheading}</div>}
          {paragraph && <p className="m-0 max-w-[46ch] text-[15px] leading-relaxed text-neutral-500">{paragraph}</p>}
        </div>

        <div ref={ref} className="flex flex-col gap-5">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="flex min-h-50 flex-col justify-center rounded-xl px-8 py-7"
              style={{
                background: card.color ?? DEFAULT_CARD_COLORS[i % DEFAULT_CARD_COLORS.length],
                ...revealStyle(revealed, { delay: i * 80 }),
              }}
            >
              <h3 className="m-0 mb-2 text-xl font-extrabold text-white">{card.title}</h3>
              <p className="m-0 text-[14.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.88)" }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
