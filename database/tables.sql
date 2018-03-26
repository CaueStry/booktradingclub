/*
CREATE SCHEMA
*/
CREATE SCHEMA booktradingclub;
/*
SET SCHEMA AS DEFAULT
*/
USE booktradingclub;

/*
CREATE TABLES
*/
CREATE TABLE Roles (
Role_ID CHAR(1),
Role_Name CHAR(5),
PRIMARY KEY (Role_ID)
);

CREATE TABLE SYS_User (
langara_id INTEGER,
first_name CHAR(50), 
last_name CHAR(50), 
email CHAR(100) NOT NULL,
upassword CHAR(255) NOT NULL,
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
description CHAR(255),
PRIMARY KEY (copy_id, owner_langara_id),
FOREIGN KEY (owner_langara_id) REFERENCES SYS_User(langara_id)
ON DELETE CASCADE,
FOREIGN KEY (book_id) REFERENCES Book(isbn13),
FOREIGN KEY (requested_by_langara_id) REFERENCES SYS_User(langara_id)
);

/*
POPULATE DB
*/
INSERT INTO Roles VALUES ('A', 'Admin');
INSERT INTO Roles VALUES ('U', 'User');

INSERT INTO sys_user (langara_id, first_name, last_name, email, upassword, salt, role_id) VALUES (100290512, 'Elian', 'Figueiredo', 'elian_gaspar@hotmail.com', '3ed8af9cacf92919bc34f4a034ac16140e1e3d349f199e94533f42acc630e3732c2c673ae4bdfe1173328132cd2ac774c010cb2fd6a7794c49a46dd90d3da110', '3cfce133c67eb6a7117d75fbcd8e3aa110f7b1c9d49c9916789641e327bf73387267f832160cfae2321ba3fc236f901e95ace8e44534e8e14bc8fa5324302d0c', 'U');
INSERT INTO sys_user (langara_id, first_name, last_name, email, upassword, salt, role_id) VALUES (100302918, 'Caue', 'Pinheiro', 'cauehier@gmail.com', '3ed8af9cacf92919bc34f4a034ac16140e1e3d349f199e94533f42acc630e3732c2c673ae4bdfe1173328132cd2ac774c010cb2fd6a7794c49a46dd90d3da110', '3cfce133c67eb6a7117d75fbcd8e3aa110f7b1c9d49c9916789641e327bf73387267f832160cfae2321ba3fc236f901e95ace8e44534e8e14bc8fa5324302d0c', 'U');
INSERT INTO sys_user (langara_id, first_name, last_name, email, upassword, salt, role_id) VALUES (100288803, 'Artyom', 'Lunyakin', 'artyomluu@gmail.com', '3ed8af9cacf92919bc34f4a034ac16140e1e3d349f199e94533f42acc630e3732c2c673ae4bdfe1173328132cd2ac774c010cb2fd6a7794c49a46dd90d3da110', '3cfce133c67eb6a7117d75fbcd8e3aa110f7b1c9d49c9916789641e327bf73387267f832160cfae2321ba3fc236f901e95ace8e44534e8e14bc8fa5324302d0c', 'U');
INSERT INTO sys_user (langara_id, first_name, last_name, email, upassword, salt, role_id) VALUES (100290513, 'Admin', 'Elian', 'elian.fig@gmail.com', '3ed8af9cacf92919bc34f4a034ac16140e1e3d349f199e94533f42acc630e3732c2c673ae4bdfe1173328132cd2ac774c010cb2fd6a7794c49a46dd90d3da110', '3cfce133c67eb6a7117d75fbcd8e3aa110f7b1c9d49c9916789641e327bf73387267f832160cfae2321ba3fc236f901e95ace8e44534e8e14bc8fa5324302d0c', 'A');
INSERT INTO sys_user (langara_id, first_name, last_name, email, upassword, salt, role_id) VALUES (100578901, 'John', 'Doe', 'john.doe@gmail.com', '3ed8af9cacf92919bc34f4a034ac16140e1e3d349f199e94533f42acc630e3732c2c673ae4bdfe1173328132cd2ac774c010cb2fd6a7794c49a46dd90d3da110', '3cfce133c67eb6a7117d75fbcd8e3aa110f7b1c9d49c9916789641e327bf73387267f832160cfae2321ba3fc236f901e95ace8e44534e8e14bc8fa5324302d0c', 'U');
INSERT INTO sys_user (langara_id, first_name, last_name, email, upassword, salt, role_id) VALUES (100290147, 'Abby', 'Morssy', 'abbymorssy@gmail.com', '3ed8af9cacf92919bc34f4a034ac16140e1e3d349f199e94533f42acc630e3732c2c673ae4bdfe1173328132cd2ac774c010cb2fd6a7794c49a46dd90d3da110', '3cfce133c67eb6a7117d75fbcd8e3aa110f7b1c9d49c9916789641e327bf73387267f832160cfae2321ba3fc236f901e95ace8e44534e8e14bc8fa5324302d0c', 'U');
INSERT INTO sys_user (langara_id, first_name, last_name, email, upassword, salt, role_id) VALUES (100302681, 'Marry', 'Jane', 'marry_jane@gmail.com', '3ed8af9cacf92919bc34f4a034ac16140e1e3d349f199e94533f42acc630e3732c2c673ae4bdfe1173328132cd2ac774c010cb2fd6a7794c49a46dd90d3da110', '3cfce133c67eb6a7117d75fbcd8e3aa110f7b1c9d49c9916789641e327bf73387267f832160cfae2321ba3fc236f901e95ace8e44534e8e14bc8fa5324302d0c', 'U');
INSERT INTO sys_user (langara_id, first_name, last_name, email, upassword, salt, role_id) VALUES (100288248, 'Barry', 'Allen', 'allen_barry@gmail.com', '3ed8af9cacf92919bc34f4a034ac16140e1e3d349f199e94533f42acc630e3732c2c673ae4bdfe1173328132cd2ac774c010cb2fd6a7794c49a46dd90d3da110', '3cfce133c67eb6a7117d75fbcd8e3aa110f7b1c9d49c9916789641e327bf73387267f832160cfae2321ba3fc236f901e95ace8e44534e8e14bc8fa5324302d0c', 'U');
INSERT INTO sys_user (langara_id, first_name, last_name, email, upassword, salt, role_id) VALUES (100290997, 'Tony', 'Stark', 'tony.stark@gmail.com', '3ed8af9cacf92919bc34f4a034ac16140e1e3d349f199e94533f42acc630e3732c2c673ae4bdfe1173328132cd2ac774c010cb2fd6a7794c49a46dd90d3da110', '3cfce133c67eb6a7117d75fbcd8e3aa110f7b1c9d49c9916789641e327bf73387267f832160cfae2321ba3fc236f901e95ace8e44534e8e14bc8fa5324302d0c', 'U');
INSERT INTO sys_user (langara_id, first_name, last_name, email, upassword, salt, role_id) VALUES (100578485, 'Scarlet', 'Witch', 'scarlet.witch@hotmail.com', '3ed8af9cacf92919bc34f4a034ac16140e1e3d349f199e94533f42acc630e3732c2c673ae4bdfe1173328132cd2ac774c010cb2fd6a7794c49a46dd90d3da110', '3cfce133c67eb6a7117d75fbcd8e3aa110f7b1c9d49c9916789641e327bf73387267f832160cfae2321ba3fc236f901e95ace8e44534e8e14bc8fa5324302d0c', 'U');

