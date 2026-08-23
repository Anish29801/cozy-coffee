# CLAUDE.md — Project Context for Claude Code

> **Project:** Cozy Coffee Café — Premium NextJS Website ($10k tier)
> **Vibe:** Friendly, welcoming, warmth, togetherness — the digital living room
> **Stack:** Next.js 16.3.2 (App Router) + TypeScript + Tailwind CSS 4 + shadcn/ui + Framer Motion
> **Dir:** `C:\Users\Anish\Desktop\New folder`

## What We're Building
A $10,000 handcrafted NextJS website for a coffee café client. Not a template. Must feel premium, warm, editorial, and human. Every pixel should say "come sit, stay awhile."

## Core Emotions → Product Decisions
- **Friendly:** Conversational copy, rounded forms, human photography, no corporate stiffness.
- **Welcoming:** Immediate warmth on hero — steam, wood, natural light, not stock cold brew flat-lay.
- **Warmth:** Palette: toasted neutrals, warm wood, clay, cream. Typography that feels handwritten but legible.
- **Togetherness:** Community-first IA — stories, regulars, tables, not just menu.

## Architecture (App Router)
- `app/(marketing)/` — public site (Home, Menu, Story, Visit, Journal)
- `app/api/` — reservations/newsletter if needed
- `components/ui/` — shadcn primitives
- `components/site/` — bespoke café components (Hero, MenuBoard, StoryStrip, Gallery, Reservation)
- `lib/` — utils, content, seo
- `content/` — MDX or Sanity for menu/journal (decide in PLAN.md)
- `public/` — optimized images, textures

## Commands
```bash
npm run dev      # next dev
npm run build    # next build
npm run lint     # eslint
npm run typecheck # tsc --noEmit
```

## Rules for Claude
- Read `DESIGN.md` before touching any UI. It is the source of truth.
- Keep App Router conventions: `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`.
- Use Server Components by default; Client only for motion/interaction.
- No `any`, strict types via @Sutra standards.
- Update AGENTS.md and DESIGN.md when structure or UX changes.

## Compatibility
This file keeps the codebase readable for Claude Code, opencode, Cursor, and AGY.

---
