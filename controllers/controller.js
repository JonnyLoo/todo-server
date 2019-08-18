// functionality of the routes - route handlers
const Models = require('../models/todo-list');

const TodoList = Models.TodoList;
const TodoItem = Models.TodoItem;

// retrieves all items in the specified todo list
// with multiple users, could retrieve all todo lists of user
// then get items in todo list
// would use todo list id to get the name of list, along with items related but for this there's only one list so i'm cheating
const getList = (req, res) => {
  console.log('GET LIST');
  // only one list exists for this app where name is Todo List
  TodoItem.find({ list_name: 'Todo List' })
    .then(data => {
      // send list of items
      return res.status(200).json({ success: true, todoList: { name: 'Todo List', items: data }});
    })
    .catch(err => {
      // use 500 as generic error status code
      return res.status(500).json({ error: err });
    });
}

// updates item in database
const updateItem = (req, res) => {
  console.log('UPDATE ITEM');
  // check for only updated fields
  // update only sets the fields which are in the update object
  const updateObj = {};
  if (req.body.name) updateObj.name = req.body.name;
  if (req.body.description) updateObj.description = req.body.description;
  if (req.body.dueBy) updateObj.dueBy = req.body.dueBy;
  updateObj.completed = req.body.completed;

  TodoItem.updateOne({ _id: req.params._id }, updateObj)
    .then(() => {
      return res.status(200).json({ success: true });
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

// removes item in database
const removeItem = (req, res) => {
  console.log('DELETE ITEM');

  TodoItem.deleteOne({ _id: req.params._id })
    .then(() => {
      // delete success
      return res.status(200).json({ success: true });
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

// creates item in database
const createItem = (req, res) => {
  console.log('CREATE ITEM');

  const item = new TodoItem({
    list_name: 'Todo List',
    name: req.body.name,
    description: req.body.description,
    dueBy: req.body.dueBy,
    completed: false
  });

  item.save()
    .then(() => {
      // item successfully created
      return res.status(201).json({ success: true, item: item });
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
