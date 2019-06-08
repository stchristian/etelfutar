module.exports =  (req,res,next) => {
    req.logout();
    return res.redirect('/');
}