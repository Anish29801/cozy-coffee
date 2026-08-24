import { z } from 'zod';

export const CreateTestimonialSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  role: z.string().min(1, 'Role is required').max(200),
  gender: z.enum(['male', 'female']),
  image: z.string().url('Invalid image URL').max(500),
  text: z.string().min(1, 'Text is required').max(1000),
  active: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export type CreateTestimonialInput = z.infer<typeof CreateTestimonialSchema>;

export const UpdateTestimonialSchema = CreateTestimonialSchema.partial();

export type UpdateTestimonialInput = z.infer<typeof UpdateTestimonialSchema>;
