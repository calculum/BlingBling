const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

// log the http layer
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// when requests come into `/shopping-list` or
// `/recipes`, we'll route them to the express
// router instances we've imported. Remember,
// these router instances act as modular, mini-express apps.

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

