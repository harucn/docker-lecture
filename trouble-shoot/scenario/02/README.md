# シナリオ 02: コンテナが起動しない（ポート競合）

## 状況

> 「コンテナ起動しようとしたら、なんかエラーが出て立ち上がらない。ポートは合ってるはずなんだけど」

## 再現手順

```bash
docker run -d --name other-service -p 8080:80 nginx:alpine

# アプリを起動しようとする
docker compose up -d
```

## 症状

`docker compose up -d` がエラーになりコンテナが起動しない。

## チャレンジ

起動できない原因を特定し、アプリが起動できるよう修正してください。

## ヒント

<details>
<summary>ヒント 1</summary>

エラーメッセージをよく読んでみましょう。どのポートで何が起きていますか？

</details>

<details>
<summary>ヒント 2</summary>

ホスト側でポート 8080 を使っているプロセスやコンテナを調べてみましょう。

```bash
docker ps
lsof -i :8080
```
</details>

<details>
<summary>ヒント 3</summary>

解決策は2つあります。

1. 競合しているコンテナを止める
2. `compose.yaml` のホスト側ポートを別の番号に変える（例: `8081:8080`）

どちらが適切かは状況によります。

</details>

## 解答

`answer/compose.yaml` を参照してください。

## クリーンアップ

```bash
docker compose down --rmi all
docker rm -f other-service
docker rmi nginx:alpine
```

## 学習ポイント

- `Bind for 0.0.0.0:XXXX failed: port is already allocated` の読み方
- `docker ps` と `lsof -i :PORT` でポートの使用状況を調べる方法
- `compose.yaml` のポートマッピング `ホスト側:コンテナ側` の意味
- EXPOSE はポートを公開しない（ドキュメントにすぎない）
