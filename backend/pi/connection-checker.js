'use strict';

let connectivity = require('connectivity');

const ConnectionChecker = module.exports = function (checkinterval, heatsourcedevice, pumpdevice, messagequeue) {
  this.checkinterval = checkinterval;
  this.alive_number = 0;
  this.heatsourcedevice = heatsourcedevice;
  this.pumpdevice = pumpdevice;
  this.messagequeue = messagequeue;
};

ConnectionChecker.prototype.checking = function () {
  const self = this;
  connectivity(function (online) {
    if (online) {
      console.log('connected to the internet!', self.alive_number);
      self.alive_number = 0;
    } else {
      console.error('sorry, not connected!', self.alive_number);
      if (self.alive_number++ >= 10) {
        self.heatsourcedevice.turnOffHeatRelay();
        self.messagequeue.sendMsgToWebServer('Heater:OFF');
        console.log("---------------------------------Heater off ");
        self.pumpdevice.turnOffPump();
        self.messagequeue.sendMsgToWebServer('Pump:OFF');
        console.log("---------------------------------pump off");
        setTimeout(function () {
          if (!self.pumpdevice.pumpWorking && !self.heatsourcedevice.heatSourceWorking) {
            console.log("---------------------------------Turn of rpy");
            process.exit(0);
          }
        }, 1000);
      }
    }
  })
};

ConnectionChecker.prototype.startChecking = function () {
  setInterval(this.checking.bind(this), this.checkinterval);
};
