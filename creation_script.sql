-- Database: bookish
DROP TABLE Books, LibraryUsers, Authors, Loans, BookAuthors, Copies CASCADE;

CREATE TABLE Books (
	BookId SERIAL PRIMARY KEY,
	ISBN VARCHAR UNIQUE,
	Title VARCHAR NOT NULL
);

CREATE TABLE LibraryUsers (
	UserId SERIAL PRIMARY KEY,
	UserName VARCHAR NOT NULL Unique,
	Password VARCHAR
);

CREATE TABLE Authors (
	AuthorId SERIAL PRIMARY KEY,
	AuthorName VARCHAR NOT NULL UNIQUE
);

CREATE TABLE Copies (
	CopyId SERIAL PRIMARY KEY,
	BookId INT,
	FOREIGN KEY (BookId) REFERENCES Books(BookId)
);

CREATE TABLE Loans (
	LoanId SERIAL PRIMARY KEY, 
	CopyId INT,
	UserId INT,
	DateIssued DATE,
	DateDue DATE,
	DateReturned DATE,
	FOREIGN KEY (CopyId) REFERENCES Copies(CopyId),
	FOREIGN KEY (UserId) REFERENCES LibraryUsers(UserId)
);

CREATE TABLE BookAuthors (
	BookId INT,
	AuthorId INT,
	FOREIGN KEY (BookId) REFERENCES Books(BookId),
	FOREIGN KEY (AuthorId) REFERENCES Authors(AuthorId),
	PRIMARY KEY (BookId, AuthorId)
);


--populate
INSERT INTO Authors(AuthorName)
VALUES 
('Anthony Horowitz'), 
('George Orwell'), 
('Aldous Huxley'),
('Jonathan Haidt'),
('Greg Lukianoff');

INSERT INTO Books(ISBN, Title)
VALUES 
('9781471331435','1984'),
('9782013224635', 'StormBreaker'),
('9782435647654', 'Brave New World'),
('9782653976928', 'The Coddling of the American Mind');

INSERT INTO LibraryUsers(UserName, Password)
VALUES
('Josh Cudby', 'Josh'),
('Lawrence Tray', 'Lawrence');

INSERT INTO BookAuthors(BookId, AuthorId)
VALUES
(1, 2),
(2, 1),
(3, 3),
(4, 4),
(4, 5);

INSERT INTO Copies(BookId)
VALUES
(1),(1),(1),(2),(2),(3),(3),(3),(4),(4),(4);

INSERT INTO Loans(CopyId, UserId)
VALUES
(1,1),
(3,1),
(5,1),
(7,2),
(10,2);




