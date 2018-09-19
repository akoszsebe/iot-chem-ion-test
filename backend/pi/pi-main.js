'use strict';
// load the pi ap module
const PiApp = require('./pi-app');
const PiWatcher = require('./pi-watcher');

// load the Db module
const Db = require('./communication/db');
const db = new Db();
// load the interpolation module
const Approx = require('./interpolation');
const approx = new Approx();
// load the gateway module
const Gateway = require('./devices/gateway');
const gateway = new Gateway();

const config = require('../../config');

// Create new Temperature Device
let TemperatureDevice;

//create new ion device
let IonDevice;

//  Create new HeatSource Device
let HeatSourceDevice;
//  Create new PH Device
let PhDevice;
// Create new PumpDevice
let PumpDevice;

const ConnectionChecker = require('./connection-checker');


let socket = require('socket.io-client')(config.heroku.domain);


socket.on('connect', function () {
  console.log('Connected');
  socket.emit('new pi');
});
socket.on('disconnect', function () {
  console.log('Disconnected');
});


if (gateway.fingerPrint() === -1) // Mock for desktop testing
{
  TemperatureDevice = require('./mocks/mockTemperature.device');
  HeatSourceDevice = require('./mocks/mockHeatsource.device');
  PhDevice = require('./mocks/mockPh.device');
  PumpDevice = require('./mocks/mockPump.device');
  IonDevice = require('./mocks/mockIon.device');
  
  console.info('Device is not Raspberry! Using mock gateway instead');
}
else {
  TemperatureDevice = require('./devices/temperature.device');
  HeatSourceDevice = require('./devices/heatsource.device');
  PhDevice = require('./devices/ph.device');
  PumpDevice = require('./devices/pump.device');
  IonDevice = require('./devices/ion.device');
}

const temperaturedevice = new TemperatureDevice;
//const heatsourcedevice = new HeatSourceDevice();
const phdevice = new PhDevice();
//const pumpdevice = new PumpDevice();
const iondevice = new IonDevice();
// Create new Sensor Values Context
const SensorValueContext = require('./communication/sensor-value-context');
const sensorValueContext = new SensorValueContext();

// Create new Message Queue pi -> webservice
const MQueuePi = require('./communication/mqueue-pi');
const mQueuePi = new MQueuePi(sensorValueContext);

// create a new instance
// with the external dependencies
// db, devices, gateway
const piapp = new PiApp(db, temperaturedevice,iondevice, gateway, mQueuePi,approx);

const piwatcher = new PiWatcher(mQueuePi, piapp, db);

piwatcher.startWatcher();

// Initialize the pi app
piapp.init();

//const connectionChecker = new ConnectionChecker(30000, heatsourcedevice, pumpdevice, mQueuePi);

//connectionChecker.startChecking();




