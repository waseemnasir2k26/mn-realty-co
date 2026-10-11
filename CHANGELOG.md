# Changelog

All notable changes to this project are documented in this file.

## [2026.10] - 2026-10-12

- mn-realty-co is a public Next.js (App Router) + TypeScript real-estate demo with buy, sell, agents, dashboard routes and mortgage, affordability and ROI calculators.
- State: last feature work was March 2026, with a Hire Me SEO block added 2026-04-07; no application code changed this month.
- Reviewed October 2026: README, tree and history read; all README external links (Calendly, Fiverr, skynetjoe.com, WhatsApp, the cross-linked repos, Next.js docs) return 200. The Hire Me links were updated to the current Fiverr, Upwork and Calendly URLs.
- Known gaps: below its intro the README is still stock create-next-app text; no LICENSE; no tests or CI.

## [2026.09] - 2026-09-16

- Maintenance review of mn-realty-co — a Next.js real-estate / property-listing demo site with buy, sell, agents, why-us, contact, login/register and dashboard routes.
- Stack: Next.js (App Router) + TypeScript, pnpm workspace, Tailwind/PostCSS, `next/font` Geist. Feature components include mortgage, affordability and ROI calculators, property comparison, a bid modal, a chatbot, save/listing actions and social proof; data and auth helpers live in `lib/` (`listings.ts`, `auth.ts`, `chatbot.ts`, `constants.ts`).
- Status: last change April 2026 (SEO "Hire Me" block with cross-links). Listings and auth are local `lib/` modules rather than an external backend, and no live URL is stated in the README.
- Reviewed September 2026: docs refreshed, CHANGELOG started, package version bumped, versioned as v2026.09. No application code touched.
- Known gaps: the README is still unmodified `create-next-app` boilerplate plus the appended Hire Me block — it never describes what this project actually is; no LICENSE file; no CHANGELOG before this release; no tests and no CI workflow; `public/` still holds only the default Next.js/Vercel SVGs.
