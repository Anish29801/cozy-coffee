# Server — Cozy Coffee (placeholder)

This folder is reserved for future backend services (orders, reservations API, etc.).

For now the Next.js app in `../client` handles:
- `/api/reserve` and `/api/newsletter` (Route Handlers)
- Menu/journal via `content/` MDX

When you add a real server (Express, Fastify, etc.):
```bash
cd server
npm init -y
npm install express cors zod
```

Update root `tasks.md` and `PLAN.md` accordingly.
