import BaseController from "./BaseController";
import Author from "../models/Author";

export default class AuthorController extends BaseController<Author>{

    constructor(passport: any){
        super(passport, Author);
    }
}