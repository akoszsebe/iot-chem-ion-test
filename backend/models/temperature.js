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

let temperatureSchema = new Schema({
  raspberryid: String,
  sensorid: String,
  tempvalue: String,
  tempdate: String
});

module.exports = mongoose.model('Temperatures', temperatureSchema);
