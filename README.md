# todo-server

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
  
## API  
  
#### GET /api/item/
```
response = {
  success: true,
  todoList: {
    name: 'Todo List',
    items: [Items]
  }
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

error = {
  error: Error
}
```
