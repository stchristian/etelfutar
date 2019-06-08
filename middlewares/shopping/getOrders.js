/**
 * Fetch all orders of the logged in user
 */
module.exports = async (req,res,next) => {
    if(typeof req.user == "undefined") {
        return next();
    }
    const { Order, MenuItem, OrderItem } = req.models;
    const userId = req.user.Id;
    const orders = await Order.findAll({
        where: {
            UserId: userId,
        },
        include : [
            {
                model: OrderItem,
                as: 'OrderItems',
                include: [
                    {
                        model: MenuItem,
                        as: 'MenuItem'
                    }
                ]
            }
        ]
    });
    res.locals.orders = orders;
    return next();
}