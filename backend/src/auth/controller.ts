// backend/src/auth/controller.ts
import { Request, Response } from 'express';
export function ping(req: Request, res: Response) {
  res.json({ ok: true });
}
