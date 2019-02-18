const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.static('public'));

const { DATABASE_URL, PORT } = require('./config');

// log the http layer
app.use(morgan('common'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use('/login', usersRouter);
app.use('/events', eventRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

