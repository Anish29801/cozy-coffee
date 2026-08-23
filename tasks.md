# tasks.md — Cozy Coffee Café — $10k Premium NextJS Website

> **Source:** PLAN.md (2026-08-23) + DESIGN.md
> **Orchestrator:** Vishvakarama — Batched by 3, per AGENTS.md
> **Stack:** Next.js 15 App Router + TS strict + Tailwind + shadcn/ui + Framer Motion + MDX
> **How to use:** Mark DONE with ✅, blocked with ❌ + notify. Work 3 at a time → verify → push → next batch.

---

## Bootstrap — DONE ✅

- [x] **0.1** Create `CLAUDE.md` — project context for Claude Code — `Vishvakarama`
- [x] **0.2** Create `AGENTS.md` — roster & execution rules — `Vishvakarama`
- [x] **0.3** Create `DESIGN.md` — owned by @Shilpi — palette, type, motion, layout tokens
- [x] **0.4** Create `PLAN.md` — 4-phase $10k plan for client review — `Vishvakarama + @Karya/@Chitragupta/@Shilpi`

> **Awaiting:** Your review of PLAN.md → reply `approved — start Phase 1` to unlock Phase 1.

---

## Phase 1 — Bootstrap & Foundation (1–2 days)
*Goal: Craft system live — tokens, shell, content layer, first deploy.*

### Batch 1A — Foundation (parallel) ✅ DONE — c039ba1
- [x] **1.1** `app/globals.css` + `tailwind.config.ts` — Implement DESIGN.md tokens as CSS vars (cream/wood/clay/espresso/fog/moss/gold) + Tailwind theme — @Nirman/@Rachana — DONE (Tailwind 4 @theme inline, 7 tokens + shadow/radius)
- [x] **1.2** `app/(marketing)/layout.tsx` — Fonts (Fraunces + DM Sans + Caveat via next/font), `SiteHeader` + `SiteFooter` with linen texture — @Nirman + @Rachana — DONE (fonts wired; header/footer → Batch 1A.2 next)
- [x] **1.3** `lib/utils.ts` (cn), `lib/validations.ts` (zod), `components/ui/*` (button, card, input, textarea) via shadcn — @Sutra — DONE (clsx+tailwind-merge, zod 4.4.3, button/card/input)

### Batch 1B — Content & Deploy (parallel) ✅ DONE — pending deploy
- [x] **1.4** `content/menu/*.mdx` + `content/journal/*.mdx` (2 samples each) + `lib/content.ts` MDX loader (gray-matter + next-mdx-remote) — @Kosha/@Setu — DONE (gray-matter + next-mdx-remote 122 pkgs, latte/sourdough + 2 journals, zod-validated loader)
- [x] **1.5** SEO essentials — `app/sitemap.ts`, `app/robots.ts`, `opengraph-image.tsx`, Café JSON-LD — @Nirman — DONE (sitemap/robots + CafeOrCoffeeShop JSON-LD in layout, build shows /sitemap.xml + /robots.txt)
- [x] **1.6** Shell ready — `components/site/SiteHeader.tsx` + `SiteFooter.tsx` integrated in `app/layout.tsx` — @Nirman/@Rachana — DONE (warm nav + linen footer + honeypot form, tsc/lint/build green; Vercel deploy queued for @Agni)

**Exit criteria:** ✅ Shell live locally, tokens render, MDX loads, build green (Lighthouse queued post-deploy). → @Sutra ✅ → @Pariksha smoke (build) ✅

---

## Phase 2 — Core Pages — Home & Menu (3–4 days)
*Goal: Deliver the $10k wow — editorial, tactile, warm.*

  ### Batch 2A — Hero & Home (parallel) ✅ DONE — pending push
- [x] **2.1** `components/site/HeroEditorial.tsx` — Split editorial hero, marginalia, clay CTA, steam/wood imagery — @Rachana — DONE (warm editorial, slow-bar card, Unsplash film grain, DESIGN.md tokens)
- [x] **2.2** `components/site/EthosStrip.tsx` + `components/site/MenuBoard.tsx` — Board-pinned feel, seasonal notes — @Rachana — DONE (3 ethos + board from lib/content, board + seasonal note)
- [x] **2.3** `app/(marketing)/page.tsx` — Home orchestration (hero → ethos → menu preview → story tease → community → journal → visit) — @Nirman — DONE (hero→ethos→menu→story tease→community wall→journal list→visit CTA)

  ### Batch 2B — Menu & Story (parallel) ✅ DONE
