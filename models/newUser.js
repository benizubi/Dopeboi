//Creating our moddel 
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: Number,
        required: true,
        min: 0
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: Number || String,
        required: true,
        min: 6,
        max: 30
    }
})
const signUp = mongoose.model('signUp', productSchema);
// by doing this, it allows us to export and use product on the seed page to create new product
module.exports = signUp;