INSERT INTO student (langara_id, major) VALUES ('100290512', 'Computer Science');
INSERT INTO student (langara_id, major) VALUES ('100302918', 'Computer Science');
INSERT INTO student (langara_id, major) VALUES ('100288803', 'Computer Science');
INSERT INTO student (langara_id, major) VALUES ('100290513', 'Business Administration');
INSERT INTO student (langara_id, major) VALUES ('100578901', 'Nursing');

INSERT INTO staff (langara_id, position) VALUES ('100290147', 'Accountant');
INSERT INTO staff (langara_id, position) VALUES ('100302681', 'Technician');
INSERT INTO staff (langara_id, position) VALUES ('100288248', 'Delivery');
INSERT INTO staff (langara_id, position) VALUES ('100290997', 'Teacher');
INSERT INTO staff (langara_id, position) VALUES ('100578485', 'Nurse');

INSERT INTO book (isbn13, title, edition, author) VALUES (9780134322759, 'Web Development & Design Foundations With HTML5', '8th Edition', 'Terry Felke-Morris');
INSERT INTO book (isbn13, title, edition, author) VALUES (9781305090941, 'Networking', '7th Edition', 'Jill West');
INSERT INTO book (isbn13, title, edition, author) VALUES (9780321812520, 'Modern JavaScript Develop and Design', NULL, 'Larry Ullman');
INSERT INTO book (isbn13, title, edition, author) VALUES (9780134583266, 'Business Essentials', '8th Canadian Edition', 'Ronald J. Ebert');
INSERT INTO book (isbn13, title, edition, author) VALUES (9781926648538, 'Canadian Fundamentals Of Nursing', '5th Edition', 'Potter Perry');
INSERT INTO book (isbn13, title, edition, author) VALUES (9781259030765, 'Contemporary Canadian Business Law', '11th Edition', 'John A. Willes');
INSERT INTO book (isbn13, title, edition, author) VALUES (9780321867155, 'Campbell Biology: Concepts & Connections', '1st Edition', 'Jane B. Reece');
INSERT INTO book (isbn13, title, edition, author) VALUES (9781285858166, 'Exploring Art: A Global Thematic Approach', '5th Edition', 'Margaret Lazzari');
INSERT INTO book (isbn13, title, edition, author) VALUES (9780176532000, 'Cultural Anthropology: An Applied Perspective', '1st Edition', 'Gary P. Ferraro');
INSERT INTO book (isbn13, title, edition, author) VALUES (9787513806190, 'Contemporary Chinese Revised Edition', '2nd Edition', 'Zhongwei Wu');
INSERT INTO book (isbn13, title, edition, author) VALUES (9781305664791, 'Operations Management 6', '1st Edition', 'David Alan Collier');
INSERT INTO book (isbn13, title, edition, author) VALUES (9781576810453, 'Lean Enterprise Memory Jogger', '1st Edition', 'Richard L. MacInnes');

