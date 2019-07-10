import express from 'express';
import DbConnection from './db/DbConnection';
import Book from './models/Book';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
import jwt from 'jsonwebtoken';

const dbConnection = new DbConnection("");
const app = express();
const port = 3000;
const secret = '12345';
app.use(express.static('frontend'))

app.use(passport.initialize());
app.use(passport.session());

//api
app.get('/books', async (request, response) => {
    let bookArray = await Book.getAllBooksAsync(dbConnection);
    response.json(bookArray);
});

// app.get('/login', async (request, response) => {
//     let webToken = jwt.sign(request.query, secret);
    
// });
passport.use(new LocalStrategy(
    function(username, password, done) {
      dbConnection.db.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  app.get('/', async function(req, res) {
    try {
        res.sendFile('/mnt/c/Work/Training/Bookish/src/frontend/index.html')}
    catch (error){
        res.send(error);
    }
})

app.post('/login', passport.authenticate('local', { successRedirect: '/books',failureRedirect: '/login', failureFlash: true }));
//serve frontend directory
app.use(express.static('frontend'));

//custom routes
//app.use('/test', express.static('frontend/test.html'));
//app.use('/timetable', express.static('frontend/timetable.html'));
//app.use('/history', express.static('frontend/history.html'));

//listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`))