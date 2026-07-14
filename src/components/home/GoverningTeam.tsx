"use client";

import { counsellors } from "@/data/counsellors";
import { useReveal, revealStyle } from "@/hooks/useReveal";
import { ImageSlot } from "@/components/ui/ImageSlot";

export function GoverningTeam() {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const team = counsellors.slice(0, 4);

  return (
    <section className="mx-auto max-w-[1220px] px-[22px] py-14">
      <h2 className="mb-1.5 text-[clamp(22px,2.6vw,30px)] font-extrabold text-primary-900">The people guiding you</h2>
      <p className="mb-6.5 text-neutral-500">Named counsellors with real credentials — not an anonymous call centre.</p>
      <div ref={ref} className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {team.map((m, i) => (
          <div
            key={m.id}
            className="fe-card-hover rounded-[14px] border border-[#E5E7EB] bg-white p-5"
            style={revealStyle(revealed, { delay: i * 70 })}
          >
            <div className="mb-3.5 aspect-square w-full overflow-hidden rounded-xl">
              <ImageSlot placeholder="Team photo" radius={12} />
            </div>
            <div className="font-bold text-neutral-900">{m.name}</div>
            <div className="my-0.5 text-[13px] font-semibold text-accent-500">{m.role}</div>
            <div className="text-[13px] leading-relaxed text-neutral-500">{m.credentials}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
