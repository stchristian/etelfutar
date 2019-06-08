const passport = require('../config/passport');

module.exports = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        //Hiba történt
        if(err) {
            return next(err);
        }
        //Nem sikerült a bejelentkezés
        if(!user) {
            return res.redirect('/');
        }
        //Sikerült a bejelentkezés
        req.login(user, (err) => {
            if(err) return next(err);
            return res.redirect('/dashboard');
        })
    })(req, res, next);
};