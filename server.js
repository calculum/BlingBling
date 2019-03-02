'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const passport = require('passport');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');



const app = express();

const { DATABASE_URL, PORT } = require('./config');

const BlingRouter = require('./blingRouter');
const UsersRouter = require('./usersRouter');

require('./config/passport')(passport);


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



// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(methodOverride('_method'));

// ----------Express-session
const sess = {
  secret: 'secret',
  resave: true,
  saveUninitialized: true
};

app.use(session(sess));
//------------------------------

// log the http layer
app.use(morgan('common'));

app.use(express.static('public'));


//---------------Passport
app.use(passport.initialize());
app.use(passport.session());

//--------C-Flash
app.use(flash());

//-------Globe msg setting
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


mongoose.Promise = global.Promise;


// -------------------Routes----------------
app.get('/', (req, res) => {
  const title = 'BlingBling';
  res.render('index', {
    title
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
//-------------Routers
app.use('/users', UsersRouter);
app.use('/blings', BlingRouter);

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
            console.log(`Listening on port ${PORT}`);
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

