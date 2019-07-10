import BaseModel from './BaseModel';
import Book from './Book';

export default class Copy extends BaseModel{
    
    //fields
    copyid: Number;
    bookid: Number;

    //nav property
    book: Book;

    constructor(jsonFromDb){
        super(jsonFromDb);
    }
}