/*
 INFO USING THE INTERVAL SIMULATION
 The return values are simulated, wiht the help of the config JSON.
 If you want a fix point returned every time, give 'fix' value to config type. In this case it will allways return the value stored in fixPoint.
 If you want to simulate a changing in the given interval, change the type to 'interval' and modify the interval value to your [minimum,maximum] and the intervalDiff to the change in difference.
 It will go from the middle of the 2 intervals, increasing to the max interval then decreasing to min interval, and repeating the same sequence.
 */
'use strict';

const config = {
  type: 'interval', //fix or interval
  fixPoint: 15, // ignore this if using interval
  interval: [20, 30],
  intervalDiff: 0.1
};

let myCurrentValue = (config['interval'][0] + config['interval'][1]) / 2;


/**
 * Class to handle all the TemperatureDevice  sensors
 */
const TemperatureDevice = module.exports = function () {

};

/*
 * @params callback function
 * @returns err - if error happened , value - the temperature value
 */
TemperatureDevice.prototype.actualValue = function (_callback) {
  if (config['type'] === 'fix') {
    return _callback(null, config['fixPoint']);
  }
  else {
    myCurrentValue = (myCurrentValue + config['intervalDiff']);
    if (myCurrentValue > config['interval'][1] || myCurrentValue < config['interval'][0]) {
      config['intervalDiff'] = -config['intervalDiff'];
    }
    return _callback(null, myCurrentValue.toFixed(2));
  }
};
