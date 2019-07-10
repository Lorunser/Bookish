import express from 'express';
import DbConnection from './db/DbConnection';
import Book from './models/Book';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const dbConnection = new DbConnection("");
const app = express();
const port = 3000;
const secret = '12345';

//api
app.get('/books', async (request, response) => {
    let bookArray = await Book.getAllBooksAsync(dbConnection);
    response.json(bookArray);
});

// app.get('/login', async (request, response) => {
//     let webToken = jwt.sign(request.query, secret);
    
// });

app.post('/login', passport.authenticate('local', { successRedirect: '/books',
                                                    failureRedirect: '/login' }));
//serve frontend directory
app.use(express.static('frontend'));

//custom routes
//app.use('/test', express.static('frontend/test.html'));
//app.use('/timetable', express.static('frontend/timetable.html'));
//app.use('/history', express.static('frontend/history.html'));

//listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`))