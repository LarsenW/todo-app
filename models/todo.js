'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    isDone: {
        type: Boolean,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Todo', TodoSchema);