# CLAUDE.md — Project Context for Claude Code

> **Project:** Cozy Coffee Café — Premium NextJS Website ($10k tier)
> **Vibe:** Friendly, welcoming, warmth, togetherness — the digital living room
> **Stack:** Next.js 16.3.2 (App Router) + TypeScript + Tailwind CSS 4 + shadcn/ui + Framer Motion + Express + MongoDB
> **Dir:** `C:\Users\Anish\Desktop\Cozy Cafe`

## Live URLs
| Service | URL | Status |
|---------|-----|--------|
| Client (Vercel) | https://client-two-mu-19.vercel.app | ✅ Deployed |
| API (Railway) | https://api-production-d37f.up.railway.app | ✅ Deployed |
| MongoDB (Railway) | Internal (mongodb.railway.internal) | ✅ Connected |
| GitHub | https://github.com/Anish29801/cozy-coffee | ✅ Pushed |

## What We're Building
A $10,000 handcrafted NextJS website for a coffee café client. Not a template. Must feel premium, warm, editorial, and human. Every pixel should say "come sit, stay awhile."

## Architecture

### Client (Next.js — Vercel)
- `app/(marketing)/` — public site (Home, Menu, Story, Visit, Journal, Reserve)
- `app/admin/page.tsx` — admin dashboard with 4 tabs (Menu, Reservations, Newsletter, Testimonials)
- `components/ui/` — shadcn primitives
- `components/site/` — bespoke café components (Hero, MenuBoard, StoryStrip, Gallery, Reservation)
- `components/site/admin/` — admin CRUD panels (MenuAdmin, ReservationsAdmin, NewsletterAdmin, TestimonialsAdmin)
- `lib/api.ts` — API client using `NEXT_PUBLIC_API_URL` env var (falls back to `http://localhost:8080`)
- `content/` — MDX for journal posts
- `public/` — optimized images, textures

### Server (Express — Railway)
- `server/src/index.ts` — entry point (connects MongoDB, starts on :8080)
- `server/src/app.ts` — Express app factory (used by tests and server)
- `server/src/config/` — env.ts (Zod parsing), db.ts (Mongoose connect), cors.ts
- `server/src/models/` — Mongoose schemas: Subscriber, Reservation, MenuItem, Testimonial
- `server/src/middleware/` — error-handler.ts, rate-limiter.ts, request-logger.ts, validation.ts
- `server/src/routes/` — health, newsletter, reservations, menu, testimonials
- `server/src/schemas/` — Zod validation schemas (CreateSubscriber, CreateReservation, CreateMenuItem, CreateTestimonial)
- `server/src/services/` — business logic (subscriber-service, reservation-service, menu-service, testimonial-service)
- `server/src/lib/` — errors.ts (AppError hierarchy), async-handler.ts, types.ts
- `server/seed.ts` — seed script (5 menu items + 3 testimonials)
- `server/__tests__/` — 33 Vitest tests (health, menu, newsletter, reservations, testimonials)

## Commands

### Client
```bash
cd client
npm run dev        # next dev (port 3000)
npm run build      # next build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

### Server
```bash
cd server
npm run dev        # tsx watch src/index.ts (port 8080)
npm run build      # tsc (compiles to dist/)
npm run start      # node dist/index.js
npm run test       # vitest run (33 tests)
npm run typecheck  # tsc --noEmit
```

## API Endpoints
All responses use `ApiResponse<T>` shape: `{ success, data, error, meta }`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | DB status, uptime, memory |
| POST | `/api/newsletter/subscribe` | Subscribe email |
| DELETE | `/api/newsletter/unsubscribe/:token` | Unsubscribe |
| GET | `/api/newsletter/subscribers` | List subscribers (admin) |
| GET | `/api/newsletter/stats` | Subscriber stats |
| POST | `/api/reservations` | Create reservation |
| GET | `/api/reservations` | List reservations (admin) |
| GET | `/api/reservations/:id` | Get single reservation |
| PATCH | `/api/reservations/:id/status` | Update status |
| DELETE | `/api/reservations/:id` | Cancel reservation |
| GET | `/api/reservations/available?date=YYYY-MM-DD` | Check slot availability |
| GET | `/api/menu` | List menu items (filterable by category) |
| GET | `/api/menu/:slug` | Get single menu item |
| GET | `/api/menu/categories` | List available categories |
| POST | `/api/menu` | Create menu item (admin) |
| PATCH | `/api/menu/:id` | Update menu item (admin) |
| DELETE | `/api/menu/:id` | Delete menu item (admin) |
| GET | `/api/testimonials` | List active testimonials |
| GET | `/api/testimonials/all` | List all testimonials (admin) |
| GET | `/api/testimonials/:id` | Get single testimonial |
| POST | `/api/testimonials` | Create testimonial (admin) |
| PATCH | `/api/testimonials/:id` | Update testimonial (admin) |
| DELETE | `/api/testimonials/:id` | Delete testimonial (admin) |

## Menu Categories
`espresso`, `filter`, `specialty`, `cold_drinks`, `pastries`, `light_bite`, `lunch`

## Rules
- Read `DESIGN.md` before touching any UI. It is the source of truth.
- Keep App Router conventions: `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`.
- Server Components by default; `"use client"` only for motion/interaction.
- Strict TypeScript — no `any`, no `unwrap`, no `panic`.
- After each batch: update `DESIGN.md` if UX changed, then run verification.
- Server-side: Zod validates every request, Mongoose handles DB, asyncHandler wraps all routes.
- Rate limiter: 5/min for forms, 100/min general (bypassed in test env via `NODE_ENV === 'test'`).

## Compatibility
This file keeps the codebase readable for Claude Code, opencode, Cursor, and AGY.
