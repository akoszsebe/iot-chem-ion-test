/*
 INFO USING THE INTERVAL SIMULATION
 The return values are simulated, with the help of the config JSON.
 If you want a fix point returned every time, give 'fix' value to config type. In this case it will always return the value stored in fixPoint.
 If you want to simulate a changing in the given interval, change the type to 'interval' and modify the interval value to your [minimum,maximum] and the intervalDiff to the change in difference.
 It will go from the middle of the 2 intervals, increasing to the max interval then decreasing to min interval, and repeating the same sequence.
 */
'use strict';




const IonDevice = module.exports = function () {
	
};

/*
 * @returns the ionvalue
 */
IonDevice.prototype.getIon = function (_callback) {
    return _callback(Math.random()*1000)
  
};

/*
 * @return if calibration was Successful or not
 */
IonDevice.prototype.calibrateHigh = function (value, callback) {
  return callback(true)
};

/*
 * @return if calibration was Successful or not
 */
IonDevice.prototype.calibrateDry = function (value, callback) {
  return callback(true)
};

/*
 * @return if calibration was Successful or not
 */
IonDevice.prototype.calibrateClear = function (value, callback) {
  return callback(true)
};

/*
 * @return if calibration was Successful or not
 */
IonDevice.prototype.calibrateLow = function (value, callback) {
  return callback(true)
};
