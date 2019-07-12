import DbConnection from "../db/DbConnection";
import { Router, Response } from "express";
import BaseModel from '../models/BaseModel';


export default abstract class BaseController<T extends BaseModel>{
    dbc: DbConnection;
    router: Router;
    passport: any;
    Model: new(json) => T;
    modelInstance: T;

    constructor(dbc: DbConnection, passport: any, Model: new(json) => T){
        this.dbc = dbc;
        this.router = Router();
        this.passport = passport;
        this.Model = Model;
        this.modelInstance = new this.Model([]);

        //GET
        this.router.get('/', this.passport.authenticate('jwt'), this.getAll.bind(this));
        this.router.get('/:id', this.passport.authenticate('jwt'), this.getById.bind(this));
        
        //POST
        this.router.post('/', this.passport.authenticate('jwt'), this.createNew.bind(this));
    }

    //#region GET requests
    // '/'
    async getAll(request, response: Response){
        let queryString: String = `
            SELECT *
            FROM ${this.modelInstance.tableName};
        `;

        let jsonDbArray = await this.dbc.asyncAll(queryString);
        let modelArray = jsonDbArray.map((json) => new this.Model(json));

        for(let model of modelArray){
            await model.populateNavsAsync(this.dbc);
        }

        response.json(modelArray);
    }

    // '/:id'
    async getById(request, response: Response){
        let id = request.params.id;
        
        let queryString = `
            SELECT *
            FROM ${this.modelInstance.tableName}
            WHERE ${this.modelInstance.keyName} = ${id}; 
        `;

        let json = await this.dbc.asyncOneOrNone(queryString);
        let model = new this.Model(json);
        await model.populateNavsAsync(this.dbc);

        response.json(model);
    }

    //#endregion


    //#region POST requests
    // '/'
    async createNew(request, response: Response){
        let jsonModel = request.params;

        let columnNamesArray = jsonModel.keys;
        let columnNamesCsv = columnNamesArray.join(',');

        let valuesArray = [];
        for(let key of columnNamesArray){
            valuesArray.push(jsonModel[key]);
        }
        let valuesCsv = valuesArray.join(',');

        let queryString = `
            INSERT INTO ${this.modelInstance.tableName}(${columnNamesCsv})
            VALUES (${valuesCsv});
        `;

        try{
            await this.dbc.asyncNone(queryString);
            response.sendStatus(201);
        }
        catch{
            response.send('Failed to create new object');
        }
    }
}