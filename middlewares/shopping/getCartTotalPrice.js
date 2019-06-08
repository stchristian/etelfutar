module.exports = async (req,res,next) => {
    if(typeof req.user == 'undefined') {
        return next();
    }

    const OrderItem = req.models.OrderItem;
    res.locals.totalPrice = await OrderItem.getCartTotalForUser(req.user.Id);
    return next();
}