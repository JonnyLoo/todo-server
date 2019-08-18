// just some basic setup for the db to have initial data
const Models = require('./models/todo-list');

const TodoList = Models.TodoList;
const TodoItem = Models.TodoItem;

// create todo list
TodoList.create({ name: 'Todo List' })
  .then(list => {
    console.log('LIST CREATED');

    // create item
    TodoItem.create({
      list_name: 'Todo List',
      name: 'setup',
      description: 'this is setup for the db',
      dueBy: (new Date()).toISOString().split('T')[0],
      completed: false
    })
    .then(item => {
      console.log('ITEM CREATED');
    })
    .catch(err => {
      console.log('OOF ERROR CREATING ITEM');
    });
  })
  .catch(err => {
    console.log('OOF ERROR CREATING LIST');
  });
