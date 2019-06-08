module.exports = async (req,res,next) => {
    const MenuItem = req.models.MenuItem;
    const categories = await MenuItem.findAll(
        {
            attributes: ['Category'],
            group: ['Category']
        }
    );
    res.locals.categories = categories;
    return next();
}