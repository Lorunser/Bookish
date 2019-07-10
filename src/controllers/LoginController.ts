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
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));