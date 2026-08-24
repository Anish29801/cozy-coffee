# PLAN.md — Cozy Coffee Café — Server (Node + Express + TypeScript + MongoDB)

> **Status:** Draft — 2026-08-24
> **Dir:** `C:\Users\Anish\Desktop\Cozy Cafe\server`
> **Client:** `../client` (Next.js 15 App Router — Phase 3 complete)
> **Port:** `8080`
> **Database:** MongoDB (Mongoose ODM)
> **Orchestrator:** Vishvakarama · Contributors: @Setu (APIs), @Kosha (schema), @Sutra (types), @Rakshak (security)

---

## 0. Executive Summary

Build a **focused Express + TypeScript API server** running on **port 8080** that:

- **Stores newsletter email IDs** — subscribe, unsubscribe, manage subscribers in MongoDB.
- **Tracks reservations** — full lifecycle: create, confirm, cancel, view, with conflict detection.
- **Replaces** the lightweight Next.js Route Handlers (`/api/reserve`, `/api/newsletter`) with a real backend.
- **Deployable** via Docker or Railway, env-var driven, zero hardcoded secrets.

**Scope:** Newsletter + Reservations. Not a full CMS. The Next.js client handles menu/journal via MDX — the server handles the **data operations** that need persistence.

**One sentence test:** Can the client collect emails and track reservations without touching code? Yes.

---

## 1. Goals

| Goal | What It Means |
|------|---------------|
| **Collect newsletter emails** | Validated subscribe endpoint, duplicate detection, unsubscribe via token |
| **Track reservations** | Create, confirm, cancel, list — with date/time/party conflict detection |
| **Store in MongoDB** | Mongoose schemas, indexed queries, connection pooling |
| **Validate everything** | Zod on every input — no bad data enters the DB |
| **Secure by default** | Rate limiting, CORS, helmet, honeypot, input sanitization |
| **Observable** | Health check with DB status, structured logging, error tracking |
| **Easy to run** | `docker-compose up` gives you API + MongoDB locally |

### Success Metrics

- `GET /health` returns 200 with `{ db: "connected" }`
- `POST /api/newsletter/subscribe` stores email in MongoDB, rejects duplicates
- `POST /api/reservations` stores reservation, detects time slot conflicts
- Rate limiting blocks abuse (5 req/min on form endpoints)
- `tsc --noEmit` passes with zero errors
- `docker-compose up` starts server + MongoDB with no manual steps

---

## 2. Architecture

```
┌─────────────────┐          ┌──────────────────┐          ┌───────────┐
│   Next.js       │  fetch   │  Express Server  │  mongoose │  MongoDB  │
│   (client/)     │────────▶│  :8080           │────────▶│  (local/  │
│   Vercel        │         │  (server/)       │          │  Atlas)   │
└─────────────────┘         └──────────────────┘          └───────────┘
        │                          │
        │                          ├──▶ Email (Resend) — reservation confirmations
        │                          └──▶ Logging (Pino)
        │
        └─── Static content (MDX) stays in Next.js
             Server handles newsletter + reservations only
```

### What Lives Where

| Next.js (client/) | Express Server (server/) |
|-------------------|--------------------------|
| Menu/journal MDX rendering | Newsletter subscribe/unsubscribe |
| Static pages (Home, Menu, Story, Visit) | Reservation CRUD + conflict detection |
| Form UI + client-side validation | Server-side validation + persistence |
| `/api/reserve` (current — will be replaced) | `/api/reservations` (new) |
| `/api/newsletter` (current — will be replaced) | `/api/newsletter` (new) |

---

## 3. Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Runtime** | Node.js 20+ LTS | Stable, excellent TS support |
| **Framework** | Express 4.21+ | Battle-tested, simple, huge ecosystem |
| **Language** | TypeScript 5.5+ strict | No `any`, full type safety — matches client |
| **Database** | MongoDB 7 (Atlas or local) | Flexible schema, fast iteration, free tier |
| **ODM** | Mongoose 8.x | Schema validation, middleware, type generation |
| **Validation** | Zod 3.x | Runtime + static validation, shared with client |
| **Auth** | jose (JWT) + bcrypt | Lightweight JWT for admin routes |
| **Email** | Resend | Modern, fast, generous free tier |
| **Rate Limiting** | express-rate-limit | Simple, per-route configurable |
| **Security** | helmet + cors + hpp | HTTP security headers |
| **Logging** | pino + pino-http | Fast structured JSON logs |
| **Testing** | Vitest + Supertest | TS-native, fast, matches client |
| **Build** | tsc | Clean JS output |
| **Process** | tsx (dev) + node (prod) | Fast dev reload |
| **Docker** | docker-compose | API + MongoDB in one command |

