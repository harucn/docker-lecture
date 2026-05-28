# シナリオ 02: ポートにつながらない

## 状況

> 「Web アプリのコンテナ動いてるはずなんだけど、ブラウザで開けない。なんで？」

## 再現手順

```bash
docker compose up -d
curl http://localhost:8080
```

## 症状

`docker compose ps` でコンテナは `Up` になっているのに、`curl` や ブラウザでアクセスできない。

## チャレンジ

アクセスできない原因を特定し、`docker-compose.yml` または アプリのコードを修正してください。

## ヒント

<details>
<summary>ヒント 1</summary>

コンテナの中からアクセスできるか確認してみましょう。

```bash
docker compose exec app curl http://localhost:8080
```
</details>

<details>
<summary>ヒント 2</summary>

アプリがどのアドレスでリッスンしているか確認しましょう。

```bash
docker compose exec app ss -tlnp
```

`127.0.0.1` と `0.0.0.0` の違いは何でしょうか？
</details>

<details>
<summary>ヒント 3</summary>

`src/app.js` のバインドアドレスを確認してください。
コンテナ外からアクセスするには `0.0.0.0` でリッスンする必要があります。
</details>

## 解答

`answer/` を参照してください。

## 学習ポイント

- `127.0.0.1`（ループバック）と `0.0.0.0`（全インターフェース）の違い
- `EXPOSE` はドキュメントにすぎず、ポート公開には `-p` オプションが必要
- コンテナ内ネットワークとホスト側ネットワークの違い
