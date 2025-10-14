// backend/src/utils/errorHandler.ts
import { NextFunction, Request, Response } from 'express';
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error('[Error]', status, message, err.stack || err);
  res.status(status).json({ error: message });
}
