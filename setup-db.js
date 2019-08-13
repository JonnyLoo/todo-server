// creates instance of TodoList in db
// adds one instance of TodoItem to created TodoList
const Models = require('./models/todo-list');

const TodoList = Models.TodoList;
const TodoItem = Models.TodoItem;

// create the item
TodoItem.create({
  name: 'task 1',
  description: 'i should do task 1',
  dueBy: (new Date()).toISOString(),
  completed: false
})
.then(item => {
  console.log('ITEM CREATED');
  // after success creating item, create array to store id
  const item_list = [];
  item_list.push(item._id);

  // create list with item id list
  TodoList.create({
    name: 'Todo List',
    items: item_list
  })
  .then(list => {
    console.log('LIST CREATED');
  })
  .catch(err => {
    console.log('OOF ERROR CREATING LIST');
  });
})
.catch(err => {
  console.log('OOF ERROR CREATING ITEM');
});
