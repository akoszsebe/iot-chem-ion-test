'use strict';

let facebook = require('./facebook');
let User = require('../models/users');

module.exports = (passport) => {

  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser((user, done) => {
    done(null, user.fb.id)
  });

  passport.deserializeUser((id, done) => {
    User.findOne({'fb.id': id}, (err, user) => {
      done(err, user)
    })
  });

  // Setting up Passport Strategies for Facebook
  facebook(passport)
};
