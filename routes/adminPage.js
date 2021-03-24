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

// Exports 
module.exports = router;