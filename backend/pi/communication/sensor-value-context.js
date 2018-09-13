/** class to handle all the context neccessary
 * values
 */
const SensorValueContext = module.exports = function () {

  this.heatertemperature = 0;
  this.uploadTempInterval = 30000;
  this.calibrate = 'N'; //no calibration
  this.pumpIsWorking = false;
  this.phValue = 7.0;
  this.workInProgress = false;
  this.workDuration = 3600; // Work duration in seconds!!!

};

SensorValueContext.prototype.getHeaterTemperature = function () {
  return this.heatertemperature
};
SensorValueContext.prototype.setHeaterTemperature = function (value) {
  this.heatertemperature = value
};

SensorValueContext.prototype.getTempUploadInterval = function () {
  return this.uploadTempInterval
};

SensorValueContext.prototype.setTempUploadInterval = function (value) {
  this.uploadTempInterval = value * 1000;
};

//hard
SensorValueContext.prototype.getIonUploadInterval = function () {
    return this.uploadIonInterval
};

SensorValueContext.prototype.setIonUploadInterval = function (value) {
    this.uploadIonInterval = value * 1000;
};

SensorValueContext.prototype.getPhUploadInterval = function () {
  return this.uploadTempInterval
};

SensorValueContext.prototype.setPhUploadInterval = function (value) {
  this.uploadTempInterval = value * 1000;
};


SensorValueContext.prototype.setPumpIsWorking = function () {
  return this.pumpIsWorking
};

SensorValueContext.prototype.setPumpIsWorking = function (value) {
  this.pumpIsWorking = value
};


SensorValueContext.prototype.getCalibration = function () {
  return this.calibrate
};

SensorValueContext.prototype.setCalibration = function (value) {
  this.calibrate = value
};


SensorValueContext.prototype.resetCalibration = function () {
  this.calibrate = 'N'
};

SensorValueContext.prototype.getPhValue = function () {
  return this.phValue
};
SensorValueContext.prototype.setPhValue = function (value) {
  this.phValue = value
};

SensorValueContext.prototype.isWorkInProgress = function () {
  return this.workInProgress
};

SensorValueContext.prototype.setWorkInProgress = function (value) {
  this.workInProgress = value
};

SensorValueContext.prototype.getWorkDuration = function () {
  return this.workDuration
};

SensorValueContext.prototype.setWorkDuration = function (value) {
  this.workDuration = value
};
