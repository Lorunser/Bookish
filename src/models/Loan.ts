import BaseModel from './BaseModel';
import Book from './Book';
import Copy from './Copy';
import LibraryUser from './LibraryUser';

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
}