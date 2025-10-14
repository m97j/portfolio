FROM node:20

WORKDIR /app

# 패키지 설치 (devDependencies 제외)
COPY package*.json ./
RUN npm ci --omit=dev

# 소스 복사
COPY . .

# Next.js 빌드 (SSR 서버 실행용)
RUN npm run build

EXPOSE 3000

# Next.js 서버 실행
CMD ["npm", "run", "start"]
