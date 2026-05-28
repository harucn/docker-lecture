---
marp: true
theme: mytheme
# header: "__Marp Samples__"
---

<!--
_class: "title"
-->

# 基礎から学ぶ Docker 入門
## ~ Docker大解剖 ~

<!-- # 魔翻訳 Docker Docs -->

**Haruto Takeuchi**

---

## アジェンダ

- Docker とは

- ハンズオン <!-- - Docker Compose -->

- Docker 活用例


---

## Docker とは

- コンテナ管理やイメージの作成などを行うためのソフトウェア

- アプリケーションを構築(Build)、共有(Share)、実行(Run)するためのオープンプラットフォーム

- アプリケーションをインフラから切り離すことができ、ソフトウェアを迅速に提供することができる

- 軽量でポータブルなコンテナを使用してアプリケーションを隔離

<!-- TODO: Docker.png -->

---

## Docker とは

- クライアント/サーバーモデルを採用

- Docker クライアントである docker コマンドが Docker デーモン(dockerd)に通信してコンテナの操作を行う

- Docker デーモンが提供している REST API を利用している
  - [Docker Engine API Document](https://docs.docker.com/engine/api/v1.45/)
  <!-- TODO: figure by mermaid -->

---

## クライアント・サーバーモデルを体感する

**1. 通常時: 接続先を確認**
```sh
$ docker context ls
$ docker ps
```

**2. dockerd を止める**

**3. daemon が止まった状態で叩く**
```sh
$ docker ps
# Cannot connect to the Docker daemon at unix:///...
# Is the docker daemon running?
```

**4. dockerd を再起動して復旧確認**
```sh
$ docker context ls
$ docker ps
```

---

## 用語の整理

- Dockerfile: コンテナの作成手順書

- イメージ: コンテナを起動するのに必要なファイルシステムやメタデータを含んだもの。Dockerfileから作られる

- Docker Compose: 複数のDockerコンテナやボリューム、ネットワークを扱うためのツール

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
- タグを使ってのバージョン管理も可能

---

## Run（コンテナの実行）

- イメージからコンテナを作成し、実行

  - Dockerfile で作成したイメージ、レジストリにあるイメージどちらでも可能

---

## ハンズオン

<!-- - サンプルコード
  - https://github.com/haruto-takeuchi/docker-lecture -->

https://github.com/harucn/docker-lecture

---

## イメージの中身

```sh
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

## イメージファイルの解説

- manifest.json : イメージを構成するための情報を持ったファイル

- repositories : イメージの名前とタグの情報を持ったファイル

- 各ディレクトリ : イメージの各レイヤのファイルシステムの差分
  - VERSION : スキーマのバージョン
  - json : レイヤのメタデータ。後方互換性のために保持
  - **layer.tar : ファイルシステムの差分をまとめたtar**

（再登場）[Docker Image 仕様](https://github.com/moby/docker-image-spec?tab=readme-ov-file)より

---

## docker history でレイヤを確認する

```sh
$ docker history sample-image:1.0.0
```

```
IMAGE          CREATED BY                                      SIZE
b1c2d3e4f5a6   ENTRYPOINT ["npm" "start"]                      0B
<missing>      COPY src/ ./src                                 371B
<missing>      RUN mkdir src                                   0B
<missing>      RUN npm install                                 4.71MB
<missing>      COPY package*.json ./                           692B
<missing>      WORKDIR /usr/local/app                          0B
<missing>      CMD ["node"]                                    0B
...
```

Dockerfile の命令が1行 = 1レイヤに対応している

<!-- ---

## Docker Compose -->


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
