import express from 'express';
import DbConnection from './db/DbConnection';
import passport from 'passport';
import { Strategy } from 'passport-local';
import LibraryUser from './models/LibraryUser';
const LocalStrategy = Strategy;


const dbc = new DbConnection("");
const app = express();
const port = 3000;

app.use(passport.initialize());
app.use(passport.session());


function verify(username, password, done){
  console.log('Here 2');
  let queryString = `
          SELECT *
          FROM LibraryUsers
          WHERE UserName = '${username}';  
      `;

  dbc.asyncOneOrNone(queryString)
    .then( (user) => {
      console.log(user);

      if(user === null){
        return done(new Error(`Username (${username}) incorrect`), false); // no such account
      }
      else if(user.password === password){
        return done(null, user); // correct password
      }
      else{
        return done(new Error(`Password (${password}) incorrect`), false);
      }
    }
  );
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('Here 2');
    let queryString = `
            SELECT *
            FROM LibraryUsers
            WHERE UserName = '${username}';  
        `;

    dbc.asyncOneOrNone(queryString)
      .then( (user) => {
        console.log(user);

        if(user === null){
          return done(new Error(`Username (${username}) incorrect`), false); // no such account
        }
        else if(user.password === password){
          return done(null, user); // correct password
        }
        else{
          return done(new Error(`Password (${password}) incorrect`), false);
        }
      }
    );
  }
));

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(user, done){
  done(null, user);
});

app.get('/login', express.static('frontend/login.html'))

app.post('/login', passport.authenticate('local', { successRedirect: '/books',failureRedirect: '/failure'}));
//serve frontend directory
app.use(express.static('frontend'));

//custom routes
//app.use('/test', express.static('frontend/test.html'));
//app.use('/timetable', express.static('frontend/timetable.html'));
//app.use('/history', express.static('frontend/history.html'));

//listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`))