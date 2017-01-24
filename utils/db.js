'use strict';

const mongoose = require('mongoose');
const db = mongoose.connection;
const config = require('../config');

module.exports = function (dbURI) {

    let reconnectionAttempts = 0;

    db.on('connecting', function () {
        console.log('connecting to MongoDB...');
    });

    db.on('error', function (error) {
        console.error('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
    });

    db.on('connected', function () {
        console.log('MongoDB connected!', dbURI);
    });

    db.once('open', function () {
        reconnectionAttempts = 0;
    });

    db.on('disconnected', function () {
        console.log('MongoDB disconnected!');
        if (reconnectionAttempts < config.mongoose.maxConnectionAttempts) {
            setTimeout(() => {
                reconnectionAttempts++;
                mongoose.connect(dbURI, {server: {auto_reconnect: true}});
            }, config.mongoose.reconnectionIntervalMs);
        }
    });

    mongoose.connect(dbURI, {server: {auto_reconnect: true}});
};
