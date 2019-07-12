import DbConnection from "../db/DbConnection";

export default class BaseModel{    
    tableName: String = 'NOT IMPLEMENTED';
    keyName: String = 'NOT IMPLEMENTED';

    constructor(jsonFromDb, tableName: String, keyName: String){
        for(let key in jsonFromDb){
            let value = jsonFromDb[key];
            this[key] = value;
        }

        this.tableName = tableName;
        this.keyName = keyName;
    }

    async populateNavsAsync(dbc: DbConnection){
        throw new Error('Not implemented must be overriden')
    }
}