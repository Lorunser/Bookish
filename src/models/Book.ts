import BaseModel from './BaseModel';
import DbConnection from '../db/DbConnection';

export default class Book extends BaseModel{
    
    //fields
    bookid: Number;
    isbn: String;
    title: String;

    constructor(jsonFromDb){
        super(jsonFromDb);
    }

    static async getAllBooksAsync(dbc: DbConnection){
        let queryString: String = `
            SELECT *
            FROM Books;
        `;

        let jsonDbArray = await dbc.asyncAll(queryString);
        let bookArray = jsonDbArray.map((jsonBook) => new Book(jsonBook));

        return bookArray;
    }
}