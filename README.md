# 環境

- Google Chrome  
https://www.google.co.jp/chrome/

- gmailアカウント取得  
https://accounts.google.com/SignUp?hl=ja

# Heroku アカウント

- Heroku アカウントの利用登録  
https://id.heroku.com/login

## やること

- ログイン
- herokuアプリを一つ作成
- `herokuアプリ名`を確認する -- \`A

# LINE Developers アカウント

- LINE Messaging API の利用登録  
https://developers.line.me/ja/

## やること

- プロバイダー追加
- チャンネル追加
- Channel Secretの取得
- アクセストークン（ロングターム）の再発行
- Webhook送信 `利用する`に設定
- Webhook URLをセットする `https://<herokuアプリ名>.herokuapp.com/callback` \`A を設定

# codenvy アカウント

codenvyアカウント登録
https://codenvy.io/site/login

## やること
- herokuと連携する
- LINE Messaging APIを利用するための準備をする

---

# codenvyでの作業

1. サイドバーからcreate workspaceを選択
2. STACKを選択 - Node
3. GitURLを指定する
```
https://github.com/x-hack-git/line-bot-database
```
4. heroku CLI のインストール
```
$ curl https://cli-assets.heroku.com/install.sh | sh
```
5. プロジェクトディレクトリへ移動して、heorkuへログイン
```
$ cd line-bot-database
$ heroku login --interactive
$ sh git.sh
```

# コードを修正してherokuにpushする
```
$ cd line-bot-database
$ sh git.sh
```
