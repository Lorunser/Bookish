import BaseController from "./BaseController";
import DbConnection from "../db/DbConnection";
import LibraryUser from "../models/LibraryUser"
import {Response} from "express";


export default class UserController extends BaseController<LibraryUser>{

    constructor(dbc: DbConnection, passport: any){
        super(dbc, passport, LibraryUser);
    }
}