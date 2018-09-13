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

let ionSchema = new Schema({
  raspberryid: String,
  sensorid: String,
  ionvalue: String,
  iondate: String
});

module.exports = mongoose.model('Ion', ionSchema);
