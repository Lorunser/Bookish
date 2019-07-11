import BaseModel from './BaseModel';
import Book from './Book';
import Loan from './Loan';

export default class Copy extends BaseModel{
    
    //fields
    copyid: Number;
    bookid: Number;

    //nav property
    book: Book;
    loans: Array<Loan>

    constructor(jsonFromDb){
        super(jsonFromDb);
    }
}