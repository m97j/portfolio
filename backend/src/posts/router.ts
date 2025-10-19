// backend/src/posts/router.ts
import { Router } from 'express';
import { list, bySlug, create, update, remove } from './controller';
import { adminAuth } from '../auth/middleware';

export const postsRouter = Router();

postsRouter.get('/', list);
postsRouter.get('/:slug', bySlug);
postsRouter.post('/', adminAuth, create);

postsRouter.put('/:slug', adminAuth, update);
postsRouter.delete('/:slug', adminAuth, remove);
