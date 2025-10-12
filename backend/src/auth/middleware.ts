import { Request, Response, NextFunction } from "express";

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const adminId = process.env.ADMIN_ID;       // e.g. "admin"
  const adminToken = process.env.ADMIN_TOKEN; // strong secret

  const headerId = req.header("x-admin-id");
  const headerToken = req.header("x-admin-token");

  if (headerId === adminId && headerToken === adminToken) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
}
