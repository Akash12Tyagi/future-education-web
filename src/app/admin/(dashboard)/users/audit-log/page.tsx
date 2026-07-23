import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";

export const dynamic = "force-dynamic";

export default async function AuditLogPage() {
  const entries = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { user: { select: { name: true, email: true } } },
  });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Audit log</h1>
        <Link href="/admin/users" className="text-[13px] font-bold text-primary-600">
          ← Back to Users &amp; Roles
        </Link>
      </div>

      <AdminCard>
        <DataTable
          rows={entries}
          emptyMessage="No admin actions recorded yet."
          columns={[
            { header: "When", render: (e) => e.createdAt.toLocaleString("en-IN") },
            { header: "User", render: (e) => (e.user ? `${e.user.name} (${e.user.email})` : "—") },
            { header: "Action", render: (e) => <span className="font-bold text-neutral-900">{e.action}</span> },
            { header: "Entity", render: (e) => `${e.entityType}${e.entityId ? ` · ${e.entityId.slice(0, 10)}…` : ""}` },
            { header: "Changes", render: (e) => (e.diff ? JSON.stringify(e.diff) : "—") },
          ]}
        />
      </AdminCard>
    </div>
  );
}
