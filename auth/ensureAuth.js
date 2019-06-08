module.exports  = (req,res,next) => {
    if(req.isAuthenticated()) {
        res.locals.user = req.user;
        return next();
    }
    else {
        return res.redirect('/');
    }
};