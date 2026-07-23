import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { BannerForm } from "../BannerForm";
import { updateBanner } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditBannerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [banner, mediaAssets] = await Promise.all([
    prisma.banner.findUnique({ where: { id } }),
    prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } }),
  ]);

  if (!banner) notFound();

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Edit banner</h1>
      <AdminCard>
        <BannerForm
          action={updateBanner.bind(null, banner.id)}
          mediaAssets={mediaAssets}
          initial={{
            heading: banner.heading,
            subheading: banner.subheading,
            ctaLabel: banner.ctaLabel,
            ctaHref: banner.ctaHref,
            imageId: banner.imageId,
            order: banner.order,
            active: banner.active,
            startsAt: banner.startsAt?.toISOString() ?? null,
            endsAt: banner.endsAt?.toISOString() ?? null,
          }}
        />
      </AdminCard>
    </div>
  );
}
