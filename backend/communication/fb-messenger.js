'use strict';
const login = require("facebook-chat-api");


const FbMessenger = module.exports = function () {
  // create reusable transporter object using the default SMTP transport
  this.email = 'iotwithchem@yahoo.com';
  this.password = 'mehchtiwtoi2017';
};


FbMessenger.prototype.sendMessage = function (id, message) {
  const self = this;
  //Kelemen Istvan id = 100001571194197
  //Zsebe Akos id = 100001077210300
  //Barabas Laszlo id = 100001381206016
  //Barabas Reka id = 100002179542644
  //Heni Petrut id = 100005602022894
  const idTo = ["100001571194197", "100001077210300", "100002379911356", "100001381206016", "100002179542644", "100005602022894"];
  login({email: self.email, password: self.password}, (err, api) => {
    if (err) return console.error(err);
    idTo.forEach(function (id) {
      api.sendMessage(message, id);
    });
  });
};

FbMessenger.prototype.sendMessageForAdmins = function () {
};

