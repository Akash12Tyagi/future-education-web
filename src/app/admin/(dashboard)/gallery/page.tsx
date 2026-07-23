import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/FormField";
import { deleteAlbum } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const albums = await prisma.galleryAlbum.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { items: true } } },
  });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Gallery</h1>
        <Link
          href="/admin/gallery/new"
          className="rounded-lg border-none bg-primary-900 px-4 py-2.5 text-sm font-bold text-white"
        >
          + Add album
        </Link>
      </div>

      <AdminCard>
        <DataTable
          rows={albums}
          emptyMessage="No albums yet."
          columns={[
            { header: "Title", render: (a) => <span className="font-bold text-neutral-900">{a.title}</span> },
            { header: "Category", render: (a) => a.category },
            { header: "Photos/videos", render: (a) => a._count.items },
            { header: "Active", render: (a) => (a.active ? "Yes" : "No") },
            {
              header: "Actions",
              render: (a) => (
                <div className="flex items-center gap-2.5">
                  <Link href={`/admin/gallery/${a.id}`} className="text-[13px] font-bold text-primary-600">
                    Manage
                  </Link>
                  <form action={deleteAlbum.bind(null, a.id)}>
                    <DeleteButton />
                  </form>
                </div>
              ),
            },
          ]}
        />
      </AdminCard>
    </div>
  );
}
