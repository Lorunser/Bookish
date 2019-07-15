import BaseController from "./BaseController";
import DbConnection from "../db/DbConnection";
import Author from "../models/Author";


export default class AuthorController extends BaseController<Author>{

    constructor(dbc: DbConnection, passport: any){
        super(dbc, passport, Author);
    }
}