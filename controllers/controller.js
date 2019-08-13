// functionality of the routes - route handlers
const Models = require('../models/todo-list');

const TodoList = Models.TodoList;
const TodoItem = Models.TodoItem;

// retrieves list of items
// basically the whole todo-list
const getList = (req, res) => {
  // only one list exists for this app where
  // name = Todo List
  TodoList.find({ name: 'Todo List' }, (err, data) => {
    if (err) {
      // using 500 as generic error status code
      return res.status(500).json({ error: err });
    }

    // need to grab all the items in the todo list
    const todoList = [];
    // loop through all the ids and retrieve the item info
    for (let _id in data.items) {
      TodoItem.find({ _id: _id }, (item_err, item_data) => {
        if (item_err) {
          return res.status(500).json({ error: item_err });
        }

        todoList.push(item_data);
      });
    }

    // send the list with the actual items merged in
    return res.status(200).json({ success: true, todoList: todoList });
  });
};

// updates item in database
const updateItem = (req, res) => {
  // check for only updated fields
  // update only sets the fields which are in the update object
  const updateObj = {};
  if (req.body.name) updateObj.name = req.body.name;
  if (req.body.description) updateObj.description = req.body.description;
  if (req.body.dueBy) updateObj.description = req.body.dueBy;
  if (req.body.completed) updateObj.dueBy = req.body.completed;

  TodoItem.update({ _id: req.params._id }, updateObj, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    return res.status(200).json({ success: true });
  })
};

// removes item in database
// also removes item from the todo-list
const removeItem = (req, res) => {
  TodoItem.remove({ _id: req.params._id }, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    // find item in list and remove
    TodoList.update({ name: 'Todo List' }, { $pull: { items: req.params._id }}, (list_err) => {
      if (list_err) {
        return res.status(500).json({ error: list_err })
      }

      return res.status(200).json({success: true});
    });
  })
};

// creates item in database
// also adds item into todo-list
const createItem = (req, res) => {
  let item = new TodoItem({
    name: req.body.name,
    description: req.body.description,
    dueBy: req.body.dueBy,
    completed: false
  });

  item.save(err => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    // add item to list
    TodoList.update({ name: 'Todo List' }, { $push: { items: item._id }}, (list_err) => {
      if (list_err) {
        return res.status(500).json({ error: list_err });
      }

      return res.status(200).json({ success: true });
    });
  });
};

module.exports = {
  getList,
  updateItem,
  removeItem,
  createItem
};
