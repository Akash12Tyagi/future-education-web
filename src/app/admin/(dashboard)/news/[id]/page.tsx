import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { NewsEventForm } from "../NewsEventForm";
import { updateNewsEvent } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditNewsEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [item, mediaAssets] = await Promise.all([
    prisma.newsEvent.findUnique({ where: { id } }),
    prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } }),
  ]);

  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Edit news / event</h1>
      <AdminCard>
        <NewsEventForm
          action={updateNewsEvent.bind(null, item.id)}
          mediaAssets={mediaAssets}
          initial={{
            slug: item.slug,
            title: item.title,
            type: item.type,
            body: item.body,
            eventDate: item.eventDate?.toISOString() ?? null,
            imageId: item.imageId,
            featured: item.featured,
            publishAt: item.publishAt.toISOString(),
            active: item.active,
          }}
        />
      </AdminCard>
    </div>
  );
}
