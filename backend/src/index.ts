// backend/src/index.ts

// DATABASE_URL이 없으면 Key Vault에서 주입된 개별 값으로 조합
if (!process.env.DATABASE_URL) {
  const user = process.env.POSTGRES_USER;
  const pass = process.env.POSTGRES_PASSWORD;
  const host = process.env.POSTGRES_NAME; 
  const db   = process.env.POSTGRES_DB;
  process.env.DATABASE_URL = `postgresql://${user}:${pass}@${host}:5432/${db}`;
}

import { app } from './app';

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Backend running on port ${port}`));
