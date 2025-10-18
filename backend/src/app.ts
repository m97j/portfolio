// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import { errorHandler } from './utils/errorHandler';
import { postsRouter } from './posts/router';
import { notesRouter } from './notes/router';
import { blogsRouter } from './blogs/router';
import { projectsRouter } from './projects/router';
import { uploadsRouter } from './uploads/router';
import { tagsRouter } from './tags/router';
import { authRouter } from './auth/router';


export const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '5mb' }));

app.use('/api/posts', postsRouter);
app.use('/api/notes', notesRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/auth', authRouter);

app.use(errorHandler);
