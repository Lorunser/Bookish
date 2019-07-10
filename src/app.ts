import express from 'express';
import DbConnection from './db/DbConnection';
const db = new DbConnection("");
const app = express();
const port = 3000;

//api
app.get('/books', async (request, response) => {
    let query = 'SELECT * FROM Books;';
    let bookArray = await db.executeQuery(query);
    response.json(bookArray);
});

//serve frontend directory
app.use(express.static('frontend'));

//custom routes
//app.use('/test', express.static('frontend/test.html'));
//app.use('/timetable', express.static('frontend/timetable.html'));
//app.use('/history', express.static('frontend/history.html'));

//listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`))