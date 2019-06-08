module.exports = function(sequelize, DataTypes) {
    const OrderItem = sequelize.define("OrderItems", {
        Id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        Quantity: {
            type: DataTypes.INTEGER,
        },
        UserId: {
            type: DataTypes.INTEGER(11),
        },
        MenuItemId: {
            type: DataTypes.INTEGER(11).UNSIGNED
        },
        OrderId: {
            type: DataTypes.INTEGER(11)
        },
        Price: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'OrderItems',
    });

    OrderItem.getCartTotalForUser = async (userId, transaction) => {
        const result = await OrderItem.findOne({
            attributes: [[sequelize.fn('sum', sequelize.col('Price')), 'TotalPrice']],
            group: ['UserId'],
            where: {
                UserId: userId,
                OrderId: null,
            },
            transaction
        });
        let totalPrice = 0;
        if(result) {
            totalPrice = parseInt(result.get("TotalPrice"));
        }
        return totalPrice;
    }

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.User);
        OrderItem.belongsTo(models.MenuItem);
        OrderItem.belongsTo(models.Order);
    }

    return OrderItem;
};