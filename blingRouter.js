const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load Models
require('../models/bling');
const Blings = mongoose.model('Bling');

// Bling index page
router.get('/', (req, res) => {
      res.render('/index');
    });


// Add bling Form
router.get('/add', (req, res) => {
  res.render('bling/add');
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
      res.render('bling/edit', {
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
  if (!req.body.bling) {
    errors.push({ text: 'Please enter a bling' });
  }
  if (errors.length > 0) {
    res.render('bling/add', {
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
      res.redirect('/bling');
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
      res.redirect('/bling');
    });
  });
});

// Delete Idea
router.delete('/:id', (req, res) => {
  Blings.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect('/bling');
  });
});

module.exports = router;
