# Task Manager Server
- [Get Started](https://github.com/JonnyLoo/todo-server#get-started)

- [DB Model](https://github.com/JonnyLoo/todo-server#db)

- [API Docs](https://github.com/JonnyLoo/todo-server#api)


## Get Started  
### Locally
```
npm i
npm start
```

### With Docker  
Create network from [here](https://github.com/JonnyLoo/todo-ui/blob/master/README.md)  
  
Build the image  
```
docker build -t todo-server .
```
  
Run container and connect to the network  
```
docker run -itd --network=todo -d -p 3001:3001 --name todo-server todo-server
```
  
## DB  
Using MongoDB Atlas to host data + mongoose to model data  
```
todoitem = {
  _id: ID,
  list_name: String, // serves as reference to todolist
  name: String,
  description: String,
  dueBy: String,
  completed: Boolean
}
```

```
todolist = {
  _id: ID,
  name: String
}
```
  
## API  
  
#### GET /api/item/
```
response = {
  success: true,
  todoList: {
    name: 'Todo List',
    items: [Item]
  }
}

Item = {
  _id: 1,
  list_name: 'todo list name',
  name: 'name',
  description: 'description',
  dueBy: '2019-01-01',
  completed: false
}

error = {
  error: Error
}
```
  
#### POST /api/item/:_id/update
```
body = {
  name: 'name',
  description: 'description',
  dueBy: '2019-01-01',
  completed: true
}

response = {
  success: true
}

error = {
  error: Error
}
```
  
#### DELETE /api/item/:_id/remove
```
response = {
  success: true
}

error = {
  error: Error
}
```
  
#### POST /api/item/create
```
response = {
  success: true,
  item: Item
}

Item = {
  _id: 1,
  list_name: 'todo list name',
  name: 'name',
  description: 'description',
  dueBy: '2019-01-01',
  completed: false
}

error = {
  error: Error
}
```
