const express = require('express');
const Page = require('../models/page');
const router = express.Router();

//account 
router.get('/account', (req, res) => {
    res.render('users/account', {
        title: 'Account'
    });
});
// GET pages index 
router.get('/', function (req, res) {
    res.send('admin area');
});

// Get add page  
router.get('/add_page', function (req, res) {
    const title = '';
    const slug = '';
    const content = '';

    res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content
    });
});

// Post add page
router.post('/', function (req, res) {

    req.checkBody('title', 'Title must have a value').notEmpty();
    req.checkBody('content', 'Content must have a value').notEmpty();

    const title = req.body.title;
    const slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
    if (slug == "") slug = title.replace(/\s+/g, '-').toLowerCase();
    const content = req.body.content;

    let errors = req.validationErrors();

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
                let page = new page({
                    title: title,
                    slug: slug,
                    content: content,
                    sorting: 0
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

// Exports 
module.exports = router;