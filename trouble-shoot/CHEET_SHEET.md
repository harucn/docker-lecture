## コマンドチートシート

### docker ps

実行中のコンテナ一覧を表示します。

```bash
docker ps          # 実行中のコンテナのみ
docker ps -a       # 終了済みのコンテナも含めて表示
```

| 列 | 意味 |
|----|------|
| `CONTAINER ID` | コンテナの識別子 |
| `IMAGE` | 元になったイメージ |
| `STATUS` | `Up`（起動中）/ `Exited`（終了済み）など |
| `PORTS` | ホスト側とコンテナ側のポートマッピング |
| `NAMES` | コンテナ名 |

### docker logs

コンテナの標準出力・標準エラー出力を表示します。

```bash
docker logs <コンテナ名 or ID>
docker logs --follow <コンテナ名>   # リアルタイムで追い続ける
docker logs --tail 50 <コンテナ名>  # 最新 50 行だけ表示
```

コンテナがクラッシュしたときのエラーメッセージもここに残っています。

### docker exec

起動中のコンテナの中でコマンドを実行します。

```bash
docker exec <コンテナ名> <コマンド>

# 例: コンテナ内でシェルを起動
docker exec -it <コンテナ名> sh

# 例: コンテナ内からアプリへアクセスして疎通確認
docker exec <コンテナ名> curl http://localhost:8080

# 例: コンテナ内のポート待ち受け状況を確認
docker exec <コンテナ名> ss -tlnp
```

`-it` はキーボード入力を受け付けるインタラクティブモード（シェルに入るときに使う）。

### docker inspect

コンテナやイメージの詳細情報を JSON で表示します。

```bash
docker inspect <コンテナ名>

# 終了コードだけ取り出す
docker inspect <コンテナ名> --format='{{.State.ExitCode}}'
```

終了コードの目安:

| exit code | 意味 |
|-----------|------|
| `0` | 正常終了 |
| `1` | アプリがエラーで終了 |
| `127` | 指定したコマンドが見つからない |
