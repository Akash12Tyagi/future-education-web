import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/FormField";
import { deleteNewsEvent } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const items = await prisma.newsEvent.findMany({ orderBy: { publishAt: "desc" } });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">News &amp; Events</h1>
        <Link
          href="/admin/news/new"
          className="rounded-lg border-none bg-primary-900 px-4 py-2.5 text-sm font-bold text-white"
        >
          + Add news / event
        </Link>
      </div>

      <AdminCard>
        <DataTable
          rows={items}
          emptyMessage="No news or events yet."
          columns={[
            { header: "Title", render: (n) => <span className="font-bold text-neutral-900">{n.title}</span> },
            { header: "Type", render: (n) => n.type },
            { header: "Featured", render: (n) => (n.featured ? "Yes" : "No") },
            { header: "Active", render: (n) => (n.active ? "Yes" : "No") },
            {
              header: "Actions",
              render: (n) => (
                <div className="flex items-center gap-2.5">
                  <Link href={`/admin/news/${n.id}`} className="text-[13px] font-bold text-primary-600">
                    Edit
                  </Link>
                  <form action={deleteNewsEvent.bind(null, n.id)}>
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
