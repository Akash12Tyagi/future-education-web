import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// CMS content changes without a redeploy, so refresh the sitemap hourly
// rather than freezing it at build time.
export const revalidate = 3600;

const staticRoutes = [
  "/",
  "/about",
  "/about/director-message",
  "/about/counsellors",
  "/about/media",
  "/admission-consultancy",
  "/admission-consultancy/scholarships",
  "/colleges",
  "/colleges/compare",
  "/contact",
  "/downloads",
  "/find-your-course",
  "/find-your-course/matcher",
  "/gallery",
  "/news-events",
  "/placements",
  "/success-stories",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [colleges, stories, counsellors] = await Promise.all([
    prisma.college.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
    prisma.story.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
    prisma.counsellor.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const collegeEntries: MetadataRoute.Sitemap = colleges.map((c) => ({
    url: `${siteUrl}/colleges/${c.slug}`,
    lastModified: c.updatedAt,
  }));

  const storyEntries: MetadataRoute.Sitemap = stories.map((s) => ({
    url: `${siteUrl}/success-stories/${s.slug}`,
    lastModified: s.updatedAt,
  }));

  const counsellorEntries: MetadataRoute.Sitemap = counsellors.map((c) => ({
    url: `${siteUrl}/about/counsellors/${c.slug}`,
    lastModified: c.updatedAt,
  }));

  return [...staticEntries, ...collegeEntries, ...storyEntries, ...counsellorEntries];
}
