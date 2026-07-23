import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DownloadForm } from "../DownloadForm";
import { updateDownload } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditDownloadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [download, mediaAssets] = await Promise.all([
    prisma.download.findUnique({ where: { id } }),
    prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, url: true, filename: true } }),
  ]);

  if (!download) notFound();

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Edit download</h1>
      <AdminCard>
        <DownloadForm
          action={updateDownload.bind(null, download.id)}
          mediaAssets={mediaAssets}
          initial={{
            title: download.title,
            category: download.category,
            fileId: download.fileId,
            order: download.order,
            active: download.active,
          }}
        />
      </AdminCard>
    </div>
  );
}
