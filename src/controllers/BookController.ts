import DbConnection from "../db/DbConnection";
import Book from "../models/Book";
import { Router } from "express";
import Author from "../models/Author";


export default class BookController{
    dbc: DbConnection;
    router: Router;

    constructor(dbc: DbConnection){
        this.dbc = dbc;
        this.router = Router();

        //map routes
        this.router.get('/', /*passport authentication */ this.getAllBooks.bind(this));
        this.router.get('/:bookid', /*passport */ this.getBook.bind(this));
    }

    async getAllBooks(request, response){
        console.log('GET /books/');

        let queryString: String = `
            SELECT *
            FROM Books;
        `;

        let jsonDbArray = await this.dbc.asyncAll(queryString);
        let bookArray = jsonDbArray.map((jsonBook) => new Book(jsonBook));

        console.log(bookArray);
        response.json(bookArray);
    }

    async getBook(request, response){
        let bookid = request.params.bookid;
        console.log('GET /books/' + bookid);
        
        let queryString = `
            SELECT *
            FROM Books
            WHERE bookid = ${bookid}; 
        `;

        let jsonBook = await this.dbc.asyncOneOrNone(queryString);
        let book = new Book(jsonBook);
        await book.populateNavsAsync(this.dbc);
        console.log(book);

        response.json(book);
    }
}