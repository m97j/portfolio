// backend/src/blogs/router.ts
import { Router } from 'express';
import { list, bySlug, create, update, remove } from '../posts/controller';
import { adminAuth } from '../auth/middleware';

export const blogsRouter = Router();
blogsRouter.get('/', (req, _res, next) => { req.query.category = 'vlogs'; next(); }, list);
blogsRouter.get('/:slug', bySlug);
blogsRouter.post('/', adminAuth, (req, _res, next) => { req.body.category = 'vlogs'; next(); }, create);
blogsRouter.put('/:slug', adminAuth, (req, _res, next) => { req.body.category = 'vlogs'; next(); }, update);
blogsRouter.delete('/:slug', adminAuth, remove);
