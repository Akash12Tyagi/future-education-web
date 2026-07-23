import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/FormField";
import { deleteStory } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPlacementsPage() {
  const stories = await prisma.story.findMany({
    orderBy: { order: "asc" },
    include: { course: true, college: true },
  });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Placements (Success Stories)</h1>
        <div className="flex gap-2.5">
          <Link
            href="/admin/placements/recruiters"
            className="rounded-lg border-[1.5px] border-[#D1D5DB] bg-white px-4 py-2.5 text-sm font-bold text-neutral-500"
          >
            Manage recruiters
          </Link>
          <Link
            href="/admin/placements/new"
            className="rounded-lg border-none bg-primary-900 px-4 py-2.5 text-sm font-bold text-white"
          >
            + Add story
          </Link>
        </div>
      </div>

      <AdminCard>
        <DataTable
          rows={stories}
          emptyMessage="No stories yet."
          columns={[
            { header: "Name", render: (s) => <span className="font-bold text-neutral-900">{s.name}</span> },
            { header: "Course", render: (s) => s.course?.name ?? "—" },
            { header: "College", render: (s) => s.college?.name ?? "—" },
            { header: "Year", render: (s) => s.year },
            { header: "Verified", render: (s) => (s.verified ? "Yes" : "No") },
            {
              header: "Actions",
              render: (s) => (
                <div className="flex items-center gap-2.5">
                  <Link href={`/admin/placements/${s.id}`} className="text-[13px] font-bold text-primary-600">
                    Edit
                  </Link>
                  <form action={deleteStory.bind(null, s.id)}>
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
