# -----------------------------
# 빌드 단계
FROM node:20 AS build
WORKDIR /app

# 패키지 설치
COPY package*.json ./
RUN npm install

# 소스 복사
COPY . .

# Prisma Client 생성
RUN npx prisma generate

# TypeScript 빌드 + dist 확인
RUN npm run build && ls -al dist

# -----------------------------
# 런타임 단계
FROM node:20
WORKDIR /app

# package.json만 복사해서 prod deps 설치
COPY package*.json ./
RUN npm install --omit=dev

# 빌드 산출물과 Prisma Client 복사
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/prisma ./prisma

# 환경 변수 및 포트 설정
ENV NODE_ENV=production
EXPOSE 80

# 앱 실행
CMD ["node", "dist/index.js"]