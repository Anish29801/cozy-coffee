import { Request, Response } from 'express';
import mongoose from 'mongoose';

interface HealthResponse {
  success: boolean;
  data: {
    status: 'healthy' | 'unhealthy';
    database: 'connected' | 'disconnected';
    uptime: number;
    memory: { rss: number; heapUsed: number; heapTotal: number };
    timestamp: string;
    version: string;
  };
}

export async function healthCheck(_req: Request, res: Response): Promise<void> {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? 'connected' : 'disconnected';

  const mem = process.memoryUsage();
  const response: HealthResponse = {
    success: true,
    data: {
      status: dbStatus === 'connected' ? 'healthy' : 'unhealthy',
      database: dbStatus,
      uptime: Math.floor(process.uptime()),
      memory: {
        rss: Math.round(mem.rss / 1024 / 1024 * 10) / 10,
        heapUsed: Math.round(mem.heapUsed / 1024 / 1024 * 10) / 10,
        heapTotal: Math.round(mem.heapTotal / 1024 / 1024 * 10) / 10,
      },
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
    },
  };

  const statusCode = response.data.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(response);
}
