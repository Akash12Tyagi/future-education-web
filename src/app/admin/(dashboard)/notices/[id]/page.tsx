import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { NoticeForm } from "../NoticeForm";
import { updateNotice } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditNoticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [notice, mediaAssets] = await Promise.all([
    prisma.notice.findUnique({ where: { id } }),
    prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } }),
  ]);

  if (!notice) notFound();

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Edit notice</h1>
      <AdminCard>
        <NoticeForm
          action={updateNotice.bind(null, notice.id)}
          mediaAssets={mediaAssets}
          initial={{
            title: notice.title,
            body: notice.body,
            type: notice.type,
            linkHref: notice.linkHref,
            attachmentId: notice.attachmentId,
            pinned: notice.pinned,
            active: notice.active,
            publishAt: notice.publishAt.toISOString(),
            expiresAt: notice.expiresAt?.toISOString() ?? null,
          }}
        />
      </AdminCard>
    </div>
  );
}
