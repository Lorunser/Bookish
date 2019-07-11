import BaseModel from './BaseModel';
import Book from './Book';

export default class Author extends BaseModel{
    
    //fields
    authorid: Number;
    authorname: String;

    //nav props
    books: Array<Book>

    constructor(jsonFromDb){
        super(jsonFromDb);
    }
}