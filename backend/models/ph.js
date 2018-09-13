'use strict';

let loaded = true;

let mongoose, Schema;

try {
  mongoose = require('mongoose')
} catch (e) {
  loaded = false;
}

if (!loaded) {
  try {
    mongoose = require('../pi/node_modules/mongoose')
  } catch (e) {
    throw e
  }
}

Schema = mongoose.Schema;

let phSchema = new Schema({
  raspberryid: String,
  sensorid: String,
  phvalue: String,
  phdate: String
});

module.exports = mongoose.model('Ph', phSchema);
