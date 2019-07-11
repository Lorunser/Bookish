import BaseController from "./BaseController";
import DbConnection from "../db/DbConnection";
import LibraryUser from "../models/LibraryUser"
import {Response} from "express";


export default class UserController extends BaseController{

    constructor(dbc: DbConnection){
        super(dbc, "LibraryUsers");
    }

    async getById(request, response: Response){
        let id = request.params.id;

        let jsonUser = await super.getByIdSupplied(id, "userid");
        let user = new LibraryUser(jsonUser);
        await user.populateNavsAsync(this.dbc);

        response.json(user);
    }
}