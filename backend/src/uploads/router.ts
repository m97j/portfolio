// backend/src/uploads/router.ts
import { Router } from 'express';
import { adminAuth } from '../auth/middleware';
import { getSas } from './controller';

export const uploadsRouter = Router();
uploadsRouter.post('/get-sas', adminAuth, getSas);
