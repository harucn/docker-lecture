# シナリオ 03: コンテナ間で通信できない

## 状況

> 「フロントとバックを別コンテナにしたんだけど、フロントからバックの API が 503 になる」

## 再現手順

```bash
docker compose up -d
curl http://localhost:3000
```

## 症状

フロントエンドは表示されるが、バックエンド API へのリクエストが失敗する。

## チャレンジ

フロントエンドからバックエンドへ通信できない原因を特定し、修正してください。

## ヒント

<details>
<summary>ヒント 1</summary>

フロントエンドのコンテナからバックエンドに直接アクセスできるか確認しましょう。

```bash
docker compose exec frontend curl http://localhost:4000
docker compose exec frontend curl http://backend:4000
```
</details>

<details>
<summary>ヒント 2</summary>

`frontend/app.js` のバックエンド URL を確認してください。
コンテナ間通信では `localhost` はそのコンテナ自身を指します。
</details>

<details>
<summary>ヒント 3</summary>

Docker Compose では、サービス名（`backend`）で名前解決できます。
`http://localhost:4000` → `http://backend:4000` に変えてみましょう。
</details>

## 解答

`answer/` を参照してください。

## 学習ポイント

- Docker の内部 DNS（サービス名で名前解決できる）
- `localhost` はあくまでそのコンテナ自身
- `docker network inspect` でネットワーク構成を確認する方法
