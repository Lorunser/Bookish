import DbConnection from "../db/DbConnection";
import { Router } from "express";
import BaseModel from "../models/BaseModel";


export default abstract class BaseController{
    dbc: DbConnection;
    router: Router;
    model: BaseModel;


    constructor(dbc: DbConnection, model: BaseModel){
        this.dbc = dbc;
        this.router = Router();

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
        //throw new Error('Not implemented must be overriden');

        let id = request.params.id;
        
        let queryString = `
            SELECT *
            FROM ${this.tableName}
            WHERE ${this.idName} = ${id}; 
        `;

        let json = await this.dbc.asyncOneOrNone(queryString);
        let model = new BaseModel(jsonBook);
        await book.populateNavsAsync(this.dbc);
        console.log(book);

        response.json(book);
    }
}