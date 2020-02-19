const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, minlength: 5, maxlength: 20, required: true},
    password: {type: String, required: true},
    // TODO email validation
    email: {type: String, unique: true, required: true},
    avatar: {type: String},
    date_created: {type: Date, default: Date.now},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
