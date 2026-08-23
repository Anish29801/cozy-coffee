# PLAN.md — Cozy Coffee Café — $10k Premium NextJS Website

> **Status:** Draft for Review — 2026-08-23
> **Orchestrator:** Vishvakarama · Contributors: @Chanakya (research), @Shilpi (UX), @Nirman (arch), @Karya (delivery), @Chitragupta (intel)
> **Bootstrap:** CLAUDE.md ✅ · AGENTS.md ✅ · DESIGN.md ✅
> **Dir:** `C:\Users\Anish\Desktop\New folder`

---

## 0. Executive Summary

Build a premium coffee café website that **earns $10,000**. That means:

- Not a template with a new logo. Handcrafted, editorial, tactile.
- Story first, menu second, community always.
- Technically flawless: 100 Lighthouse, <2s LCP, a11y AA, SEO-ready.
- Client can update menu/journal without us.

**One sentence test:** If a visitor screenshots any page and prints it, does it look like a $10k studio made it? Yes.

---

## 1. Goals & What $10k Means

| Goal | $10k Signal |
|------|-------------|
| **Feel warm, not corporate** | Custom editorial layout, handwritten details, real human copy |
| **Drive foot traffic** | Visit/Reserve with map, hours, human FAQs; local SEO |
| **Showcase menu without delivery bloat** | Board-style menu, seasonal notes, passions behind dishes |
| **Build community** | CommunityWall, Journal, regulars, events |
| **Client self-sufficiency** | MDX-first now, Sanity-ready later — menu/journal editable |
| **Future-proof** | App Router, strict TS, CMS-agnostic content layer |

### Success Metrics (Exit Criteria)
- Lighthouse 95+ (Performance, A11y, Best Practices, SEO) on Home & Menu
- LCP < 2.0s, CLS < 0.1 on Vercel, image-optimized
- Keyboard + screen reader pass, `prefers-reduced-motion` respected
- Client can edit `content/menu/*` and `content/journal/*` without code
- No stock-photo feeling — art-directed imagery

---

## 2. Sitemap & Information Architecture

```
Home (/) — Hero editorial → Ethos → Signature Menu → Story tease → Community → Journal → Visit
Menu (/menu) — Seasonal board, categories, prices, allergens, origin notes
Our Story (/story) — Founder, sourcing, neighborhood timeline (polaroids)
Visit (/visit) — Hours, map (Google embed), amenities, parking, contact
Journal (/journal) — MDX list → /journal/[slug] (brew guides, stories, events)
Reserve (/reserve) — Lightweight form (name, date, party, note) + honeypot → email/API
```

**Route Group:** `app/(marketing)/` for public; `app/api/reserve/route.ts`, `app/api/newsletter/route.ts`

**Nav:** Logo (wordmark) · Menu · Story · Journal · Visit · [Reserve] (clay pill)
**Footer:** Hours, address, Instagram, newsletter (1-field), small print — linen texture.

---

## 3. Design System (Source: DESIGN.md)

**Palettes:** Cream `#FFF8F0`, Espresso `#3C2415`, Clay `#C17C60`, Wood `#8B5A2B`, Fog `#F3EDE8`, Moss `#7A8A6A`, Gold `#D4A574`

**Type:** Fraunces (display) + DM Sans/Inter (body) + Caveat italic accents

**Tactile:** Paper/wood textures as `TextureOverlay` component, soft warm shadows, 24px radius cards.

**Motion:** Framer Motion, slow eases `cubic-bezier(0.25,0.1,0.25,1)`, entrance `y:24→0 opacity 0→1 0.8s`, parallax ≤8%, `prefers-reduced-motion` disables.

**Component Library:**
`SiteHeader` · `SiteFooter` · `HeroEditorial` · `EthosStrip` · `MenuBoard` · `StoryTimeline` · `GalleryMasonry` · `CommunityWall` · `VisitCard` · `JournalCard` · `ReservationForm` · `TextureOverlay` · `Section` (80-120px rhythm wrapper)

> @Rachana owns `components/site/*` and keeps DESIGN.md in sync. @Shilpi approves any visual drift.

---

## 4. Tech Stack — The $10k Justification

| Layer | Choice | Why $10k-grade |
|-------|--------|----------------|
| **Framework** | Next.js 15 (App Router, RSC) | Server Components by default, SEO, streaming, ISR for menu |
| **Language** | TypeScript strict | @Sutra ownership — no `any` |
| **Styling** | Tailwind CSS + `tailwind-merge` + CSS vars (design tokens) | Tokenized palette prevents drift |
| **Primitives** | shadcn/ui (Button, Card, Input, Dialog) | Craft + accessibility baked in |
| **Motion** | Framer Motion | Editorial motion, not gimmick |
| **Icons** | lucide-react | Clean, rounded |
| **Fonts** | next/font (Fraunces, DM_Sans, Caveat) | Zero CLS, self-hosted |
| **Images** | next/image + Unsplash curated (film tone) + `public/textures/` | 60fps, LCP optimized |
| **Content** | MDX via `content/` + `gray-matter` + `next-mdx-remote` (Sanity-ready) | Client-editable, no CMS bill on day 1 |
| **Forms** | `react-hook-form` + `zod` | @Sutra validated — Reserve & Newsletter |
| **Maps** | Google Maps embed (static) or `react-map` later | Zero JS bloat for MVP |
| **SEO** | `next/metadata`, `sitemap.ts`, `robots.ts`, JSON-LD (Café) | Local SEO is revenue |
| **Analytics** | Vercel Analytics + Umami optional | Privacy |
| **Deploy** | Vercel (primary) — `vercel --prod`; Railway alt | You already auth'd to both |
| **Testing** | Vitest + Playwright (Pariksha) | Lighthouse CI in next phase |

