# 빌드 스테이지
FROM node:20 AS builder
WORKDIR /app

# 빌드 타임 환경변수 선언
ARG NEXT_PUBLIC_API_URL
ARG API_URL

# Next.js 빌드 시점에 process.env로 접근 가능하도록 ENV 설정
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV API_URL=$API_URL

COPY package*.json ./
RUN npm ci
COPY . .

# Next.js 빌드 (이 시점에 NEXT_PUBLIC_API_URL이 인라인됨)
RUN npm run build

# 런타임 스테이지
FROM node:20 AS runner
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 80
CMD ["npm", "run", "start"]
