/**
 * Authentication service. 
 */
module.exports = function(User) {
    return {
        async loginUser(credentials) {
            const user = await User.findOne({
                where: {
                    Email: credentials.email
                }
            });
            if(!user) {
                return {
                    success: false,
                    user: null,
                    msg : "Nincs ilyen felhasználó"
                };
            }
            if(user.isValidPassword(credentials.password)) {
                return {
                    success: true,
                    user,
                    msg: "Sikeres bejelentkezés"
                };
            }
            else {
                return {
                    success: false,
                    user: null,
                    msg: "Helytelen jelszó"
                };
            }
        },
    }
}






