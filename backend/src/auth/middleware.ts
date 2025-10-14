// backend/src/auth/middleware.ts
import { Request, Response, NextFunction } from 'express';
export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const id = req.header('x-admin-id');
  const token = req.header('x-admin-token');
  if (id === process.env.ADMIN_ID && token === process.env.ADMIN_TOKEN) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}
