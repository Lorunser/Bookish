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
        let completeModels = [];

        for(let model of models){
            completeModels.push(await model.populateNavsAsync());
        }
        
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
        console.log(request.body);
        let jsonModel = request.body;

        let model = new this.Model(jsonModel);

        await this.Model.query().insert(model);
    }
}