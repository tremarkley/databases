DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  objectId INT AUTO_INCREMENT NOT NULL,
  username INT NOT NULL,
  roomname INT NOT NULL DEFAULT 1,
  `text` VARCHAR(255) NOT NULL DEFAULT '',
  PRIMARY KEY (objectId)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE rooms (
  id INT AUTO_INCREMENT NOT NULL,
  roomname VARCHAR(30) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE usernames (
  id INT AUTO_INCREMENT NOT NULL,
  username VARCHAR(30) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

ALTER TABLE messages ADD FOREIGN KEY (username) REFERENCES usernames (id);
ALTER TABLE messages ADD FOREIGN KEY (roomname) REFERENCES rooms (id);
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

