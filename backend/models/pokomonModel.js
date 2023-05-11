const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pokomonSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    ability1: {
        type: String,
        required: true
    },
    ability2: {
        type: String,
        required: true
    },
    ability3: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Pokomon', pokomonSchema);