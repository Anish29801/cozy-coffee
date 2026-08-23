# AGENTS.md — Project Context for Agentic Tooling

> **For:** opencode, Cursor, AGY, Antigravity & all code agents
> **Project:** Cozy Coffee Café — $10k Premium NextJS Website

## Context
Build a premium coffee café website that feels like a warm hug. Client keywords: **friendly, welcoming, warmth, togetherness**. Budget signals: editor-level craft. Every decision must justify $10k.

## How to Work Here
- **Read `DESIGN.md` first** before any UI/UX work. Do not deviate.
- **Read `PLAN.md` first** before starting build. Follow phased execution.
- **Read `CLAUDE.md`** for stack and architecture map.

## Agent Roster & Ownership
| Agent | Owns |
|-------|------|
| @Shilpi | `DESIGN.md`, UX decisions, vibe |
| @Nirman | App Router, layouts, route structure |
| @Rachana | `components/site/*`, keeps DESIGN.md in sync |
| @Sutra | Types & validation |
| @Setu | APIs, reservations, newsletter |
| @Kosha | Content schema if CMS chosen |
| @Pariksha | Tests & verification |
| @Rakshak | Security (read-only) |
| @Vivek | Code review (read-only) |
| @Granth | README / docs |
| @Lekhak | `ai_context/` & prompt tuning |
| @Daksh | Git push |
| @Agni | Deploy (Vercel primary, Railway alt) |

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
- Content: `content/` (MDX first, Sanity optional per PLAN.md)
- Assets: `public/images/`, `public/textures/`

## Brand Voice for Code Comments/Copy
Warm, human, concise. Like a barista remembering your name.

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
