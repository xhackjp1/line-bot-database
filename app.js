var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var crypto = require("crypto");
var async = require('async');

var sendMessage = require('./lib/sendMessage.js');
var messageTemplate = require('./lib/messageTemplate.js');
//var pgManager = require('./lib/postgresManager.js'); // データベースを使う時に必要

// utilモジュールを使います。
var util = require('util');

app.set('port', (process.env.PORT || 8000));
// JSONの送信を許可
app.use(bodyParser.urlencoded({
  extended: true
}));
// JSONパーサー
app.use(bodyParser.json());

app.get('/', function(req, res) {
  // herokuのルートディレクトリにアクセスした時に表示される
  res.send('<h1>hello world</h1>');
});

// async.waterfall([function(){}], function(){})
app.post('/callback', function(req, res) {
  async.waterfall([
      function(callback) {
        // リクエストがLINE Platformから送られてきたか確認する
        if (!validate_signature(req.headers['x-line-signature'], req.body)) {
          return;
        }
        // テキストか画像が送られてきた場合のみ返事をする
        if (
          (req.body['events'][0]['type'] != 'message') ||
          ((req.body['events'][0]['message']['type'] != 'text') &&
            (req.body['events'][0]['message']['type'] != 'image'))
        ) {
          return;
        }

        // 特定の単語に反応させたい場合
        //if (req.body['events'][0]['message']['text'].indexOf('please input some word') == -1) {
        //    return;
        //}

        // ユーザIDを取得する
        var user_id = req.body['events'][0]['source']['userId'];
        var message_id = req.body['events'][0]['message']['id'];
        // 'text', 'image' ...
        var message_type = req.body['events'][0]['message']['type'];
        var message_text = req.body['events'][0]['message']['text'];
        if (req.body['events'][0]['source']['type'] == 'user') {
          request.get(getProfileOption(user_id), function(error, response, body) {
            if (!error && response.statusCode == 200) {
              callback(req, body['displayName'], message_id, message_type, message_text);
            }
          });
        }
      },
    ],

    // 返事を生成する関数
    function(req, displayName, message_id, message_type, message_text) {

      var message = "hello, " + displayName + "さん"; // helloと返事する
      //var message = message_text; // おうむ返しする
      //var message = message_text + "[" + message_text.length + "文字]";

      // データベースを使う場合、下記のコードはコメントアウトしてください
      //sendMessage.send(req, [messageTemplate.textMessage(message), messageTemplate.quickMessage("質問に答えてね！")]);

      sendMessage.send(req, [messageTemplate.sample()]);

      // データベースを使って返信する場合、こちらのコメントを解除してください
      //databaseSample(req, message_text);

      return;
    }
  );
});

app.listen(app.get('port'), function() {
  console.log('Node app is running');
});

// 実際にデータベースとのやりとりを行う
function databaseSample(req, sendword) {

  // データベースにアクセスする
  pgManager.get_words(function(result) {

    if (result.rowCount === 0) {
      sendMessage.send(req, [messageTemplate.textMessage("データはありません")]);
      return;
    }

    // ランダムに一件データを取得する
    var randomId = getRandomInt(result.rowCount);
    var r = result.rows[randomId];

    // 送信データを生成し、送信する
    sendMessage.send(req, [
      messageTemplate.imagemapMessage(
        [r.choice1, r.choice2, r.choice3, r.choice4],
        r.imageurl
      )
    ]);
  });
}

// 引数に指定した値以下のランダムな数値を取得する
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// LINE Userのプロフィールを取得する
function getProfileOption(user_id) {
  return {
    url: 'https://api.line.me/v2/bot/profile/' + user_id,
    proxy: process.env.FIXIE_URL,
    json: true,
    headers: {
      'Authorization': 'Bearer {' + process.env.LINE_CHANNEL_ACCESS_TOKEN + '}'
    }
  };
}

// 署名検証
function validate_signature(signature, body) {
  return signature == crypto.createHmac('sha256', process.env.LINE_CHANNEL_SECRET).update(new Buffer(JSON.stringify(body), 'utf8')).digest('base64');
}
