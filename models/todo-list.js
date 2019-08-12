const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const TodoItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  dueBy: Date,
  completed: Boolean
});

const TodoListSchema = new mongoose.Schema({
  name: String,
  items: [ObjectId]
});

const TodoItem = mongoose.model('TodoItem', TodoItemSchema);
const TodoList = mongoose.model('TodoList', TodoListSchema);

module.exports = {
  TodoItem,
  TodoList
}
