const { Router } = require('express');
const express = require('express')
// this allows us to switch between pages using ejs here.
const router = express.Router();
module.exports = Router;


// account manage //
app.get('/account', (req, res) => {
    res.render('users/account')
})
// gallery //
app.get('/gallery', (req, res) => {
    res.render('users/gallery')
})
//register //
app.get('/register', (req, res) => {
    res.render('users/register')
})
// shopping //
app.get('/shopping', (req, res) => {
    res.render('users/shopping')
})



//Home page.//
app.get('/home', (req, res) => {
    res.render('users/index',)
})