import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { AppError, ValidationError } from '../lib/errors';

export { AppError, NotFoundError, ConflictError, ValidationError } from '../lib/errors';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Zod validation error
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input',
        details: err.flatten().fieldErrors,
      },
    });
    return;
  }

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const details: Record<string, string[]> = {};
    for (const [field, error] of Object.entries(err.errors)) {
      details[field] = [error.message];
    }
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Database validation failed',
        details,
      },
    });
    return;
  }

  // Mongoose duplicate key error
  if (err instanceof mongoose.Error && 'code' in err && (err as { code: number }).code === 11000) {
    res.status(409).json({
      success: false,
      error: {
        code: 'CONFLICT',
        message: 'Resource already exists',
      },
    });
    return;
  }

  // Custom AppError
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err instanceof ValidationError ? { details: err.details } : {}),
      },
    });
    return;
  }

  // Unknown error
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    },
  });
}
