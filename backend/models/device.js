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

let deviceSchema = new Schema({
  deviceId: String,
  deviceName: String
});

module.exports = mongoose.model('Device', deviceSchema);
