var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var crypto = require("crypto");
var async = require('async');
var path = require("path");

var sendMessage = require('./lib/sendMessage.js');
var messageTemplate = require('./lib/messageTemplate.js');
var gnavi = require('./lib/gnaviapi.js');
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
  res.send('<h1>LINE BOT の開発セミナーへようこそ</h1>');
});

app.get('/index', function(request, response) {
  response.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/home', function(request, response) {
  response.sendFile(path.join(__dirname + '/views/home.html'));
});

// async.waterfall([function(){}], function(){})
app.post('/callback', function(req, res) {
  async.waterfall([
      function(callback) {

        let event_data = req.body['events'][0];

        // リクエストがLINE Platformから送られてきたか確認する
        if (!validate_signature(req.headers['x-line-signature'], req.body)) {
          return;
        }
        // テキストか画像が送られてきた場合のみ返事をする
        if (
          (event_data['type'] != 'message') ||
          ((event_data['message']['type'] != 'text') &&
            (event_data['message']['type'] != 'image'))
        ) {
          return;
        }

        // ユーザIDを取得する
        var user_id = event_data['source']['userId'];
        var message_id = event_data['message']['id'];
        // 'text', 'image' ...
        var message_type = event_data['message']['type'];
        var message_text = event_data['message']['text'];

        if (event_data['source']['type'] != 'user') return;

        request.get(getProfileOption(user_id), function(error, response, body) {
          if (!error && response.statusCode == 200) {
            callback(req, body['displayName'], message_id, message_type, message_text);
          }
        });
      },
    ],

    // 返事を生成する関数
    function(req, displayName, message_id, message_type, message_text) {

      var message = "";
      message = "hello, " + displayName + "さん"; // helloと返事する
      // message = message_text; // おうむ返しする
      // message = message_text + "[" + message_text.length + "文字]";
      sendMessage.send(req, [messageTemplate.textMessage(message_text)]);
      
      // var url = "https://i.imgur.com/I5AZqHV.png"
      // sendMessage.send(req, [
      //   messageTemplate.imageMessage(url)
      // ]);

      // データベースを使う場合、下記のコードはコメントアウトしてください
      //sendMessage.send(req, [messageTemplate.textMessage(message), messageTemplate.quickMessage("質問に答えてね！")]);

      // // flexメッセージを使う
      // var title = "質問";
      // var imageUrl = "https://i.imgur.com/I5AZqHV.png";
      // var choices = ["選択肢1", "選択肢2", "選択肢3", "選択肢4"];
      // var answers = ["回答1", "回答2", "回答3", "回答4"];
      // sendMessage.send(req, [messageTemplate.customQuestionMessage(title, imageUrl, choices, answers)]);

      // データベースを使って返信する場合、こちらのコメントを解除してください
      //databaseSample(req, message_text);
      
      ////////////////////
      // ぐるなびAPIパート //
      ////////////////////
      // 住所 改行 キーワード
      // のフォーマットでメッセージを送ってください
      // gnavi.api(req.body, message_text, function(result) {
      //   var text = result['name']; // + "\n" + result['address'] + "\n" + result['opentime'];
      //   sendMessage.send(req, [
      //     messageTemplate.textMessage(text),
      //     messageTemplate.textMessage(result['url'])
      //     // messageTemplate.imageMessage(result['shop_image1']),
      //     // messageTemplate.imageMessage(result['shop_image2'])
      //   ]);
      //   return;
      // });

      return;
    }
  );
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
      messageTemplate.customQuestionMessage(
        r.question_text,
        r.imageurl,
        [r.choice1, r.choice2, r.choice3, r.choice4],
        [r.answer1, r.answer2, r.answer3, r.answer4]
      )
    ]);
  });
}

// 引数に指定した値以下のランダムな数値を取得する
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app.listen(app.get('port'), function() {
  console.log('Node app is running');
});

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