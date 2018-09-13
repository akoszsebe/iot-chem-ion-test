'use strict';

const config = require('../../config');

let path = require('path'),
    Temperature = require(path.resolve('backend/models/temperature.js')),
    Ph = require(path.resolve('backend/models/ph.js')),
    Ion = require(path.resolve('backend/models/ion.js')),
    Job = require(path.resolve('./backend/models/job.js')),
    Log = require(path.resolve('backend/models/log.js')),
    ValuePairs = require(path.resolve('backend/models/valuepairs.js')),
    mongoose = require('mongoose');


/**
 * Create a DBWS class to handle:
 * 1. download  data to the historian db
 */
const DbWs = module.exports = function () {

    this.mongoose = mongoose;
    this.init()

};


/**
 *  Init the entity layer and others...
 *
 */
DbWs.prototype.init = function () {

    const self = this;
    self.mongoose.Promise = global.Promise;

    // database connection settings
    self.mongoose.connection.on('open', ()=> {
        console.info('Connected to mongo server.')
});

    self.mongoose.connection.on('error', (error) => {
        console.error('Could not connect to mongo server!', error)
});

    // connect to database on mongolab
    //Live db connection string mongodb://heroku_1v5ndzf5:jhh1cjdvneikc2p77n0b3n32j7@ds113938.mlab.com:13938/heroku_1v5ndzf5
    //regi mongo kemiasoke : mongodb://heroku_hww55rc1:2ic4cjhncvmlse83a21lnejpru@ds139187.mlab.com:39187/heroku_hww55rc1
    self.mongoose.connect(config.addons.mongodb, function (err) {
        if (err) {
            console.error('errors:' + err)
        }
    }) //('mongodb://votiv:votiv@ds031257.mlab.com:31257/kemia-db')

};


/**
 * Close method to handle the connection cloe explicitely
 */
DbWs.prototype.close = function () {

    const self = this;

    self.mongoose.Promise = global.Promise;

    self.mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');

    })
};


/**
 * get temperature sensor value
 */
DbWs.prototype.getTemperatureSensors = function (_callback) {

    const _sensorids = new Set();
    Temperature.find({}, '-_id -__v', (error, sensors) => {
        if(error) {
            return _callback(null)
        }
        sensors.forEach(function (item) {
        _sensorids.add(item.sensorid)
    });
    return _callback(Array.from(_sensorids))
})
};

/**
 * get temperature  value
 */
DbWs.prototype.getTemperature = function (sensorid, _callback) {

    Temperature.findOne({}, '-_id -__v', (error, temperatures) => {
        if(error) {
            return _callback(null)
        }
        return _callback(temperatures)
    }
).
    where('sensorid').equals(sensorid).sort({'tempdate': 'descending'})
};

/**
 * get temperature  interval vaue
 */
DbWs.prototype.getTemperatureInterval = function (sensorid, datefrom, dateto, _callback) {

    Temperature.find({'tempdate': {'$gte': datefrom, '$lt': dateto}}, '-_id -__v', (error, temperatures) => {
        if(error) {
            return _callback(null)
        }
        return _callback(temperatures)
    }
).
    where('sensorid').equals(sensorid)
};

/**
 * get ph sensor   value
 */
DbWs.prototype.getPhSensors = function (_callback) {

    const _sensorids = new Set();
    Ph.find({}, '-_id -__v', (error, sensors) => {
        if(error) {
            return _callback(null)
        }
        sensors.forEach(function (item) {
        _sensorids.add(item.sensorid)
    });
    return _callback(Array.from(_sensorids))
})
};

/**
 * get ion sensor value -hard code
 */
DbWs.prototype.getIonSensors = function (_callback) {
    const _sensorids = new Set();
    Ion.find({}, '-_id -__v', (error, sensors) => {
        if(error) {
            return _callback(null)
        }
        sensors.forEach(function (item) {
        _sensorids.add(item.sensorid)
    });
    return _callback(Array.from(_sensorids))
})
};

/**
 * get ph    value
 */
DbWs.prototype.getPh = function (sensorid, _callback) {

    Ph.findOne({}, '-_id -__v', (error, ph) => {
        if(error) {
            return _callback(null)
        }
        return _callback(ph)
    }
).
    where('sensorid').equals(sensorid).sort({'phdate': 'descending'})
};

/**
 * get ion   value
 * hard code
 */
DbWs.prototype.getIon = function (sensorid, _callback) {

    Ion.findOne({}, '-_id -__v', (error, ion) => {
        if(error) {
            return _callback(null)
        }
        return _callback(ion)
    }
).
    where('sensorid').equals(sensorid).sort({'iondate': 'descending'})
};

/**
 * get ph interval value
 */
DbWs.prototype.getPhInterval = function (sensorid, datefrom, dateto, _callback) {

    Ph.find({'phdate': {'$gte': datefrom, '$lt': dateto}}, '-_id -__v', (error, phs) => {
        if(error) {
            return _callback(null)
        }
        return _callback(phs)
    }
).
    where('sensorid').equals(sensorid)
};

/**
 * get ion interval value
 * hard code
 */
DbWs.prototype.getIonInterval = function (sensorid, datefrom, dateto, _callback) {

    Ion.find({'iondate': {'$gte': datefrom, '$lt': dateto}}, '-_id -__v', (error, ions) => {
        if(error) {
            return _callback(null)
        }
        return _callback(ions)
    }
).
    where('sensorid').equals(sensorid)
};

DbWs.prototype.getOldestTemp = function (sensorid, _callback) {

    Temperature.findOne({}, '-_id -__v', (error, temperature) => {
        if(error) {
            return _callback(null)
        }
        return _callback(temperature)
    }
).
    where('sensorid').equals(sensorid).sort({'tempdate': 'ascending'})
};

