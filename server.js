const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');


const  usersRouter  = require('./models/users');
const  blingRouter  = require('./models/bling');
const { DATABASE_URL, PORT } = require('./config');

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

mongoose.Promise = global.Promise;

// log the http layer
app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/login', usersRouter);
app.use('/bling', blingRouter);

// Server Setup
let server;

function runServer(dbUrl = DATABASE_URL) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      dbUrl,
      { useNewUrlParser: true },
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(PORT, () => {
            console.log(`All sytems go on port ${PORT}`);
            resolve();
          })
          .on('error', err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

function closeServer() {
  return mongoose.disconnect().then(
    () =>
      new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      })
  );
}

if (require.main === module) {
  runServer().catch(err => console.log(err));
}

module.exports = { app, runServer, closeServer };

