import {JwtStrategy, ExtractJwt} from 'passport-jwt';
import passport from 'passport';
import DbConnection from '../db/DbConnection';
let opts: Object = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret'};

let dbc = new DbConnection("");
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
     dbc.db.findOne({'username': jwt_payload.userid, 'password': jwt_payload.password}, function(err, user) {
        if (err) {
            return done(err, false);
import DbConnection from '../db/DbConnection';
import LibraryUser from '../models/LibraryUser';


export default class LoginController{
    dbc: DbConnection;

    constructor(dbc: DbConnection, passport){
        this.dbc = dbc;

        let opts: Object = {
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : 'secret'
        };

        passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
            let username = jwt_payload.username;
            let password = jwt_payload.password;

            //select LibraryUser with matching username
            let queryString = `
                SELECT *
                FROM LibraryUsers
                WHERE UserName = '${username}';  
            `;

            return this.dbc.asyncOneOrNone(queryString).then((libraryUser) => {
                if(libraryUser === null){
                    return done(new Error(`Username (${username}) incorrect`), false); // no such account
                }
                else if(libraryUser.password === password){
                    return done(null, libraryUser); // correct password
                }
                else{
                    return done(new Error(`Password (${password}) incorrect`), false);
                }
            });            
        }));

    }

    async verify(jwt_payload: LibraryUser, done): Promise<any>{
        let username = jwt_payload.username;
        let password = jwt_payload.password;

        //select LibraryUser with matching username
        let queryString = `
            SELECT *
            FROM LibraryUsers
            WHERE UserName = '${username}';  
        `;

        let libraryUser: LibraryUser = await this.dbc.asyncOneOrNone(queryString);
        
        if(libraryUser === null){
            return done(new Error(`Username (${username}) incorrect`), false); // no such account
        }
        else if(libraryUser.password === password){
            return done(null, libraryUser); // correct password
        }
        else{
            return done(new Error(`Password (${password}) incorrect`), false);
        }
    }
}