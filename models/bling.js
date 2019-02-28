"use strict"

var mongoose = require('mongoose');

const BlingSchema = new mongoose.Schema({
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

mongoose.model('blings', BlingSchema);
