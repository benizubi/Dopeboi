const express = require('express')
// this allows us to switch between pages using ejs here.
const router = express.Router();

//  Account

//  Home page.//
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
});

//  Exports //
module.exports = router;