# Future Education Web Platform — Codebase & Design Analysis

_Prepared 2026-08-07 as a reference document ahead of a from-scratch rebuild in a new folder. Source: `/Users/akash/lms-web`._

---

## 1. Executive summary

`lms-web` is **Future Education Trust's** admission-counselling / career-guidance platform: course finder, a rule-based "AI" course matcher, a college directory with compare, admission consultancy, a scholarships eligibility checker, an application tracker demo, success stories, and a full internal admin CMS. It's built on Next.js 16 (App Router) + React 19 + Tailwind 4, backed by a real Postgres database (Neon) via Prisma 7, with NextAuth v5 for admin login.

This is **not an early prototype** — it's a fairly complete realization of a 22-section design brief (`lmsrevamp.docs.docx`), with a working database, a hand-built 15-resource admin CMS, audit logging, first-party analytics, and lead capture. That said, the migration from an earlier "static fixtures only" architecture to a real database is **incomplete**: some content is still hardcoded, one feature (the course matcher) silently ignores admin edits, and the README no longer describes the actual system.

The single most important finding for the rebuild: **there are three different design generations in this repo**, and the newest one — `Future Education V2 (offline).html` at the repo root, modified most recently of any file in the project — is a full redesign of every page (home, matcher, colleges, compare, consultancy, scholarships, stories, about, contact) in a completely different visual language (warm/earthy palette, serif display type) from what's currently live. It isn't wired into the app at all. This is very likely the design you mean by "start the new design" — **worth confirming explicitly before treating it as the target**, since that's inferred from file dates and content, not stated anywhere.

---

## 2. Purpose & domain

Public site + internal admin console for Future Education Trust. Per the original brief (`lmsrevamp.docs.docx`, "LMS Website Revamp & Feature Enhancement Document V2"):

> "Transform the current LMS website into a modern, visually engaging, scalable, and fully dynamic educational portal... while remaining fast, responsive, SEO-friendly, and completely manageable through an Admin Panel."

The brief lists 22 requirement sections (hero slider, notices, dynamic courses/departments, admissions flow, full admin panel, dynamic CMS, news/events, placements, faculty, downloads, global search, SEO/performance, accessibility, contact/enquiry, media library, analytics, security/RBAC/audit, sticky nav, floating Apply CTA, WhatsApp, testimonials, recruiter carousel, newsletter, back-to-top). **Nearly all of it is implemented.**

Public feature set (confirmed against the route tree):
- Course finder + rule-based course matcher quiz
- College directory with a 4-item compare tray
- Admission consultancy + FAQ
- Scholarships eligibility checker
- Application tracker (demo login: any 10-digit phone + any 4-digit OTP)
- Success stories / placements
- Internal counsellor console (demo)
- About, gallery, news/events, downloads, contact, global search

---

## 3. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js **16.2.10** (App Router), React **19.2.4** |
| Language | TypeScript 5, strict mode |
| Styling | Tailwind CSS **4** — CSS-first config (`@theme inline` in `globals.css`), no `tailwind.config.js` |
| Database | **Neon serverless Postgres**, via `@neondatabase/serverless` + `@prisma/adapter-neon` (driver-adapter pattern, not classic binary engine) |
| ORM | **Prisma 7.9.0**, generated client output to `generated/prisma` |
| Auth | **NextAuth v5 (beta.32)**, Credentials provider, JWT sessions, RBAC via `Role` enum |
| Password hashing | bcryptjs |
| Validation | zod 4 (all server actions) |
| File storage | `@vercel/blob` (admin Media Library) |
| Analytics | `@vercel/analytics` + custom first-party `AnalyticsEvent` table |
| Misc | `ws` present in `package.json` with **no found usage** — worth checking before assuming it's needed |

Route groups: `(site)` for the public site, `admin/(auth)` for login, `admin/(dashboard)` for the CMS — clean separation of shells. ESLint 9 flat config explicitly ignores `design-import/**` as reference-only.

---

## 4. Data model (Prisma schema)

