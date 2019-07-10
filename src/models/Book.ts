import BaseModel from './BaseModel';
import Author from './Author';
import Copy from './Copy';
import DbConnection from '../db/DbConnection';

export default class Book extends BaseModel{
    
    //fields
    bookid: Number;
    isbn: String;
    title: String;

    //nav properties
    authors: Array<Author>;
    copies: Array<Copy>;

    constructor(jsonFromDb){
        super(jsonFromDb);
    }

    async populateAsync(dbc: DbConnection){        
        let queryString = `
            SELECT a.AuthorId, a.AuthorName
            FROM Authors as a
            JOIN BookAuthors as b
            ON a.AuthorId = b.AuthorId
            WHERE b.BookId = ${this.bookid};
        `;

        let jsonAuthorArray = await dbc.asyncAll(queryString);
        let authorArray = jsonAuthorArray.map((jsonAuthor) => new Author(jsonAuthor));

        this.authors = authorArray;
    }
}