---

## 4. Project Structure

```
server/
├── src/
│   ├── index.ts                 — Entry: connect DB → start server on :8080
│   ├── app.ts                   — Express app factory (middleware + routes)
│   │
│   ├── config/
│   │   ├── env.ts               — Zod-validated env vars (never process.env)
│   │   ├── cors.ts              — CORS origins whitelist
│   │   └── database.ts          — Mongoose connection + connection events
│   │
│   ├── models/                  — Mongoose schemas & models
│   │   ├── Subscriber.ts        — Newsletter subscriber model
│   │   ├── Reservation.ts       — Reservation model
│   │   └── index.ts             — Re-export all models
│   │
│   ├── middleware/
│   │   ├── error-handler.ts     — Global error handler (ZodError, MongooseError, custom)
│   │   ├── rate-limiter.ts      — Per-route rate limits
│   │   ├── validate.ts          — Zod validation middleware (body, query, params)
│   │   └── request-logger.ts    — Pino HTTP logger
│   │
│   ├── routes/
│   │   ├── index.ts             — Route registry (mount sub-routers)
│   │   ├── health.ts            — GET /health (DB ping, uptime, memory)
│   │   ├── newsletter.ts        — POST subscribe, DELETE unsubscribe, GET list
│   │   └── reservations.ts      — POST create, GET list, PATCH status, GET available
│   │
│   ├── schemas/                 — Zod validation schemas
│   │   ├── newsletter.ts        — SubscribeEmail, UnsubscribeToken
│   │   ├── reservation.ts       — CreateReservation, UpdateReservation, ReservationQuery
│   │   └── common.ts            — PaginationQuery, ApiResponse<T>
│   │
│   ├── services/                — Business logic (no Express req/res)
│   │   ├── newsletter.service.ts — subscribe, unsubscribe, isDuplicate, listAll
│   │   ├── reservation.service.ts — create, list, updateStatus, findConflicts, available
│   │   └── email.service.ts     — Resend wrapper (confirmation, welcome)
│   │
│   ├── lib/
│   │   ├── errors.ts            — AppError, NotFoundError, ConflictError, ValidationError
│   │   ├── tokens.ts            — JWT sign/verify (admin auth tokens)
│   │   └── types.ts             — ApiResponse<T>, PaginatedResponse<T>
│   │
│   └── jobs/
│       └── cleanup.ts           — Expired token cleanup (optional cron)
│
├── tests/
│   ├── setup.ts                 — Vitest setup (test DB connection, cleanup after each)
│   ├── helpers.ts               — createTestApp(), authHeader(), seedData()
│   ├── newsletter.test.ts       — Subscribe, duplicate, unsubscribe
│   ├── reservations.test.ts     — Create, conflict, status update, list
│   └── health.test.ts           — Health check response shape
│
├── Dockerfile                   — Multi-stage (build → production)
├── docker-compose.yml           — API (:8080) + MongoDB (:27017)
├── .env.example                 — Required env vars
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── vitest.config.ts
└── README.md
```

---

## 5. Database Schema (Mongoose)

### 5.1 Newsletter Subscriber

```typescript
// src/models/Subscriber.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriber extends Document {
  email: string;
  name?: string;
  unsubToken: string;
  active: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const subscriberSchema = new Schema<ISubscriber>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
      index: true,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    unsubToken: {
      type: String,
      required: true,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    active: {
      type: Boolean,
      default: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    unsubscribedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

// Index for fast lookups
subscriberSchema.index({ email: 1 }, { unique: true });
subscriberSchema.index({ active: 1 });
subscriberSchema.index({ unsubToken: 1 });

export const Subscriber = mongoose.model<ISubscriber>('Subscriber', subscriberSchema);
```

### 5.2 Reservation

