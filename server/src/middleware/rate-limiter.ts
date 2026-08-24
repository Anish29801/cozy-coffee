import { Request, Response, NextFunction } from 'express';

// Simple in-memory rate limiter using a Map
// For production, use a Redis-backed store (e.g., rate-limit-redis)

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

interface RateLimiterOptions {
  windowMs: number;
  max: number;
}

export function createRateLimiter(options: RateLimiterOptions) {
  const { windowMs, max } = options;

  return (req: Request, res: Response, next: NextFunction): void => {
    if (process.env.NODE_ENV === 'test') { next(); return; }

    const key = `${req.ip}-${req.path}`;
    const now = Date.now();
    const entry = store.get(key);

    if (!entry || now > entry.resetAt) {
      store.set(key, { count: 1, resetAt: now + windowMs });
      res.setHeader('X-RateLimit-Limit', max);
      res.setHeader('X-RateLimit-Remaining', max - 1);
      next();
      return;
    }

    if (entry.count >= max) {
      res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many requests. Please try again later.',
        },
      });
      return;
    }

    entry.count++;
    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', max - entry.count);
    next();
  };
}

// Strict limiter for form submissions (5 req/min)
export const formLimiter = createRateLimiter({ windowMs: 60_000, max: 5 });

// General API limiter (100 req/min)
export const apiLimiter = createRateLimiter({ windowMs: 60_000, max: 100 });
