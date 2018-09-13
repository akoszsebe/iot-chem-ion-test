const i2c = require('i2c-bus'),
i2c1 = i2c.openSync(1);

const IonDevice = module.exports = function(){

	this.init()
};

IonDevice.prototype.init = function(){
	this.ION_STD_ADDR = 0x64;
	this.READ_LENGTH = 7;
	this.ION_CMD_READ = 0x52;
}

IonDevice.prototype.getIon = function(callback){
	const self = this;
	i2c1.sendByte(self.ION_STD_ADDR,self.ION_CMD_READ,function(err){
		if(err){
			console.info('--------!!!!!-----',err);
			return callback(0);
		}
		setTimeout(function(asda){
			const ION_OUTPUT = new Buffer(self.READ_LENGTH);
			i2c1.i2cReadSync(self.ION_STD_ADDR,self.READ_LENGTH,ION_OUTPUT);
			return callback(parseFloat(ION_OUTPUT.toString().substr(1)).toString())
			
		}.bind(self),1000);
});


};

IonDevice.prototype.calibrateDry = function(callback){
	const self = this;
	const ION_CALIBRATION_SEND = new Buffer('Cal,dry');
	i2c1.i2cWrite(self.ION_STD_ADDR, ION_CALIBRATION_SEND.length, ION_CALIBRATION_SEND, function (err) {
		if(err)
		return callback(err);
	});
	setTimeout(function()
	{
		const ION_OUTPUT = new Buffer(1);
		i2c1.i2cReadSync(self.ION_STD_ADDR,1,ION_OUTPUT);
		if(ION_OUTPUT[0] === 1) {
			return callback(true);
		}
		else
		{
			return callback(false);
		}
	}.bind(self),1600);

};

IonDevice.prototype.calibrateClear = function(callback){
	const self = this;
	const ION_CALIBRATION_SEND = new Buffer('Cal,clear');
	i2c1.i2cWrite(self.ION_STD_ADDR, ION_CALIBRATION_SEND.length, ION_CALIBRATION_SEND, function (err) {
		if(err)
		return callback(err);
	});
	setTimeout(function()
	{
		const ION_OUTPUT = new Buffer(1);
		i2c1.i2cReadSync(self.ION_STD_ADDR,1,ION_OUTPUT);
		if(ION_OUTPUT[0] === 1) {
			return callback(true);
		}
		else
		{
			return callback(false);
		}
	}.bind(self),300);

};

IonDevice.prototype.calibrateLow = function (value, callback) {
  const self = this;
  const ION_CALIBRATION_SEND = new Buffer('CAL,LOW,' + value);
  i2c1.i2cWrite(self.ION_STD_ADDR, 12, ION_CALIBRATION_SEND, function (err) {
    if (err) {
      return callback(err);
    }
    setTimeout(function () {
      const ION_OUTPUT = new Buffer(1);
      i2c1.i2cReadSync(self.ION_STD_ADDR, 1, ION_OUTPUT);
      if (ION_OUTPUT[0] === 1) {
        return callback(true)
      } else {
        return callback(false)
      }
    }.bind(this), 1300);
  })
};


IonDevice.prototype.calibrateHigh = function (value, callback) {
  const self = this;
  const ION_CALIBRATION_SEND = new Buffer('CAL,HIGH,' + value);
  i2c1.i2cWrite(self.ION_STD_ADDR, 14, ION_CALIBRATION_SEND, function (err) {
    if (err) {
      return callback(err);
    }
    setTimeout(function () {
      const ION_OUTPUT = new Buffer(1);
      i2c1.i2cReadSync(self.ION_STD_ADDR, 1, ION_OUTPUT);
      if (ION_OUTPUT[0] === 1) {
        return callback(true)
      } else {
        return callback(false)
      }
    }.bind(this), 1300);
  })
};

IonDevice.prototype.setTemp = function(value ,callback)
{
	const self = this;
  const ION_CALIBRATION_SEND = new Buffer('T,' + value);
  i2c1.i2cWrite(self.ION_STD_ADDR, ION_CALIBRATION_SEND.length, ION_CALIBRATION_SEND, function (err) {
    if (err) {
      return callback(err);
    }
    setTimeout(function () {
      const ION_OUTPUT = new Buffer(1);
      i2c1.i2cReadSync(self.ION_STD_ADDR, 1, ION_OUTPUT);
      if (ION_OUTPUT[0] === 1) {
        return callback(true)
      } else {
        return callback(false)
      }
    }.bind(this), 1600);
  })
};














