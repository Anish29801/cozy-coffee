import { Router, Request, Response } from 'express';
import { reservationService } from '../services/reservation.service';
import {
  CreateReservationSchema,
  UpdateStatusSchema,
  ReservationQuerySchema,
} from '../schemas/reservation';
import { IdParamSchema } from '../schemas/common';
import { validate } from '../middleware/validate';
import { formLimiter } from '../middleware/rate-limiter';
import { asyncHandler } from '../lib/async-handler';
import type { ApiResponse } from '../lib/types';

const router = Router();

// POST /api/reservations
router.post(
  '/',
  formLimiter,
  validate(CreateReservationSchema, 'body'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await reservationService.create(req.body);

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.status(201).json(response);
  })
);

// GET /api/reservations/available
router.get(
  '/available',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const date = req.query.date as string;
    const partySize = Number(req.query.partySize) || 2;

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Query param ?date=YYYY-MM-DD is required' },
      });
      return;
    }

    const result = await reservationService.getAvailableSlots(date, partySize);

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.json(response);
  })
);

// GET /api/reservations
router.get(
  '/',
  validate(ReservationQuerySchema, 'query'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await reservationService.list(req.query as {
      page?: number;
      limit?: number;
      status?: string;
      date?: string;
    });

    const response: ApiResponse<typeof result.reservations> = {
      success: true,
      data: result.reservations,
      meta: result.meta,
    };

    res.json(response);
  })
);

// GET /api/reservations/:id
router.get(
  '/:id',
  validate(IdParamSchema, 'params'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const reservation = await reservationService.getById(String(req.params.id ?? ''));

    const response: ApiResponse<typeof reservation> = {
      success: true,
      data: reservation,
    };

    res.json(response);
  })
);

// PATCH /api/reservations/:id/status
router.patch(
  '/:id/status',
  validate(UpdateStatusSchema, 'body'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await reservationService.updateStatus(String(req.params.id ?? ''), req.body.status);

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.json(response);
  })
);

// DELETE /api/reservations/:id
router.delete(
  '/:id',
  validate(IdParamSchema, 'params'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await reservationService.delete(String(req.params.id ?? ''));

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.json(response);
  })
);

export default router;
