import { NextFunction, Request, Response } from 'express';
import { logError } from '../config/logger';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  logError('Unhandled error', { err });
  res.status(500).json({ message: 'Internal server error' });
}
