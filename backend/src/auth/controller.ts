// backend/src/auth/controller.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function login(req: Request, res: Response) {
  const { id, password } = req.body;
  if (id !== process.env.ADMIN_ID || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const payload = { id };
  const secret = process.env.JWT_SECRET!;
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });

  return res.json({ token });
}

export function ping(req: Request, res: Response) {
  res.json({ ok: true });
}
