import BaseModel from './BaseModel';
import Book from './Book';
import Loan from './Loan';
import DbConnection from '../db/DbConnection';

export default class Copy extends BaseModel{
    
    //fields
    copyid: Number;
    bookid: Number;

    //nav property
    book: Book;
    loans: Array<Loan>

    constructor(jsonFromDb){
        super(jsonFromDb);
    }

    async populateNavsAsync(dbc: DbConnection){
        throw new Error("not implemented populateNavs in Copy");
    }

    async _populateBook(dbc: DbConnection){
        let queryString = `
            SELECT *
            FROM Books
            WHERE bookid = ${this.bookid};
        `;

        let jsonBook = await dbc.asyncOneOrNone(queryString);
        let book = new Book(jsonBook);

        this.book = book;
    }
}