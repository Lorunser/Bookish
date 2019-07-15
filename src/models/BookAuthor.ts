import BaseModel from './BaseModel';
import Book from './Book';
import Author from './Author';

export default class BookAuthor extends BaseModel{
    //fields
    bookid: Number;
    authorid: Number;

    //nav properties
    book: Book;
    author: Author;

    constructor(jsonFromDb){
        super(jsonFromDb, 'bookauthors', 'COMPOSITE');
    }
}