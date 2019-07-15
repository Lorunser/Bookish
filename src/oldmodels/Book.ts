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
        super(jsonFromDb,'books', 'bookid');
    }

    async populateNavsAsync(dbc: DbConnection){        
        let authorsPromise = this._populateAuthorsAsync(dbc);
        let copiesPromise = this._populateCopiesAsync(dbc);

        await authorsPromise;
        await copiesPromise;
    }

    async _populateAuthorsAsync(dbc: DbConnection){
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

    async _populateCopiesAsync(dbc: DbConnection){
        let queryString = `
            SELECT *
            FROM Copies
            WHERE BookId = ${this.bookid};
        `;

        let jsonCopyArray = await dbc.asyncAll(queryString);
        let copyArray = jsonCopyArray.map((jsonCopy) => new Copy(jsonCopy));

        this.copies = copyArray;
    }
}