const express = require('express');
const Page = require('../models/page');
const router = express.Router();

// GET pages index 
router.get('/', function (req, res) {
    Page.find({}).sort({ sorting: 1 }).exec(function (err, pages) {
        res.render('admin/pages', {
            pages: pages
        });
    });
});
// Get add page  
router.get('/add-page', function (req, res) {
    const title = '';
    const slug = '';
    const content = '';

    res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content
    });
});
// POST add page
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

// Exports 
module.exports = router;