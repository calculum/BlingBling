"use strict"

var mongoose = require('mongoose');

const blingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
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

mongoose.model('Bling', blingSchema);
