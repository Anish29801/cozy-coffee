import { Router } from 'express';
import { healthCheck } from './health';
import newsletterRouter from './newsletter';
import reservationsRouter from './reservations';
import menuRouter from './menu';
import testimonialsRouter from './testimonials';

const router = Router();

router.get('/health', healthCheck);

router.use('/api/newsletter', newsletterRouter);
router.use('/api/reservations', reservationsRouter);
router.use('/api/menu', menuRouter);
router.use('/api/testimonials', testimonialsRouter);

export { router as routes };
