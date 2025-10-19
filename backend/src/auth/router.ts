// backend/src/auth/router.ts
import { Router } from "express";
import { login, verify, refresh } from "./controller";
import { adminAuth } from "./middleware";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/verify", adminAuth, verify);
authRouter.post("/refresh", refresh);
