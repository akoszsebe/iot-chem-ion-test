const config = {};

config.heroku = {};
config.addons = {};

config.heroku.domain = 'https://iot-chem-ion-test.herokuapp.com';

config.addons.ampq = 'amqp://iuprolzi:_sJn3dHQffXU02_D9G07W9Ufb9u9kMlM@impala.rmq.cloudamqp.com/iuprolzi';
config.addons.mongodb = 'mongodb://heroku_ws30tb95:ioaobm86dgeg6ldt5cruq0ch3@ds111876.mlab.com:11876/heroku_ws30tb95';

module.exports = config;
