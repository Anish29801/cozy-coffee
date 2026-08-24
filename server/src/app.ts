import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import { corsConfig } from './config/cors';
import { errorHandler } from './middleware/error-handler';
import { apiLimiter } from './middleware/rate-limiter';
import { requestLogger } from './middleware/request-logger';
import { routes } from './routes';

export function createApp() {
  const app = express();

  // 1. Security headers
  app.use(helmet());

  // 2. CORS
  app.use(cors(corsConfig));

  // 3. Body parsing
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // 4. HTTP parameter pollution protection
  app.use(hpp());

  // 5. Request logging
  app.use(requestLogger);

  // 6. Global rate limiter
  app.use(apiLimiter);

  // 7. Routes
  app.use('/', routes);

  // 8. 404 handler
  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Route not found' },
    });
  });

  // 9. Global error handler (must be last)
  app.use(errorHandler);

  return app;
}