**Toolchain:** `eslint`, `prettier`, `tsc --noEmit`, `husky` optional.

---

## 5. Project Structure (Graph-Friendly)

```
app/
  (marketing)/
    layout.tsx          — SiteHeader + Footer + fonts + metadata
    page.tsx            — Home (orchestrates sections)
    menu/page.tsx
    story/page.tsx
    visit/page.tsx
    journal/page.tsx
    journal/[slug]/page.tsx
    reserve/page.tsx
  api/
    reserve/route.ts
    newsletter/route.ts
  globals.css           — Tailwind + CSS vars (DESIGN.md tokens)
  sitemap.ts
  robots.ts
components/
  ui/                   — shadcn: button, card, input, textarea, dialog
  site/                 — bespoke: hero, menu-board, story-timeline, etc.
lib/
  utils.ts              — cn()
  content.ts            — MDX loader (getMenu, getJournal)
  seo.ts                — generateMetadata helpers
  validations.ts        — zod schemas (reserve, newsletter)
content/
  menu/                 — *.mdx (seasonal)
  journal/              — *.mdx (brew guides, stories)
public/
  images/               — hero, gallery, menu
  textures/             — paper.png, wood.jpg (subtle)
ai_context/             — Lekhak owns
```

---

## 6. Phased Execution Plan — Batch of 3

We execute in **4 phases**, each phase = batches of 3 parallel tasks. After each batch: @Sutra typecheck → @Pariksha test → @Lekhak context update → @Daksh push → review.

### Phase 1 — Bootstrap & Foundation (1–2 days)
**Goal:** Build the craft system — tokens, layout, shell.

| # | Task (WHERE → WHY → HOW) | Owner | Batch |
|---|---------------------------|-------|-------|
| 1.1 | `app/globals.css` + `tailwind.config.ts` → implement DESIGN.md tokens as CSS vars + tailwind theme | @Nirman + @Rachana | Batch A |
| 1.2 | `app/(marketing)/layout.tsx` + fonts + `SiteHeader`/`SiteFooter` with linen texture | @Nirman / @Rachana | Batch A |
| 1.3 | Scaffold `lib/utils.ts`, `lib/validations.ts`, `components/ui/*` (button, card, input) | @Sutra | Batch A |
| 1.4 | Create `content/menu/` & `content/journal/` with 2 sample MDX each + `lib/content.ts` loader | @Kosha/@Setu | Batch B |
| 1.5 | SEO essentials: `sitemap.ts`, `robots.ts`, `opengraph-image`, JSON-LD Café schema | @Nirman | Batch B |
| 1.6 | Deploy empty shell to Vercel (`vercel --prod`) + domain preview check | @Agni | Batch B |

*Exit: Deployed shell with header/footer, tokens live, MDX loads, Lighthouse base >90.*

### Phase 2 — Core Pages — Home & Menu (3–4 days)
**Goal:** Deliver the $10k wow.

| # | Task | Owner | Batch |
|---|------|-------|-------|
| 2.1 | `HeroEditorial` (split editorial, marginalia, steam/wood imagery, clay CTA) | @Rachana | Batch A |
| 2.2 | `EthosStrip` + `MenuBoard` (board-style, seasonal, board-pinned feel) | @Rachana | Batch A |
| 2.3 | Home orchestration: `app/(marketing)/page.tsx` (hero → ethos → menu → story tease → community → visit) | @Nirman | Batch A |
| 2.4 | `app/(marketing)/menu/page.tsx` full board with categories, filters, dietary badges | @Rachana | Batch B |
| 2.5 | `StoryTimeline` polaroid component + `/story` page | @Rachana | Batch B |
| 2.6 | `GalleryMasonry` + `CommunityWall` (regulars, quotes) | @Rachana | Batch B |

*Exit: Home & Menu feel print-worthy. Motion + textures applied.*

### Phase 3 — Depth & Utility (2–3 days)
**Goal:** Make it useful — Visit, Journal, Reserve, Polish.

