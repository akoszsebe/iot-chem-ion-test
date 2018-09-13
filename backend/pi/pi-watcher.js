'use strict';
const PiWatcher = module.exports = function (messagequeue, piapp, db) {
  this.messagequeue = messagequeue;
  this.piapp = piapp;
  this.db = db;
  this.started = false;
  this.watcherInterval = 3000;
};

PiWatcher.prototype.startWork = function () {
  console.info("WORK STARTED!");
  console.info('Work duration = ', this.workDuration);
  this.started = true;
  this.elpassedTime = 0;
  this.piapp.init();
  this.piapp.setEventLoop();
};

PiWatcher.prototype.stopWork = function () {
  clearTimeout(this.workStopTimeout);
  console.info("WORK STOPPED!");
  this.started = false;
  this.messagequeue.sensorValueContext.setWorkInProgress(false);
  this.piapp.unsetEventLoop();
  const self = this;
  setTimeout(function () {
    clearInterval(self.debugCountdownTimeout)
  }, 500)
};

PiWatcher.prototype.debugCounter = function () {
  this.elpassedTime = this.elpassedTime + 1;
  let remainingSeconds = this.workDuration - this.elpassedTime;
  const remainingMinutes = Math.floor(remainingSeconds / 60) % 60;
  const remainingHours = Math.floor(remainingSeconds / 3600);
  remainingSeconds = remainingSeconds % 60;
  console.info('-------------------------------------------------------------------');
  // console.info('Time remaining on job - ', this.workDuration - this.elpassedTime , ' seconds')
  console.info('Time Remaining on job - ' + remainingHours + ':' + remainingMinutes + ':' + remainingSeconds);
  console.info('Work done by ', this.elpassedTime * 100 / this.workDuration, '% ');
  console.warn('-------------------------------------------------------------------');
};


PiWatcher.prototype.workInProgressWatcher = function () {
  const workinprogress = this.messagequeue.sensorValueContext.isWorkInProgress();

  if (workinprogress && !this.started) {
    this.startWork();
    this.workDuration = this.messagequeue.sensorValueContext.getWorkDuration();
    this.debugCountdownTimeout = setInterval(this.debugCounter.bind(this), 1000);
    this.workStopTimeout = setTimeout(this.stopWork.bind(this), this.workDuration * 1000); // Stop after timeout
  }
  else if (!workinprogress && this.started) {
    this.stopWork();
  }
  
  this.piapp.messagequeueCalibrationCheck();
  
};

PiWatcher.prototype.startWatcher = function () {
  console.log("Waiting for a job...");
  const self = this;
  const now = (new Date).getTime();
  this.db.getJob(job => {
    if (job && job.jobEndDate > now) {
      self.messagequeue.sensorValueContext.setWorkInProgress(true);
      self.messagequeue.sensorValueContext.setWorkDuration((job.jobEndDate - now) / 1000);
    }
    setInterval(this.workInProgressWatcher.bind(this), this.watcherInterval);
  });
};
