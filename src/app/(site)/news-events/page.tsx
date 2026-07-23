import Image from "next/image";
import { getNewsEvents } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return buildMetadata({
    path: "/news-events",
    title: "News & Events",
    description: "Latest news, upcoming events, and announcements from Future Education Trust.",
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function NewsEventsPage() {
  const items = await getNewsEvents();
  const featured = items.filter((i) => i.featured);
  const news = items.filter((i) => i.type === "NEWS");
  const events = items.filter((i) => i.type === "EVENT");

  return (
    <div className="mx-auto max-w-[1080px] px-[22px] pt-10 pb-[90px]">
      <h1 className="mb-2.5 text-[clamp(28px,3.4vw,40px)] font-extrabold text-primary-900">News &amp; Events</h1>
      <p className="m-0 mb-8 max-w-[64ch] text-[17px] text-[#4B5563]">
        Latest updates, upcoming events, and announcements from Future Education Trust.
      </p>

      {featured.length > 0 && (
        <div className="mb-10 grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {featured.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
              {item.image && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 1080px) 100vw, 500px" className="object-cover" />
                </div>
              )}
              <div className="p-5">
                <span className="mb-2 inline-block rounded-md bg-highlight-500 px-2 py-1 text-[11px] font-extrabold text-primary-900 uppercase">
                  Featured · {item.type}
                </span>
                <div className="mb-1.5 text-lg font-bold text-neutral-900">{item.title}</div>
                {item.eventDate && <div className="mb-2 text-[13px] text-accent-500">{formatDate(item.eventDate)}</div>}
                <p className="m-0 text-[14.5px] leading-relaxed text-[#4B5563]">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-9" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        <div>
          <h2 className="mb-4 text-xl font-extrabold text-primary-900">Latest news</h2>
          <div className="flex flex-col gap-3.5">
            {news.length === 0 && <p className="text-sm text-neutral-500">No news yet.</p>}
            {news.map((item) => (
              <div key={item.id} className="rounded-[14px] border border-[#E5E7EB] bg-white p-4.5">
                <div className="mb-1 text-[13px] text-neutral-500">{formatDate(item.publishAt)}</div>
                <div className="mb-1.5 font-bold text-neutral-900">{item.title}</div>
                <p className="m-0 text-[13.5px] leading-relaxed text-[#4B5563]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-extrabold text-primary-900">Upcoming events</h2>
          <div className="flex flex-col gap-3.5">
            {events.length === 0 && <p className="text-sm text-neutral-500">No events scheduled.</p>}
            {events.map((item) => (
              <div key={item.id} className="rounded-[14px] border border-[#E5E7EB] bg-white p-4.5">
                {item.eventDate && <div className="mb-1 text-[13px] font-bold text-accent-500">{formatDate(item.eventDate)}</div>}
                <div className="mb-1.5 font-bold text-neutral-900">{item.title}</div>
                <p className="m-0 text-[13.5px] leading-relaxed text-[#4B5563]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
