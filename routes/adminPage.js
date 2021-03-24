const express = require('express');
const router = express.Router();
// Get pages index 
router.get('/', function (req, res) {
    res.send('admin area');
});
// Get add page  
router.get('/', function (req, res) {
    const title = '';
    const slug = '';
    const content = '';

    res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content
    });
});
// Post add pages
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
        console.log('succcess')
    }
});

// Exports 
module.exports = router;