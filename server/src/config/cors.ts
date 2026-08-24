import { env } from './env';

export const corsConfig = {
  origin: env.CORS_ORIGINS.split(',').map((o) => o.trim()),
  credentials: true,
};
