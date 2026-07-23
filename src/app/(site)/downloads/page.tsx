import { getDownloads } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata({
    path: "/downloads",
    title: "Downloads",
    description: "Download the prospectus, academic calendar, application forms, and other important documents.",
  });
}

const CATEGORY_LABELS: Record<string, string> = {
  PROSPECTUS: "Prospectus",
  ACADEMIC_CALENDAR: "Academic Calendar",
  FORM: "Forms",
  OTHER: "Other Documents",
};

export default async function DownloadsPage() {
  const downloads = await getDownloads();
  const categories = ["PROSPECTUS", "ACADEMIC_CALENDAR", "FORM", "OTHER"] as const;

  return (
    <div className="mx-auto max-w-[820px] px-[22px] pt-10 pb-[90px]">
      <h1 className="mb-2.5 text-[clamp(28px,3.4vw,40px)] font-extrabold text-primary-900">Downloads</h1>
      <p className="m-0 mb-8 max-w-[64ch] text-[17px] text-[#4B5563]">
        Prospectus, academic calendar, application forms and other documents.
      </p>

      {downloads.length === 0 ? (
        <div className="rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-10 text-center">
          <div className="text-lg font-bold text-neutral-900">No documents published yet</div>
        </div>
      ) : (
        categories.map((cat) => {
          const items = downloads.filter((d) => d.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} className="mb-8">
              <h2 className="mb-3.5 text-lg font-extrabold text-primary-900">{CATEGORY_LABELS[cat]}</h2>
              <div className="flex flex-col gap-2.5">
                {items.map((d) => (
                  <a
                    key={d.id}
                    href={d.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-[11px] border border-[#E5E7EB] bg-white p-4 no-underline"
                  >
                    <span className="font-semibold text-neutral-900">{d.title}</span>
                    <span className="text-[13px] font-bold whitespace-nowrap text-primary-600">Download ↓</span>
                  </a>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