```typescript
// src/models/Reservation.ts

import mongoose, { Schema, Document } from 'mongoose';

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';

export interface IReservation extends Document {
  name: string;
  email: string;
  phone?: string;
  date: Date;
  time: string;           // "18:00"
  partySize: number;
  notes?: string;
  status: ReservationStatus;
  confirmToken: string;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const reservationSchema = new Schema<IReservation>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-]{7,20}$/, 'Invalid phone number'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      validate: {
        validator: (v: Date) => v >= new Date(new Date().toDateString()),
        message: 'Date must be today or later',
      },
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
      match: [/^\d{2}:\d{2}$/, 'Time must be HH:MM format'],
    },
    partySize: {
      type: Number,
      required: true,
      min: [1, 'Minimum party size is 1'],
      max: [20, 'Maximum party size is 20'],
      default: 2,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no_show'],
      default: 'pending',
    },
    confirmToken: {
      type: String,
      required: true,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    cancelledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index: find conflicts (same date + time, not cancelled)
reservationSchema.index({ date: 1, time: 1, status: 1 });
reservationSchema.index({ email: 1 });
reservationSchema.index({ status: 1 });
reservationSchema.index({ date: 1 }); // for "today's reservations" query

export const Reservation = mongoose.model<IReservation>('Reservation', reservationSchema);
```

---

## 6. API Endpoints

### 6.1 Health

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/health` | No | DB status, uptime, memory |

```json
// GET http://localhost:8080/health
{
  "success": true,
  "data": {
    "status": "healthy",
    "database": "connected",
    "uptime": 86400,
    "memory": { "rss": 45.2, "heapUsed": 22.8 },
    "timestamp": "2026-08-24T10:00:00.000Z"
  }
}
```

### 6.2 Newsletter

| Method | Path | Auth | Rate Limit | Description |
|--------|------|------|------------|-------------|
| `POST` | `/api/newsletter/subscribe` | No | 5/min | Subscribe email |
| `DELETE` | `/api/newsletter/unsubscribe/:token` | Token | 10/min | Unsubscribe via link |
| `GET` | `/api/newsletter/subscribers` | Admin | 30/min | List all active subscribers |
| `GET` | `/api/newsletter/stats` | Admin | 30/min | Subscriber count, growth |

#### POST /api/newsletter/subscribe

```json
// Request
{
  "email": "sarah@example.com",
  "name": "Sarah",
  "honeypot": ""
}

// Response 201
{
  "success": true,
  "data": {
    "message": "Welcome to the Cozy Coffee family!",
    "email": "sarah@example.com"
  }
}

// Response 409 (duplicate)
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "This email is already subscribed"
  }
}
```

#### DELETE /api/newsletter/unsubscribe/:token

```json
// Response 200
{
  "success": true,
  "data": {
    "message": "You've been unsubscribed. We'll miss you!"
  }
}

// Response 404 (invalid token)
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Invalid unsubscribe link"
  }
}
```

### 6.3 Reservations

| Method | Path | Auth | Rate Limit | Description |
|--------|------|------|------------|-------------|
| `POST` | `/api/reservations` | No | 5/min | Create reservation |
| `GET` | `/api/reservations` | Admin | 30/min | List all (paginated, filterable) |
| `GET` | `/api/reservations/:id` | Admin | 30/min | Get single reservation |
| `PATCH` | `/api/reservations/:id/status` | Admin | 20/min | Update status |
| `DELETE` | `/api/reservations/:id` | Admin | 10/min | Cancel reservation |
| `GET` | `/api/reservations/available` | No | 20/min | Check slot availability |

#### POST /api/reservations

```json
// Request
{
  "name": "Sarah",
  "email": "sarah@example.com",
  "phone": "+1234567890",
  "date": "2026-08-30",
  "time": "18:00",
  "partySize": 4,
  "notes": "Window seat if possible",
  "honeypot": ""
}

// Response 201
{
  "success": true,
  "data": {
    "id": "66a1b2c3d4e5f6...",
    "name": "Sarah",
    "date": "2026-08-30",
    "time": "18:00",
    "partySize": 4,
    "status": "pending",
    "confirmToken": "abc123...",
    "message": "Reservation received! Check your email for confirmation."
  }
}

