import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminCard } from "@/components/admin/AdminCard";

export const dynamic = "force-dynamic";

export default async function AdminAdmissionsPage() {
  const [scholarshipCount, faqCount] = await Promise.all([prisma.scholarship.count(), prisma.faq.count()]);

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Admissions</h1>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <Link href="/admin/admissions/scholarships" className="no-underline">
          <AdminCard>
            <div className="mb-1.5 text-[13px] font-bold text-neutral-500">SCHOLARSHIPS &amp; LOANS</div>
            <div className="text-2xl font-extrabold text-primary-900">{scholarshipCount}</div>
            <div className="mt-2 text-[13px] text-primary-600">Manage schemes →</div>
          </AdminCard>
        </Link>
        <Link href="/admin/admissions/faqs" className="no-underline">
          <AdminCard>
            <div className="mb-1.5 text-[13px] font-bold text-neutral-500">FAQS</div>
            <div className="text-2xl font-extrabold text-primary-900">{faqCount}</div>
            <div className="mt-2 text-[13px] text-primary-600">Manage FAQs →</div>
          </AdminCard>
        </Link>
      </div>
    </div>
  );
}
