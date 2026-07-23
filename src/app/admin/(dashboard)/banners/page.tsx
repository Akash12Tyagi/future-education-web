import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/FormField";
import { deleteBanner } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({ orderBy: { order: "asc" }, include: { image: true } });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Banners</h1>
        <Link
          href="/admin/banners/new"
          className="rounded-lg border-none bg-primary-900 px-4 py-2.5 text-sm font-bold text-white"
        >
          + Add banner
        </Link>
      </div>

      <AdminCard>
        <DataTable
          rows={banners}
          emptyMessage="No banners yet — the homepage hero falls back to its default images."
          columns={[
            {
              header: "Preview",
              render: (b) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={b.image.url} alt="" className="h-12 w-20 rounded-md object-cover" />
              ),
            },
            { header: "Heading", render: (b) => <span className="font-bold text-neutral-900">{b.heading}</span> },
            { header: "CTA", render: (b) => b.ctaLabel ?? "—" },
            { header: "Active", render: (b) => (b.active ? "Yes" : "No") },
            {
              header: "Actions",
              render: (b) => (
                <div className="flex items-center gap-2.5">
                  <Link href={`/admin/banners/${b.id}`} className="text-[13px] font-bold text-primary-600">
                    Edit
                  </Link>
                  <form action={deleteBanner.bind(null, b.id)}>
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
