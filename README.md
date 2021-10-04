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

# コードを修正してherokuにpushする
```
$ cd line-bot-database
$ sh git.sh
```
