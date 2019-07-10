-- Database: bookish
DROP TABLE Books, LibraryUsers, Authors, Loans, BookAuthors, Copies CASCADE;

CREATE TABLE Books (
	BookId SERIAL PRIMARY KEY,
	ISBN VARCHAR UNIQUE,
	Title VARCHAR NOT NULL
);

CREATE TABLE LibraryUsers (
	UserId SERIAL PRIMARY KEY,
	UserName VARCHAR NOT NULL
);

CREATE TABLE Authors (
	AuthorId SERIAL PRIMARY KEY,
	AuthorName VARCHAR NOT NULL UNIQUE
);

CREATE TABLE Copies (
	CopyId SERIAL PRIMARY KEY,
	BookId INT,
	FOREIGN KEY (CopyId) REFERENCES Books(BookId)
);

CREATE TABLE Loans (
	LoanId INT PRIMARY KEY, 
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
('Aldous Huxley');

INSERT INTO Books(ISBN, Title)
VALUES 
('9781471331435','1984'),
('9782013224635', 'StormBreaker'),
('9782435647654', 'Brave New World');

INSERT INTO LibraryUsers(UserName)
VALUES
('Josh Cudby'),
('Lawrence Tray');


