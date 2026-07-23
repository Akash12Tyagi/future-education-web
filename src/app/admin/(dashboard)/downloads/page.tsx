import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/FormField";
import { deleteDownload } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDownloadsPage() {
  const downloads = await prisma.download.findMany({ orderBy: { order: "asc" }, include: { file: true } });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Downloads</h1>
        <Link
          href="/admin/downloads/new"
          className="rounded-lg border-none bg-primary-900 px-4 py-2.5 text-sm font-bold text-white"
        >
          + Add download
        </Link>
      </div>

      <AdminCard>
        <DataTable
          rows={downloads}
          emptyMessage="No downloads yet."
          columns={[
            { header: "Title", render: (d) => <span className="font-bold text-neutral-900">{d.title}</span> },
            { header: "Category", render: (d) => d.category },
            { header: "File", render: (d) => d.file.filename },
            { header: "Active", render: (d) => (d.active ? "Yes" : "No") },
            {
              header: "Actions",
              render: (d) => (
                <div className="flex items-center gap-2.5">
                  <Link href={`/admin/downloads/${d.id}`} className="text-[13px] font-bold text-primary-600">
                    Edit
                  </Link>
                  <form action={deleteDownload.bind(null, d.id)}>
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
