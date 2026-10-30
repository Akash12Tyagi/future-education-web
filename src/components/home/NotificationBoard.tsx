"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionHeading } from "@/components/home/SectionHeading";
import type { NotificationItem } from "@/lib/notifications";

const TABS = [
  { key: "notices", label: "Notices" },
  { key: "news", label: "News & Events" },
] as const;

const TAG_STYLES: Record<string, string> = {
  New: "border-highlight-500 bg-highlight-500 text-black",
  Important: "border-accent-500 bg-accent-500 text-white",
};

export function NotificationBoard({ notices, news }: { notices: NotificationItem[]; news: NotificationItem[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("notices");
  const items = tab === "notices" ? notices : news;

  return (
    <section id="notifications" className="bg-white py-14 md:py-18">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[1fr_1.4fr] md:px-6">
        <div>
          <SectionHeading
            eyebrow="Stay updated"
            title="Notifications"
            intro="Admission notices, counselling dates and announcements — open any notice to view its PDF or image."
          />
          <Link
            href="/news-events"
            className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-primary-900 no-underline hover:gap-3"
          >
            View all news &amp; events <span aria-hidden>›</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB]">
          <div role="tablist" className="flex gap-1 border-b border-[#E5E7EB] p-2">
            {TABS.map((t) => {
              const count = (t.key === "notices" ? notices : news).length;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border-none px-4 py-2 text-sm font-semibold ${
                    tab === t.key ? "bg-primary-900 text-white" : "bg-transparent text-neutral-500 hover:text-primary-900"
                  }`}
                >
                  {t.label}
                  {count > 0 && (
                    <span
                      className={`rounded-full px-1.5 text-[11px] ${tab === t.key ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"}`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {items.length > 0 ? (
            <ul role="tabpanel" className="m-0 max-h-[420px] list-none overflow-y-auto p-0">
              {items.map((item) => (
                <li key={item.id} className="border-b border-[#F1F2F4] last:border-b-0">
                  <Row item={item} />
                </li>
              ))}
            </ul>
          ) : (
            <p role="tabpanel" className="m-0 px-6 py-12 text-center text-sm text-neutral-500">
              {tab === "notices" ? "No notices right now — check back soon." : "No news or events yet."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function Row({ item }: { item: NotificationItem }) {
  const content = (
    <>
      <div className="flex w-12 flex-none flex-col items-center rounded-lg bg-primary-100 py-1.5 leading-none">
        <span className="text-lg font-bold text-primary-900">{item.day}</span>
        <span className="mt-1 text-[11px] font-medium text-neutral-500 uppercase">{item.month}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[15px] leading-snug font-medium text-neutral-900">{item.title}</div>
        {item.tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-2 py-px text-[11px] font-semibold ${
                  TAG_STYLES[tag] ?? "border-[#E5E7EB] bg-white text-neutral-500"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {item.href && (
        <span aria-hidden className="flex-none text-xl text-neutral-500">
          ›
        </span>
      )}
    </>
  );
  const className = "flex items-center gap-4 px-5 py-4 text-left no-underline";

  if (!item.href) return <div className={className}>{content}</div>;
  if (item.external)
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={`${className} hover:bg-neutral-100`}>
        {content}
      </a>
    );
  return (
    <Link href={item.href} className={`${className} hover:bg-neutral-100`}>
      {content}
    </Link>
  );
}
