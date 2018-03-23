CREATE TABLE Roles (
Role_ID CHAR(1),
Role_Name CHAR(5),
PRIMARY KEY (Role_ID)
);

INSERT INTO Roles VALUES ('A', 'Admin');
INSERT INTO Roles VALUES ('U', 'User');

CREATE TABLE SYS_User (
langara_id INTEGER,
first_name CHAR(50), 
last_name CHAR(50), 
address CHAR(255), 
email CHAR(100) NOT NULL,
password CHAR(255) NOT NULL,
salt CHAR(255) NOT NULL,
role_id CHAR(1) DEFAULT 'U',
PRIMARY KEY (langara_id),
FOREIGN KEY (role_id) REFERENCES Roles(Role_ID)
);

CREATE TABLE Student (
langara_id INTEGER,
major CHAR(50),
PRIMARY KEY (langara_id),
FOREIGN KEY (langara_id) REFERENCES SYS_User(langara_id)
ON DELETE CASCADE
);

CREATE TABLE Staff (
langara_id INTEGER,
position CHAR(50),
PRIMARY KEY (langara_id),
FOREIGN KEY (langara_id) REFERENCES SYS_User(langara_id)
ON DELETE CASCADE
);

CREATE TABLE User_Review (
langara_id_reviewer INTEGER,
langara_id_reviewee INTEGER,
rev_rating INTEGER NOT NULL,
rev_comment CHAR(255), 
rev_date DATE,
PRIMARY KEY (langara_id_reviewer, langara_id_reviewee),
FOREIGN KEY (langara_id_reviewer) REFERENCES SYS_User(langara_id),
FOREIGN KEY (langara_id_reviewee) REFERENCES SYS_User(langara_id)
);

CREATE TABLE Book (
isbn13 BIGINT,
title CHAR(255),
edition CHAR(50),
author CHAR(100),
cover_url CHAR(255),
description CHAR(255),
PRIMARY KEY (isbn13)
);

CREATE TABLE Owned_Copy (
copy_id INTEGER AUTO_INCREMENT,
owner_langara_id INTEGER,
book_id BIGINT NOT NULL,
requested_by_langara_id INTEGER,
book_condition CHAR(20),
book_price REAL,
user_image_url CHAR(255),
PRIMARY KEY (copy_id, owner_langara_id),
FOREIGN KEY (owner_langara_id) REFERENCES SYS_User(langara_id)
ON DELETE CASCADE,
FOREIGN KEY (book_id) REFERENCES Book(isbn13),
FOREIGN KEY (requested_by_langara_id) REFERENCES SYS_User(langara_id)
);
