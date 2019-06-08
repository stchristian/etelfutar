/**
 * Creates a new cartItem with the given quantity or if already exists, updates it.
 */
module.exports = async (req, res, next) => {
    if (!res.locals.menuItem || typeof req.user == 'undefined' || typeof req.body.quantity == 'undefined') {
        return next();
    }

    const menuItem = res.locals.menuItem;
    const userId = req.user.Id;
    const OrderItem = req.models.OrderItem;
    const quantity = parseInt(req.body.quantity) || 1;
    const sequelize = req.sequelize;

    //Start transaction
    const transaction = await sequelize.transaction();

    const totalPrice = await OrderItem.getCartTotalForUser(userId, transaction);
    let cartItem = await OrderItem.findOne({
        where: {
            MenuItemId: menuItem.id,
            UserId: userId,
            OrderId: null,
        },
        transaction
    });

    // Check if newTotalPrice is greater than the max. In that case we stop
    const newTotalPrice = totalPrice - (cartItem ? cartItem.Price : 0) + menuItem.Price * quantity;
    if (newTotalPrice > process.env.MAX_CART_SIZE) {
        transaction.rollback();
        res.locals.messages.push("Túllépte a megengedett kosárméretet!");
        return next();
    } else if (newTotalPrice > 10000) {
        throw new Error("::RANDOM BUG::");
    }

    if (cartItem) {
        cartItem = await cartItem.update({
            Quantity: quantity,
            Price: menuItem.Price * quantity
        }, { transaction });
    }
    else {
        //Else we should create a new one.
        cartItem = await OrderItem.create({
            MenuItemId: menuItem.id,
            UserId: userId,
            OrderId: null,
            Quantity: quantity,
            Price: quantity * menuItem.Price
        }, { transaction });
    }

    res.locals.cartItem = cartItem;
    transaction.commit();
    return next();
}
