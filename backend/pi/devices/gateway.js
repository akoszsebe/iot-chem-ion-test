const fs = require('fs');

/**
 * Class to  handle all the required gateway
 * properties
 * Initialize the cpuinfo property
 */
const Gateway = module.exports = function () {

  // Question : Why sync call ? Is it realy necessary ?
  this.cpuinfo = !fs.existsSync('/proc/cpuinfo') ? '' : fs.readFileSync('/proc/cpuinfo') + '';
  this.cpuJson = this.init()
};


/**
 *    Split the property
 *
 */
Gateway.prototype.init = function () {
  const self = this;
  return self.cpuinfo.split('\n').reduce(function (result, line) {
    line = line.replace(/\t/g, '');
    const parts = line.split(':');
    const key = parts[0].replace(/\s/g, '_');
    if (parts.length === 2) {
      result[key] = parts[1].trim().split(' ')
    }
    return result
  }, {})
};

/**
 *
 * Make it more readable for the public world
 *
 */
Gateway.prototype.fingerPrint = function () {

  const self = this;
  return self.serialNumber = self.cpuJson['Serial'] === undefined ? -1 : self.cpuJson['Serial'][0]

};



