"use client";

import { useEffect } from "react";
import { toast } from "@/components/admin/Toaster";

// Last-resort boundary for admin pages: anything that still throws (e.g. the
// database is unreachable) lands here instead of a blank error screen.
export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
    toast.error("Something went wrong loading this page. Try again, or contact support if it keeps happening.");
  }, [error]);

  return (
    <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-8 text-center">
      <div className="mb-2 text-lg font-extrabold text-primary-900">This page couldn’t load</div>
      <p className="mx-auto mb-5 max-w-[52ch] text-sm text-neutral-500">
        It’s usually a temporary connection problem with the database. Your data is safe.
        {error.digest ? ` (Reference: ${error.digest})` : ""}
      </p>
      <button
        type="button"
        onClick={reset}
        className="cursor-pointer rounded-lg border-none bg-primary-900 px-4 py-2.5 text-sm font-bold text-white"
      >
        Try again
      </button>
    </div>
  );
}
