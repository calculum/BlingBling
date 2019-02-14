"use strict"

var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
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

var Events = mongoose.model('Event', eventSchema);

module.exports = Events;