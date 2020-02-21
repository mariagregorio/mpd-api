const mongoose = require('mongoose');
const lists = require('../utils/lists');

const environmentSchema = new mongoose.Schema({
    name: {type: String, minlength: 5, maxlength: 20, required: true},
    date_created: {type: Date, default: Date.now},
    plants: [String], // plants ids
    log_entries: [String], // entries ids
    user: String, // user id
    size_height: Number,
    size_width: Number,
    size_length: Number,
    type: {type: String, enum: lists.environmentType}
});

const Environment = mongoose.model('Environment', environmentSchema);

module.exports = Environment;
