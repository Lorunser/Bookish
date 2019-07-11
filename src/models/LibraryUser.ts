import BaseModel from './BaseModel';
import DbConnection from '../db/DbConnection';
import Loan from './Loan';

export default class LibraryUser extends BaseModel{
    
    //fields
    userid: Number;
    username: String;
    password: String;

    //navs
    loans: Array<Loan>;

    constructor(jsonFromDb){
        super(jsonFromDb);
    }

    async populateNavsAsync(dbc: DbConnection){
        let queryString = `
            SELECT *
            FROM Loans
            WHERE userid = ${this.userid};
        `;

        let jsonLoansArray = await dbc.asyncAll(queryString);
        let loansArray = jsonLoansArray.map((json) => new Loan(json));

        //loansArray.forEach(async (loan) => await loan._populateCopy(dbc));
        //loansArray = await Promise.all(loansArray);

        for(let loan of loansArray){
            await loan._populateCopy(dbc);
        }

        this.loans = loansArray;
    }
}