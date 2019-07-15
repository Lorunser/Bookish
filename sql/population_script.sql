-- Database: bookish

--populate
INSERT INTO Authors(name)
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

INSERT INTO Users(username, password)
VALUES
('Josh Cudby', 'Josh'),
('Lawrence Tray', 'Lawrence');

/*
INSERT INTO BookAuthors(BookId, AuthorId)
VALUES
(3, 3),
(4, 4),
(4, 5);

INSERT INTO Copies(BookId)
VALUES
(1),(1),(1),(3),(3),(3),(4),(4),(4);

INSERT INTO Loans(CopyId, UserId)
VALUES
(1,1),
(3,1),
(5,1),
(7,2),
(10,2);
*/