// Requiring allows us to use these framework
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// const methodOverride = require('method-override');
const config = require('./config/database');

const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');

const signUp = require('./models/newUser')
const signIn = require('./models/oldUser')

//connect to db
mongoose.connect(config.database)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});
// init app
const app = express();
// view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Set public /style folder / override method
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'styles')));
// app.use(express.urlencoded({ extended: true }))
// app.use(methodOverride('_method'));


// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

//Express Validator middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        const namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };

    }
}));
// Express Messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// setting routers 
const pages = require('./routes/pages.js')
const adminPages = require('./routes/adminPage.js');


app.get('/admin/pages', adminPages);
app.get('/', pages);

// starting the server here we using port 8080
const port = 8080;
app.listen(port, () => {
    console.log("App is listening on port 8080");
})