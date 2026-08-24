# DESIGN.md — UX/UI Source of Truth

> **Owned by @Shilpi** — created 2026-08-23
> **Project:** Cozy Coffee Café — $10k Premium Website
> **Emotions:** Friendly · Welcoming · Warmth · Togetherness

---

## 1. Design Thesis

This is not a coffee shop website. This is a **neighborhood living room** translated to the web.

A $10k site must feel *handcrafted*. No templates. No soulless minimalism. Every scroll feels like walking into the café at 8am — bell rings, warmth hits, barista nods.

**Editorial, not e-commerce.** Think Kinfolk meets neighborhood bulletin board. Tactile, human, slow in the best way.

## 2. Principles

1. **Human Before Hip** — Copy is first-person, imperfect, warm. Photography is real people, not latte art generically.
2. **Tactile Over Flat** — Wood grain, linen, paper texture, soft shadows. Digital should feel touchable.
3. **Together, Not Alone** — Every section implies people: tables for two, community boards, regulars. Negative space invites pause.
4. **Slow Luxury** — Motion is slow, eased, cinematic. No bouncy spring pop. Pages breathe.
5. **Editorial Craft** — Asymmetric grids, generous whitespace, pull quotes, marginalia. Content is the design.

## 3. Palette

| Role | Token | Value | Use |
|------|-------|-------|-----|
| **Cream** | `--cream` | `#FFF8F0` | Page bg, air |
| **Warm Wood** | `--wood` | `#8B5A2B` | Primary, headings |
| **Clay / Terracotta** | `--clay` | `#C17C60` | CTAs, accents, hover |
| **Espresso** | `--espresso` | `#3C2415` | Text, rich contrast |
| **Fog / Linen** | `--fog` | `#F3EDE8` | Cards, sections |
| **Moss** | `--moss` | `#7A8A6A` | Subtle accent, freshness |
| **Gold Foil** | `--gold` | `#D4A574` | Premium detail, borders |

*No pure black/white. No neon.*

## 4. Typography

- **Display / Headings:** Fraunces (soft serif, friendly, warm) — or Cormorant Garamond — weight 600, tight tracking, slight personality.
- **Body:** DM Sans / Inter — 16-18px, line-height 1.7, warm gray (#4A3728).
- **Accent / Handwritten:** Caveat or Instrument Serif italic for pull quotes, marginal notes, $10k craft touch.
- **Rule:** 60–70ch measure, generous margins. Editorial rhythm.

## 5. Imagery Direction

- Natural light, film grain, shallow depth of field.
- No sterile stock. Real hands, real steam, real crumbs.
- 4:3 and 3:4 editorial crops, not 16:9 hero video wallpaper.
- Textures: paper, burlap, chalk, wood — used subtly as overlays/masks.

## 6. Motion & Interaction (Framer Motion)

- Entrance: `opacity 0→1 + y: 24 → 0, duration 0.8, ease [0.25,0.1,0.25,1]` — slow, human.
- Parallax: subtle image drift (max 8%), never dizzy.
- Hover: clay → espresso, 200ms, no scale bounce.
- Page transitions: soft veil fade, not slide.
- All motion respects `prefers-reduced-motion`.

## 7. Layout System

- **Grid:** 12-col with editorial breaks — full bleed image → inset text → asymmetrical cards.
- **Spacing:** 8px base, but sections use 80–120px vertical rhythm. Let it breathe.
- **Radius:** 24px cards, 16px buttons — soft, not pill-perfect.
- **Shadows:** Soft, warm: `0 12px 32px rgba(60,36,21,0.08)` — candlelit.
- **Borders:** 1px linen `rgba(60,36,21,0.08)` for craft.

## 8. Sitemap & Mood per Page

1. **Home /** — Hero (together table) → Ethos strip → Signature menu preview → Story tease → Community wall → Visit (map + hours) → Journal latest.
2. **Menu /menu** — Board-style, seasonal notes, dietary callouts, handwritten prices, not a grid of products.
3. **Our Story /story** — Founder, sourcing, neighbors — timeline with polaroids.
4. **Visit /visit** — Hours, map, how to linger (wifi, dogs, kids), reservation/contact.
5. **Journal /journal** — Brew guides, community stories, MDX, SEO fuel.
6. **(Optional) Reserve/Contact /reserve** — Lightweight form, honeypot, no booking bloat for MVP.

## 9. $10k Non-Negotiables

1. **Custom editorial hero** — not a stock hero with centered H1. Split layout with marginalia.
2. **Tactile texture system** — paper/wood overlays, not flat color.
3. **Photography art direction** — real shoot mood or curated Unsplash with film treatment, never mixed stock styles.
4. **Micro-copy that remembers you** — "Your usual table?" levels of warmth.
5. **Performance as luxury** — <2s LCP, 100 Lighthouse, fluid at 60fps. Fast is premium.

## 10. Components to Build

`SiteHeader`, `SiteFooter`, `HeroEditorial`, `EthosStrip`, `MenuBoard`, `StoryTimeline`, `GalleryMasonry`, `CommunityWall`, `VisitCard`, `JournalCard`, `ReservationForm`, `TextureOverlay`

## 11. Accessibility & Craft

- AA contrast (espresso on cream passes, clay on cream needs check).
- Keyboard navigable, focus rings in clay.
- Alt text that tells a story.
- No motion without reduced-motion fallback.

## 12. Admin Dashboard

- **Route:** `/admin` — 4-tab panel (Menu, Reservations, Newsletter, Testimonials)
- **Data source:** Express API at `NEXT_PUBLIC_API_URL` (production: `https://api-production-d37f.up.railway.app`)
- **CRUD panels:** `MenuAdmin`, `ReservationsAdmin`, `NewsletterAdmin`, `TestimonialsAdmin`
- **Design:** Same warm palette, editorial feel. Not a cold admin dashboard. Cards, generous spacing, clay accents.

## 13. API Integration

- **Client → API:** `client/lib/api.ts` wraps all fetch calls using `NEXT_PUBLIC_API_URL` env var
- **Forms (Reservation, Newsletter):** POST to Express API, not Next.js route handlers
- **Menu page:** Fetches live menu data from `/api/menu`, filterable by category
- **Testimonials:** Fetches active testimonials from `/api/testimonials` for community wall
- **Admin:** Full CRUD for all 4 resources via Express API

## 14. Deployment

| Service | Platform | URL | Notes |
|---------|----------|-----|-------|
| Client | Vercel | https://client-two-mu-19.vercel.app | Next.js, auto-deploys from GitHub |
| API | Railway | https://api-production-d37f.up.railway.app | Express + TypeScript |
| Database | Railway | Internal (mongodb.railway.internal) | MongoDB 6.x, provisioned via Railway template |
| Source | GitHub | https://github.com/Anish29801/cozy-coffee | master branch |

---

**For @Nirman:** Use this for route layouts — editorial rhythm over dashboard density.
**For @Rachana:** Keep this file in sync as components ship. Any deviation → flag to Vishvakarama.
**For @Agni:** Deployments — Vercel (client), Railway (API). Environment variables: `NEXT_PUBLIC_API_URL` in Vercel, `MONGODB_URI`, `CORS_ORIGINS`, `JWT_SECRET`, `NODE_ENV` in Railway.
