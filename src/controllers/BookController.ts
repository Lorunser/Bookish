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

        let jsonBook = await super.getByIdSupplied(bookid, "bookid");
        let book = new Book(jsonBook);
        await book.populateNavsAsync(this.dbc);

        response.json(book);
    }
}