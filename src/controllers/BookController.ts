import DbConnection from "../db/DbConnection";
import Book from "../models/Book";
import BaseController from "./BaseController";
import {Response} from "express";


export default class BookController extends BaseController{

    constructor(dbc: DbConnection, passport: any){
        super(dbc, "Books", passport);
    }

    async getById(request, response){
        let id = request.params.id;

        let jsonBook = await super.getByIdSupplied(id, "bookid");
        let book = new Book(jsonBook);
        await book.populateNavsAsync(this.dbc);

        response.json(book);
    }

    async getAll(request, response: Response){
        let queryString: String = `
            SELECT *
            FROM ${this.tableName};
        `;

        let jsonDbArray = await this.dbc.asyncAll(queryString);
        let modelArray = jsonDbArray.map((json) => new Book(json));

        for(let book of modelArray){
            await book.populateNavsAsync(this.dbc);
        }

        response.json(modelArray);
    }
}