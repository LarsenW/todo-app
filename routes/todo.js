'use strict';

let mongoose = require('mongoose');
let Todo = require('../models/todo');

function getTodos(req, res) {
    Todo.find({}).then((todos) => {
        res.json(todos);
    });
}

function postTodo(req, res) {
    new Todo(req.body).save().then((todo) => {
        res.json(todo);
    }).catch(() => {
        res.sendStatus(400);
    });
}

function getTodo(req, res) {
    Todo.findById(req.params.id).then((todo) => {
        res.json(todo);
    }).catch(() => {
        res.sendStatus(400);
    });
}

function deleteTodo(req, res) {
    Todo.findByIdAndRemove(req.params.id).then(() => {
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(400);
    });
}

function updateTodo(req, res) {
    Todo.findById({_id: req.params.id}).then((todo) => {
        return Object.assign(todo, req.body).save()
    }).then(updatedTodo => {
        res.json(updatedTodo)
    }).catch(() => {
        res.sendStatus(400)
    });
}

module.exports = {getTodos, postTodo, getTodo, deleteTodo, updateTodo};