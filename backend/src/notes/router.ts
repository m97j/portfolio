// backend/src/notes/router.ts
import { Router } from 'express';
import { list, bySlug, create, update, remove } from '../posts/controller';
import { adminAuth } from '../auth/middleware';

export const notesRouter = Router();
notesRouter.get('/', (req, _res, next) => { req.query.category = 'notes'; next(); }, list);
notesRouter.get('/:slug', bySlug);
notesRouter.post('/', adminAuth, (req, _res, next) => { req.body.category = 'notes'; next(); }, create);
notesRouter.put('/:slug', adminAuth, (req, _res, next) => { req.body.category = 'notes'; next(); }, update);
notesRouter.delete('/:slug', adminAuth, remove);
