"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

type ToastKind = "success" | "error";
interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
}

const FLASH_COOKIE = "admin_flash";
const DURATION_MS: Record<ToastKind, number> = { success: 3500, error: 8000 };

// Module-level store so any admin client component can raise a toast.
let toasts: Toast[] = [];
let nextId = 1;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function dismiss(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

function push(kind: ToastKind, message: string) {
  const id = nextId++;
  toasts = [...toasts.slice(-3), { id, kind, message }];
  emit();
  setTimeout(() => dismiss(id), DURATION_MS[kind]);
}

export const toast = {
  success: (message: string) => push("success", message),
  error: (message: string) => push("error", message),
};

/** Toasts the outcome of a useActionState result whenever a new one arrives. */
export function useActionToast(state: { error?: string; success?: string } | undefined) {
  useEffect(() => {
    if (state?.error) toast.error(state.error);
    else if (state?.success) toast.success(state.success);
  }, [state]);
}

function readFlash(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${FLASH_COOKIE}=([^;]*)`));
  if (!match) return null;
  document.cookie = `${FLASH_COOKIE}=; path=/admin; max-age=0`;
  try {
    return decodeURIComponent(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const getSnapshot = () => toasts;
const NO_TOASTS: Toast[] = [];
const getServerSnapshot = () => NO_TOASTS;

export function Toaster() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const pathname = usePathname();

  // A save that redirected leaves its success message in a cookie.
  useEffect(() => {
    const flash = readFlash();
    if (flash) toast.success(flash);
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-1000 flex w-[min(380px,calc(100vw-32px))] flex-col gap-2.5">
      {items.map((t) => (
        <div
          key={t.id}
          role={t.kind === "error" ? "alert" : "status"}
          className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 text-[13.5px] font-semibold shadow-lg ${
            t.kind === "error"
              ? "border-accent-500/40 bg-[#FEF2F2] text-[#991B1B]"
              : "border-success-500/30 bg-[#ECFDF3] text-[#166534]"
          }`}
          style={{ animation: "feFadeUp .3s cubic-bezier(.16,1,.3,1) both" }}
        >
          <span aria-hidden className="mt-px">
            {t.kind === "error" ? "⚠" : "✓"}
          </span>
          <span className="flex-1">{t.message}</span>
          <button
            type="button"
            onClick={() => dismiss(t.id)}
            aria-label="Dismiss"
            className="cursor-pointer border-none bg-transparent p-0 text-base leading-none opacity-60 hover:opacity-100"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
