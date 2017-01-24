const mongoose = require('mongoose');
const Todo = require('../models/todo');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Todos', () => {
    beforeEach((done) => { //Before each test we empty the database
        Todo.remove({}).then(() => {
            done();
        });
    });
    describe('/GET todos', () => {
        it('it should GET all the todos', (done) => {
            const todo = new Todo({
                "isDone": true
            });
            todo.save().then(() => {
                chai.request(server)
                    .get('/todos')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(1);
                        done();
                    });
            });
        })
    });

    describe('/POST todos', () => {
        let todo = {
            "isDone": true
        };
        it('it should POST a todo', (done) => {
            chai.request(server)
                .post('/todos')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('isDone').eql(true);
                    done();
                });
        });
    });
    describe('/POST todos', () => {
        let todo = {};
        it('it shouldn`t POST a todo without isDone property', (done) => {
            chai.request(server)
                .post('/todos')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
    describe('/GET:id todo', () => {
        it('it should GET todo by id', (done) => {
            const todo = new Todo({
                "isDone": true
            });
            todo.save().then((todo) => {
                chai.request(server)
                    .get(`/todos/${todo._id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('isDone');
                        res.body.should.have.property('_id').eql(todo.id);
                        done();
                    });
            });
        })
    });
    describe('/GET:id todo', () => {
        it('it should return Bad request status for todo with invalid id', (done) => {
            const invalidId = 123;
            chai.request(server)
                .get(`/todos/${invalidId}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        })
    });
    describe('/PUT:id todo', () => {
        it('it should UPDATE todo by id', (done) => {
            const todo = new Todo({
                "isDone": true
            });
            todo.save().then((todo) => {
                const updatedTodo = {
                    "isDone": false
                };
                chai.request(server)
                    .put(`/todos/${todo._id}`)
                    .send(updatedTodo)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('isDone').eql(false);
                        done();
                    });
            });
        });
    });
    describe('/PUT:id todo', () => {
        it('it should return Bad request status for todo with invalid id', (done) => {
            const updatedTodo = {isDone: true};
            const invalidId = 123;
            chai.request(server)
                .put(`/todos/${invalidId}`)
                .send(updatedTodo)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        })
    });
    describe('/DELETE:id todo', () => {
        it('it should DELETE todo by id', (done) => {
            const todo = new Todo({
                "isDone": true
            });
            todo.save().then((todo) => {
                chai.request(server)
                    .delete(`/todos/${todo._id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });
    describe('/DELETE:id todo', () => {
        it('it should return Bad request status for todo with invalid id', (done) => {
            const invalidId = 12345;
            chai.request(server)
                .delete(`/todos/${invalidId}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});
