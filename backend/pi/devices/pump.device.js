const gpio = require('rpi-gpio');

/**
 * Class to handle all the required devices, sensors
 */
const PumpDevice = module.exports = function () {
  this.init()
};

PumpDevice.prototype.init = function () {
  this.pumpPin = 13;
  this.pumpWorking = true;
  this.pumpPhValue = 7.0;
  this.pumpDelta = 1;
  gpio.setup(this.pumpPin, gpio.DIR_OUT, this.turnOffPump.bind(this))
};

/*
 * Turns off the pump
 */
PumpDevice.prototype.turnOffPump = function () {
  if (this.pumpWorking) {
    this.pumpWorking = false;
    gpio.write(this.pumpPin, true, function (err) {
      if (err) {
        throw err;
      }
      console.info('Turned OFF PUMP!')
    })
  }
};

/*
 * Turns on the pump
 */
PumpDevice.prototype.turnOnPump = function () {
  if (!this.pumpWorking) {
    this.pumpWorking = true;
    gpio.write(this.pumpPin, false, function (err) {
      if (err) {
        throw err;
      }
      console.info('Turned ON PUMP!')
    })
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
