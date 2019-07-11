import DbConnection from '../db/DbConnection';
import {Strategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import { Router } from "express";



export default class LoginController{
    router: Router;
    dbc: DbConnection;

    constructor(dbc: DbConnection, passport){
        this.dbc = dbc;
        this.router = Router();
        //map routes
        this.router.post('/', /*passport authentication */ this.authenticate.bind(this));
        let opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret'
        } 
        passport.use(new Strategy(opts, function(jwt_payload, done){
            return verify(jwt_payload.username, done, dbc);
        }));

        passport.serializeUser(function(user, done){
            done(null, user);
        });
          
        passport.deserializeUser(function(user, done){
            done(null, user);
        });
    }
    async authenticate(request, response) {
        console.log('trying to authenticate');
        const username = request.query.username;
        const password = request.query.password;
        const queryString = `
        SELECT *
        FROM LibraryUsers
        WHERE UserName = '${username}';  
        `;
        console.log(username, password);
        try {
            const user = await this.dbc.asyncOneOrNone(queryString); 
            if (user && user.password === password) {
                const secret = 'secret'; 
                const payload = {
                    username: username,
                    password: password
                }
                const returnData = {
                    token: jwt.sign(payload, secret),
                    username: username
                };
                console.log('successfully authenticated')
                response.status(200).send(returnData); 
            } else {
                console.log('failed to authenticate')
                response.status(400).send({message: 'Username or password incorrect'})
            }
        } catch (err) {
            console.log('error in authentication')
            response.status(500).send({message: 'An error occurred'})
        }
        
    }
}

async function verify(username, done, dbc){
    let queryString = `
        SELECT *
        FROM LibraryUsers
        WHERE UserName = '${username}';  
    `;
    try { 
        let user = await dbc.asyncOneOrNone(queryString); 
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
    // if(user === null){
    //     return done(new Error(`Username (${username}) incorrect`), false); // no such account
    // }

    // else if(user.password === password){
    //     console.log("Successfully logged in " + username);
    //     return done(null, user); // correct password
    // }

    // else{
    //     return done(new Error(`Password (${password}) incorrect`), false);
    // }
}