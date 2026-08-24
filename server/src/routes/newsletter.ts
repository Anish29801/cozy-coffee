import { Router, Request, Response } from 'express';
import { newsletterService } from '../services/newsletter.service';
import { SubscribeSchema } from '../schemas/newsletter';
import { validate } from '../middleware/validate';
import { formLimiter } from '../middleware/rate-limiter';
import { asyncHandler } from '../lib/async-handler';
import type { ApiResponse } from '../lib/types';

const router = Router();

// POST /api/newsletter/subscribe
router.post(
  '/subscribe',
  formLimiter,
  validate(SubscribeSchema, 'body'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, name } = req.body;
    const result = await newsletterService.subscribe(email, name);

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.status(201).json(response);
  })
);

// DELETE /api/newsletter/unsubscribe/:token
router.delete(
  '/unsubscribe/:token',
  formLimiter,
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const token = String(req.params.token ?? '');
    const result = await newsletterService.unsubscribe(token);

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.json(response);
  })
);

// GET /api/newsletter/subscribers
router.get('/subscribers', asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const result = await newsletterService.listActive();

  const response: ApiResponse<typeof result.subscribers> = {
    success: true,
    data: result.subscribers,
    meta: result.meta,
  };

  res.json(response);
}));

// GET /api/newsletter/stats
router.get('/stats', asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const stats = await newsletterService.getStats();

  const response: ApiResponse<typeof stats> = {
    success: true,
    data: stats,
  };

  res.json(response);
}));

export default router;
