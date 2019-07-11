import DbConnection from "../db/DbConnection";

export default class BaseModel{    
    
    constructor(jsonFromDb){
        for(let key in jsonFromDb){
            let value = jsonFromDb[key];
            this[key] = value;
        }
    }

    async populateNavsAsync(dbc: DbConnection){
        throw new Error('Not implemented must be overriden')
    }
}