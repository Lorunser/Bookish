import BaseController from "./BaseController";
import User from "../models/User"

export default class UserController extends BaseController<User>{

    constructor(passport: any){
        super(passport, User);
    }
}