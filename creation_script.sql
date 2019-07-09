-- Database: bookish
DROP TABLE Book, LibraryUser, Author, Loan, BookAuthor CASCADE;

CREATE TABLE Book (
	ISBN BIGINT PRIMARY KEY,
	Title VARCHAR NOT NULL,
	NumCopies INT DEFAULT 1
);

CREATE TABLE LibraryUser (
	UserId SERIAL PRIMARY KEY,
	UserName VARCHAR NOT NULL
);

CREATE TABLE Author (
	AuthorId SERIAL PRIMARY KEY,
	AuthorName VARCHAR NOT NULL UNIQUE
);

CREATE TABLE Loan (
	ISBN BIGINT,
	UserId INT,
	ReturnDate DATE,
	FOREIGN KEY (ISBN) REFERENCES Book(ISBN),
	FOREIGN KEY (UserId) REFERENCES LibraryUser(UserId),
	PRIMARY KEY (ISBN, UserId)
);

CREATE TABLE BookAuthor (
	ISBN BIGINT,
	AuthorId INT,
	FOREIGN KEY (ISBN) REFERENCES Book(ISBN),
	FOREIGN KEY (AuthorId) REFERENCES Author(AuthorId),
	PRIMARY KEY (ISBN, AuthorId)
);


--populate
INSERT INTO Author(AuthorName)
VALUES 
('Anthony Horowitz'), 
('George Orwell'), 
('Aldous Huxley');

INSERT INTO Book(ISBN, Title, NumCopies)
VALUES 
(9781471331435,'1984', 3),
(9782013224635, 'StormBreaker', 7),
(9782435647654, 'Brave New World', 2);

INSERT INTO LibraryUser(UserName)
VALUES
('Josh Cudby'),
('Lawrence Tray');

