import type { PublicNotice } from "@/lib/site-data";

export function AnnouncementBanner({ notices }: { notices: PublicNotice[] }) {
  const banner = notices.find((n) => n.type === "BANNER");
  if (!banner) return null;

  const content = (
    <>
      <strong>{banner.title}</strong>
      {banner.body ? <span className="text-white/85"> — {banner.body}</span> : null}
    </>
  );

  return (
    <div className="bg-accent-500 px-4 py-2 text-center text-[13.5px] text-white">
      {banner.linkHref ? (
        <a href={banner.linkHref} className="text-white no-underline hover:underline">
          {content}
        </a>
      ) : (
        content
      )}
      {banner.attachmentUrl && (
        <a href={banner.attachmentUrl} target="_blank" rel="noreferrer" className="ml-2 font-bold text-white underline">
          View PDF
        </a>
      )}
    </div>
  );
}
