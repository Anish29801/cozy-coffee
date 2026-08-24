import { z } from 'zod';

export const SubscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().max(100, 'Name must be 100 characters or less').optional(),
  honeypot: z.string().max(0, 'Bot detected').optional().default(''),
});

export type SubscribeInput = z.infer<typeof SubscribeSchema>;
