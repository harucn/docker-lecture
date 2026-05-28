# シナリオ 01: コンテナがすぐに落ちる

## 状況

> 「サービスをデプロイしたけど、コンテナ起動してもすぐ死んでるんだけど。とりあえず動かしてみて」

## 再現手順

```bash
docker build -t scenario-01 .
docker run --name s01 scenario-01
```

## 症状

コンテナが起動してもすぐに終了してしまう。

## チャレンジ

コンテナが落ちる原因を特定し、正常に起動するよう `Dockerfile` を修正してください。

## ヒント

<details>
<summary>ヒント 1</summary>

終了したコンテナのログを確認してみましょう。

```bash
docker logs s01
```
</details>

<details>
<summary>ヒント 2</summary>

終了コードも確認してみましょう。

```bash
docker inspect s01 --format='{{.State.ExitCode}}'
```

exit code 127 はどういう意味でしょうか？
</details>

<details>
<summary>ヒント 3</summary>

`Dockerfile` の `CMD` に注目してください。起動しようとしているファイル名は本当に存在しますか？
</details>

## 解答

`answer/Dockerfile` を参照してください。

## 学習ポイント

- `exit code 1`（アプリエラー）と `exit code 127`（コマンドが見つからない）の違い
- `docker logs` でエラー内容を確認する習慣
- `--restart=always` の罠（クラッシュループしていることに気づきにくい）
