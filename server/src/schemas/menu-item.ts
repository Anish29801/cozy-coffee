import { z } from 'zod';

const menuCategories = [
  'espresso', 'filter', 'specialty', 'cold_drinks',
  'pastries', 'light_bite', 'lunch',
] as const;

const emptyToUndefined = z.preprocess(
  (val) => (val === '' || val === null ? undefined : val),
  z.string().url().max(500).optional()
);

export const CreateMenuItemSchema = z.object({
  title: z.string().min(1, 'Title is required').max(150),
  slug: z
    .string()
    .min(1)
    .max(150)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens')
    .optional(),
  description: z.preprocess(
    (val) => (val === '' || val === null ? undefined : val),
    z.string().max(2000).optional()
  ),
  price: z.string().min(1, 'Price is required').max(20),
  category: z.enum(menuCategories),
  seasonal: z.boolean().default(false),
  available: z.boolean().default(true),
  allergens: z.array(z.string()).default([]),
  origin: z.preprocess(
    (val) => (val === '' || val === null ? undefined : val),
    z.string().max(200).optional()
  ),
  story: z.preprocess(
    (val) => (val === '' || val === null ? undefined : val),
    z.string().max(500).optional()
  ),
  imageUrl: emptyToUndefined,
  sortOrder: z.number().int().default(0),
});

export type CreateMenuItemInput = z.infer<typeof CreateMenuItemSchema>;

export const UpdateMenuItemSchema = CreateMenuItemSchema.partial().omit({ slug: true });

export type UpdateMenuItemInput = z.infer<typeof UpdateMenuItemSchema>;

export const MenuItemQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  category: z.enum(menuCategories).optional(),
  available: z.coerce.boolean().optional(),
  seasonal: z.coerce.boolean().optional(),
});

export type MenuItemQueryInput = z.infer<typeof MenuItemQuerySchema>;
