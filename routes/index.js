const router = require("express").Router();

const db = require("../db/database");
const authService = require('../service/authenticator')(db.models.User);
const logoutUserMW = require('../middlewares/auth/logoutUser')();
const ensureAuthMW = require('../middlewares/auth/ensureAuth')();
const loginUserMW = require('../middlewares/auth/loginUser')(authService);

const createOrUpdateCartItemMW = require("../middlewares/shopping/createOrUpdateCartItem");
const getCartItemsMW = require("../middlewares/shopping/getCartItems");
const getCartTotalPriceMW = require("../middlewares/shopping/getCartTotalPrice");
const getCategoriesMW = require("../middlewares/shopping/getCategories");
const getMenuItemByIdMW = require("../middlewares/shopping/getMenuItemById");
const getMenuItemsMW = require("../middlewares/shopping/getMenuItems");
const getOrdersMW = require("../middlewares/shopping/getOrders");
const placeOrderMW = require("../middlewares/shopping/placeOrder");
const createUserMW = require("../middlewares/user/createUser");
const deleteCartItemMW = require("../middlewares/shopping/deleteCartItem");

router.get('/',
    (req,res,next ) => {
        if(req.session.userId) {
            return res.redirect("/dashboard");
        }
        else {
            return next();
        }
    },
    getCategoriesMW,
    getMenuItemsMW,
    (req,res) => {
        return res.render('index', { 
            register_error : req.flash('register_error'), 
            login_error: req.flash('login_error'),
            extractScripts: true ,
        });
    }
);

router.get('/dashboard',
    ensureAuthMW,
    getCartItemsMW,
    getCartTotalPriceMW,
    getCategoriesMW,
    getMenuItemsMW,
    (req,res) => {
        return res.render('dashboard', {
            maxCartTotalPrice : process.env.MAX_CART_SIZE
        });
    }
);

router.post('/cart',
    ensureAuthMW,
    getMenuItemByIdMW,
    createOrUpdateCartItemMW,
    (req,res) => {
        return res.redirect('/dashboard');
    }
);

router.get('/cart/delete/:cartItemId', 
    deleteCartItemMW,
    (req,res,next) => {
        return res.redirect('/dashboard');
    }
)

router.get('/order', 
    ensureAuthMW,
    getOrdersMW,
    (req,res) => {
        return res.render("orders");
    }
);

router.post('/order', 
    ensureAuthMW,
    getCartItemsMW,
    placeOrderMW,
    (req,res) => {
        return res.redirect('/dashboard');
    }
);

router.post('/register', 
    createUserMW, 
    (req,res,next) => {
        return res.redirect('/');
    }
);

router.get('/login', (req,res) => {
    return res.render('login');
})

router.post('/login', 
    loginUserMW, 
    (req,res, next) => {
        return res.redirect("/dashboard");
    }
);

router.get('/dashboard', 
    ensureAuthMW, 
    (req,res,next) => {
        return res.render('dashboard');
    }
);

router.use('/logout', logoutUserMW);

module.exports = router;