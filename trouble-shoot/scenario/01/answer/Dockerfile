FROM node:26-alpine

WORKDIR /app
COPY src/ .

# ✅ 修正: 必須の環境変数を設定する
ENV APP_PORT=8080

CMD ["node", "app.js"]
