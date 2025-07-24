FROM node:22

WORKDIR /usr/local/app

# package.json, package-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# src ディレクトリ作成
RUN mkdir src

# アプリケーションのコードをコピー
COPY src/ ./src

# アプリケーションで使用するポートを開ける
EXPOSE 3000

# アプリケーション起動
ENTRYPOINT [ "npm", "start" ]
