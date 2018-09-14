var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var crypto = require("crypto");
var async = require('async');

var sendMessage = require('./sendMessage.js');
var messageTemplate = require('./messageTemplate.js');
var pgManager = require('./postgresManager.js'); // データベースを使う時に必要

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

    function(req, displayName, message_id, message_type, message_text) {

      //var message = "hello, " + displayName + "さん"; // helloと返事する
      //var message = message_text; // おうむ返しする
      //var message = message_text + "[" + message_text.length + "文字]";

      //sendMessage.send(req, [messageTemplate.textMessage(message)]);

      // データベースを使う
      databaseSample(req, message_text);

      return;
    }
  );
});

app.listen(app.get('port'), function() {
  console.log('Node app is running');
});

// データベースとのやりとりを行う
function databaseSample(req, sendword) {

  const words = sendword.split(' ');

   if (words[0] === "list" || words[0] === "リスト") {
     // クイズ取得
     pgManager.get_words(function(result) {
  
       if (result.rowCount === 0) {
         sendMessage.send(req, [messageTemplate.textMessage("データはカラよ")]);
         return;
       }
       var allwords = "";
       var cnt;
       for (cnt = 0; cnt < result.rowCount; cnt++) {
         var r = result.rows[cnt];
         console.log(r.word);
         allwords += r.id + ":" + r.word + "\n";
       }
       sendMessage.send(req, [messageTemplate.textMessage(allwords)]);
     });
     return;
   }

  // ネタ取得
  pgManager.get_words(function(result) {
    // inspectで中身を見ることができます。
    console.log(util.inspect(result));
    console.log(result.rowCount);

    if (result.rowCount === 0) {
      sendMessage.send(req, [messageTemplate.textMessage("データはありません")]);
      return;
    }
    var randomId = Math.floor(Math.random() * result.rowCount);
    console.log("検索ID" + randomId);

    var r = result.rows[randomId];
    //console.log(array[Math.floor(Math.random() * array.length)]);
    sendMessage.send(req, [messageTemplate.textMessage(r.choice1)]);
  });
}

// メッセージの長さを返す
function textcount(body) {
  return body.length;
}

// ランダムな数値を取得する
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

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