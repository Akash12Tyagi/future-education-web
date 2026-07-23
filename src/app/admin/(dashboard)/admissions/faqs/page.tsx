import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/FormField";
import { deleteFaq } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  const faqs = await prisma.faq.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">FAQs</h1>
        <Link
          href="/admin/admissions/faqs/new"
          className="rounded-lg border-none bg-primary-900 px-4 py-2.5 text-sm font-bold text-white"
        >
          + Add FAQ
        </Link>
      </div>

      <AdminCard>
        <DataTable
          rows={faqs}
          emptyMessage="No FAQs yet."
          columns={[
            { header: "Question", render: (f) => <span className="font-bold text-neutral-900">{f.question}</span> },
            { header: "Category", render: (f) => f.category },
            { header: "Active", render: (f) => (f.active ? "Yes" : "No") },
            {
              header: "Actions",
              render: (f) => (
                <div className="flex items-center gap-2.5">
                  <Link href={`/admin/admissions/faqs/${f.id}`} className="text-[13px] font-bold text-primary-600">
                    Edit
                  </Link>
                  <form action={deleteFaq.bind(null, f.id)}>
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
