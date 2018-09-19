/*
 **  Create an initial app class
 ** with the injected external dependencies
 **
 */
const PiApp = module.exports = function (db, temperaturedevice,iondevice, gateway, messagequeue,approx) {
  this.db = db;
  this.approx = approx;
  this.temperaturedevice = temperaturedevice;
  this.gateway = gateway;
  this.messagequeue = messagequeue;
  this.iondevice = iondevice;
};

/**
 *   Init functions
 *
 */
PiApp.prototype.init = function () {
  this.serialnumber = this.gateway.fingerPrint();
  this.temperatureUploadInterval = 30000;
  this.ionUploadInterval = 30000;
  this.ionCheckInterval = 2000;
  this.messagequeueCheckInterval = 3000;
  this.ph = 0;
  this.ion = 0;

  const self = this;
  this.db.getJob(job => {
    if (job) {
      self.messagequeue.sensorValueContext.setHeaterTemperature(job.heaterValue);
      self.messagequeue.sensorValueContext.setTempUploadInterval(job.tempReadInt);
      self.messagequeue.sensorValueContext.setPhUploadInterval(job.phReadInt);
      self.messagequeue.sensorValueContext.setIonUploadInterval(job.ionReadInt);
    }
  });
  console.log('valuePair');
  this.db.getValuePair(
  function (valuePair){
	  console.log(valuePair);
	  if(valuePair)
		self.vP = valuePair;
  });
};


/**
 * Uploads temp to database
 */
PiApp.prototype.uploadTempToDatabase = function () {
  const self = this;
  this.temperaturedevice.actualValue(function (err, value) {
    console.info('Raspberry -', self.serialnumber);
    console.info('Current temperature on sensor is', value);
    self.db.createTemperatureMessage(self.serialnumber, '1', value, new Date().getTime(), function (err) {
      if (err) {
        console.error(err)
      }
    })
  });

  this.uploadTempTimeout = setTimeout(this.uploadTempToDatabase.bind(this), this.temperatureUploadInterval)
};


PiApp.prototype.uploadIonToDatabase = function () {
  const self = this;
  if (this.ion !== 0) {
	var ion_conc = this.approx.interpolate(this.vP.conductivity,this.vP.ion,self.ion,0.01);  
    console.info('Raspberry -', self.serialnumber);
    console.info('-----Current con on sensor is: ' + self.ion);
    console.info('-----Current ion on sensor is: ' + ion_conc);
    self.db.createIonMessage(self.serialnumber, '1', self.ion, new Date().getTime(), function (err) {
      if (err) {
        console.error(err)
      }
    })
  }
  else {
    console.info('-----Ion sensor is not connected !!!')
  }

  this.uploadIonTimeout = setTimeout(this.uploadIonToDatabase.bind(this), this.ionUploadInterval);
};


PiApp.prototype.ionCheck = function()
{

  const self = this;
  this.iondevice.getIon(function (ionvalue) {
    console.log('Atlas-scientific-ConductoMeter READ Value: ' + ionvalue);
    self.ion = ionvalue;
    
  });
  this.ionCheckTimeout = setTimeout(this.ionCheck.bind(this), this.ionCheckInterval)

};

/**
 * Calibrate Low Ion sensor (ion = 4.00 )
 */
PiApp.prototype.ionCalibrateLow = function () {
  const self = this;
  clearTimeout(self.ionCheckTimeout);
  const ion_cal_value = '12880';
  setTimeout(function () {
    self.iondevice.calibrateLow(ion_cal_value, function (callbackmsg) {
      console.log('Calibration Low on IonSensor was ' + callbackmsg);
      self.messagequeue.sendMsgToWebServer('Ion:Calibrate:Low:' + callbackmsg);
      //self.ionCheckTimeout = setTimeout(self.ionCheck.bind(self), self.ionCheckInterval)
    })
  }, 1000);
};
/**
 * Calibrate High Ion sensor (ion = 10.00 )
 */
PiApp.prototype.ionCalibrateHigh = function () {
  const self = this;
  clearTimeout(self.ionCheckTimeout);
  const ion_cal_value = '80000';
  setTimeout(function () {
    self.iondevice.calibrateHigh(ion_cal_value, function (callbackmsg) {
      console.log('Calibration High on IonSensor was ' + callbackmsg);
      self.messagequeue.sendMsgToWebServer('Ion:Calibrate:High:' + callbackmsg);
      //self.ionCheckTimeout = setTimeout(self.ionCheck.bind(self), self.ionCheckInterval)
    })
  }, 1000);
};

