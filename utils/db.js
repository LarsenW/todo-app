'use strict';

const mongoose = require('mongoose');
const db = mongoose.connection;

module.exports = function (dbURI) {

    db.on('connecting', function () {
        console.log('connecting to MongoDB...');
    });

    db.on('error', function (error) {
        console.error('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
    });
    db.on('connected', function () {
        console.log('MongoDB connected!\n',dbURI);
    });
    db.once('open', function () {
        console.log('MongoDB connection opened!');
    });
    db.on('reconnected', function () {
        console.log('MongoDB reconnected!');
    });
    db.on('disconnected', function () {
        console.log('MongoDB disconnected!');
        mongoose.connect(dbURI, {server: {auto_reconnect: true}});
    });
    mongoose.connect(dbURI, {server: {auto_reconnect: true}});
};
