require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const FileStore = require('session-file-store')(session);
const morgan = require('morgan');
const passport = require("./config/passport");
const db = require('./db/database');

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(session({
    store: new FileStore(),
    secret: 'myfriendboy',
    resave: true,
    saveUninitialized: true,
}));
app.set('view engine', 'ejs');
app.set('layout extractScripts', true);
app.use(expressLayouts);
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
    req.models = db.models;
    req.sequelize = db.sequelize;
    res.locals.messages = [];
    return next();
})

app.use(require('./routes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));