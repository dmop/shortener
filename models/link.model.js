var mongoose = require('mongoose');

var LinkSchema = mongoose.Schema({
    original_url: String,
    short_url: String,
    hash: Number
}, {
        timestamps: true
    });

module.exports = mongoose.model('Link', LinkSchema);