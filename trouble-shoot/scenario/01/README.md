# シナリオ 01: コンテナがすぐに落ちる

## 状況

> 「コンテナをビルドして起動してもすぐ死んでるんだけど。とりあえず動かしてみて」

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

exit code 1 はどういう意味でしょうか？

</details>

<details>
<summary>ヒント 3</summary>

アプリが必要としている環境変数を確認してください。
環境変数は `Dockerfile` の `ENV` で設定するか、`docker run -e` で渡すことができます。

</details>

## 解答

`answer/Dockerfile` を参照してください。

## クリーンアップ

```bash
docker rm -f s01
docker rmi scenario-01
```

## 学習ポイント

- `exit code 1`（アプリが意図的に終了）と `exit code 127`（コマンドが見つからない）の違い
- `docker logs` でエラー内容を確認する習慣
- 環境変数の渡し方: `Dockerfile` の `ENV` vs `docker run -e` vs `--env-file`
