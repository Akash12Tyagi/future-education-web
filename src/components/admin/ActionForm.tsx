"use client";

import { useTransition } from "react";
import { toast } from "@/components/admin/Toaster";

type AdminActionResult = { error?: string; success?: string } | void | undefined;

/**
 * Form for one-click admin actions (delete, show/hide, status changes): asks
 * for confirmation if `confirm` is set, then toasts the outcome.
 */
export function ActionForm({
  action,
  success,
  confirm,
  className,
  submitOnChange,
  children,
}: {
  action: (formData: FormData) => Promise<AdminActionResult>;
  success?: string;
  confirm?: string;
  className?: string;
  /** Submit as soon as a field inside changes (e.g. a status <select>). */
  submitOnChange?: boolean;
  children: React.ReactNode;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      className={className}
      aria-busy={pending}
      onChange={submitOnChange ? (e) => e.currentTarget.requestSubmit() : undefined}
      onSubmit={(e) => {
        e.preventDefault();
        if (pending || (confirm && !window.confirm(confirm))) return;
        const formData = new FormData(e.currentTarget);
        startTransition(async () => {
          try {
            const result = await action(formData);
            if (result?.error) toast.error(result.error);
            else if (success ?? result?.success) toast.success((success ?? result?.success) as string);
          } catch {
            toast.error("Couldn't reach the server — check your connection and try again.");
          }
        });
      }}
    >
      <fieldset disabled={pending} className="m-0 contents border-none p-0">
        {children}
      </fieldset>
    </form>
  );
}
