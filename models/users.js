"use strict"

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true 
    },

    usernamne: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    }
});


mongoose.model('User', userSchema);
