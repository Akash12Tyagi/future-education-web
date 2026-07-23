import { prisma } from "@/lib/prisma";

export async function getAnalyticsSummary() {
  const since30d = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [pageViewCount, enquiryCount, bannerClickCount, topPages, topBannerClicks, banners] = await Promise.all([
    prisma.analyticsEvent.count({ where: { type: "PAGE_VIEW", createdAt: { gte: since30d } } }),
    prisma.analyticsEvent.count({ where: { type: "ENQUIRY", createdAt: { gte: since30d } } }),
    prisma.analyticsEvent.count({ where: { type: "BANNER_CLICK", createdAt: { gte: since30d } } }),
    prisma.analyticsEvent.groupBy({
      by: ["path"],
      where: { type: "PAGE_VIEW", createdAt: { gte: since30d }, path: { not: null } },
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 10,
    }),
    prisma.analyticsEvent.groupBy({
      by: ["entityId"],
      where: { type: "BANNER_CLICK", createdAt: { gte: since30d }, entityId: { not: null } },
      _count: { entityId: true },
      orderBy: { _count: { entityId: "desc" } },
      take: 10,
    }),
    prisma.banner.findMany({ select: { id: true, heading: true } }),
  ]);

  const bannerHeadingById = new Map(banners.map((b) => [b.id, b.heading]));
  const bannerClickRows = topBannerClicks.map((row) => ({
    id: row.entityId ?? "unknown",
    heading: bannerHeadingById.get(row.entityId ?? "") ?? "(default hero image)",
    count: row._count.entityId,
  }));

  const pageRows = topPages.map((row) => ({ id: row.path ?? "unknown", path: row.path ?? "(unknown)", count: row._count.path }));

  return { pageViewCount, enquiryCount, bannerClickCount, pageRows, bannerClickRows };
}
