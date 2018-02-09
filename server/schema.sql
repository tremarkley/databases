CREATE DATABASE IF NOT EXISTS chat;

USE chat;

CREATE TABLE IF NOT EXISTS messages (
  /* Describe your table here.*/
  id INT AUTO_INCREMENT NOT NULL,
  username INT NOT NULL,
  room INT NOT NULL DEFAULT 1,
  message VARCHAR(255) NOT NULL DEFAULT '',
  PRIMARY KEY (id)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE IF NOT EXISTS rooms (
  id INT AUTO_INCREMENT NOT NULL,
  room VARCHAR(30) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS usernames (
  id INT AUTO_INCREMENT NOT NULL,
  username VARCHAR(30) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

ALTER TABLE messages ADD FOREIGN KEY (username) REFERENCES usernames (id);
ALTER TABLE messages ADD FOREIGN KEY (room) REFERENCES rooms (id);
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

