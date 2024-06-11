---
marp: true
theme: mytheme
# header: "__Marp Samples__"
---

<!--
_class: "title"
-->

<!-- # ちょっと詳しくなれる Docker 講義 -->

# 魔翻訳 Docker Docs

**Haruto Takeuchi**

---

# アジェンダ

<!-- - コンテナとは  -->

- Docker とは
- Dockerfile
  - ベストプラクティス
- Docker Compose(ハンズオンなし。なんか見せてもいいかな)
- Docker 活用例(ここは見せるだけかな)

---

# Docker とは

- アプリケーションを構築(Build)、共有(Share)、実行(Run)するためのオープンプラットフォーム

- アプリケーションをインフラから切り離すことができ、ソフトウェアを迅速に提供することができる

- 軽量でポータブルなコンテナを使用してアプリケーションを隔離

- クライアント/サーバーモデルを採用(つぎ説明します)
<!-- TODO: Docker.png -->

---

# Docker とは

- Docker クライアントである docker コマンドが Docker デーモン(dockerd)に通信してコンテナの操作を行う
<!-- containerd とか runc の説明は省く -->
- Docker デーモンが提供している REST API を利用している
  - [Docker Engine API Document](https://docs.docker.com/engine/api/v1.45/)

---

# Build（イメージの作成）

- Dockerfile を使ってアプリケーション環境を構築

- コードや依存関係を含む環境を一つのイメージとして定義

- イメージは変更差分を積み重ねたレイヤ構造

  - [Docker Image 仕様](https://github.com/moby/docker-image-spec?tab=readme-ov-file)

- レイヤーキャッシュによる Build 高速化

---

# Share（イメージの配布）

- レジストリを用いたイメージの共有
  - Docker Hub
  - AWS ECR
  - etc...
  <!-- - 他のチームメンバーや開発者が簡単に同じ環境を再現可能 -->
- タグを使ってのバージョン管理も可能

```bash
$ docker container commit c16378f943fe rhel-httpd:latest

$ docker image tag rhel-httpd:latest registry-host:5000/myadmin/rhel-httpd:latest

$ docker image push registry-host:5000/myadmin/rhel-httpd:latest
```

---

# Run（コンテナの実行）

- イメージからコンテナを作成し、実行

  - Dockerfile で作成したイメージ、レジストリにあるイメージどちらでも可能

---

<!--
_class: "title"
-->

# 実際に確認してみよう

---

# Docker Image のビルド

- repo

---

# レイヤ構造の確認

```sh
$ mdir dump

$ docker save sample-image:1.0 -o dump/sample-image.tar

$ cd dump

$ tar xf image.tar

$ rm image.tar

$ tree .
```

---

# Dockerfile のベストプラクティス(と思っているもの)

- イメージサイズの削減
  - マルチステージビルド

<!-- ---
TODO: 余力あれば
# Docker Compose -->

---

# Docker 活用例

- 開発環境もコンテナで
  - DevContainer
- k8s
- CI
