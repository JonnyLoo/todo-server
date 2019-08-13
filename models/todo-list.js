const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

// item model
const TodoItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  dueBy: Date,
  completed: Boolean
});

// full todo-list model
// contains a list of ids referencing the related item
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
