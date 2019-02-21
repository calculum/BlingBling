"use strict"

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
    usernamne: {
        type: String,
        require: ture
    },

    password: {
        type: String,
        require: ture
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;