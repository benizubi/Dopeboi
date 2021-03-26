const express = require('express')
// this allows us to switch between pages using ejs here.
const router = express.Router();

//  Account
router.get('/account', (req, res) => {
    res.render('users/account', {
        title: 'Account'
    });
});
//  Home page.//
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
});
// Get add page  
router.get('/add-page', function (req, res) {
    let title = '';
    let slug = '';
    let content = '';

    res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content
    });
});

//  Exports //
module.exports = router;