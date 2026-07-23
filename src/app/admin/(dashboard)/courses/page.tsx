import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/FormField";
import { deleteCourse } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { order: "asc" },
    include: { stream: true, _count: { select: { colleges: true } } },
  });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Courses</h1>
        <Link
          href="/admin/courses/new"
          className="rounded-lg border-none bg-primary-900 px-4 py-2.5 text-sm font-bold text-white"
        >
          + Add course
        </Link>
      </div>

      <AdminCard>
        <DataTable
          rows={courses}
          emptyMessage="No courses yet."
          columns={[
            { header: "Name", render: (c) => <span className="font-bold text-neutral-900">{c.name}</span> },
            { header: "Stream", render: (c) => c.stream.label },
            { header: "Type", render: (c) => c.type },
            { header: "Colleges", render: (c) => c._count.colleges },
            { header: "Active", render: (c) => (c.active ? "Yes" : "No") },
            {
              header: "Actions",
              render: (c) => (
                <div className="flex items-center gap-2.5">
                  <Link href={`/admin/courses/${c.id}`} className="text-[13px] font-bold text-primary-600">
                    Edit
                  </Link>
                  <form action={deleteCourse.bind(null, c.id)}>
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
