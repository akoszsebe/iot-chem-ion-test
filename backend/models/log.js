'use strict';

let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let logSchema = new Schema({
  name: String,
  action: String,
  date: String
});

module.exports = mongoose.model('Log', logSchema);