// Response 409 (conflict — slot full)
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "That time slot is fully booked. Try another time?"
  }
}
```

#### GET /api/reservations/available?date=2026-08-30&partySize=4

```json
// Response 200
{
  "success": true,
  "data": {
    "date": "2026-08-30",
    "partySize": 4,
    "availableSlots": [
      "17:00", "17:30", "19:00", "19:30", "20:00"
    ],
    "bookedSlots": [
      "18:00", "18:30"
    ]
  }
}
```

#### PATCH /api/reservations/:id/status

```json
// Request
{ "status": "confirmed" }

// Response 200
{
  "success": true,
  "data": {
    "id": "66a1b2c3d4e5f6...",
    "status": "confirmed",
    "message": "Reservation confirmed"
  }
}
```

### 6.4 Shared Response Shape

All endpoints return:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;       // VALIDATION_ERROR | CONFLICT | NOT_FOUND | etc.
    message: string;    // Human-readable
    details?: Record<string, string[]>; // Zod field errors
  };
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### Error Codes

| Code | HTTP | When |
|------|------|------|
| `VALIDATION_ERROR` | 400 | Zod rejects input |
| `HONEYPOT_DETECTED` | 400 | Bot filled hidden field |
| `UNAUTHORIZED` | 401 | Missing/invalid token |
| `NOT_FOUND` | 404 | Resource doesn't exist |
| `CONFLICT` | 409 | Duplicate email, full slot |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Unexpected failure |

---

## 7. Middleware Stack

```typescript
// src/app.ts — middleware order

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import { pinoHttp } from 'pino-http';
import { connectDB } from './config/database';
import { env } from './config/env';
import { errorHandler } from './middleware/error-handler';
import { createRateLimiter } from './middleware/rate-limiter';
import { routes } from './routes';

export function createApp() {
  const app = express();

  // 1. Security headers
  app.use(helmet());

  // 2. CORS
  app.use(cors({
    origin: env.CORS_ORIGINS.split(','),
    credentials: true,
  }));

  // 3. Body parsing (10kb limit — forms only, no file uploads)
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // 4. HTTP parameter pollution protection
  app.use(hpp());

  // 5. Request logging
  app.use(pinoHttp());

  // 6. Global rate limiter
  app.use(createRateLimiter({ windowMs: 60_000, max: 100 }));

  // 7. Routes
  app.use('/', routes);

  // 8. 404
  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Route not found' },
    });
  });

  // 9. Error handler (must be last)
  app.use(errorHandler);

  return app;
}
```

---

## 8. Validation Strategy

Every endpoint uses Zod schemas. The `validate` middleware parses + strips extra fields before business logic runs:

```typescript
// src/middleware/validate.ts

import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export function validate(schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req[source] = schema.parse(req[source]);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input',
            details: err.flatten().fieldErrors,
          },
        });
        return;
      }
      next(err);
    }
  };
}
```

### Schemas

```typescript
// src/schemas/newsletter.ts

import { z } from 'zod';

export const SubscribeSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  name: z.string().max(100).optional(),
  honeypot: z.string().max(0, 'Bot detected').optional().default(''),
});

export type SubscribeInput = z.infer<typeof SubscribeSchema>;
```

```typescript
// src/schemas/reservation.ts

import { z } from 'zod';

export const CreateReservationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^\+?[\d\s-]{7,20}$/, 'Invalid phone').optional(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD')
    .refine(
      (d) => new Date(d) >= new Date(new Date().toDateString()),
      'Date must be today or later'
    ),
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Time must be HH:MM')
    .refine(
      (t) => {
        const [h] = t.split(':').map(Number);
        return h >= 7 && h <= 22;
      },
      'Kitchen hours: 7am–10pm'
    ),
  partySize: z.number().int().min(1).max(20),
  notes: z.string().max(500).optional(),
  honeypot: z.string().max(0, 'Bot detected').optional().default(''),
});

export const UpdateStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed', 'no_show']),
});

export const ReservationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed', 'no_show']).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
```

---

## 9. Services (Business Logic)

```typescript
// src/services/newsletter.service.ts

import { Subscriber } from '../models/Subscriber';
import { AppError, ConflictError, NotFoundError } from '../lib/errors';

