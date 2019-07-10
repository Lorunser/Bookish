import DbConnection from '../db/DbConnection';
import { Strategy } from 'passport-local';


export default class LoginController{
    dbc: DbConnection;

    constructor(dbc: DbConnection, passport){
        this.dbc = dbc;
        
        passport.use(new Strategy( function(username, password, done){
            return verify(username, password, done, dbc);
        }));

        passport.serializeUser(function(user, done){
            done(null, user);
        });
          
        passport.deserializeUser(function(user, done){
            done(null, user);
        });
    }
}

async function verify(username, password, done, dbc){
    let queryString = `
        SELECT *
        FROM LibraryUsers
        WHERE UserName = '${username}';  
    `;

    let user = await dbc.asyncOneOrNone(queryString);

    if(user === null){
        return done(new Error(`Username (${username}) incorrect`), false); // no such account
    }

    else if(user.password === password){
        console.log("Successfully logged in " + username);
        return done(null, user); // correct password
    }

    else{
        return done(new Error(`Password (${password}) incorrect`), false);
    }
}