import BaseModel from './BaseModel';

export default class LibraryUser extends BaseModel{
    
    //fields
    userid: Number;
    username: String;

    constructor(jsonFromDb){
        super(jsonFromDb);
    }
}