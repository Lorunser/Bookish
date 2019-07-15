import Book from "../models/Book";
import BaseController from "./BaseController";


export default class BookController extends BaseController<Book>{

    constructor(passport: any){
        super(passport, Book);
    }
}