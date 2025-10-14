// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import { errorHandler } from './utils/errorHandler';
import { postsRouter } from './posts/router';
import { notesRouter } from './notes/router';
import { vlogsRouter } from './vlogs/router';
import { projectsRouter } from './projects/router';
import { uploadsRouter } from './uploads/router';
import { tagsRouter } from './tags/router';

export const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '5mb' }));

app.use('/api/posts', postsRouter);
app.use('/api/notes', notesRouter);
app.use('/api/vlogs', vlogsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/tags', tagsRouter);

app.use(errorHandler);
