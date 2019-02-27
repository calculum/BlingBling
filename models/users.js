"use strict"

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
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


mongoose.model('user', UserSchema);
