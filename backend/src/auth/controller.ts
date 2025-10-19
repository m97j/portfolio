// backend/src/auth/controller.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export function login(req: Request, res: Response) {
  const { id, password } = req.body;
  if (id !== process.env.ADMIN_ID || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const payload = { id };

  // Access Token (1시간)
  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "1h" });

  // Refresh Token (7일)
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

  // Refresh Token은 HttpOnly 쿠키에 저장
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json({ token: accessToken });
}

export function verify(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ valid: false, error: "Invalid or expired token" });
  }
  return res.json({ valid: true, user: req.user });
}

export function refresh(req: Request, res: Response) {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ error: "Missing refresh token" });
  }

  try {
    const decoded = jwt.verify(token, REFRESH_SECRET) as any;
    const payload = { id: decoded.id };

    // 새 Access Token 발급
    const newAccessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "1h" });

    return res.json({ token: newAccessToken });
  } catch (err) {
    return res.status(401).json({ error: "Refresh token invalid or expired" });
  }
}
