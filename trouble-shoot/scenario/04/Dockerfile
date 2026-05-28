# 🐛 バグあり:
#   - .dockerignore がないため node_modules や .git ごと COPY される
#   - ビルドツール（gcc, make）が本番イメージに残っている
#   - apt キャッシュが残っている

FROM node:26

WORKDIR /app

# ビルドツールをインストール（本番では不要）
RUN apt-get update && apt-get install -y gcc make

# プロジェクト全体をコピー（node_modules/.git も含まれてしまう）
COPY . .

RUN npm install

CMD ["node", "src/app.js"]
