"use client";

import Image from "next/image";
import { bentoHighlights } from "@/data/bento";
import { mediaData } from "@/data/media";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { AboutTabs } from "@/components/about/AboutTabs";
import { BentoTile } from "@/components/about/BentoTile";

export default function AboutMediaPage() {
  const { ref: galleryRef, revealed: galleryRevealed } = useReveal<HTMLDivElement>();

  return (
    <div className="mx-auto max-w-[1080px] px-[22px] pt-10 pb-[90px]">
      <AboutTabs />
      <h1 className="mb-2 text-[clamp(28px,3.4vw,40px)] font-extrabold text-primary-900">Media &amp; recognition</h1>
      <p className="m-0 mb-7.5 max-w-[60ch] text-base text-[#4B5563]">
        Our gallery documents real events — counselling drives, campus seminars and student initiatives — organised
        into the categories below. A Media Gallery and Video Gallery are also maintained on the same page.
      </p>

      <div className="mb-11">
        <h2 className="mb-1 text-xl font-extrabold text-primary-900">Beyond the consultation</h2>
        <p className="m-0 mb-4.5 max-w-[60ch] text-[14.5px] text-neutral-500">
          Guidance doesn&apos;t stop at a phone call — these are the programmes where students and schools meet us
          in person.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            <BentoTile item={bentoHighlights[0]} />
            <BentoTile item={bentoHighlights[1]} />
          </div>
          <div className="flex flex-wrap gap-4">
            <BentoTile item={bentoHighlights[2]} />
            <BentoTile item={bentoHighlights[3]} />
          </div>
        </div>
      </div>

      <h2 className="mb-4 text-lg font-extrabold text-primary-900">Full gallery</h2>
      <div ref={galleryRef} className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {mediaData.map((g, i) => (
          <div
            key={g.kind}
            className="fe-card-hover overflow-hidden rounded-xl border border-[#E5E7EB] bg-white"
            style={revealStyle(galleryRevealed, { delay: (i % 6) * 60 })}
          >
            <div className="fe-image-zoom-wrap relative aspect-[4/3] overflow-hidden">
              <Image
                src={g.image}
                alt={g.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="fe-image-zoom object-cover"
              />
            </div>
            <div className="p-3.5 text-[13.5px] text-[#374151]">{g.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
