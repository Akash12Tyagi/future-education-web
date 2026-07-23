"use client";

import Image from "next/image";
import { useState } from "react";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import type { GalleryAlbumWithItems } from "@/lib/site-data";

const CATEGORY_LABELS: Record<string, string> = {
  CAMPUS: "Campus",
  EVENTS: "Events",
  LABS: "Labs",
  SPORTS: "Sports",
  OTHER: "Other",
};

export function GalleryClient({ albums }: { albums: GalleryAlbumWithItems[] }) {
  const categories = ["ALL", ...new Set(albums.map((a) => a.category))];
  const [category, setCategory] = useState("ALL");
  const { ref, revealed } = useReveal<HTMLDivElement>();

  const items = albums
    .filter((a) => category === "ALL" || a.category === category)
    .flatMap((a) => a.items.map((item) => ({ ...item, albumTitle: a.title })));

  return (
    <div className="mx-auto max-w-[1080px] px-[22px] pt-10 pb-[90px]">
      <h1 className="mb-2.5 text-[clamp(28px,3.4vw,40px)] font-extrabold text-primary-900">Gallery</h1>
      <p className="m-0 mb-6.5 max-w-[64ch] text-[17px] text-[#4B5563]">
        Campus tours, counselling events, and student moments — organised by category.
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`cursor-pointer rounded-full border-[1.5px] px-3.5 py-2 text-[13.5px] font-semibold ${
              category === c ? "border-primary-600 bg-primary-100 text-primary-900" : "border-[#D1D5DB] bg-white text-[#4B5563]"
            }`}
          >
            {c === "ALL" ? "All" : (CATEGORY_LABELS[c] ?? c)}
          </button>
        ))}
      </div>

      {items.length > 0 ? (
        <div ref={ref} className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
          {items.map((item, i) => (
            <div
              key={item.id}
              className="fe-card-hover overflow-hidden rounded-xl border border-[#E5E7EB] bg-white"
              style={revealStyle(revealed, { delay: (i % 8) * 55 })}
            >
              <div className="fe-image-zoom-wrap relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.url}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="fe-image-zoom object-cover"
                />
              </div>
              <div className="p-3.5 text-[13.5px] text-[#374151]">{item.caption || item.albumTitle}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-10 text-center">
          <div className="text-lg font-bold text-neutral-900">No photos in this category yet</div>
        </div>
      )}
    </div>
  );
}
