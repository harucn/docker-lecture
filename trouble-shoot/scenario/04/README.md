# シナリオ 04: イメージが巨大すぎる

## 状況

> 「先輩から引き継いだ Dockerfile でビルドしたら、イメージが 2GB 超えてる。push も pull もめちゃくちゃ遅い」

## 再現手順

```bash
docker build -t scenario-04 .
docker image ls scenario-04
```

## 症状

イメージサイズが異常に大きい。

## チャレンジ

イメージが肥大化している原因を特定し、`Dockerfile` と `.dockerignore` を改善してください。

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

`COPY . .` で何がコピーされているか確認しましょう。
`node_modules/` や `.git/` が含まれていませんか？
`.dockerignore` ファイルを作成してみましょう。
</details>

<details>
<summary>ヒント 3</summary>

ビルドツール（`gcc`, `make` など）は実行時には不要です。
マルチステージビルドを使って、本番イメージには実行に必要なものだけを含めましょう。
</details>

## 解答

`answer/` を参照してください。

## 学習ポイント

- `.dockerignore` で不要なファイルを除外する
- マルチステージビルドでビルドツールを本番イメージに含めない
- `apt-get` 後は `rm -rf /var/lib/apt/lists/*` でキャッシュを削除する
- イメージサイズはセキュリティリスクにもなる（攻撃対象が増える）
