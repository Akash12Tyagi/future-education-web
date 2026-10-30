import type { PublicNewsEvent, PublicNotice } from "@/lib/site-data";

export interface NotificationItem {
  id: string;
  title: string;
  day: string;
  month: string;
  href: string | null;
  external: boolean;
  tags: string[];
}

const NEW_FOR_MS = 7 * 24 * 60 * 60 * 1000;

function dateParts(iso: string) {
  const d = new Date(iso);
  const opts = { timeZone: "Asia/Kolkata" } as const;
  return {
    day: d.toLocaleDateString("en-IN", { ...opts, day: "2-digit" }),
    month: d.toLocaleDateString("en-IN", { ...opts, month: "short" }),
  };
}

// Built on the server so dates and "New" tags don't differ between the
// server render and the browser.
export function buildNotifications(notices: PublicNotice[], news: PublicNewsEvent[]) {
  const now = Date.now();
  const isNew = (iso: string) => now - new Date(iso).getTime() < NEW_FOR_MS;

  return {
    notices: notices.map<NotificationItem>((n) => {
      const tags: string[] = [];
      if (isNew(n.publishAt)) tags.push("New");
      if (n.pinned) tags.push("Important");
      if (n.attachmentUrl) tags.push(n.attachmentIsImage ? "JPG" : "PDF");
      return {
        id: n.id,
        title: n.title,
        ...dateParts(n.publishAt),
        href: n.attachmentUrl ?? n.linkHref,
        external: !!n.attachmentUrl,
        tags,
      };
    }),
    news: news.slice(0, 8).map<NotificationItem>((n) => {
      const tags: string[] = [];
      if (isNew(n.publishAt)) tags.push("New");
      tags.push(n.type === "EVENT" ? "Event" : "News");
      return {
        id: n.id,
        title: n.title,
        ...dateParts(n.eventDate ?? n.publishAt),
        href: "/news-events",
        external: false,
        tags,
      };
    }),
  };
}
