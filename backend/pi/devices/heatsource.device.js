const gpio = require('rpi-gpio');

/**
 * Class to handle all the required devices, sensors
 */
const HeatSourceDevice = module.exports = function () {
  this.init()
};

HeatSourceDevice.prototype.init = function () {
  this.heatRelayPin = 11;
  this.heatSourceWorking = true;
  this.lowerHeatTolerance = 0;
  this.heatingValue = 0;
  this.upperHeatTolerance = 0;
  this.heatToleranceDelta = 2;
  try {

    gpio.setup(this.heatRelayPin, gpio.DIR_OUT, this.turnOffHeatRelay.bind(this))
  } catch (e) {
    console.error(e);
  }
};
/*
 * @returns the lowerHeatTolerance
 */
HeatSourceDevice.prototype.lowerHeatTolerance = function () {
  return this.lowerHeatTolerance
};

/*
 * @returns the upperHeatTolerance
 */
HeatSourceDevice.prototype.upperHeatTolerance = function () {
  return this.upperHeatTolerance
};

/*
 * @returns true if heat source is working, false if not
 */
HeatSourceDevice.prototype.checkHeatRelayStatus = function () {
  return this.heatSourceWorking
};


/*
 * Turns on the relay for heat source
 */
HeatSourceDevice.prototype.turnOnHeatRelay = function () {
  if (!this.heatSourceWorking) {
    this.heatSourceWorking = true;
    gpio.write(this.heatRelayPin, false, function (err) {
      if (err) throw err;
      console.info('Turned ON HEATING!')
    })
  }
};

/*
 * Turns off the relay for heat source
 */
HeatSourceDevice.prototype.turnOffHeatRelay = function () {
  if (this.heatSourceWorking) {
    this.heatSourceWorking = false;
    gpio.write(this.heatRelayPin, true, function (err) {
      if (err) throw err;
      console.info('Turned OFF HEATING!')
    })
  }
};

/*
 * @param value
 * Sets heat temperature between value - heatToleranceDelta
 */
HeatSourceDevice.prototype.setHeatingTo = function (value) {
  this.heatingValue = value;
  this.upperHeatTolerance = value + this.heatToleranceDelta;
  this.lowerHeatTolerance = value - this.heatToleranceDelta
};

/*
 * @param value
 * Sets heatToleranceDelta to value
 */
HeatSourceDevice.prototype.setHeatingDelta = function (value) {
  this.heatToleranceDelta = value
};
