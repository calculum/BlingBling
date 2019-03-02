const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();

//  User Model
require('./models/User')
const User = mongoose.model('users');

// Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

// Register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});

// Login Form POST
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/blings',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Register form POST
router.post('/register', (req, res) => {
  let errors = [];
  if (req.body.password !== req.body.password2) {
    errors.push({ text: 'Incorrect password!' });
  }

  if (req.body.password.length < 6) {
    errors.push({ text: 'Password must be at least 6 characters.' });
  }
  if (errors.length > 0) {
    res.render('users/register', {
      errors,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        res.flash('error_msg', 'Email already exist.');
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.failureFlash('success_msg', 'Success! Please login below.');
                res.redirect('/users/login');
              })
              .catch(err => {
                console.log(err);
                return;
              });
          });
        });
      }
    });
  }
});

// Logout 
router.get('/logout', (req, res) => {
  req.logout();
  res.flash('success_msg', 'See you next time.');
  res.redirect('/users/login');
});

module.exports = router;