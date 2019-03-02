const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('./Authenticate/auth');


// Load Models
require('./models/Bling');
const Bling = mongoose.model('blings');

// Bling index page
router.get('/', ensureAuthenticated, (req, res) => {
  Bling.find({ user: req.user.id })
    .sort({ date: 'desc' })
    .then(blings => {
      res.render('blings/index', {
        blings
      });
    });
});


// Add a bling Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('blings/add');
});

// Edit Event Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Bling.findOne({
    _id: req.params.id
  }).then(bling => {
    if (bling.user != req.user.id) {
      req.flash('error_msg', 'Not Authorized.');
      res.redirect('/blings');
    } else {
      res.render('blings/edit', {
        bling
      });
    }
  });
});

// Process form
router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({ text: 'Mark it down...' });
  }
  if (!req.body.bling) {
    errors.push({ text: 'Please enter what in your mind....' });
  }
  if (errors.length > 0) {
    res.render('blings/add', {
      errors,
      title: req.body.title,
      bling: req.body.bling
    });
  } else {
    const newUser = {
      title: req.body.title,
      bling: req.body.bling,
      user: req.user.id
    };
    new Bling(newUser).save().then(bling => {
      res.redirect('/blings');
    });
  }
});

// Edit form process -
router.put('/:id', ensureAuthenticated, (req, res) => {
  Bling.findOne({
    _id: req.params.id
  }).then(bling => {
    // new values
    bling.title = req.body.title;
    bling.bling = req.body.bling;
    
    bling.save().then(bling => {
      res.redirect('/blings');
    });
  });
});

// Delete a bling
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Bling.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect('/blings');
  });
});

module.exports = router;