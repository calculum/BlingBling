const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load Models

const Blings = mongoose.model('Bling');

// Bling index page
router.get('/', (req, res) => {
      res.render('views/index');
    });


// Add bling Form
router.get('/add', (req, res) => {
  res.render('blings/add');
});

// Edit Event Form
router.get('/edit/:id', (req, res) => {
  Blings.findOne({
    _id: req.params.id
  }).then(bling => {
    if (bling.user != req.user.id) {
      req.flash('error_msg', 'Not Authorized.');
      res.redirect('/event');
    } else {
      res.render('blings/edit', {
        bling
      });
    }
  });
});

// Process form
router.post('/', (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!req.body.detail) {
    errors.push({ text: 'Please enter what in your mind....' });
  }
  if (errors.length > 0) {
    res.render('blings/add', {
      errors,
      title: req.body.title,
      detail: req.body.detail
    });
  } else {
    const newUser = {
      title: req.body.title,
      detail: req.body.detail,

    };
    new bling(newUser).save().then(bling => {
      res.redirect('/blings');
    });
  }
});

// Edit form process -- refactor to ajax request later
router.put('/:id', (req, res) => {
  Blings.findOne({
    _id: req.params.id
  }).then(bling => {
    // new values
    bling.title = req.body.title;
    bling.date = req.body.date;
    bling.detail = req.body.detail;
    
    bling.save().then(bling => {
      res.redirect('/blings');
    });
  });
});

// Delete a bling
router.delete('/:id', (req, res) => {
  Blings.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect('/blings');
  });
});

module.exports = router;