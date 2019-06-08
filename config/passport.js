const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const { models } = require('../db/database');

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    function(email, password, done) {
        models.User.findOne({
            where: {
                Email: email
            }
        }).then(user => {
            if(!user) {
                return done(null, false, { message: 'Rossz email cím.' });
            }
            if(user.isValidPassword(password)) {
                return done(null,user);
            }
            else {
                return done(null, false, { message: 'Helytelen jelszó.' });
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.Id);
});
  
passport.deserializeUser(function(id, done) {
    models.User.findOne( {
        where: {
            Id: id
        }
    }).then(user => {
        done(null, user);
    });
});

module.exports = passport;