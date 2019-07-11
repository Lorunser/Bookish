import DbConnection from "../db/DbConnection";
import Book from "../models/Book";
import { Router } from "express";
import BaseController from "./BaseController";


export default class BookController extends BaseController{

    constructor(dbc: DbConnection){
        super(dbc, "Books");
    }

    async getById(request, response){
        let bookid = request.params.id;
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