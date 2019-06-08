/**
 * Get the user's cart items
 */
module.exports = async (req,res,next) => {
    if(typeof req.user == 'undefined') {
        return next();
    }
    const OrderItem = req.models.OrderItem;
    const MenuItem = req.models.MenuItem;

    res.locals.cartItems = await OrderItem.findAll({
        where: {
            UserId: req.user.Id,
            OrderId: null
        },
        include: [
            {
                model: MenuItem,
                as: 'MenuItem'
            }
        ]
    });
    return next();
}