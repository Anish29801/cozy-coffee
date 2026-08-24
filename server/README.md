# Server — Cozy Coffee Café API

> Express + TypeScript + MongoDB API server running on **port 8080**
> Handles newsletter subscriptions, reservation tracking, and menu management.

## Quick Start

```bash
cd server
npm install

# Create .env from template
cp .env.example .env

# Start with Docker (API + MongoDB)
docker-compose up

# Or start dev without Docker (if MongoDB is local)
npm run dev
```

Server runs at `http://localhost:8080`
Health check: `http://localhost:8080/health`

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload (tsx watch) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Run compiled server in production |
| `npm run typecheck` | Check types without building |
| `npm run test` | Run Vitest tests |
| `npm run lint` | Run ESLint |

## API Endpoints

### Health
- `GET /health` — DB status, uptime, memory

### Newsletter
- `POST /api/newsletter/subscribe` — Subscribe email
- `DELETE /api/newsletter/unsubscribe/:token` — Unsubscribe
- `GET /api/newsletter/subscribers` — List subscribers (admin)
- `GET /api/newsletter/stats` — Subscriber stats

### Reservations
- `POST /api/reservations` — Create reservation
- `GET /api/reservations` — List reservations (admin)
- `GET /api/reservations/:id` — Get single reservation
- `PATCH /api/reservations/:id/status` — Update status
- `DELETE /api/reservations/:id` — Cancel reservation
- `GET /api/reservations/available?date=YYYY-MM-DD` — Check slot availability

### Menu
- `GET /api/menu` — List menu items (filterable by category)
- `GET /api/menu/:slug` — Get single menu item
- `GET /api/menu/categories` — List available categories
- `POST /api/menu` — Create menu item (admin)
- `PATCH /api/menu/:id` — Update menu item (admin)
- `DELETE /api/menu/:id` — Delete menu item (admin)

## Project Structure

```
src/
├── index.ts              — Entry point (connects MongoDB, starts on :8080)
├── app.ts                — Express app factory
├── config/               — Env validation, DB connection, CORS
├── models/               — Mongoose schemas (Subscriber, Reservation, MenuItem)
├── middleware/            — Error handler, rate limiter, validation, logging
├── routes/               — Express route handlers
├── schemas/              — Zod validation schemas
├── services/             — Business logic (no Express req/res)
└── lib/                  — Errors, types, shared utilities
```

## Environment Variables

See `.env.example` for all required variables:

- `PORT` — Server port (default: 8080)
- `MONGODB_URI` — MongoDB connection string
- `CORS_ORIGINS` — Allowed origins (comma-separated)
- `JWT_SECRET` — Secret for JWT tokens (32+ chars)
- `RESEND_API_KEY` — (Optional) For sending emails
- `ADMIN_EMAIL` — (Optional) Admin notification email
