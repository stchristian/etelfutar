/**
 * Ensure that user has logged in and userId is saved in the session. It will lookup the user via the userId and place on req.user.
 */
module.exports = function() {
    return async (req,res,next) => {
        const User = req.models.User;
        if(typeof req.session.userId == "undefined") {
            return res.redirect('/');
        }
        else {
            const user = await User.findOne( {
                where: {
                    Id: req.session.userId
                }
            });
            if(user) {
                req.user = user;
                res.locals.user = user;
                return next();
            }
            else {
                return res.redirect('/');
            }
        }
    };
};