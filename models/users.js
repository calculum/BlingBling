"use strict"

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
    usernamne: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;