# AGENTS.md — Project Context for Agentic Tooling

> **For:** opencode, Cursor, AGY, Antigravity & all code agents
> **Project:** Cozy Coffee Café — $10k Premium NextJS Website

## Context
Build a premium coffee café website that feels like a warm hug. Client keywords: **friendly, welcoming, warmth, togetherness**. Budget signals: editor-level craft. Every decision must justify $10k.

## Live URLs
| Service | URL | Env |
|---------|-----|-----|
| Client (Vercel) | https://client-two-mu-19.vercel.app | Production |
| API (Railway) | https://api-production-d37f.up.railway.app | Production |
| MongoDB (Railway) | Internal only (`mongodb.railway.internal`) | Production |
| GitHub | https://github.com/Anish29801/cozy-coffee | master |

## How to Work Here
- **Read `DESIGN.md` first** before any UI/UX work. Do not deviate.
- **Read `PLAN.md` first** before starting build. Follow phased execution.
- **Read `CLAUDE.md`** for stack, architecture map, and API endpoints.

## Agent Roster & Ownership
| Agent | Owns |
|-------|------|
| @Shilpi | `DESIGN.md`, UX decisions, vibe |
| @Nirman | App Router, layouts, route structure |
| @Rachana | `components/site/*`, keeps DESIGN.md in sync |
| @Sutra | Types & validation |
| @Setu | APIs, reservations, newsletter, Express server |
| @Kosha | Content schema if CMS chosen |
| @Pariksha | Tests & verification (33 Vitest tests) |
| @Rakshak | Security (read-only) |
| @Vivek | Code review (read-only) |
| @Granth | README / docs |
| @Lekhak | `ai_context/` & prompt tuning |
| @Daksh | Git push |
| @Agni | Deploy (Vercel for client, Railway for API) |

## Architecture Overview
### Client (Next.js — Vercel)
- `app/(marketing)/` — public site (Home, Menu, Story, Visit, Journal, Reserve)
- `app/admin/page.tsx` — admin dashboard with 4 tabs
- `components/site/admin/` — CRUD panels (MenuAdmin, ReservationsAdmin, NewsletterAdmin, TestimonialsAdmin)
- `lib/api.ts` — API client using `NEXT_PUBLIC_API_URL` env var

### Server (Express — Railway)
- `server/src/app.ts` — Express app factory
- `server/src/models/` — Mongoose: Subscriber, Reservation, MenuItem, Testimonial
- `server/src/routes/` — health, newsletter, reservations, menu, testimonials
- `server/src/schemas/` — Zod validation
- `server/src/services/` — business logic
- `server/src/lib/` — errors, async-handler, types

## Execution Rules
1. Never start code until `CLAUDE.md` + `AGENTS.md` + `DESIGN.md` exist — they do now.
2. Work in batches of 3 tasks (see `PLAN.md` phases).
3. Server Components by default; `"use client"` only for motion/interaction.
4. Strict TypeScript, no `any`.
5. After each batch: update `DESIGN.md` if UX changed, then run verification.

## Paths
- Public site: `app/(marketing)/`
- Primitives: `components/ui/`
- Bespoke: `components/site/`
- Admin panels: `components/site/admin/`
- API client: `lib/api.ts`
- Server: `server/src/`
- Content: `content/` (MDX)
- Assets: `public/images/`, `public/textures/`

## Menu Categories
`espresso`, `filter`, `specialty`, `cold_drinks`, `pastries`, `light_bite`, `lunch`

## Brand Voice for Code Comments/Copy
Warm, human, concise. Like a barista remembering your name.

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
