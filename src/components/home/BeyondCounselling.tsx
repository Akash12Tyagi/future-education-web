import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/home/SectionHeading";

const pillars = [
  {
    title: "We visit the campuses ourselves",
    description: "Our counsellors travel to partner universities in India and abroad, so the advice you get is first-hand.",
    image: "/images/new/andijan-medical-building.jpeg",
  },
  {
    title: "Official university partnerships",
    description: "Certified partnerships with universities mean verified seats and direct admission support.",
    image: "/images/new/partner-meet-handshake.jpeg",
  },
  {
    title: "Medical programmes abroad",
    description: "MBBS and MD/MS options at recognised medical institutes, with fees and eligibility explained upfront.",
    image: "/images/new/ferghana-medical.jpeg",
  },
  {
    title: "Partner meets & delegations",
    description: "Regular meets with university delegates keep our college information current, year after year.",
    image: "/images/new/partner-meet-group.jpeg",
  },
];

export function BeyondCounselling() {
  return (
    <section className="bg-primary-900 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            dark
            title="Where guidance meets the ground"
            sub="Beyond the phone call"
            intro="Campus visits, partner meets and real university relationships — so every recommendation is one we can stand behind."
          />
          <Link href="/gallery" className="text-base font-semibold text-highlight-500 no-underline">
            View gallery ›
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`group relative h-80 overflow-hidden rounded-2xl bg-[#00341a] md:h-96 ${i === 0 || i === 3 ? "md:col-span-2" : ""}`}
            >
              <Image
                src={p.image}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 66vw"
                className="object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/55 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-8">
                <h3 className="m-0 text-xl font-bold text-highlight-500">{p.title}</h3>
                <p className="m-0 mt-3 text-[15px] leading-relaxed text-white/85">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
