import DbConnection from "../db/DbConnection";
import { Router } from "express";
import BaseModel from '../models/BaseModel';

export default abstract class BaseController{
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

        response.json(modelArray);
    }

    async getById(request, response){
        throw new Error('Not implemented must be overriden');        
    }

    async getByIdSupplied(id: Number, idName: String){        
        
        let queryString = `
            SELECT *
            FROM ${this.tableName}
            WHERE ${idName} = ${id}; 
        `;

        let json = await this.dbc.asyncOneOrNone(queryString);
        return json;
    }
}