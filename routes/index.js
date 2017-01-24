const todo = require('./todo');

module.exports = function (app) {
    app.route("/todos")
        .get(todo.getTodos)
        .post(todo.postTodo);
    app.route("/todos/:id")
        .get(todo.getTodo)
        .delete(todo.deleteTodo)
        .put(todo.updateTodo);
};