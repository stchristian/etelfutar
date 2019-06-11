const Sequelize = require("sequelize");

/**
 * This middleware creates a new user if no user exists with the given email address. If user has been created succesfully, it is placed on res.locals.
 */
module.exports = async (req,res,next) => {
    const User = req.models.User;
    const {email, password } = req.body;
    console.log(password);
    if(password.length < 6) {
        req.flash('register_error', 'A jelszó legyen hosszabb mint 6 karakter');
        return next();
    }
    const user = await User.findOne({ where: { Email: email}}, {});
    if(!user){
        try {
            const newUser = await User.create({
                Email: email,
                Password: password
            });
            res.locals.user = newUser;
        }
        catch(err) {
            if(err instanceof Sequelize.ValidationError) {
                const arr = err.errors.map(e => e.message);
                console.log(arr);
                req.flash('register_error', arr);
            }
        }
    }
    return next();
}

