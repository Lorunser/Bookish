import BaseController from "./BaseController";
import Loan from "../models/Loan";

export default class LoanController extends BaseController<Loan>{

    constructor(passport: any){
        super(passport, Loan);
    }
}