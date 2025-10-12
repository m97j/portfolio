FROM node:20

WORKDIR /app

# 패키지 설치
COPY package.json package-lock.json ./
RUN npm install

# 소스 복사
COPY . .

# Next.js 빌드 (SSR 모드)
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
