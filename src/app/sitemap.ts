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

type SlugRow = { slug: string; updatedAt: Date };

// The sitemap is prerendered during `next build`, where the database may be
// unreachable. Fall back to static routes so the build succeeds; the hourly
// revalidation fills in CMS entries once the deployed app can reach the DB.
async function fetchDynamicRows(): Promise<[SlugRow[], SlugRow[], SlugRow[]]> {
  try {
    return await Promise.all([
      prisma.college.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
      prisma.story.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
      prisma.counsellor.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
    ]);
  } catch (error) {
    console.error("sitemap: failed to load CMS entries, serving static routes only", error);
    return [[], [], []];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [colleges, stories, counsellors] = await fetchDynamicRows();

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
