// backend/src/vlogs/router.ts
import { Router } from 'express';
import { list, bySlug, create, update, remove } from '../posts/controller';
import { adminAuth } from '../auth/middleware';

export const vlogsRouter = Router();
vlogsRouter.get('/', (req, _res, next) => { req.query.category = 'vlogs'; next(); }, list);
vlogsRouter.get('/:slug', bySlug);
vlogsRouter.post('/', adminAuth, (req, _res, next) => { req.body.category = 'vlogs'; next(); }, create);
vlogsRouter.put('/:id', adminAuth, (req, _res, next) => { req.body.category = 'vlogs'; next(); }, update);
vlogsRouter.delete('/:id', adminAuth, remove);
