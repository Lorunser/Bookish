import DbConnection from "../db/DbConnection";
import Book from "../models/Book";
import BaseController from "./BaseController";


export default class BookController extends BaseController<Book>{

    constructor(dbc: DbConnection, passport: any){
        super(dbc, passport, Book);
    }
}