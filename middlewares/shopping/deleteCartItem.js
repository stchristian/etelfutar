module.exports = async (req,res,next) => {
    if(typeof req.user == 'undefined' || typeof req.params.cartItemId == 'undefined') {
        return next();
    }

    const OrderItem = req.models.OrderItem;
    const cartItemId = req.params.cartItemId;

    const rowsDestroyedCount = await OrderItem.destroy({
        where : {
            Id: cartItemId,
            OrderId : null,
            UserId: req.user.Id,
        }
    });
    return next();
};