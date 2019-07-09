import pgPromise from 'pg-promise';
const pgp = require('pg-promise');

class db_connection{
    db: pgp.

    db_connection(connectionString: String){
        const defaultConnectionString = 'postgres://bookish:JoshLawrence1@localhost:5432/bookish'; 
        if(connectionString === ""){
            connectionString = defaultConnectionString;
        }

        this.db = pgp(connectionString);
    }
}
