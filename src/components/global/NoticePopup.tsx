"use client";

import { useCallback, useEffect, useState } from "react";
import type { PublicNotice } from "@/lib/site-data";
import { useEscapeToClose } from "@/hooks/useEscapeToClose";

const DISMISSED_KEY = "fe_notice_popup_dismissed";

export function NoticePopup({ notices }: { notices: PublicNotice[] }) {
  const popup = notices.find((n) => n.type === "POPUP") ?? null;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!popup) return;
    try {
      const dismissedId = sessionStorage.getItem(DISMISSED_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (dismissedId !== popup.id) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, [popup]);

  const close = useCallback(() => {
    try {
      if (popup) sessionStorage.setItem(DISMISSED_KEY, popup.id);
    } catch {}
    setOpen(false);
  }, [popup]);

  useEscapeToClose(open, close);

  if (!popup || !open) return null;

  return (
    <div
      className="fixed inset-0 z-95 flex items-center justify-center bg-[rgba(15,23,31,.55)] p-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="notice-popup-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[440px] rounded-[18px] bg-white p-6.5"
        style={{ animation: "fe-fade .25s ease" }}
      >
        <div className="mb-2.5 flex items-start justify-between gap-3">
          <span id="notice-popup-title" className="text-lg font-extrabold text-primary-900">
            {popup.title}
          </span>
          <button onClick={close} aria-label="Close notice" className="border-none bg-none text-[26px] leading-none text-neutral-500">
            ×
          </button>
        </div>
        {popup.body && <p className="m-0 mb-4.5 text-sm leading-relaxed text-neutral-500">{popup.body}</p>}
        <div className="flex flex-wrap gap-2.5">
          {popup.linkHref && (
            <a
              href={popup.linkHref}
              className="rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-bold text-white no-underline"
            >
              Learn more
            </a>
          )}
          {popup.attachmentUrl && (
            <a
              href={popup.attachmentUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border-[1.5px] border-primary-600 px-4 py-2.5 text-sm font-bold text-primary-600 no-underline"
            >
              View PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