| # | Task | Owner | Batch |
|---|------|-------|-------|
| 3.1 | `/visit` — hours, map, amenities, parking, FAQs | @Rachana | Batch A |
| 3.2 | Journal list + `[slug]` MDX rendering + `JournalCard` | @Nirman/@Rachana | Batch A |
| 3.3 | `ReservationForm` + `app/api/reserve/route.ts` + `newsletter` API (zod + honeypot + Resend/mock) | @Setu & @Sutra | Batch A |
| 3.4 | Texture & motion pass: `TextureOverlay`, parallax, entrance choreography | @Rachana | Batch B |
| 3.5 | Performance pass: `next/image` sizing, font subsetting, `loading.tsx` skeletons | @Nirman | Batch B |
| 3.6 | @Sutra full type audit + @Pariksha Vitest + Playwright smoke | @Sutra/@Pariksha | Batch B |

*Exit: All routes live, forms validated, a11y AA, perf <2s.*

### Phase 4 — $10k Polish & Handoff (1–2 days)
**Goal:** Justify the invoice.

| # | Task | Owner | Batch |
|---|------|-------|-------|
| 4.1 | Content polish: real copy, curated imagery, micro-copy voice pass (“your usual?”) | @Shilpi + @Granth | Batch A |
| 4.2 | SEO final: local business JSON-LD, OG images per page, `next/metadata` audit | @Nirman | Batch A |
| 4.3 | Security & forms review | @Rakshak (read-only) | Batch A |
| 4.4 | Code review | @Vivek (read-only) | Batch B |
| 4.5 | README + client handoff guide (how to edit menu/journal) | @Granth + @Lekhak | Batch B |
| 4.6 | Vercel prod + Railway fallback, env vars, domain, analytics | @Agni + @Daksh (push) | Batch B |

*Exit: Client can run it, edit it, and show it off.*

---

## 7. Content Strategy — MDX First, Sanity Optional

**Decision:** **MDX-first** (zero vendor lock, $10k feels handcrafted). Structure ready to port to Sanity later without rewrite.

- `content/menu/latte.mdx` — frontmatter: `title, price, category, seasonal, allergens, story`
- `content/journal/first-sip.mdx` — frontmatter: `title, date, author, cover, excerpt`

`lib/content.ts` abstracts loader → swap to Sanity GROQ later if client wants CMS.

---

## 8. SEO & Local Growth (Café ≠ SaaS)

- Title pattern: `{Page} — Cozy Coffee Café · Neighborhood living room in {City}`
- H1 per page, semantic hierarchy, alt text that tells story.
- `sitemap.ts` + `robots.ts` + canonical + OG (`1200x630` warm card).
- JSON-LD: `CafeOrCoffeeShop` (address, hours, phone, menu URL, geo).
- NAP consistent with Google Business Profile.

---

## 9. Risk & $10k Mitigations

| Risk | Mitigation |
|------|------------|
| Stock-photo cheapness | Curate 20-image board, film grade, 4:3/3:4, approve before build — @Shilpi |
| Slow hero (LCP sink) | `next/image` priority, hero preload, no video wallpaper for MVP |
| Scope swell (ordering system) | Out of scope for $10k — Reserve is lightweight form only |
| Client can't edit | MDX + handoff Loom/video + README |
| Motion feels cheap | Single ease curve, reduced-motion, choreographed — no bounce |

---

## 10. Immediate Next Steps — Awaiting Your Review

1. **You approve PLAN.md** (or request edits — palette, sitemap, phases).
2. Vishvakarama locks bootstrap (CLAUDE.md/AGENTS.md/DESIGN.md already done).
3. Start **Phase 1 — Bootstrap & Foundation** → Batch A (1.1→1.3 in parallel via @Nirman, @Rachana, @Sutra).
4. First deploy preview within ~2 hours of approval.

---

## 11. Agent Wiring for This Project

- **Orchestrator:** Vishvakarama (batch + merge + plan drift guard)
- **Background:** @Karya (delivery), @Chitragupta (graph intel) — already spawned
- **Phase 1 parallel:** @Nirman (App Router), @Rachana (UI system), @Sutra (types)
- **After each batch:** @Pariksha (tests), @Lekhak (ai_context), @Daksh (push), @Rakshak/@Vivek (reviews before handoff), @Agni (deploy), @Granth (docs)

---

## 12. Open Questions For You (Reply In Review)

- [ ] Café name + city for SEO/OG/Journal voice? (placeholder "Cozy Coffee" ok?)
- [ ] Menu categories (e.g., Espresso, Filter, Pastries, Lunch)?
- [ ] Need online ordering now or keep it to Reserve/Visit only for $10k scope?
- [ ] Photography: curate stock or you have real shoot assets?
- [ ] Sanity later or MDX forever?
- [ ] Verbal sign-off on palette (Cream/Wood/Clay) or want 2 palette options mocked before code?

---

**Ready for your red pen.** Comment what to change, or say **`approved — start Phase 1`** and we spin up @Nirman + @Rachana + @Sutra in parallel immediately.

*This plan was synthesized from Chanakya research, Shilpi design ownership, and Nirman architecture — three agents in parallel, fused by Vishvakarama.*
