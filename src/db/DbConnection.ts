//import pgp from 'pg-promise';
const pgp = require('pg-promise')();

export default class DbConnection{

    //fields
    db: any;

    constructor(connectionString: String){
        const defaultConnectionString = 'postgres://bookish:JoshLawrence1@localhost:5432/bookish'; 

        if(connectionString === ""){
            connectionString = defaultConnectionString;
        }

        this.db = pgp(connectionString);
        //'SELECT * FROM Books;'
    }

    async asyncAll(sqlQuery: String): Promise<Array<any>>{
        let result = await this.db.any(sqlQuery);
        return result;        
    }

    async asyncOneOrNone(sqlQuery: String): Promise<any>{
        let result = await this.db.oneOrNone(sqlQuery);
        return result;
    }

    async asyncNone(sqlQuery: String){
        let promise = await this.db.none(sqlQuery);
        return promise;
    }
}
