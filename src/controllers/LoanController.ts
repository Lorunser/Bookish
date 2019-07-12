import BaseController from "./BaseController";
import DbConnection from "../db/DbConnection";
import Loan from "../models/Loan";



export default class LoanController extends BaseController<Loan>{

    constructor(dbc: DbConnection, passport: any){
        super(dbc, passport, Loan);
    }
}