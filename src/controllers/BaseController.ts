import DbConnection from "../db/DbConnection";
import { Router } from "express";


export default class BaseController{
    dbc: DbConnection;
    router: Router;

    constructor(dbc: DbConnection){
        this.dbc = dbc;
        this.router = Router();
    }
}