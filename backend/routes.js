'use strict';

let path = require('path');

const config = require('../config');

const DbWs = require(path.resolve('backend/models/db-ws'));
const db = new DbWs();
/* Create new Message Queue  webservice -> pi*/

const MQueueWS = require(path.resolve('backend/communication/mqueue-ws'));

const Mail = require(path.resolve('backend/communication/mail'));
const mail = new Mail();

const FbMessenger = require(path.resolve('backend/communication/fb-messenger'));
const fbMessenger = new FbMessenger();

const ExcelExport = require(path.resolve('backend/models/excel-export'));
const excelExport = new ExcelExport(db);

const Lagrange = require(path.resolve('backend/interpolation/lagrange'));
const lagrange = new Lagrange();

module.exports = (app, passport, io) => {

  const mq = new MQueueWS(io, fbMessenger);

  app.get('/api/backend/domain', (req, res) => { //
    res.json(config.heroku.domain);
  });

  app.get('/api/device/sensorIds', checkAuthorization, (req, res) => {
    db.getTemperatureSensors((returndata) => {
      res.json(returndata)
    })
  });

  app.get('/api/device/temperature', (req, res) => {  //
    let sensorId;
    req.query.sensorid ? sensorId = req.query.sensorid : sensorId = '1';
    db.getTemperature(sensorId, (returndata) => {
      res.json(returndata)
    });
  });

  app.get('/api/device/tempsBetween', checkAuthorization, (req, res) => {  //
    let sensorId;
    req.query.sensorid ? sensorId = req.query.sensorid : sensorId = '1';
    const dateFrom = req.query.datefrom;
    const dateTo = req.query.dateto;
    db.getTemperatureInterval(sensorId, dateFrom, dateTo, (returndata) => {
      res.json(returndata)
    });
  });

  app.get('/api/device/exportTempsBetween', checkAuthorization, (req, res) => {  //
    const dateFrom = req.query.datefrom;
    const dateTo = req.query.dateto;
    excelExport.exportTemps(dateFrom, dateTo, (report) => {
      res.setHeader('Content-disposition', `attachment; filename=temps-${new Date()}.xlsx`);
      res.setHeader('Content-type', 'application/vnd.ms-excel');
      return res.send(report);
    });
  });

  app.get('/api/device/ph', (req, res) => { //
    let sensorId;
    req.query.sensorid ? sensorId = req.query.sensorid : sensorId = '1';
    db.getPh(sensorId, (returndata) => {
      res.json(returndata)
    })
  });


  app.get('/api/device/ion', (req, res) => { //
    let sensorId;
    req.query.sensorid ? sensorId = req.query.sensorid : sensorId = '1';
    db.getValuePairs((valuePair) => {
      db.getIon(sensorId, (returndata) => {
        var conductivity = parseFloat(returndata.ionvalue);
        var ion;
        ion = lagrange.interpolate(valuePair.conductivity, valuePair.ion, conductivity, 0.01);
        returndata.ionvalue = "" + ion;
        console.log(ion + " ion value----------------------------------------------------------------");
        console.log(valuePair.conductivity + " conductivity pairs----------------------------------------------------------------");
        console.log(valuePair.ion + " ion pairs----------------------------------------------------------------");
        res.json(returndata);
      })
    })

  });
  app.get('/api/device/conductivityValue', (req, res) => { //
    let sensorId;
    req.query.sensorid ? sensorId = req.query.sensorid : sensorId = '1';
    db.getIon(sensorId, (returndata) => {
      var seged = {
        raspberryid: returndata.raspberryid,
        sensorid: returndata.sensorId,
        conductivityvalue: returndata.ionvalue,
        conductivitydate: returndata.iondate
      };
      res.json(seged)
    })
  });


  app.get('/api/device/ionsBetween', checkAuthorization, (req, res) => { //
    let sensorId;
    req.query.sensorid ? sensorId = req.query.sensorid : sensorId = '1';
    const dateFrom = req.query.datefrom;
    const dateTo = req.query.dateto;
    db.getIonInterval(sensorId, dateFrom, dateTo, (returndata) => {
      res.json(returndata)
    })
  });

  app.get('/api/device/exportIonsBetween', checkAuthorization, (req, res) => { //
    const dateFrom = req.query.datefrom;
    const dateTo = req.query.dateto;
    excelExport.exportIons(dateFrom, dateTo, (report) => {
      res.setHeader('Content-disposition', `attachment; filename=temps-${new Date()}.xlsx`);
      res.setHeader('Content-type', 'application/vnd.ms-excel');
      return res.send(report);
    });
  });


  app.get('/api/device/deviceStatus', checkAuthorization, (req, res) => { //
    mq.getDeviceStatus(status => {
      res.json({ alive: status });
    })
  });

  app.get('/api/frontend/login/facebook',
    passport.authenticate('facebook', { scope: ['email'] }));

  app.get('/api/frontend/login/facebook/return', //
    passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] }),
    (req, res) => {
      res.redirect('/experiment')
    });


  app.get('/api/frontend/logout', (req, res) => {
    req.logout();
    res.redirect('/login')
  });

  app.get('/api/frontend/checkAuth', (req, res) => { //
    console.log(req)
    req.isAuthenticated() ? res.json({ 'user': req.user.fb }) : res.json({ 'user': null });

  });

  app.post('/api/device/heaterTemperature', [checkAuthorization, logAction], (req, res) => { //
    mq.sendMsgToRaspberry('Temp:Value:' + req.body.heatertemp);
    db.getJob((job) => {
      job.heaterValue = req.body.heatertemp;
      db.setJob(job, (newJob) => {
        res.json({ sensorSetValue: newJob.heaterValue });
      });
    });
  });

  app.get('/api/device/heaterTemperature', checkAuthorization, (req, res) => { //
    db.getJob((job) => {
      res.json({ sensorSetValue: job.heaterValue });
    })
  });

  app.post('/api/device/tempUploadInterval', [checkAuthorization, logAction], (req, res) => { //
    let upInterval;
    let sensorId;
    req.query.sensorid ? sensorId = req.query.sensorid : sensorId = '1';
    req.body.upinterval ? upInterval = req.body.upinterval : upInterval = '30000';
    mq.sendMsgToRaspberry('Temp:UpInterval:' + sensorId + ':' + upInterval);
    db.getJob((job) => {
      job.tempReadInt = upInterval;
      db.setJob(job, (newJob) => {
        res.json({ sensorSetValue: newJob.tempReadInt });
      });
    });
  });


  app.post('/api/device/calibrateIonSensor', [checkAuthorization, logAction], (req, res) => { //
    console.log('calibrateIONSensor: ', req);
    console.log('req.boddy: ', req.body);
    mq.sendMsgToRaspberry('Ion:Calibrate:' + req.body.level);
    res.json({ sent: true })
  });

  //hard
  app.post('/api/device/calibrateIonSensor', [checkAuthorization, logAction], (req, res) => { //
    mq.sendMsgToRaspberry('Ion:Calibrate:' + req.body.level);
    res.json({ sent: true })
  });

  app.post('/api/device/ionValue', [checkAuthorization, logAction], (req, res) => { //
    mq.sendMsgToRaspberry('Ion:Value:' + req.body.ionValue);
    db.getJob((job) => {
      job.pumpValue = req.body.ionValue;
      db.setJob(job, (newJob) => {
        res.json({ sensorSetValue: newJob.pumpValue });
      });
    });
  });

  app.get('/api/device/ionvalue', checkAuthorization, (req, res) => { //
    db.getJob((job) => {
      res.json({ sensorSetValue: job.pumpValue });
    })
  });

  app.post('/api/device/ionUploadInterval', [checkAuthorization, logAction], (req, res) => { //
    let upInterval;
    let sensorId;
    req.query.sensorid ? sensorId = req.query.sensorid : sensorId = '1';
    req.body.upinterval ? upInterval = req.body.upinterval : upInterval = '30000';
    mq.sendMsgToRaspberry('Ion:UpInterval:' + sensorId + ':' + upInterval);
    db.getJob((job) => {
      job.ionReadInt = upInterval;
      db.setJob(job, (newJob) => {
        res.json({ sensorSetValue: newJob.ionReadInt });
      });
    });
  });


  app.post('/api/device/condUploadInterval', [checkAuthorization, logAction], (req, res) => { //
    let upInterval;
    let sensorId;
    req.query.sensorid ? sensorId = req.query.sensorid : sensorId = '1';
    req.body.upinterval ? upInterval = req.body.upinterval : upInterval = '30000';
    mq.sendMsgToRaspberry('Ion:ConUpInterval:' + sensorId + ':' + upInterval);
    db.getJob((job) => {
      job.conductivityReadInt = upInterval;
      db.setJob(job, (newJob) => {
        res.json({ sensorSetValue: newJob.conductivityReadInt });
      });
    });
  });

  app.get('/api/device/oldestReadDates', checkAuthorization, (req, res) => {
    let sensorId;
    req.query.sensorid ? sensorId = req.query.sensorid : sensorId = '1';
    db.getOldestTemp(sensorId, (temp) => {
      db.getOldestIon(sensorId, (ion) => {
        res.json({ temp: temp.tempdate, ion: ion.iondate });
      });
    });
  });

  app.get('/api/backend/job', (req, res) => { //
    db.getJob((job) => {
      res.json(job);
    })
  });

  app.post('/api/backend/startJob', [checkAuthorization, logAction], (req, res) => {
    db.getJob(function (job) {
      if (job.jobEndDate > (new Date()).getTime()) {
        mq.sendMsgToRaspberry("Work:Stop");
      }
      setTimeout(() => {
        console.log('waiting to stop the previous job if there is any');
        db.getJob((job) => {
          job.jobStartDate = (new Date()).getTime();
          job.jobEndDate = req.body.jobEndDate;
          job.jobDescription = req.body.jobDescription;
          job.usedInterpolation = req.body.usedInterpolation;
          job.usedValuePairs = req.body.usedValuePairs;

          mq.sendMsgToRaspberry("Work:Start:" + (job.jobEndDate - job.jobStartDate) / 1000);
          db.setJob(job, (newJob) => {
            res.json(newJob);
          });
        });
      }, 4000);
    })
  });

  app.post('/api/backend/stopJob', [checkAuthorization, logAction], (req, res) => { //

    mq.sendMsgToRaspberry("Work:Stop");
    db.getJob(function (job) {
      if (job.jobEndDate > (new Date()).getTime()) {
        job.jobEndDate = (new Date()).getTime();
        db.setJob(job, (stoppedJob) => {
          res.json(stoppedJob);
        });
      } else {
        res.json(job);
      }
    });
  });

  app.post('/api/backend/sendFeedback', checkAuthorization, (req, res) => { //
    mail.sendMail(req.body.from, req.body.message);
    res.json({ sent: true });
  });

  app.post('/api/device/temperature', (req, res) => { //
    var temperature = req.body
    db.createTemperatureMessage(temperature.raspberryid, temperature.sensorid, temperature.tempvalue, temperature.tempdate, (returndata) => {
      res.json(returndata)
    });
  });

  app.post('/api/device/ion', (req, res) => { //
    var ion = req.body
    console.info("Save ion $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$-------- " + ion)
    db.createIonMessage(ion.raspberryid, ion.sensorid, ion.ionvalue, ion.iondate, (returndata) => {
      res.json(returndata)
    })
  });


  app.post('/api/backend/valuePairs', (req, res) => {
    console.info("api/backend/valuePairs");
    console.info(req.body);
    var req = JSON.parse(req.body.data);
    console.log(req);
    var a_valuepairslist = req.values;

    var a_conductivitylist = [];
    var an_ionlist = [];
    //[{a,b},{c,d}..] -> [a,c,..], [b,d,..]
    for (var pair in a_valuepairslist) {
      a_conductivitylist.push(a_valuepairslist[pair].conductivity);
      an_ionlist.push(a_valuepairslist[pair].ion);
    }
    console.info("/api/backend/valuePairs; a_conductivity: ", a_conductivitylist);
    db.createValuePairs(req.name, req.comment, a_conductivitylist, an_ionlist, (returndata) => {
      res.json(returndata)
    })
  });
  app.get('/api/backend/valuePairs', (req, res) => {
    db.getValuePairs((valuePair) => {
      res.json(valuePair);
    })


  });
  app.get('/api/backend/valuePairsById', (req, res) => {

    db.getValuePairsById(req.query.id, (valuePair) => {
      res.json(valuePair);
    })


  });
  app.put('/api/backend/valuePairsById', (req, res) => {
    var req = JSON.parse(req.body.data);
    console.log(req);
    var a_valuepairslist = req.values;

    var a_conductivitylist = [];
    var an_ionlist = [];
    //[{a,b},{c,d}..] -> [a,c,..], [b,d,..]
    for (var pair in a_valuepairslist) {
      a_conductivitylist.push(a_valuepairslist[pair].conductivity);
      an_ionlist.push(a_valuepairslist[pair].ion);
    }
    console.log('req: ', req);
    console.log('req.id: ', req.id)
    db.updateValuePairsById(req.id, req.name, req.comment, a_conductivitylist, a_valuepairslist, (valuePair) => {
      res.json(valuePair);
      console.log('VALUEPAIR to update: ', valuePair);
    })


  });
  app.post('/api/backend/deleteValuePairsById', (req, res) => {
    console.log('delete request before parsing: ',req);
    var req = JSON.parse(req.body.data);
    console.log("delete request: ",req);
    db.getJob((job) => {
      if (req._id !== job.usedInterpolation) {
        db.removeValuePairsById(req._id, (resp) => {
          console.log('NOT USED, removed ', resp);
          res.json(true);
        })
      }
      else
        res.json(false);
    });
  });
  app.get('/api/backend/allValuePairs', (req, res) => {

    db.getAllValuePairs((valuePair) => {
      console.log('------VALUE PAIRS YOU GET: ', valuePair);
      for (var i = 0; i < valuePair.length; i++) {
        console.log('VALUE PAIR _ID? : ', valuePair[i]._id);
      }
      res.json(valuePair);
    })


  });


  app.get('*', (req, res) => {
    res.sendFile(path.resolve('./dist/index.html'));
  })


};

function logAction(req, res, next) {
  //db.logAction(req.user.fb.name, req.originalUrl, (new Date()).toString());
  next();
}

function checkAuthorization(req, res, next) {
  next();
  //req.isAuthenticated() ? next() : res.sendFile(path.resolve('./dist/index.html'));
}
