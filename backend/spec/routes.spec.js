var request = require('request');

var frisby = require('frisby');

const config = require('../../config');

frisby.create('/api/device/temperature')
  .get(config.heroku.domain + '/api/device/temperature')
  .expectStatus(200)
  .expectJSONTypes({
    raspberryid: String,
    sensorid: String,
    tempvalue: String,
    tempdate: String
  })
  .expectJSONLength(4)
  .toss();

frisby.create('/api/device/temperature')
  .post(config.heroku.domain + '/api/device/temperature')
  .expectStatus(404)
  .toss();


frisby.create('/gettemperatureinterval')
  .get(config.heroku.domain + '/gettemperatureinterval?sensorid=1&datefrom=2000000&dateto=2100000')
  .expectStatus(200)
  .toss();


frisby.create('/api/device/ph')
  .get(config.heroku.domain + '/api/device/ph')
  .expectStatus(200)
  .expectJSONTypes({
    raspberryid: String,
    sensorid: String,
    phvalue: String,
    phdate: String
  })
  .expectJSONLength(4)
  .toss();


frisby.create('/getphinterval')
  .get(config.heroku.domain + '/getphinterval?sensorid=1&datefrom=2000000&dateto=2100000')
  .expectStatus(200)
  .toss();

frisby.create('/api/frontend/checkAuth')
  .get(config.heroku.domain + '/api/frontend/checkAuth')
  .expectStatus(200)
  .expectJSON({
    user: null
  })
  .expectJSONLength(1)
  .toss();

frisby.create('/api/device/heaterTemperature')
  .get(config.heroku.domain + '/api/device/heaterTemperature')
  .expectStatus(200)
  .expectJSONTypes({
    heatertemperature: Number
  })
  .expectJSONLength(1)
  .toss();


frisby.create('/api/backend/job')
  .get(config.heroku.domain + '/api/backend/job')
  .expectStatus(200)
  .expectJSONTypes({
    jobStartDate: String,
    jobEndDate: String,
    jobDescription: String
  })
  .expectJSONLength(3)
  .toss();

frisby.create('/api/device/oldestReadDates')
  .get(config.heroku.domain + '/api/device/oldestReadDates')
  .expectStatus(200)
  .expectJSONTypes({
    temp: String,
    ph: String,
  })
  .expectJSONLength(2)
  .toss();


//describe('jasmine-node', function () {
//describe('jasmine-node', function () {
//  it("should respond with hello world", function (done) {
//    request.get("http://iotwithchembeta.herokuapp.com", function (error, response, body) {
//      expect(response.statusCode).toBe(200);
//      done();
//    });
//  });
//  });
//  });
//  it("should respond with temperature json", function (done) {
//    request.get("http://iotwithchembeta.herokuapp.com/login/facebook/return", function (error, response, body) {
//    //console.log(response);
//      done();
//    });
//  });
//  });
//  it('should pass', function () {
//    expect(1 + 2).toEqual(3);
//  });
//  });
//  it('shows asynchronous test', function () {
//    setTimeout(function () {
//      expect('second').toEqual('second');
//      asyncSpecDone();
//    }, 1);
//    expect('first').toEqual('first');
//    asyncSpecWait();
//  });
//  });
//  it('shows asynchronous test node-style', function (done) {
//    setTimeout(function () {
//      expect('second').toEqual('second');
//      // If you call done() with an argument, it will fail the spec
//      // so you can use it as a handler for many async node calls
//      done();
//    }, 1);
//    expect('first').toEqual('first');
//  });
//});
