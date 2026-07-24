"use client";

import { useActionState } from "react";
import { subscribeToNewsletter, type NewsletterState } from "@/lib/newsletter-actions";

export function NewsletterSignup() {
  const [state, formAction, pending] = useActionState<NewsletterState, FormData>(subscribeToNewsletter, {});

  if (state.success) {
    return <p className="m-0 text-[13.5px] font-semibold text-success-500">Thanks — you&apos;re subscribed.</p>;
  }

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="min-w-0 flex-1 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-[13.5px] text-neutral-900 placeholder:text-neutral-500 outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="cursor-pointer rounded-lg border-none bg-primary-600 px-4 py-2.5 text-[13px] font-bold text-white disabled:opacity-60"
        >
          {pending ? "…" : "Subscribe"}
        </button>
      </div>
      {state.error && <p className="m-0 text-xs text-accent-500">{state.error}</p>}
    </form>
  );
}
