'use strict';

const config = require('../../../config');

let path = require('path'),
  Temperature = require('../../models/temperature.js'),
  Ph = require('../../models/ph.js'),
  Ion = require('../../models/ion.js'),
  Job = require('../../models/job.js'),
  request = require("request"),
  url = config.heroku.domain;

/**
 * Create a DB class to handle:
 * 1. upload data to the historian db
 */
const Db = module.exports = function () {
  this.init()

};

/**
 *  Init the entity layer and others...
 *
 */
Db.prototype.init = function () {
  const self = this;

};

/**
 * createTemperatureMessage   method is responsabile for ...
 *
 * rid:
 * sid:
 * tv:
 * td:
 * callback:
 */

Db.prototype.createTemperatureMessage = function (rid, sid, tv, td, _callback) {


  // create a Temperature json object
  const temp = new Temperature({
    raspberryid: rid,
    sensorid: sid,
    tempvalue: tv,
    tempdate: td
  });
  // call the Temperature class save operator
  var options = {
      method: 'post',
      body: temp,
      json: true,
      url: url+"/api/device/temperature"
    }
  request(options, function (err, res, body){
    if (err)
      return _callback(err);
    return _callback(null)
  });
};

/**
 * createPhMessage   method is responsabile for ...
 *
 * rid:
 * sid:
 * pv:
 * pd:
 * callback:
 */

Db.prototype.createPhMessage = function (rid, sid, pv, pd, _callback) {


  // create a Ph json object
  const ph = new Ph({
    raspberryid: rid,
    sensorid: sid,
    phvalue: pv,
    phdate: pd
  });
   var options = {
      method: 'post',
      body: ph,
      json: true,
      url: url+"/api/device/ph"
    }
  request(options, function (err, res){
    if (err)
      return _callback(err);
    return _callback(null)
  });

};


Db.prototype.createIonMessage = function (rid, sid, pv, pd, _callback) {


  // create a Ion json object
  const ion = new Ion({
    raspberryid: rid,
    sensorid: sid,
    ionvalue: pv,
    iondate: pd
  });
   var options = {
      method: 'post',
      body: ion,
      json: true,
      url: url+"/api/device/ion"
    }
  request(options, function (err, res){
    if (err)
      return _callback(err);
    return _callback(null)
  });

};


Db.prototype.getJob = function (_callback) {
  request(url+"/api/backend/job", function (err, res, body){
    if (err)
      return _callback(err);
      console.log(body)
    return _callback( JSON.parse(body))
  });
};

Db.prototype.getValuePair = function (_callback) {
  request(url+"/api/backend/valuePairs", function (err, res, body){
    if (err)
      return _callback(err);
      console.log(body)
    return _callback( JSON.parse(body))
  });
};


