import { z } from 'zod';

export const CreateReservationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^\+?[\d\s-]{7,20}$/, 'Invalid phone number').optional(),
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
        const parts = t.split(':');
        const h = Number(parts[0]);
        return !isNaN(h) && h >= 7 && h <= 22;
      },
      'Kitchen hours: 7am–10pm'
    ),
  partySize: z.number().int().min(1, 'Minimum party size is 1').max(20, 'Maximum party size is 20'),
  notes: z.string().max(500).optional(),
  honeypot: z.string().max(0, 'Bot detected').optional().default(''),
});

export type CreateReservationInput = z.infer<typeof CreateReservationSchema>;

export const UpdateStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed', 'no_show']),
});

export type UpdateStatusInput = z.infer<typeof UpdateStatusSchema>;

export const ReservationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed', 'no_show']).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export type ReservationQueryInput = z.infer<typeof ReservationQuerySchema>;
