const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        Id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        Email : {
            type: DataTypes.STRING,
            allowNull: false,
            validate : {
                isEmail : true
            }
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {
        hooks: {
            beforeCreate: function(user, options) {
                const hashed_password = bcrypt.hashSync(user.Password, bcrypt.genSaltSync(10));
                user.Password = hashed_password;
            }
        },
        classMethods : {
            
        },
    });

    User.prototype.isValidPassword = function (password) {
        console.log("Jelszavak: " + password + " " + this.Password);
        return bcrypt.compareSync(password, this.Password);
    };

    User.associate = (models) => {

    }
    return User;
};