-- Database: bookish

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