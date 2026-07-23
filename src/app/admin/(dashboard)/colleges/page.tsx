import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/FormField";
import { deleteCollege } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCollegesPage() {
  const colleges = await prisma.college.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { courses: true } } },
  });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Departments (Colleges)</h1>
        <Link
          href="/admin/colleges/new"
          className="rounded-lg border-none bg-primary-900 px-4 py-2.5 text-sm font-bold text-white"
        >
          + Add college
        </Link>
      </div>

      <AdminCard>
        <DataTable
          rows={colleges}
          emptyMessage="No colleges yet."
          columns={[
            {
              header: "Name",
              render: (c) => (
                <div>
                  <div className="font-bold text-neutral-900">{c.name}</div>
                  <div className="text-xs text-neutral-500">
                    {c.city}, {c.state}
                  </div>
                </div>
              ),
            },
            { header: "Type", render: (c) => c.type },
            { header: "Courses", render: (c) => c._count.courses },
            { header: "Verified", render: (c) => (c.isVerifiedPartner ? "Yes" : "No") },
            { header: "Active", render: (c) => (c.active ? "Yes" : "No") },
            {
              header: "Actions",
              render: (c) => (
                <div className="flex items-center gap-2.5">
                  <Link href={`/admin/colleges/${c.id}`} className="text-[13px] font-bold text-primary-600">
                    Edit
                  </Link>
                  <form action={deleteCollege.bind(null, c.id)}>
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
