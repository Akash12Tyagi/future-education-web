import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/FormField";
import { UserRoleSelect } from "./UserRoleSelect";
import { deleteUser } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await auth();
  const isSuperAdmin = session?.user.role === "SUPER_ADMIN";
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Users &amp; Roles</h1>
          {!isSuperAdmin && (
            <p className="m-0 mt-1 text-[13px] text-accent-500">Only Super Admins can add users or change roles.</p>
          )}
        </div>
        <div className="flex gap-2.5">
          <Link
            href="/admin/users/audit-log"
            className="rounded-lg border-[1.5px] border-[#D1D5DB] bg-white px-4 py-2.5 text-sm font-bold text-neutral-500"
          >
            Audit log
          </Link>
          {isSuperAdmin && (
            <Link
              href="/admin/users/new"
              className="rounded-lg border-none bg-primary-900 px-4 py-2.5 text-sm font-bold text-white"
            >
              + Add user
            </Link>
          )}
        </div>
      </div>

      <AdminCard>
        <DataTable
          rows={users}
          emptyMessage="No users yet."
          columns={[
            {
              header: "Name / email",
              render: (u) => (
                <div>
                  <div className="font-bold text-neutral-900">{u.name}</div>
                  <div className="text-xs text-neutral-500">{u.email}</div>
                </div>
              ),
            },
            { header: "Role", render: (u) => <UserRoleSelect userId={u.id} role={u.role} disabled={!isSuperAdmin} /> },
            { header: "Joined", render: (u) => u.createdAt.toLocaleDateString("en-IN") },
            {
              header: "Actions",
              render: (u) =>
                isSuperAdmin && u.id !== session?.user.id ? (
                  <form action={deleteUser.bind(null, u.id)}>
                    <DeleteButton />
                  </form>
                ) : (
                  <span className="text-xs text-neutral-500">—</span>
                ),
            },
          ]}
        />
      </AdminCard>
    </div>
  );
}
