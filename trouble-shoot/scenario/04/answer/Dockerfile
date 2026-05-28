# ✅ 修正済み: マルチステージビルド + .dockerignore の活用

# --- ビルドステージ（devDependencies + TypeScript コンパイラを使う）---
FROM node:26-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY src/ ./src/
RUN npm run build

# --- 本番ステージ（実行に必要なものだけ）---
FROM node:26-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.js"]
