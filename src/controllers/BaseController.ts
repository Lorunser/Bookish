import { Router, Response } from "express";
import BaseModel from '../models/BaseModel';
import { ModelClass } from "objection";


export default abstract class BaseController<T extends BaseModel>{
    router: Router;
    passport: any;
    Model: ModelClass<T>;

    constructor(passport: any, Model: ModelClass<T>){
        this.router = Router();
        this.passport = passport;
        this.Model = Model;

        //GET
        this.router.get('/', this.passport.authenticate('jwt'), this.getAll.bind(this));
        this.router.get('/:id', this.passport.authenticate('jwt'), this.getById.bind(this));
        
        //POST
        this.router.post('/', this.passport.authenticate('jwt'), this.createNew.bind(this));

        //without verification
        this.router.get('/unprotected', this.getAll.bind(this));
        this.router.get('/unprotected/:id', this.getById.bind(this));
    }

    //#region GET requests
    // '/'

    async getAll(request, response: Response): Promise<any>{
        //console.log(this.Model);
        let models = await this.Model.query();        
        let promisedModels = [];

        for(let model of models){
            promisedModels.push(model.populateNavsAsync());
        }

        let completeModels = await Promise.all(promisedModels);
        response.json(completeModels);
    }

    // '/:id'
    async getById(request, response: Response){
        let id = request.params.id;
        let model = new this.Model({id: id});        
        let completeModel = await model.populateNavsAsync();

        response.json(completeModel);
    }

    //#endregion


    //#region POST requests
    // '/'
    async createNew(request, response: Response){
        let jsonModel = request.body;
        let model = this.Model.fromJson(jsonModel);
        let insertedModel = await this.Model.query().insert(model);

        if(insertedModel){
            response.status(201).send(insertedModel);
        }
        else{
            response.status(400);
        }
    }
}