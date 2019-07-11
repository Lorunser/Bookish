import BaseModel from './BaseModel';
import Book from './Book';
import DbConnection from '../db/DbConnection';

export default class Author extends BaseModel{
    
    //fields
    authorid: Number;
    authorname: String;

    //nav props
    books: Array<Book>

    constructor(jsonFromDb){
        super(jsonFromDb);
    }

    async populateNavsAsync(dbc: DbConnection){        
        let queryString = `
            SELECT b.bookid, b.isbn, b.title
            FROM Books as b
            JOIN BookAuthors as ba
            ON b.BookId = ba.BookId
            WHERE ba.AuthorId = ${this.authorid};
        `;

        let jsonBookArray = await dbc.asyncAll(queryString);
        let bookArray = jsonBookArray.map((jsonBook) => new Book(jsonBook));

        this.books = bookArray;
    }
}