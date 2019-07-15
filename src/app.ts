import express from 'express';
import DbConnection from './db/DbConnection';
import BookController from './controllers/BookController';
import passport from 'passport';
import LoginController from './controllers/LoginController';
import AuthorController from './controllers/AuthorController';
import UserController from './controllers/UserController';
import LoanController from './controllers/LoanController';

//express
const app = express();
const port = 3000;
app.use(passport.initialize());
app.use(passport.session());

//db
const dbc = new DbConnection("");

//login
const loginController = new LoginController(dbc, passport);
app.use('/login', loginController.router);

//books
const bookController = new BookController(dbc, passport);
app.use('/api/books', bookController.router);
app.use('/books', express.static('./frontend/books.html'));

//authors
const authorController = new AuthorController(dbc, passport);
app.use('/api/authors', authorController.router);
app.use('/authors', express.static('frontend/authors.html'));

//users
const userController = new UserController(dbc, passport);
app.use('/api/users', userController.router);
app.use('/users', express.static('frontend/users.html'));

//loans
const loanController = new LoanController(dbc, passport);
app.use('/api/loans', loanController.router);

//serve frontend directory
app.use(express.static('frontend'));

//listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`))