A real, fairly normalized relational schema — a strong reference for the rebuild, not a toy. Three migrations exist, both later ones adding a `Stream` relation to existing models (suggests the stream taxonomy was retrofitted rather than designed in from day one).

**Auth / RBAC**
- `User` (email, passwordHash, role) — role enum `SUPER_ADMIN | ADMIN | EDITOR`
- `Session`, `Account`, `VerificationToken` — kept only to satisfy the Auth.js adapter interface (only Credentials auth is actually used today)

**Media**
- `MediaAsset` — single central table (image/video/document) referenced by Banner, Notice, GalleryItem, Course, College, Counsellor, Story, NewsEvent, Download

**Content**
- `Banner` (scheduled hero slides), `Notice` (+ type: POPUP/TICKER/BANNER, scheduled), `GalleryAlbum` → `GalleryItem`
- `Stream` (taxonomy) ↔ `Course`, ↔ `College` (via join tables `CollegeCourse`, `CollegeStream`)
- `College` — code comment: this is the doc's "Departments"
- `Counsellor` — code comment: this is the doc's "Faculty"
- `Story` — success stories / the doc's "Placements"; optional relations to Course/College/Stream
- `Recruiter`, `Scholarship` (+ income-bracket enum), `Faq`, `NewsEvent`, `Download`

**Leads / growth**
- `Lead` (+ status enum NEW→CLOSED), `NewsletterSubscriber`

**Platform**
- `SeoMeta` (per-route overrides), `SiteSetting` (JSON k/v — **appears unused**, no call sites found), `AnalyticsEvent` (PAGE_VIEW/BANNER_CLICK/ENQUIRY), `AuditLog` (written on every admin create/update/delete)

⚠️ **Terminology mismatch**: the schema uses generic names (College, Counsellor, Story) while the design brief and admin nav use domain terms (Department, Faculty, Placement). This is documented in code comments but is a real source of confusion worth resolving with one consistent naming choice in the rebuild.

---

## 5. Routing / page inventory

### Public site — `src/app/(site)/*` (18 routes)

Mostly server components fetching via `src/lib/site-data.ts`, passing data down into `*Client.tsx` components for interactivity — a clean, consistent split.

| Route | Notes |
|---|---|
| `/` | Hero/banner carousel, popular streams, featured colleges, matcher teaser, success stories, trust stats, process strip, governing team, final CTA |
| `/find-your-course` | Course listing/filter |
| `/find-your-course/matcher` | Client-only quiz — **runs on static fixtures, not the DB** (see §7) |
| `/colleges`, `/colleges/[slug]`, `/colleges/compare` | Directory, profile, compare (compare reads from local state, no server fetch) |
| `/admission-consultancy`, `/admission-consultancy/scholarships` | FAQ + eligibility checker |
| `/about`, `/about/counsellors[/…]`, `/about/director-message`, `/about/media` | |
| `/gallery`, `/news-events`, `/placements`, `/success-stories[/…]`, `/downloads`, `/contact`, `/search` | |
| `/tracker`, `/console` | **Demo only** — any 10-digit phone + any 4-digit OTP; shared "demo stage" state between the two pages |

### Admin — `src/app/admin/(auth)` + `admin/(dashboard)`

A full hand-built CMS: **47 `page.tsx` files, 16 `actions.ts` files**, one consistent pattern per resource (banners, colleges, courses, downloads, faculty, gallery, news, notices, placements + recruiters, scholarships, SEO, users, plus admissions/analytics/leads/audit-log):

```
list page.tsx      → <DataTable>  (generic table shell)
new / [id] page.tsx → <XForm>     (built from <FormField> + <MediaPicker>)
actions.ts         → zod-validate FormData → requireAdmin() → Prisma write → AuditLog → revalidatePath → redirect
```

`src/lib/admin-nav.ts` explicitly documents the doc→schema terminology mapping ("Departments → Colleges, Faculty → Counsellors, Placements → Stories"). Role-gating exists at the nav level (`minRole`), but per-action server-side role enforcement beyond "is there a session" wasn't fully verified — **worth confirming before assuming it's secure**, not just hidden from the nav.

---

## 6. State management & client-side patterns

