"use client";

import { useRef } from "react";
import Image from "next/image";
import type { BentoItem } from "@/lib/types";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function BentoTile({ item, style }: { item: BentoItem; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const ry = (px * 6).toFixed(2);
    const rx = (py * -6).toFixed(2);
    ref.current.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px) scale(1.01)`;
  };
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative overflow-hidden rounded-[14px]"
      style={{
        flex: item.big ? 2 : 1,
        minWidth: item.big ? 300 : 240,
        aspectRatio: "16/10",
        transition: "transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease",
        ...style,
      }}
    >
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes={item.big ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 40vw"}
        className="object-cover"
      />
      <div
        className="absolute inset-0 flex items-end pointer-events-none"
        style={{
          padding: item.big ? 24 : 20,
          background: item.big
            ? "linear-gradient(0deg, rgba(11,46,29,.92) 0%, rgba(11,46,29,.35) 55%, rgba(11,46,29,0) 100%)"
            : "linear-gradient(0deg, rgba(11,46,29,.92) 0%, rgba(11,46,29,.4) 60%, rgba(11,46,29,0) 100%)",
        }}
      >
        <div>
          <div className="mb-2.5 bg-accent-500" style={{ width: item.big ? 34 : 28, height: 3 }} />
          <div
            className="mb-1.5 font-bold tracking-[.04em] text-[#c7d2fe] uppercase"
            style={{ fontSize: item.big ? 12 : 11.5 }}
          >
            {item.tag}
          </div>
          <div className="mb-1.5 font-extrabold text-white" style={{ fontSize: item.big ? 22 : 18 }}>
            {item.title}
          </div>
          <div className="leading-snug text-[#eaf0ff]" style={{ fontSize: item.big ? 14.5 : 13.5, maxWidth: item.big ? "46ch" : undefined }}>
            {item.body}
          </div>
        </div>
      </div>
    </div>
  );
}
