//import pgp from 'pg-promise';
const pgp = require('pg-promise')();

export default class DbConnection{

    //fields
    db: any;

    constructor(connectionString: String){
        const defaultConnectionString = 'postgres://bookish:JoshLawrence1@intlawtra:5432/bookish'; 

        if(connectionString === ""){
            connectionString = defaultConnectionString;
        }

        this.db = pgp(connectionString);
        //'SELECT * FROM Books;'
    }

    async executeQuery(sqlQuery: String): Promise<Array<Object>>{
        let result = await this.db.any(sqlQuery);
        return result;        
    }
}
