/**
 * Login user with the given authentication service. After a successful login, it saves the userId to session.
 */
module.exports = function(authenticator) {
    return async (req,res,next) => {
        const { email, password } = req.body;
        const result = await authenticator.loginUser({ email, password });
        if(result.success) {
            console.log(`User logged in successfully : ${result.user}`);
            req.session.userId = result.user.Id;
            req.user = result.user;
            return next();
        }
        else {
            console.log(`User failed to login : ${result.msg}`);
            return res.redirect('/');
        }
    }
}