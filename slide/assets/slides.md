---
marp: true
theme: mytheme
# header: "__Marp Samples__"
---

<!--
_class: "title"
-->

# 基礎から学ぶ Docker 入門

<!-- # 魔翻訳 Docker Docs -->

**Haruto Takeuchi**

---

## アジェンダ

- Docker とは
- ハンズオン
- Dockerfileのベストプラクティス
- Docker 活用例

<br/>

※ 時間の都合上、コンテナの説明や Docker の基本的な語彙の説明は省略します🙇

---

## Docker とは

- アプリケーションを構築(Build)、共有(Share)、実行(Run)するためのオープンプラットフォーム

- アプリケーションをインフラから切り離すことができ、ソフトウェアを迅速に提供することができる

- 軽量でポータブルなコンテナを使用してアプリケーションを隔離

<!-- TODO: Docker.png -->

---

## Docker とは

- クライアント/サーバーモデルを採用

- Docker クライアントである docker コマンドが Docker デーモン(dockerd)に通信してコンテナの操作を行う
<!-- containerd とか runc の説明は省く -->
- Docker デーモンが提供している REST API を利用している
  - [Docker Engine API Document](https://docs.docker.com/engine/api/v1.45/)
  <!-- TODO: figure by mermaid -->

---

## Build（イメージの作成）

- Dockerfile を使ってアプリケーション環境を構築

- コードや依存関係を含む環境を一つのイメージとして定義

- イメージは変更差分を積み重ねたレイヤ構造

  - [Docker Image 仕様](https://github.com/moby/docker-image-spec?tab=readme-ov-file)

- レイヤーキャッシュによる Build 高速化

---

## Share（イメージの配布）

- レジストリを用いたイメージの共有
  - Docker Hub
  - AWS ECR
  - etc...
  <!-- - 他のチームメンバーや開発者が簡単に同じ環境を再現可能 -->
- タグを使ってのバージョン管理も可能

---

## Run（コンテナの実行）

- イメージからコンテナを作成し、実行

  - Dockerfile で作成したイメージ、レジストリにあるイメージどちらでも可能

---

<!--
_class: "title"
-->

## 実際に動かして確認してみよう

---

## 実際に動かして確認してみよう

- repo

---

## イメージファイルの説明

```sh
$ tree .
.
├── 14ecf3001d6df4899427ed7c93dba0fe9d5fcc80127aef0dea4e92b88b29e320
│   ├── VERSION
│   ├── json
│   └── layer.tar
├── ade2a84cdce88ead58da571d36cea43c8f46f736c18daf399f79edeeb8e96094
│   ├── VERSION
│   ├── json
│   └── layer.tar
├── f5457eb1105642bfe22c1a3736122b3ab4b1d35bb15276736691fd6cb447cf3d.json
├── manifest.json
├── repositories
└── sample-image.tar
```

---

## イメージファイルの説明
（再登場）[Docker Image 仕様](https://github.com/moby/docker-image-spec?tab=readme-ov-file)より

- manifest.json : イメージを構成するための情報を持ったファイル

- repositories : イメージの名前とタグの情報を持ったファイル

- 各ディレクトリ : イメージの各レイヤのファイルシステムの差分
  - VERSION : スキーマのバージョン
  - json : レイヤのメタデータ。後方互換性のために保持
  - **layer.tar : ファイルシステムの差分をまとめたtar**

---

<!--
_class: "title"
-->
# Dockerfile のベストプラクティスとはイメージサイズの削減

---

## イメージサイズを削減するためには

- マルチステージビルド
- レイヤ数の最小化

---

## Docker 活用例

- Dev Container を使って開発環境もコンテナ内で
- CI 環境にも
- k8s で複数のコンテナをより効率的に管理・運用する
- クラウドサービス
- etc...

---
<!--
_class: "title"
-->

# Docker はともだち こわくない
