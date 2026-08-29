"use client";

import { useAppState } from "@/context/app-state";
import { AboutTabs } from "@/components/about/AboutTabs";
import { LeadershipCarousel, type LeadershipPerson } from "@/components/about/LeadershipCarousel";

export function AboutCounsellorsClient() {
  const { counsellors } = useAppState();

  const people: LeadershipPerson[] = counsellors.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    image: m.image,
    imageAlt: m.imageAlt,
    bioParagraphs: [m.specialization, m.credentials].filter(Boolean),
    contacts: [
      { label: "View full profile", href: `/about/counsellors/${m.slug}` },
      { label: "Book a consultation", href: "/contact" },
    ],
  }));

  return (
    <div className="mx-auto max-w-[1080px] px-[22px] pt-10 pb-[90px]">
      <AboutTabs />
      <LeadershipCarousel
        eyebrow="Meet the team"
        title="Our Counsellors"
        subtitle="Named counsellors with real credentials — not an anonymous call centre."
        people={people}
      />
    </div>
  );
}
