'use strict';

const config = require('../../../config');

/**
 * Class to handle the communication
 * pi gateway toward webservice
 * via message queue
 */
const MQueuePI = module.exports = function (sensorValueContext) {
  this.qR = 'qToRaspberry';
  this.qW = 'qToWebserver';
  this.channel = null;
  this.sensorValueContext = sensorValueContext;
  this.init()
};

/**
 * initialize the communocation chanel and
 * set some initial parametes values
 */
MQueuePI.prototype.init = function () {
  /*LIVE mq connection string*/ "amqp://fiynopcz:fYBzRHfKTa-dcH8bgMo4WtTg5iPkpUa-@hare.rmq.cloudamqp.com/fiynopcz";
  this.cloudAmqpUrl = config.addons.ampq;
  const self = this;
  this.open = require('amqplib').connect(self.cloudAmqpUrl).then(function (conn, err) {
    if (err) {
      console.error("[AMQP]", err.message);
      return setTimeout(self.init, 1000);
    }
    conn.on("error", function (err) {
      if (err.message !== "Connection closing") {
        console.error("[AMQP] conn error", err.message);
      }
    });
    conn.on("close", function () {
      console.error("[AMQP] reconnecting");
      return setTimeout(self.init, 1000);
    });
    console.log("[AMQP] connected");

    let ok = conn.createChannel();
    ok.then(function (ch) {
      self.channel = ch;
      console.info("channel created");
      self.receiveMsgFromWebServer()
    });
  }).then(null, console.warn)
};


/**
 * Send message to Web Server
 */
MQueuePI.prototype.sendMsgToWebServer = function (msg) {
  try {
    this.channel.assertQueue(this.qW);
    this.channel.sendToQueue(this.qW, new Buffer(msg))
  }
  catch (err) {
    console.log(err);
    this.init();
  }
};

/**
 * Receive messages from the Web Server
 */
MQueuePI.prototype.receiveMsgFromWebServer = function () {
  this.channel.assertQueue(this.qR);
  const self = this;
  this.channel.consume(this.qR, function (msg) {
    if (msg !== null) {
      console.info('New message from WEB', msg.content.toString());
      self.MessageRouting(msg.content.toString());
      self.channel.ack(msg)
    }
  });
};

/**
 * Routing the incoming messages
 */
MQueuePI.prototype.MessageRouting = function (message) {
  const splitMessage = message.split(':');

  switch (splitMessage[0]) {
    case 'Work':
      switch (splitMessage[1]) {
        case 'Start':
          this.sensorValueContext.setWorkInProgress(true);
          this.sensorValueContext.setWorkDuration(parseInt(splitMessage[2]));
          break;
        case 'Stop':
          this.sensorValueContext.setWorkInProgress(false);
          break;
      }
      break;
    case 'Temp':
      switch (splitMessage[1]) {
        case 'Value':
          this.sensorValueContext.setHeaterTemperature(splitMessage[2]);
          break;
        case 'UpInterval':
          this.sensorValueContext.setTempUploadInterval(splitMessage[3]);
          break;
      }
      break;
    case 'Ph':
      switch (splitMessage[1]) {
        case 'Calibrate':
          // handled all the cases Low, Mid, High based on the first character of the splitMessage[2]
          this.sensorValueContext.setCalibration(splitMessage[2].charAt(0));
          break;
        case 'Value':
          this.sensorValueContext.setPhValue(splitMessage[2]);
          break;
        case 'UpInterval':
          this.sensorValueContext.setPhUploadInterval(splitMessage[3]);
          break;
      }
    case 'Ion':
      switch (splitMessage[1]) {
        case 'Calibrate':
          // handled all the cases Low, Mid, High based on the first character of the splitMessage[2]
          this.sensorValueContext.setCalibration(splitMessage[2].charAt(0));
          break;
        case 'Value':
          this.sensorValueContext.setIonValue(splitMessage[2]);
          break;
        case 'UpInterval':
          this.sensorValueContext.setIonUploadInterval(splitMessage[3]);
          break;
        case 'ConUpInterval':
          this.sensorValueContext.setIonUploadInterval(splitMessage[3]);
          break;
      }
      break;
    case 'Pump':
      switch (splitMessage[1]) {
        case 'ON':
          this.sensorValueContext.setPumpIsWorking(true);
          break;
        case 'OFF':
          this.sensorValueContext.setPumpIsWorking(false);
          break;
      }
      break;
  }
};
