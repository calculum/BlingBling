"use strict"

var mongoose = require('mongoose');

const blingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    detail: {
        type: String,
        reqired: true
    }

});

const Blings = mongoose.model('Bling', blingSchema);

module.exports = Blings;