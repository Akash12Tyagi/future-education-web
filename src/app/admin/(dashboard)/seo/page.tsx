import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/FormField";
import { deleteSeoOverride } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSeoPage() {
  const overrides = await prisma.seoMeta.findMany({ orderBy: { path: "asc" } });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">SEO</h1>
          <p className="m-0 mt-1 text-[13.5px] text-neutral-500">
            Per-path title/description overrides. Pages without an override use their built-in defaults.
          </p>
        </div>
        <Link
          href="/admin/seo/new"
          className="rounded-lg border-none bg-primary-900 px-4 py-2.5 text-sm font-bold text-white"
        >
          + Add override
        </Link>
      </div>

      <AdminCard>
        <DataTable
          rows={overrides}
          emptyMessage="No overrides yet — every page is using its default title/description."
          columns={[
            { header: "Path", render: (o) => <span className="font-bold text-neutral-900">{o.path}</span> },
            { header: "Title", render: (o) => o.title ?? "—" },
            {
              header: "Actions",
              render: (o) => (
                <div className="flex items-center gap-2.5">
                  <Link href={`/admin/seo/${o.id}`} className="text-[13px] font-bold text-primary-600">
                    Edit
                  </Link>
                  <form action={deleteSeoOverride.bind(null, o.id, o.path)}>
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
