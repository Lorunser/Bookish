//express and authentication
import express from 'express';
import passport from 'passport';
import {connectionstring} from './web.config';

//Controllers
import BookController from './controllers/BookController';
import LoginController from './controllers/LoginController';
import AuthorController from './controllers/AuthorController';
import UserController from './controllers/UserController';
import LoanController from './controllers/LoanController';

//DB stuff
import { Model } from 'objection';
import Knex from 'knex';

//express
const app = express();
const port = 3000;
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//db
const knex = Knex({
    client: 'pg',
    connection: connectionstring
});

// Give the knex instance to objection.
Model.knex(knex);

//login
const loginController = new LoginController(passport);
app.use('/login', loginController.router);

//books
const bookController = new BookController(passport);
app.use('/api/books', bookController.router);
app.use('/books', express.static('frontend/books.html'));

//authors
const authorController = new AuthorController(passport);
app.use('/api/authors', authorController.router);
app.use('/authors', express.static('frontend/authors.html'));

//users
const userController = new UserController(passport);
app.use('/api/users', userController.router);
app.use('/users', express.static('frontend/users.html'));

//loans
const loanController = new LoanController(passport);
app.use('/api/loans', loanController.router);

//serve frontend directory
app.use(express.static('frontend'));

//listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`))