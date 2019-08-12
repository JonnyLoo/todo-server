const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3001;
// should store credentials in a config file for security
const DB_URL = 'mongodb+srv://todo-user_test:test123@todo-app-586aa.mongodb.net/test?retryWrites=true&w=majority';

const app = express();

// load in routes + route handlers
const router = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json(), cors());

// connect to database
if (process.env.NODE_ENV === 'dev') {
  mongoose.connect('mongodb://localhost/todo-app', { useNewUrlParser: true });
} else {
  mongoose.connect(DB_URL, { useNewUrlParser: true });
}
const db = mongoose.connection;

// connected to db yay
db.once('open', () => {
  console.log('connected to DB');
});

// catch db connection error
db.on('error', () => {
  console.error('error connecting to DB');
});

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
