"use client";

import { useActionState } from "react";
import { subscribeToNewsletter, type NewsletterState } from "@/lib/newsletter-actions";

export function NewsletterSignup() {
  const [state, formAction, pending] = useActionState<NewsletterState, FormData>(subscribeToNewsletter, {});

  if (state.success) {
    return <p className="m-0 text-[13.5px] font-semibold text-highlight-500">Thanks — you&apos;re subscribed.</p>;
  }

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <label className="text-[13px] font-bold tracking-wide text-white/80 uppercase">Stay updated</label>
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-[13.5px] text-white placeholder:text-white/50 outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="cursor-pointer rounded-lg border-none bg-highlight-500 px-3.5 py-2 text-[13px] font-bold text-primary-900 disabled:opacity-60"
        >
          {pending ? "…" : "Subscribe"}
        </button>
      </div>
      {state.error && <p className="m-0 text-xs text-accent-100">{state.error}</p>}
    </form>
  );
}
