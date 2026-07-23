import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/FormField";
import { deleteRecruiter } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminRecruitersPage() {
  const recruiters = await prisma.recruiter.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Recruiters</h1>
        <Link
          href="/admin/placements/recruiters/new"
          className="rounded-lg border-none bg-primary-900 px-4 py-2.5 text-sm font-bold text-white"
        >
          + Add recruiter
        </Link>
      </div>

      <AdminCard>
        <DataTable
          rows={recruiters}
          emptyMessage="No recruiters yet."
          columns={[
            {
              header: "Logo",
              render: (r) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.logoUrl} alt="" className="h-10 w-20 rounded-md object-contain" />
              ),
            },
            { header: "Name", render: (r) => <span className="font-bold text-neutral-900">{r.name}</span> },
            { header: "Active", render: (r) => (r.active ? "Yes" : "No") },
            {
              header: "Actions",
              render: (r) => (
                <div className="flex items-center gap-2.5">
                  <Link href={`/admin/placements/recruiters/${r.id}`} className="text-[13px] font-bold text-primary-600">
                    Edit
                  </Link>
                  <form action={deleteRecruiter.bind(null, r.id)}>
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
