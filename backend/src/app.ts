// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/errorHandler';
import { postsRouter } from './posts/router';
import { notesRouter } from './notes/router';
import { blogsRouter } from './blogs/router';
import { projectsRouter } from './projects/router';
import { uploadsRouter } from './uploads/router';
import { tagsRouter } from './tags/router';
import { authRouter } from './auth/router';

export const app = express();

// CORS 설정 (프론트엔드 도메인 명시)
app.use(cors({
//   origin: process.env.FRONTEND_ORIGIN, // 프론트엔드 App Service 도메인
  origin: "portfolio-frontend.azurewebsites.net",
  credentials: true, // 쿠키 허용
}));

// JSON 파서
app.use(express.json({ limit: '5mb' }));

// 쿠키 파서
app.use(cookieParser());

// 라우터 연결
app.use('/api/posts', postsRouter);
app.use('/api/notes', notesRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/auth', authRouter);

// 에러 핸들러
app.use(errorHandler);