**`src/context/app-state.tsx`** is the one big global client store, and it currently handles ~6 unrelated concerns in a single provider:

- `compare` (college IDs, max 4) → `localStorage`
- `leads` → `sessionStorage`, **plus** a real fire-and-forget write to the DB via `submitLeadToDb` (so leads are now double-tracked — an ephemeral session copy for UI, and a durable DB row)
- `lang` (en/hi) → in-memory only, resets on reload
- `scrolled`, `stickyDismissed` → drive the sticky enquiry widget
- `sheetOpen` → callback-sheet modal
- `auth` → **demo-only** tracker/console phone+OTP state machine, entirely separate from real admin auth
- `demoStage` → shared scripted "demo student" tracker progress → `sessionStorage`

It also re-exposes server-fetched read-only data (colleges, course options, counsellors) through context, because globally-mounted widgets have no natural server-component parent — a deliberate, documented pragmatic choice, not an oversight.

**Auth** (`src/lib/auth.ts` / `auth.config.ts`): real NextAuth v5 Credentials + bcrypt + JWT sessions + role in the JWT. Config is split so an edge-safe subset (no Prisma/bcrypt) can gate `/admin/*` in middleware.

**Key `src/lib` files** (each a single clear responsibility):
`site-data.ts` (the Prisma→UI mapping layer, ~20 query functions) · `search.ts` (parallel `contains` search across 5 models, deliberately simple) · `matcher.ts` (quiz scoring engine — **reads static fixtures, not the DB**) · `seo.ts` (per-route metadata with DB overrides) · `analytics-data.ts` / `analytics-actions.ts` (first-party event tracking, fails safe) · `lead-actions.ts` · `media-actions.ts` (Vercel Blob upload, degrades gracefully if unconfigured) · `newsletter-actions.ts` · `whatsapp.ts` (hardcoded `wa.me` number + prefilled message) · `format.ts` (₹-lakh formatting, etc).

---

## 7. ⚠️ Data fixtures vs. database — README is stale

README currently claims *"there is no backend yet"* and that leads/compare/tracker are all client-mocked. **This is no longer true.** There's a real Postgres DB with a full admin CMS writing to it, and leads now hit a real `Lead` table.

But the migration off static fixtures is **incomplete**, and both approaches coexist:

- **DB-backed** (has an admin screen): courses, colleges, counsellors, stories, gallery, banners, notices, FAQs, scholarships, downloads, news/events, recruiters, SEO overrides.
- **Still static fixtures**, imported directly from `src/data/*.ts`, bypassing Prisma:
  - `navigation.ts`, `dict.ts` (i18n) — reasonable to keep static
  - **`streams.ts`** — duplicates the real `Stream` Prisma model / `getStreamsMeta()`. Two sources of truth for the same taxonomy.
  - **`courses.ts` / `colleges.ts`** — imported only by `matcher.ts`. **The course-matcher quiz scores against a hardcoded snapshot, not live data** — if an admin edits/adds a course or college via the CMS, the matcher won't reflect it. This is a concrete functional bug, not a design choice.
  - `tracker.ts` — consistent with the explicitly-demo `/tracker` and `/console` pages
  - `bento.ts`, `timeline.ts`, `faq.ts`, `outcomes.ts`, `matcher-steps.ts` — static marketing copy/config with no admin screen (intentional)
- **Orphaned, zero importers** (dead code, fully superseded by DB equivalents): `counsellors.ts`, `media.ts`, `schemes.ts`, `stories.ts`

**Recommendation for the rebuild**: decide deliberately, per content type, what's DB/CMS-managed vs. static config — don't inherit this partially-migrated state as-is.

---

## 8. Component architecture

