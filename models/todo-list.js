const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

// item model
// for this list_name will always be Todo List
// could use list_id as foreign key instead
const TodoItemSchema = new mongoose.Schema({
  list_name: String,
  name: String,
  description: String,
  dueBy: String,
  completed: Boolean
});

// just contains name of todo list
// looking forward, users could have multiple lists, and there can be multiple users
const TodoListSchema = new mongoose.Schema({
  name: String
});

const TodoItem = mongoose.model('TodoItem', TodoItemSchema);
const TodoList = mongoose.model('TodoList', TodoListSchema);

module.exports = {
  TodoItem,
  TodoList
}
