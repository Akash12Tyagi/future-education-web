import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/FormField";
import { deleteScholarship } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminScholarshipsPage() {
  const scholarships = await prisma.scholarship.findMany({ orderBy: { order: "asc" }, include: { stream: true } });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Scholarships &amp; Loans</h1>
        <Link
          href="/admin/admissions/scholarships/new"
          className="rounded-lg border-none bg-primary-900 px-4 py-2.5 text-sm font-bold text-white"
        >
          + Add scheme
        </Link>
      </div>

      <AdminCard>
        <DataTable
          rows={scholarships}
          emptyMessage="No scholarships yet."
          columns={[
            { header: "Name", render: (s) => <span className="font-bold text-neutral-900">{s.name}</span> },
            { header: "Income bracket", render: (s) => s.income },
            { header: "Stream", render: (s) => s.stream?.label ?? "All" },
            { header: "Active", render: (s) => (s.active ? "Yes" : "No") },
            {
              header: "Actions",
              render: (s) => (
                <div className="flex items-center gap-2.5">
                  <Link href={`/admin/admissions/scholarships/${s.id}`} className="text-[13px] font-bold text-primary-600">
                    Edit
                  </Link>
                  <form action={deleteScholarship.bind(null, s.id)}>
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
