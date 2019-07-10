
export default class Book{
    
    //fields
    bookId: Number;
    ISBN: String;
    title: String;

    constructor(bookFromDb){
        this.bookId = bookFromDb.bookId;
        this.ISBN = bookFromDb.ISBN;
        this.title = bookFromDb.title;
    }

}