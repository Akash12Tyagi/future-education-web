"use client";

import { useActionState } from "react";
import { authenticate } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-3.5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-[13.5px] font-bold text-[#374151]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded-[10px] border-[1.5px] border-[#D1D5DB] px-3.5 py-3 text-base outline-none"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-[13.5px] font-bold text-[#374151]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="rounded-[10px] border-[1.5px] border-[#D1D5DB] px-3.5 py-3 text-base outline-none"
        />
      </div>

      {state?.error ? (
        <p className="m-0 rounded-lg bg-accent-100 px-3.5 py-2.5 text-sm font-semibold text-accent-500">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-1.5 cursor-pointer rounded-lg border-none bg-primary-900 px-4 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
