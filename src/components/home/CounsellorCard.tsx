import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";

export interface CounsellorCardProps {
  image: string;
  imageAlt: string;
  name: string;
  role: string;
  credentials: string;
  specialization: string;
  countries?: string[];
  ctaHref?: string;
  ctaLabel?: string;
  style?: CSSProperties;
}

export function CounsellorCard({
  image,
  imageAlt,
  name,
  role,
  credentials,
  specialization,
  countries = [],
  ctaHref = "/contact",
  ctaLabel = "Book Consultation",
  style,
}: CounsellorCardProps) {
  return (
    <article
      className="group fe-card-hover flex h-full w-full max-w-[440px] flex-col overflow-hidden rounded-[20px] bg-gradient-to-b from-white to-[rgba(97,81,251,0.04)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1"
      style={{
        ...style,
        border: "1px solid rgba(80,70,180,0.1)",
        boxShadow: "0 8px 24px rgba(80,70,180,0.08)",
      }}
    >
      <div className="relative h-65 w-full flex-none overflow-hidden sm:h-70 lg:h-75">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 440px"
          className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col px-6 pb-5">
        <div className="mb-2.5 flex flex-wrap items-center gap-2 pt-5">
          <h3 className="m-0 text-xl font-extrabold text-neutral-900">{name}</h3>
          <span className="rounded-md bg-primary-100 px-2.5 py-1 text-[12px] font-bold text-primary-900">{role}</span>
        </div>
        <div className="mb-4 text-[13.5px] leading-relaxed text-neutral-500">{credentials}</div>
        <p className="mb-3.5 text-[15px] leading-relaxed text-[#374151]">{specialization}</p>
        {countries.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {countries.map((c) => (
              <span
                key={c}
                className="rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
                style={{
                  color: "#6151fb",
                  background: "rgba(97,81,251,0.06)",
                  border: "1px solid rgba(97,81,251,0.18)",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex justify-start border-t border-[rgba(80,70,180,0.08)] pt-4.5">
          <Link
            href={ctaHref}
            className="group/cta inline-flex items-center gap-2 rounded-[10px] bg-accent-500 px-5 py-3 text-[14.5px] font-bold text-white no-underline transition-colors duration-200 hover:bg-[#4f3fe0]"
          >
            <span>{ctaLabel}</span>
            <span aria-hidden className="transition-transform duration-200 group-hover/cta:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
