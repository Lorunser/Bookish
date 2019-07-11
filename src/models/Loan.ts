import BaseModel from './BaseModel';
import Book from './Book';
import Copy from './Copy';
import LibraryUser from './LibraryUser';
import DbConnection from '../db/DbConnection';
import UserController from '../controllers/UserController';

export default class Loan extends BaseModel{
    
    //fields
    loanid: Number;
    copyid: Number;
    userid: Number;
    dateissued: Date;
    datedue: Date;
    datereturned: Date;

    //nav properties
    copy: Copy;
    user: LibraryUser;

    constructor(jsonFromDb){
        super(jsonFromDb);
    }


    async populateNavsAsync(dbc: DbConnection){
        let userPromise = this._populateUser(dbc);
        let copyPromise = this._populateCopy(dbc);
        
        await userPromise;
        await copyPromise;
    }

    async _populateUser(dbc: DbConnection){
        let queryString = `
            SELECT *
            FROM Users
            WHERE userid = ${this.userid};
        `;

        let jsonUser = await dbc.asyncOneOrNone(queryString);
        let user = new LibraryUser(jsonUser);

        this.user = user;
    }

    async _populateCopy(dbc: DbConnection){
        let queryString = `
            SELECT *
            FROM Copies
            WHERE copyid = ${this.copyid};
        `;

        let jsonCopy = await dbc.asyncOneOrNone(queryString);
        let copy = new Copy(jsonCopy);
        await copy._populateBook(dbc);

        this.copy = copy;
    }
}