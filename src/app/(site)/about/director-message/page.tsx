import { AboutTabs } from "@/components/about/AboutTabs";
import { LeadershipCarousel, type LeadershipPerson } from "@/components/about/LeadershipCarousel";
import { getCounsellors } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata({
    path: "/about/director-message",
    title: "Director's Message",
    description: "A message from the directors of Future Education Trust on honest, personalised admission counselling.",
  });
}

const DIRECTOR_BIOS: Record<string, string[]> = {
  "Anil Kumar Singh": [
    "Every member of our team has substantial, practical experience in their field, and between us, that experience is as broad as it is deep. We make certain that every student we work with receives a personal, tailored service — we don't take on more assignments than our counsellors can give proper attention to, and we don't believe in a one-size-fits-all approach.",
  ],
  "Karim Ansari": [
    "Future Education is not just an institute pointing you toward a prospective career — it's a place to nurture your talents and help you reach your potential. We assist students applying both in India and abroad, across the UK, USA, Canada, Australia, Ireland and New Zealand, and we support you at every step, from your first visit to our office until you reach your destination.",
  ],
};

export default async function DirectorMessagePage() {
  const counsellors = await getCounsellors();
  const directors = counsellors.filter((c) => c.role.toLowerCase().includes("director"));
  const source = directors.length > 0 ? directors : counsellors.slice(0, 1);

  const people: LeadershipPerson[] = source.map((d) => ({
    id: d.id,
    name: d.name,
    role: `${d.role}, Future Education Trust`,
    image: d.image,
    imageAlt: d.imageAlt,
    bioParagraphs: DIRECTOR_BIOS[d.name] ?? [d.specialization, d.credentials].filter(Boolean),
    contacts: [{ label: "Talk to a counsellor", href: "/contact" }],
  }));

  return (
    <div className="mx-auto max-w-[1080px] px-[22px] pt-10 pb-[90px]">
      <AboutTabs />
      <LeadershipCarousel
        eyebrow="Leadership"
        title="A Message from Our Directors"
        subtitle="Honest, personalised admission counselling — from the people who lead it."
        people={people}
      />
    </div>
  );
}
