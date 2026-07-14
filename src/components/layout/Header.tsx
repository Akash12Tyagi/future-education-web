"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navGroups, successStoriesLink } from "@/data/navigation";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useChatOnline } from "@/hooks/useChatOnline";
import { useAppState } from "@/context/app-state";
import { dict } from "@/data/dict";
import { waHref, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const isMobile = useIsMobile();
  const chatOnline = useChatOnline();
  const { lang, toggleLang } = useAppState();
  const t = dict[lang];
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(document.documentElement.scrollTop > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Utility bar */}
      <div className="bg-primary-900 text-[13.5px] text-[#E5F3EA]">
        <div className="mx-auto flex max-w-[1220px] flex-wrap items-center justify-between gap-3 px-[22px] py-2">
          <div className="flex flex-wrap items-center gap-4.5">
            <a href="tel:+919334649506" className="flex items-center gap-1.5 font-medium text-[#E5F3EA] no-underline">
              <span className="opacity-80">☎</span> +91 93346 49506
            </a>
            <a
              href={waHref()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-medium text-[#E5F3EA] no-underline"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#25D366]" /> WhatsApp us
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{
                  background: chatOnline ? "#25D366" : "#9CA3AF",
                  animation: chatOnline ? "fe-pulse 1.8s infinite" : undefined,
                }}
              />
              <span className="opacity-85">{chatOnline ? "Counsellors online" : "Offline · leave a callback"}</span>
            </div>
            <button
              onClick={toggleLang}
              className="cursor-pointer rounded-full border border-white/35 bg-transparent px-2.5 py-[3px] text-[12.5px] font-semibold text-[#E5F3EA]"
            >
              {t.langLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className="sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300"
        style={{
          background: headerScrolled ? "rgba(255,255,255,.86)" : "#FFFFFF",
          backdropFilter: headerScrolled ? "saturate(180%) blur(14px)" : "none",
          WebkitBackdropFilter: headerScrolled ? "saturate(180%) blur(14px)" : "none",
          borderBottomColor: headerScrolled ? "rgba(229,231,235,.7)" : "#E5E7EB",
          boxShadow: headerScrolled ? "0 8px 24px rgba(15,61,38,.08)" : "none",
        }}
      >
        <div
          className="mx-auto flex max-w-[1220px] items-center justify-between gap-4 px-[22px] transition-[padding]"
          style={{ padding: headerScrolled ? "10px 22px" : "16px 22px" }}
        >
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <span className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] bg-primary-900 text-[19px] font-extrabold text-highlight-500">
              F
            </span>
            <span className="flex flex-col leading-[1.05]">
              <span className="text-lg font-extrabold text-primary-900">Future Education</span>
              <span className="text-[11px] tracking-[.04em] text-neutral-500">CAREER COUNSELLING · 15+ YEARS</span>
            </span>
          </Link>

          {!isMobile && (
            <>
              <nav className="flex items-center gap-0.5">
                {navGroups.map((group) => (
                  <div
                    key={group.key}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(group.key)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <Link href={group.href} className="fe-nav-link">
                      {group.label} ▾
                    </Link>
                    {openMenu === group.key && (
                      <div
                        className="absolute top-full left-0 z-[60] flex min-w-[250px] flex-col gap-0.5 rounded-xl border border-[#E5E7EB] bg-white p-2 shadow-[0_14px_34px_rgba(15,61,38,.14)]"
                        style={{ animation: "feScaleIn .18s cubic-bezier(.16,1,.3,1)" }}
                      >
                        {group.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-neutral-900 no-underline hover:bg-neutral-100"
                          >
                            {child.label}
                            {child.tag && <span className="text-[11px] font-bold text-accent-500">{child.tag}</span>}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link href={successStoriesLink.href} className="fe-nav-link">
                  {successStoriesLink.label}
                </Link>
              </nav>
              <MagneticLink
                href="/contact"
                className="whitespace-nowrap rounded-[11px] bg-accent-500 px-5 py-2.5 text-[15px] font-bold text-white no-underline"
              >
                Enquire Now
              </MagneticLink>
            </>
          )}

          {isMobile && (
            <div className="flex items-center gap-2">
              <a
                href={waHref()}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-primary-100 no-underline"
              >
                <span className="block h-3 w-3 rounded-full bg-[#25D366]" />
              </a>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                aria-label="Call"
                className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-primary-100 text-lg text-primary-900 no-underline"
              >
                ☎
              </a>
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Menu"
                className="flex h-[42px] w-[42px] flex-col items-center justify-center gap-1 rounded-[10px] border-none bg-primary-900"
              >
                <span className="block h-0.5 w-[18px] bg-white" />
                <span className="block h-0.5 w-[18px] bg-white" />
                <span className="block h-0.5 w-[18px] bg-white" />
              </button>
            </div>
          )}
        </div>
      </header>

      {isMobile && <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />}
    </>
  );
}
