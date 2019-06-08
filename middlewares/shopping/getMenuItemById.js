/**
 * Get the menuItem by id. If no menuItem found with given id, res.locals.menuItem will be null.
 */
module.exports = async (req,res,next) => {
    const MenuItem = req.models.MenuItem;
    const menuItemId = req.body.menuItemId;

    const menuItem = await MenuItem.findOne({
        where : {
            id: menuItemId
        }
    });

    if(menuItem) {
        res.locals.menuItem = menuItem;
    }
    else {
        res.locals.menuItem = null;
    }
    return next();
}