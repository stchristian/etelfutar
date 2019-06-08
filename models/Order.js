module.exports = function(sequelize, DataTypes) {
    const Order = sequelize.define("Orders", {
        Id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TotalPrice: {
            type: DataTypes.INTEGER
        },
        UserId: {
            type: DataTypes.INTEGER(11)
        }
    }, {
        tableName: 'Orders',
    });

    Order.associate = (models) => {
        Order.belongsTo(models.User);
        Order.hasMany(models.OrderItem);
    }

    return Order;
};