// functionality of the routes - route handlers
const Models = require('../models/todo-list');

const TodoList = Models.TodoList;
const TodoItem = Models.TodoItem;

// retrieves list of items
// in other words the whole todo-list
const getList = (req, res) => {
  console.log('GET LIST');
  // only one list exists for this app where name = Todo List
  TodoList.findOne({ name: 'Todo List' })
    .then(data => {
      // find item by looking up ids in id array
      // wait for all queries to execute before resolving
      // .exec returns a promise
      Promise.all(data.items.map(id => TodoItem.findById(id).exec()))
        .then(todoList => {
          // send list of items
          return res.status(200).json({ success: true, todoList: { name: data.name, items: todoList }});
        })
        .catch(err => {
          // use 500 as generic error status code
          return res.status(500).json({ error: err });
        })
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
}

// updates item in database
const updateItem = (req, res) => {
  // check for only updated fields
  // update only sets the fields which are in the update object
  const updateObj = {};
  if (req.body.name) updateObj.name = req.body.name;
  if (req.body.description) updateObj.description = req.body.description;
  if (req.body.dueBy) updateObj.description = req.body.dueBy;
  if (req.body.completed) updateObj.dueBy = req.body.completed;

  TodoItem.update({ _id: req.params._id }, updateObj)
    .then(() => {
      return res.status(204).json({ success: true });
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

// removes item in database
// also removes item from the todo-list
const removeItem = (req, res) => {
  TodoItem.remove({ _id: req.params._id })
    .then(
      // find item in list and remove
      TodoList.update({ name: 'Todo List' }, { $pull: { items: req.params._id }})
        .then(() => {
          return res.status(204).json({ success: true });
        })
        .catch(err => {
          return res.status(500).json({ error: err });
        });
    )
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

// creates item in database
// also adds item into todo-list
const createItem = (req, res) => {
  const item = new TodoItem({
    name: req.body.name,
    description: req.body.description,
    dueBy: req.body.dueBy,
    completed: false
  });

  item.save()
    .then(() => {
      // add item to list
      TodoList.update({ name: 'Todo List' }, { $push: { items: item._id }})
        .then(() => {
          return res.status(204).json({ success: true });
        })
        .catch(err => {
          return res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

module.exports = {
  getList,
  updateItem,
  removeItem,
  createItem
};
