import BaseController from "./BaseController";
import DbConnection from "../db/DbConnection";


export default class LoanController extends BaseController{

    constructor(dbc: DbConnection){
        super(dbc, "Loans");
    }
}