import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/home/SectionHeading";

const cards = [
  {
    eyebrow: "Not sure yet?",
    title: "Find the right course",
    href: "/find-your-course",
    image: "/images/new/andijan-medical-gate.jpeg",
  },
  {
    eyebrow: "Already applied?",
    title: "Track your application",
    href: "/tracker",
    image: "/images/new/partner-meet-certificates.jpeg",
  },
  {
    eyebrow: "Still thinking?",
    title: "Know about us",
    href: "/about",
    image: "/images/new/partner-meet-group.jpeg",
  },
];

export function StartHere() {
  return (
    <section className="bg-white py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Career starts here"
          title="Make the right decision, backed by real guidance"
          sub="Find what matters to you"
          intro="Honest, transparent admission counselling for Medical, Engineering, Nursing, Management and more — every option, every fee, explained."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="group relative block h-64 overflow-hidden rounded-[15px]">
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="rounded-full border border-white/40 px-2.5 py-0.5 text-xs font-medium text-white/90">
                  {card.eyebrow}
                </span>
                <h3 className="m-0 mt-3 text-2xl leading-tight font-semibold text-white">{card.title}</h3>
                <span className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-highlight-500 transition-all group-hover:gap-3">
                  Explore <span aria-hidden>›</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
