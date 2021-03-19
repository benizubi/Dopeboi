// Requiring allows us to use these framework
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// requiring the files to connect the pages.
const config = require('./config/database')
const pages = require('./routes/pages.js')
const adminPages = require('./routes/adminPage.js');

const signUp = require('./models/newUser')
const signIn = require('./models/oldUser')

//connect to db
mongoose.connect(config.database)
const db = mongoose.connection;
db
    // shopApp is the name of the database we're going to use   
    .then(() => {
        console.log("Mongo Connection Open!")
        // usually our code can go here, but we don't need to nest all our code here 
    })
    .catch(err => {
        console.log(log("OH no error!!!"))
        console.log(err)
    })
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Set public /dtyle folder
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'styles')))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.get('/admin/pages', adminPages);
app.get('/', pages);

// starting the server here we using port 8080
const port = 8080;
app.listen(port, () => {
    console.log("App is listening on port 8080")
})