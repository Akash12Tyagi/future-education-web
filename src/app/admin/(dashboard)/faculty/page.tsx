import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/FormField";
import { deleteCounsellor } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminFacultyPage() {
  const counsellors = await prisma.counsellor.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Faculty (Counsellors)</h1>
        <Link
          href="/admin/faculty/new"
          className="rounded-lg border-none bg-primary-900 px-4 py-2.5 text-sm font-bold text-white"
        >
          + Add faculty
        </Link>
      </div>

      <AdminCard>
        <DataTable
          rows={counsellors}
          emptyMessage="No faculty yet."
          columns={[
            { header: "Name", render: (c) => <span className="font-bold text-neutral-900">{c.name}</span> },
            { header: "Role", render: (c) => c.role },
            { header: "Active", render: (c) => (c.active ? "Yes" : "No") },
            {
              header: "Actions",
              render: (c) => (
                <div className="flex items-center gap-2.5">
                  <Link href={`/admin/faculty/${c.id}`} className="text-[13px] font-bold text-primary-600">
                    Edit
                  </Link>
                  <form action={deleteCounsellor.bind(null, c.id)}>
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
