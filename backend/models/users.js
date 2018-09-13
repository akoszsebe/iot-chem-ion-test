'use strict';

let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  fb: {
    id: String,
    access_token: String,
    name: String,
    email: String,
    picUrl: String
  },
});

module.exports = mongoose.model('Users', userSchema);
