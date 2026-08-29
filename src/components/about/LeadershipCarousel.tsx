"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface LeadershipContact {
  label: string;
  href: string;
}

export interface LeadershipPerson {
  id: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  bioParagraphs: string[];
  contacts?: LeadershipContact[];
}

export function LeadershipCarousel({
  eyebrow,
  title,
  subtitle,
  people,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  people: LeadershipPerson[];
}) {
  const [idx, setIdx] = useState(0);

  if (people.length === 0) return null;

  const active = people[Math.min(idx, people.length - 1)];
  const hasMultiple = people.length > 1;
  const prev = () => setIdx((i) => (i - 1 + people.length) % people.length);
  const next = () => setIdx((i) => (i + 1) % people.length);

  return (
    <div className="rounded-3xl p-[clamp(20px,3vw,36px)]" style={{ background: "#000" }}>
      <div className="mb-1.5 text-[12.5px] font-bold tracking-[.08em] uppercase" style={{ color: "rgba(255,255,255,.6)" }}>
        {eyebrow}
      </div>
      <h1 className="m-0 mb-2 text-[clamp(26px,3.2vw,38px)] font-extrabold text-white">{title}</h1>
      {subtitle && (
        <p className="mb-7 max-w-[62ch] text-[15px]" style={{ color: "rgba(255,255,255,.5)" }}>
          {subtitle}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(255,255,255,.15)" }}>
        <div className="flex flex-col md:flex-row">
          <div className="relative h-72 w-full flex-none md:h-auto md:w-[320px]">
            <Image
              src={active.image}
              alt={active.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col p-7 md:p-9" style={{ background: "#000" }}>
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="m-0 text-[clamp(22px,2.6vw,30px)] font-extrabold text-white">{active.name}</h2>
                <div className="mt-1 text-[15px] font-semibold" style={{ color: "#ffb020" }}>{active.role}</div>
              </div>
              {hasMultiple && (
                <div className="flex flex-none items-center gap-2">
                  <button
                    onClick={prev}
                    aria-label="Previous"
                    className="h-9 w-9 cursor-pointer rounded-lg text-[15px] text-white"
                    style={{ border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.05)" }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next"
                    className="h-9 w-9 cursor-pointer rounded-lg text-[15px] text-white"
                    style={{ border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.05)" }}
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3.5 text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,.7)" }}>
              {active.bioParagraphs.filter(Boolean).map((p, i) => (
                <p key={i} className="m-0">
                  {p}
                </p>
              ))}
            </div>
            {active.contacts && active.contacts.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {active.contacts.map((c) => (
                  <Link
                    key={c.label + c.href}
                    href={c.href}
                    className="rounded-[10px] px-4.5 py-2.5 text-[13.5px] font-bold text-white no-underline"
                    style={{ border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.1)" }}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {hasMultiple && (
        <div
          className="mt-4 grid gap-3.5"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))" }}
        >
          {people.map((p, i) => {
            const isActive = i === idx;
            return (
              <button
                key={p.id}
                onClick={() => setIdx(i)}
                className="cursor-pointer overflow-hidden rounded-lg p-0 text-left"
                style={{ border: "1px solid rgba(255,255,255,.15)" }}
              >
                <div className="relative aspect-4/5 w-full">
                  <Image src={p.image} alt={p.imageAlt} fill sizes="190px" className="object-cover" />
                </div>
                <div className="p-3.5" style={{ background: isActive ? "#6151fb" : "#000" }}>
                  <div className="text-[14.5px] font-bold text-white">{p.name}</div>
                  <div className="mt-0.5 text-[12.5px]" style={{ color: "rgba(255,255,255,.7)" }}>
                    {p.role}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
