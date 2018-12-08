// mysqlworkbenchなどのように、エクセルのようにデータを扱えるツールもあります
// テーブル名を「quiz」にした場合の例です、大文字は定数で、小文字は任意の文字列です

// 下記のコマンドでcodenvyにpostgresqlをinstallする
$ npm install psql
$ sudo apt-get install postgresql

// 自分のHerokuのダッシュボードから確認してデータベースを使用する
$ heroku pg:psql postgresql-aerodynamic-xxxxx --app xxxxxxx

// 下記のようにターミナルが切り替わればok
xxxxxxxx::DATABASE=>

// データベースを終了する
xxxxxxxx::DATABASE=> \q

// テーブル追加
CREATE TABLE quiz(
   id SERIAL,
   question_text TEXT NOT NULL,
   choice1 TEXT NOT NULL,
   choice2 TEXT NOT NULL,
   choice3 TEXT NOT NULL,
   choice4 TEXT NOT NULL,
   answer1 TEXT NOT NULL,
   answer2 TEXT NOT NULL,
   answer3 TEXT NOT NULL,
   answer4 TEXT NOT NULL,
   imageurl TEXT NOT NULL
);

// データ追加
// 画像URLはhttpではなく、https(SSL通信)のものを用意してください
// https://imgur.com/ にアップすると手軽にhttpsの画像を取得できます
INSERT INTO quiz (question_text, choice1, choice2, choice3, choice4, answer1, answer2, answer3, answer4, imageurl)
VALUES ('出題本文', '選択肢1', '選択肢2', '選択肢3', '選択肢4', '答え1', '答え2', '答え3', '答え4', 'https://pics.prcm.jp/2d801321d0793/72139800/jpeg/72139800.jpeg');

// データ更新したい場合、(個別)
UPDATE quiz SET imageUrl = 'https://i.imgur.com/VHPy9jo.jpg' WHERE id = 1;

// データ更新したい場合、(一括)
UPDATE quiz SET choice1 = "", choice2 = "", choice3 = "", choice4 = "", WHERE id = 1;

// 一覧表示する
SELECT * From quiz;

// 特定の列を表示する
SELECT id, choice1 From quiz;

// テーブルにカラムを追加
ALTER TABLE quiz ADD COLUMN imageUrl text;
