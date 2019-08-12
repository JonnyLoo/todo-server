const Models = require('../models/todo-list');

const TodoList = Models.TodoList;
const TodoItem = Models.TodoItem;

const getItem = (req, res) => {
  TodoItem.find({ _id: req.body._id }, (err, data) => {
    if (err) {
      return res.json({ error: err });
    }

    return res.json({ success: true, task: data });
  });
};

const updateItem = (req, res) => {
  TodoItem.findOneAndUpdate({ _id: req.body._id }, {
    name: req.body.name,
    description: req.body.description,
    dueBy: req.body.dueBy,
    completed: req.body.completed
  }, (err) => {
    if (err) {
      return res.json({ error: err });
    }

    return res.json({ success: true });
  })
};

const removeItem = (req, res) => {
  TodoItem.findOneAndDelete({ _id: req.body._id }, (err) => {
    if (err) {
      return res.json({ error: err });
    }

    TodoList.findOneAndUpdate({ name: 'Todo List' }, { $pull: { items: req.body._id }}, (list_err) => {
      if (list_err) {
        return res.json({ error: list_err })
      }

      return res.json({success: true});
    });
  })
};

const createItem = (req, res) => {
  let item = new TodoItem({
    name: req.body.name,
    description: req.body.description,
    dueBy: req.body.dueBy,
    completed: false
  });

  item.save(err => {
    if (err) {
      return res.json({ error: err });
    }

    TodoList.findOneAndUpdate({ name: 'Todo List' }, { $push: { items: item._id }}, (list_err) => {
      if (list_err) {
        return res.json({ error: list_err });
      }

      return res.json({ success: true });
    });
  });
};

const getList = (req, res) => {
  TodoList.find({ name: 'Todo List' }, (err, data) => {
    if (err) {
      return res.json({ error: err });
    }

    const todoList = [];

    for (let item_id in data) {
      TodoItem.find({ _id: item_id }, (item_err, item_data) => {
        if (item_err) {
          return res.json({ error: item_err });
        }

        todoList.push(item_data);
      });
    }

    return res.json({ success: true, todoList: todoList });
  });
};

module.exports = {
  getItem,
  updateItem,
  removeItem,
  createItem,
  getList
};
