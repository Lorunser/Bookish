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
app.post('/login', passport.authenticate('local', { successRedirect: '/books', failureRedirect: '/failure'}));

//books
const bookController = new BookController(dbc);
app.use('/books', bookController.router);

//authors
const authorController = new AuthorController(dbc);
app.use('/authors', authorController.router);

//users
const userController = new UserController(dbc);
app.use('/users', userController.router);

//loans
const loanController = new LoanController(dbc);
app.use('/loans', loanController.router);

//serve frontend directory
app.use(express.static('frontend'));

//listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`))