| Folder | Role |
|---|---|
| `layout/` | Header, Footer, MobileMenu, SearchBox |
| `home/` | Hero/HeroCarousel, PopularStreams, FeaturedColleges, MatcherTeaser, TrustStatsBar, ProcessStrip, GoverningTeam, FinalCta |
| `global/` | Cross-page persistent UI: AnnouncementBanner, NoticeTicker, NoticePopup (3 presentations of one `Notice` model), StickyEnquiryWidget, CallbackSheet, CompareTray, BackToTop, NewsletterSignup, PageViewTracker |
| `admin/` | DataTable, FormField, MediaPicker, AdminCard — the CMS scaffolding reused across all 15 resources |
| `ui/` | Button, CompareButton, MagneticLink (pointer-follow hover, reduced-motion aware), SectionHeading |
| Feature folders | `about/`, `colleges/`, `consultancy/`, `contact/`, `find-course/`, `gallery/`, `lead-form/` (shared enquiry form), `matcher/`, `seo/` (JSON-LD), `stories/` |

---

## 9. Styling / design system — three generations coexist

### Currently implemented (`globals.css`, `lib/fonts.ts`)
- Tailwind 4 CSS-first tokens via `@theme inline`
- **Blue/purple palette**: primary blue `#1b2559`/`#3d6ce7`, purple accent `#6151fb`, amber highlight `#ffb020`, teal success `#0e8074`
- **Fonts**: Roboto (body+display) + Noto Sans Devanagari (Hindi toggle)
- Hand-written keyframe/utility system: fade/rise/scale/slide-in, marquee (notice ticker), card hover-lift, image zoom, nav-link states, full `prefers-reduced-motion` override

### Generation 1 — `design-import/project/` (Jul 13, original Claude Design handoff)
The bundle's own README instructs coding agents to recreate it "pixel-perfectly." Its offline prototype uses a **green/red palette** (`#0F3D26` deep green, `#A9241F` red, `#1F7A42`, `#F4C81D` gold) and **Plus Jakarta Sans + Noto Sans Devanagari**. Note: its neutral scale (`#14171F`, `#F7F8F6`) matches the *currently implemented* site exactly — so the live build partially followed this prototype, then diverged on the primary palette/font. ~40 QA screenshots exist under `design-import/project/screenshots/`.

### Generation 2 — currently live site
Blue/purple/Roboto, as above. Diverged from Generation 1.

### Generation 3 — **`Future Education V2 (offline).html`** (repo root, modified Aug 5 — newest design artifact in the whole repo)
Not referenced by README, not under `design-import/`, not covered by the eslint ignore — **completely unwired from the build**. Entirely different visual language:
- **Warm/earthy palette**: `#1B1A17` near-black, `#B4552F` terracotta, `#1F3D33` deep forest green, `#C9A227` gold, `#E4DFD3`/`#D8D2C4` warm neutrals
- **Serif display type** — `'Instrument Serif'` for every H1/H2, a real typographic shift from the current sans-only system — paired with **Manrope** body text
- Covers the **entire site**: home, find-your-course, matcher (with `{{ mQuestion }}` templating), colleges directory + compare + profile, consultancy, scholarships, success stories, about/story, director-message, counsellors, media, contact

**This is almost certainly the design you mean by "the new design."** It's the newest thing in the repo, post-dates all current implementation work, and is a full-site concept rather than a fragment — but since that's inferred from dates/content rather than stated anywhere, **please confirm before we treat it as the rebuild target.**

---

## 10. Notable UX features

