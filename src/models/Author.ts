import BaseModel from './BaseModel';

export default class Author extends BaseModel{
    
    //fields
    authorid: Number;
    authorname: String;

    constructor(jsonFromDb){
        super(jsonFromDb);
    }
}