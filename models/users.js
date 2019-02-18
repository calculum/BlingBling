"use strict"

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
    usernamne: {
        type: String,
        require: ture
    },

    password: {
        type: String,
        require: ture
    }
});

UserSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isValid) {
        if(err) {
            callback(err);
            return;
        }
        callback(null,isValid);
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = User;