- **Course matcher** — multi-step quiz (stream, score, budget, location, program type, priority), client-side weighted scoring, ranked results with plain-language reasons. Marketed as "AI" but is rule-based, not ML.
- **Compare tray** — floating, max 4 colleges, `localStorage`, mutually exclusive with the sticky enquiry widget
- **Sticky enquiry widget** — appears after 30% scroll, session-dismissible, responsive mobile/desktop layouts
- **Callback sheet** — bottom-sheet modal wrapping the shared lead form, Escape + backdrop dismiss
- **Notice system** — one `Notice` model driving three presentations (ticker/popup/banner) via type + schedule filtering
- **WhatsApp** — `wa.me` deep links with dynamically prefilled lead context, hardcoded business number (no WhatsApp Business API)
- **Newsletter signup**, **back-to-top**, **magnetic-link hover**, **count-up stat animation**, **scroll-reveal** (explicitly ported from the design-import prototype's interaction language)
- **`useChatOnline`** — hardcoded weekday 10:00–19:00 "online" rule, not wired to a real chat backend as far as observed
- **First-party page-view tracking** on every route

---

## 11. Environment & integrations

Variable **names** only (no secret values read):

- **Database**: full Neon/Vercel Postgres set — `DATABASE_URL(_UNPOOLED)`, `PG*`, `POSTGRES_*` (pooled + unpooled + individual fields)
- **Neon platform**: `NEON_AUTH_BASE_URL`, `NEON_PROJECT_ID`, `VITE_NEON_AUTH_URL` — odd, since the app uses NextAuth Credentials, not Neon Auth; possibly leftover scaffolding, worth confirming as dead config
- **Auth**: `AUTH_SECRET`
- **Storage**: `BLOB_READ_WRITE_TOKEN` (Vercel Blob)
- **Seed**: `ADMIN_SEED_EMAIL`, `ADMIN_SEED_PASSWORD`
- `VERCEL_OIDC_TOKEN` (platform-injected)

**No email service integration found** despite the brief listing "email notifications" for the enquiry form — leads go to DB + analytics event only. **No WhatsApp Business API** — just `wa.me` links.

---

## 12. Weaknesses / things worth a deliberate decision in the rebuild

These are observations, not prescriptions — flagging them so they can be a conscious choice rather than something inherited by default:

1. **README is out of date** — describes an architecture (no backend, all client-mocked) that no longer matches reality.
2. **Static-fixture vs. DB split is inconsistent** — no documented rule for what belongs where; the matcher's stale fixture data is a real bug (admin edits don't propagate).
3. **Duplicate taxonomy** — `Stream` exists as both a DB model and a static fixture, used inconsistently.
4. **Hand-duplicated type system** — `src/lib/types.ts` hand-defines types parallel to Prisma's generated types, requiring manual field-by-field mapping (enum-lowercasing, etc.) in every `site-data.ts` function.
5. **Dead fixture files** with zero importers (`counsellors.ts`, `media.ts`, `schemes.ts`, `stories.ts`).
6. **Hand-rolled CMS** — 47 page files + 16 actions files, all repeating the same list/form/actions triple. Functionally complete, but a lot of boilerplate; worth deciding whether to keep the hand-rolled control or generate/abstract it.
7. **Two parallel auth systems** — real NextAuth for admin, a completely separate any-digits-work demo auth for `/tracker` + `/console`. Intentional today; decide if the rebuild keeps `/tracker` as a demo or wires it to something real.
8. **One monolithic global context** managing 6+ unrelated concerns (compare, leads, lang, scroll state, demo auth, demo tracker stage) with three different persistence mechanisms.
9. **Naming mismatch** between the brief's domain language (Department/Faculty/Placement) and the schema's generic names (College/Counsellor/Story) — only bridged by a comment.
10. **`SiteSetting` model looks unused**; `ws` dependency has no found usage — both worth a quick check before assuming they're needed.
11. **Admin role enforcement** — nav-level `minRole` gating is confirmed; per-action server-side role checks beyond "logged in" weren't fully verified — check before treating it as secure in the rebuild.
12. **Global CSS carries a fair amount of hand-written animation/utility code** outside Tailwind's utility system, centralized in one file rather than co-located with components — a stylistic choice worth reconsidering deliberately.

---

## 13. Open questions to resolve before starting the rebuild

- **Is `Future Education V2 (offline).html` the intended target design?** (Strong circumstantial evidence: newest file in the repo, full-site coverage, unwired from the build — but not confirmed anywhere explicitly.)
- Keep the current Prisma schema as the foundation (it's solid), or restructure the naming (College→Department, Counsellor→Faculty, Story→Placement) to match the brief's language?
- Keep the hand-rolled admin CMS pattern, or invest in a more generic/generated CRUD layer given how much of it repeats?
- Fix the matcher-uses-stale-fixtures bug as part of the rebuild, or is the matcher being redesigned anyway?
- Is `/tracker` + `/console` staying a scripted demo, or does it need real backing data this time?
- Any plan for the missing email-notification integration from the original brief?
