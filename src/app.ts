import express from 'express';
import DbConnection from './db/DbConnection';
import BookController from './controllers/BookController';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const dbConnection = new DbConnection("");
const app = express();
const port = 3000;
const secret = '12345';

app.use(passport.initialize());
app.use(passport.session());

//api
const bookController = new BookController(dbConnection);
app.use('/books', bookController.router);

// app.get('/login', async (request, response) => {
//     let webToken = jwt.sign(request.query, secret);
    
// });

app.post('/login', passport.authenticate('jwt'), function(req, res) {
    res.send(req)
});
//serve frontend directory
app.use(express.static('frontend'));

//custom routes
//app.use('/test', express.static('frontend/test.html'));
//app.use('/timetable', express.static('frontend/timetable.html'));
//app.use('/history', express.static('frontend/history.html'));

//listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`))