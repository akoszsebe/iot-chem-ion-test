const ds18b20 = require('ds18b20');


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
  ds18b20.sensors(function (err, ids) {
    if (err) {
      return _callback(err, ids)
    }
    ds18b20.temperature(ids, {parser: 'hex'}, function (err, value) {
      return _callback(err, value)
    })
  })
};
