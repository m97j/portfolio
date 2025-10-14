// backend/src/tags/router.ts
import { Router } from 'express';
import { adminAuth } from '../auth/middleware';
import { list, byEmoji, upsert, remove } from './controller';

export const tagsRouter = Router();
tagsRouter.get('/', list);
tagsRouter.get('/:emoji', byEmoji);
tagsRouter.post('/', adminAuth, upsert);
tagsRouter.put('/:emoji', adminAuth, upsert);
tagsRouter.delete('/:emoji', adminAuth, remove);
