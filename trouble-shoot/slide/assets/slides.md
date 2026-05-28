---
marp: true
theme: mytheme
---

<!--
_class: "title"
-->

# Docker トラブルシューティング
## ハンズオン

---

## このハンズオンの目的

> Docker に関する具体的なエラーを実際に解決していき
**トラブルが起きた時の考え方のベース**を学ぶ

---

## 前提知識

以下のコマンドを知っていること

```sh
docker build    # イメージのビルド
docker run      # コンテナの起動
docker exec     # コンテナ内でコマンドを実行
docker ps       # コンテナ一覧の確認
docker logs     # コンテナのログを確認
```

---

## 進め方

1. シナリオの README を読む
2. 再現手順どおりに壊れた環境を起動する
3. 症状を確認し、原因を調査する
4. 修正して正常に動くことを確認する

詰まったら README の**ヒント**を開いてください
それでも解けなければ `answer/` の解答を確認してください

---

## シナリオ一覧

| # | テーマ |
|---|--------|
| 01 | コンテナがすぐに落ちる |
| 02 | ポート競合でコンテナが起動しない |
| 03 | コンテナ間で通信できない |
| 04 | イメージが巨大すぎる |

---

## コマンドおさらい: docker ps

実行中・終了済みのコンテナ一覧を確認する

```sh
docker ps       # 実行中のみ
docker ps -a    # 終了済みも含めて表示
```

コンテナが落ちていても `-a` を付ければ見える

---

## コマンドおさらい: docker logs

コンテナの標準出力・エラー出力を確認する

```sh
docker logs <コンテナ名>
docker logs --follow <コンテナ名>   # リアルタイムで追う
docker logs --tail 50 <コンテナ名>  # 最新 50 行だけ
```

クラッシュ直後のエラーメッセージもここに残る

---

## コマンドおさらい: docker exec

起動中のコンテナの中でコマンドを実行する

```sh
# コンテナ内でシェルを起動
docker exec -it <コンテナ名> sh

# コンテナ内から疎通確認
docker exec <コンテナ名> curl http://localhost:8080

# ポートの待ち受け状況を確認
docker exec <コンテナ名> ss -tlnp
```

---

## コマンドおさらい: docker inspect

コンテナの詳細情報を確認する

```sh
docker inspect <コンテナ名>

# 終了コードだけ取り出す
docker inspect <コンテナ名> --format='{{.State.ExitCode}}'
```

| exit code | 意味 |
|-----------|------|
| `0` | 正常終了 |
| `1` | アプリがエラーで終了 |
| `127` | コマンドが見つからない |

---

## シナリオ 01: コンテナがすぐに落ちる

> 「コンテナをビルドして起動してもすぐ死んでるんだけど。とりあえず動かしてみて」

**調査の糸口**

```sh
docker ps -a
docker logs s01
docker inspect s01 --format='{{.State.ExitCode}}'
```

---

## シナリオ 02: ポート競合でコンテナが起動しない

> 「コンテナ起動しようとしたら、なんかエラーが出て立ち上がらない。ポートは合ってるはずなんだけど」

**調査の糸口**

```sh
docker ps
lsof -i :8080
```

---

## シナリオ 03: コンテナ間で通信できない

> 「フロントとバックを別コンテナにしたんだけど、フロントからバックの API が 503 になる」

**調査の糸口**

```sh
docker compose exec frontend curl http://localhost:4000
docker compose exec frontend curl http://backend:4000
```

---

## シナリオ 04: イメージが巨大すぎる

> 「先輩から引き継いだ Dockerfile でビルドしたら、イメージがデカすぎる。push も pull もめちゃくちゃ遅い」

**調査の糸口**

```sh
docker image ls scenario-04
docker history scenario-04
```

---

<!--
_class: "title"
-->

# では、はじめましょう
