import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/FormField";
import { defaultBannerSlides, getHiddenDefaultBannerIds } from "@/lib/site-data";
import { deleteBanner, toggleBannerActive, toggleDefaultBanner } from "./actions";
import { ActionForm } from "@/components/admin/ActionForm";

export const dynamic = "force-dynamic";

function VisibilityToggle({ visible, action }: { visible: boolean; action: () => Promise<unknown> }) {
  return (
    <ActionForm action={action as () => Promise<void>} success={visible ? "Hidden from the homepage" : "Now visible on the homepage"}>
      <button
        type="submit"
        role="switch"
        aria-checked={visible}
        title={visible ? "Shown on the homepage — click to hide" : "Hidden — click to show on the homepage"}
        className="inline-flex cursor-pointer items-center gap-2 border-none bg-transparent p-0 text-[13px] font-bold"
      >
        <span
          className={`relative h-5 w-9 rounded-full transition-colors ${visible ? "bg-primary-600" : "bg-[#D1D5DB]"}`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${visible ? "left-[18px]" : "left-0.5"}`}
          />
        </span>
        <span className={visible ? "text-primary-900" : "text-neutral-500"}>{visible ? "Visible" : "Hidden"}</span>
      </button>
    </ActionForm>
  );
}

export default async function AdminBannersPage() {
  const [banners, hiddenIds] = await Promise.all([
    prisma.banner.findMany({ orderBy: { order: "asc" }, include: { image: true } }),
    getHiddenDefaultBannerIds(),
  ]);
  const hidden = new Set(hiddenIds);

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

      <h2 className="mb-3 text-base font-extrabold text-primary-900">Added banners</h2>
      <AdminCard>
        <DataTable
          rows={banners}
          emptyMessage="No banners added yet. Use “+ Add banner” to create one."
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
            {
              header: "Visible",
              render: (b) => <VisibilityToggle visible={b.active} action={toggleBannerActive.bind(null, b.id)} />,
            },
            {
              header: "Actions",
              render: (b) => (
                <div className="flex items-center gap-2.5">
                  <Link href={`/admin/banners/${b.id}`} className="text-[13px] font-bold text-primary-600">
                    Edit
                  </Link>
                  <ActionForm
                    action={deleteBanner.bind(null, b.id)}
                    confirm="Delete this banner? This can't be undone."
                    success="Banner deleted"
                  >
                    <DeleteButton />
                  </ActionForm>
                </div>
              ),
            },
          ]}
        />
      </AdminCard>

      <h2 className="mt-8 mb-1 text-base font-extrabold text-primary-900">Built-in slides</h2>
      <p className="mt-0 mb-3 text-[13px] text-neutral-500">
        The site’s original visit photos. They can be hidden but not deleted. Added banners show first on the
        homepage, followed by the visible built-in slides.
      </p>
      <AdminCard>
        <DataTable
          rows={defaultBannerSlides}
          columns={[
            {
              header: "Preview",
              render: (s) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.image} alt="" className="h-12 w-20 rounded-md object-cover" />
              ),
            },
            { header: "Caption", render: (s) => <span className="font-bold text-neutral-900">{s.heading}</span> },
            {
              header: "Visible",
              render: (s) => (
                <VisibilityToggle visible={!hidden.has(s.id)} action={toggleDefaultBanner.bind(null, s.id)} />
              ),
            },
          ]}
        />
      </AdminCard>
    </div>
  );
}
