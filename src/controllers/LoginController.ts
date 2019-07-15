import {Strategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import { Router, Response} from "express";
import express from 'express';
import User from '../models/User';


export default class LoginController{
    router: Router;
    secret: string;

    constructor(passport){
        this.router = Router();
        this.secret = (Math.random()+1).toString(36).substring(2, 7);

        //get login
        this.router.get('/', express.static('frontend/login.html'))

        //map routes
        this.router.post('/', this.authenticate.bind(this));
        
        let opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.secret
        } 
        console.log(`Secret is: ${opts.secretOrKey}`)

        passport.use(new Strategy(opts, function(jwt_payload, done){
            return verify(jwt_payload.username, done);
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
        const user = await User.query().findOne({username: username})
        
        try {
            if (user && user.password === password) {
                const payload = {
                    username: username,
                    password: password
                }
                const returnData = {
                    token: jwt.sign(payload, this.secret),
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

async function verify(username, done){
    const user = await User.query().findOne({username: username});

    try { 
        if (user) {
            console.log('successfully authenticated');
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}