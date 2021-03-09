//Creating our moddel 
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: Number || String,
        required: true,
        min: 6,
        max: 30
    }
})
const signIn = mongoose.model('signIn', productSchema);
// by doing this, it allows us to export and use product on the seed page to create new product
module.exports = signIn;
