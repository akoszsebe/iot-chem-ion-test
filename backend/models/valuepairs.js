'use strict';

let loaded = true;

let mongoose, Schema;

try {
    mongoose = require('mongoose')
} catch (e) {
    loaded = false;
}

if (!loaded) {
    try {
        mongoose = require('../pi/node_modules/mongoose')
    } catch (e) {
        throw e
    }
}

Schema = mongoose.Schema;

let valuePairsSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    name: String,
    comment: String,
    conductivity: [Number],
    ion: [Number]
});


module.exports = mongoose.model('ValuePairs', valuePairsSchema);

