const mongoose = require('mongoose');
const lists = require('../utils/lists');

const plantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    strain: {type: String, enum: lists.strains},
    strain_type: {type: String, enum: lists.strainType},
    seed_bank: String,
    date_created: {type: Date, default: Date.now},
    log_entries: [String],
    environment: String,
    user: {type: String, required: true}, //user id
    mother: Boolean,
    clone: Boolean
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
