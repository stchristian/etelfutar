/**
 * Submits the order with the items in the user's cart.
 */
module.exports = async (req,res,next) => {
    if(typeof req.user == "undefined") {
        return next();
    }

    const userId = req.user.Id;
    const {firstName, lastName, address, phoneNumber} = req.body;

    const {OrderItem, Order} = req.models;
    const sequelize = req.sequelize;

    const cartItems = res.locals.cartItems;
    // Only place order if we have items in cart
    if(cartItems.length > 0) {
        const transaction = await sequelize.transaction();
        let totalPrice = 0;
        //Calculate totalPrice
        cartItems.forEach(item => {
            totalPrice += item.Price;
        })
        //Create Order
        const order = await Order.create({
            FirstName: firstName,
            LastName: lastName,
            Address: address,
            PhoneNumber: phoneNumber,
            TotalPrice: totalPrice,
            UserId: userId
        }, { transaction });
        //Update orderItems so they belong to an Order
        await OrderItem.update({
            OrderId: order.Id,
        },{
            where: {
                UserId: userId,
                OrderId: null
            },
            transaction
        });
        transaction.commit();
        res.locals.order = order;
    }
    return next();
}