PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS question_likes;
DROP TABLE IF EXISTS replies;
DROP TABLE IF EXISTS question_follows;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS users;

CREATE TABLE users( 
    id INTEGER PRIMARY KEY,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL
);

CREATE TABLE questions( 
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    associated_author_id INTEGER NOT NULL,
    FOREIGN KEY(associated_author_id) REFERENCES users(id)
);

CREATE TABLE question_follows( 
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(question_id) REFERENCES questions(id)
);

CREATE TABLE replies( 
    id INTEGER PRIMARY KEY,
    subject_question_id INTEGER NOT NULL,
    parent_reply_id INTEGER,
    user_id INTEGER NOT NULL,
    body TEXT NOT NULL,
    FOREIGN KEY(subject_question_id) REFERENCES questions(id),
    FOREIGN KEY(parent_reply_id) REFERENCES replies(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE question_likes(
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(question_id) REFERENCES questions(id)
);

INSERT INTO 
    users (fname, lname)
VALUES
    ('Ned', 'Stark'),
    ('Kush', 'Patel'),
    ('Earl', 'Sweatshirt');

INSERT INTO 
    questions (title, body, associated_author_id)
VALUES
    ('Ned Question', 'NED NED NED', 1),
    ('Kush Question', 'KUSH KUSH KUSH', 1),
    ('Earl Question', 'MEOW MEOW MEOW', 1);

INSERT INTO 
    question_follows (user_id, question_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (1, 3),
    (2, 3),
    (3, 2);

INSERT INTO 
    replies (subject_question_id, parent_reply_id, user_id, body)
VALUES
    (2, NULL, 1, 'Terrible question!'),
    (2, 1, 2, 'Nice reply!');

INSERT INTO 
    question_likes (user_id, question_id)
VALUES
    (3, 2),
    (2, 2),
    (1, 3);



