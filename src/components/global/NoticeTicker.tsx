import type { PublicNotice } from "@/lib/site-data";

export function NoticeTicker({ notices }: { notices: PublicNotice[] }) {
  const ticker = notices.filter((n) => n.type === "TICKER");
  if (ticker.length === 0) return null;

  const items = ticker.map((n) => (n.linkHref ? { ...n, href: n.linkHref } : { ...n, href: undefined }));

  return (
    <div className="overflow-hidden border-b border-white/10 bg-primary-900 py-2">
      <div className="fe-marquee-track flex w-max gap-10">
        {[...items, ...items].map((n, i) => (
          <span key={`${n.id}-${i}`} className="flex items-center gap-2 text-[13px] font-semibold whitespace-nowrap text-white/90">
            <span className="rounded-sm bg-highlight-500 px-1.5 py-0.5 text-[10px] font-extrabold text-primary-900 uppercase">
              Notice
            </span>
            {n.href ? (
              <a href={n.href} className="text-white/90 no-underline hover:underline">
                {n.title}
              </a>
            ) : (
              n.title
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