/**
 * Calibrate Dry Ion sensor 
 */
PiApp.prototype.ionCalibrateDry = function () {
  const self = this;
  clearTimeout(self.phcheckTimeout);
  setTimeout(function () {
    self.iondevice.calibrateDry(function (callbackmsg) {
      console.log('Calibration Dry on IonSensor was ' + callbackmsg);
      self.messagequeue.sendMsgToWebServer('Ion:Calibrate:Dry:' + callbackmsg);
      //self.ionCheckTimeout = setTimeout(self.ionCheck.bind(self), self.ionCheckInterval)
    })
  }, 1000);
};


PiApp.prototype.ionCalibrateClear = function () {
  const self = this;
  clearTimeout(self.phcheckTimeout);
  setTimeout(function () {
    self.iondevice.calibrateClear(function (callbackmsg) {
      console.log('Calibration Clear on IonSensor was ' + callbackmsg);
      self.messagequeue.sendMsgToWebServer('Ion:Calibrate:Clear:' + callbackmsg);
      //self.ionCheckTimeout = setTimeout(self.ionCheck.bind(self), self.ionCheckInterval)
    })
  }, 1000);
};



/**
 * Checks if the heating value has changed in messagequeue
 * and sends a message if it changed here to.
 * Checks if uploadInterval was changed and updates that too
 */
PiApp.prototype.messagequeueCheck = function () {
  const lastTempUploadIntervalInQueue = parseInt(this.messagequeue.sensorValueContext.getTempUploadInterval());
  if (lastTempUploadIntervalInQueue !== this.temperatureUploadInterval) {
    this.temperatureUploadInterval = lastTempUploadIntervalInQueue;
    clearTimeout(this.uploadTempTimeout);
    this.uploadTempTimeout = setTimeout(this.uploadTempToDatabase.bind(this), this.temperatureUploadInterval)
  }
  
  const lastIonUploadIntervalInQueue = parseInt(this.messagequeue.sensorValueContext.getIonUploadInterval());
  if (lastIonUploadIntervalInQueue !== this.ionUploadInterval) {
    this.ionUploadInterval = lastIonUploadIntervalInQueue;
    clearTimeout(this.uploadIonTimeout);
    this.uploadIonTimeout = setTimeout(this.uploadIonToDatabase.bind(this), this.ionUploadInterval)
  }

  this.messagequeueCalibrationCheck();
};

PiApp.prototype.messagequeueCalibrationCheck = function(){
  const calibrate = this.messagequeue.sensorValueContext.getCalibration();
  switch (calibrate) {
    case 'D':
      this.ionCalibrateDry();
      this.messagequeue.sensorValueContext.resetCalibration();
      break;
    case 'C':
      this.ionCalibrateClear();
      this.messagequeue.sensorValueContext.resetCalibration();
      break;
    case 'L':
      this.ionCalibrateLow();
      this.messagequeue.sensorValueContext.resetCalibration();
      break;
    case 'H':
      this.ionCalibrateHigh();
      this.messagequeue.sensorValueContext.resetCalibration();
      break
  }
}

/**
 *  Set the main event loop
 *
 *  */
PiApp.prototype.setEventLoop = function () {

  this.uploadTempTimeout = setTimeout(this.uploadTempToDatabase.bind(this), this.temperatureUploadInterval);
  this.uploadIonTimeout = setTimeout(this.uploadIonToDatabase.bind(this), this.ionUploadInterval);
  this.ionCheckTimeout = setTimeout(this.ionCheck.bind(this), this.ionCheckInterval);
  this.messageQueueWatcher = setInterval(this.messagequeueCheck.bind(this), this.messagequeueCheckInterval)

};

/**
 *  Cancel the main event loop
 */
PiApp.prototype.unsetEventLoop = function () {

  clearTimeout(this.ionCheckTimeout);
  clearTimeout(this.uploadTempTimeout);
  clearTimeout(this.uploadIonTimeout);
  clearInterval(this.messageQueueWatcher);
};
