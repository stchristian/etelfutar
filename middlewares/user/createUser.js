/**
 * This middleware creates a new user if no user exists with the given email address. If user has been created succesfully, it is placed on res.locals.
 */
module.exports = async (req,res,next) => {
    const User = req.models.User;
    const {email, password } = req.body;
    const user = await User.findOne({ where: { Email: email}}, {});
    if(!user){
        const newUser = await User.create({
            Email: email,
            Password: password
        });
        res.locals.user = newUser;
    }
    return next();
}

