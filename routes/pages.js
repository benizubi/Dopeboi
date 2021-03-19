const { Router } = require('express');
const express = require('express')
// this allows us to switch between pages using ejs here.
const router = express.Router();


// account manage //
router.get('/account', (req, res) => {
    res.render('users/account')
})
// gallery //
router.get('/gallery', (req, res) => {
    res.render('users/gallery')
})
//register //
router.get('/register', (req, res) => {
    res.render('users/register')
})
// shopping //
router.get('/shopping', (req, res) => {
    res.render('users/shopping')
})

//Home page.//
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
})

//Exports
module.exports = router;