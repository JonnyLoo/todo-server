const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// could save port in config file
const PORT = 3001;
// should store credentials in a config file for security
// also can attach different dbs and set this up depending on env
// but in this case i will leave it here as there's only one db
const DB_URL = 'mongodb+srv://todo-user_test:test123@todo-app-586aa.mongodb.net/test?retryWrites=true&w=majority';

const app = express();

// load in routes + route handlers
const router = require('./routes');

// serve up json
// also allow cross origin requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json(), cors());

// connect to database
// can connect to different databases based on env
// for here if env is set to local im using a local database
// otherwise default to the mongodb database that's setup
// i'm using mongodb atlas and if you want to take a look i can share the cluster with you
if (process.env.NODE_ENV === 'local') {
  mongoose.connect('mongodb://localhost/todo-app', { useNewUrlParser: true });
} else {
  mongoose.connect(DB_URL, { useNewUrlParser: true });
}
const db = mongoose.connection;

// connected to db yay
db.once('open', () => {
  console.log('connected to DB\n');
  // uncomment require line to run db setup
  // basically it just creates the initial list and adds one item to it
  // require('./setup-db.js');
});

// catch db connection error
db.on('error', () => {
  console.error('error connecting to DB');
});

// setup routes
app.use('/api/item', router);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
