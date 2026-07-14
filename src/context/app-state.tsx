"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Lang } from "@/data/dict";
import type { Lead, LeadPayload } from "@/lib/types";

const COMPARE_KEY = "fe_compare";
const STICKY_DISMISSED_KEY = "fe_sticky_dismissed";
const LEADS_KEY = "fe_leads";
const DEMO_STAGE_KEY = "fe_demo_stage";
const MAX_COMPARE = 4;

export type AuthPhase = "phone" | "otp" | "in";

interface AuthState {
  phase: AuthPhase;
  phone: string;
  otp: string;
  error: string;
}

interface AppStateValue {
  compare: string[];
  addCompare: (id: string) => void;
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  compareMsg: string;

  leads: Lead[];
  recordLead: (payload: LeadPayload) => void;

  lang: Lang;
  toggleLang: () => void;

  scrolled: boolean;

  stickyDismissed: boolean;
  dismissSticky: () => void;

  sheetOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;

  // Application Tracker demo auth (in-memory only, matches the prototype's
  // "demo: enter any 4 digits" OTP — no real backend behind this).
  auth: AuthState;
  setAuthPhone: (v: string) => void;
  setAuthOtp: (v: string) => void;
  requestOtp: () => void;
  verifyOtp: () => void;
  logout: () => void;

  // Shared demo "student" tracker stage — also driven from the internal console.
  demoStage: number;
  advanceStage: () => void;
  resetStage: () => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

function readCompareFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COMPARE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function readStickyDismissedFromStorage(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(STICKY_DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

function readLeadsFromStorage(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(LEADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function readDemoStageFromStorage(): number {
  if (typeof window === "undefined") return 2;
  try {
    const raw = sessionStorage.getItem(DEMO_STAGE_KEY);
    return raw ? Number(raw) : 2;
  } catch {
    return 2;
  }
}

const MAX_STAGE = 4;

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  // These start SSR-safe (empty/false) and sync for real just after mount, in the
  // effect below. Seeding them from storage via a lazy useState initializer instead
  // would make the client's very first render diverge from the server-rendered HTML
  // whenever a returning visitor already has persisted data — a real hydration-mismatch
  // bug, not just a lint nitpick — so this one-time post-mount sync is intentional.
  const [compare, setCompare] = useState<string[]>([]);
  const [compareMsg, setCompareMsg] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [lang, setLang] = useState<Lang>("en");
  const [scrolled, setScrolled] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [auth, setAuth] = useState<AuthState>({ phase: "phone", phone: "", otp: "", error: "" });
  const [demoStage, setDemoStage] = useState(2);

  useEffect(() => {
    // Post-mount sync from storage (see comment above) — intentionally not a lazy
    // useState initializer, to keep the client's first render hydration-safe.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompare(readCompareFromStorage());
    setStickyDismissed(readStickyDismissedFromStorage());
    setLeads(readLeadsFromStorage());
    setDemoStage(readDemoStageFromStorage());

    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      setScrolled(pct > 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const persistCompare = (next: string[]) => {
    try {
      localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
    } catch {}
  };

  const addCompare = useCallback((id: string) => {
    setCompare((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter((x) => x !== id);
        persistCompare(next);
        setCompareMsg("");
        return next;
      }
      if (prev.length >= MAX_COMPARE) {
        setCompareMsg("You can compare up to 4 colleges. Remove one first.");
        return prev;
      }
      const next = [...prev, id];
      persistCompare(next);
      setCompareMsg("");
      return next;
    });
  }, []);

  const removeCompare = useCallback((id: string) => {
    setCompare((prev) => {
      const next = prev.filter((x) => x !== id);
      persistCompare(next);
      return next;
    });
    setCompareMsg("");
  }, []);

  const clearCompare = useCallback(() => {
    setCompare([]);
    persistCompare([]);
    setCompareMsg("");
  }, []);

  const recordLead = useCallback((payload: LeadPayload) => {
    setLeads((prev) => {
      const next = [
        { ...payload, id: "L" + (prev.length + 1), at: new Date().toLocaleString("en-IN"), status: "new" as const },
        ...prev,
      ];
      try {
        sessionStorage.setItem(LEADS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const toggleLang = useCallback(() => setLang((l) => (l === "en" ? "hi" : "en")), []);

  const dismissSticky = useCallback(() => {
    try {
      sessionStorage.setItem(STICKY_DISMISSED_KEY, "1");
    } catch {}
    setStickyDismissed(true);
  }, []);

  const openSheet = useCallback(() => setSheetOpen(true), []);
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  const setAuthPhone = useCallback((v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 10);
    setAuth((a) => ({ ...a, phone: digits, error: "" }));
  }, []);
  const setAuthOtp = useCallback((v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    setAuth((a) => ({ ...a, otp: digits, error: "" }));
  }, []);
  const requestOtp = useCallback(() => {
    setAuth((a) => {
      if (!/^[6-9]\d{9}$/.test(a.phone)) return { ...a, error: "Enter a valid 10-digit mobile number." };
      return { ...a, phase: "otp", error: "" };
    });
  }, []);
  const verifyOtp = useCallback(() => {
    setAuth((a) => {
      if (a.otp.length !== 4) return { ...a, error: "Enter the 4-digit code (demo: any 4 digits)." };
      return { ...a, phase: "in", error: "" };
    });
  }, []);
  const logout = useCallback(() => setAuth({ phase: "phone", phone: "", otp: "", error: "" }), []);

  const persistDemoStage = (next: number) => {
    try {
      sessionStorage.setItem(DEMO_STAGE_KEY, String(next));
    } catch {}
  };
  const advanceStage = useCallback(() => {
    setDemoStage((s) => {
      const next = Math.min(MAX_STAGE, s + 1);
      persistDemoStage(next);
      return next;
    });
  }, []);
  const resetStage = useCallback(() => {
    setDemoStage(0);
    persistDemoStage(0);
  }, []);

  const value = useMemo<AppStateValue>(
    () => ({
      compare,
      addCompare,
      removeCompare,
      clearCompare,
      compareMsg,
      leads,
      recordLead,
      lang,
      toggleLang,
      scrolled,
      stickyDismissed,
      dismissSticky,
      sheetOpen,
      openSheet,
      closeSheet,
      auth,
      setAuthPhone,
      setAuthOtp,
      requestOtp,
      verifyOtp,
      logout,
      demoStage,
      advanceStage,
      resetStage,
    }),
    [
      compare,
      addCompare,
      removeCompare,
      clearCompare,
      compareMsg,
      leads,
      recordLead,
      lang,
      toggleLang,
      scrolled,
      stickyDismissed,
      dismissSticky,
      sheetOpen,
      openSheet,
      closeSheet,
      auth,
      setAuthPhone,
      setAuthOtp,
      requestOtp,
      verifyOtp,
      logout,
      demoStage,
      advanceStage,
      resetStage,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
