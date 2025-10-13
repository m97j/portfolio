FROM node:20

WORKDIR /app

# 패키지 설치
COPY package.json package-lock.json ./
RUN npm install

# 소스 복사
COPY . .

# Prisma 빌드 (필요 시)
RUN npx prisma generate

EXPOSE 8080
CMD ["npm", "run", "start"]
