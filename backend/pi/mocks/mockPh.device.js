/*
 INFO USING THE INTERVAL SIMULATION
 The return values are simulated, with the help of the config JSON.
 If you want a fix point returned every time, give 'fix' value to config type. In this case it will always return the value stored in fixPoint.
 If you want to simulate a changing in the given interval, change the type to 'interval' and modify the interval value to your [minimum,maximum] and the intervalDiff to the change in difference.
 It will go from the middle of the 2 intervals, increasing to the max interval then decreasing to min interval, and repeating the same sequence.
 */
'use strict';

const config = {
  type: 'interval', //fix or interval
  fixPoint: 7, // ignore this if using interval
  interval: [6, 7],
  intervalDiff: 0.05
};

let myCurrentValue = (config['interval'][0] + config['interval'][1]) / 2;


const PhDevice = module.exports = function () {
  this.init()
};

PhDevice.prototype.init = function () {
  this.PH_STD_ADDR = 0x63;
  this.READ_LENGTH = 7;
  this.PH_CMD_READ = 0x52
};

/*
 * @returns the phvalue
 */
PhDevice.prototype.getPh = function (_callback) {

  if (config['type'] === 'fix') {
    return _callback(config['fixPoint'])
  }
  else {
    myCurrentValue = (myCurrentValue + config['intervalDiff']);
    if (myCurrentValue > config['interval'][1] || myCurrentValue < config['interval'][0]) {
      config['intervalDiff'] = -config['intervalDiff']
    }
    return _callback(myCurrentValue.toFixed(2))
  }
};

/*
 * @return if calibration was Successful or not
 */
PhDevice.prototype.calibrateHigh = function (value, callback) {
  return callback(true)
};

/*
 * @return if calibration was Successful or not
 */
PhDevice.prototype.calibrateMiddle = function (value, callback) {
  return callback(true)
};

/*
 * @return if calibration was Successful or not
 */
PhDevice.prototype.calibrateLow = function (value, callback) {
  return callback(true)
};
