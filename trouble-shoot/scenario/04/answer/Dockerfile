# ✅ 修正済み: マルチステージビルド + .dockerignore の活用

# --- ビルドステージ ---
FROM node:26-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

# --- 本番ステージ ---
FROM node:26-alpine

WORKDIR /app

# ビルド成果物だけをコピー（ビルドツールは含まない）
COPY --from=builder /app/node_modules ./node_modules
COPY src/ ./src/
COPY package.json .

CMD ["node", "src/app.js"]