export const newsletterService = {
  async subscribe(email: string, name?: string) {
    const existing = await Subscriber.findOne({ email, active: true });
    if (existing) {
      throw new ConflictError('This email is already subscribed');
    }

    // Reactivate if previously unsubscribed
    const reactivated = await Subscriber.findOneAndUpdate(
      { email, active: false },
      { active: true, unsubscribedAt: null, name },
      { new: true }
    );

    if (reactivated) {
      return { email: reactivated.email, message: 'Welcome back!' };
    }

    const subscriber = await Subscriber.create({ email, name });
    return { email: subscriber.email, message: 'Welcome to the Cozy Coffee family!' };
  },

  async unsubscribe(token: string) {
    const subscriber = await Subscriber.findOne({ unsubToken: token, active: true });
    if (!subscriber) {
      throw new NotFoundError('Invalid unsubscribe link');
    }

    subscriber.active = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    return { message: "You've been unsubscribed. We'll miss you!" };
  },

  async listActive(page = 1, limit = 20) {
    const total = await Subscriber.countDocuments({ active: true });
    const subscribers = await Subscriber.find({ active: true })
      .sort({ subscribedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('email name subscribedAt')
      .lean();

    return { subscribers, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async getStats() {
    const totalActive = await Subscriber.countDocuments({ active: true });
    const totalUnsubscribed = await Subscriber.countDocuments({ active: false });
    const thisMonth = await Subscriber.countDocuments({
      active: true,
      subscribedAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
    });

    return { totalActive, totalUnsubscribed, thisMonth };
  },
};
```

```typescript
// src/services/reservation.service.ts

import { Reservation, IReservation } from '../models/Reservation';
import { ConflictError, NotFoundError } from '../lib/errors';

// Max reservations per time slot (configurable)
const MAX_PER_SLOT = 3;

export const reservationService = {
  async create(data: {
    name: string; email: string; phone?: string;
    date: string; time: string; partySize: number; notes?: string;
  }) {
    // Check for slot conflict
    const conflicts = await Reservation.countDocuments({
      date: new Date(data.date),
      time: data.time,
      status: { $in: ['pending', 'confirmed'] },
    });

    if (conflicts >= MAX_PER_SLOT) {
      throw new ConflictError('That time slot is fully booked. Try another time?');
    }

    const reservation = await Reservation.create({
      ...data,
      date: new Date(data.date),
    });

    return {
      id: reservation._id,
      name: reservation.name,
      date: data.date,
      time: reservation.time,
      partySize: reservation.partySize,
      status: reservation.status,
      confirmToken: reservation.confirmToken,
      message: 'Reservation received! Check your email for confirmation.',
    };
  },

  async list(query: {
    page?: number; limit?: number; status?: string; date?: string;
  }) {
    const { page = 1, limit = 20, status, date } = query;
    const filter: Record<string, unknown> = {};

    if (status) filter.status = status;
    if (date) filter.date = new Date(date);

    const total = await Reservation.countDocuments(filter);
    const reservations = await Reservation.find(filter)
      .sort({ date: -1, time: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return { reservations, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async getById(id: string) {
    const reservation = await Reservation.findById(id).lean();
    if (!reservation) throw new NotFoundError('Reservation not found');
    return reservation;
  },

  async updateStatus(id: string, status: IReservation['status']) {
    const update: Record<string, unknown> = { status };
    if (status === 'cancelled') update.cancelledAt = new Date();

    const reservation = await Reservation.findByIdAndUpdate(id, update, { new: true });
    if (!reservation) throw new NotFoundError('Reservation not found');

    return { id: reservation._id, status: reservation.status };
  },

  async delete(id: string) {
    const reservation = await Reservation.findByIdAndDelete(id);
    if (!reservation) throw new NotFoundError('Reservation not found');
    return { message: 'Reservation removed' };
  },

  async getAvailableSlots(date: string, partySize: number) {
    const allSlots = [
      '07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30',
      '11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30',
      '15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30',
      '19:00','19:30','20:00','20:30','21:00','21:30',
    ];

    const booked = await Reservation.find({
      date: new Date(date),
      status: { $in: ['pending', 'confirmed'] },
    }).distinct('time');

    const bookedSet = new Set(booked);
    const available = allSlots.filter((s) => !bookedSet.has(s));
    const bookedSlots = allSlots.filter((s) => bookedSet.has(s));

    return { date, partySize, availableSlots: available, bookedSlots };
  },
};
```

---

## 10. Entry Point

```typescript
// src/index.ts

import { createApp } from './app';
import { connectDB } from './config/database';
import { env } from './config/env';

async function main() {
  // 1. Connect to MongoDB
  await connectDB();

  // 2. Create Express app
  const app = createApp();

  // 3. Start server on port 8080
  app.listen(env.PORT, () => {
    console.log(`☕ Cozy Coffee API running on http://localhost:${env.PORT}`);
    console.log(`📊 Health: http://localhost:${env.PORT}/health`);
    console.log(`🌍 Environment: ${env.NODE_ENV}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
```

```typescript
// src/config/env.ts

import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGODB_URI: z.string().url('Invalid MongoDB URI'),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
  JWT_SECRET: z.string().min(32, 'JWT secret must be 32+ chars'),
  RESEND_API_KEY: z.string().optional(),
  ADMIN_EMAIL: z.string().email().optional(),
});

export const env = envSchema.parse(process.env);
```

```typescript
// src/config/database.ts

import mongoose from 'mongoose';
import { env } from './env';

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
}
```

---

## 11. Environment Variables

```bash
# .env.example

# ─── Server ──────────────────────────────────
PORT=8080
NODE_ENV=development

# ─── MongoDB ─────────────────────────────────
MONGODB_URI=mongodb://localhost:27017/cozy_coffee
# For Atlas: mongodb+srv://<user>:<pass>@cluster.xxxxx.mongodb.net/cozy_coffee

# ─── CORS ────────────────────────────────────
CORS_ORIGINS=http://localhost:3000,https://cozycoffee.vercel.app

# ─── JWT (admin auth) ───────────────────────
JWT_SECRET=change-this-to-a-random-32-char-string

# ─── Email (optional) ───────────────────────
RESEND_API_KEY=re_...
ADMIN_EMAIL=admin@cozy.coffee
```

---

## 12. Docker Setup

```yaml
# docker-compose.yml

version: '3.8'

services:
  api:
    build: .
    ports:
      - "8080:8080"
    environment:
      - PORT=8080
      - NODE_ENV=development
      - MONGODB_URI=mongodb://mongo:27017/cozy_coffee
      - CORS_ORIGINS=http://localhost:3000
      - JWT_SECRET=dev-secret-change-in-production-min-32-chars
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    restart: unless-stopped

volumes:
  mongo-data:
```

```dockerfile
# Dockerfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/index.js"]
```

---

## 13. Commands

```bash
# Development
npm run dev          # tsx watch src/index.ts (hot reload)
npm run build        # tsc
npm run start        # node dist/index.js

# Database
# No migrations — MongoDB is schemaless
# Mongoose handles schema validation at the model level
# Use MongoDB Compass or mongosh for inspection

# Testing
npm run test         # vitest
npm run test:watch   # vitest --watch

# Linting
npm run lint         # eslint
npm run typecheck    # tsc --noEmit

# Docker
docker-compose up    # API (:8080) + MongoDB (:27017)
docker-compose down  # stop everything

# Production
npm run build && npm run start
```

---

## 14. Client ↔ Server Integration

The Next.js client (`../client`) will call this server:

| Client Route | Server Endpoint | What Changes |
|-------------|----------------|--------------|
| Newsletter footer | `POST http://localhost:8080/api/newsletter/subscribe` | Client fetch → this server |
| `/reserve` form | `POST http://localhost:8080/api/reservations` | Client fetch → this server |
| Unsubscribe link (email) | `DELETE http://localhost:8080/api/newsletter/unsubscribe/:token` | Email links here |

### Migration Steps

1. **Server builds first** — all endpoints tested independently with MongoDB.
2. **CORS configured** — server whitelists `http://localhost:3000` (dev) + Vercel URL (prod).
3. **Client updates gradually** — swap one Route Handler at a time.
4. **Graceful fallback** — if server is down, client shows "try again" instead of crashing.

---

## 15. Phased Execution Plan — Batch of 3

### Phase S1 — Scaffold & MongoDB (1 day)
**Goal:** Express + TS server running on :8080, connected to MongoDB, health check works.

| # | Task | Owner | Batch |
|---|------|-------|-------|
| S1.1 | `package.json` + `tsconfig.json` + `eslint.config.mjs` — init project, install deps (express, mongoose, zod, helmet, cors, pino, tsx) | @Setu | A |
| S1.2 | `src/config/env.ts` + `src/config/database.ts` + `src/index.ts` + `src/app.ts` — Zod env, Mongoose connection, Express app on port 8080 | @Setu | A |
| S1.3 | `src/models/Subscriber.ts` + `src/models/Reservation.ts` — Mongoose schemas with indexes + validation | @Kosha | A |
| S1.4 | `src/middleware/*` — error-handler, rate-limiter, validate, request-logger (4 middleware) | @Sutra | B |
| S1.5 | `src/lib/errors.ts` + `src/lib/types.ts` — custom error classes + ApiResponse<T> | @Sutra | B |
| S1.6 | `GET /health` route + `docker-compose.yml` + `Dockerfile` + `.env.example` — health check returns DB status | @Setu | B |

*Exit: `docker-compose up` → API on :8080, MongoDB on :27017, `/health` returns 200.*

### Phase S2 — Newsletter & Reservations (2 days)
**Goal:** Core features — email collection + reservation tracking.

| # | Task | Owner | Batch |
|---|------|-------|-------|
| S2.1 | `src/schemas/newsletter.ts` + `src/services/newsletter.service.ts` + `src/routes/newsletter.ts` — subscribe, unsubscribe, duplicate detection, stats | @Setu | A |
| S2.2 | `src/schemas/reservation.ts` + `src/services/reservation.service.ts` + `src/routes/reservations.ts` — create, conflict detection, status update, available slots | @Setu | A |
| S2.3 | `src/routes/index.ts` — mount all routes + honeypot middleware on form endpoints | @Sutra | A |
| S2.4 | `src/services/email.service.ts` — Resend integration (reservation confirmation, welcome email) | @Setu | B |
| S2.5 | `tests/newsletter.test.ts` + `tests/reservations.test.ts` + `tests/health.test.ts` — Vitest + Supertest | @Pariksha | B |
| S2.6 | `tests/setup.ts` + `tests/helpers.ts` — test DB connection, cleanup, test utilities | @Pariksha | B |

*Exit: Subscribe stores email in MongoDB, reservation detects conflicts, tests pass.*

### Phase S3 — Security, Polish & Deploy (1 day)
**Goal:** Production-ready, secure, documented.

| # | Task | Owner | Batch |
|---|------|-------|-------|
| S3.1 | Security pass: CORS whitelist, rate-limit tuning, honeypot on all forms, input sanitization | @Rakshak + @Setu | A |
| S3.2 | `README.md` — setup guide, env vars, API docs, docker instructions | @Granth | A |
| S3.3 | Docker multi-stage build test + `.env.example` finalization | @Setu | A |
| S3.4 | Code review + full tsc/lint + test suite pass | @Vivek + @Pariksha | B |
| S3.5 | Client integration: update `../client` newsletter + reservation forms to fetch `:8080` | @Nirman | B |
| S3.6 | Deploy: Railway or local Docker, env vars, CORS for production domain | @Agni + @Daksh | B |

*Exit: Server deployed, client connected, newsletter + reservations working end-to-end.*

---

## 16. Risk & Mitigations

| Risk | Mitigation |
|------|------------|
| MongoDB connection drops | Mongoose `autoReconnect`, connection event handlers, health check reflects status |
| Slot conflicts (double booking) | `countDocuments` before insert + compound index on date+time+status |
| Spam reservations | Honeypot field + rate limiting (5 req/min) + email validation |
| No SQL injection | Mongoose sanitizes queries; Zod validates all input before it reaches models |
| Email delivery fails | Resend retry + graceful error (reservation still saved, just no email) |
| Server down → client forms fail | Client shows "temporarily unavailable" + retries; forms work offline with localStorage |

---

## 17. Open Questions

- [ ] **MongoDB hosting:** Local Docker for dev, MongoDB Atlas free tier for prod?
- [ ] **Max reservations per slot:** Starting at 3 — adjust based on café capacity?
- [ ] **Email templates:** Simple HTML or branded with café design tokens?
- [ ] **Admin auth needed now?** Or just the public endpoints for MVP?
- [ ] **Reservation confirmation email:** Include calendar invite (.ics)?

---

**Ready for review.** Reply `approved — start Phase S1` to begin the server scaffold.

*Plan by Vishvakarama + @Setu (API) + @Kosha (schema) + @Sutra (types).*
