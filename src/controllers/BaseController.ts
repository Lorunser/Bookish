import DbConnection from "../db/DbConnection";
import { Router } from "express";
import BaseModel from "../models/BaseModel";


export default class BaseController{
    dbc: DbConnection;
    router: Router;
    tableName: String;

    constructor(dbc: DbConnection, tableName: String){
        this.dbc = dbc;
        this.router = Router();
        this.tableName = tableName;

        //map routes
        this.router.get('/', /*passport authentication */ this.getAll.bind(this));
        this.router.get('/:id', /*passport */ this.getById.bind(this));
    }

    async getAll(request, response){

        let queryString: String = `
            SELECT *
            FROM ${this.tableName};
        `;

        let jsonDbArray = await this.dbc.asyncAll(queryString);
        let modelArray = jsonDbArray.map((jsonBook) => new BaseModel(jsonBook));

        console.log(modelArray);
        response.json(modelArray);
    }

    async getById(request, response){
        throw new Error('Not implemented must be overriden');
    }
}