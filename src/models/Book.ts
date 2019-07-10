import BaseModel from './BaseModel';

export default class Book extends BaseModel{
    
    //fields
    bookid: Number;
    isbn: String;
    title: String;

    constructor(jsonFromDb){
        super(jsonFromDb);
    }
}