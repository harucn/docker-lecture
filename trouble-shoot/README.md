# Docker トラブルシューティング ハンズオン

## 概要

「壊れた Docker 環境を渡されるので、自力で直せ」

実務で SIer 新人が最初につまずくポイントを、意図的に壊した環境として再現しています。
エラーメッセージを読む力、ログを追う力、仮説を立てて検証する力を鍛えることが目的です。

## 対象・前提知識

- 対象: SIer 1年目エンジニア
- 前提: Docker の基礎（build / run / exec / ps / logs）は知っている
- 想定時間: 90〜120分
- 動作環境: すべてローカル（docker / docker compose のみ）で完結

## シナリオ一覧

| # | テーマ | 使うコマンド |
|---|--------|------------|
| [01](./scenario/01/README.md) | コンテナがすぐに落ちる | `docker ps -a`, `docker logs`, `docker inspect` |
| [02](./scenario/02/README.md) | ポートにつながらない | `docker port`, `docker exec`, `curl` |
| [03](./scenario/03/README.md) | コンテナ間で通信できない | `docker network ls`, `docker network inspect` |
| [04](./scenario/04/README.md) | イメージが巨大すぎる | `docker image ls`, `docker history` |

## 進め方

各シナリオの README を読んで、壊れた環境を起動し、自力で修正してください。
詰まったらヒントを、それでも解けなければ `answer/` ディレクトリの解答を確認してください。