DbWs.prototype.getOldestPh = function (sensorid, _callback) {

    Ph.findOne({}, '-_id -__v', (error, ph) => {
        if(error) {
            return _callback(null)
        }
        return _callback(ph)
    }
).
    where('sensorid').equals(sensorid).sort({'phdate': 'ascending'})
};

DbWs.prototype.getOldestIon = function (sensorid, _callback) {

    Ion.findOne({}, '-_id -__v', (error, ion) => {
        if(error) {
            return _callback(null)
        }
        return _callback(ion)
    }
).
    where('sensorid').equals(sensorid).sort({'iondate': 'ascending'})
};

DbWs.prototype.getOldestValuePairList = function (sensorid, _callback) {

    Temperature.findOne({}, '-_id -__v', (error, temperature) => {
        if(error) {
            return _callback(null)
        }
        return _callback(temperature)
    }
).
    where('sensorid').equals(sensorid).sort({'tempdate': 'ascending'})
};

DbWs.prototype.getJob = function (_callback) {

    Job.findOne({}, '-_id', (error, job) => {
        if(error) {
            return _callback(null)
        }
        return _callback(job)
    }
)
    ;
};

DbWs.prototype.setJob = function (newJob, _callback) {

    Job.findOneAndUpdate({}, newJob, {new: true}, (error, job) => {
        if(error) {
            return _callback(null)
        }
        return _callback(job)
    }
)
    ;
};

DbWs.prototype.logAction = function (name, action, date) {

    const entry = new Log({
        name: name,
        action: action,
        date: date
    });
    entry.save((err) => {
        if(err) {
            console.error(err);
        }
    }
)
    ;
};


DbWs.prototype.createTemperatureMessage = function (rid, sid, tv, td, _callback) {


    // create a Temperature json object
    const temp = new Temperature({
        raspberryid: rid,
        sensorid: sid,
        tempvalue: tv,
        tempdate: td
    });
    // call the Temperature class save operator
    temp.save(function (err) {
        if (err)
            return _callback(err);
        return _callback(null)
    })

};

/**
 * createPhMessage   method is responsabile for ...
 *
 * rid:
 * sid:
 * pv:
 * pd:
 * callback:
 */

DbWs.prototype.createPhMessage = function (rid, sid, pv, pd, _callback) {

    console.info("Save ph -------- " + rid + " " + sid + " " + pv + " " + pd)
    // create a Ph json object
    const ph = new Ph({
        raspberryid: rid,
        sensorid: sid,
        phvalue: pv,
        phdate: pd
    });
    // call the Temperature class save operator
    ph.save(function (err) {
        if (err)
            return _callback(err);
        return _callback(null)
    })

};


//hard code
DbWs.prototype.createIonMessage = function (rid, sid, iv, id, _callback) {

    console.info("Save ion -------- " + rid + " " + sid + " " + iv + " " + id)
    // create a Ion json object
    const ion = new Ion({
        raspberryid: rid,
        sensorid: sid,
        ionvalue: iv,
        iondate: id
    });
    // call the Temperature class save operator
    ion.save(function (err) {
        if (err)
            return _callback(err);
        return _callback(null)
    })

};

DbWs.prototype.createJob = function (a_job, _callback) {
    // Create job json object.
    const newJob = new Job({
        raspberryId: a_job.raspberryId,
        jobStartDate: a_job.jobStartDate,
        jobEndDate: a_job.jobEndDate,
        jobDescription: a_job.jobDescription,
        heaterValue: a_job.heaterValue,
        tempReadInt: a_job.tempReadInt,
        ionValue: a_job.ionValue,
        ionReadInt: a_job.ionReadInt
    });
    // Call the job save operator
    newJob.save(function (err) {
        if (err)
            return _callback(err);
        return _callback(null);
    });
};

DbWs.prototype.createValuePairs = function (name,comment,a_conductivitylist, an_ionlist, _callback) {
    console.info("db.createValuePairs");

    const newValuePairsList = new ValuePairs({
        name:name,
        comment:comment,
        conductivity: a_conductivitylist,
        ion: an_ionlist
    });
    newValuePairsList.save(function (err) {
        if (err)
            console.info(err);
        return _callback(err);
        return _callback(null);
    })
};

DbWs.prototype.getValuePairs = function(_callback) {
	ValuePairs.findOne({}, '-_id', (error, job) => {
        if(error) {
            return _callback(null)
        }
        return _callback(job)
    });
};
DbWs.prototype.getValuePairsById = function(id,_callback) {
    console.log(id);

	ValuePairs.findById( id, (error, val) => {
        if(error) {
            console.error(error);
            return _callback(null)
        }

        return _callback(val)
    });
};


DbWs.prototype.updateValuePairsById = function(id,name,comment,a_conductivitylist, an_ionlist,_callback) {
  console.log('UPDATING VALUE PARIS WITH ID: ', id);


  ValuePairs.findById( id, (error, val) => {
    if(error) {
      console.error(error);
      return _callback(null)
    }
    val.name = name;
    val.comment = comment;
    val.conductivity = a_conductivitylist;
    val.ion = an_ionlist;
    val.save();
    return _callback(true);
  });
};

DbWs.prototype.removeValuePairsById = function (id,_callback) {
  ValuePairs.remove({_id:id},(err) => { if(!err) return _callback(true); return _callback(false);});
    return _callback(true);
}
DbWs.prototype.getAllValuePairs = function(_callback) {
	ValuePairs.find((error, val) => {
        if(error) {
            console.error('GET ALL VALUE PAIRS FROM DR ERROR: ', error);
            return _callback(null)
        }
        console.log('VALUE PAIRS YOU GET FROM DB: ', val);
        return _callback(val)
    });
};