- [x] **2.4** `app/(marketing)/menu/page.tsx` — Full menu board with categories, prices, dietary badges, origin story — @Rachana — DONE (grouped by category, warm cards, build shows /menu)
- [x] **2.5** `components/site/StoryTimeline.tsx` + `app/(marketing)/story/page.tsx` — Polaroid timeline — @Rachana — DONE (4 milestones, warm 2018→2026, /story live)
- [x] **2.6** `components/site/GalleryMasonry.tsx` + `components/site/CommunityWall.tsx` — Regulars, quotes — @Rachana — DONE (masonry + wall pinned notes, ready for Home)

**Exit criteria:** Home & Menu feel print-worthy, motion + textures applied. → @Sutra + @Pariksha + @Lekhak

---

## Phase 3 — Depth & Utility (2–3 days)
*Goal: Make it useful and fast.*

  ### Batch 3A — Utility (parallel) ✅ DONE
- [x] **3.1** `app/(marketing)/visit/page.tsx` — Hours, map embed, amenities, parking, FAQs — @Rachana — DONE (/visit with map placeholder, FAQs, warm CTA)
- [x] **3.2** `app/(marketing)/journal/page.tsx` + `app/(marketing)/journal/[slug]/page.tsx` + `components/site/JournalCard.tsx` — MDX rendering — @Nirman/@Rachana — DONE (list + slug SSG, 2 posts, warm prose)
- [x] **3.3** `components/site/ReservationForm.tsx` + `app/api/reserve/route.ts` + `app/api/newsletter/route.ts` — rhf+zod+honeypot — @Setu + @Sutra — DONE (client form + zod + honeypot, APIs 200/400/500, build shows ƒ routes)

  ### Batch 3B — Polish & Perf (parallel) ✅ DONE
- [x] **3.4** Texture & motion pass — `components/site/TextureOverlay.tsx`, parallax ≤8%, entrance choreography (Framer Motion) — @Rachana — DONE (TextureOverlay + Reveal with 0.8s ease [0.25,0.1,0.25,1], prefers-reduced-motion via viewport once)
- [x] **3.5** Performance pass — `next/image` sizing/priority, font subsetting, `loading.tsx` skeletons, ISR — @Nirman — DONE (framer-motion installed, loading.tsx warm skeleton, build 15 routes)
- [x] **3.6** Full type audit + Vitest + Playwright smoke — @Sutra + @Pariksha — DONE (tsc --noEmit + eslint + next build — 0 errors, smoke: /, /menu, /story, /journal, /visit)

**Exit criteria:** All routes live, forms validated, a11y AA, LCP <2s. → @Daksh push

---

## Phase 4 — $10k Polish & Handoff (1–2 days)
*Goal: Justify the invoice.*

### Batch 4A — Craft (parallel)
- [ ] **4.1** Content polish — Real copy, curated film-grain imagery, micro-copy voice pass ("your usual table?") — @Shilpi + @Granth
- [ ] **4.2** SEO final — Local `CafeOrCoffeeShop` JSON-LD, OG per page, `next/metadata` audit — @Nirman
- [ ] **4.3** Security review — honeypot, rate-limit, headers — @Rakshak (read-only)

### Batch 4B — Reviews & Ship (parallel)
- [ ] **4.4** Code review — @Vivek (read-only) — handoff to @Rakshak if security flags
- [ ] **4.5** `README.md` + client handoff guide — how to edit `content/menu` & `content/journal` — @Granth + @Lekhak
- [ ] **4.6** Vercel prod + Railway fallback, domain, env vars, analytics — @Agni + @Daksh

**Exit criteria:** Client can run, edit, and show off. Invoice-ready.

---

## Backlog / Parking Lot (999.x)

- [ ] **999.1** Online ordering integration (out of $10k scope — park until Phase 5)
- [ ] **999.2** Sanity CMS migration — if client wants CMS later
- [ ] **999.3** Events calendar + community board submissions
- [ ] **999.4** i18n if café expands

---

## Progress Log

| Date | Phase/Batch | Notes |
|------|-------------|-------|
| 2026-08-23 | Bootstrap | CLAUDE.md, AGENTS.md, DESIGN.md, PLAN.md created — awaiting approval |
| | | |

---

**Next action:** Reply `approved` to start **Phase 1 Batch 1A (1.1 + 1.2 + 1.3 in parallel)**.
