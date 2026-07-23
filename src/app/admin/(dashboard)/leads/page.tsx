import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { StatusSelect } from "./StatusSelect";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Leads &amp; Enquiries</h1>
        <a
          href="/admin/leads/export"
          className="rounded-lg border-[1.5px] border-[#D1D5DB] bg-white px-4 py-2.5 text-sm font-bold text-neutral-500"
        >
          Export to Excel (CSV)
        </a>
      </div>

      <AdminCard>
        <DataTable
          rows={leads}
          emptyMessage="No enquiries yet. Submissions from any lead form on the public site will appear here in real time."
          columns={[
            {
              header: "Name / phone",
              render: (l) => (
                <div>
                  <div className="font-bold text-neutral-900">{l.name}</div>
                  <div className="text-xs text-neutral-500">+91 {l.phone}</div>
                </div>
              ),
            },
            { header: "Course interest", render: (l) => l.courseInterest ?? "—" },
            { header: "Source", render: (l) => l.sourceTag ?? "—" },
            { header: "Received", render: (l) => l.createdAt.toLocaleString("en-IN") },
            { header: "Status", render: (l) => <StatusSelect leadId={l.id} status={l.status} /> },
          ]}
        />
      </AdminCard>
    </div>
  );
}
