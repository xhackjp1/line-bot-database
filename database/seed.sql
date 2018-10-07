// mysqlworkbenchなどのように、エクセルのようにデータを扱えるツールもあります

// テーブル追加
CREATE TABLE quiz(
   id SERIAL,
   choice1 TEXT NOT NULL,
   choice2 TEXT NOT NULL,
   choice3 TEXT NOT NULL,
   choice4 TEXT NOT NULL,
   imageurl TEXT NOT NULL,
);

// データ追加
INSERT INTO quiz (id, choice1, choice2, choice3, choice4, imageurl) VALUES (1, '選択肢1', '選択肢2', '選択肢3', '選択肢4', 'https://i.imgur.com/vVJH42Q.jpg');

// データ更新(個別)
UPDATE quiz SET imageUrl = 'https://i.imgur.com/VHPy9jo.jpg' WHERE id = 1;

// データ更新(一括)
UPDATE quiz SET choice1 = "", choice2 = "", choice3 = "", choice4 = "", WHERE id = 1;

// 一覧表示
SELECT * From quiz;

// テーブルにカラムを追加
ALTER TABLE quiz ADD COLUMN imageUrl text;
