# Future Education — Web Platform

Admission counselling and career-guidance website for Future Education Trust: course finder, AI course matcher, college directory with compare, admission consultancy, scholarships eligibility checker, application tracker, success stories, and an internal counsellor console.

Built with Next.js (App Router) and Tailwind CSS. Implemented from a Claude Design prototype (see `design-import/` locally, excluded from version control).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notes

- All data (courses, colleges, stories, schemes, etc.) lives in `src/data/` as static fixtures — there is no backend yet.
- Leads, the compare list, and the demo application-tracker state are mocked client-side (`src/context/app-state.tsx`), persisted to `localStorage`/`sessionStorage` for the current browser only.
- `src/app/tracker` accepts any 10-digit mobile number and any 4-digit OTP (demo login, no real auth).
