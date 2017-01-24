'use strict';

const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./routes');
const dbConnector = require('./utils/db');
const app = express();

const NODE_ENV = process.env.NODE_ENV;

const dbUri = NODE_ENV === 'test' ? config.mongoose.test_uri : config.mongoose.development_uri;

dbConnector(dbUri);

app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (err) {
        res.sendStatus(400);
    }
});

router(app);

app.listen(config.port, function () {
    console.log('Todo app listening on port' + ' ' + config.port);
});

module.exports = app;
