module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Not Authorized. Please login to continue.');
    res.redirect('/users/login');
  }
};
