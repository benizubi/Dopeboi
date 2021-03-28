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

router.post('/add-page', function (req, res) {
    // validators  warning message
    // req.checkBody('title', 'Title must have a value.').notEmpty();
    req.checkBody('content', 'Content must have a value.').notEmpty();

    const title = req.body.title;
    const slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
    if (slug == "") {
        slug = title.replace(/\s+/g, '-').toLowerCase();
    }
    const content = req.body.content;

    const errors = req.validationErrors();

    if (errors) {
        res.render('admin/add_page', {
            errors: errors,
            title: title,
            slug: slug,
            content: content
        });
    } else {
        Page.findOne({ slug: slug }, function (err, page) {
            if (page) {
                req.flash('danger', 'Page slug exists, choose another.');
                res.render('admin/add_page', {
                    title: title,
                    slug: slug,
                    content: content
                });
            } else {
                const page = new Page({
                    title: title,
                    slug: slug,
                    content: content,
                    sorting: 100
                });
                page.save(function (err) {
                    if (err) return console.log(err)
                    req.flash('success', 'Page added!')
                    res.redirect('/admin/pages');
                });
            }
        });
    }
});
//  Exports //
module.exports = router;