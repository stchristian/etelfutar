/**
 * Logout user
 */
module.exports = function() {
    return (req,res,next) => {
        delete req.session.userId;
        return res.redirect('/');
    }
}