/**
 * Fetch all menuItems and put it on res.locals. If query param 'category' is defined, the result is filtered.
 */
module.exports = async (req,res,next) => {
    const MenuItem = req.models.MenuItem
    res.locals.selectedCategory = '';
    let menuItems;
    if(req.query.category) {
        menuItems = await MenuItem.findAll(
            {
                where: { Category : req.query.category }
            }
        );
        res.locals.selectedCategory = req.query.category;
    }
    else {
        menuItems = await MenuItem.findAll();
    }
    res.locals.menuItems = menuItems;
    return next();
}