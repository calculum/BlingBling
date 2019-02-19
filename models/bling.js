"use strict"

var mongoose = require('mongoose');

var blingSchema = new mongoose.Schema({
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
        required: true
    },
    detail: {
        type: String,
        reqired: true
    }

});

var Blings = mongoose.model('Bling', blingSchema);

module.exports = Blings;