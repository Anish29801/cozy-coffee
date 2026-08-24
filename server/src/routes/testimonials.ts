import { Router, Request, Response } from 'express';
import { testimonialService } from '../services/testimonial.service';
import { CreateTestimonialSchema, UpdateTestimonialSchema } from '../schemas/testimonial';
import { IdParamSchema } from '../schemas/common';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../lib/async-handler';
import type { ApiResponse } from '../lib/types';

const router = Router();

// GET /api/testimonials — public (active only)
router.get('/', asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const testimonials = await testimonialService.listActive();
  res.json({ success: true, data: testimonials } satisfies ApiResponse<typeof testimonials>);
}));

// GET /api/testimonials/all — admin (all)
router.get('/all', asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const testimonials = await testimonialService.listAll();
  res.json({ success: true, data: testimonials } satisfies ApiResponse<typeof testimonials>);
}));

// GET /api/testimonials/:id
router.get('/:id', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const testimonial = await testimonialService.getById(String(req.params.id ?? ''));
  res.json({ success: true, data: testimonial } satisfies ApiResponse<typeof testimonial>);
}));

// POST /api/testimonials
router.post(
  '/',
  validate(CreateTestimonialSchema, 'body'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const testimonial = await testimonialService.create(req.body);
    res.status(201).json({ success: true, data: testimonial } satisfies ApiResponse<typeof testimonial>);
  })
);

// PATCH /api/testimonials/:id
router.patch(
  '/:id',
  validate(UpdateTestimonialSchema, 'body'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const testimonial = await testimonialService.update(String(req.params.id ?? ''), req.body);
    res.json({ success: true, data: testimonial } satisfies ApiResponse<typeof testimonial>);
  })
);

// DELETE /api/testimonials/:id
router.delete(
  '/:id',
  validate(IdParamSchema, 'params'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await testimonialService.delete(String(req.params.id ?? ''));
    res.json({ success: true, data: result } satisfies ApiResponse<typeof result>);
  })
);

export default router;
