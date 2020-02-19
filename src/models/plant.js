const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    // TODO add enum validation for strain, species, etc. Use async validators to get enums from db
    name: {type: String, required: true},
    species: String,
    strain: String,
    strain_type: String,
    seed_bank: String,
    date_created: {type: Date, default: Date.now},
    log_entries: [String],
    environment: String,
    user: String,
    mother: Boolean,
    clone: Boolean
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
