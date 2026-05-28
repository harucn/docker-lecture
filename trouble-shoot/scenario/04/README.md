# シナリオ 04: イメージが巨大すぎる

## 状況

> 「先輩から引き継いだ Dockerfile でビルドしたら、イメージが 2GB 近くある。push も pull もめちゃくちゃ遅い」

## 再現手順

```bash
docker build -t scenario-04 .
docker image ls scenario-04
```

## 症状

イメージサイズが異常に大きい。

## チャレンジ

肥大化の原因を特定し、`Dockerfile` と `.dockerignore` を改善してください。
最終的に `node dist/index.js` で動くイメージを作ることがゴールです。

## ヒント

<details>
<summary>ヒント 1</summary>

どのレイヤーが大きいか確認しましょう。

```bash
docker history scenario-04
```
</details>

<details>
<summary>ヒント 2</summary>

`package.json` の `dependencies` と `devDependencies` の違いを確認してください。
`typescript` や `@types/*` は本番環境では不要です。

```bash
# 本番依存だけインストールするには
npm ci --omit=dev
```
</details>

<details>
<summary>ヒント 3</summary>

マルチステージビルドを使うと、ビルド専用のステージと本番用のステージを分けられます。

```dockerfile
FROM node:26-alpine AS builder
# TypeScript のビルドはここで行う

FROM node:26-alpine AS runner
# 実行に必要なものだけをここにコピーする
COPY --from=builder /app/dist ./dist
```
</details>

## 解答

`answer/` を参照してください。

## 学習ポイント

- `dependencies` と `devDependencies` の使い分け（TypeScript などのビルドツールは後者へ）
- マルチステージビルドで「ビルドに使うもの」を本番イメージから除外する
- `.dockerignore` で `node_modules` や `.git` を除外する
- `node:26`（Debian）vs `node:26-alpine` のサイズ差
- `apt-get` 後は `rm -rf /var/lib/apt/lists/*` でキャッシュを削除する
