import type { PublicNotice } from "@/lib/site-data";

// Scrolling notice strip pinned to the very top of every public page. A notice
// with an uploaded PDF/JPG opens the file; otherwise it follows its link.
export function NoticeTicker({ notices }: { notices: PublicNotice[] }) {
  const ticker = notices.filter((n) => n.type === "TICKER");
  if (ticker.length === 0) return null;

  return (
    <div className="flex items-stretch overflow-hidden border-b border-white/10 bg-primary-900">
      <span className="relative z-10 flex flex-none items-center bg-highlight-500 px-3 text-[11px] font-extrabold tracking-[.06em] text-primary-900 uppercase">
        Notice
      </span>
      <div className="min-w-0 flex-1 overflow-hidden py-2">
        <div className="fe-marquee-track flex w-max gap-10 pl-6">
          {[...ticker, ...ticker].map((n, i) => {
            const href = n.attachmentUrl ?? n.linkHref ?? undefined;
            const external = !!n.attachmentUrl;
            return (
              <span
                key={`${n.id}-${i}`}
                aria-hidden={i >= ticker.length}
                className="flex items-center gap-2 text-[13px] font-semibold whitespace-nowrap text-white/90"
              >
                <span aria-hidden className="text-highlight-500">◆</span>
                {href ? (
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    tabIndex={i >= ticker.length ? -1 : undefined}
                    className="text-white/90 no-underline hover:underline"
                  >
                    {n.title}
                  </a>
                ) : (
                  n.title
                )}
                {n.attachmentUrl && (
                  <span className="rounded-sm bg-white/15 px-1.5 py-0.5 text-[10px] font-extrabold text-white uppercase">
                    {n.attachmentIsImage ? "JPG" : "PDF"}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
