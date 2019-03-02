"use strict"

var mongoose = require('mongoose');

const BlingSchema = new mongoose.Schema({
    user: { 
        type: String, 
        require: true 
    },
    
    title: {
        type: String,
        required: true
    },
    bling: {
        type: String,
        reqired: true
    },
    date: {
        type: Date,
        default: Date.now
    },

});

mongoose.model('blings', BlingSchema);
