'use strict';

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
  this.setPumpIsWorking;
};
/*
 * @returns the lowerHeatTolerance
 */
HeatSourceDevice.prototype.lowerHeatTolerance = function () {
  return this.lowerHeatTolerance;
};

/*
 * @returns the upperHeatTolerance
 */
HeatSourceDevice.prototype.upperHeatTolerance = function () {
  return this.upperHeatTolerance;
};

/*
 * @returns true if heat source is working, false if not
 */
HeatSourceDevice.prototype.checkHeatRelayStatus = function () {
  return this.heatSourceWorking;
};


/*
 * Turns on the relay for heat source
 */
HeatSourceDevice.prototype.turnOnHeatRelay = function () {
  if (!this.heatSourceWorking) {
    console.info('Turned ON HEATING!');
    this.heatSourceWorking = true;
  }
};

/*
 * Turns off the relay for heat source
 */
HeatSourceDevice.prototype.turnOffHeatRelay = function () {
  if (this.heatSourceWorking) {
    console.info('Turned OFF HEATING!');
    this.heatSourceWorking = false;
  }
};

/*
 * @param value
 * Sets heat temperature between value - heatToleranceDelta
 */
HeatSourceDevice.prototype.setHeatingTo = function (value) {
  this.heatingValue = value;
  this.upperHeatTolerance = value + this.heatToleranceDelta;
  this.lowerHeatTolerance = value - this.heatToleranceDelta;
};

/*
 * @param value
 * Sets heatToleranceDelta to value
 */
HeatSourceDevice.prototype.setHeatingDelta = function (value) {
  this.heatToleranceDelta = value;
};
