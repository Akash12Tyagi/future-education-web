import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/FormField";
import { deleteNotice } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminNoticesPage() {
  const notices = await prisma.notice.findMany({ orderBy: [{ pinned: "desc" }, { publishAt: "desc" }] });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Notices</h1>
        <Link
          href="/admin/notices/new"
          className="rounded-lg border-none bg-primary-900 px-4 py-2.5 text-sm font-bold text-white"
        >
          + Add notice
        </Link>
      </div>

      <AdminCard>
        <DataTable
          rows={notices}
          emptyMessage="No notices yet."
          columns={[
            {
              header: "Title",
              render: (n) => (
                <span className="font-bold text-neutral-900">
                  {n.pinned ? "📌 " : ""}
                  {n.title}
                </span>
              ),
            },
            { header: "Type", render: (n) => n.type },
            { header: "Expires", render: (n) => (n.expiresAt ? n.expiresAt.toLocaleDateString() : "—") },
            { header: "Active", render: (n) => (n.active ? "Yes" : "No") },
            {
              header: "Actions",
              render: (n) => (
                <div className="flex items-center gap-2.5">
                  <Link href={`/admin/notices/${n.id}`} className="text-[13px] font-bold text-primary-600">
                    Edit
                  </Link>
                  <form action={deleteNotice.bind(null, n.id)}>
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
