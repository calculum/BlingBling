"use strict"

var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    
    email: { 
        type: String, 
        required: true 
    },

    password: {
        type: String,
        require: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});


mongoose.model('users', UserSchema);
