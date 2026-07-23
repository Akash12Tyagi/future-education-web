import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { NoticeForm } from "../NoticeForm";
import { createNotice } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewNoticePage() {
  const mediaAssets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, url: true, filename: true },
  });

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Add notice</h1>
      <AdminCard>
        <NoticeForm action={createNotice} mediaAssets={mediaAssets} />
      </AdminCard>
    </div>
  );
}
