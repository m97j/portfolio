import { Router } from 'express';
import { login, ping } from './controller';
import { adminAuth } from './middleware';

export const authRouter = Router();

// 로그인 (토큰 발급)
authRouter.post('/login', login);

// 토큰 검증이 필요한 엔드포인트 예시
authRouter.get('/ping', adminAuth, ping);
