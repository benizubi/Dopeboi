const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const signUp = require('./models/newUser')
const signIn = require('./models/oldUser')
mongoose.connect('mongodb://localhost:27017/dopeboi', { useNewUrlParser: true, useUnifiedTopology: true })
    // shopApp is the name of the database we're going to use   
    .then(() => {
        console.log("Mongo Connection Open!")
        // usually our code can go here, but we don't need to nest all our code here 
    })
    .catch(err => {
        console.log(log("OH no error!!!"))
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'styles')))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// account manage //
app.get('/account', (req, res) => {
    res.render('/account')
})
//Home page.//
app.get('/home', (req, res) => {
    res.render('users/index',)
})
app.listen(8080, () => {
    console.log("App is listening on port 8080")
})