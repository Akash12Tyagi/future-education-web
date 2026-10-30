"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { useEscapeToClose } from "@/hooks/useEscapeToClose";
import { visitPhotos } from "@/data/visit-photos";
import type { GalleryAlbumWithItems } from "@/lib/site-data";

const CATEGORY_LABELS: Record<string, string> = {
  CAMPUS: "Campus",
  EVENTS: "Events",
  LABS: "Labs",
  SPORTS: "Sports",
  OTHER: "Other",
};

// Shown until albums are published from Admin → Gallery.
const FALLBACK_ALBUMS: GalleryAlbumWithItems[] = [
  { category: "CAMPUS", title: "Campus visits" },
  { category: "EVENTS", title: "Partner meets" },
].map((a) => ({
  id: `fallback-${a.category}`,
  slug: a.category.toLowerCase(),
  title: a.title,
  category: a.category,
  items: visitPhotos
    .filter((p) => p.album === a.title)
    .map((p) => ({ id: p.id, url: p.src, alt: p.alt, caption: p.caption, kind: "IMAGE" })),
}));

export function GalleryClient({ albums: providedAlbums }: { albums: GalleryAlbumWithItems[] }) {
  const albums = providedAlbums.some((a) => a.items.length > 0) ? providedAlbums : FALLBACK_ALBUMS;
  const categories = ["ALL", ...new Set(albums.map((a) => a.category))];
  const [category, setCategory] = useState("ALL");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { ref, revealed } = useReveal<HTMLDivElement>();

  const items = albums
    .filter((a) => category === "ALL" || a.category === category)
    .flatMap((a) => a.items.map((item) => ({ ...item, albumTitle: a.title })));

  const close = useCallback(() => setOpenIdx(null), []);
  const step = useCallback(
    (d: number) => setOpenIdx((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );
  useEscapeToClose(openIdx !== null, close);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIdx, step]);

  const open = openIdx !== null ? items[openIdx] : null;

  return (
    <div className="mx-auto max-w-[1080px] px-[22px] pt-10 pb-[90px]">
      <h1 className="mb-2.5 text-[clamp(28px,3.4vw,40px)] font-extrabold text-primary-900">Gallery</h1>
      <p className="m-0 mb-6.5 max-w-[64ch] text-[17px] text-[#4B5563]">
        Campus visits, partner meets, counselling events and student moments — tap any photo to view it full size.
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
            <button
              key={item.id}
              type="button"
              onClick={() => setOpenIdx(i)}
              className="fe-card-hover cursor-pointer overflow-hidden rounded-xl border border-[#E5E7EB] bg-white p-0 text-left"
              style={revealStyle(revealed, { delay: (i % 8) * 55 })}
            >
              <div className="fe-image-zoom-wrap relative aspect-[4/3] overflow-hidden bg-neutral-100">
                {item.kind === "VIDEO" ? (
                  <video src={item.url} muted playsInline preload="metadata" className="h-full w-full object-cover" />
                ) : (
                  <Image
                    src={item.url}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="fe-image-zoom object-cover"
                  />
                )}
              </div>
              <div className="p-3.5 text-[13.5px] text-[#374151]">{item.caption || item.albumTitle}</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-10 text-center">
          <div className="text-lg font-bold text-neutral-900">No photos in this category yet</div>
        </div>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.caption || open.albumTitle}
          className="fixed inset-0 z-95 flex flex-col bg-black/90"
          onClick={close}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 text-white">
            <span className="text-sm font-semibold">
              {open.caption || open.albumTitle}
              <span className="ml-2 text-white/60">
                {openIdx! + 1} / {items.length}
              </span>
            </span>
            <button onClick={close} aria-label="Close" className="cursor-pointer border-none bg-transparent text-3xl leading-none text-white">
              ×
            </button>
          </div>
          <div className="relative min-h-0 flex-1" onClick={(e) => e.stopPropagation()}>
            {open.kind === "VIDEO" ? (
              <video src={open.url} controls autoPlay className="h-full w-full object-contain" />
            ) : (
              <Image src={open.url} alt={open.alt} fill sizes="100vw" className="object-contain" />
            )}
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/40 text-2xl text-white"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/40 text-2xl text-white"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
