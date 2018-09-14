
CREATE TABLE quiz(
   id INT PRIMARY KEY NOT NULL,
   choice1 TEXT NOT NULL,
   choice2 TEXT NOT NULL,
   choice3 TEXT NOT NULL,
   choice4 TEXT NOT NULL,
   answer INT
);

insert into quiz (id, choice1, choice2, choice3, choice4, answer) values (1, '選択肢1', '選択肢2', '選択肢3', '選択肢4', 3);
