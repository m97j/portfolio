// backend/src/projects/router.ts
import { Router } from 'express';
import { list, bySlug, create, update, remove } from '../posts/controller';
import { adminAuth } from '../auth/middleware';

export const projectsRouter = Router();
projectsRouter.get('/', (req, _res, next) => { req.query.category = 'projects'; next(); }, list);
projectsRouter.get('/:slug', bySlug);
projectsRouter.post('/', adminAuth, (req, _res, next) => { req.body.category = 'projects'; next(); }, create);
projectsRouter.put('/:slug', adminAuth, (req, _res, next) => { req.body.category = 'projects'; next(); }, update);
projectsRouter.delete('/:slug', adminAuth, remove);