INSERT INTO owned_copy (owner_langara_id, book_id, book_condition, book_price, user_image_url, description) VALUES (100290512, 9780134322759, 'Used', 100, 'http://www-fp.pearsonhighered.com/assets/hip/images/bigcovers/0134322754.jpg', 'book used on CPSC 1030');
INSERT INTO owned_copy (owner_langara_id, book_id, book_condition, book_price, user_image_url, description) VALUES (100302918, 9781305090941, 'Used', 75, 'https://images-na.ssl-images-amazon.com/images/I/51-2VC%2BZQWL.jpg', 'book used on CPSC 1480');
INSERT INTO owned_copy (owner_langara_id, book_id, book_condition, book_price, user_image_url, description) VALUES (100288803, 9780321812520, 'Used', 115, 'https://images-na.ssl-images-amazon.com/images/I/41JheV5iqgL._SX402_BO1,204,203,200_.jpg', 'book used on CPSC 1045');
INSERT INTO owned_copy (owner_langara_id, book_id, book_condition, book_price, user_image_url, description) VALUES (100290513, 9780134583266, 'Used', 50, 'https://images-na.ssl-images-amazon.com/images/I/51Cn6rWchXL.jpg', 'book used on BUSM 1100');
INSERT INTO owned_copy (owner_langara_id, book_id, book_condition, book_price, user_image_url, description) VALUES (100578901, 9781926648538, 'Used', 60, 'https://images-na.ssl-images-amazon.com/images/I/41GOamk%2BumL.jpg', 'book used on NURS 1160');
INSERT INTO owned_copy (owner_langara_id, book_id, book_condition, book_price, user_image_url, description) VALUES (100290512, 9781259030765, 'New', 200, 'https://images-na.ssl-images-amazon.com/images/I/518FLvMfvRL._SX383_BO1,204,203,200_.jpg', 'book used on BUSM 1285');
INSERT INTO owned_copy (owner_langara_id, book_id, book_condition, book_price, user_image_url, description) VALUES (100290147, 9780321867155, 'Used', 80, 'https://images-na.ssl-images-amazon.com/images/I/51UVYyaQ8ZL._SX258_BO1,204,203,200_.jpg', 'book used on BIOL 1116');
INSERT INTO owned_copy (owner_langara_id, book_id, book_condition, book_price, user_image_url, description) VALUES (100302681, 9781285858166, 'New', 150, 'https://pictures.abebooks.com/isbn/9781305633919-us.jpg', 'book used on AHIS 1212');
INSERT INTO owned_copy (owner_langara_id, book_id, book_condition, book_price, user_image_url, description) VALUES (100288248, 9780176532000, 'Used', 120, 'https://images.cengagebrain.com/images/393638035155212816416228583751989305226.jpg', 'book used on ANTH 1120');
INSERT INTO owned_copy (owner_langara_id, book_id, book_condition, book_price, user_image_url, description) VALUES (100290997, 9787513806190, 'New', 110, 'https://pictures.abebooks.com/isbn/9787513806190-us-300.jpg', 'book used on CHIN 1115');
INSERT INTO owned_copy (owner_langara_id, book_id, book_condition, book_price, user_image_url, description) VALUES (100578485, 9781305664791, 'Used', 165, 'https://www1.alibris-static.com/om-with-om-online-1-term-6-months-printed-access-card/isbn/9781305664791_l.jpg', 'book used on BUSM 3200');
INSERT INTO owned_copy (owner_langara_id, book_id, book_condition, book_price, user_image_url, description) VALUES (100302918, 9781576810453, 'New', 192, 'https://images-na.ssl-images-amazon.com/images/I/51GCkqAqUJL._SX332_BO1,204,203,200_.jpg', 'book used on BUSM 3200');

/*
CREATE VIEWS
*/
CREATE VIEW ALL_AVAILABLE_BOOKS AS
SELECT OC.copy_id AS copy, OC.owner_langara_id AS bOwner, OC.book_price AS bPrice, OC.user_image_url AS bUrl, B.title, B.author
FROM owned_copy OC INNER JOIN book B ON OC.book_id = B.isbn13
WHERE OC.requested_by_langara_id IS NULL;
/*
SELECT TOP 5 ALL AVAILABLE BOOKS (VIEW)
*/
SELECT * FROM ALL_AVAILABLE_BOOKS LIMIT 5;
