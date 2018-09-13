/**
 * Class to handle all the required devices, sensors
 * */

'use strict';
const PumpDevice = module.exports = function () {
  this.init()
};

PumpDevice.prototype.init = function () {
  this.pumpPin = 13;
  this.pumpWorking = true;
  this.pumpPhValue = 7.0;
  this.pumpDelta = 1

};

/*
 * Turns off the pump
 */
PumpDevice.prototype.turnOffPump = function () {
  if (this.pumpWorking) {
    console.info('Turned OFF PUMP!');
    this.pumpWorking = false;
  }
};

/*
 * Turns on the pump
 */
PumpDevice.prototype.turnOnPump = function () {
  if (!this.pumpWorking) {
    console.info('Turned ON PUMP!');
    this.pumpWorking = true;
  }
};

PumpDevice.prototype.getPumpPh = function () {
  return this.pumpPhValue;
};

PumpDevice.prototype.setPumpPh = function (value) {
  this.pumpPhValue = value;
};

PumpDevice.prototype.checkPumpStatus = function () {
  return this.pumpWorking;
};
