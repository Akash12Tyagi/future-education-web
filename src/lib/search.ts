import { prisma } from "@/lib/prisma";

export interface SearchResult {
  category: string;
  title: string;
  description: string;
  href: string;
}

// Simple ILIKE-based search across the site's main content types. A true
// Postgres full-text (tsvector) index would rank/stem better, but for this
// catalog's size a straightforward `contains` search is correct and needs no
// extra migration — worth upgrading only if result relevance becomes an issue.
export async function globalSearch(query: string): Promise<SearchResult[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  const [courses, colleges, counsellors, notices, downloads] = await Promise.all([
    prisma.course.findMany({
      where: { active: true, OR: [{ name: { contains: q, mode: "insensitive" } }, { eligibility: { contains: q, mode: "insensitive" } }] },
      take: 8,
    }),
    prisma.college.findMany({
      where: { active: true, OR: [{ name: { contains: q, mode: "insensitive" } }, { city: { contains: q, mode: "insensitive" } }, { state: { contains: q, mode: "insensitive" } }] },
      take: 8,
    }),
    prisma.counsellor.findMany({
      where: { active: true, OR: [{ name: { contains: q, mode: "insensitive" } }, { specialization: { contains: q, mode: "insensitive" } }] },
      take: 8,
    }),
    prisma.notice.findMany({
      where: { active: true, OR: [{ title: { contains: q, mode: "insensitive" } }, { body: { contains: q, mode: "insensitive" } }] },
      take: 8,
    }),
    prisma.download.findMany({
      where: { active: true, title: { contains: q, mode: "insensitive" } },
      take: 8,
    }),
  ]);

  return [
    ...courses.map((c) => ({ category: "Courses", title: c.name, description: c.eligibility, href: `/find-your-course` })),
    ...colleges.map((c) => ({ category: "Colleges", title: c.name, description: `${c.city}, ${c.state}`, href: `/colleges/${c.slug}` })),
    ...counsellors.map((c) => ({ category: "Faculty", title: c.name, description: c.specialization, href: `/about/counsellors/${c.slug}` })),
    ...notices.map((n) => ({ category: "Notices", title: n.title, description: n.body ?? "", href: n.linkHref ?? "/" })),
    ...downloads.map((d) => ({ category: "Downloads", title: d.title, description: d.category, href: "/downloads" })),
  ];
}
