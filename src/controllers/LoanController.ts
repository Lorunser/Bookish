import BaseController from "./BaseController";
import DbConnection from "../db/DbConnection";



export default class LoanController extends BaseController{

    constructor(dbc: DbConnection, passport: any){
        super(dbc, "Loans", passport);
    }
}