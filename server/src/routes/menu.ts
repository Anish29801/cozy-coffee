import { Router, Request, Response } from 'express';
import { menuService } from '../services/menu.service';
import {
  CreateMenuItemSchema,
  UpdateMenuItemSchema,
  MenuItemQuerySchema,
} from '../schemas/menu-item';
import { IdParamSchema } from '../schemas/common';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../lib/async-handler';
import type { ApiResponse } from '../lib/types';

const router = Router();

// GET /api/menu/categories
router.get('/categories', asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const categories = await menuService.getCategories();
  res.json({ success: true, data: categories } satisfies ApiResponse<string[]>);
}));

// GET /api/menu
router.get(
  '/',
  validate(MenuItemQuerySchema, 'query'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await menuService.list(req.query as {
      page?: number;
      limit?: number;
      category?: string;
      available?: boolean;
      seasonal?: boolean;
    });

    const response: ApiResponse<typeof result.items> = {
      success: true,
      data: result.items,
      meta: result.meta,
    };

    res.json(response);
  })
);

// GET /api/menu/:slug
router.get(
  '/:slug',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const slug = String(req.params.slug ?? '');
    const item = await menuService.getBySlug(slug);

    const response: ApiResponse<typeof item> = {
      success: true,
      data: item,
    };

    res.json(response);
  })
);

// POST /api/menu
router.post(
  '/',
  validate(CreateMenuItemSchema, 'body'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const item = await menuService.create(req.body);

    const response: ApiResponse<typeof item> = {
      success: true,
      data: item,
    };

    res.status(201).json(response);
  })
);

// PATCH /api/menu/:id
router.patch(
  '/:id',
  validate(UpdateMenuItemSchema, 'body'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const item = await menuService.update(String(req.params.id ?? ''), req.body);

    const response: ApiResponse<typeof item> = {
      success: true,
      data: item,
    };

    res.json(response);
  })
);

// DELETE /api/menu/:id
router.delete(
  '/:id',
  validate(IdParamSchema, 'params'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await menuService.delete(String(req.params.id ?? ''));

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.json(response);
  })
);

export default router;
