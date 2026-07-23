import { AdminCard } from "@/components/admin/AdminCard";
import { DataTable } from "@/components/admin/DataTable";
import { getAnalyticsSummary } from "@/lib/analytics-data";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const { pageViewCount, enquiryCount, bannerClickCount, pageRows, bannerClickRows } = await getAnalyticsSummary();

  return (
    <div>
      <h1 className="mb-5 text-[clamp(22px,2.6vw,28px)] font-extrabold text-primary-900">Analytics</h1>
      <p className="mb-5 text-[13.5px] text-neutral-500">Last 30 days. Visitor-level metrics also available in Vercel Analytics.</p>

      <div className="mb-6 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <AdminCard>
          <div className="mb-1.5 text-[13px] font-bold text-neutral-500">PAGE VIEWS</div>
          <div className="text-2xl font-extrabold text-primary-900">{pageViewCount}</div>
        </AdminCard>
        <AdminCard>
          <div className="mb-1.5 text-[13px] font-bold text-neutral-500">ENQUIRIES</div>
          <div className="text-2xl font-extrabold text-primary-900">{enquiryCount}</div>
        </AdminCard>
        <AdminCard>
          <div className="mb-1.5 text-[13px] font-bold text-neutral-500">BANNER CLICKS</div>
          <div className="text-2xl font-extrabold text-primary-900">{bannerClickCount}</div>
        </AdminCard>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-lg font-extrabold text-primary-900">Popular pages</h2>
        <AdminCard>
          <DataTable
            rows={pageRows}
            emptyMessage="No page views recorded yet."
            columns={[
              { header: "Path", render: (r) => <span className="font-bold text-neutral-900">{r.path}</span> },
              { header: "Views", render: (r) => r.count },
            ]}
          />
        </AdminCard>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-extrabold text-primary-900">Banner clicks</h2>
        <AdminCard>
          <DataTable
            rows={bannerClickRows}
            emptyMessage="No banner clicks recorded yet."
            columns={[
              { header: "Banner", render: (r) => <span className="font-bold text-neutral-900">{r.heading}</span> },
              { header: "Clicks", render: (r) => r.count },
            ]}
          />
        </AdminCard>
      </div>
    </div>
  );
}
