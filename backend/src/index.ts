// backend/src/index.ts
import { execSync } from 'child_process';
import { app } from './app';

// DB URL 조합
if (!process.env.DATABASE_URL) {
  const user = process.env.POSTGRES_USER;
  const pass = process.env.POSTGRES_PASSWORD;
  const host = process.env.POSTGRES_NAME;
  const db   = process.env.POSTGRES_DB;
  process.env.DATABASE_URL = `postgresql://${user}:${pass}@${host}:5432/${db}?sslmode=require`;
}

// 마이그레이션 실행
try {
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
} catch (err) {
  console.error('Migration failed', err);
  process.exit(1);
}

// 서버 시작
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Backend running on port ${port}`));
